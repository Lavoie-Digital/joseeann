import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

/**
 * Automatisation courriel via SendGrid.
 *
 * À la réception du formulaire (et si le message n'est pas détecté comme
 * pourriel) :
 *   1. Un courriel LEAD au format structuré est envoyé au parseur du CRM
 *      (Parseur → AVA) pour extraction automatique des champs.
 *   2. Un courriel de NOTIFICATION lisible est envoyé à Josée-Ann (copie).
 *   3. Un courriel de CONFIRMATION (auto-répondeur) est envoyé au visiteur.
 *
 * Variables d'environnement (voir .env.example) :
 *   SENDGRID_API_KEY   Clé API SendGrid
 *   CONTACT_TO         Adresse de réception (courtier)
 *   CONTACT_FROM       Adresse d'envoi vérifiée dans SendGrid
 *   CONTACT_PARSEUR    Adresse du parseur CRM (ex. ...@in.parseur.com)
 *
 * En l'absence de clé (mode démo), la requête réussit sans envoi réel.
 */

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  propertyRef?: string;
  // Champ anti-pourriel (honeypot) : doit rester vide.
  company?: string;
  // Temps de remplissage en ms (piège temporel anti-robot).
  elapsedMs?: number;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Score anti-pourriel. Plus le score est élevé, plus le message est suspect.
 * Un seuil est appliqué par l'appelant : au-delà, le message est ignoré
 * silencieusement (ni CRM, ni cliente ne le reçoivent).
 */
