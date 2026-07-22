"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const PAGES = Array.from({ length: 18 }, (_, i) => `/GV${i + 1}.png`);
const TOTAL = PAGES.length;

export function GuideViewer() {
  const reduce = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = useState(false);

  const paginate = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + TOTAL) % TOTAL, dir]);
  }, []);

  const goTo = useCallback(
    (target: number) => {
      setState(([i]) => [target, target > i ? 1 : -1]);
    },
    [],
  );

  // Navigation au clavier (+ fermeture du plein écran)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
      else if (e.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  // Verrouille le défilement de la page en mode plein écran
  useEffect(() => {
    if (!zoom) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [zoom]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) paginate(1);
    else if (info.offset.x > 60) paginate(-1);
  };

  // Distingue un « tap » (ouvre le plein écran) d'un glissement (feuillette)
  const pointerStart = useRef({ x: 0, y: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };
  const onTap = (e: React.MouseEvent) => {
    const dx = Math.abs(e.clientX - pointerStart.current.x);
    const dy = Math.abs(e.clientY - pointerStart.current.y);
    if (dx < 8 && dy < 8) setZoom(true);
  };

  const variants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir > 0 ? 64 : -64,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduce ? 0 : dir > 0 ? -64 : 64,
    }),
  };

  const progress = ((index + 1) / TOTAL) * 100;

  const arrowBtn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-taupe/40 bg-bone/90 text-ink backdrop-blur transition-all duration-300 hover:border-gilt hover:text-gilt disabled:opacity-30";

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Cadre de la page */}
      <div className="relative">
        <div className="relative aspect-[1545/2000] overflow-hidden bg-sand shadow-[0_36px_70px_-28px_rgba(22,19,15,0.45)] ring-1 ring-taupe/30">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              onPointerDown={onPointerDown}
              onClick={onTap}
              style={{ touchAction: "pan-y" }}
              className="absolute inset-0 cursor-zoom-in active:cursor-grabbing"
            >
              <Image
                src={PAGES[index]}
                alt={`Guide du vendeur — page ${index + 1} sur ${TOTAL}`}
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="pointer-events-none select-none object-contain"
                priority={index === 0}
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Plein écran */}
          <button
            type="button"
            onClick={() => setZoom(true)}
            aria-label="Agrandir la page"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/70 text-bone backdrop-blur transition-colors hover:bg-ink"
          >
            <Expand strokeWidth={1.6} className="h-4 w-4" />
          </button>
        </div>

        {/* Flèches */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Page précédente"
          className={`${arrowBtn} absolute -left-3 top-1/2 -translate-y-1/2 sm:-left-5`}
        >
          <ChevronLeft strokeWidth={1.6} className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Page suivante"
          className={`${arrowBtn} absolute -right-3 top-1/2 -translate-y-1/2 sm:-right-5`}
        >
          <ChevronRight strokeWidth={1.6} className="h-5 w-5" />
        </button>
      </div>

      {/* Compteur + progression */}
      <div className="mt-6 flex items-center gap-4">
        <span className="font-display text-lg font-light text-ink tabular-nums">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-1 text-taupe">/</span>
          <span className="text-clay">{TOTAL}</span>
        </span>
        <div className="h-px flex-1 bg-taupe/30">
          <motion.div
            className="h-px bg-gilt"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: EASE }}
          />
        </div>
      </div>

      {/* Repères de pages */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {PAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Aller à la page ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 flex-1 min-w-[10px] rounded-full transition-colors duration-300 ${
              i === index ? "bg-gilt" : "bg-taupe/30 hover:bg-taupe/60"
            }`}
          />
        ))}
      </div>

      {/* Plein écran / lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-sm"
            onClick={() => setZoom(false)}
          >
            <button
              type="button"
              onClick={() => setZoom(false)}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 text-bone transition-colors hover:border-gilt hover:text-gilt"
            >
              <X strokeWidth={1.6} className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              aria-label="Page précédente"
              className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/30 text-bone transition-colors hover:border-gilt hover:text-gilt sm:flex sm:left-8"
            >
              <ChevronLeft strokeWidth={1.6} className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              aria-label="Page suivante"
              className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bone/30 text-bone transition-colors hover:border-gilt hover:text-gilt sm:flex sm:right-8"
            >
              <ChevronRight strokeWidth={1.6} className="h-6 w-6" />
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={onDragEnd}
              style={{ touchAction: "pan-y" }}
              className="absolute inset-0 flex items-center justify-center px-3 py-10 sm:px-24 sm:py-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full w-full">
                <Image
                  src={PAGES[index]}
                  alt={`Guide du vendeur — page ${index + 1} sur ${TOTAL}`}
                  fill
                  sizes="95vw"
                  className="select-none object-contain"
                  draggable={false}
                />
              </div>
            </motion.div>

            <span className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 font-display text-sm font-light text-bone/80 tabular-nums">
              {index + 1} / {TOTAL}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
