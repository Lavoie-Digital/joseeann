/**
 * Synchronisation Centris — module d'intégration (DDF® Web API / OData).
 * ---------------------------------------------------------------------
 *
 * Ce module interroge le flux de distribution de données Centris
 * (https://datadistributionqc.centris.ca/v1/odata/) et transforme les
 * inscriptions au format standard RESO vers notre type applicatif `Listing`.
 *
 * Le flux est fourni via les variables d'environnement (voir `.env`) :
 *   CENTRIS_FEED_URL      Point d'accès Property (…/v1/odata/Property)
 *   CENTRIS_FEED_TOKEN    Clé d'accès (envoyée en `Authorization: Bearer …`)
 *   CENTRIS_AGENT_ID      ListAgentKey du courtier (filtre le flux)
 *
 * Seules les inscriptions ACTIVES (StandardStatus = 'Active') sont
 * récupérées : c'est ce qui s'affiche sur le site public.
 *
 * Remarque : le flux DDF ne renvoie pas de description publique
 * (`PublicRemarks` est vide). Une description factuelle est donc générée
 * à partir des caractéristiques de la propriété (voir `buildDescription`).
 */

import type { Listing, ListingCategory, ListingStatus } from "./listings";

/** Élément média (photo) tel que renvoyé par l'expansion `$expand=Media`. */
interface RawMedia {
  MediaURL?: string;
  MediaCategory?: string;
  MediaStatus?: string;
  Order?: number;
  ImageOf?: string;
}

/** Forme brute d'une inscription telle que reçue du flux DDF/Centris (RESO). */
interface RawCentrisListing {
  ListingId: string;
  ListingKey?: string;
  ListingURL?: string;
  PropertyType?: string;
  PropertySubType?: string;
  StandardStatus?: string;
  ListPrice?: number;
  PublicRemarks?: string;

  UnparsedAddress?: string;
  StreetNumberStart?: string;
  StreetShortName?: string;
  StreetName?: string;
  City?: string;
  Township?: string;
  StateRegion?: string;
  StateOrProvince?: string;
  PostalCode?: string;
  Latitude?: number;
  Longitude?: number;

  BedroomsTotal?: number;
  BathroomsTotalInteger?: number;
  BathroomsFull?: number;
  BathroomsPartial?: number;
  RoomsTotal?: number;

  LivingArea?: number;
  LotSizeArea?: number;
  LotSizeUnits?: string;
  YearBuilt?: number;
  ParkingTotal?: number;
  GarageSpaces?: number;
  GarageYN?: boolean;

  CoolingYN?: boolean;
  FireplaceYN?: boolean;
  PoolPrivateYN?: boolean;
  WaterfrontYN?: boolean;
  WaterBodyName?: string;
  View?: string[];
  Basement?: string[];

  Media?: RawMedia[];
  ModificationTimestamp?: string;
}

/** Facteur de conversion mètres carrés → pieds carrés. */
const SQM_TO_SQFT = 10.7639;

/** Image de repli si une inscription n'a aucune photo. */
const PLACEHOLDER_IMAGE = "/images/listing-5.jpg";

/** Libellés français des sous-types de propriété (valeurs RESO). */
const SUBTYPE_FR: Record<string, string> = {
  "Single Family Residence": "Maison unifamiliale",
  Duplex: "Duplex",
  Triplex: "Triplex",
  Fourplex: "Quadruplex",
  Quadruplex: "Quadruplex",
  Apartment: "Condominium",
  Condominium: "Condominium",
  "Mobile Home": "Maison mobile",
  "Manufactured Home": "Maison usinée",
  Townhouse: "Maison de ville",
  "Farm And Ranch": "Fermette",
  Land: "Terrain",
  "Vacant Land": "Terrain",
  "Commercial Sale": "Immeuble commercial",
  Business: "Commerce",
  "Office Space": "Espace de bureau",
};

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function frPropertyType(raw: RawCentrisListing): string {
  const sub = raw.PropertySubType ?? "";
  return SUBTYPE_FR[sub] ?? sub ?? "Propriété";
}

