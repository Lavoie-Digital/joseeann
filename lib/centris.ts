/**
 * Synchronisation Centris — module d'intégration.
 * ------------------------------------------------
 *
 * Centris n'expose PAS d'API publique ouverte aux développeurs. Le transfert
 * automatique des inscriptions d'un courtier vers un site web se fait, en
 * pratique, par l'une des voies suivantes :
 *
 *   1. Flux DDF® (Data Distribution Facility) de l'ACI/CREA
 *      → l'agence active le flux pour le courtier ; on reçoit un accès
 *        RETS/Web API (OData) renvoyant les inscriptions au format standard.
 *
 *   2. Flux XML/CSV fourni par la bannière (ex. RE/MAX, Sutton, Via Capitale…)
 *      → un fichier d'export est déposé périodiquement (FTP/HTTPS) ; on le
 *        télécharge et on le transforme.
 *
 *   3. Passerelle tierce (ex. Centris Web, myRealPage, etc.)
 *      → widget ou API partenaire, selon l'entente de l'agence.
 *
 * Ce module fournit l'INTERFACE et le pipeline de transformation. Il suffira
 * de brancher les identifiants du flux réel de Josée-Ann (variables
 * d'environnement ci-dessous) pour activer la synchronisation automatique.
 *
 * Variables d'environnement attendues :
 *   CENTRIS_FEED_URL      URL du flux (DDF Web API / export XML)
 *   CENTRIS_FEED_TOKEN    Jeton d'accès ou identifiants
 *   CENTRIS_AGENT_ID      Identifiant du courtier (pour filtrer le flux)
 */

import type { Listing, ListingCategory, ListingStatus } from "./listings";

/** Forme brute d'une inscription telle que reçue d'un flux DDF/Centris. */
interface RawCentrisListing {
  ListingId: string;
  PropertyType?: string;
  TransactionType?: string;
  ListPrice?: number;
  PublicRemarks?: string;
  UnparsedAddress?: string;
  City?: string;
  StateOrProvince?: string;
  Latitude?: number;
  Longitude?: number;
  BedroomsTotal?: number;
  BathroomsTotalInteger?: number;
  LivingArea?: number;
  LotSizeArea?: number;
  YearBuilt?: number;
  ParkingTotal?: number;
  Media?: { MediaURL: string }[];
  ModificationTimestamp?: string;
}

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapCategory(raw: RawCentrisListing): ListingCategory {
  const t = (raw.PropertyType ?? "").toLowerCase();
  return /commerc|bureau|industri|terrain commercial|multi/.test(t)
    ? "commercial"
    : "residentiel";
}

function mapStatus(raw: RawCentrisListing): ListingStatus {
  const t = (raw.TransactionType ?? "").toLowerCase();
  if (t.includes("sold") || t.includes("vendu")) return "vendu";
  return "a-vendre";
}

/** Transforme une inscription brute du flux vers notre type `Listing`. */
export function normalizeListing(raw: RawCentrisListing): Listing {
  const city = raw.City ?? "";
  const title = raw.PropertyType
    ? `${raw.PropertyType} — ${city}`
    : `Inscription ${raw.ListingId}`;

  return {
    id: raw.ListingId,
    slug: slugify(`${raw.PropertyType ?? "propriete"}-${city}-${raw.ListingId}`),
    category: mapCategory(raw),
    status: mapStatus(raw),
    title,
    propertyType: raw.PropertyType ?? "Propriété",
    price: raw.ListPrice ?? 0,
    address: raw.UnparsedAddress ?? "",
    city,
    region: raw.StateOrProvince ?? "Québec",
    lat: raw.Latitude,
    lng: raw.Longitude,
    bedrooms: raw.BedroomsTotal,
    bathrooms: raw.BathroomsTotalInteger,
    livingArea: raw.LivingArea,
    lotArea: raw.LotSizeArea,
    yearBuilt: raw.YearBuilt,
    parking: raw.ParkingTotal,
    description: raw.PublicRemarks ?? "",
    highlights: [],
    images: (raw.Media ?? []).map((m) => m.MediaURL),
    updatedAt: raw.ModificationTimestamp ?? new Date().toISOString(),
  };
}

/**
 * Récupère et normalise les inscriptions depuis le flux Centris/DDF.
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

  const endpoint = agentId
    ? `${url}?$filter=ListAgentKey eq '${agentId}'`
    : url;

  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    // Revalidation périodique — synchronisation « automatique » via ISR.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Flux Centris indisponible : ${res.status}`);
  }

  const data = (await res.json()) as { value?: RawCentrisListing[] };
  return (data.value ?? []).map(normalizeListing);
}
