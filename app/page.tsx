import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ListingCard } from "@/components/listing-card";
import { FaqAccordion, type FaqGroup } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { getFeaturedListings } from "@/lib/listings";
import {
  Search,
  Tag,
  LineChart,
  Calculator,
  HandHeart,
  ShieldCheck,
  Eye,
  Scale,
} from "lucide-react";

const HOME_FAQ: FaqGroup[] = [
  {
    category: "Les plus fréquentes",
    items: [
      {
        q: "Combien coûtent vos services de courtage ?",
        a: "Pour un vendeur, la rétribution est convenue à l'avance dans le contrat de courtage et n'est payable qu'à la vente. Pour un acheteur, mon accompagnement est généralement sans frais, la rétribution étant habituellement assumée par le vendeur. On en discute clairement dès notre première rencontre.",
      },
      {
        q: "Dans quels secteurs travaillez-vous ?",
        a: "Je dessers l'ensemble du Saguenay–Lac-Saint-Jean, autant en résidentiel qu'en commercial : Saguenay, Alma, Dolbeau-Mistassini et les municipalités voisines.",
      },
      {
        q: "Comment est établie la valeur de ma propriété ?",
        a: "J'effectue une analyse comparative du marché : ventes récentes de propriétés semblables, inscriptions en cours et particularités de votre propriété. Cette analyse détermine un prix juste, ni trop haut, ni trop bas.",
      },
      {
        q: "Dois-je être préautorisé avant de magasiner ?",
        a: "C'est fortement recommandé. La préautorisation précise votre budget réel, vous rend plus crédible auprès des vendeurs et vous permet d'agir vite. Je peux vous référer à des partenaires hypothécaires de confiance.",
      },
      {
        q: "L'inspection est-elle obligatoire à l'achat ?",
        a: "Elle n'est pas obligatoire, mais je la recommande vivement : une inspection par un professionnel qualifié révèle l'état réel de la propriété et vous protège avant l'achat.",
      },
    ],
  },
];

