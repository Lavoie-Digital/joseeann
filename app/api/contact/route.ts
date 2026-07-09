import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

/**
 * Automatisation courriel via SendGrid.
 *
 * À la réception du formulaire :
 *   1. Un courriel de NOTIFICATION est envoyé à Josée-Ann.
 *   2. Un courriel de CONFIRMATION (auto-répondeur) est envoyé au visiteur.
 *
 * Variables d'environnement (voir .env.example) :
 *   SENDGRID_API_KEY   Clé API SendGrid
 *   CONTACT_TO         Adresse de réception (courtier)
 *   CONTACT_FROM       Adresse d'envoi vérifiée dans SendGrid
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

  const apiKey = process.env.SENDGRID_API_KEY;
  const to = process.env.CONTACT_TO ?? "josee-ann@joseeannjomphe.ca";
  const from = process.env.CONTACT_FROM ?? "site@joseeannjomphe.ca";

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

  const refLine = propertyRef
    ? `<p><strong>Propriété concernée :</strong> ${escapeHtml(propertyRef)}</p>`
    : "";

  const notification = {
    to,
    from: { email: from, name: "Site Josée-Ann Jomphe" },
    replyTo: { email, name },
    subject: `Nouvelle demande — ${subject}`,
    text: `Nom: ${name}\nCourriel: ${email}\nTéléphone: ${phone}\nSujet: ${subject}\n${
      propertyRef ? `Propriété: ${propertyRef}\n` : ""
    }\n${message}`,
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

  const autoReply = {
    to: { email, name },
    from: { email: from, name: "Josée-Ann Jomphe" },
    subject: "Merci — votre message a bien été reçu",
    text: `Bonjour ${name},\n\nMerci pour votre message. Je vous reviendrai personnellement dans les plus brefs délais, généralement en moins de 48 heures.\n\nAu plaisir,\nJosée-Ann Jomphe\nCourtier immobilier agréé`,
    html: `
      <div style="font-family:Georgia,serif;color:#16130f;max-width:560px;line-height:1.6">
        <p>Bonjour ${escapeHtml(name)},</p>
        <p>Merci pour votre message. Je vous reviendrai personnellement dans les
        plus brefs délais, généralement en moins de 48 heures.</p>
        <p>D'ici là, n'hésitez pas à parcourir mes propriétés en vedette.</p>
        <p style="margin-top:24px">Au plaisir,<br/>
        <strong style="font-size:18px">Josée-Ann Jomphe</strong><br/>
        <span style="color:#8a7d68">Courtier immobilier agréé</span></p>
      </div>`,
  };

  try {
    await Promise.all([sgMail.send(notification), sgMail.send(autoReply)]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Échec de l'envoi SendGrid", err);
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Veuillez réessayer." },
      { status: 502 }
    );
  }
}
