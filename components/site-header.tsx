"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/proprietes", label: "Propriétés" },
  { href: "/vendre-acheter", label: "Vendre & acheter" },
  { href: "/conseils", label: "Conseils" },
  { href: "/a-propos", label: "À propos" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Pages dont le hero est sombre (image plein écran) au sommet.
  const darkHero =
    pathname === "/" ||
    pathname === "/proprietes" ||
    pathname === "/conseils" ||
    pathname === "/vendre-acheter";
  const light = darkHero && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bone/85 backdrop-blur-md border-b border-taupe/25 py-3"
            : light
            ? "bg-gradient-to-b from-ink/55 via-ink/20 to-transparent py-5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="relative z-10 flex items-center gap-3">
            <Image
              src={light ? "/logo-mark-light.png" : "/logo-mark.png"}
              alt="Josée-Ann Jomphe inc. — Courtier immobilier résidentiel et commercial"
              width={729}
              height={536}
              priority
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-12" : "h-16"
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-x-8 lg:flex xl:gap-x-10">
            {NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative text-[0.82rem] uppercase tracking-[0.2em] transition-colors ${
                    light
                      ? "text-bone/85 hover:text-bone"
                      : "text-charcoal hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gilt transition-all duration-500 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className={`hidden rounded-full border px-6 py-2.5 text-[0.78rem] uppercase tracking-[0.2em] transition-all duration-300 lg:inline-block ${
                light
                  ? "border-bone/60 text-bone hover:bg-bone hover:text-ink"
                  : "border-ink text-ink hover:bg-ink hover:text-bone"
              }`}
            >
              Contact
            </Link>
            <button
              aria-label="Ouvrir le menu"
              onClick={() => setOpen(true)}
              className={`relative z-10 transition-colors lg:hidden ${
                light ? "text-bone" : "text-ink"
              }`}
            >
              <Menu strokeWidth={1.4} className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-ink text-bone lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-2xl tracking-wide">JAJ</span>
              <button aria-label="Fermer le menu" onClick={() => setOpen(false)}>
                <X strokeWidth={1.4} className="h-7 w-7" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-8 pt-10">
              {[...NAV, { href: "/contact", label: "Contact" }].map(
                (item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.07, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-bone/15 py-5 font-display text-4xl font-light"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
