import { NextResponse } from "next/server";
import { ADMIN_COOKIE, codeMatches, createSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** Connexion à l'espace privé : échange le code contre un cookie de session. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const code = typeof body.code === "string" ? body.code : "";

  if (!codeMatches(code)) {
    // Petit délai : décourage les essais à répétition.
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ ok: false, error: "Code invalide." }, { status: 401 });
  }

  const { value, maxAge } = createSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  });
  return res;
}

/** Déconnexion. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ADMIN_COOKIE);
  return res;
}
