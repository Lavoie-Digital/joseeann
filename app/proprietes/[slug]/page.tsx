import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, ButtonLink, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { Gallery } from "@/components/proprietes/gallery";
import {
  getListingBySlug,
  formatPrice,
  formatArea,
} from "@/lib/listings";
import { JsonLd } from "@/components/json-ld";
import { listingJsonLd, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import {
  BedDouble,
  Bath,
  Maximize,
  Car,
  CalendarDays,
  MapPin,
  ArrowLeft,
  LandPlot,
  ExternalLink,
} from "lucide-react";

// Le flux Centris évolue (nouvelles inscriptions, changements de statut) et
// n'est pas toujours accessible au moment du build. On rend donc la fiche à la
// demande, côté serveur, plutôt que de figer la liste des pages au build — ce
// qui évitait les 404 sur les inscriptions apparues (ou modifiées) après coup.
// Les données restent mises en cache via `revalidate` dans `syncFromCentris`.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return { title: "Propriété introuvable" };
  const path = `/proprietes/${listing.slug}`;
  const description = listing.description.slice(0, 155);
  return {
    title: listing.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${listing.title} · ${formatPrice(listing.price)}`,
      description,
      type: "website",
      url: absoluteUrl(path),
      images: listing.images.slice(0, 1).map((src) => ({ url: absoluteUrl(src) })),
    },
  };
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const specs = [
    listing.bedrooms != null && {
      icon: BedDouble,
      label: "Chambres",
      value: listing.bedrooms,
    },
    listing.bathrooms != null && {
      icon: Bath,
      label: "Salles de bain",
      value: listing.bathrooms,
    },
    listing.livingArea && {
      icon: Maximize,
      label: "Superficie",
      value: formatArea(listing.livingArea),
    },
    listing.lotArea && {
      icon: LandPlot,
      label: "Terrain",
      value: formatArea(listing.lotArea),
    },
    listing.parking != null && {
      icon: Car,
      label: "Stationnement",
      value: listing.parking,
    },
    listing.yearBuilt && {
      icon: CalendarDays,
      label: "Année",
      value: listing.yearBuilt,
    },
  ].filter(Boolean) as { icon: typeof BedDouble; label: string; value: React.ReactNode }[];

  return (
    <article className="bg-bone">
      <JsonLd
        data={[
          listingJsonLd(listing),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Propriétés", path: "/proprietes" },
            { name: listing.title, path: `/proprietes/${listing.slug}` },
          ]),
        ]}
      />
      <Container className="pt-32 lg:pt-40">
        <Link
          href="/proprietes"
          className="inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-clay transition-colors hover:text-ink"
        >
          <ArrowLeft strokeWidth={1.4} className="h-4 w-4" />
          Toutes les propriétés
        </Link>

        <div className="mt-8 flex flex-col justify-between gap-6 border-b border-taupe/30 pb-10 md:flex-row md:items-end">
          <div>
            <span className="eyebrow inline-flex items-center gap-3 text-clay">
              <span className="h-px w-8 bg-gilt" />
              {listing.propertyType}
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-light leading-tight text-ink">
              {listing.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-smoke">
              <MapPin strokeWidth={1.4} className="h-4 w-4 text-taupe" />
              {listing.address}, {listing.city} · {listing.region}
            </p>
          </div>
          <div className="md:text-right">
            <p className="font-display text-[clamp(2rem,3.5vw,3rem)] font-light text-ink">
              {formatPrice(listing.price)}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-clay">
              N° {listing.id}
            </p>
          </div>
        </div>
      </Container>

      <Container className="pt-10">
        <Gallery images={listing.images} title={listing.title} />
      </Container>

      <Container className="py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="grid grid-cols-2 gap-y-8 border-y border-taupe/30 py-10 sm:grid-cols-3">
                {specs.map((s) => (
                  <div key={s.label}>
                    <s.icon strokeWidth={1.3} className="h-5 w-5 text-gilt" />
                    <p className="mt-3 font-display text-2xl font-light text-ink">
                      {s.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.16em] text-clay">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-14 font-display text-3xl font-light text-ink">
                À propos de cette propriété
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-charcoal">
                {listing.description}
              </p>
            </Reveal>

            {listing.highlights.length > 0 && (
              <Reveal delay={0.15}>
                <div className="mt-12">
                  <Eyebrow>Caractéristiques marquantes</Eyebrow>
                  <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {listing.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 border-t border-taupe/30 pt-4 text-charcoal"
                      >
                        <span className="mt-2 h-px w-5 shrink-0 bg-gilt" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          {/* Encart contact courtier */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 border border-taupe/30 bg-sand p-8 lg:p-10">
              <Eyebrow>Votre courtier</Eyebrow>
              <p className="mt-6 font-display text-3xl font-light text-ink">
                Josée-Ann Jomphe
                <span className="ml-1 text-base text-clay">inc.</span>
              </p>
              <p className="mt-2 text-sm text-smoke">
                Courtier immobilier résidentiel et commercial
              </p>
              <p className="mt-6 text-sm leading-relaxed text-charcoal">
                Une question sur cette propriété ou envie d&apos;organiser une
                visite privée ? Il me fera plaisir de vous accompagner.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink
                  href={`/contact?propriete=${encodeURIComponent(listing.id)}`}
                  className="w-full justify-center"
                >
                  Demander une visite
                </ButtonLink>
                <a
                  href="tel:+15813061902"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-bone"
                >
                  581 306-1902
                </a>
              </div>

              {listing.centrisUrl && (
                <a
                  href={listing.centrisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.18em] text-clay transition-colors hover:text-ink"
                >
                  Voir la fiche complète sur Centris
                  <ExternalLink strokeWidth={1.4} className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
