"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const PROPERTY_TYPES = [
  "Maison unifamiliale",
  "Condo",
  "Duplex / plex",
  "Chalet",
  "Terrain",
  "Immeuble à revenus / commercial",
  "Autre",
];

const SECTORS = [
  "Jonquière",
  "Arvida",
  "Chicoutimi",
  "Laterrière",
  "Lac Kénogami",
  "Shipshaw",
  "St-Ambroise",
  "La Baie",
  "St-Honoré",
  "Alma",
  "Ailleurs au Lac-Saint-Jean",
  "Autre",
];

const BEDROOMS = ["1", "2", "3", "4", "5 et plus", "Peu importe"];

const BUDGETS = [
  "200 000 $ et moins",
  "200 000 $ – 300 000 $",
  "300 000 $ – 400 000 $",
  "400 000 $ – 500 000 $",
  "500 000 $ – 600 000 $",
  "700 000 $ et plus",
];

const TIMELINES = [
  "0 à 60 jours",
  "60 à 120 jours",
  "4 à 8 mois",
  "8 mois et plus",
  "Je magasine seulement",
];

export function AlertForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);

  const toggleSector = (s: string) =>
    setSectors((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  // Instant d'affichage du formulaire — sert au piège temporel anti-robot.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/alerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          sector: sectors.length ? sectors.join(", ") : undefined,
          contactMe: data.contactMe === "on",
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        setSectors([]);
      } else if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus("error");
        setMessage("Veuillez corriger les champs indiqués.");
      } else {
        setStatus("error");
        setMessage(json.error ?? "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setMessage("Impossible d'envoyer le formulaire. Vérifiez votre connexion.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center border border-taupe/40 bg-sand px-8 py-20 text-center"
      >
        <CheckCircle2 strokeWidth={1.2} className="h-14 w-14 text-gilt" />
        <h3 className="mt-6 font-display text-3xl font-light text-ink">
          Votre alerte est en préparation.
        </h3>
        <p className="mt-4 max-w-md text-smoke">
          Josée-Ann a bien reçu vos critères et vous contactera dès qu&apos;une
          propriété correspondante sera disponible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-[0.78rem] uppercase tracking-[0.2em] text-clay underline-offset-4 hover:text-ink hover:underline"
        >
          Créer une autre alerte
        </button>
      </motion.div>
    );
  }

  const inputCls =
    "w-full border-b border-taupe/50 bg-transparent py-3 text-charcoal outline-none transition-colors placeholder:text-clay/70 focus:border-ink";

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {/* Honeypot anti-pourriel */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label className="eyebrow text-clay">Nom complet *</label>
          <input name="name" type="text" required className={`mt-2 ${inputCls}`} placeholder="Votre nom" />
          {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
        </div>
        <div>
          <label className="eyebrow text-clay">Courriel *</label>
          <input name="email" type="email" required className={`mt-2 ${inputCls}`} placeholder="vous@exemple.com" />
          {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
        </div>
        <div>
          <label className="eyebrow text-clay">Téléphone</label>
          <input name="phone" type="tel" className={`mt-2 ${inputCls}`} placeholder="418 000-0000" />
        </div>
        <div>
          <label className="eyebrow text-clay">Type de propriété</label>
          <select name="propertyType" defaultValue={PROPERTY_TYPES[0]} className={`mt-2 ${inputCls}`}>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="eyebrow text-clay">Secteurs recherchés</label>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {SECTORS.map((s) => (
              <label
                key={s}
                className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal"
              >
                <input
                  type="checkbox"
                  checked={sectors.includes(s)}
                  onChange={() => toggleSector(s)}
                  className="h-4 w-4 shrink-0 accent-ink"
                />
                {s}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="eyebrow text-clay">Chambres</label>
          <select name="bedrooms" defaultValue={BEDROOMS[0]} className={`mt-2 ${inputCls}`}>
            {BEDROOMS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="eyebrow text-clay">Budget</label>
          <select name="budget" defaultValue={BUDGETS[0]} className={`mt-2 ${inputCls}`}>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="eyebrow text-clay">Délai d&apos;emménagement</label>
          <select name="timeline" defaultValue={TIMELINES[0]} className={`mt-2 ${inputCls}`}>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="eyebrow text-clay">Message (optionnel)</label>
        <textarea
          name="message"
          rows={4}
          className={`mt-2 resize-none ${inputCls}`}
          placeholder="Précisez vos critères ou vos questions…"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-smoke">
        <input
          type="checkbox"
          name="contactMe"
          className="mt-1 h-4 w-4 shrink-0 accent-ink"
        />
        J&apos;aimerais être contacté personnellement par Josée-Ann, en plus de
        recevoir mes alertes.
      </label>

      {status === "error" && message && (
        <p className="text-sm text-red-700">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-9 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:bg-gilt disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            Envoi en cours
            <Loader2 strokeWidth={1.6} className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Créer mon alerte
            <Send strokeWidth={1.6} className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-clay">
        Vos renseignements demeurent strictement confidentiels et ne seront
        jamais partagés.
      </p>
    </form>
  );
}
