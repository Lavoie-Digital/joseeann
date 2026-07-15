import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * Directives d'exploration — exposées automatiquement à /robots.txt
 * On autorise tous les robots (y compris les crawlers d'IA), sauf l'API,
 * et on pointe vers le sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
