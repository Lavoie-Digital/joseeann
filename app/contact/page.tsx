import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { Container, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Prenez rendez-vous avec Josée-Ann Jomphe, courtier immobilier. Évaluation gratuite, visites privées et accompagnement sur mesure.",
};

export default function ContactPage() {
  return (
    <section className="bg-bone pb-24 pt-32 lg:pt-44">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-24 lg:items-center">
          {/* Colonne info */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Restons en contact</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-7 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-[1.05] text-ink">
                Parlons de votre <span className="italic text-gilt">projet</span>.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-smoke">
                Chaque grand projet commence par une simple conversation.
                Écrivez-moi et voyons ensemble comment je peux vous aider à
                réaliser le vôtre — je vous reviens personnellement, généralement
                en moins de 24 heures.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 space-y-6">
                {[
                  { icon: Phone, label: "Téléphone", value: "581 306-1902", href: "tel:+15813061902" },
                  { icon: Mail, label: "Courriel", value: "info@jajomphe.ca", href: "mailto:info@jajomphe.ca" },
                  { icon: MapPin, label: "Secteur", value: "Saguenay–Lac-Saint-Jean" },
                  { icon: Clock, label: "Disponibilité", value: "7 jours sur 7, de 8 h à 20 h" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-taupe/40">
                      <c.icon strokeWidth={1.3} className="h-4 w-4 text-gilt" />
                    </span>
                    <div>
                      <p className="eyebrow text-clay">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="mt-1 block text-charcoal transition-colors hover:text-ink">
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-charcoal">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="relative mt-12 aspect-[4/5] max-w-md overflow-hidden">
                <Image
                  src="/portrait 2.jpg"
                  alt="Josée-Ann Jomphe, courtier immobilier"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="img-warm object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Colonne formulaire */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="border border-taupe/30 bg-bone p-8 lg:p-12">
                <Suspense fallback={<div className="h-96" />}>
                  <ContactForm />
                </Suspense>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
