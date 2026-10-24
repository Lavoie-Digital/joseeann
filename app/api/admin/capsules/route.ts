import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { createCapsule } from "@/lib/capsules";
import { revalidateCapsules } from "./revalidate";

export const dynamic = "force-dynamic";

/** Enregistre une capsule dont la vidéo vient d'être téléversée. */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const title = String(body.title ?? "").trim().slice(0, 120);
  const description = String(body.description ?? "").trim().slice(0, 400);
  const storagePath = String(body.storagePath ?? "");

  if (!title) {
    return NextResponse.json({ ok: false, error: "Le titre est requis." }, { status: 400 });
  }

  try {
    const capsule = await createCapsule({ title, description, storagePath });
    revalidateCapsules();
    return NextResponse.json({ ok: true, capsule });
  } catch (err) {
    console.error("[capsules] Création", err);
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Erreur inconnue." },
      { status: 500 }
    );
  }
}
