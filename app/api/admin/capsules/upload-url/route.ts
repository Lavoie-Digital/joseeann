import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { ACCEPTED_VIDEO_TYPES, MAX_VIDEO_BYTES, createUploadUrl } from "@/lib/capsules";

export const dynamic = "force-dynamic";

/** Fournit une URL signée pour téléverser la vidéo directement dans Storage. */
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const contentType = String(body.contentType ?? "");
  const size = Number(body.size ?? 0);

  if (!ACCEPTED_VIDEO_TYPES.includes(contentType)) {
    return NextResponse.json(
      { ok: false, error: "Format non pris en charge (MP4, MOV ou WebM)." },
      { status: 400 }
    );
  }
  if (!size || size > MAX_VIDEO_BYTES) {
    return NextResponse.json(
      { ok: false, error: "La vidéo dépasse 500 Mo." },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json({ ok: true, ...(await createUploadUrl(contentType)) });
  } catch (err) {
    console.error("[capsules] URL de téléversement", err);
    return NextResponse.json(
      { ok: false, error: "Stockage indisponible. Réessayez plus tard." },
      { status: 502 }
    );
  }
}
