"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, LogOut, Pencil, Trash2, Upload, X } from "lucide-react";
import type { Capsule } from "@/lib/capsules";

const MAX_BYTES = 500 * 1024 * 1024;
const ACCEPT = "video/mp4,video/quicktime,video/webm";

const inputCls =
  "w-full border-b border-taupe/50 bg-transparent py-3 text-charcoal outline-none transition-colors placeholder:text-clay/70 focus:border-ink";
const btnSolid =
  "inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] text-bone transition-all duration-300 hover:bg-charcoal disabled:opacity-50";

/** Envoie le fichier directement à Storage (URL signée), avec progression. */
function putWithProgress(url: string, file: File, onProgress: (pct: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`HTTP ${xhr.status}`));
    xhr.onerror = () => reject(new Error("Réseau"));
    xhr.send(file);
  });
}

async function api(url: string, init: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.error ?? "Une erreur est survenue.");
  return data;
}

export function CapsulesManager({
  initial,
  loadError,
}: {
  initial: Capsule[];
  loadError: string;
}) {
  const router = useRouter();
  const [capsules, setCapsules] = useState(initial);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="grid gap-16 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <UploadForm onCreated={(c) => setCapsules((list) => [c, ...list])} />
        <button
          onClick={logout}
          className="mt-12 inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.2em] text-clay transition-colors hover:text-ink"
        >
          <LogOut strokeWidth={1.5} className="h-4 w-4" />
          Me déconnecter
        </button>
      </div>

      <div className="lg:col-span-7">
        <p className="eyebrow text-clay">
          En ligne sur la page d&apos;accueil ({capsules.length})
        </p>
        {loadError && (
          <p className="mt-6 border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-800">
            {loadError}
          </p>
        )}
        {!loadError && capsules.length === 0 && (
          <p className="mt-6 text-smoke">
            Aucune capsule pour l&apos;instant. La section vidéo apparaîtra sur
            la page d&apos;accueil dès votre première capsule.
          </p>
        )}
        <ul className="mt-6 space-y-6">
          {capsules.map((c) => (
            <CapsuleRow
              key={c.id}
              capsule={c}
              onUpdated={(u) => setCapsules((list) => list.map((x) => (x.id === u.id ? u : x)))}
              onDeleted={() => setCapsules((list) => list.filter((x) => x.id !== c.id))}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function UploadForm({ onCreated }: { onCreated: (c: Capsule) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function pick(f: File | undefined) {
    setError("");
    setDone(false);
    if (!f) return setFile(null);
    if (!ACCEPT.split(",").includes(f.type)) {
      setFile(null);
      return setError("Format non pris en charge. Utilisez une vidéo MP4, MOV ou WebM.");
    }
    if (f.size > MAX_BYTES) {
      setFile(null);
      return setError("Cette vidéo dépasse 500 Mo.");
    }
    setFile(f);
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file || !title.trim()) return;
    setError("");
    setDone(false);
    setProgress(0);
    try {
      const { uploadUrl, storagePath } = await api("/api/admin/capsules/upload-url", {
        method: "POST",
        body: JSON.stringify({ contentType: file.type, size: file.size }),
      });
      await putWithProgress(uploadUrl, file, setProgress).catch(() => {
        throw new Error("L'envoi de la vidéo a échoué. Vérifiez votre connexion et réessayez.");
      });
      const { capsule } = await api("/api/admin/capsules", {
        method: "POST",
        body: JSON.stringify({ title, description, storagePath }),
      });
      onCreated(capsule);
      setFile(null);
      setTitle("");
      setDescription("");
      if (fileRef.current) fileRef.current.value = "";
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setProgress(null);
    }
  }

  const busy = progress !== null;

  return (
    <form onSubmit={onSubmit} className="border border-taupe/40 bg-sand/50 p-8">
      <p className="font-display text-2xl font-light text-ink">Ajouter une capsule</p>

      <label
        className={`mt-8 flex cursor-pointer flex-col items-center justify-center border border-dashed border-taupe px-6 py-10 text-center transition-colors hover:border-ink ${busy ? "pointer-events-none opacity-60" : ""}`}
      >
        <Upload strokeWidth={1.2} className="h-8 w-8 text-gilt" />
        <span className="mt-4 text-sm text-charcoal">
          {file ? file.name : "Choisir une vidéo"}
        </span>
        <span className="mt-1 text-xs text-smoke">
          {file
            ? `${(file.size / 1024 / 1024).toFixed(1)} Mo`
            : "MP4, MOV ou WebM · 500 Mo max."}
        </span>
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </label>

      <label htmlFor="cap-title" className="eyebrow mt-8 block text-clay">
        Titre *
      </label>
      <input
        id="cap-title"
        value={title}
        maxLength={120}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ex. : 3 conseils avant de vendre"
        className={`mt-2 ${inputCls}`}
      />

      <label htmlFor="cap-desc" className="eyebrow mt-8 block text-clay">
        Courte description
      </label>
      <textarea
        id="cap-desc"
        value={description}
        maxLength={400}
        rows={3}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Facultatif"
        className={`mt-2 resize-none ${inputCls}`}
      />

      {busy && (
        <div className="mt-8">
          <div className="h-1 w-full overflow-hidden bg-taupe/30">
            <div className="h-full bg-gilt transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-smoke">
            Envoi en cours… {progress}% (gardez cette page ouverte)
          </p>
        </div>
      )}
      {error && <p className="mt-6 text-sm text-red-700">{error}</p>}
      {done && (
        <p className="mt-6 flex items-center gap-2 text-sm text-charcoal">
          <Check className="h-4 w-4 text-gilt" /> Capsule publiée sur la page d&apos;accueil.
        </p>
      )}

      <button type="submit" disabled={!file || !title.trim() || busy} className={`mt-8 ${btnSolid}`}>
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload strokeWidth={1.5} className="h-4 w-4" />}
        Publier
      </button>
    </form>
  );
}

function CapsuleRow({
  capsule,
  onUpdated,
  onDeleted,
}: {
  capsule: Capsule;
  onUpdated: (c: Capsule) => void;
  onDeleted: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(capsule.title);
  const [description, setDescription] = useState(capsule.description);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    setBusy(true);
    setError("");
    try {
      await api(`/api/admin/capsules/${capsule.id}`, {
        method: "PATCH",
        body: JSON.stringify({ title, description }),
      });
      onUpdated({ ...capsule, title: title.trim(), description: description.trim() });
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm(`Supprimer « ${capsule.title} » ? La vidéo sera retirée du site.`)) return;
    setBusy(true);
    setError("");
    try {
      await api(`/api/admin/capsules/${capsule.id}`, { method: "DELETE" });
      onDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur.");
      setBusy(false);
    }
  }

  return (
    <li className="flex gap-5 border-t border-taupe/40 pt-6">
      <video
        src={`${capsule.videoUrl}#t=0.1`}
        preload="metadata"
        muted
        playsInline
        controls
        className="aspect-[9/16] w-28 shrink-0 bg-ink object-cover"
      />
      <div className="min-w-0 flex-1">
        {editing ? (
          <>
            <input
              value={title}
              maxLength={120}
              onChange={(e) => setTitle(e.target.value)}
              className={inputCls}
              aria-label="Titre"
            />
            <textarea
              value={description}
              maxLength={400}
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-2 resize-none text-sm ${inputCls}`}
              aria-label="Description"
            />
            <div className="mt-4 flex gap-4">
              <button
                onClick={save}
                disabled={busy || !title.trim()}
                className="inline-flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-ink disabled:opacity-50"
              >
                <Check className="h-4 w-4" /> Enregistrer
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setTitle(capsule.title);
                  setDescription(capsule.description);
                }}
                className="inline-flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-clay"
              >
                <X className="h-4 w-4" /> Annuler
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="font-display text-xl text-ink">{capsule.title}</p>
            {capsule.description && (
              <p className="mt-2 text-sm leading-relaxed text-smoke">{capsule.description}</p>
            )}
            <p className="mt-2 text-xs text-clay">
              Ajoutée le {new Date(capsule.createdAt).toLocaleDateString("fr-CA", { dateStyle: "long" })}
            </p>
            <div className="mt-4 flex gap-5">
              <button
                onClick={() => setEditing(true)}
                disabled={busy}
                className="inline-flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-gilt"
              >
                <Pencil className="h-3.5 w-3.5" /> Modifier
              </button>
              <button
                onClick={remove}
                disabled={busy}
                className="inline-flex items-center gap-1.5 text-[0.72rem] uppercase tracking-[0.2em] text-red-700 transition-colors hover:text-red-900"
              >
                {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                Supprimer
              </button>
            </div>
          </>
        )}
        {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
      </div>
    </li>
  );
}
