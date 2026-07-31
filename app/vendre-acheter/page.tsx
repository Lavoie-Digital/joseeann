import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, ButtonLink, PageHero } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SoldMarquee } from "@/components/sold-marquee";
import { GuideGate } from "@/components/guide-gate";
import {
  ClipboardList,
  FileText,
  Home,
  Truck,
  Wallet,
  ListChecks,
  Search,
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vendre & acheter",
  description:
    "Vendre ou acheter au Saguenay–Lac-Saint-Jean : les étapes, les check-lists et l'accompagnement complet de Josée-Ann Jomphe, du premier café à la remise des clés.",
  alternates: { canonical: "/vendre-acheter" },
};

const SELL_STEPS = [
  { t: "Évaluer la juste valeur de votre propriété", d: "Analyse du marché et des ventes comparables pour positionner votre propriété au juste prix." },
  { t: "Préparer votre propriété pour la vente", d: "Conseils, home staging et photographie professionnelle pour créer un véritable coup de cœur." },
  { t: "Mettre votre propriété en marché", d: "Une visibilité maximale sur Centris®, mes réseaux sociaux et auprès de mon réseau d'acheteurs." },
  { t: "Organiser les visites qualifiées", d: "Qualification des acheteurs, organisation des visites et suivi après chacune d'elles." },
  { t: "Conclure la vente dans les meilleures conditions", d: "Négociation stratégique et accompagnement complet jusqu'à la signature chez le notaire." },
];

const SELL_RESOURCES = [
  { icon: ClipboardList, t: "Check-list : préparer votre maison", href: "/conseils/checklists/preparer-maison-avant-vente" },
  { icon: Truck, t: "Check-list de déménagement", href: "/conseils/checklists/demenagement-etape-par-etape" },
  { icon: FileText, t: "Documents à préparer", href: "/conseils/checklists/documents-pour-vendre" },
];

const BUY_STEPS = [
  { t: "Obtenir votre préqualification et définir votre budget", d: "On clarifie votre capacité d'emprunt avec les bons partenaires afin de magasiner en toute confiance." },
  { t: "Définir vos critères et cibler les bons secteurs", d: "Type de propriété, quartiers, incontournables et compromis : on précise ensemble ce qui compte vraiment." },
  { t: "Repérer les meilleures opportunités du marché", d: "Accès aux nouvelles inscriptions et occasions à saisir dès leur mise en marché." },
  { t: "Visiter avec un regard stratégique", d: "J'évalue avec vous le potentiel de chaque propriété, les travaux à prévoir et sa juste valeur afin que vous preniez une décision éclairée." },
  { t: "Présenter une offre solide et négocier les meilleures conditions", d: "Une offre solide, une négociation rigoureuse et un accompagnement complet jusqu'à la signature chez le notaire et la remise des clés." },
];

const ACHETEUR_PAGES = Array.from({ length: 16 }, (_, i) => `/ga${i + 1}.png`);

const BUY_RESOURCES = [
  { icon: Wallet, t: "Calculatrice hypothécaire", href: "/conseils#calculatrice" },
  { icon: ListChecks, t: "Check-list du premier acheteur", href: "/conseils/checklists/acheter-une-propriete" },
  { icon: Search, t: "Check-list de visite", href: "/conseils/checklists/visite-dune-propriete" },
  { icon: Truck, t: "Check-list de déménagement", href: "/conseils/checklists/demenagement-acheteur" },
];