export default async function HomePage() {
  const featured = await getFeaturedListings(3);

  return (
    <>
      <JsonLd data={faqJsonLd(HOME_FAQ.flatMap((g) => g.items))} />
      <Hero />

      {/* Propriétés en vedette — directement sous le hero */}
      <section className="bg-ink py-20 text-bone lg:py-28">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <Reveal>
                <span className="eyebrow inline-flex items-center gap-3 text-taupe">
                  <span className="h-px w-8 bg-gilt" />
                  Sélection du moment
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-tight">
                  Propriétés en vedette
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <ButtonLink
                href="/proprietes"
                variant="ghost"
                className="text-bone hover:text-gilt"
              >
                Voir toutes les propriétés
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} tone="dark" />
            ))}
          </div>

          <Reveal>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-bone/50">
              Les inscriptions sont synchronisées avec Centris® — chaque
              nouvelle propriété apparaît ici automatiquement dès sa mise en
              marché.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Manifeste / positionnement */}
      <section className="bg-bone py-20 lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Pourquoi travailler avec moi&nbsp;?</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 font-display text-[clamp(1.9rem,3.6vw,3.1rem)] font-light leading-[1.25] text-ink">
                  Une approche qui fait la{" "}
                  <span className="italic text-gilt">différence</span>.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-smoke">
                  De la première visite à la signature, chaque étape est menée
                  avec méthode et sensibilité. Une approche épurée, sans
                  précipitation, entièrement dédiée à vos objectifs.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10">
                  <ButtonLink href="/a-propos" variant="outline">
                    Faire connaissance
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/courtiere.jpg"
                    alt="Josée-Ann Jomphe, courtier immobilier"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="img-warm object-cover object-top"
                  />
                </div>
                <p className="mt-5 text-sm text-smoke">
                  <span className="font-display text-xl text-ink">
                    Josée-Ann Jomphe
                    <span className="ml-1 text-sm text-clay">inc.</span>
                  </span>
                  <br />
                  Courtier immobilier résidentiel et commercial
                </p>
              </Reveal>
            </div>
          </div>

          {/* Les 4 piliers */}
          <Stagger className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: HandHeart, t: "Bienveillance", d: "Prendre le temps de vous écouter, de comprendre vos besoins et de vous accompagner à chaque étape." },
              { icon: ShieldCheck, t: "Rigueur", d: "Porter une attention particulière à chaque détail afin de protéger vos intérêts et assurer le bon déroulement de votre transaction." },
              { icon: Eye, t: "Transparence", d: "Vous offrir des conseils honnêtes, une communication claire et toute l'information nécessaire pour prendre des décisions éclairées." },
              { icon: Scale, t: "Intégrité", d: "Agir avec honnêteté, éthique et professionnalisme, en mettant toujours vos intérêts au premier plan." },
            ].map((v) => (
              <StaggerItem key={v.t}>
                <div className="border-t border-taupe/40 pt-6">
                  <v.icon strokeWidth={1.2} className="h-8 w-8 text-gilt" />
                  <h3 className="mt-5 font-display text-2xl font-light text-ink">
                    {v.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">
                    {v.d}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Mes services */}
      <section className="border-t border-taupe/25 bg-sand py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Mes services</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
                Un accompagnement pour chaque projet.
              </h2>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Search, t: "Acheter", d: "Trouver la propriété qui correspond à vos besoins, à votre budget et à votre style de vie.", href: "/vendre-acheter#acheter" },
              { icon: Tag, t: "Vendre", d: "Mettre votre propriété en valeur et la vendre au meilleur prix, sans stress.", href: "/vendre-acheter#vendre" },
              { icon: LineChart, t: "Investir", d: "Repérer les bonnes occasions et bâtir un patrimoine immobilier rentable.", href: "/vendre-acheter#acheter" },
              { icon: Calculator, t: "Valeur marchande", d: "Connaître la juste valeur actuelle de votre propriété, gratuitement et sans engagement.", href: "/contact?sujet=vendre" },
            ].map((step) => (
              <StaggerItem key={step.t}>
                <Link
                  href={step.href}
                  className="group block border-t border-taupe/40 pt-6"
                >
                  <step.icon strokeWidth={1.2} className="h-7 w-7 text-ink" />
                  <h3 className="mt-5 font-display text-2xl font-light text-ink transition-colors group-hover:text-gilt">
                    {step.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">
                    {step.d}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Art de vivre / guides teaser */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[540px]">
            <Image
              src="/images/interior-2.jpg"
              alt="Conseils et ressources"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="img-warm object-cover"
            />
          </div>
          <div className="flex items-center bg-charcoal px-8 py-16 text-bone lg:px-20 lg:py-20">
            <div className="max-w-lg">
              <Reveal>
                <span className="eyebrow inline-flex items-center gap-3 text-taupe">
                  <span className="h-px w-8 bg-gilt" />
                  Le coin conseils
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-tight">
                  Des conseils pensés pour vous éclairer.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-base leading-relaxed text-bone/75">
                  Acheteurs, vendeurs, investisseurs : articles, vidéos et
                  check-lists pratiques pour prendre les bonnes décisions, en
                  toute confiance.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10">
                  <ButtonLink
                    href="/conseils"
                    variant="ghost"
                    className="text-bone hover:text-gilt"
                  >
                    Explorer les conseils
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — section d'accueil */}
      <section id="faq" className="scroll-mt-24 border-t border-taupe/25 bg-sand py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Foire aux questions</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-tight text-ink">
                  Vos questions, mes réponses.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-base leading-relaxed text-smoke">
                  Vous ne trouvez pas votre réponse&nbsp;? Écrivez-moi, il me fera
                  plaisir de vous éclairer.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8">
                  <ButtonLink href="/contact" variant="outline">
                    Poser une question
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={0.15}>
                <FaqAccordion groups={HOME_FAQ} />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="bg-bone py-20 lg:py-32">
        <Container className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">Parlons de votre projet</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-light leading-[1.08] text-ink">
              Prêt à réaliser votre projet&nbsp;?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact">Prendre rendez-vous</ButtonLink>
              <ButtonLink href="/proprietes" variant="outline">
                Parcourir les propriétés
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
