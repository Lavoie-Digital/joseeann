"use client";

import { Download } from "lucide-react";

/**
 * Déclenche la boîte d'impression du navigateur, où l'utilisateur choisit
 * « Enregistrer au format PDF » comme destination. La feuille est déjà mise
 * en page pour l'impression (voir les styles @media print de globals.css).
 */
export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:bg-gilt ${className}`}
    >
      Télécharger en PDF
      <Download
        strokeWidth={1.6}
        className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
      />
    </button>
  );
}
