import Image from "next/image";
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

/* Mosaïque défilante des propriétés vendues */
export function SoldMarquee() {
  // On duplique la liste pour un défilement en boucle sans coupure.
  const loop = [...SOLD, ...SOLD];

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

      <div className="relative mt-14">
        {/* Dégradés latéraux pour un fondu élégant */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

        <div className="marquee-track flex w-max gap-5">
          {loop.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-56 w-72 shrink-0 overflow-hidden rounded-sm sm:h-64 sm:w-96"
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
    </section>
  );
}
