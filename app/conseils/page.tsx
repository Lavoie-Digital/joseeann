import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, ButtonLink, PageHero } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { MortgageCalculator } from "@/components/conseils/mortgage-calculator";
import { ArrowUpRight, PlayCircle, TrendingUp, KeyRound, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Conseils",
  description:
    "Articles, vidéos, tendances et conseils pour acheteurs et vendeurs au Saguenay–Lac-Saint-Jean. Le coin conseils de Josée-Ann Jomphe.",
};

const ARTICLES = [
  {
    img: "/images/lifestyle-coffee.jpg",
    tag: "Art de vivre",
    title: "Habiter un quartier : ce qui fait vraiment la valeur d'un lieu",
    excerpt:
      "Au-delà des mètres carrés, ce sont les services, la lumière et le calme qui font le prix d'une adresse.",
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

// Vidéos — à remplacer par les vraies vidéos de Josée-Ann (YouTube, etc.).
const VIDEOS = [
  { title: "Bien préparer sa maison avant les visites", duration: "3 min" },
  { title: "Premier achat : les erreurs à éviter", duration: "5 min" },
  { title: "Comprendre le marché immobilier au Saguenay", duration: "4 min" },
];

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
        subtitle="Articles, vidéos et tendances du marché : une bibliothèque de contenu pensée pour vous éclairer, que vous soyez acheteur, vendeur ou simplement curieux."
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

      {/* Vidéos */}
      <section className="border-t border-taupe/25 bg-charcoal py-24 text-bone lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <Reveal>
                <span className="eyebrow inline-flex items-center gap-3 text-taupe">
                  <span className="h-px w-8 bg-gilt" />
                  En vidéo
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight">
                  Mes conseils, en images.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-sm text-sm leading-relaxed text-bone/70">
                Des capsules courtes pour comprendre l&apos;essentiel, à votre
                rythme.
              </p>
            </Reveal>
          </div>

          <Stagger className="mt-14 grid gap-8 md:grid-cols-3">
            {VIDEOS.map((v) => (
              <StaggerItem key={v.title}>
                <div className="group cursor-pointer">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-ink/60">
                    <PlayCircle
                      strokeWidth={1}
                      className="h-14 w-14 text-bone/80 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-bone/80">
                      {v.duration}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-light leading-snug text-bone">
                    {v.title}
                  </h3>
                </div>
              </StaggerItem>
            ))}
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
                à votre situation et au marché actuel. Sans engagement.
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
