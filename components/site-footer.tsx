import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7h2.35l.35-2.73H13.5V9.53c0-.79.22-1.33 1.36-1.33h1.45V5.76a19.6 19.6 0 0 0-2.12-.11c-2.1 0-3.54 1.28-3.54 3.64v2.03H8.3V14h2.35v7h2.85Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.5 3c.3 2.1 1.5 3.5 3.5 3.7v2.3c-1.2.1-2.4-.2-3.5-.8v5.9c0 3-2.1 5.1-5 5.1-2.7 0-4.8-1.9-4.8-4.7 0-2.9 2.4-4.9 5.4-4.6v2.4c-.4-.1-.9-.2-1.3-.1-1.1.1-1.9 1-1.8 2.3.1 1.2 1 2 2.1 2 1.3 0 2.2-1 2.2-2.6V3h2.7Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div className="lg:col-span-2">
            <p className="font-display text-4xl font-light tracking-wide">
              Josée-Ann Jomphe
              <span className="ml-1 text-lg text-taupe">inc.</span>
            </p>
            <p className="eyebrow mt-3 text-taupe">
              Courtier immobilier résidentiel et commercial
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Image
                src="/viacapital.webp"
                alt="Via Capitale Saguenay–Lac-Saint-Jean, agence immobilière"
                width={1600}
                height={1599}
                className="h-20 w-20"
              />
              <p className="text-xs uppercase leading-relaxed tracking-[0.18em] text-bone/45">
                Via Capitale
                <br />
                Saguenay–Lac-Saint-Jean
                <br />
                Agence immobilière
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow text-taupe">Explorer</p>
            <ul className="mt-6 space-y-3 text-sm text-bone/70">
              {[
                { href: "/proprietes", label: "Propriétés" },
                { href: "/vendre-acheter", label: "Vendre & acheter" },
                { href: "/conseils", label: "Conseils" },
                { href: "/#faq", label: "FAQ" },
                { href: "/a-propos", label: "À propos" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-bone"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-taupe">Prendre rendez-vous</p>
            <ul className="mt-6 space-y-4 text-sm text-bone/70">
              <li>
                <a
                  href="tel:+15813061902"
                  className="flex items-center gap-3 transition-colors hover:text-bone"
                >
                  <Phone strokeWidth={1.4} className="h-4 w-4 text-gilt" />
                  581 306-1902
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@jajomphe.ca"
                  className="flex items-center gap-3 transition-colors hover:text-bone"
                >
                  <Mail strokeWidth={1.4} className="h-4 w-4 text-gilt" />
                  info@jajomphe.ca
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.facebook.com/joseeannjomphecourtierimmobilier"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 transition-colors hover:border-gilt hover:text-gilt"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/joseeann.immobilier"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 transition-colors hover:border-gilt hover:text-gilt"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@joseeann.jomphe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 transition-colors hover:border-gilt hover:text-gilt"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-bone/15 pt-8 text-xs text-bone/45 md:flex-row md:items-center">
          <p>© {year} Josée-Ann Jomphe inc. Tous droits réservés.</p>
          <p className="tracking-wide">
            Courtier immobilier résidentiel et commercial · Membre de
            l&apos;OACIQ · Permis OACIQ H6362
          </p>
        </div>
      </div>
    </footer>
  );
}
