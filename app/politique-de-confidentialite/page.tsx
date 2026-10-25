import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Josée-Ann Jomphe inc. : renseignements recueillis sur jajomphe.ca, fournisseurs utilisés, conservation et exercice de vos droits (Loi 25, Québec).",
  alternates: { canonical: "/politique-de-confidentialite" },
};

/** Date de la dernière mise à jour, à changer à chaque révision. */
const UPDATED_DATE = "25 octobre 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-light leading-tight text-ink first:mt-0">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 font-display text-xl font-light leading-snug text-ink">
      {children}
    </h3>
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

const MAIL = (
  <a
    href="mailto:info@jajomphe.ca"
    className="text-gilt underline-offset-4 hover:underline"
  >
    info@jajomphe.ca
  </a>
);

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
        subtitle="Cette politique explique, en termes simples, quels renseignements personnels le site jajomphe.ca recueille, pourquoi, à qui ils sont transmis, combien de temps ils sont conservés et comment exercer vos droits."
      />

      <section className="bg-bone py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-clay">
              Dernière mise à jour : {UPDATED_DATE}
            </p>

            {/* 1 ------------------------------------------------------- */}
            <H2>1. Qui est responsable de vos renseignements</H2>
            <P>
              Le site jajomphe.ca est exploité par{" "}
              <strong className="text-ink">Josée-Ann Jomphe inc.</strong>,
              courtier immobilier résidentiel et commercial rattaché à
              l&apos;agence Via Capitale Saguenay–Lac-Saint-Jean. L&apos;entreprise
              est responsable des renseignements personnels recueillis par
              l&apos;entremise du site.
            </P>
            <P>
              La personne responsable de la protection des renseignements
              personnels est&nbsp;:
            </P>
            <P>
              <strong className="text-ink">Josée-Ann Jomphe</strong>
              <br />
              Courtier immobilier
              <br />
              Courriel&nbsp;: {MAIL}
              <br />
              Téléphone&nbsp;:{" "}
              <a
                href="tel:+15813061902"
                className="text-gilt underline-offset-4 hover:underline"
              >
                581 306-1902
              </a>
            </P>
            <P>
              C&apos;est à elle que vous pouvez écrire pour toute question,
              demande d&apos;accès ou de rectification, retrait de consentement ou
              plainte.
            </P>

            {/* 2 ------------------------------------------------------- */}
            <H2>2. Renseignements recueillis et pourquoi</H2>
            <P>
              Le site ne comporte ni compte utilisateur, ni paiement en ligne.
              Il recueille seulement les renseignements que vous choisissez de
              transmettre au moyen de trois formulaires, ainsi que des données
              techniques liées à votre visite.
            </P>

            <H3>Formulaire de contact (page Contact)</H3>
            <Bullets
              items={[
                "Renseignements : nom, adresse courriel, numéro de téléphone (facultatif), sujet de la demande, message et, si vous écrivez à partir d'une fiche de propriété, le numéro de cette propriété.",
                "Pourquoi : répondre à votre demande, vous envoyer un accusé de réception par courriel et assurer le suivi de votre projet immobilier.",
              ]}
            />

            <H3>Alerte propriété (page Propriétés)</H3>
            <Bullets
              items={[
                "Renseignements : nom, adresse courriel, numéro de téléphone (facultatif), type de propriété, secteurs recherchés, nombre de chambres, fourchette de budget, délai d'emménagement, message (facultatif) et votre souhait d'être contacté personnellement ou non.",
                "Pourquoi : créer une recherche personnalisée et vous transmettre par courriel les propriétés qui correspondent à vos critères. Josée-Ann recrée votre recherche dans Matrix, le système de Centris utilisé par les courtiers, qui envoie ensuite les alertes. Si vous cochez la case prévue, Josée-Ann communiquera aussi avec vous personnellement.",
              ]}
            />

            <H3>Guides du vendeur et de l&apos;acheteur (page Vendre &amp; acheter)</H3>
            <Bullets
              items={[
                "Renseignements : nom, adresse courriel, guide demandé et page d'où provient la demande.",
                "Pourquoi : le guide s'affiche aussitôt sur la page. Vos coordonnées sont transmises à Josée-Ann, qui pourra communiquer avec vous au sujet de votre projet de vente ou d'achat.",
              ]}
            />

            <H3>Données techniques</H3>
            <Bullets
              items={[
                "Lors de chaque visite, l'hébergeur du site enregistre automatiquement des journaux techniques : adresse IP, date et heure, page demandée, type de navigateur et d'appareil. Ils servent au fonctionnement, à la sécurité et au diagnostic des pannes.",
                "Pour bloquer le pourriel, les formulaires mesurent le temps de remplissage et contiennent un champ invisible. Ces éléments servent uniquement à la vérification au moment de l'envoi et ne sont pas conservés.",
              ]}
            />

            <P>
              Les formulaires ne demandent aucun renseignement sensible (santé,
              numéro d&apos;assurance sociale, renseignements bancaires, etc.).
              Nous vous invitons à ne pas en inscrire dans les champs de message.
              Le site ne s&apos;adresse pas aux personnes de moins de 14 ans.
            </P>
            <P>
              Les inscriptions de propriétés affichées sur le site proviennent du
              flux de données de Centris. Ce flux concerne les propriétés et ne
              contient aucun renseignement sur les visiteurs du site.
            </P>

            {/* 3 ------------------------------------------------------- */}
            <H2>3. Votre consentement</H2>
            <P>
              En envoyant un formulaire, vous consentez à ce que les
              renseignements fournis soient utilisés pour les fins décrites à la
              section 2 pour ce formulaire, et seulement pour celles-ci. Ils ne
              seront pas utilisés à d&apos;autres fins sans votre consentement,
              sauf si la loi le permet.
            </P>
            <P>
              Vous pouvez retirer votre consentement en tout temps, par exemple
              pour cesser de recevoir des alertes ou pour que l&apos;on ne
              communique plus avec vous, en écrivant à {MAIL}. Le retrait ne
              touche pas ce qui a été fait avant votre demande.
            </P>

            {/* 4 ------------------------------------------------------- */}
            <H2>4. Témoins (cookies) et contenus de tiers</H2>
            <P>
              Le site jajomphe.ca{" "}
              <strong className="text-ink">
                ne dépose aucun témoin sur l&apos;appareil des visiteurs
              </strong>{" "}
              et n&apos;utilise aucun outil de statistiques, de publicité ou de
              profilage (pas de Google Analytics, de pixel Meta ni
              d&apos;outil semblable). Il n&apos;utilise pas non plus de
              technologie permettant de vous localiser.
            </P>
            <P>
              Certains contenus sont toutefois chargés directement depuis des
              serveurs externes. Votre navigateur communique alors votre adresse
              IP à ces fournisseurs, comme pour toute page web&nbsp;:
            </P>
            <Bullets
              items={[
                "Les photos des propriétés sont chargées depuis les serveurs de Centris (mediaserver.centris.ca). Le service de sécurité utilisé par Centris peut déposer un témoin technique de courte durée (« __cf_bm ») servant à distinguer les humains des robots.",
                "Les capsules vidéo de la page d'accueil sont hébergées par Google (Firebase Storage).",
              ]}
            />
            <P>
              L&apos;espace privé du site, réservé à Josée-Ann pour gérer ses
              capsules vidéo, utilise un témoin de session. Il n&apos;est déposé
              qu&apos;après la saisie du code d&apos;accès et ne concerne pas
              les visiteurs.
            </P>
            <P>
              Vous pouvez bloquer ou supprimer les témoins dans les réglages de
              votre navigateur (Chrome, Safari, Firefox, Edge, etc.).
            </P>

            {/* 5 ------------------------------------------------------- */}
            <H2>5. À qui vos renseignements sont communiqués</H2>
            <P>
              Nous ne vendons pas vos renseignements personnels. Pour vous
              servir, nous les communiquons aux fournisseurs suivants, seulement
              dans la mesure nécessaire à leur rôle&nbsp;:
            </P>
            <Bullets
              items={[
                "Twilio SendGrid (États-Unis) : envoi des courriels générés par les formulaires (notification à Josée-Ann, transmission à l'outil de gestion de la clientèle et accusé de réception au visiteur).",
                "Microsoft (messagerie Outlook) : boîte courriel de Josée-Ann, qui reçoit une copie de chaque demande.",
                <>
                  Parseur : extraction automatique des renseignements contenus
                  dans les courriels de demande pour les verser dans
                  l&apos;outil de gestion de la clientèle.
                </>,
                <>
                  AVA : outil de gestion de la relation client (CRM) où sont
                  conservées vos coordonnées et l&apos;historique de vos
                  demandes.
                </>,
                "Centris (système Matrix) : création de votre recherche personnalisée et envoi des alertes propriété.",
                <>
                  Google (Firebase et Google Cloud) : hébergement du site, de
                  ses journaux techniques et des capsules vidéo.
                </>,
                "Via Capitale Saguenay–Lac-Saint-Jean, l'agence à laquelle Josée-Ann est rattachée, lorsque c'est nécessaire dans le cadre d'un mandat ou d'une transaction.",
              ]}
            />
            <P>
              Vos renseignements peuvent aussi être communiqués sans votre
              consentement lorsque la loi l&apos;exige ou le permet, par exemple
              à la demande d&apos;une autorité compétente.
            </P>

            {/* 6 ------------------------------------------------------- */}
            <H2>6. Renseignements conservés à l&apos;extérieur du Québec</H2>
            <P>
              Plusieurs des fournisseurs nommés ci-dessus, notamment Twilio
              SendGrid, Microsoft et Google, peuvent stocker ou traiter vos
              renseignements à l&apos;extérieur du Québec, entre autres aux
              États-Unis. Les lois de ces endroits peuvent permettre à des
              autorités locales d&apos;y accéder.
            </P>
            <P>
              Avant de communiquer vos renseignements à l&apos;extérieur du
              Québec, nous nous assurons qu&apos;ils bénéficient d&apos;une
              protection adéquate, conformément à la loi.
            </P>

            {/* 7 ------------------------------------------------------- */}
            <H2>7. Décision automatisée : le filtre anti-pourriel</H2>
            <P>
              Les messages envoyés par les formulaires passent par un filtre
              automatique qui écarte ceux qui présentent des signes de pourriel
              (liens, mots-clés publicitaires, envoi trop rapide, etc.). Un
              message écarté n&apos;est pas transmis à Josée-Ann. Si vous
              n&apos;avez pas reçu d&apos;accusé de réception ou de réponse,
              écrivez directement à {MAIL} : une personne examinera votre
              demande.
            </P>

            {/* 8 ------------------------------------------------------- */}
            <H2>8. Durée de conservation</H2>
            <P>
              Nous conservons vos renseignements seulement le temps nécessaire
              aux fins prévues, ou plus longtemps si une loi l&apos;exige
              (notamment les règles applicables aux courtiers immobiliers
              lorsqu&apos;un mandat est conclu). Ensuite, ils sont détruits de
              façon sécuritaire.
            </P>
            <Bullets
              items={[
                <>
                  Demandes de contact et de guide, sans suite : tant
                  qu&apos;elles sont utiles au suivi de votre projet, puis
                  elles sont détruites.
                </>,
                <>
                  Alertes propriété : jusqu&apos;à ce que vous demandiez
                  d&apos;arrêter les alertes; votre recherche est ensuite
                  supprimée.
                </>,
                <>
                  Dossiers liés à un mandat de courtage : selon les durées
                  prévues par la réglementation applicable aux courtiers
                  immobiliers.
                </>,
                <>
                  Journaux techniques de l&apos;hébergeur : pour une durée
                  limitée, puis supprimés automatiquement.
                </>,
              ]}
            />

            {/* 9 ------------------------------------------------------- */}
            <H2>9. Sécurité</H2>
            <P>
              Nous prenons des mesures raisonnables pour protéger vos
              renseignements contre la perte, le vol et tout accès non
              autorisé&nbsp;: les échanges avec le site sont chiffrés (HTTPS),
              les clés d&apos;accès aux services externes restent sur le serveur
              et ne sont jamais transmises à votre navigateur, et l&apos;accès
              aux renseignements est limité aux personnes qui en ont besoin pour
              vous servir.
            </P>

            {/* 10 ------------------------------------------------------ */}
            <H2>10. Vos droits</H2>
            <P>La loi québécoise vous donne notamment le droit&nbsp;:</P>
            <Bullets
              items={[
                "d'être informé des renseignements que nous détenons à votre sujet et d'y avoir accès;",
                "de faire corriger un renseignement inexact, incomplet ou équivoque;",
                "de retirer votre consentement à l'utilisation de vos renseignements;",
                "de demander, dans les cas prévus par la loi, que l'on cesse de diffuser un renseignement vous concernant ou que l'on désindexe un hyperlien;",
                "d'obtenir les renseignements informatisés que vous nous avez fournis dans un format technologique structuré et couramment utilisé (portabilité).",
              ]}
            />
            <P>
              Pour exercer un de ces droits, écrivez à {MAIL}. Nous pourrions
              vous demander de confirmer votre identité. Nous répondons par écrit
              dans un délai de 30 jours suivant la réception de la demande.
            </P>

            {/* 11 ------------------------------------------------------ */}
            <H2>11. Incident de confidentialité</H2>
            <P>
              Si un incident touchant vos renseignements survient (accès,
              utilisation ou communication non autorisés, perte), nous prenons
              des mesures pour en réduire les conséquences et nous
              l&apos;inscrivons dans notre registre des incidents. S&apos;il
              présente un risque de préjudice sérieux, nous en avisons
              rapidement les personnes concernées et la Commission d&apos;accès
              à l&apos;information.
            </P>

            {/* 12 ------------------------------------------------------ */}
            <H2>12. Nos pratiques internes</H2>
            <P>
              Cette section résume nos règles internes de protection des
              renseignements personnels&nbsp;:
            </P>
            <Bullets
              items={[
                "La responsable désignée à la section 1 veille à l'application de cette politique et répond aux demandes et aux plaintes.",
                "Seules les personnes qui en ont besoin pour vous servir ont accès à vos renseignements.",
                "Les renseignements sont détruits à la fin des durées de conservation indiquées à la section 8.",
                "Avant d'ajouter un nouvel outil ou un nouveau fournisseur qui traite des renseignements personnels, nous évaluons ses effets sur la vie privée.",
                "Une plainte est traitée par la responsable, qui y répond par écrit.",
              ]}
            />

            {/* 13 ------------------------------------------------------ */}
            <H2>13. Liens vers d&apos;autres sites</H2>
            <P>
              Le site contient des liens vers d&apos;autres sites (Facebook,
              Instagram, TikTok, Google, Centris). Ces sites ont leurs propres
              pratiques de confidentialité. Nous vous invitons à consulter leurs
              politiques.
            </P>

            {/* 14 ------------------------------------------------------ */}
            <H2>14. Modifications de la politique</H2>
            <P>
              Cette politique peut être mise à jour, notamment lorsque nous
              changeons de fournisseur ou ajoutons une fonction au site. La date
              de la dernière mise à jour est indiquée en haut de la page. En cas
              de changement important, un avis sera affiché sur le site.
            </P>

            {/* 15 ------------------------------------------------------ */}
            <H2>15. Nous joindre ou déposer une plainte</H2>
            <P>
              Pour toute question sur cette politique ou sur vos
              renseignements, écrivez à la responsable indiquée à la section
              1, au {MAIL}.
            </P>
            <P>
              Si vous n&apos;êtes pas satisfait de notre réponse, vous pouvez
              vous adresser à la Commission d&apos;accès à l&apos;information
              du Québec&nbsp;:{" "}
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
