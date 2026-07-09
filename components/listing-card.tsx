"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { formatPrice, formatArea, type Listing } from "@/lib/listings";

const STATUS_LABEL: Record<Listing["status"], string> = {
  "en-vedette": "En vedette",
  "a-vendre": "À vendre",
  vendu: "Vendu",
};

export function ListingCard({
  listing,
  index = 0,
  tone = "light",
}: {
  listing: Listing;
  index?: number;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.1 }}
      className="group"
    >
      <Link href={`/proprietes/${listing.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="img-warm object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70" />
          <span className="absolute left-5 top-5 rounded-full bg-bone/90 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-ink backdrop-blur">
            {STATUS_LABEL[listing.status]}
          </span>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-bone">
            <div>
              <p className="flex items-center gap-1.5 text-xs tracking-wide text-bone/85">
                <MapPin strokeWidth={1.4} className="h-3.5 w-3.5" />
                {listing.city}
              </p>
            </div>
            <p className="font-display text-2xl font-light">
              {formatPrice(listing.price)}
            </p>
          </div>
        </div>

        <div className="pt-5">
          <p className={`eyebrow ${dark ? "text-taupe" : "text-clay"}`}>
            {listing.propertyType}
          </p>
          <h3
            className={`mt-2 font-display text-[1.6rem] font-light leading-tight transition-colors group-hover:text-gilt ${
              dark ? "text-bone" : "text-ink"
            }`}
          >
            {listing.title}
          </h3>

          <div
            className={`mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm ${
              dark ? "text-bone/70" : "text-smoke"
            }`}
          >
            {listing.bedrooms != null && (
              <span className="flex items-center gap-2">
                <BedDouble strokeWidth={1.4} className="h-4 w-4 text-taupe" />
                {listing.bedrooms} ch.
              </span>
            )}
            {listing.bathrooms != null && (
              <span className="flex items-center gap-2">
                <Bath strokeWidth={1.4} className="h-4 w-4 text-taupe" />
                {listing.bathrooms} sdb.
              </span>
            )}
            {formatArea(listing.livingArea) && (
              <span className="flex items-center gap-2">
                <Maximize strokeWidth={1.4} className="h-4 w-4 text-taupe" />
                {formatArea(listing.livingArea)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