function mapCategory(raw: RawCentrisListing): ListingCategory {
  const t = `${raw.PropertyType ?? ""} ${raw.PropertySubType ?? ""}`.toLowerCase();
  return /commerc|bureau|office|industri|business|retail/.test(t)
    ? "commercial"
    : "residentiel";
}

function mapStatus(raw: RawCentrisListing): ListingStatus {
  const s = (raw.StandardStatus ?? "").toLowerCase();
  if (s === "closed" || s === "sold" || s.includes("vendu")) return "vendu";
  return "a-vendre";
}

function buildAddress(raw: RawCentrisListing): string {
  const street = raw.StreetShortName ?? raw.UnparsedAddress?.trim() ?? "";
  return [raw.StreetNumberStart, street].filter(Boolean).join(" ").trim();
}

function buildCity(raw: RawCentrisListing): string {
  return raw.City?.trim() || raw.Township?.trim() || "";
}

/** Nombre de salles de bain (complètes + demi-salles d'eau). */
function bathrooms(raw: RawCentrisListing): number | undefined {
  if (raw.BathroomsTotalInteger != null) return raw.BathroomsTotalInteger;
  const full = raw.BathroomsFull ?? 0;
  const partial = raw.BathroomsPartial ?? 0;
  const total = full + partial;
  return total > 0 ? total : undefined;
}

/** Superficie du terrain normalisée en pieds carrés. */
function lotAreaSqft(raw: RawCentrisListing): number | undefined {
  if (raw.LotSizeArea == null) return undefined;
  const isMeters = /meter|mètre|m²|square meter/i.test(raw.LotSizeUnits ?? "");
  return Math.round(raw.LotSizeArea * (isMeters ? SQM_TO_SQFT : 1));
}

/** Extrait les URLs des photos, triées selon l'ordre Centris. */
function extractImages(raw: RawCentrisListing): string[] {
  return (raw.Media ?? [])
    .filter(
      (m) =>
        m.MediaURL &&
        (m.MediaCategory ?? "Photo") === "Photo" &&
        (m.MediaStatus ?? "Active") === "Active"
    )
    .sort((a, b) => (a.Order ?? 0) - (b.Order ?? 0))
    .map((m) => m.MediaURL as string);
}

/** Caractéristiques marquantes déduites des champs du flux. */
function buildHighlights(raw: RawCentrisListing): string[] {
  const h: string[] = [];
  if (raw.WaterfrontYN) {
    h.push(raw.WaterBodyName ? `Bord de l'eau — ${raw.WaterBodyName}` : "Bord de l'eau");
  }
  if (raw.View?.some((v) => /water|lake|river|eau/i.test(v))) h.push("Vue sur l'eau");
  if (raw.View?.some((v) => /mountain|montagne/i.test(v))) h.push("Vue sur les montagnes");
  if (raw.FireplaceYN) h.push("Foyer");
  if (raw.PoolPrivateYN) h.push("Piscine");
  if (raw.GarageYN) {
    const n = raw.GarageSpaces ?? 0;
    h.push(n >= 2 ? `Garage (${Math.round(n)} places)` : "Garage");
  }
  if (raw.CoolingYN) h.push("Climatisation");
  if (raw.Basement?.some((b) => /finished|aménagé/i.test(b))) h.push("Sous-sol aménagé");
  return h;
}

