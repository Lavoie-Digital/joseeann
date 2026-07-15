import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { getListings } from "@/lib/listings";

/**
 * Plan du site — exposé automatiquement à /sitemap.xml
 * Inclut les pages statiques et chaque fiche de propriété.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/proprietes`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/vendre-acheter`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/conseils`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/a-propos`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  let listingRoutes: MetadataRoute.Sitemap = [];
  try {
    const listings = await getListings();
    listingRoutes = listings.map((l) => ({
      url: `${SITE.url}/proprietes/${l.slug}`,
      lastModified: l.updatedAt ? new Date(l.updatedAt) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Flux indisponible : on publie au moins les pages statiques.
  }

  return [...staticRoutes, ...listingRoutes];
}
