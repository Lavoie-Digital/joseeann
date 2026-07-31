"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CheckCircle2, Loader2, Send, X } from "lucide-react";
import { GuideViewer } from "@/components/guide-viewer";

type Status = "idle" | "loading" | "error";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Bloc « Guide du vendeur » — remplace l'aperçu feuilletable affiché en
 * permanence : une section explicative avec un bouton qui ouvre un court
 * formulaire (nom + courriel). Les coordonnées partent vers le CRM et, en
 * échange, le guide se déploie directement sur la page.
 */
export function GuideGate() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const mountedAt = useRef(0);

  useEffect(() => {
    if (open) mountedAt.current = Date.now();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          elapsedMs: Date.now() - mountedAt.current,
        }),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setOpen(false);
        setUnlocked(true);
        setStatus("idle");
      } else {
        setStatus("error");
        setError(json.error ?? "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setError("Impossible d'envoyer votre demande. Vérifiez votre connexion.");
    }
  }

  if (unlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <p className="eyebrow text-clay">Feuilletez mon guide du vendeur</p>
        <div className="mt-8 max-w-md">
          <GuideViewer />
        </div>
      </motion.div>
    );
  }

  const inputCls =
    "w-full border-b border-taupe/50 bg-transparent py-3 text-charcoal outline-none transition-colors placeholder:text-clay/70 focus:border-ink";

  return (
    <>
      <div className="border border-taupe/30 bg-sand/50 p-8 lg:p-10">
        <BookOpen strokeWidth={1.2} className="h-8 w-8 text-gilt" />
        <h3 className="mt-5 font-display text-2xl font-light text-ink">
          Recevez le guide du vendeur
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-smoke">
          18 pages pour bien préparer votre propriété, établir le juste prix et
          comprendre chaque étape de la vente, de l&apos;évaluation à la
          signature chez le notaire.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:bg-gilt"
        >
          Recevoir mon guide
          <Send
            strokeWidth={1.6}
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-6 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md border border-taupe/30 bg-bone p-8 lg:p-10"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-clay transition-colors hover:text-ink"
              >
                <X strokeWidth={1.6} className="h-4 w-4" />
              </button>

              <p className="eyebrow text-clay">Guide du vendeur</p>
              <h3 className="mt-3 font-display text-2xl font-light text-ink">
                Où puis-je vous l&apos;envoyer&nbsp;?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-smoke">
                Vos coordonnées me sont transmises et le guide s&apos;affiche
                immédiatement ci-dessous.
              </p>

              <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
                {/* Honeypot anti-pourriel */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />

                <div>
                  <label className="eyebrow text-clay">Nom complet *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className={`mt-2 ${inputCls}`}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="eyebrow text-clay">Courriel *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className={`mt-2 ${inputCls}`}
                    placeholder="vous@exemple.com"
                  />
                </div>

                {status === "error" && error && (
                  <p className="text-sm text-red-700">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:bg-gilt disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      Envoi en cours
                      <Loader2 strokeWidth={1.6} className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Recevoir le guide
                      <CheckCircle2 strokeWidth={1.6} className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-xs leading-relaxed text-clay">
                  Vos renseignements demeurent strictement confidentiels et ne
                  seront jamais partagés.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