/** Description factuelle générée (le flux DDF ne fournit pas de texte public). */
function buildDescription(raw: RawCentrisListing): string {
  const type = frPropertyType(raw).toLowerCase();
  const city = buildCity(raw);
  const parts: string[] = [];

  let intro = `${frPropertyType(raw)}`;
  if (raw.WaterfrontYN && raw.WaterBodyName) {
    intro += ` au bord du ${raw.WaterBodyName}`;
  } else if (city) {
    intro += ` située à ${city}`;
  }
  parts.push(intro + ".");

  const specs: string[] = [];
  if (raw.BedroomsTotal) specs.push(`${raw.BedroomsTotal} chambre${raw.BedroomsTotal > 1 ? "s" : ""}`);
  const bath = bathrooms(raw);
  if (bath) specs.push(`${bath} salle${bath > 1 ? "s" : ""} de bain`);
  if (specs.length) {
    parts.push(`Cette ${type} offre ${specs.join(" et ")}.`);
  }
  if (raw.YearBuilt) parts.push(`Construction de ${raw.YearBuilt}.`);

  const feats = buildHighlights(raw);
  if (feats.length) parts.push(`Atouts : ${feats.join(", ").toLowerCase()}.`);

  parts.push(
    `Communiquez avec Josée-Ann Jomphe pour obtenir tous les détails ou planifier une visite (inscription Centris® n° ${raw.ListingId}).`
  );
  return parts.join(" ");
}

/** Transforme une inscription brute du flux vers notre type `Listing`. */
export function normalizeListing(raw: RawCentrisListing): Listing {
  const city = buildCity(raw);
  const type = frPropertyType(raw);
  const title = city ? `${type} — ${city}` : `${type} (inscription ${raw.ListingId})`;
  const images = extractImages(raw);

  return {
    id: raw.ListingId,
    slug: slugify(`${type}-${city}-${raw.ListingId}`),
    category: mapCategory(raw),
    status: mapStatus(raw),
    title,
    propertyType: type,
    price: raw.ListPrice ?? 0,
    address: buildAddress(raw),
    city,
    region: raw.StateRegion ?? raw.StateOrProvince ?? "Québec",
    lat: raw.Latitude,
    lng: raw.Longitude,
    bedrooms: raw.BedroomsTotal,
    bathrooms: bathrooms(raw),
    livingArea: raw.LivingArea,
    lotArea: lotAreaSqft(raw),
    yearBuilt: raw.YearBuilt,
    parking: raw.ParkingTotal != null ? Math.round(raw.ParkingTotal) : undefined,
    description: raw.PublicRemarks?.trim() || buildDescription(raw),
    highlights: buildHighlights(raw),
    images: images.length > 0 ? images : [PLACEHOLDER_IMAGE],
    // Lien vers la fiche publique Centris.ca (et non la passerelle de la
    // bannière fournie par `ListingURL`). Centris redirige ce format vers
    // l'URL canonique de l'inscription.
    centrisUrl: `https://www.centris.ca/fr/propriete/${raw.ListingId}`,
    updatedAt: raw.ModificationTimestamp ?? new Date().toISOString(),
  };
}

/** Construit l'URL OData (inscriptions actives du courtier + photos). */
function buildFeedUrl(base: string, agentId?: string): string {
  const conditions = ["StandardStatus eq 'Active'"];
  if (agentId) conditions.push(`ListAgentKey eq '${agentId}'`);
  const params = new URLSearchParams({
    $filter: conditions.join(" and "),
    $expand: "Media",
  });
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}${params.toString()}`;
}

/**
 * Récupère et normalise les inscriptions ACTIVES depuis le flux Centris/DDF.
 * Retourne `null` si le flux n'est pas configuré (mode démo).
 */
export async function syncFromCentris(): Promise<Listing[] | null> {
  const url = process.env.CENTRIS_FEED_URL;
  const token = process.env.CENTRIS_FEED_TOKEN;
  const agentId = process.env.CENTRIS_AGENT_ID;

  if (!url || !token) {
    // Flux non configuré → l'application utilise les données de démo.
    return null;
  }

  const endpoint = buildFeedUrl(url, agentId);

  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    // Revalidation périodique — synchronisation « automatique » via ISR.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Flux Centris indisponible : ${res.status}`);
  }

  const data = (await res.json()) as { value?: RawCentrisListing[] };
  return (data.value ?? [])
    .map(normalizeListing)
    // Filet de sécurité : seules les inscriptions actives sur le site public.
    .filter((l) => l.status !== "vendu");
}
