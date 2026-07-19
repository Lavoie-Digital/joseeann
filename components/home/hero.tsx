"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GoogleBadge } from "@/components/reviews";

const EASE = [0.22, 1, 0.36, 1] as const;

const SLIDES_DESKTOP = [
  "/carousel-pc1.jpg",
  "/carousel-pc2.jpg",
  "/carousel-pc3.jpg",
];

const SLIDES_MOBILE = [
  "/carousel-mobile1.jpg",
  "/carousel-mobile2.jpg",
  "/carousel-mobile3.jpg",
];

const SLIDE_COUNT = SLIDES_DESKTOP.length;

export function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDE_COUNT), 5000);
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
          {/* Version mobile (téléphone) */}
          <Image
            src={SLIDES_MOBILE[i]}
            alt=""
            fill
            priority
            sizes="100vw"
            className="img-warm object-cover md:hidden"
          />
          {/* Version PC (ordinateur) */}
          <Image
            src={SLIDES_DESKTOP[i]}
            alt=""
            fill
            priority
            sizes="100vw"
            className="img-warm hidden object-cover md:block"
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
      <div className="relative z-10 flex flex-col items-center px-6 pb-8 pt-12 text-center sm:pb-16 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.45 }}
          className="w-[min(44vw,440px)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
        >
          <Image
            src="/logo-mark-light.png"
            alt="Josée-Ann Jomphe inc. — Courtier immobilier résidentiel et commercial"
            width={729}
            height={536}
            priority
            className="h-auto w-full"
          />
        </motion.div>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1 }}
          className="mt-5 block h-px w-40 origin-center bg-gradient-to-r from-transparent via-gilt to-transparent sm:mt-9"
        />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
          className="mt-4 max-w-2xl font-display text-[clamp(1.4rem,3.6vw,3rem)] font-light leading-[1.2] text-bone sm:mt-8"
        >
          Au-delà de l&apos;immobilier, il y a des décisions qui changent une
          vie.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.25 }}
          className="mt-3 max-w-2xl text-sm leading-snug text-bone/80 sm:mt-7 sm:text-base sm:leading-relaxed"
        >
          Je suis Josée-Ann Jomphe, courtier immobilier résidentiel et
          commercial au Saguenay. Depuis plus de 5 ans, j&apos;aide mes clients
          à prendre l&apos;une des plus grandes décisions de leur vie en misant
          sur la confiance, la transparence et un accompagnement humain. Parce
          qu&apos;au-delà des propriétés, ce sont les personnes et leur histoire
          qui comptent vraiment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-11 sm:gap-4"
        >
          <Link
            href="/proprietes"
            className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-6 py-3 text-[0.78rem] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-gilt hover:text-bone sm:px-8 sm:py-4"
          >
            Explorer les propriétés
            <ArrowUpRight
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
          <Link
            href="/contact?sujet=evaluation"
            className="inline-flex items-center gap-2.5 rounded-full border border-bone/60 px-6 py-3 text-[0.78rem] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:border-bone hover:bg-bone/10 sm:px-8 sm:py-4"
          >
            Connaître la valeur de ma propriété
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.6 }}
          className="mt-4 sm:mt-8"
        >
          <GoogleBadge tone="dark" />
        </motion.div>
      </div>
    </section>
  );
}
