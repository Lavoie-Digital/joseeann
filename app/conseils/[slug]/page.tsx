import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container, PageHero, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { JsonLd } from "@/components/json-ld";
import { ARTICLES, getArticle, readingMinutes } from "@/lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/conseils/${article.slug}` },
    openGraph: {
      title: `${article.title} · Josée-Ann Jomphe`,
      description: article.excerpt,
      url: `https://jajomphe.ca/conseils/${article.slug}`,
      type: "article",
      images: [{ url: article.img }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          image: `https://jajomphe.ca${article.img}`,
          author: { "@type": "Person", name: "Josée-Ann Jomphe" },
          publisher: {
            "@type": "Organization",
            name: "Josée-Ann Jomphe inc.",
          },
          mainEntityOfPage: `https://jajomphe.ca/conseils/${article.slug}`,
        }}
      />

      <PageHero
        eyebrow={article.tag}
        title={article.title}
        image={article.img}
      />

      <article className="bg-bone py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-taupe/30 pb-6">
                <Link
                  href="/conseils"
                  className="group inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.2em] text-clay transition-colors hover:text-ink"
                >
                  <ArrowLeft
                    strokeWidth={1.5}
                    className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                  />
                  Tous les conseils
                </Link>
                <span className="eyebrow text-clay">
                  {article.tag} · {readingMinutes(article)} min de lecture
                </span>
              </div>
            </Reveal>

            {/* flex flex-col + marge portée par le wrapper (l'item flex) :
                les marges ne s'effondrent pas, donc les gros titres gardent
                bien leur espace au-dessus comme en dessous. */}
            <div className="mt-12 flex flex-col">
              {article.blocks.map((b, i) => {
                // Espace au-dessus de chaque bloc (plus généreux pour les titres).
                const afterH2 = i > 0 && article.blocks[i - 1].type === "h2";
                const top =
                  i === 0
                    ? ""
                    : b.type === "h2"
                      ? "mt-16"
                      : b.type === "h3"
                        ? afterH2
                          ? "mt-10"
                          : "mt-11"
                        : afterH2
                          ? "mt-8"
                          : "mt-5";

                if (b.type === "h2") {
                  return (
                    <Reveal key={i} className={top}>
                      <h2 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-light leading-tight text-ink">
                        {b.text}
                      </h2>
                    </Reveal>
                  );
                }
                if (b.type === "h3") {
                  return (
                    <Reveal key={i} className={top}>
                      <h3 className="font-display text-xl font-light text-ink lg:text-2xl">
                        {b.text}
                      </h3>
                    </Reveal>
                  );
                }
                if (b.type === "ul") {
                  return (
                    <Reveal key={i} className={top}>
                      <ul className="space-y-3">
                        {b.items.map((it) => (
                          <li
                            key={it}
                            className="flex gap-3 leading-relaxed text-smoke"
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gilt" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  );
                }
                return (
                  <Reveal key={i} className={top}>
                    <p className="text-[1.05rem] leading-[1.8] text-charcoal">
                      {b.text}
                    </p>
                  </Reveal>
                );
              })}
            </div>

            {/* Signature + CTA */}
            <Reveal>
              <div className="mt-16 border-t border-taupe/30 pt-10">
                <p className="font-display text-xl text-ink">
                  Josée-Ann Jomphe
                  <span className="ml-1 text-sm text-clay">inc.</span>
                </p>
                <p className="mt-1 text-sm text-smoke">
                  Courtier immobilier résidentiel et commercial
                </p>
                <div className="mt-8">
                  <ButtonLink href="/contact">Me contacter</ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </article>

      {/* Articles connexes */}
      <section className="border-t border-taupe/25 bg-sand py-20 lg:py-24">
        <Container>
          <Reveal>
            <p className="eyebrow text-clay">À lire aussi</p>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {related.map((a) => (
              <Reveal key={a.slug}>
                <Link href={`/conseils/${a.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-greige">
                    <Image
                      src={a.img}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
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
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
