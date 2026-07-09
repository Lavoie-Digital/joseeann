"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = (dir: number) =>
    setActive((a) => (a + dir + images.length) % images.length);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-12">
        <button
          onClick={() => setLightbox(true)}
          className="group relative aspect-[16/11] overflow-hidden md:col-span-8"
        >
          <Image
            src={images[active]}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="img-warm object-cover transition-transform duration-[1.2s] group-hover:scale-105"
          />
          <span className="absolute bottom-4 right-4 rounded-full bg-bone/90 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-ink opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            Agrandir
          </span>
        </button>

        <div className="grid grid-cols-4 gap-3 md:col-span-4 md:grid-cols-2">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden transition-opacity ${
                active === i ? "ring-1 ring-ink" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} — vue ${i + 1}`}
                fill
                sizes="20vw"
                className="img-warm object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              aria-label="Fermer"
              className="absolute right-6 top-6 text-bone/80 hover:text-bone"
              onClick={() => setLightbox(false)}
            >
              <X strokeWidth={1.4} className="h-8 w-8" />
            </button>
            <button
              aria-label="Précédent"
              className="absolute left-4 text-bone/70 hover:text-bone md:left-10"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
            >
              <ChevronLeft strokeWidth={1.2} className="h-10 w-10" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative h-[80vh] w-[90vw] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={title}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
            <button
              aria-label="Suivant"
              className="absolute right-4 text-bone/70 hover:text-bone md:right-10"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
            >
              <ChevronRight strokeWidth={1.2} className="h-10 w-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
