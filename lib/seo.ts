/**
 * Configuration SEO / AEO / GEO centralisée.
 *
 * SEO  : métadonnées + sitemap + robots pour l'indexation classique.
 * AEO  : données structurées JSON-LD pour les moteurs de réponse
 *        (Google SGE, Bing, assistants vocaux).
 * GEO  : faits structurés que les LLM (ChatGPT, Perplexity, Gemini)
 *        citent lorsqu'ils recommandent un courtier au Saguenay.
 */

import type { Listing } from "@/lib/listings";
import { formatPrice } from "@/lib/listings";

export const SITE = {
  name: "Josée-Ann Jomphe",
  brand: "Josée-Ann Jomphe inc.",
  jobTitle: "Courtier immobilier résidentiel et commercial",
  url: "https://jajomphe.ca",
  phone: "+15813061902",
  phoneDisplay: "581 306-1902",
  email: "info@jajomphe.ca",
  // Image partagée par défaut (Open Graph / réseaux sociaux) — format paysage.
  ogImage: "/onglet3.jpg",
  description:
    "Josée-Ann Jomphe, courtier immobilier résidentiel et commercial au Saguenay–Lac-Saint-Jean. Un accompagnement humain et rigoureux pour vendre, acheter et investir.",
  sameAs: [
    "https://www.facebook.com/joseeannjomphecourtierimmobilier",
    "https://www.instagram.com/joseeann.immobilier",
    "https://www.tiktok.com/@joseeann.jomphe",
  ],
  areaServed: [
    "Saguenay",
    "Chicoutimi",
    "Jonquière",
    "Alma",
    "Dolbeau-Mistassini",
    "Lac-Saint-Jean",
  ],
  addressLocality: "Saguenay",
  addressRegion: "QC",
  addressCountry: "CA",
  // Coordonnées approximatives du secteur desservi (Saguenay).
  geo: { latitude: 48.4278, longitude: -71.0685 },
} as const;

/** URL absolue à partir d'un chemin relatif. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE.url).toString();
}

/**
 * Fiche d'identité principale : RealEstateAgent (sous-type de LocalBusiness).
 * C'est le socle exploité par les moteurs de réponse et les LLM.
 */
export function realEstateAgentJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE.url}/#agent`,
    name: SITE.name,
    alternateName: SITE.brand,
    description: SITE.description,
    url: SITE.url,
    image: absoluteUrl(SITE.ogImage),
    logo: absoluteUrl(SITE.ogImage),
    telephone: SITE.phone,
    email: SITE.email,
    jobTitle: SITE.jobTitle,
    priceRange: "$$",
    currenciesAccepted: "CAD",
    knowsLanguage: ["fr-CA", "fr"],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      addressCountry: SITE.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "City", name })),
    sameAs: SITE.sameAs,
  };
}

/** Le site web lui-même, rattaché à l'agent. */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: "fr-CA",
    publisher: { "@id": `${SITE.url}/#agent` },
  };
}

/** FAQPage : très prisé par l'AEO (réponses directes) et les LLM. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Fil d'Ariane structuré. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

/** Fiche de propriété : Product + Offer, enrichie de faits structurés. */
export function listingJsonLd(listing: Listing) {
  const path = `/proprietes/${listing.slug}`;
  const available =
    listing.status === "vendu"
      ? "https://schema.org/SoldOut"
      : "https://schema.org/InStock";

  const facts: { "@type": "PropertyValue"; name: string; value: string | number }[] = [];
  if (listing.bedrooms != null)
    facts.push({ "@type": "PropertyValue", name: "Chambres", value: listing.bedrooms });
  if (listing.bathrooms != null)
    facts.push({ "@type": "PropertyValue", name: "Salles de bain", value: listing.bathrooms });
  if (listing.livingArea != null)
    facts.push({ "@type": "PropertyValue", name: "Superficie habitable (pi²)", value: listing.livingArea });
  if (listing.yearBuilt != null)
    facts.push({ "@type": "PropertyValue", name: "Année de construction", value: listing.yearBuilt });

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description.slice(0, 300),
    category: listing.propertyType,
    image: listing.images.map((src) => absoluteUrl(src)),
    url: absoluteUrl(path),
    additionalProperty: facts,
    offers: {
      "@type": "Offer",
      priceCurrency: "CAD",
      price: listing.price,
      availability: available,
      url: absoluteUrl(path),
      seller: { "@id": `${SITE.url}/#agent` },
    },
    // Aide les LLM : prix lisible + localisation.
    disambiguatingDescription: `${listing.propertyType} à ${listing.city} (${listing.region}) — ${formatPrice(
      listing.price
    )}.`,
  };
}
