import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joseeannjomphe.ca"),
  title: {
    default: "Josée-Ann Jomphe · Courtier immobilier haut de gamme",
    template: "%s · Josée-Ann Jomphe",
  },
  description:
    "Courtage immobilier résidentiel et commercial haut de gamme. Une approche épurée, discrète et sur mesure pour vendre et acquérir des propriétés d'exception.",
  keywords: [
    "courtier immobilier",
    "immobilier de prestige",
    "propriétés de luxe",
    "résidentiel",
    "commercial",
    "Québec",
    "Josée-Ann Jomphe",
  ],
  openGraph: {
    title: "Josée-Ann Jomphe · Courtier immobilier haut de gamme",
    description:
      "Courtage immobilier résidentiel et commercial haut de gamme. Une approche épurée, discrète et sur mesure.",
    type: "website",
    locale: "fr_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr-CA"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
