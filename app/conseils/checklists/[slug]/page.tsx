import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { Container } from "@/components/ui";
import { PrintButton } from "@/components/print-button";
import { CHECKLISTS, getChecklist } from "@/lib/checklists";

export function generateStaticParams() {
  return CHECKLISTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getChecklist(slug);
  if (!c) return {};
  return {
    title: `Check-list : ${c.title}`,
    description: c.intro,
    alternates: { canonical: `/conseils/checklists/${c.slug}` },
  };
}

function Checkbox() {
  return (
    <span
      aria-hidden
      className="mt-[3px] h-4 w-4 shrink-0 rounded-[3px] border border-ink/60"
    />
  );
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const checklist = getChecklist(slug);
  if (!checklist) notFound();

  return (
    <section className="bg-sand pb-16 pt-32 lg:pb-24 lg:pt-40">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Barre d'actions (masquée à l'impression) */}
          <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
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
            <PrintButton />
          </div>

          {/* La feuille imprimable */}
          <article className="print-sheet bg-white p-8 shadow-[0_30px_70px_-40px_rgba(22,19,15,0.4)] lg:p-14">
            {/* En-tête brandé */}
            <div className="flex items-center gap-4 border-b border-taupe/40 pb-6">
              <Image
                src="/logo-mark.png"
                alt="Josée-Ann Jomphe inc."
                width={729}
                height={536}
                className="h-14 w-auto"
              />
              <div>
                <p className="font-display text-lg leading-tight text-ink">
                  Josée-Ann Jomphe
                  <span className="ml-1 text-sm text-clay">inc.</span>
                </p>
                <p className="mt-0.5 text-[0.68rem] uppercase tracking-[0.18em] text-clay">
                  Courtier immobilier résidentiel et commercial
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="eyebrow text-gilt">Check-list · {checklist.audience}</p>
              <h1 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-light leading-tight text-ink">
                {checklist.title}
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-smoke">
                {checklist.intro}
              </p>
            </div>

            {/* Blocs */}
            <div className="mt-10">
              {checklist.blocks.map((b, i) => {
                if (b.type === "group") {
                  return (
                    <section key={i} className="print-avoid-break mt-9">
                      <h2 className="flex items-center gap-3 font-display text-xl font-light text-ink">
                        <span className="h-px w-6 shrink-0 bg-gilt" />
                        {b.title}
                      </h2>
                      <ul className="mt-4 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                        {b.items.map((it) => (
                          <li
                            key={it}
                            className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-charcoal"
                          >
                            <Checkbox />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                }
                if (b.type === "fields") {
                  return (
                    <section key={i} className="print-avoid-break mt-9">
                      <h2 className="flex items-center gap-3 font-display text-xl font-light text-ink">
                        <span className="h-px w-6 shrink-0 bg-gilt" />
                        {b.title}
                      </h2>
                      <div className="mt-4 space-y-4">
                        {b.items.map((f) => (
                          <div key={f} className="flex items-baseline gap-3">
                            <span className="shrink-0 text-[0.95rem] text-charcoal">
                              {f} :
                            </span>
                            <span className="h-4 flex-1 border-b border-dotted border-ink/40" />
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }
                if (b.type === "ratings") {
                  return (
                    <section key={i} className="print-avoid-break mt-9">
                      <h2 className="flex items-center gap-3 font-display text-xl font-light text-ink">
                        <span className="h-px w-6 shrink-0 bg-gilt" />
                        {b.title}
                      </h2>
                      <div className="mt-4 space-y-3">
                        {b.items.map((label) => (
                          <div
                            key={label}
                            className="flex items-center justify-between gap-4 text-[0.95rem] text-charcoal"
                          >
                            <span>{label}</span>
                            <span className="flex gap-1.5">
                              {Array.from({ length: 5 }).map((_, s) => (
                                <Star
                                  key={s}
                                  strokeWidth={1.3}
                                  className="h-5 w-5 text-taupe"
                                />
                              ))}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                }
                if (b.type === "notes") {
                  return (
                    <div key={i} className="print-avoid-break mt-5">
                      <p className="eyebrow text-clay">{b.title ?? "Notes"}</p>
                      <div className="mt-4 space-y-6">
                        {Array.from({ length: b.title ? 3 : 2 }).map((_, l) => (
                          <div
                            key={l}
                            className="border-b border-dashed border-ink/25"
                          />
                        ))}
                      </div>
                    </div>
                  );
                }
                if (b.type === "advice") {
                  return (
                    <div
                      key={i}
                      className="print-avoid-break mt-12 border-l-2 border-gilt bg-sand/60 px-6 py-6"
                    >
                      <p className="font-display text-xl text-ink">{b.title}</p>
                      {b.paragraphs.map((p) => (
                        <p key={p} className="mt-3 leading-relaxed text-smoke">
                          {p}
                        </p>
                      ))}
                    </div>
                  );
                }
                return (
                  <p key={i} className="mt-6 leading-relaxed text-charcoal">
                    {b.text}
                  </p>
                );
              })}
            </div>

            {/* Pied de page brandé */}
            <div className="mt-14 flex flex-wrap justify-between gap-2 border-t border-taupe/40 pt-6 text-xs text-clay">
              <span>Josée-Ann Jomphe inc. · Via Capitale Saguenay–Lac-Saint-Jean</span>
              <span>jajomphe.ca · 581 306-1902 · info@jajomphe.ca</span>
            </div>
          </article>

          <div className="no-print mt-10 flex justify-center">
            <PrintButton />
          </div>
        </div>
      </Container>
    </section>
  );
}