function Steps({ steps }: { steps: { t: string; d: string }[] }) {
  return (
    <Stagger className="mt-4 space-y-px">
      {steps.map((s, i) => (
        <StaggerItem key={s.t}>
          <div className="grid gap-3 border-t border-taupe/30 py-7 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-2">
              <span className="font-display text-4xl font-light text-ink">
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
  items: { icon: typeof Home; t: string; href?: string }[];
}) {
  return (
    <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((r) => {
        const inner = (
          <>
            <r.icon strokeWidth={1.2} className="h-6 w-6 shrink-0 text-gilt" />
            <p className="text-sm leading-snug text-charcoal">{r.t}</p>
            {r.href && (
              <ArrowUpRight
                strokeWidth={1.4}
                className="ml-auto h-4 w-4 shrink-0 text-taupe transition-colors group-hover:text-gilt"
              />
            )}
          </>
        );
        return (
          <StaggerItem key={r.t}>
            {r.href ? (
              <Link
                href={r.href}
                className="group flex h-full items-center gap-4 border border-taupe/30 bg-bone/60 p-5 transition-colors hover:border-gilt"
              >
                {inner}
              </Link>
            ) : (
              <div className="flex h-full items-center gap-4 border border-taupe/30 bg-bone/60 p-5">
                {inner}
              </div>
            )}
          </StaggerItem>
        );
      })}
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
        subtitle="Que vous soyez vendeur, acheteur ou les deux, je vous accompagne avec rigueur, transparence et bienveillance. Vous profitez d'un service personnalisé, d'une stratégie adaptée à votre réalité et d'une présence rassurante à chaque étape du processus."
        image="/onglet5.jpg"
      />

      {/* Mosaïque défilante des ventes récentes */}
      <SoldMarquee />

      {/* VENDRE */}
      <section id="vendre" className="scroll-mt-20 bg-bone py-24 lg:py-32">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Vendre</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
                  Une vente bien préparée fait toute la différence.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 leading-relaxed text-smoke">
                  Chaque étape est planifiée avec soin afin d&apos;optimiser
                  votre mise en marché, de protéger vos intérêts et
                  d&apos;obtenir le meilleur résultat.
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
              <Reveal delay={0.15}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/interior-4.jpg"
                    alt="Intérieur chaleureux, mis en valeur pour la vente"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="img-warm object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="mt-16">
            <Reveal>
              <p className="eyebrow text-clay">Comment je vous accompagne pour une vente réussie</p>
            </Reveal>
            <Steps steps={SELL_STEPS} />
          </div>

          <div className="mt-14">
            <Reveal>
              <p className="eyebrow text-clay">Ressources &amp; check-lists</p>
            </Reveal>
            <Resources items={SELL_RESOURCES} />
          </div>

          <div className="mt-14">
            <Reveal>
              <GuideGate />
            </Reveal>
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
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/famille1.jpg"
                    alt="Josée-Ann Jomphe, courtier immobilier, dans une cuisine lumineuse"
                    fill
                    sizes="(max-width: 1024px) 90vw, 50vw"
                    className="img-warm object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <Eyebrow>Acheter</Eyebrow>
              </Reveal>
              <Reveal delay={0.15}>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
                  Bien acheter, ça se prépare.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 leading-relaxed text-smoke">
                  De la préautorisation à la remise des clés, un accompagnement
                  stratégique pour faire le bon choix, au bon moment afin de
                  vivre l&apos;expérience pleinement.
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
          </div>

          <div className="mt-16">
            <Reveal>
              <p className="eyebrow text-clay">
                Comment je vous accompagne vers la bonne propriété
              </p>
            </Reveal>
            <Steps steps={BUY_STEPS} />
          </div>

          <div className="mt-14">
            <Reveal>
              <p className="eyebrow text-clay">Ressources &amp; check-lists</p>
            </Reveal>
            <Resources items={BUY_RESOURCES} />
            <Reveal delay={0.25}>
              <div className="mt-8">
                <ButtonLink href="/proprietes#alerte" variant="outline">
                  Créer une alerte propriété
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div className="mt-14">
            <Reveal>
              <GuideGate
                guide="Guide de l'acheteur"
                pages={ACHETEUR_PAGES}
                heading="Recevez le guide de l'acheteur"
                description="16 pages pour préparer votre achat en toute confiance, du budget et de la préautorisation jusqu'à la visite, l'offre et la remise des clés."
                unlockedLabel="Feuilletez mon guide de l'acheteur"
                source="/vendre-acheter#acheter"
                cardClassName="border-gilt/30 bg-gilt/10"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-bone py-24 lg:py-32">
        <Container className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">Discutons de votre projet</Eyebrow>
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
