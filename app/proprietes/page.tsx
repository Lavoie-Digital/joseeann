import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { ProprietesBrowser } from "@/components/proprietes/browser";
import { getListings } from "@/lib/listings";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Propriétés",
  description:
    "Découvrez les propriétés résidentielles et commerciales que représente Josée-Ann Jomphe au Saguenay–Lac-Saint-Jean, mises à jour automatiquement avec Centris®.",
  alternates: { canonical: "/proprietes" },
};

export default async function ProprietesPage() {
  const listings = await getListings();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Propriétés à vendre — Josée-Ann Jomphe",
    numberOfItems: listings.length,
    itemListElement: listings.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(`/proprietes/${l.slug}`),
      name: l.title,
    })),
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <PageHero
        eyebrow="Portefeuille"
        title={
          <>
            Des propriétés qui méritent d&apos;être{" "}
            <span className="italic text-gilt">découvertes</span>
          </>
        }
        subtitle="Que vous cherchiez une maison pour votre famille, un investissement ou un nouveau départ, chaque propriété a quelque chose d'unique à offrir. Parcourez les inscriptions que je représente actuellement et trouvez celle qui correspond à votre projet."
        image="/onglet3.jpg"
      />

      <section className="bg-bone py-20 lg:py-28">
        <Container>
          <ProprietesBrowser listings={listings} />
        </Container>
      </section>
    </>
  );
}
