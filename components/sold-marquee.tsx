"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";

const SOLD = [
  "/vendu1.jpg",
  "/vendu2.jpg",
  "/vendu3.jpg",
  "/vendu4.jpg",
  "/vendu5.jpg",
  "/vendu6.jpg",
  "/vendu7.jpg",
  "/vendu8.jpg",
  "/vendu9.jpg",
  "/vendu10.jpg",
];

const CARD_STEP = 320; // largeur approximative d'une carte + espacement
const RESUME_DELAY = 4000; // reprise du défilement auto après une interaction manuelle

/* Mosaïque défilante des propriétés vendues — défilement auto, mais aussi
   déplaçable manuellement (flèches, glissement tactile ou molette). */
export function SoldMarquee() {
  // On duplique la liste pour un défilement en boucle sans coupure.
  const loop = [...SOLD, ...SOLD];
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    const step = () => {
      if (!paused.current) {
        const half = track.scrollWidth / 2;
        track.scrollLeft += 0.6;
        if (track.scrollLeft >= half) track.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pauseFor = (ms: number) => {
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      paused.current = false;
    }, ms);
  };

  const holdWhileHovered = () => {
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };
  const releaseHover = () => pauseFor(RESUME_DELAY);

  const scrollByStep = (dir: number) => {
    // On coupe le défilement auto le temps de l'animation, sinon les deux
    // écritures sur scrollLeft se battent et le clic semble ne rien faire.
    pauseFor(RESUME_DELAY);
    trackRef.current?.scrollBy({ left: dir * CARD_STEP, behavior: "smooth" });
  };

  const arrowBtn =
    "flex h-12 w-12 items-center justify-center rounded-full border border-bone/30 bg-bone/10 text-bone backdrop-blur transition-colors duration-300 hover:border-gilt hover:text-gilt";

  return (
    <section className="overflow-hidden border-y border-taupe/25 bg-ink py-20 lg:py-24">
      <Container>
        <Reveal className="text-center">
          <Eyebrow className="justify-center text-gilt">Ventes récentes</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-[clamp(1.9rem,4vw,3rem)] font-light leading-tight text-bone">
            Des propriétés vendues, des projets réalisés.
          </h2>
        </Reveal>
      </Container>

      <div
        className="relative mt-14"
        onMouseEnter={holdWhileHovered}
        onMouseLeave={releaseHover}
      >
        {/* Dégradés latéraux pour un fondu élégant */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

        <div
          ref={trackRef}
          onTouchStart={holdWhileHovered}
          onTouchEnd={releaseHover}
          className="flex w-full snap-x gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loop.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-56 w-72 shrink-0 snap-start overflow-hidden rounded-sm sm:h-64 sm:w-96"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 288px, 384px"
                className="img-warm object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation manuelle — sous la mosaïque, centrée */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollByStep(-1)}
          aria-label="Photos précédentes"
          className={arrowBtn}
        >
          <ChevronLeft strokeWidth={1.6} className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByStep(1)}
          aria-label="Photos suivantes"
          className={arrowBtn}
        >
          <ChevronRight strokeWidth={1.6} className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
