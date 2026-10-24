import { revalidatePath, revalidateTag } from "next/cache";
import { CAPSULES_CACHE_TAG } from "@/lib/capsules";

/** Après chaque modification : la page d'accueil est à jour immédiatement. */
export function revalidateCapsules() {
  revalidateTag(CAPSULES_CACHE_TAG, { expire: 0 });
  revalidatePath("/");
}
