import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { SITE, realEstateAgentJsonLd, webSiteJsonLd } from "@/lib/seo";

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
  metadataBase: new URL("https://jajomphe.ca"),
  title: {
    default:
      "Josée-Ann Jomphe · Courtier immobilier résidentiel et commercial au Saguenay",
    template: "%s · Josée-Ann Jomphe",
  },
  description:
    "Josée-Ann Jomphe, courtier immobilier résidentiel et commercial au Saguenay–Lac-Saint-Jean. Un accompagnement humain et rigoureux pour vendre, acheter et investir.",
  keywords: [
    "courtier immobilier",
    "Saguenay",
    "Lac-Saint-Jean",
    "résidentiel",
    "commercial",
    "Via Capitale",
    "Québec",
    "Josée-Ann Jomphe",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Josée-Ann Jomphe" }],
  creator: "Josée-Ann Jomphe",
  openGraph: {
    title:
      "Josée-Ann Jomphe · Courtier immobilier résidentiel et commercial au Saguenay",
    description:
      "Un accompagnement humain et rigoureux pour vendre, acheter et investir au Saguenay–Lac-Saint-Jean.",
    type: "website",
    locale: "fr_CA",
    url: SITE.url,
    siteName: "Josée-Ann Jomphe",
    images: [
      {
        url: SITE.ogImage,
        width: 2048,
        height: 1365,
        alt: "Josée-Ann Jomphe, courtier immobilier au Saguenay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Josée-Ann Jomphe · Courtier immobilier au Saguenay–Lac-Saint-Jean",
    description:
      "Un accompagnement humain et rigoureux pour vendre, acheter et investir au Saguenay–Lac-Saint-Jean.",
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <JsonLd data={[realEstateAgentJsonLd(), webSiteJsonLd()]} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
