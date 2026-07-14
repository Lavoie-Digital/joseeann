import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { ProprietesBrowser } from "@/components/proprietes/browser";
import { getListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Propriétés",
  description:
    "Découvrez les propriétés résidentielles et commerciales que représente Josée-Ann Jomphe au Saguenay–Lac-Saint-Jean, mises à jour automatiquement avec Centris®.",
};

export default async function ProprietesPage() {
  const listings = await getListings();

  return (
    <>
      <PageHero
        eyebrow="Portefeuille"
        title={
          <>
            Des propriétés pour tous les{" "}
            <span className="italic text-gilt">projets de vie</span>
          </>
        }
        subtitle="Découvrez les propriétés que je représente actuellement au Saguenay. Qu'il s'agisse de votre première maison, d'un investissement ou d'un nouveau chapitre, chaque inscription mérite d'être découverte."
        image="/onglet1.jpg"
      />

      <section className="bg-bone py-20 lg:py-28">
        <Container>
          <ProprietesBrowser listings={listings} />
        </Container>
      </section>
    </>
  );
}
