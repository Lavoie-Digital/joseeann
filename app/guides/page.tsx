import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, ButtonLink, PageHero } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ArrowUpRight, TrendingUp, KeyRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides & art de vivre",
  description:
    "Guides pour vendeurs et acheteurs, conseils d'experte et regards sur l'art de vivre immobilier de prestige au Québec.",
};

const SELLER = [
  "Faire évaluer sa propriété à sa juste valeur marchande",
  "Préparer et mettre en valeur les lieux (staging, photographie)",
  "Définir une stratégie de mise en marché et de diffusion",
  "Gérer les visites et qualifier les acheteurs sérieux",
  "Négocier et sécuriser la meilleure offre",
];

const BUYER = [
  "Clarifier son budget et obtenir une préautorisation hypothécaire",
  "Cibler les quartiers et le type de propriété recherché",
  "Accéder aux inscriptions et aux occasions hors marché",
  "Visiter, comparer et évaluer le potentiel réel d'un bien",
  "Déposer une offre gagnante et bien encadrée",
];

const ARTICLES = [
  {
    img: "/images/lifestyle-coffee.jpg",
    tag: "Art de vivre",
    title: "Habiter un quartier : ce qui fait vraiment la valeur d'un lieu",
    excerpt:
      "Au-delà des mètres carrés, ce sont les cafés, la lumière et le silence qui font le prix d'une adresse.",
  },
  {
    img: "/images/kitchen-1.jpg",
    tag: "Conseils vendeur",
    title: "Cinq gestes qui augmentent la valeur perçue avant une vente",
    excerpt:
      "Des interventions simples et peu coûteuses qui transforment l'impression au premier regard.",
  },
  {
    img: "/images/lifestyle-neighborhood.jpg",
    tag: "Marché",
    title: "Investir dans le commercial : lire un rendement sans se tromper",
    excerpt:
      "Taux de capitalisation, baux et emplacement : les repères essentiels d'un bon placement.",
  },
];

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides & art de vivre"
        title={
          <>
            S&apos;informer, <span className="italic text-gilt">décider</span>,
            savourer.
          </>
        }
        subtitle="Des ressources claires pour vendre et acheter en toute confiance — et un regard sur l'art de vivre qui donne toute sa valeur à une adresse."
        image="/images/interior-3.jpg"
      />

      {/* Deux guides */}
      <section className="bg-bone py-24 lg:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {[
              {
                icon: TrendingUp,
                kicker: "Guide du vendeur",
                title: "Vendre au meilleur prix, sans stress",
                steps: SELLER,
                cta: "Obtenir une évaluation gratuite",
              },
              {
                icon: KeyRound,
                kicker: "Guide de l'acheteur",
                title: "Acheter la bonne propriété, sereinement",
                steps: BUYER,
                cta: "Définir mon projet d'achat",
              },
            ].map((g, i) => (
              <Reveal key={g.kicker} delay={i * 0.12}>
                <div className="flex h-full flex-col border border-taupe/30 bg-bone p-9 lg:p-12">
                  <g.icon strokeWidth={1.2} className="h-9 w-9 text-gilt" />
                  <p className="eyebrow mt-6 text-clay">{g.kicker}</p>
                  <h2 className="mt-3 font-display text-3xl font-light leading-tight text-ink">
                    {g.title}
                  </h2>
                  <ol className="mt-8 flex-1 space-y-5">
                    {g.steps.map((s, idx) => (
                      <li key={s} className="flex gap-4 border-t border-taupe/30 pt-4">
                        <span className="font-display text-lg text-gilt">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-charcoal">{s}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-10">
                    <ButtonLink href="/contact" variant="outline">
                      {g.cta}
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Art de vivre — magazine */}
      <section className="border-t border-taupe/25 bg-sand py-24 lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <Reveal>
                <Eyebrow>Le magazine</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-ink">
                  Inspirations & art de vivre
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sm leading-relaxed text-smoke">
                Regards, conseils et coups de cœur autour de l&apos;immobilier de
                prestige et du plaisir d&apos;habiter.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {ARTICLES.map((a) => (
              <StaggerItem key={a.title}>
                <Link href="/contact" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-greige">
                    <Image
                      src={a.img}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="img-warm object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                  </div>
                  <p className="eyebrow mt-5 text-clay">{a.tag}</p>
                  <h3 className="mt-3 flex items-start gap-2 font-display text-2xl font-light leading-snug text-ink transition-colors group-hover:text-gilt">
                    {a.title}
                    <ArrowUpRight
                      strokeWidth={1.4}
                      className="mt-1.5 h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">
                    {a.excerpt}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CTA guide personnalisé */}
      <section className="bg-bone py-24 lg:py-32">
        <Container>
          <div className="relative overflow-hidden bg-ink px-8 py-16 text-bone lg:px-20 lg:py-24">
            <div className="relative z-10 max-w-2xl">
              <Eyebrow>
                <span className="text-taupe">Sur mesure</span>
              </Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight">
                Recevez un guide personnalisé pour votre projet.
              </h2>
              <p className="mt-6 max-w-xl text-bone/75">
                Vendeur ou acheteur, obtenez une feuille de route claire, adaptée
                à votre situation et au marché actuel. Sans engagement.
              </p>
              <div className="mt-10">
                <ButtonLink href="/contact" variant="ghost" className="bg-bone text-ink hover:bg-gilt hover:text-bone">
                  Demander mon guide
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
