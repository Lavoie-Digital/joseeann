"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    }).catch(() => null);

    if (res?.ok) {
      router.refresh();
      return;
    }
    setLoading(false);
    setError(res?.status === 401 ? "Code invalide." : "Connexion impossible. Réessayez.");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <p className="text-base leading-relaxed text-smoke">
        Entrez votre code d&apos;accès pour gérer les capsules vidéo du site.
      </p>
      <label htmlFor="admin-code" className="eyebrow mt-10 block text-clay">
        Code d&apos;accès
      </label>
      <input
        id="admin-code"
        type="password"
        autoComplete="current-password"
        autoFocus
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mt-2 w-full border-b border-taupe/50 bg-transparent py-3 text-charcoal outline-none transition-colors focus:border-ink"
      />
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={loading || !code}
        className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:bg-charcoal disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Lock strokeWidth={1.5} className="h-4 w-4" />
        )}
        Entrer
      </button>
    </form>
  );
}
