/**
 * Couche de données « annonces » (listings).
 *
 * Le type `Listing` reflète les champs standards d'un flux Centris / DDF®
 * (Data Distribution Facility) afin que la synchronisation automatique
 * (voir `lib/centris.ts`) puisse alimenter directement cette structure.
 *
 * En démo, les données proviennent de `demoListings`. En production,
 * `getListings()` interrogera le cache alimenté par le flux Centris.
 */

export type ListingCategory = "residentiel" | "commercial";
export type ListingStatus = "a-vendre" | "en-vedette" | "vendu";

export interface Listing {
  /** Numéro d'inscription Centris (MLS®) */
  id: string;
  slug: string;
  category: ListingCategory;
  status: ListingStatus;
  title: string;
  /** Type de propriété : Maison, Condo, Terrain, Immeuble commercial… */
  propertyType: string;
  price: number;
  address: string;
  city: string;
  region: string;
  /** Coordonnées pour une future carte */
  lat?: number;
  lng?: number;
  bedrooms?: number;
  bathrooms?: number;
  /** Superficie habitable en pieds carrés */
  livingArea?: number;
  /** Superficie du terrain en pieds carrés */
  lotArea?: number;
  yearBuilt?: number;
  parking?: number;
  description: string;
  highlights: string[];
  /** Première image = image de couverture */
  images: string[];
  /** Date de mise à jour (ISO) — provenant du flux */
  updatedAt: string;
}

