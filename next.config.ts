import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mediaserver.centris.ca",
      },
    ],
  },
};

export default nextConfig;
