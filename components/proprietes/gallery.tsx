"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const open = (i: number) => {
    setActive(i);
    setLightbox(true);
  };

  const go = useCallback(
    (dir: number) =>
      setActive((a) => (a + dir + images.length) % images.length),
    [images.length]
  );

  // Navigation clavier + verrouillage du défilement quand la visionneuse est ouverte.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, go]);

  // Aperçu : image principale + jusqu'à 4 vignettes (la dernière affiche « +N »).
  const previews = images.slice(1, 5);
  const remaining = images.length - 5;

  return (
    <>
      <div className="grid gap-3 md:grid-cols-12">
        {/* Image principale */}
        <button
          onClick={() => open(0)}
          className="group relative aspect-[16/11] overflow-hidden md:col-span-8"
          aria-label="Ouvrir la galerie"
        >
          <Image
            src={images[0]}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="img-warm object-cover transition-transform duration-[1.2s] group-hover:scale-105"
          />
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-bone/90 px-4 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-ink backdrop-blur transition-opacity">
            <Images strokeWidth={1.5} className="h-3.5 w-3.5" />
            {images.length} photo{images.length > 1 ? "s" : ""}
          </span>
        </button>

        {/* Aperçu : 2 x 2 vignettes */}
        {previews.length > 0 && (
          <div className="grid grid-cols-4 gap-3 md:col-span-4 md:grid-cols-2">
            {previews.map((img, i) => {
              const index = i + 1;
              const isLast = i === previews.length - 1;
              const showMore = isLast && remaining > 0;
              return (
                <button
                  key={img}
                  onClick={() => open(index)}
                  className="group relative aspect-square overflow-hidden"
                  aria-label={`Voir la photo ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${title} — vue ${index + 1}`}
                    fill
                    sizes="20vw"
                    className="img-warm object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {showMore && (
                    <span className="absolute inset-0 flex flex-col items-center justify-center bg-ink/65 text-bone backdrop-blur-[1px]">
                      <span className="font-display text-2xl font-light">
                        +{remaining}
                      </span>
                      <span className="text-[0.6rem] uppercase tracking-[0.2em]">
                        photos
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bouton « voir toutes les photos » */}
      <button
        onClick={() => open(0)}
        className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-ink px-6 py-3 text-[0.75rem] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-bone"
      >
        <Images strokeWidth={1.5} className="h-4 w-4" />
        Voir toutes les photos ({images.length})
      </button>

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
              className="absolute right-6 top-6 z-10 text-bone/80 hover:text-bone"
              onClick={() => setLightbox(false)}
            >
              <X strokeWidth={1.4} className="h-8 w-8" />
            </button>

            <span className="absolute left-1/2 top-7 -translate-x-1/2 text-sm tracking-[0.2em] text-bone/70">
              {active + 1} / {images.length}
            </span>

            <button
              aria-label="Précédent"
              className="absolute left-4 z-10 text-bone/70 hover:text-bone md:left-10"
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
                alt={`${title} — vue ${active + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <button
              aria-label="Suivant"
              className="absolute right-4 z-10 text-bone/70 hover:text-bone md:right-10"
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