function spamScore(fields: {
  name: string;
  message: string;
  elapsedMs?: number;
}): { score: number; reasons: string[] } {
  const { name, message, elapsedMs } = fields;
  const reasons: string[] = [];
  let score = 0;

  const haystack = `${name} ${message}`.toLowerCase();

  // Liens : rarissimes dans une vraie demande à un courtier.
  const urls = (message.match(/https?:\/\/|www\.|\[url/gi) ?? []).length;
  if (urls > 0) {
    score += urls * 2;
    reasons.push(`${urls} lien(s)`);
  }

  // Balises BBCode → quasi exclusivement des robots de spam.
  if (/\[\/?(url|link|img|b|i)\]/i.test(message)) {
    score += 3;
    reasons.push("BBCode");
  }

  // Mots-clés typiques de pourriel.
  const KEYWORDS = [
    "seo", "backlink", "back link", "ranking", "rank higher", "guest post",
    "crypto", "bitcoin", "forex", "casino", "viagra", "cialis", "payday",
    "loan", "escort", "porn", "click here", "buy now", "limited offer",
    "make money", "earn money", "work from home", "weight loss",
    "guaranteed", "100% free", "web traffic", "заработок", "кредит",
  ];
  for (const k of KEYWORDS) {
    if (haystack.includes(k)) {
      score += 2;
      reasons.push(`mot-clé:${k}`);
    }
  }

  // Écritures cyrillique / CJK en masse (site FR/EN → très suspect).
  const cyrillic = (message.match(/[Ѐ-ӿ]/g) ?? []).length;
  const cjk = (message.match(/[　-鿿]/g) ?? []).length;
  if (cyrillic + cjk > 10) {
    score += 3;
    reasons.push("écriture non latine");
  }

  // Lien dans le champ Nom.
  if (/https?:\/\/|www\./i.test(name)) {
    score += 3;
    reasons.push("lien dans le nom");
  }

  // Répétition anormale d'un même caractère.
  if (/(.)\1{9,}/.test(message)) {
    score += 2;
    reasons.push("répétition");
  }

  // Piège temporel : un humain met plusieurs secondes à remplir le formulaire.
  if (typeof elapsedMs === "number" && elapsedMs >= 0 && elapsedMs < 2500) {
    score += 4;
    reasons.push("soumission trop rapide");
  }

  return { score, reasons };
}

const SPAM_THRESHOLD = 4;

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  // Honeypot : un robot remplit ce champ caché → on ignore silencieusement.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const subject = (body.subject ?? "Demande d'information").trim();
  const message = (body.message ?? "").trim();
  const propertyRef = (body.propertyRef ?? "").trim();

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Nom requis.";
  if (!EMAIL_RE.test(email)) errors.email = "Courriel invalide.";
  if (message.length < 10) errors.message = "Message trop court.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Filtrage anti-pourriel : au-delà du seuil, on répond « succès » au robot
  // mais aucun courriel n'est envoyé (ni au CRM, ni à la cliente).
  const { score, reasons } = spamScore({ name, message, elapsedMs: body.elapsedMs });
  if (score >= SPAM_THRESHOLD) {
    console.warn("[contact] Message ignoré (pourriel)", { score, reasons, email });
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.CONTACT_TO ?? "jajomphe@hotmail.com";
  const from = process.env.CONTACT_FROM ?? "info@jajomphe.ca";
  const parseur = process.env.CONTACT_PARSEUR ?? "josee-ann.jomphe@in.parseur.com";

  // Mode démo : pas de clé configurée → on simule un succès.
  if (!apiKey) {
    console.info("[contact] Mode démo — SendGrid non configuré.", {
      name,
      email,
      subject,
      propertyRef,
    });
    return NextResponse.json({ ok: true, demo: true });
  }

  sgMail.setApiKey(apiKey);

  const nowIso = new Date().toISOString();

  // ---------------------------------------------------------------------------
  // 1) Courriel LEAD vers le parseur du CRM.
  //    Format volontairement STABLE et labellisé (une info par ligne + tableau)
  //    pour une extraction fiable par Parseur.
  // ---------------------------------------------------------------------------
  const parseurText =
    `Nom: ${name}\n` +
    `Courriel: ${email}\n` +
    `Téléphone: ${phone || "—"}\n` +
    `Sujet: ${subject}\n` +
    `Propriété: ${propertyRef || "—"}\n` +
    `Source: jajomphe.ca\n` +
    `Date: ${nowIso}\n` +
    `\n` +
    `Message:\n${message}\n`;

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">${label}</td>` +
    `<td style="padding:4px 0">${escapeHtml(value)}</td></tr>`;

  const parseurLead = {
    to: parseur,
    from: { email: from, name: "Site Josée-Ann Jomphe" },
    replyTo: { email, name },
    subject: `Nouveau lead site web — ${subject}`,
    text: parseurText,
    html:
      `<table style="font-family:Arial,sans-serif;font-size:14px;color:#111;border-collapse:collapse">` +
      row("Nom", name) +
      row("Courriel", email) +
      row("Téléphone", phone || "—") +
      row("Sujet", subject) +
      row("Propriété", propertyRef || "—") +
      row("Source", "jajomphe.ca") +
      row("Date", nowIso) +
      row("Message", message) +
      `</table>`,
  };

  // ---------------------------------------------------------------------------
  // 2) Notification lisible pour la cliente (copie de courtoisie).
  // ---------------------------------------------------------------------------
  const refLine = propertyRef
    ? `<p><strong>Propriété concernée :</strong> ${escapeHtml(propertyRef)}</p>`
    : "";

  const notification = {
    to,
    from: { email: from, name: "Site Josée-Ann Jomphe" },
    replyTo: { email, name },
    subject: `Nouvelle demande — ${subject}`,
    text: parseurText,
    html: `
      <div style="font-family:Georgia,serif;color:#16130f;max-width:560px">
        <h2 style="font-weight:400">Nouvelle demande de contact</h2>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Courriel :</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
        ${refLine}
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap;background:#f6f2ec;padding:16px;border-left:2px solid #a8926a">${escapeHtml(
          message
        )}</p>
      </div>`,
  };

  // ---------------------------------------------------------------------------
  // 3) Auto-réponse au visiteur.
  // ---------------------------------------------------------------------------
  const autoReply = {
    to: { email, name },
    from: { email: from, name: "Josée-Ann Jomphe" },
    subject: "Merci — votre message a bien été reçu",
    text: `Bonjour ${name},\n\nMerci pour votre message. Je vous reviendrai personnellement dans les plus brefs délais, généralement en moins de 24 heures.\n\nAu plaisir,\nJosée-Ann Jomphe inc.\nCourtier immobilier résidentiel et commercial`,
    html: `
      <div style="font-family:Georgia,serif;color:#16130f;max-width:560px;line-height:1.6">
        <p>Bonjour ${escapeHtml(name)},</p>
        <p>Merci pour votre message. Je vous reviendrai personnellement dans les
        plus brefs délais, généralement en moins de 24 heures.</p>
        <p>D'ici là, n'hésitez pas à parcourir mes propriétés en vedette.</p>
        <p style="margin-top:24px">Au plaisir,<br/>
        <strong style="font-size:18px">Josée-Ann Jomphe inc.</strong><br/>
        <span style="color:#8a7d68">Courtier immobilier résidentiel et commercial</span></p>
      </div>`,
  };

  try {
    await Promise.all([
      sgMail.send(parseurLead),
      sgMail.send(notification),
      sgMail.send(autoReply),
    ]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Échec de l'envoi SendGrid", err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Veuillez réessayer." },
      { status: 502 }
    );
  }
}
