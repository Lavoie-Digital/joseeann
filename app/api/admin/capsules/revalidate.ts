import { revalidatePath, revalidateTag } from "next/cache";
import { CAPSULES_CACHE_TAG } from "@/lib/capsules";

/** Après chaque modification : l'accueil et les conseils sont à jour immédiatement. */
export function revalidateCapsules() {
  revalidateTag(CAPSULES_CACHE_TAG, { expire: 0 });
  revalidatePath("/");
  revalidatePath("/conseils");
}
