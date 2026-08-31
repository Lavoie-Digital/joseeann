import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { CENTRIS_CACHE_TAG } from "@/lib/centris";
import { loadListings } from "@/lib/listings";

/**
 * Rafraîchissement manuel du flux Centris.
 * ----------------------------------------
 *
 * Le site se synchronise tout seul, mais avec un délai
 * (`CENTRIS_REVALIDATE_SECONDS`, soit 10 minutes). Cette route permet à
 * Josée-Ann de forcer la mise à jour immédiatement après avoir publié une
 * nouvelle inscription, sans attendre et sans redéploiement.
 *
 * Usage — un simple lien à mettre en signet dans son navigateur :
 *   https://jajomphe.ca/api/revalidate?secret=…
 *
 * Pour une intégration automatisée (POST, réponse JSON), le secret peut aussi
 * être transmis dans l'en-tête `x-revalidate-secret`.
 *
 * Variable d'environnement : REVALIDATE_SECRET (voir .env.example).
 * Sans elle, la route est désactivée — jamais ouverte au public.
 */

export const dynamic = "force-dynamic";

/** Comparaison à temps constant (via empreintes, longueurs toujours égales). */
function secretMatches(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Purge le cache du flux et régénère les pages qui en dépendent. */
async function revalidateListings() {
  // L'étiquette invalide la réponse Centris mise en cache ET toutes les pages
  // qui l'ont consommée. `expire: 0` force une expiration immédiate (pas de
  // « stale-while-revalidate ») : le tout premier visiteur voit déjà la mise à
  // jour. `updateTag()` ferait la même chose mais est réservé aux Server
  // Actions — interdit dans une route handler (Next 16).
  revalidateTag(CENTRIS_CACHE_TAG, { expire: 0 });
  revalidatePath("/");
  revalidatePath("/proprietes");
  revalidatePath("/sitemap.xml");

  // Relecture immédiate : confirme que le flux répond et donne le décompte
  // réel des inscriptions actives, utile comme accusé de réception.
  const listings = await loadListings();
  return listings.length;
}

export async function GET(req: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return htmlResponse(
      503,
      "Rafraîchissement indisponible",
      "La variable REVALIDATE_SECRET n'est pas configurée sur le serveur."
    );
  }

  const provided = new URL(req.url).searchParams.get("secret") ?? "";
  if (!secretMatches(provided, expected)) {
    return htmlResponse(401, "Lien invalide", "Ce lien de rafraîchissement n'est pas valide.");
  }

  try {
    const count = await revalidateListings();
    return htmlResponse(
      200,
      "Site mis à jour",
      `${count} propriété${count > 1 ? "s" : ""} synchronisée${count > 1 ? "s" : ""} depuis Centris. ` +
        "Vos pages sont à jour — rafraîchissez le site pour les voir."
    );
  } catch (err) {
    console.error("[revalidate] Échec du rafraîchissement", err);
    return htmlResponse(
      502,
      "Échec de la synchronisation",
      "Le flux Centris n'a pas répondu. Réessayez dans quelques minutes."
    );
  }
}

export async function POST(req: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET non configuré." },
      { status: 503 }
    );
  }

  const provided =
    req.headers.get("x-revalidate-secret") ??
    new URL(req.url).searchParams.get("secret") ??
    "";
  if (!secretMatches(provided, expected)) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }

  try {
    const count = await revalidateListings();
    return NextResponse.json({ ok: true, count, revalidatedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[revalidate] Échec du rafraîchissement", err);
    return NextResponse.json(
      { ok: false, error: "Flux Centris indisponible." },
      { status: 502 }
    );
  }
}

/** Page de confirmation minimale, lisible par la cliente dans son navigateur. */
function htmlResponse(status: number, title: string, message: string) {
  const ok = status === 200;
  const body = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>${title}</title>
  </head>
  <body style="margin:0;display:grid;place-items:center;min-height:100vh;background:#f6f3ee;font-family:Georgia,serif;color:#16130f">
    <div style="max-width:32rem;padding:2.5rem;text-align:center">
      <p style="margin:0 0 1rem;font-size:.75rem;letter-spacing:.18em;text-transform:uppercase;color:${ok ? "#8a7d68" : "#a33"}">
        ${ok ? "Synchronisation Centris" : "Erreur"}
      </p>
      <h1 style="margin:0 0 1rem;font-weight:400;font-size:2rem">${title}</h1>
      <p style="margin:0 0 2rem;line-height:1.6;color:#4a4239">${message}</p>
      <a href="/proprietes" style="color:#16130f">Voir les propriétés →</a>
    </div>
  </body>
</html>`;

  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
