import "server-only";
import { randomUUID } from "node:crypto";
import { unstable_cache } from "next/cache";
import { bucket, db, isFirebaseConfigured } from "@/lib/firebase-admin";

/**
 * Capsules vidéo de Josée-Ann.
 * ----------------------------
 * - Fichier vidéo : Firebase Storage, dossier `capsules/`.
 *   Le navigateur l'envoie directement (URL signée) — la vidéo ne transite
 *   jamais par le serveur Render (512 MB de RAM).
 * - Fiche (titre, description, ordre) : Firestore, collection `capsules`.
 *
 * Gérées depuis /espace-prive, affichées sur la page d'accueil.
 */

export interface Capsule {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  storagePath: string;
  /** Millisecondes depuis l'époque — sert au tri (plus récente d'abord). */
  createdAt: number;
}

export const CAPSULES_CACHE_TAG = "capsules";
const COLLECTION = "capsules";

export const MAX_VIDEO_BYTES = 500 * 1024 * 1024; // 500 Mo
export const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/webm"];

async function fetchCapsules(): Promise<Capsule[]> {
  if (!isFirebaseConfigured()) return [];
  const snap = await db().collection(COLLECTION).orderBy("createdAt", "desc").get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Capsule, "id">) }));
}

/**
 * Lecture publique (page d'accueil), mise en cache et purgée par étiquette
 * dès qu'une capsule est ajoutée, modifiée ou supprimée. En cas de panne
 * Firebase, la section disparaît simplement plutôt que de casser la page.
 */
export const getCapsules = unstable_cache(
  async () => {
    try {
      return await fetchCapsules();
    } catch (err) {
      console.error("[capsules] Lecture Firestore impossible", err);
      return [];
    }
  },
  ["capsules"],
  { tags: [CAPSULES_CACHE_TAG], revalidate: 3600 }
);

/** Lecture sans cache, pour l'espace privé. */
export const listCapsules = fetchCapsules;

function extensionFor(contentType: string) {
  if (contentType === "video/quicktime") return "mov";
  if (contentType === "video/webm") return "webm";
  return "mp4";
}

/** URL signée (15 min) pour téléverser une vidéo directement dans Storage. */
export async function createUploadUrl(contentType: string) {
  const storagePath = `capsules/${randomUUID()}.${extensionFor(contentType)}`;
  const [uploadUrl] = await bucket()
    .file(storagePath)
    .getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType,
    });
  return { uploadUrl, storagePath };
}

/**
 * Enregistre la fiche une fois la vidéo téléversée. On attache un jeton de
 * téléchargement Firebase au fichier : l'URL obtenue est publique et
 * permanente, sans rendre le bucket entier public.
 */
export async function createCapsule(input: {
  title: string;
  description: string;
  storagePath: string;
}): Promise<Capsule> {
  if (!/^capsules\/[\w-]+\.(mp4|mov|webm)$/.test(input.storagePath)) {
    throw new Error("Chemin de fichier invalide.");
  }
  const file = bucket().file(input.storagePath);
  const [exists] = await file.exists();
  if (!exists) throw new Error("La vidéo n'a pas été reçue.");

  const token = randomUUID();
  await file.setMetadata({
    cacheControl: "public, max-age=31536000",
    metadata: { firebaseStorageDownloadTokens: token },
  });
  const videoUrl =
    `https://firebasestorage.googleapis.com/v0/b/${file.bucket.name}/o/` +
    `${encodeURIComponent(input.storagePath)}?alt=media&token=${token}`;

  const data = {
    title: input.title,
    description: input.description,
    storagePath: input.storagePath,
    videoUrl,
    createdAt: Date.now(),
  };
  const ref = await db().collection(COLLECTION).add(data);
  return { id: ref.id, ...data };
}

export async function updateCapsule(
  id: string,
  input: { title: string; description: string }
) {
  await db().collection(COLLECTION).doc(id).update(input);
}

export async function deleteCapsule(id: string) {
  const ref = db().collection(COLLECTION).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return;
  const { storagePath } = doc.data() as Capsule;
  await bucket().file(storagePath).delete({ ignoreNotFound: true });
  await ref.delete();
}
