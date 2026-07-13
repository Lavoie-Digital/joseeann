import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Quote, Ear, Route, MessageCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Josée-Ann Jomphe, courtier immobilier — une approche humaine, rigoureuse et discrète du courtage résidentiel et commercial haut de gamme.",
};

const VALUES = [
  { icon: Ear, title: "Une écoute attentive", text: "Je prends le temps de comprendre vos besoins, vos objectifs et votre réalité afin de vous offrir des conseils adaptés à votre situation." },
  { icon: Route, title: "Une stratégie personnalisée", text: "Aucune transaction ne se ressemble. Ensemble, nous mettons en place un plan d'action pensé pour atteindre vos objectifs." },
  { icon: MessageCircle, title: "Une communication claire", text: "Vous êtes informé à chaque étape du processus. Une bonne décision se prend lorsqu'on comprend bien toutes les options qui s'offrent à nous." },
  { icon: ShieldCheck, title: "Une défense de vos intérêts", text: "Que ce soit lors des négociations ou des décisions importantes, je veille toujours à protéger vos intérêts avec professionnalisme et intégrité." },
];

const BIO = [
  { title: "Pourquoi j'ai choisi l'immobilier", text: "J'aime les projets qui ont un impact dans la vie des gens. Derrière chaque transaction se cache une histoire, un changement ou un nouveau départ, et c'est ce qui me motive à exercer ce métier avec autant de passion." },
  { title: "Ma façon de travailler", text: "Je privilégie une approche simple : bien écouter, bien préparer et bien conseiller. Chaque décision est réfléchie, chaque stratégie est adaptée et chaque détail est pris en compte afin que vous puissiez avancer en toute confiance." },
  { title: "Ce qui me distingue", text: "Je ne cherche pas à multiplier les transactions, mais à offrir une expérience de qualité. Être disponible, répondre à vos questions, anticiper les défis et défendre vos intérêts font partie intégrante de mon rôle." },
  { title: "Au-delà de la transaction", text: "Pour moi, vendre ou acheter une propriété ne se résume jamais à une signature chez le notaire. C'est souvent le début d'un nouveau chapitre, et je considère comme un privilège de pouvoir accompagner mes clients dans ces moments importants." },
  { title: "Ce qui me rend le plus fière", text: "Les recommandations de mes clients sont ma plus grande récompense. Savoir qu'ils ont apprécié leur expérience au point de me confier un nouveau projet ou de parler de moi à leurs proches est une marque de confiance que je ne prends jamais pour acquise." },
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
                  <span className="ml-2 text-2xl text-clay">inc.</span>
                </h1>
                <p className="mt-3 text-lg text-clay">
                  Courtier immobilier résidentiel et commercial
                </p>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-charcoal">
                  Courtier immobilier résidentiel et commercial au
                  Saguenay–Lac-Saint-Jean, j&apos;accompagne mes clients depuis
                  plus de cinq ans avec une approche profondément humaine, où la
                  confiance compte autant que les résultats.
                </p>
                <div className="mt-10">
                  <ButtonLink href="/contact">Me contacter</ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/courtiere.jpg"
                  alt="Josée-Ann Jomphe"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="img-warm object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Mon approche — biographie en sections */}
      <section className="bg-bone pt-24 lg:pt-32">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Faire connaissance</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-ink">
                Mon approche, en quelques mots.
              </h2>
            </Reveal>
          </div>
          <Stagger className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {BIO.map((b) => (
              <StaggerItem key={b.title}>
                <div className="border-t border-taupe/40 pt-6">
                  <h3 className="font-display text-2xl font-light text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-charcoal">{b.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Chiffres */}
      <section className="mt-24 border-y border-taupe/25 bg-sand py-16 lg:mt-32">
        <Container>
          <Stagger className="grid grid-cols-2 gap-y-10 lg:grid-cols-3">
            {[
              { v: "45 M$+", l: "en transactions" },
              { v: "175+", l: "familles accompagnées" },
              { v: "5 ans+", l: "d'expérience" },
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
              <Eyebrow>Mon engagement</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-ink">
                Ce que vous pouvez attendre de moi.
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
              « Derrière chaque transaction se cache une histoire, un projet de
              vie ou un nouveau départ. C&apos;est ce qui rend mon métier aussi
              passionnant et ce qui me motive à offrir un accompagnement à la
              fois humain et rigoureux.{" »"}
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
