import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Aucune mise en cache ISR/données en MÉMOIRE : Next bascule sur le cache
  // disque (.next/cache). Réduit fortement l'empreinte RAM sur un conteneur
  // 512 MB (Render), au prix de lectures de cache légèrement plus lentes.
  cacheMaxMemorySize: 0,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mediaserver.centris.ca",
      },
    ],
    // Un seul format (WebP) : on évite l'encodage AVIF, très gourmand en RAM.
    formats: ["image/webp"],
    // Moins de points de rupture = moins de variantes générées et gardées par
    // sharp → moins de pics mémoire et de churn de cache.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [256, 384],
    qualities: [75],
    // Cache disque des images optimisées gardé longtemps (31 jours) : évite de
    // ré-optimiser (donc de re-solliciter sharp) à chaque passage de crawler.
    minimumCacheTTL: 2_678_400,
  },
};

export default nextConfig;
