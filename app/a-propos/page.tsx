import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Quote, Gem, HandHeart, Compass, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Josée-Ann Jomphe, courtier immobilier — une approche humaine, rigoureuse et discrète du courtage résidentiel et commercial haut de gamme.",
};

const VALUES = [
  { icon: Gem, title: "Excellence", text: "Un souci du détail qui se lit dans chaque photo, chaque visite, chaque négociation." },
  { icon: HandHeart, title: "Écoute", text: "Vos objectifs guident chaque décision. Aucun projet n'est traité comme un autre." },
  { icon: ShieldCheck, title: "Intégrité", text: "Transparence totale et conseils honnêtes, même quand ils ne sont pas les plus faciles." },
  { icon: Compass, title: "Vision", text: "Une lecture fine du marché pour saisir le bon moment et la juste valeur." },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero split */}
      <section className="bg-bone pt-28 lg:pt-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <Eyebrow>Votre courtier</Eyebrow>
                <h1 className="mt-7 font-display text-[clamp(2.6rem,6vw,5rem)] font-light leading-[1.03] text-ink">
                  Josée-Ann Jomphe
                </h1>
                <p className="mt-3 text-lg text-clay">
                  Courtier immobilier agréé · Résidentiel &amp; Commercial
                </p>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-charcoal">
                  Depuis plus de douze ans, j&apos;accompagne des propriétaires
                  et des acquéreurs exigeants à travers ce que la vie a de plus
                  précieux : le lieu que l&apos;on habite, l&apos;actif que
                  l&apos;on bâtit.
                </p>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-smoke">
                  Mon approche est simple : moins de bruit, plus de justesse. Une
                  disponibilité réelle, une mise en marché soignée et une
                  négociation menée avec fermeté et élégance — pour que chaque
                  transaction se vive sereinement.
                </p>
                <div className="mt-10">
                  <ButtonLink href="/contact">Me contacter</ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/Photo courtiere.jpg"
                    alt="Josée-Ann Jomphe"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="img-warm object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border border-gilt/50 lg:block" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Chiffres */}
      <section className="mt-24 border-y border-taupe/25 bg-sand py-16 lg:mt-32">
        <Container>
          <Stagger className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {[
              { v: "150 M$+", l: "en transactions" },
              { v: "300+", l: "familles accompagnées" },
              { v: "12 ans", l: "d'expérience" },
              { v: "98 %", l: "de clients fidèles" },
            ].map((s) => (
              <StaggerItem key={s.l} className="text-center">
                <p className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-light text-ink">
                  {s.v}
                </p>
                <p className="mt-2 text-sm tracking-wide text-clay">{s.l}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Valeurs */}
      <section className="bg-bone py-24 lg:py-32">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Ce qui me guide</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-ink">
                Quatre valeurs, une même exigence.
              </h2>
            </Reveal>
          </div>
          <Stagger className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="border-t border-taupe/40 pt-6">
                  <v.icon strokeWidth={1.2} className="h-8 w-8 text-gilt" />
                  <h3 className="mt-5 font-display text-2xl font-light text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">
                    {v.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Citation */}
      <section className="relative overflow-hidden bg-ink py-28 text-bone lg:py-40">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/interior-1.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <Container className="relative z-10 text-center">
          <Reveal>
            <Quote strokeWidth={1} className="mx-auto h-12 w-12 text-gilt" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-4xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light italic leading-[1.3]">
              « Une belle transaction, ce n&apos;est pas seulement un prix. C&apos;est
              la certitude d&apos;avoir été bien accompagné, du premier café à la
              remise des clés.{" »"}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 eyebrow text-taupe">Josée-Ann Jomphe</p>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-bone py-24 lg:py-32">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
              Prenons le temps d&apos;en discuter.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact">Prendre rendez-vous</ButtonLink>
              <ButtonLink href="/proprietes" variant="outline">
                Voir les propriétés
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
