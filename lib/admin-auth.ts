import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Accès à l'espace privé (/espace-prive) par simple code.
 * -------------------------------------------------------
 * Le code (ADMIN_CODE) est échangé contre un cookie httpOnly signé
 * (ADMIN_SESSION_SECRET) valide 30 jours. Sans ces deux variables,
 * l'espace privé reste fermé.
 */

export const ADMIN_COOKIE = "ja_admin";
const SESSION_DAYS = 30;

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

/** Comparaison à temps constant (via empreintes, longueurs toujours égales). */
function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function codeMatches(provided: string): boolean {
  const expected = process.env.ADMIN_CODE;
  if (!expected || !secret()) return false;
  return safeEqual(provided.trim(), expected);
}

/** Crée la valeur du cookie de session et sa durée (secondes). */
export function createSession() {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const exp = String(Date.now() + maxAge * 1000);
  return { value: `${exp}.${sign(exp)}`, maxAge };
}

export async function isAdmin(): Promise<boolean> {
  if (!secret()) return false;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp));
}
