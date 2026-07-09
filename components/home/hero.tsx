"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const SLIDES = [
  "/images/hero-estate.jpg",
  "/images/listing-1.jpg",
  "/images/interior-1.jpg",
  "/images/listing-3.jpg",
  "/images/kitchen-1.jpg",
  "/images/listing-6.jpg",
];

export function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink">
      {/* Slideshow en arrière-plan (fondu + léger zoom) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.8, ease: "easeInOut" },
            scale: { duration: 6.5, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[i]}
            alt=""
            fill
            priority
            sizes="100vw"
            className="img-warm object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Voile pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/75" />

      {/* Accents dorés sur les côtés */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-[26vw] max-w-[420px]"
        style={{
          background:
            "linear-gradient(to right, rgba(168,146,106,0.34), rgba(168,146,106,0.06) 45%, transparent)",
          mixBlendMode: "screen",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-[26vw] max-w-[420px]"
        style={{
          background:
            "linear-gradient(to left, rgba(168,146,106,0.34), rgba(168,146,106,0.06) 45%, transparent)",
          mixBlendMode: "screen",
        }}
      />
      {/* Fines lignes dorées verticales */}
      <motion.span
        aria-hidden
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
        className="pointer-events-none absolute left-[7vw] top-1/2 hidden h-52 w-px -translate-y-1/2 origin-center bg-gradient-to-b from-transparent via-gilt to-transparent lg:block"
      />
      <motion.span
        aria-hidden
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
        className="pointer-events-none absolute right-[7vw] top-1/2 hidden h-52 w-px -translate-y-1/2 origin-center bg-gradient-to-b from-transparent via-gilt to-transparent lg:block"
      />

      {/* Contenu centré */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="eyebrow text-bone/80"
        >
          Courtier immobilier · Résidentiel &amp; Commercial
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.45 }}
          className="mt-8 w-[min(72vw,420px)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
        >
          <Image
            src="/logo-mark-light.png"
            alt="Josée-Ann Jomphe — Courtier immobilier"
            width={524}
            height={486}
            priority
            className="h-auto w-full"
          />
        </motion.div>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1 }}
          className="mt-9 block h-px w-40 origin-center bg-gradient-to-r from-transparent via-gilt to-transparent"
        />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
          className="mt-8 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.2] text-bone"
        >
          L&apos;immobilier d&apos;exception mérite une signature.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.3 }}
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/proprietes"
            className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-gilt hover:text-bone"
          >
            Découvrir les propriétés
            <ArrowUpRight
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-full border border-bone/60 px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:border-bone hover:bg-bone/10"
          >
            Prendre rendez-vous
          </Link>
        </motion.div>
      </div>

      {/* Indicateurs du slideshow */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Voir la photo ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              idx === i ? "w-9 bg-gilt" : "w-4 bg-bone/50 hover:bg-bone"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
