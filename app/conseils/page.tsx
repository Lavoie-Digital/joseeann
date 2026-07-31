import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, ButtonLink, PageHero } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { MortgageCalculator } from "@/components/conseils/mortgage-calculator";
import { ARTICLES } from "@/lib/articles";
import { CHECKLISTS } from "@/lib/checklists";
import {
  ArrowUpRight,
  Download,
  TrendingUp,
  KeyRound,
  HelpCircle,
  Home,
  Truck,
  FileText,
  Search,
  ListChecks,
} from "lucide-react";

const CHECKLIST_ICONS = {
  home: Home,
  truck: Truck,
  file: FileText,
  key: KeyRound,
  search: Search,
} as const;

export const metadata: Metadata = {
  title: "Conseils",
  description:
    "Articles, check-lists téléchargeables, tendances et conseils pour acheteurs et vendeurs au Saguenay–Lac-Saint-Jean. Le coin conseils de Josée-Ann Jomphe. Calculatrice hypothécaire gratuite.",
  alternates: { canonical: "/conseils" },
  openGraph: {
    title: "Conseils immobiliers & calculatrice hypothécaire · Josée-Ann Jomphe",
    description:
      "Articles, check-lists téléchargeables et calculatrice hypothécaire pour acheteurs et vendeurs au Saguenay–Lac-Saint-Jean.",
    url: "https://jajomphe.ca/conseils",
    type: "website",
  },
};

const SHORTCUTS = [
  {
    icon: TrendingUp,
    kicker: "Vendeurs",
    title: "Le guide du vendeur",
    href: "/vendre-acheter#vendre",
  },
  {
    icon: KeyRound,
    kicker: "Acheteurs",
    title: "Le guide de l'acheteur",
    href: "/vendre-acheter#acheter",
  },
  {
    icon: HelpCircle,
    kicker: "Vos questions",
    title: "La foire aux questions",
    href: "/#faq",
  },
];

export default function ConseilsPage() {
  return (
    <>
      <PageHero
        eyebrow="Le coin conseils"
        title={
          <>
            S&apos;informer, <span className="italic text-gilt">décider</span>,
            avancer.
          </>
        }
        subtitle="Articles, check-lists et tendances du marché : une bibliothèque de contenu pensée pour vous éclairer, que vous soyez acheteur, vendeur ou simplement curieux."
        image="/onglet7.jpg"
      />

      {/* Raccourcis vers les guides & FAQ */}
      <section className="bg-bone py-20 lg:py-24">
        <Container>
          <Stagger className="grid gap-8 md:grid-cols-3">
            {SHORTCUTS.map((s) => (
              <StaggerItem key={s.href}>
                <Link
                  href={s.href}
                  className="group flex h-full items-center justify-between gap-4 border border-taupe/30 bg-bone p-8 transition-colors hover:border-gilt"
                >
                  <div className="flex items-center gap-5">
                    <s.icon strokeWidth={1.2} className="h-8 w-8 text-gilt" />
                    <div>
                      <p className="eyebrow text-clay">{s.kicker}</p>
                      <h3 className="mt-1 font-display text-xl font-light text-ink">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <ArrowUpRight
                    strokeWidth={1.4}
                    className="h-5 w-5 shrink-0 text-taupe transition-colors group-hover:text-gilt"
                  />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Calculatrice hypothécaire */}
      <MortgageCalculator />

      {/* Check-lists téléchargeables */}
      <section className="border-t border-taupe/25 bg-charcoal py-24 text-bone lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <Reveal>
                <span className="eyebrow inline-flex items-center gap-3 text-taupe">
                  <span className="h-px w-8 bg-gilt" />
                  <ListChecks strokeWidth={1.4} className="h-4 w-4 text-gilt" />
                  Mes check-lists
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight">
                  Des outils prêts à imprimer.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sm leading-relaxed text-bone/70">
                Des aide-mémoire complets pour ne rien oublier — à consulter en
                ligne ou à télécharger en PDF.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CHECKLISTS.map((c) => {
              const Icon = CHECKLIST_ICONS[c.icon];
              return (
                <StaggerItem key={c.slug}>
                  <Link
                    href={`/conseils/checklists/${c.slug}`}
                    className="group flex h-full flex-col border border-bone/15 p-8 transition-colors hover:border-gilt"
                  >
                    <Icon strokeWidth={1.2} className="h-8 w-8 text-gilt" />
                    <p className="eyebrow mt-6 text-taupe">{c.audience}</p>
                    <h3 className="mt-2 font-display text-xl font-light leading-snug text-bone">
                      {c.title}
                    </h3>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-bone/60 transition-colors group-hover:text-gilt">
                      Consulter &amp; télécharger
                      <Download strokeWidth={1.5} className="h-4 w-4" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Articles & tendances */}
      <section className="bg-sand py-24 lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <Reveal>
                <Eyebrow>Articles &amp; tendances</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-ink">
                  À lire pour aller plus loin.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sm leading-relaxed text-smoke">
                Regards, conseils et coups de cœur autour de l&apos;immobilier et
                du plaisir d&apos;habiter la région.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {ARTICLES.map((a) => (
              <StaggerItem key={a.slug}>
                <Link href={`/conseils/${a.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-greige">
                    <Image
                      src={a.img}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="img-warm object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="eyebrow mt-5 text-clay">{a.tag}</p>
                  <h3 className="mt-3 flex items-start justify-between gap-4 font-display text-2xl font-light leading-snug text-ink">
                    <span className="transition-colors group-hover:text-gilt">
                      {a.title}
                    </span>
                    <ArrowUpRight
                      strokeWidth={1.4}
                      className="mt-1 h-5 w-5 shrink-0 text-taupe transition-colors group-hover:text-gilt"
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

      {/* CTA */}
      <section className="bg-bone py-24 lg:py-32">
        <Container>
          <div className="relative overflow-hidden bg-ink px-8 py-16 text-bone lg:px-20 lg:py-24">
            <div className="relative z-10 max-w-2xl">
              <Eyebrow>
                <span className="text-taupe">Sur mesure</span>
              </Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight">
                Une question précise sur votre projet&nbsp;?
              </h2>
              <p className="mt-6 max-w-xl text-bone/75">
                Vendeur, acheteur ou investisseur : obtenez des conseils adaptés
                à votre situation et au marché actuel.
              </p>
              <div className="mt-10">
                <ButtonLink
                  href="/contact"
                  variant="ghost"
                  className="bg-bone text-ink hover:bg-gilt hover:text-bone"
                >
                  Me contacter
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
