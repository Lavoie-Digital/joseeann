import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { deleteCapsule, updateCapsule } from "@/lib/capsules";
import { revalidateCapsules } from "../revalidate";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** Modifie le titre / la description d'une capsule. */
export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const title = String(body.title ?? "").trim().slice(0, 120);
  const description = String(body.description ?? "").trim().slice(0, 400);
  if (!title) {
    return NextResponse.json({ ok: false, error: "Le titre est requis." }, { status: 400 });
  }

  try {
    await updateCapsule(id, { title, description });
    revalidateCapsules();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[capsules] Modification", err);
    return NextResponse.json({ ok: false, error: "Modification impossible." }, { status: 500 });
  }
}

/** Supprime la capsule et sa vidéo. */
export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }
  const { id } = await params;

  try {
    await deleteCapsule(id);
    revalidateCapsules();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[capsules] Suppression", err);
    return NextResponse.json({ ok: false, error: "Suppression impossible." }, { status: 500 });
  }
}
