"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui";
import { Reveal } from "@/components/motion";

/**
 * Calculatrice hypothécaire.
 *
 * Convention canadienne : les prêts hypothécaires à taux fixe sont composés
 * deux fois l'an (semestriellement). Le taux périodique est donc dérivé du
 * taux nominal annuel via une composition semestrielle, puis converti selon
 * la fréquence de paiement choisie.
 */

const FREQUENCIES = [
  { key: "monthly", label: "Mensuel", perYear: 12 },
  { key: "biweekly", label: "Aux 2 semaines", perYear: 26 },
  { key: "weekly", label: "Hebdomadaire", perYear: 52 },
] as const;

type FreqKey = (typeof FREQUENCIES)[number]["key"];

const cad0 = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});
const cad2 = new Intl.NumberFormat("fr-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function MortgageCalculator() {
  const [price, setPrice] = useState(350_000);
  const [downPct, setDownPct] = useState(20); // mise de fonds en %
  const [years, setYears] = useState(25); // amortissement
  const [rate, setRate] = useState(4.75); // taux annuel nominal (%)
  const [freq, setFreq] = useState<FreqKey>("monthly");

  const result = useMemo(() => {
    const down = Math.round((price * downPct) / 100);
    const loan = Math.max(0, price - down);
    const perYear =
      FREQUENCIES.find((f) => f.key === freq)?.perYear ?? 12;
    const n = years * perYear;

    // Taux périodique — composition semestrielle (norme canadienne).
    const annual = rate / 100;
    const periodic =
      annual > 0 ? Math.pow(1 + annual / 2, 2 / perYear) - 1 : 0;

    let payment: number;
    if (loan === 0) {
      payment = 0;
    } else if (periodic === 0) {
      payment = loan / n;
    } else {
      payment = (loan * periodic) / (1 - Math.pow(1 + periodic, -n));
    }

    const total = payment * n;
    const interest = total - loan;

    return { down, loan, payment, total, interest };
  }, [price, downPct, years, rate, freq]);

  const freqLabel =
    FREQUENCIES.find((f) => f.key === freq)?.label.toLowerCase() ?? "";

  return (
    <section className="border-t border-taupe/25 bg-sand py-24 lg:py-32">
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-3 text-clay">
              <span className="h-px w-8 bg-gilt" />
              Outil pratique
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-tight text-ink">
              Calculatrice hypothécaire.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 leading-relaxed text-smoke">
              Estimez vos versements en quelques secondes. Ajustez le prix, la
              mise de fonds, l&apos;amortissement et le taux pour voir l&apos;effet
              sur votre paiement.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 grid gap-px overflow-hidden border border-taupe/30 bg-taupe/30 lg:grid-cols-5">
            {/* Contrôles */}
            <div className="space-y-9 bg-bone p-8 lg:col-span-3 lg:p-12">
              {/* Prix */}
              <Field
                label="Prix de la propriété"
                value={cad0.format(price)}
              >
                <input
                  type="range"
                  min={50_000}
                  max={2_000_000}
                  step={5_000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-[#a8926a]"
                />
                <input
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) =>
                    setPrice(clamp(Number(e.target.value) || 0, 0, 100_000_000))
                  }
                  className="mt-3 w-full border-b border-taupe/50 bg-transparent py-2 text-charcoal outline-none focus:border-ink"
                />
              </Field>

              {/* Mise de fonds */}
              <Field
                label="Mise de fonds"
                value={`${cad0.format(result.down)} · ${downPct}%`}
              >
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                  className="w-full accent-[#a8926a]"
                />
                <p className="mt-2 text-xs text-clay">
                  Minimum légal&nbsp;: 5&nbsp;% (jusqu&apos;à 500&nbsp;000&nbsp;$).
                </p>
              </Field>

              {/* Amortissement */}
              <Field label="Amortissement" value={`${years} ans`}>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-[#a8926a]"
                />
              </Field>

              {/* Taux */}
              <Field label="Taux d'intérêt annuel" value={`${rate.toFixed(2)} %`}>
                <input
                  type="range"
                  min={1}
                  max={12}
                  step={0.05}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-[#a8926a]"
                />
              </Field>

              {/* Fréquence */}
              <div>
                <p className="eyebrow text-clay">Fréquence de paiement</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FREQUENCIES.map((f) => (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setFreq(f.key)}
                      className={`rounded-full border px-5 py-2 text-[0.72rem] uppercase tracking-[0.15em] transition-colors ${
                        freq === f.key
                          ? "border-ink bg-ink text-bone"
                          : "border-taupe/50 text-clay hover:border-ink hover:text-ink"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Résultat */}
            <div className="flex flex-col justify-center bg-ink p-8 text-bone lg:col-span-2 lg:p-12">
              <p className="eyebrow text-taupe">
                Votre paiement {freqLabel}
              </p>
              <p className="mt-4 font-display text-[clamp(2.6rem,6vw,4rem)] font-light leading-none text-bone">
                {cad2.format(result.payment)}
              </p>

              <dl className="mt-10 space-y-4 border-t border-bone/15 pt-8 text-sm">
                <Row label="Montant du prêt" value={cad0.format(result.loan)} />
                <Row
                  label="Intérêts totaux"
                  value={cad0.format(result.interest)}
                />
                <Row
                  label="Coût total"
                  value={cad0.format(result.total)}
                  strong
                />
              </dl>

              <p className="mt-8 text-xs leading-relaxed text-bone/50">
                Estimation à titre indicatif seulement, taux composé
                semestriellement. Elle exclut les taxes, assurances et frais.
                Contactez-moi pour un accompagnement personnalisé.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="eyebrow text-clay">{label}</p>
        <span className="font-display text-lg font-light text-ink">
          {value}
        </span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-bone/60">{label}</dt>
      <dd
        className={
          strong ? "font-display text-lg font-light text-gilt" : "text-bone"
        }
      >
        {value}
      </dd>
    </div>
  );
}
