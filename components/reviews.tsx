"use client";

import { useReducedMotion } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal, motion, EASE } from "@/components/motion";

/**
 * Témoignages clients (avis Google).
 * Pour ajouter un avis : copier une entrée dans REVIEWS ci-dessous.
 */

export type Review = {
  author: string;
  text: string;
  rating?: number; // sur 5 (défaut : 5)
};

export const REVIEWS: Review[] = [
  {
    author: "Véronique Duchesne",
    text: "Grâce à toi j'ai pu dormir sur mes deux oreilles dès le jour 1 ☺️ J'étais en confiance totale! Ce sera ma seule expérience car je n'aurai plus de maison, mais j'ai pu avoir la meilleure et je te recommanderai haut la main 😉",
  },
  {
    author: "Jean-Pier Gravel",
    text: "Une approche humaine pour la plus grande transaction d'une vie, dans un milieu où ça peut parfois aller vite et nous faire sentir complètement perdus… si ça vous parle, vous y êtes!",
  },
  {
    author: "Béatrice Filion",
    text: "Une courtière extraordinaire, professionnelle, disponible, à l'écoute qui nous accompagne tout au long du processus. Merci d'avoir rendue cette grande étape douce et simple.",
  },
  {
    author: "Mathieu Girouard",
    text: "Parfait du début à la fin. Je recommande fortement. Vente rapide grâce à son expertise, ses bons conseils, et la visibilité qu'elle offre grâce à ses réseaux et ses vidéos personnalisées.",
  },
  {
    author: "Francis Boudreault",
    text: "Une « vraie ». Un côté humain que ça prend dans ce genre de transaction, Josée-Ann nous offre tout cela et +++. On se sent bien accompagné et ça fait toute la différence! merci !",
  },
  {
    author: "Simon-Olivier Côté",
    text: "Une agente hors pair. Disponible et professionnelle. C'est ma deuxième expérience avec Josée-Ann et ce ne sera pas la dernière fois.",
  },
];

// Recherche Google sur le nom de la courtière.
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=Jos%C3%A9e-Ann+Jomphe";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i < n ? "text-gilt" : "text-taupe/40"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5-5.9-3.1-5.9 3.1 1.2-6.5L3.5 9.4l6.6-.9L12 2.5z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1C6.2 6.9 8.9 4.8 12 4.8z"
      />
    </svg>
  );
}

/** Petite pastille « Avis Google · 5,0 » à placer un peu partout. */
export function GoogleBadge({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const base =
    tone === "dark"
      ? "border-bone/25 bg-bone/10 text-bone"
      : "border-taupe/40 bg-bone text-ink";
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm transition-colors hover:border-gilt ${base} ${className}`}
    >
      <GoogleG className="h-4 w-4" />
      <span className="font-medium">5,0</span>
      <Stars n={5} />
      <span className={tone === "dark" ? "text-bone/60" : "text-clay"}>
        Avis Google
      </span>
    </a>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const single = REVIEWS.length === 1;
  // Léger tremblement (déplacement + rotation minimes) qui s'atténue.
  const shake = { rotate: [0, -0.6, 0.6, -0.4, 0.4, 0], x: [0, -2, 2, -1.5, 1.5, 0] };

  return (
    <section className="bg-bone py-20 lg:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Témoignages</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-ink">
                La confiance, ça se raconte.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <GoogleBadge />
          </Reveal>
        </div>

        <div
          className={`mt-14 grid gap-8 ${
            single ? "max-w-3xl" : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.author}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={
                reduce
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: 0,
                      ...shake,
                      transition: {
                        duration: 0.7,
                        ease: EASE,
                        delay: i * 0.1,
                        // Le tremblement joue juste après l'apparition.
                        rotate: { duration: 0.6, delay: i * 0.1 + 0.35 },
                        x: { duration: 0.6, delay: i * 0.1 + 0.35 },
                      },
                    }
              }
              whileHover={
                reduce ? undefined : { ...shake, transition: { duration: 0.6 } }
              }
              viewport={{ once: true, margin: "-10% 0px" }}
              className="group flex h-full flex-col border border-taupe/30 bg-sand/50 p-8 transition-[border-color,background-color,box-shadow] duration-300 hover:border-gilt/60 hover:bg-sand hover:shadow-[0_24px_48px_-28px_rgba(22,19,15,0.4)] lg:p-10"
            >
              <span className="font-display text-6xl leading-none text-gilt/40 transition-colors duration-300 group-hover:text-gilt/70">
                &ldquo;
              </span>
              <Stars n={r.rating ?? 5} />
              <blockquote
                className={`mt-4 flex-1 leading-relaxed text-charcoal ${
                  single ? "text-lg lg:text-xl" : "text-base"
                }`}
              >
                {r.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-taupe/30 pt-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gilt/15 font-display text-lg text-gilt transition-transform duration-300 group-hover:scale-110">
                  {r.author.charAt(0)}
                </span>
                <span>
                  <span className="block font-medium text-ink">{r.author}</span>
                  <span className="flex items-center gap-1.5 text-xs text-clay">
                    <GoogleG className="h-3.5 w-3.5" />
                    Avis Google
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
