import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { AdminLogin } from "@/components/admin/admin-login";
import { CapsulesManager } from "@/components/admin/capsules-manager";
import { isAdmin } from "@/lib/admin-auth";
import { isFirebaseConfigured } from "@/lib/firebase-admin";
import { listCapsules, type Capsule } from "@/lib/capsules";

export const metadata: Metadata = {
  title: "Espace privé",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * Espace privé de Josée-Ann — gestion des capsules vidéo de la page d'accueil.
 * Accessible par le lien discret du footer, protégé par code (ADMIN_CODE).
 */
export default async function EspacePrivePage() {
  const authed = await isAdmin();

  let capsules: Capsule[] = [];
  let loadError = "";
  if (authed) {
    if (!isFirebaseConfigured()) {
      loadError = "Firebase n'est pas configuré sur le serveur (variables FIREBASE_*).";
    } else {
      try {
        capsules = await listCapsules();
      } catch (err) {
        console.error("[espace-prive] Lecture des capsules", err);
        loadError =
          "Impossible de joindre la base de données. Vérifiez que Firestore est activé dans Firebase.";
      }
    }
  }

  return (
    <section className="min-h-[80vh] bg-bone pb-24 pt-40 lg:pt-48">
      <Container>
        <Eyebrow>Espace privé</Eyebrow>
        <h1 className="mt-7 font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.05] text-ink">
          {authed ? "Mes capsules vidéo" : "Bienvenue, Josée-Ann"}
        </h1>

        <div className="mt-12">
          {authed ? (
            <CapsulesManager initial={capsules} loadError={loadError} />
          ) : (
            <AdminLogin />
          )}
        </div>
      </Container>
    </section>
  );
}
