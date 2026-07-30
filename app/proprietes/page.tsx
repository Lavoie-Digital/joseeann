import type { Metadata } from "next";
import { Container, Eyebrow, PageHero } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ProprietesBrowser } from "@/components/proprietes/browser";
import { AlertForm } from "@/components/proprietes/alert-form";
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

      {/* Alerte propriété */}
      <section id="alerte" className="scroll-mt-20 border-t border-taupe/25 bg-sand py-20 lg:py-28">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Alerte propriété</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
                  Ne manquez plus la bonne propriété.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-md leading-relaxed text-smoke">
                  Précisez vos critères et soyez avisé personnellement dès
                  qu&apos;une propriété correspondante se présente sur le
                  marché — simple, rapide, sans engagement.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <div className="border border-taupe/30 bg-bone p-8 lg:p-12">
                  <AlertForm />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
