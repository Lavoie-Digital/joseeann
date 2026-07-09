import Image from "next/image";
import { Hero } from "@/components/home/hero";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ListingCard } from "@/components/listing-card";
import { getFeaturedListings } from "@/lib/listings";
import { Home as HomeIcon, Building2, KeyRound, ClipboardCheck } from "lucide-react";

export default async function HomePage() {
  const featured = await getFeaturedListings(3);

  return (
    <>
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
                <Eyebrow>La signature JAJ</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 font-display text-[clamp(1.9rem,3.6vw,3.1rem)] font-light leading-[1.25] text-ink">
                  Vendre ou acquérir une propriété d&apos;exception est bien plus
                  qu&apos;une transaction. C&apos;est une histoire de{" "}
                  <span className="italic text-gilt">confiance</span>, de timing
                  et d&apos;un regard juste sur la valeur réelle des lieux.
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
                    src="/Photo courtiere.jpg"
                    alt="Josée-Ann Jomphe, courtier immobilier"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="img-warm object-cover"
                  />
                </div>
                <p className="mt-5 text-sm text-smoke">
                  <span className="font-display text-xl text-ink">
                    Josée-Ann Jomphe
                  </span>
                  <br />
                  Courtier immobilier agréé
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Approche / processus */}
      <section className="border-t border-taupe/25 bg-sand py-20 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>La démarche</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-tight text-ink">
                Un accompagnement en quatre temps.
              </h2>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", icon: KeyRound, t: "Rencontre", d: "Comprendre vos objectifs, votre échéancier et vos aspirations." },
              { n: "02", icon: ClipboardCheck, t: "Stratégie", d: "Évaluation juste, positionnement et plan de mise en marché sur mesure." },
              { n: "03", icon: HomeIcon, t: "Mise en valeur", d: "Photographie, staging et diffusion ciblée auprès des bons acheteurs." },
              { n: "04", icon: Building2, t: "Négociation", d: "Défendre vos intérêts jusqu'à la signature, avec transparence." },
            ].map((step) => (
              <StaggerItem key={step.n}>
                <div className="border-t border-taupe/40 pt-6">
                  <span className="font-display text-sm text-gilt">{step.n}</span>
                  <step.icon strokeWidth={1.2} className="mt-4 h-7 w-7 text-ink" />
                  <h3 className="mt-5 font-display text-2xl font-light text-ink">
                    {step.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-smoke">
                    {step.d}
                  </p>
                </div>
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
              alt="Art de vivre"
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
                  Art de vivre & ressources
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-tight">
                  Des guides pensés pour vous éclairer.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-base leading-relaxed text-bone/75">
                  Vendeurs, acheteurs, amoureux des beaux lieux : découvrez nos
                  guides, nos conseils et notre regard sur l&apos;art de vivre
                  qui fait la valeur d&apos;un quartier.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10">
                  <ButtonLink
                    href="/guides"
                    variant="ghost"
                    className="text-bone hover:text-gilt"
                  >
                    Explorer les guides
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-bone py-20 lg:py-32">
        <Container className="text-center">
          <Reveal>
            <Eyebrow className="justify-center">Parlons de votre projet</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.6rem)] font-light leading-[1.08] text-ink">
              Votre prochaine adresse commence par une conversation.
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
