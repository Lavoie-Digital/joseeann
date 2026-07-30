import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

/**
 * Automatisation courriel — alertes propriétés (formulaire /proprietes#alerte).
 *
 * Même pipeline que /api/contact : un courriel LEAD structuré part vers le
 * parseur du CRM, une copie lisible part vers Josée-Ann, et un accusé de
 * réception part vers le visiteur. Josée-Ann recrée ensuite la recherche
 * sauvegardée correspondante dans Matrix.
 *
 * Variables d'environnement : voir .env.example (réutilise celles de
 * /api/contact — SENDGRID_API_KEY, CONTACT_TO, CONTACT_FROM, CONTACT_PARSEUR).
 */

interface AlertPayload {
  name?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
  sector?: string;
  bedrooms?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  contactMe?: boolean;
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

export async function POST(req: Request) {
  let body: AlertPayload;
  try {
    body = (await req.json()) as AlertPayload;
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
  const propertyType = (body.propertyType ?? "—").trim();
  const sector = (body.sector ?? "—").trim();
  const bedrooms = (body.bedrooms ?? "—").trim();
  const budget = (body.budget ?? "—").trim();
  const timeline = (body.timeline ?? "—").trim();
  const message = (body.message ?? "").trim();
  const contactMe = Boolean(body.contactMe);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Nom requis.";
  if (!EMAIL_RE.test(email)) errors.email = "Courriel invalide.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Piège temporel : un humain met plusieurs secondes à remplir le formulaire.
  if (
    typeof body.elapsedMs === "number" &&
    body.elapsedMs >= 0 &&
    body.elapsedMs < 2500
  ) {
    console.warn("[alerte] Message ignoré (soumission trop rapide)", { email });
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.CONTACT_TO ?? "jajomphe@hotmail.com";
  const from = process.env.CONTACT_FROM ?? "info@jajomphe.ca";
  const parseur = process.env.CONTACT_PARSEUR ?? "josee-ann.jomphe@in.parseur.com";

  // Mode démo : pas de clé configurée → on simule un succès.
  if (!apiKey) {
    console.info("[alerte] Mode démo — SendGrid non configuré.", {
      name,
      email,
      propertyType,
      sector,
    });
    return NextResponse.json({ ok: true, demo: true });
  }

  sgMail.setApiKey(apiKey);

  const nowIso = new Date().toISOString();

  const criteriaText =
    `Nom: ${name}\n` +
    `Courriel: ${email}\n` +
    `Téléphone: ${phone || "—"}\n` +
    `Type de propriété: ${propertyType}\n` +
    `Secteur recherché: ${sector}\n` +
    `Chambres: ${bedrooms}\n` +
    `Budget: ${budget}\n` +
    `Délai d'emménagement: ${timeline}\n` +
    `Souhaite être contacté: ${contactMe ? "Oui" : "Non"}\n` +
    `Source: jajomphe.ca — /proprietes#alerte\n` +
    `Date: ${nowIso}\n` +
    `\n` +
    `Message:\n${message || "—"}\n`;

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">${label}</td>` +
    `<td style="padding:4px 0">${escapeHtml(value)}</td></tr>`;

  const tableHtml =
    `<table style="font-family:Arial,sans-serif;font-size:14px;color:#111;border-collapse:collapse">` +
    row("Nom", name) +
    row("Courriel", email) +
    row("Téléphone", phone || "—") +
    row("Type de propriété", propertyType) +
    row("Secteur recherché", sector) +
    row("Chambres", bedrooms) +
    row("Budget", budget) +
    row("Délai d'emménagement", timeline) +
    row("Souhaite être contacté", contactMe ? "Oui" : "Non") +
    row("Source", "jajomphe.ca — /proprietes#alerte") +
    row("Date", nowIso) +
    row("Message", message || "—") +
    `</table>`;

  // 1) Courriel LEAD vers le parseur du CRM.
  const parseurLead = {
    to: parseur,
    from: { email: from, name: "Site Josée-Ann Jomphe" },
    replyTo: { email, name },
    subject: `Nouvelle alerte propriété — ${name}`,
    text: criteriaText,
    html: tableHtml,
  };

  // 2) Notification lisible pour la cliente (copie de courtoisie).
  const notification = {
    to,
    from: { email: from, name: "Site Josée-Ann Jomphe" },
    replyTo: { email, name },
    subject: `Nouvelle alerte propriété — ${name}`,
    text: criteriaText,
    html: `
      <div style="font-family:Georgia,serif;color:#16130f;max-width:560px">
        <h2 style="font-weight:400">Nouvelle demande d&apos;alerte propriété</h2>
        <p>Un visiteur souhaite recevoir des propriétés correspondant aux
        critères ci-dessous. Recréez la recherche sauvegardée correspondante
        dans Matrix.</p>
        ${tableHtml}
      </div>`,
  };

  // 3) Auto-réponse au visiteur.
  const autoReply = {
    to: { email, name },
    from: { email: from, name: "Josée-Ann Jomphe" },
    subject: "Votre alerte propriété est en préparation",
    text: `Bonjour ${name},\n\nMerci, j'ai bien reçu vos critères de recherche. Je vous contacterai dès qu'une propriété correspondante sera disponible.\n\nAu plaisir,\nJosée-Ann Jomphe inc.\nCourtier immobilier résidentiel et commercial`,
    html: `
      <div style="font-family:Georgia,serif;color:#16130f;max-width:560px;line-height:1.6">
        <p>Bonjour ${escapeHtml(name)},</p>
        <p>Merci, j&apos;ai bien reçu vos critères de recherche. Je vous
        contacterai personnellement dès qu&apos;une propriété correspondante
        sera disponible.</p>
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
    console.error("[alerte] Échec de l'envoi SendGrid", err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Veuillez réessayer." },
      { status: 502 }
    );
  }
}
