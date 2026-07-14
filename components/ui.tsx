import Link from "next/link";
import Image from "next/image";
import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1400px] px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-3 text-clay ${className}`}
    >
      <span className="h-px w-8 bg-gilt" />
      {children}
    </span>
  );
}

/** En-tête de page intérieure (dégage le header fixe) */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imagePosition = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  imagePosition?: string;
}) {
  if (image) {
    return (
      <section className="relative flex min-h-[52vh] items-end overflow-hidden pt-32 lg:min-h-[42vh]">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: imagePosition }}
          className="img-warm object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/45" />
        <div className="absolute inset-0 bg-ink/20" />
        <Container className="relative z-10 pb-16 text-bone">
          <span className="eyebrow inline-flex items-center gap-3 text-bone/80">
            <span className="h-px w-8 bg-gilt" />
            {eyebrow}
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,6vw,5rem)] font-light leading-[1.04]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/80">
              {subtitle}
            </p>
          )}
        </Container>
      </section>
    );
  }
  return (
    <section className="bg-bone pb-16 pt-40 lg:pt-48">
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-7 max-w-4xl font-display text-[clamp(2.6rem,6vw,5rem)] font-light leading-[1.04] text-ink">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-smoke">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}

/** Bouton principal (encre) */
export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
}) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[0.78rem] uppercase tracking-[0.2em] transition-all duration-300";
  const styles = {
    solid: "bg-ink text-bone hover:bg-charcoal",
    outline: "border border-ink text-ink hover:bg-ink hover:text-bone",
    // La couleur du texte est laissée à `className` (fonds clairs ou sombres)
    // afin d'éviter tout conflit de classes Tailwind.
    ghost: "",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowUpRight
        strokeWidth={1.5}
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
