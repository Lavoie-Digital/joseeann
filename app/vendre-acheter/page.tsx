import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow, ButtonLink, PageHero } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SoldMarquee } from "@/components/sold-marquee";
import {
  ClipboardList,
  Home,
  Truck,
  FileText,
  Wallet,
  ListChecks,
  Search,
  ArrowDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vendre & acheter",
  description:
    "Vendre ou acheter au Saguenay–Lac-Saint-Jean : les étapes, les check-lists et l'accompagnement complet de Josée-Ann Jomphe, du premier café à la remise des clés.",
};

const SELL_STEPS = [
  { t: "Déterminer la juste valeur marchande de votre propriété", d: "Une analyse rigoureuse du marché et des ventes comparables pour fixer le bon prix, dès le départ." },
  { t: "Préparer votre propriété pour maximiser son potentiel", d: "Home staging, petites rénovations stratégiques et photographie professionnelle pour créer le coup de cœur." },
  { t: "Déployer une stratégie de mise en marché performante", d: "Diffusion sur Centris®, réseaux sociaux et réseau d'acheteurs — pour rejoindre les bonnes personnes." },
  { t: "Attirer des acheteurs qualifiés et gérer les visites", d: "Filtrage des acheteurs sérieux, organisation des visites et suivi rigoureux après chacune d'elles." },
  { t: "Négocier la meilleure entente et vous accompagner jusqu'à la vente", d: "Défense de vos intérêts à la table de négociation, puis suivi complet jusqu'à la signature chez le notaire." },
];

const SELL_RESOURCES = [
  { icon: ClipboardList, t: "Check-list : préparer votre maison" },
  { icon: Home, t: "Guide du vendeur" },
  { icon: Truck, t: "Check-list de déménagement" },
  { icon: FileText, t: "Documents à préparer" },
];

const BUY_STEPS = [
  { t: "Établir votre budget et obtenir une préautorisation", d: "On clarifie votre capacité d'emprunt avec les bons partenaires afin de magasiner en toute confiance." },
  { t: "Définir vos critères et cibler les bons secteurs", d: "Type de propriété, quartiers, incontournables et compromis : on précise ensemble ce qui compte vraiment." },
  { t: "Repérer les meilleures opportunités du marché", d: "Accès aux inscriptions Centris® et aux occasions dès leur mise en marché, avant qu'elles ne s'envolent." },
  { t: "Visiter avec un regard stratégique", d: "On évalue le potentiel réel, les travaux à prévoir et la juste valeur — sans se laisser emporter par l'émotion." },
  { t: "Présenter une offre solide et négocier les meilleures conditions", d: "Rédaction d'une offre gagnante, conditions bien encadrées et accompagnement jusqu'à la remise des clés." },
];

const BUY_RESOURCES = [
  { icon: Wallet, t: "Calculer votre capacité d'emprunt" },
  { icon: ListChecks, t: "Check-list du premier acheteur" },
  { icon: Search, t: "Check-list de visite" },
  { icon: Truck, t: "Check-list de déménagement" },
];

function Steps({ steps }: { steps: { t: string; d: string }[] }) {
  return (
    <Stagger className="mt-4 space-y-px">
      {steps.map((s, i) => (
        <StaggerItem key={s.t}>
          <div className="grid gap-3 border-t border-taupe/30 py-7 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-2">
              <span className="font-display text-4xl font-light text-gilt">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-display text-xl font-light leading-snug text-ink md:col-span-5 lg:text-2xl">
              {s.t}
            </h3>
            <p className="leading-relaxed text-smoke md:col-span-5">{s.d}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function Resources({
  items,
}: {
  items: { icon: typeof Home; t: string }[];
}) {
  return (
    <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((r) => (
        <StaggerItem key={r.t}>
          <div className="flex h-full items-center gap-4 border border-taupe/30 bg-bone/60 p-5">
            <r.icon strokeWidth={1.2} className="h-6 w-6 shrink-0 text-gilt" />
            <p className="text-sm leading-snug text-charcoal">{r.t}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default function VendreAcheterPage() {
  return (
    <>
      <PageHero
        eyebrow="Vendre & acheter"
        title={
          <>
            Un accompagnement complet,{" "}
            <span className="italic text-gilt">à chaque étape</span>.
          </>
        }
        subtitle="Que vous vendiez, achetiez — ou les deux — je vous accompagne du premier café à la remise des clés, avec méthode et sérénité."
        image="/images/listing-1.jpg"
      />

      {/* Mosaïque défilante des ventes récentes */}
      <SoldMarquee />

      {/* VENDRE */}
      <section id="vendre" className="scroll-mt-20 bg-bone py-24 lg:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Vendre</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
                  Vendre au meilleur prix, sereinement.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 leading-relaxed text-smoke">
                  De l&apos;évaluation à la signature, une stratégie claire pour
                  vendre votre propriété dans les meilleures conditions — sans
                  stress et sans mauvaises surprises.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8">
                  <ButtonLink href="/contact?sujet=vendre">
                    Obtenir mon évaluation
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-clay">Votre plan vers une vente réussie</p>
              </Reveal>
              <Steps steps={SELL_STEPS} />
            </div>
          </div>

          <div className="mt-14">
            <Reveal>
              <p className="eyebrow text-clay">Ressources &amp; check-lists</p>
            </Reveal>
            <Resources items={SELL_RESOURCES} />
          </div>
        </Container>
      </section>

      {/* Séparateur fluide vers Acheter */}
      <div className="flex justify-center border-t border-taupe/25 bg-sand py-8">
        <a
          href="#acheter"
          className="flex flex-col items-center gap-2 text-clay transition-colors hover:text-ink"
        >
          <span className="eyebrow">Vous achetez plutôt&nbsp;?</span>
          <ArrowDown strokeWidth={1.4} className="h-5 w-5 animate-bounce text-gilt" />
        </a>
      </div>

      {/* ACHETER */}
      <section id="acheter" className="scroll-mt-20 bg-sand py-24 lg:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Acheter</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
                  Acheter la bonne propriété, sereinement.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 leading-relaxed text-smoke">
                  De la préautorisation à la remise des clés, un accompagnement
                  stratégique pour faire le bon choix, au bon moment — et vivre
                  l&apos;expérience pleinement.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <ButtonLink href="/contact?sujet=acheter">
                    Définir mon projet
                  </ButtonLink>
                  <ButtonLink href="/proprietes" variant="outline">
                    Voir les propriétés
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-clay">
                  Votre parcours vers la bonne propriété
                </p>
              </Reveal>
              <Steps steps={BUY_STEPS} />
            </div>
          </div>

          <div className="mt-14">
            <Reveal>
              <p className="eyebrow text-clay">Ressources &amp; check-lists</p>
            </Reveal>
            <Resources items={BUY_RESOURCES} />
            <Reveal delay={0.2}>
              <p className="mt-8 text-sm text-clay">
                Ces documents vous intéressent&nbsp;? Écrivez-moi et je vous les
                fais parvenir gratuitement.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-bone py-24 lg:py-32">
        <Container className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">Sans engagement</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-8 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
              Prêt à réaliser votre projet&nbsp;?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact">Me contacter</ButtonLink>
              <Link
                href="/#faq"
                className="group inline-flex items-center gap-2.5 rounded-full border border-ink px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-ink hover:text-bone"
              >
                Consulter la FAQ
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