export const demoListings: Listing[] = [
  {
    id: "MLS-24851037",
    slug: "residence-contemporaine-westmount",
    category: "residentiel",
    status: "en-vedette",
    title: "Résidence contemporaine sur les hauteurs",
    propertyType: "Maison unifamiliale",
    price: 4750000,
    address: "412 Avenue Clarke",
    city: "Westmount",
    region: "Montréal",
    lat: 45.4869,
    lng: -73.5987,
    bedrooms: 5,
    bathrooms: 4,
    livingArea: 5200,
    lotArea: 7800,
    yearBuilt: 2019,
    parking: 3,
    description:
      "Une œuvre architecturale d'une rare épuration, nichée sur les hauteurs de Westmount. Les volumes s'ouvrent sur la lumière du sud, où le calcaire, le chêne blanchi et le verre dialoguent en toute retenue. Chaque pièce a été pensée comme un espace de vie serein, à la hauteur des exigences les plus fines.",
    highlights: [
      "Fenestration pleine hauteur plein sud",
      "Cuisine sur mesure en noyer et pierre calcaire",
      "Suite principale avec terrasse privée",
      "Domotique intégrée et cinéma maison",
    ],
    images: [
      "/images/listing-1.jpg",
      "/images/interior-1.jpg",
      "/images/kitchen-1.jpg",
      "/images/interior-2.jpg",
    ],
    updatedAt: "2026-06-28T10:00:00Z",
  },
  {
    id: "MLS-24773905",
    slug: "penthouse-vieux-montreal",
    category: "residentiel",
    status: "en-vedette",
    title: "Penthouse signature au cœur du Vieux-Montréal",
    propertyType: "Condominium",
    price: 3195000,
    address: "55 Rue Saint-Paul Ouest, PH",
    city: "Montréal",
    region: "Vieux-Montréal",
    lat: 45.5017,
    lng: -73.5551,
    bedrooms: 3,
    bathrooms: 3,
    livingArea: 3100,
    yearBuilt: 2021,
    parking: 2,
    description:
      "Perché au sommet d'un immeuble patrimonial magistralement restauré, ce penthouse conjugue pierre d'origine et design contemporain. Une terrasse enveloppante offre une vue imprenable sur le fleuve et les clochers du Vieux-Port.",
    highlights: [
      "Terrasse panoramique de 900 pi²",
      "Plafonds de 12 pieds et poutres d'origine",
      "Accès privé par ascenseur",
      "Service de conciergerie 24 h",
    ],
    images: [
      "/images/listing-2.jpg",
      "/images/interior-3.jpg",
      "/images/interior-4.jpg",
    ],
    updatedAt: "2026-06-25T14:30:00Z",
  },
  {
    id: "MLS-24690112",
    slug: "chalet-prestige-mont-tremblant",
    category: "residentiel",
    status: "a-vendre",
    title: "Chalet de prestige en bordure de lac",
    propertyType: "Maison de villégiature",
    price: 2890000,
    address: "180 Chemin du Lac-Tremblant-Nord",
    city: "Mont-Tremblant",
    region: "Laurentides",
    lat: 46.2085,
    lng: -74.585,
    bedrooms: 4,
    bathrooms: 3,
    livingArea: 4100,
    lotArea: 42000,
    yearBuilt: 2016,
    parking: 4,
    description:
      "Un refuge d'exception les pieds dans l'eau, où le bois massif et la pierre des champs répondent à la nature environnante. Grandes baies vitrées sur le lac, quai privé et accès direct aux sentiers — l'art de vivre laurentien dans sa plus noble expression.",
    highlights: [
      "Accès et quai privés sur le lac",
      "Foyer de pierre à deux faces",
      "Spa extérieur et sauna finlandais",
      "160 pieds de rivage",
    ],
    images: [
      "/images/listing-3.jpg",
      "/images/interior-2.jpg",
      "/images/interior-1.jpg",
    ],
    updatedAt: "2026-06-20T09:15:00Z",
  },
  {
    id: "MLS-24612488",
    slug: "maison-architecte-outremont",
    category: "residentiel",
    status: "a-vendre",
    title: "Maison d'architecte à Outremont",
    propertyType: "Maison unifamiliale",
    price: 3650000,
    address: "88 Avenue Maplewood",
    city: "Montréal",
    region: "Outremont",
    lat: 45.5165,
    lng: -73.6087,
    bedrooms: 5,
    bathrooms: 4,
    livingArea: 4600,
    lotArea: 6200,
    yearBuilt: 1927,
    parking: 2,
    description:
      "Le charme intemporel d'Outremont sublimé par une rénovation d'une élégance absolue. Moulures d'origine, parquets à chevrons et interventions contemporaines cohabitent avec une justesse remarquable, à deux pas des institutions et du mont Royal.",
    highlights: [
      "Cachet patrimonial entièrement restauré",
      "Jardin paysager clos",
      "Cuisine gastronomique et cellier",
      "Bureau et bibliothèque sur mesure",
    ],
    images: [
      "/images/listing-4.jpg",
      "/images/interior-4.jpg",
      "/images/kitchen-1.jpg",
    ],
    updatedAt: "2026-06-18T16:45:00Z",
  },
  {
    id: "MLS-24501977",
    slug: "immeuble-commercial-plateau",
    category: "commercial",
    status: "a-vendre",
    title: "Immeuble commercial de prestige — artère prisée",
    propertyType: "Immeuble commercial",
    price: 6250000,
    address: "1240 Boulevard Saint-Laurent",
    city: "Montréal",
    region: "Plateau-Mont-Royal",
    lat: 45.5135,
    lng: -73.5698,
    livingArea: 14500,
    yearBuilt: 1908,
    parking: 6,
    description:
      "Un actif commercial rare sur l'une des artères les plus recherchées de Montréal. Façade patrimoniale, espaces locatifs entièrement rénovés et fort achalandage — une opportunité d'investissement de premier ordre, idéale pour un portefeuille exigeant.",
    highlights: [
      "Emplacement de coin à fort achalandage",
      "5 espaces locatifs, taux d'occupation de 100 %",
      "Revenus nets stables et baux long terme",
      "Zonage commercial mixte flexible",
    ],
    images: [
      "/images/commercial-1.jpg",
      "/images/commercial-2.jpg",
    ],
    updatedAt: "2026-06-15T11:00:00Z",
  },
  {
    id: "MLS-24488301",
    slug: "espace-bureau-quartier-affaires",
    category: "commercial",
    status: "a-vendre",
    title: "Plateau de bureaux — quartier des affaires",
    propertyType: "Espace de bureau",
    price: 4980000,
    address: "600 Rue De La Gauchetière Ouest",
    city: "Montréal",
    region: "Centre-ville",
    lat: 45.4995,
    lng: -73.5666,
    livingArea: 11200,
    yearBuilt: 2014,
    parking: 12,
    description:
      "Plateau de bureaux clé en main au cœur du quartier des affaires, offrant des vues dégagées et des finitions haut de gamme. Aménagement flexible, certification écoénergétique et accès direct au réseau souterrain — l'adresse idéale pour une entreprise d'envergure.",
    highlights: [
      "Certification LEED Or",
      "Accès direct au RÉSO (ville souterraine)",
      "Aménagement à aire ouverte modulable",
      "Stationnement intérieur sécurisé",
    ],
    images: [
      "/images/commercial-2.jpg",
      "/images/commercial-1.jpg",
    ],
    updatedAt: "2026-06-12T13:20:00Z",
  },
];

/* ------------------------------------------------------------------ */
/* Accès aux données (async pour refléter une future source distante) */
/* ------------------------------------------------------------------ */

export async function getListings(filter?: {
  category?: ListingCategory;
}): Promise<Listing[]> {
  let items = [...demoListings];
  if (filter?.category) {
    items = items.filter((l) => l.category === filter.category);
  }
  return items;
}

export async function getFeaturedListings(limit = 3): Promise<Listing[]> {
  const items = demoListings
    .filter((l) => l.status === "en-vedette")
    .concat(demoListings.filter((l) => l.status !== "en-vedette"));
  return items.slice(0, limit);
}

export async function getListingBySlug(
  slug: string
): Promise<Listing | undefined> {
  return demoListings.find((l) => l.slug === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatArea(sqft?: number): string | null {
  if (!sqft) return null;
  return `${new Intl.NumberFormat("fr-CA").format(sqft)} pi²`;
}
