"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const SUBJECTS = [
  "Vendre une propriété",
  "Acheter une propriété",
  "Évaluation gratuite",
  "Investissement commercial",
  "Autre demande",
];

const SUBJECT_BY_PARAM: Record<string, string> = {
  vendre: "Vendre une propriété",
  acheter: "Acheter une propriété",
  evaluation: "Évaluation gratuite",
  commercial: "Investissement commercial",
};

export function ContactForm() {
  const params = useSearchParams();
  const propertyRef = params.get("propriete") ?? "";
  const defaultSubject =
    SUBJECT_BY_PARAM[params.get("sujet") ?? ""] ?? SUBJECTS[0];

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  // Instant d'affichage du formulaire — sert au piège temporel anti-robot.
  const mountedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          propertyRef,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
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
      setMessage("Impossible d'envoyer le message. Vérifiez votre connexion.");
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
          Message envoyé, merci.
        </h3>
        <p className="mt-4 max-w-md text-smoke">
          Votre demande a bien été reçue. Josée-Ann vous reviendra
          personnellement, généralement en moins de 24 heures. Un courriel de
          confirmation vient de vous être envoyé.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-[0.78rem] uppercase tracking-[0.2em] text-clay underline-offset-4 hover:text-ink hover:underline"
        >
          Envoyer un autre message
        </button>
      </motion.div>
    );
  }

  const inputCls =
    "w-full border-b border-taupe/50 bg-transparent py-3 text-charcoal outline-none transition-colors placeholder:text-clay/70 focus:border-ink";

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      {propertyRef && (
        <p className="rounded-sm border border-gilt/40 bg-gilt/10 px-4 py-3 text-sm text-charcoal">
          Demande concernant la propriété{" "}
          <span className="font-medium">{propertyRef}</span>.
        </p>
      )}

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
          <input name="phone" type="tel" className={`mt-2 ${inputCls}`} placeholder="514 000-0000" />
        </div>
        <div>
          <label className="eyebrow text-clay">Sujet</label>
          <select name="subject" defaultValue={defaultSubject} className={`mt-2 ${inputCls}`}>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="eyebrow text-clay">Votre message *</label>
        <textarea
          name="message"
          required
          rows={5}
          className={`mt-2 resize-none ${inputCls}`}
          placeholder="Parlez-moi de votre projet…"
        />
        {errors.message && <p className="mt-1 text-xs text-red-700">{errors.message}</p>}
      </div>

      <AnimatePresence>
        {status === "error" && message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-700"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

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
            Envoyer le message
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
