import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Josée-Ann Jomphe inc. — collecte, utilisation et protection des renseignements personnels conformément à la Loi 25 (Québec).",
  alternates: { canonical: "/politique-de-confidentialite" },
};

/** Date d'entrée en vigueur — à mettre à jour lors d'une révision. */
const EFFECTIVE_DATE = "31 juillet 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-light leading-tight text-ink first:mt-0">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 leading-[1.8] text-charcoal">{children}</p>;
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-smoke">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gilt" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero
        eyebrow="Confidentialité"
        title={
          <>
            Politique de <span className="italic text-gilt">confidentialité</span>.
          </>
        }
        subtitle="La protection de vos renseignements personnels est une priorité. Cette politique explique quels renseignements sont recueillis, pourquoi, et comment ils sont protégés, conformément à la Loi 25 du Québec."
      />

      <section className="bg-bone py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-clay">
              En vigueur le {EFFECTIVE_DATE}
            </p>

            <H2>1. Responsable de la protection des renseignements personnels</H2>
            <P>
              Josée-Ann Jomphe inc., courtier immobilier résidentiel et
              commercial, est responsable des renseignements personnels
              recueillis par l&apos;entremise du site jajomphe.ca. Conformément
              à la Loi 25, la personne responsable de la protection des
              renseignements personnels est&nbsp;:
            </P>
            <P>
              <strong className="text-ink">Josée-Ann Jomphe</strong>
              <br />
              Courrier électronique&nbsp;:{" "}
              <a
                href="mailto:info@jajomphe.ca"
                className="text-gilt underline-offset-4 hover:underline"
              >
                info@jajomphe.ca
              </a>
              <br />
              Téléphone&nbsp;:{" "}
              <a
                href="tel:+15813061902"
                className="text-gilt underline-offset-4 hover:underline"
              >
                581 306-1902
              </a>
            </P>

            <H2>2. Renseignements que nous recueillons</H2>
            <P>
              Nous recueillons uniquement les renseignements que vous nous
              fournissez volontairement au moyen de nos formulaires, ainsi que
              certaines données techniques nécessaires au bon fonctionnement du
              site&nbsp;:
            </P>
            <Bullets
              items={[
                "Formulaire de contact : nom, adresse courriel, numéro de téléphone, sujet de la demande et contenu du message.",
                "Alertes de propriétés : nom, courriel, téléphone, type de propriété, secteurs recherchés, nombre de chambres, budget, échéancier et commentaires.",
                "Demande de guides (vendeur ou acheteur) : nom et adresse courriel.",
                "Données techniques : adresse IP, type de navigateur et d'appareil, ainsi que des journaux de connexion générés automatiquement par notre hébergeur et notre réseau de diffusion, à des fins de sécurité et de performance.",
              ]}
            />
            <P>
              Nous ne recueillons aucun renseignement personnel sensible et ne
              vous demandons jamais de renseignements financiers ou bancaires
              par l&apos;entremise du site.
            </P>

            <H2>3. Fins de la collecte</H2>
            <P>Vos renseignements sont utilisés afin de&nbsp;:</P>
            <Bullets
              items={[
                "Répondre à vos demandes et communiquer avec vous;",
                "Vous transmettre les documents demandés (guides, évaluations, informations sur des propriétés);",
                "Vous aviser lorsqu'une propriété correspond à vos critères de recherche;",
                "Assurer le suivi de la relation client et de vos projets immobiliers;",
                "Assurer la sécurité du site et prévenir les utilisations frauduleuses ou automatisées (pourriel).",
              ]}
            />

            <H2>4. Consentement</H2>
            <P>
              En soumettant un formulaire sur le site, vous consentez à ce que
              vos renseignements soient recueillis et utilisés aux fins
              décrites ci-dessus. Vous pouvez retirer votre consentement en tout
              temps en nous écrivant à info@jajomphe.ca; ce retrait
              n&apos;affecte pas la légalité du traitement effectué avant la
              demande.
            </P>

            <H2>5. Témoins de connexion (cookies) et technologies similaires</H2>
            <P>
              Un témoin de connexion («&nbsp;cookie&nbsp;») est un petit fichier
              déposé sur votre appareil par un site web. Le site jajomphe.ca
              n&apos;utilise <strong className="text-ink">aucun cookie
              publicitaire ni de suivi</strong>, et n&apos;a recours à aucun
              outil de statistiques comme Google Analytics.
            </P>
            <P>
              Seuls des témoins strictement nécessaires peuvent être utilisés,
              notamment par notre réseau de diffusion (Cloudflare), afin
              d&apos;assurer la sécurité et la performance du site. Ces témoins
              ne servent pas à vous profiler ni à vous suivre sur d&apos;autres
              sites.
            </P>
            <P>
              Vous pouvez en tout temps bloquer ou supprimer les témoins à
              partir des réglages de votre navigateur (Chrome, Safari, Firefox,
              Edge, etc.). Le blocage des témoins strictement nécessaires
              pourrait toutefois nuire au bon fonctionnement de certaines
              parties du site.
            </P>

            <H2>6. Communication à des tiers</H2>
            <P>
              Nous ne vendons jamais vos renseignements personnels. Ils peuvent
              être communiqués uniquement aux fournisseurs qui nous permettent
              d&apos;exploiter le site et de vous servir, et seulement dans la
              mesure nécessaire&nbsp;:
            </P>
            <Bullets
              items={[
                "Fournisseur d'envoi de courriels (SendGrid / Twilio), pour l'acheminement des messages et des accusés de réception;",
                "Notre outil de gestion de la relation client (CRM), pour le suivi de vos demandes;",
                "Notre hébergeur (Render) et notre réseau de diffusion (Cloudflare), qui traitent les données techniques nécessaires au fonctionnement du site;",
                "L'agence immobilière à laquelle est rattachée la courtière (Via Capitale), lorsque cela est requis dans le cadre d'une transaction.",
              ]}
            />
            <P>
              Les inscriptions de propriétés affichées sur le site proviennent
              du système Centris®; ce flux ne comprend pas vos renseignements
              personnels de visiteur.
            </P>

            <H2>7. Hébergement et communication hors du Québec</H2>
            <P>
              Certains de nos fournisseurs (notamment pour l&apos;envoi de
              courriels, l&apos;hébergement et la diffusion) peuvent stocker ou
              traiter des renseignements à l&apos;extérieur du Québec, y compris
              aux États-Unis. Avant de confier des renseignements à ces
              fournisseurs, nous nous assurons qu&apos;ils offrent une
              protection adéquate au moyen d&apos;ententes contractuelles et de
              mesures de sécurité appropriées.
            </P>

            <H2>8. Durée de conservation</H2>
            <P>
              Nous conservons vos renseignements uniquement le temps nécessaire
              à la réalisation des fins pour lesquelles ils ont été recueillis,
              ou pour respecter nos obligations légales et professionnelles
              (notamment celles applicables aux courtiers immobiliers). Une fois
              ces fins accomplies, les renseignements sont détruits ou
              anonymisés de façon sécuritaire.
            </P>

            <H2>9. Sécurité</H2>
            <P>
              Nous mettons en place des mesures de sécurité raisonnables —
              techniques, physiques et organisationnelles — pour protéger vos
              renseignements contre la perte, le vol et tout accès, utilisation
              ou divulgation non autorisés. Les communications avec le site sont
              chiffrées (HTTPS).
            </P>

            <H2>10. Vos droits</H2>
            <P>Conformément à la Loi 25, vous avez le droit de&nbsp;:</P>
            <Bullets
              items={[
                "Accéder aux renseignements personnels que nous détenons à votre sujet;",
                "Demander la rectification de renseignements inexacts, incomplets ou équivoques;",
                "Retirer votre consentement à leur utilisation;",
                "Demander la cessation de la diffusion ou la désindexation de renseignements vous concernant, dans les cas prévus par la loi;",
                "Obtenir, dans certains cas, la communication des renseignements informatisés dans un format technologique structuré et couramment utilisé (portabilité).",
              ]}
            />
            <P>
              Pour exercer l&apos;un de ces droits, écrivez-nous à{" "}
              <a
                href="mailto:info@jajomphe.ca"
                className="text-gilt underline-offset-4 hover:underline"
              >
                info@jajomphe.ca
              </a>
              . Nous répondrons dans les délais prévus par la loi.
            </P>

            <H2>11. Incident de confidentialité</H2>
            <P>
              En cas d&apos;incident de confidentialité présentant un risque de
              préjudice sérieux, nous prendrons les mesures raisonnables pour en
              diminuer les conséquences, tiendrons un registre des incidents et
              aviserons les personnes concernées ainsi que la Commission
              d&apos;accès à l&apos;information, comme l&apos;exige la loi.
            </P>

            <H2>12. Liens vers des sites tiers</H2>
            <P>
              Le site peut contenir des liens vers des sites externes (par
              exemple Facebook, Instagram, TikTok ou Google). Nous ne sommes pas
              responsables des pratiques de confidentialité de ces sites; nous
              vous invitons à consulter leurs politiques respectives.
            </P>

            <H2>13. Modifications de la politique</H2>
            <P>
              Cette politique peut être mise à jour de temps à autre. La date
              d&apos;entrée en vigueur indiquée au haut de la page reflète la
              version la plus récente. Nous vous invitons à la consulter
              périodiquement.
            </P>

            <H2>14. Nous joindre et déposer une plainte</H2>
            <P>
              Pour toute question relative à cette politique ou à la protection
              de vos renseignements personnels, communiquez avec la personne
              responsable indiquée à la section 1.
            </P>
            <P>
              Si vous estimez que vos droits n&apos;ont pas été respectés, vous
              pouvez déposer une plainte auprès de la Commission d&apos;accès à
              l&apos;information du Québec&nbsp;:{" "}
              <a
                href="https://www.cai.gouv.qc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gilt underline-offset-4 hover:underline"
              >
                cai.gouv.qc.ca
              </a>
              .
            </P>

            <div className="mt-16 border-t border-taupe/30 pt-8">
              <Link
                href="/contact"
                className="text-[0.78rem] uppercase tracking-[0.2em] text-clay underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Une question&nbsp;? Écrivez-moi
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
