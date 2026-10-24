"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import type { Capsule } from "@/lib/capsules";

/**
 * Section « Capsules vidéo » de la page d'accueil.
 * Les vidéos (format vertical) sont gérées par Josée-Ann depuis /espace-prive.
 * Une seule joue à la fois.
 */
export function Capsules({ capsules }: { capsules: Capsule[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section className="border-t border-taupe/25 bg-bone py-20 lg:py-28">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Capsules vidéo</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
              L&apos;immobilier, en quelques minutes.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-base leading-relaxed text-smoke">
              Des conseils concrets, des coulisses et l&apos;actualité du marché
              au Saguenay–Lac-Saint-Jean, en vidéo.
            </p>
          </Reveal>
        </div>

        <Stagger className="-mx-6 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:-mx-10 lg:px-10">
          {capsules.map((c) => (
            <StaggerItem
              key={c.id}
              className="w-[68vw] max-w-[300px] shrink-0 snap-start sm:w-[42vw] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <CapsuleCard
                capsule={c}
                active={playing === c.id}
                onPlay={() => setPlaying(c.id)}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function CapsuleCard({
  capsule,
  active,
  onPlay,
}: {
  capsule: Capsule;
  active: boolean;
  onPlay: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  // Une autre capsule a pris la main : on met celle-ci en pause.
  useEffect(() => {
    if (!active) ref.current?.pause();
  }, [active]);

  function start() {
    setStarted(true);
    onPlay();
    ref.current?.play();
  }

  return (
    <article>
      <div className="relative aspect-[9/16] overflow-hidden bg-ink">
        <video
          ref={ref}
          src={`${capsule.videoUrl}#t=0.1`}
          preload="metadata"
          playsInline
          controls={started}
          onPlay={onPlay}
          className="h-full w-full object-cover"
        />
        {!started && (
          <button
            onClick={start}
            aria-label={`Lire la capsule : ${capsule.title}`}
            className="group absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-6 text-left"
          >
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/60 text-bone backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-gilt group-hover:text-gilt">
              <Play strokeWidth={1.2} className="ml-1 h-6 w-6" />
            </span>
            <span className="font-display text-2xl font-light leading-tight text-bone">
              {capsule.title}
            </span>
          </button>
        )}
      </div>
      {started && (
        <p className="mt-4 font-display text-xl font-light text-ink">{capsule.title}</p>
      )}
      {capsule.description && (
        <p className={`${started ? "mt-2" : "mt-4"} text-sm leading-relaxed text-smoke`}>
          {capsule.description}
        </p>
      )}
    </article>
  );
}
