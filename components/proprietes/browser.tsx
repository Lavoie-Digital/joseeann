"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ListingCard } from "@/components/listing-card";
import type { Listing, ListingCategory } from "@/lib/listings";

type Filter = "tous" | ListingCategory;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "tous", label: "Toutes les propriétés" },
  { key: "residentiel", label: "Résidentiel" },
  { key: "commercial", label: "Commercial" },
];

const SORTS = [
  { key: "recent", label: "Plus récentes" },
  { key: "price-desc", label: "Prix décroissant" },
  { key: "price-asc", label: "Prix croissant" },
] as const;

type Sort = (typeof SORTS)[number]["key"];

export function ProprietesBrowser({ listings }: { listings: Listing[] }) {
  const [filter, setFilter] = useState<Filter>("tous");
  const [sort, setSort] = useState<Sort>("recent");

  const visible = useMemo(() => {
    let items =
      filter === "tous"
        ? [...listings]
        : listings.filter((l) => l.category === filter);
    items = items.sort((a, b) => {
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "price-asc") return a.price - b.price;
      return +new Date(b.updatedAt) - +new Date(a.updatedAt);
    });
    return items;
  }, [listings, filter, sort]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-taupe/30 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`relative rounded-full px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.18em] transition-colors duration-300 ${
                filter === f.key
                  ? "bg-ink text-bone"
                  : "border border-taupe/50 text-charcoal hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.16em] text-clay">
          Trier
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border-b border-taupe/60 bg-transparent py-1.5 pr-6 text-charcoal outline-none focus:border-ink"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-smoke">
        {visible.length} propriété{visible.length > 1 ? "s" : ""} disponible
        {visible.length > 1 ? "s" : ""}
      </p>

      <motion.div
        layout
        className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((listing, i) => (
            <motion.div
              key={listing.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <ListingCard listing={listing} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
