import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

/**
 * Automatisation courriel — demande du guide du vendeur (section Vendre du
 * bouton « Recevoir mon guide »).
 *
 * Même pipeline que /api/contact et /api/alerte : un courriel LEAD structuré
 * part vers le parseur du CRM et une copie lisible part vers Josée-Ann. Le
 * guide lui-même s'affiche immédiatement sur la page (aucune pièce jointe
 * requise) ; ce courriel sert à faire entrer le contact dans la base de
 * données de la cliente.
 *
 * Variables d'environnement : voir .env.example (réutilise celles de
 * /api/contact — SENDGRID_API_KEY, CONTACT_TO, CONTACT_FROM, CONTACT_PARSEUR).
 */

interface GuidePayload {
  name?: string;
  email?: string;
  // Guide demandé (« Guide du vendeur » / « Guide de l'acheteur »).
  guide?: string;
  // Page d'origine de la demande.
  source?: string;
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
  let body: GuidePayload;
  try {
    body = (await req.json()) as GuidePayload;
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
  const guide = (body.guide ?? "Guide du vendeur").trim() || "Guide du vendeur";
  const source =
    (body.source ?? "/vendre-acheter#vendre").trim() || "/vendre-acheter#vendre";

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
    body.elapsedMs < 1500
  ) {
    console.warn("[guide] Demande ignorée (soumission trop rapide)", { email });
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.CONTACT_TO ?? "jajomphe@hotmail.com";
  const from = process.env.CONTACT_FROM ?? "info@jajomphe.ca";
  const parseur = process.env.CONTACT_PARSEUR ?? "josee-ann.jomphe@in.parseur.com";

  // Mode démo : pas de clé configurée → on simule un succès.
  if (!apiKey) {
    console.info("[guide] Mode démo — SendGrid non configuré.", { name, email });
    return NextResponse.json({ ok: true, demo: true });
  }

  sgMail.setApiKey(apiKey);

  const nowIso = new Date().toISOString();

  const leadText =
    `Nom: ${name}\n` +
    `Courriel: ${email}\n` +
    `Demande: ${guide}\n` +
    `Source: jajomphe.ca — ${source}\n` +
    `Date: ${nowIso}\n`;

  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">${label}</td>` +
    `<td style="padding:4px 0">${escapeHtml(value)}</td></tr>`;

  const tableHtml =
    `<table style="font-family:Arial,sans-serif;font-size:14px;color:#111;border-collapse:collapse">` +
    row("Nom", name) +
    row("Courriel", email) +
    row("Demande", guide) +
    row("Source", `jajomphe.ca — ${source}`) +
    row("Date", nowIso) +
    `</table>`;

  // 1) Courriel LEAD vers le parseur du CRM.
  const parseurLead = {
    to: parseur,
    from: { email: from, name: "Site Josée-Ann Jomphe" },
    replyTo: { email, name },
    subject: `Nouveau lead site web — ${guide}`,
    text: leadText,
    html: tableHtml,
  };

  // 2) Notification lisible pour la cliente (copie de courtoisie).
  const notification = {
    to,
    from: { email: from, name: "Site Josée-Ann Jomphe" },
    replyTo: { email, name },
    subject: `Nouveau lead — ${guide}`,
    text: leadText,
    html: `
      <div style="font-family:Georgia,serif;color:#16130f;max-width:560px">
        <h2 style="font-weight:400">Demande du ${escapeHtml(guide.toLowerCase())}</h2>
        <p>Ce visiteur a demandé le ${escapeHtml(guide.toLowerCase())} et l&apos;a
        consulté directement sur le site.</p>
        ${tableHtml}
      </div>`,
  };

  try {
    await Promise.all([sgMail.send(parseurLead), sgMail.send(notification)]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[guide] Échec de l'envoi SendGrid", err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Veuillez réessayer." },
      { status: 502 }
    );
  }
}
