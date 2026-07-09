import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { ProprietesBrowser } from "@/components/proprietes/browser";
import { getListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Propriétés",
  description:
    "Découvrez notre sélection de propriétés résidentielles et commerciales d'exception, synchronisée avec Centris®.",
};

export default async function ProprietesPage() {
  const listings = await getListings();

  return (
    <>
      <PageHero
        eyebrow="Portefeuille"
        title={
          <>
            Propriétés <span className="italic text-gilt">d&apos;exception</span>
          </>
        }
        subtitle="Une sélection rigoureuse de propriétés résidentielles et commerciales, mise à jour automatiquement au fil des inscriptions Centris®."
        image="/images/listing-6.jpg"
      />

      <section className="bg-bone py-20 lg:py-28">
        <Container>
          <ProprietesBrowser listings={listings} />
        </Container>
      </section>
    </>
  );
}
