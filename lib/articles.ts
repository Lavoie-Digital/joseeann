/**
 * Contenu des articles du coin conseils.
 *
 * Chaque article est composé de blocs typés (paragraphe, titre, sous-titre,
 * liste) rendus par la page /conseils/[slug]. Le texte est celui fourni par
 * Josée-Ann — à modifier ici pour mettre à jour un article.
 */

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] };

export interface Article {
  slug: string;
  tag: string;
  img: string;
  title: string;
  excerpt: string;
  blocks: ArticleBlock[];
}

export const ARTICLES: Article[] = [
  {
    slug: "valeur-dun-quartier",
    tag: "Art de vivre",
    img: "/images/lifestyle-coffee.jpg",
    title: "Habiter un quartier : ce qui fait vraiment la valeur d'un lieu",
    excerpt:
      "Au-delà des mètres carrés, ce sont les services, la lumière et le calme qui font le prix d'une adresse.",
    blocks: [
      { type: "p", text: "Lorsque vient le temps d'acheter une propriété, on pense souvent au nombre de chambres, au garage ou à la cuisine de rêve. Pourtant, une maison n'est qu'une partie de l'équation." },
      { type: "p", text: "Le quartier dans lequel elle se trouve influence votre qualité de vie… et la valeur de votre investissement." },

      { type: "h2", text: "Plus qu'une simple adresse" },
      { type: "p", text: "Un quartier, c'est l'environnement dans lequel vous vivrez au quotidien. C'est le trajet vers le travail, l'école des enfants, le parc où l'on passe les soirées d'été, le voisinage, les commerces à proximité et l'ambiance qui s'en dégage." },
      { type: "p", text: "Certaines caractéristiques ne figurent sur aucune fiche descriptive, mais elles font toute la différence une fois installé." },

      { type: "h2", text: "Les éléments qui influencent réellement la valeur d'un quartier" },
      { type: "h3", text: "Les services à proximité" },
      { type: "p", text: "Écoles, garderies, épiceries, pharmacies, centres sportifs, restaurants ou pistes cyclables : plus les services sont accessibles, plus le secteur est généralement recherché." },
      { type: "h3", text: "Les espaces verts" },
      { type: "p", text: "Les parcs, sentiers, boisés et accès à la nature améliorent la qualité de vie et contribuent souvent à maintenir une bonne valeur immobilière." },
      { type: "h3", text: "L'accessibilité" },
      { type: "p", text: "Un quartier bien connecté aux principaux axes routiers ou aux transports en commun facilite les déplacements quotidiens et attire davantage d'acheteurs." },
      { type: "h3", text: "L'évolution du secteur" },
      { type: "p", text: "Un quartier est vivant. L'arrivée de nouveaux commerces, des investissements municipaux ou des projets de développement peuvent avoir un impact positif sur sa valeur au fil des années." },
      { type: "h3", text: "L'ambiance" },
      { type: "p", text: "Chaque secteur possède sa propre personnalité. Certains sont calmes et familiaux, d'autres plus dynamiques ou urbains. Le meilleur quartier est celui qui correspond à votre mode de vie." },

      { type: "h2", text: "La valeur d'une propriété dépasse ses quatre murs" },
      { type: "p", text: "Deux maisons presque identiques peuvent avoir une valeur très différente simplement en raison de leur emplacement." },
      { type: "p", text: "C'est pourquoi il est important d'évaluer une propriété dans son ensemble : la maison, le terrain… mais aussi tout ce qui l'entoure." },

      { type: "h2", text: "Comment choisir le bon quartier?" },
      { type: "p", text: "Avant de prendre une décision, posez-vous quelques questions :" },
      { type: "ul", items: [
        "Quel est mon temps de déplacement idéal?",
        "Quels services sont essentiels pour moi?",
        "Est-ce que je recherche un secteur animé ou plus tranquille?",
        "Quels sont mes projets dans les prochaines années?",
        "Est-ce un quartier où je me vois encore dans cinq ou dix ans?",
      ] },
      { type: "p", text: "Ces réponses vous aideront souvent davantage que le nombre de pieds carrés de la propriété." },

      { type: "h2", text: "Mon rôle comme courtier" },
      { type: "p", text: "Mon travail ne consiste pas seulement à vous faire visiter des maisons." },
      { type: "p", text: "Je vous aide à comprendre les réalités de chaque secteur, les tendances du marché, le potentiel de revente et les éléments qui pourraient influencer votre décision à long terme." },
      { type: "p", text: "Parce qu'au-delà de la propriété, c'est votre qualité de vie et votre investissement qui comptent." },

      { type: "h2", text: "En conclusion" },
      { type: "p", text: "Une maison peut se transformer au fil des rénovations. Un quartier, lui, façonnera votre quotidien pendant des années." },
      { type: "p", text: "Prendre le temps de choisir le bon environnement est souvent l'une des meilleures décisions que l'on puisse faire en immobilier." },
      { type: "p", text: "Si vous souhaitez discuter des différents secteurs de la région et trouver celui qui correspond réellement à votre style de vie, je serai heureuse de vous accompagner." },
    ],
  },
  {
    slug: "gestes-valeur-percue-avant-vente",
    tag: "Conseils vendeur",
    img: "/images/kitchen-1.jpg",
    title: "Cinq gestes qui augmentent la valeur perçue avant une vente",
    excerpt:
      "Des interventions simples et peu coûteuses qui transforment l'impression au premier regard.",
    blocks: [
      { type: "p", text: "Lorsqu'on prépare la vente de sa propriété, on pense souvent aux grandes rénovations. Pourtant, ce sont souvent les petits détails qui créent le plus grand impact lors des visites." },
      { type: "p", text: "L'objectif n'est pas de transformer votre maison, mais de permettre aux acheteurs de s'y projeter dès les premières secondes." },
      { type: "p", text: "Voici cinq gestes simples qui peuvent réellement augmenter la valeur perçue de votre propriété." },

      { type: "h3", text: "1. Désencombrer les espaces" },
      { type: "p", text: "Une pièce bien dégagée paraît automatiquement plus grande et plus lumineuse." },
      { type: "p", text: "Avant les visites, retirez les meubles superflus, les objets décoratifs en trop grand nombre et tout ce qui encombre les surfaces. Les acheteurs doivent pouvoir imaginer leurs propres meubles et leur propre quotidien." },
      { type: "p", text: "Moins il y a de distractions, plus votre propriété met ses atouts en valeur." },

      { type: "h3", text: "2. Rafraîchir les murs" },
      { type: "p", text: "Un mur éraflé ou une couleur très personnalisée peut détourner l'attention." },
      { type: "p", text: "Un simple coup de peinture dans des teintes neutres peut transformer l'ambiance d'une pièce et donner une impression d'entretien soigné, sans nécessiter un gros investissement." },

      { type: "h3", text: "3. Soigner la première impression" },
      { type: "p", text: "Les premières secondes comptent énormément." },
      { type: "p", text: "L'entrée, la façade, le perron et l'aménagement paysager donnent le ton avant même que les visiteurs franchissent la porte." },
      { type: "p", text: "Quelques fleurs, une pelouse entretenue, une porte propre et un extérieur accueillant peuvent faire toute la différence." },

      { type: "h3", text: "4. Corriger les petits défauts" },
      { type: "p", text: "Une poignée qui bouge, une porte qui grince, un robinet qui fuit ou une ampoule brûlée peuvent sembler anodins." },
      { type: "p", text: "Pour un acheteur, ces petits détails peuvent toutefois laisser croire que l'entretien général de la propriété a été négligé." },
      { type: "p", text: "Prendre quelques heures pour effectuer ces réparations démontre que la maison a été bien entretenue." },

      { type: "h3", text: "5. Miser sur la lumière et la propreté" },
      { type: "p", text: "Une propriété lumineuse paraît plus chaleureuse et plus accueillante." },
      { type: "p", text: "Avant chaque visite :" },
      { type: "ul", items: [
        "Ouvrez les rideaux.",
        "Nettoyez les fenêtres.",
        "Allumez les lumières, même en journée lorsque nécessaire.",
        "Effectuez un ménage complet, sans oublier les planchers, les salles de bain et la cuisine.",
      ] },
      { type: "p", text: "Une maison impeccable inspire confiance et permet aux acheteurs de se concentrer sur ses qualités plutôt que sur les tâches à prévoir." },

      { type: "h2", text: "Faut-il rénover avant de vendre?" },
      { type: "p", text: "Pas nécessairement." },
      { type: "p", text: "Toutes les rénovations ne génèrent pas un bon retour sur investissement. Dans certains cas, quelques ajustements ciblés auront beaucoup plus d'impact qu'un projet majeur coûteux." },
      { type: "p", text: "Chaque propriété est différente. Avant d'investir plusieurs milliers de dollars, il est préférable d'évaluer ce qui apportera réellement une valeur ajoutée aux yeux des acheteurs." },

      { type: "h2", text: "Mon accompagnement" },
      { type: "p", text: "Avant la mise en marché, je prends le temps d'évaluer votre propriété avec vous." },
      { type: "p", text: "Je vous indique les améliorations qui valent réellement la peine, celles qui peuvent attendre et les éléments qui auront le plus d'impact sur la perception des acheteurs. L'objectif est simple : présenter votre propriété sous son meilleur jour, sans dépenses inutiles." },

      { type: "h2", text: "En conclusion" },
      { type: "p", text: "Vendre rapidement et au meilleur prix ne dépend pas uniquement du marché. La préparation joue un rôle important." },
      { type: "p", text: "Quelques gestes bien ciblés peuvent faire toute la différence entre une propriété qui suscite un intérêt immédiat et une autre qui reste plus longtemps sur le marché." },
      { type: "p", text: "En immobilier, la première impression est souvent celle qui compte le plus." },
    ],
  },
  {
    slug: "investir-commercial-rendement",
    tag: "Marché",
    img: "/images/lifestyle-neighborhood.jpg",
    title: "Investir dans le commercial : lire un rendement sans se tromper",
    excerpt:
      "Taux de capitalisation, baux et emplacement : les repères essentiels d'un bon placement.",
    blocks: [
      { type: "p", text: "Lorsqu'on regarde une propriété commerciale ou à revenus, le premier chiffre qui attire l'attention est souvent le rendement annoncé." },
      { type: "p", text: "« 8 % de rendement. »" },
      { type: "p", text: "« Revenus annuels de 75 000 $. »" },
      { type: "p", text: "Ces chiffres peuvent sembler très intéressants… mais ils ne racontent jamais toute l'histoire." },
      { type: "p", text: "Avant de prendre une décision, il est essentiel de comprendre ce qui se cache réellement derrière les calculs." },

      { type: "h2", text: "Le rendement ne dit pas tout" },
      { type: "p", text: "Deux immeubles peuvent afficher exactement le même rendement, tout en présentant des niveaux de risque complètement différents." },
      { type: "p", text: "Pourquoi?" },
      { type: "p", text: "Parce que le rendement est influencé par plusieurs facteurs : les dépenses, l'état du bâtiment, la qualité des locataires, les baux en place et le potentiel futur de l'immeuble." },
      { type: "p", text: "Un pourcentage élevé n'est pas automatiquement synonyme de bon investissement." },

      { type: "h2", text: "Regardez les revenus… mais surtout les dépenses" },
      { type: "p", text: "Les revenus locatifs constituent une partie de l'équation." },
      { type: "p", text: "Les dépenses d'exploitation peuvent toutefois faire varier considérablement la rentabilité réelle :" },
      { type: "ul", items: [
        "Taxes municipales et scolaires",
        "Assurances",
        "Entretien et réparations",
        "Déneigement et entretien paysager",
        "Électricité et chauffage (selon les baux)",
        "Frais de gestion",
        "Vacance locative",
        "Réserve pour les imprévus",
      ] },
      { type: "p", text: "Un immeuble qui semble très rentable peut rapidement perdre de son attrait lorsque toutes ces dépenses sont prises en compte." },

      { type: "h2", text: "Les baux ont une grande importance" },
      { type: "p", text: "En immobilier commercial, un bail vaut souvent autant que l'immeuble lui-même." },
      { type: "p", text: "Il est important d'analyser notamment :" },
      { type: "ul", items: [
        "La durée restante des baux.",
        "Les options de renouvellement.",
        "Les augmentations prévues.",
        "Les responsabilités du locataire et du propriétaire.",
        "La solidité financière des entreprises locataires.",
      ] },
      { type: "p", text: "Un immeuble occupé par des locataires stables représente généralement un risque moins élevé qu'un immeuble dont plusieurs locaux arrivent à échéance au même moment." },

      { type: "h2", text: "Le potentiel de croissance" },
      { type: "p", text: "Un bon investissement ne repose pas uniquement sur sa rentabilité actuelle." },
      { type: "p", text: "Posez-vous également les bonnes questions :" },
      { type: "ul", items: [
        "Les loyers sont-ils au prix du marché?",
        "Existe-t-il un potentiel d'optimisation?",
        "Des locaux peuvent-ils être reconfigurés?",
        "Le secteur est-il en développement?",
        "La demande est-elle forte pour ce type d'espace?",
      ] },
      { type: "p", text: "Parfois, un immeuble affichant un rendement légèrement inférieur aujourd'hui peut offrir un meilleur potentiel de croissance à long terme." },

      { type: "h2", text: "Attention aux chiffres trop beaux" },
      { type: "p", text: "Un rendement particulièrement élevé mérite toujours une analyse plus approfondie." },
      { type: "p", text: "Il peut s'expliquer par :" },
      { type: "ul", items: [
        "des travaux majeurs à prévoir;",
        "un taux de vacance important;",
        "des revenus temporaires;",
        "des baux qui arrivent bientôt à échéance;",
        "une localisation moins recherchée;",
        "ou un prix demandé qui ne reflète pas la réalité du marché.",
      ] },
      { type: "p", text: "L'objectif n'est pas de trouver le rendement le plus élevé, mais le meilleur équilibre entre rentabilité, stabilité et risque." },

      { type: "h2", text: "L'importance d'une analyse complète" },
      { type: "p", text: "Avant de faire une offre, plusieurs documents devraient être examinés avec attention :" },
      { type: "ul", items: [
        "Les états financiers.",
        "Les baux commerciaux.",
        "Les comptes de taxes.",
        "Les contrats d'entretien.",
        "L'historique des revenus et des dépenses.",
        "Les travaux réalisés et ceux à prévoir.",
      ] },
      { type: "p", text: "Une bonne analyse permet d'éviter bien des surprises après l'acquisition." },

      { type: "h2", text: "Mon rôle dans votre projet d'investissement" },
      { type: "p", text: "L'achat d'un immeuble commercial demande une approche différente de l'immobilier résidentiel." },
      { type: "p", text: "Je vous accompagne dans l'analyse de la propriété, l'interprétation des chiffres, l'évaluation des risques et des opportunités, afin que votre décision repose sur des données concrètes et non seulement sur un rendement affiché." },

      { type: "h2", text: "En conclusion" },
      { type: "p", text: "En immobilier commercial, le meilleur investissement n'est pas toujours celui qui affiche le pourcentage le plus élevé." },
      { type: "p", text: "Un immeuble rentable est avant tout un immeuble dont les revenus sont durables, les dépenses bien maîtrisées et le potentiel de croissance réel." },
      { type: "p", text: "Prendre le temps d'analyser l'ensemble du dossier permet de bâtir un investissement solide, performant et durable." },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Estimation du temps de lecture (≈ 200 mots / minute). */
export function readingMinutes(article: Article): number {
  const words = article.blocks.reduce((n, b) => {
    if (b.type === "ul") return n + b.items.join(" ").split(/\s+/).length;
    return n + b.text.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}
