/**
 * Check-lists téléchargeables du coin conseils.
 *
 * Chaque check-list est composée de blocs typés rendus par la page
 * /conseils/checklists/[slug], pensée pour l'écran ET l'impression (PDF).
 * Le texte est celui fourni par Josée-Ann — à modifier ici pour mettre à jour.
 */

export type ChecklistBlock =
  | { type: "group"; title: string; items: string[] }
  | { type: "fields"; title: string; items: string[] }
  | { type: "notes"; title?: string }
  | { type: "ratings"; title: string; items: string[] }
  | { type: "p"; text: string }
  | { type: "advice"; title: string; paragraphs: string[] };

export interface Checklist {
  slug: string;
  audience: string;
  icon: "home" | "truck" | "file" | "key" | "search";
  title: string;
  intro: string;
  blocks: ChecklistBlock[];
}

export const CHECKLISTS: Checklist[] = [
  {
    slug: "preparer-maison-avant-vente",
    audience: "Vendeur",
    icon: "home",
    title: "Préparer votre maison avant la mise en vente",
    intro:
      "Une propriété bien préparée attire davantage d'acheteurs, se démarque plus facilement et peut même favoriser une vente plus rapide. Avant les photos et les visites, prenez quelques minutes pour parcourir cette liste.",
    blocks: [
      { type: "group", title: "Extérieur", items: [
        "Tondre la pelouse et entretenir le terrain.",
        "Désherber les plates-bandes.",
        "Tailler les haies et arbustes.",
        "Nettoyer le balcon, le patio et les marches.",
        "Ranger les outils, jouets et équipements saisonniers.",
        "Nettoyer la porte d'entrée et les fenêtres extérieures.",
        "Vérifier l'éclairage extérieur.",
        "S'assurer que les poubelles et bacs sont discrets.",
      ] },
      { type: "group", title: "Entrée", items: [
        "Désencombrer complètement l'entrée.",
        "Ranger manteaux et chaussures.",
        "Nettoyer les vitres et le miroir.",
        "Ajouter un tapis propre et accueillant.",
      ] },
      { type: "group", title: "Cuisine", items: [
        "Libérer les comptoirs au maximum.",
        "Nettoyer les électroménagers.",
        "Vider l'évier.",
        "Organiser le garde-manger et les armoires visibles.",
        "Éliminer les odeurs de cuisson.",
      ] },
      { type: "group", title: "Salle de bain", items: [
        "Nettoyer en profondeur.",
        "Remplacer les serviettes par des serviettes propres et neutres.",
        "Retirer les produits personnels.",
        "Nettoyer les miroirs et la robinetterie.",
        "Vérifier les joints de silicone.",
      ] },
      { type: "group", title: "Chambres", items: [
        "Faire les lits avec une literie propre.",
        "Ranger vêtements et effets personnels.",
        "Désencombrer les tables de chevet.",
        "Ouvrir les rideaux pour maximiser la lumière.",
      ] },
      { type: "group", title: "Salon et pièces de vie", items: [
        "Désencombrer les meubles.",
        "Retirer les objets très personnels.",
        "Nettoyer les planchers.",
        "Mettre quelques coussins et accessoires sobres.",
        "Vérifier que toutes les ampoules fonctionnent.",
      ] },
      { type: "group", title: "Rangement", items: [
        "Organiser les garde-robes.",
        "Ranger le sous-sol, le garage et les espaces de rangement.",
        "Éviter les boîtes empilées inutilement.",
      ] },
      { type: "group", title: "Entretien", items: [
        "Changer les ampoules brûlées.",
        "Réparer les petites imperfections (poignées, portes, robinets, etc.).",
        "Effectuer les retouches de peinture nécessaires.",
        "Vérifier le bon fonctionnement des portes et fenêtres.",
      ] },
      { type: "group", title: "Avant les photos", items: [
        "Ouvrir tous les rideaux et stores.",
        "Allumer les lumières au besoin.",
        "Retirer les tapis ou objets qui encombrent les pièces.",
        "Cacher les bols d'animaux, litières et cages.",
        "Déplacer les véhicules de l'entrée si possible.",
      ] },
      { type: "group", title: "Avant chaque visite", items: [
        "Faire un ménage complet.",
        "Passer l'aspirateur et laver les planchers.",
        "Aérer la maison quelques minutes.",
        "Maintenir une température confortable.",
        "Fermer la télévision et réduire le bruit.",
        "Quitter la propriété pendant la visite, si possible.",
      ] },
      { type: "advice", title: "Un dernier conseil", paragraphs: [
        "Vous n'avez pas besoin d'investir des milliers de dollars avant de vendre. Une maison propre, bien entretenue, lumineuse et accueillante inspire confiance dès les premières minutes. Les petits détails font souvent toute la différence.",
        "Si vous souhaitez savoir quels éléments méritent réellement d'être améliorés avant la mise en marché, je peux vous conseiller selon votre propriété et vous aider à concentrer vos efforts là où ils auront le plus d'impact.",
      ] },
    ],
  },
  {
    slug: "demenagement-etape-par-etape",
    audience: "Déménagement",
    icon: "truck",
    title: "Votre déménagement, étape par étape",
    intro:
      "Un déménagement comporte de nombreuses tâches à ne pas oublier. Cette liste vous aidera à rester organisé et à vivre cette étape plus sereinement.",
    blocks: [
      { type: "group", title: "6 à 8 semaines avant", items: [
        "Choisir une entreprise de déménagement ou réserver un camion.",
        "Demander des soumissions.",
        "Faire le tri dans vos biens.",
        "Donner, vendre ou recycler ce dont vous n'avez plus besoin.",
        "Commencer à rassembler des boîtes et du matériel d'emballage.",
        "Prévoir les journées de congé nécessaires.",
      ] },
      { type: "group", title: "4 semaines avant", items: [
        "Commencer à emballer les objets peu utilisés.",
        "Identifier clairement chaque boîte.",
        "Prévoir une boîte « essentiels » pour les premiers jours.",
        "Aviser votre employeur si nécessaire.",
        "Confirmer la date du déménagement.",
      ] },
      { type: "group", title: "Changement d'adresse", items: [
        "Poste Canada.",
        "Banque et cartes de crédit.",
        "Assurance habitation et automobile.",
        "Permis de conduire et immatriculation (SAAQ).",
        "RAMQ.",
        "Agence du revenu du Canada.",
        "Revenu Québec.",
        "Employeur.",
        "Écoles ou garderie.",
        "Médecin, dentiste et autres professionnels.",
        "Abonnements et plateformes de livraison.",
        "Magasins et comptes en ligne.",
      ] },
      { type: "group", title: "Services à transférer", items: [
        "Électricité (Hydro-Québec).",
        "Internet.",
        "Télévision.",
        "Téléphone.",
        "Système d'alarme.",
        "Gaz naturel ou propane, s'il y a lieu.",
      ] },
      { type: "group", title: "Une semaine avant", items: [
        "Confirmer l'heure avec les déménageurs.",
        "Prévoir les repas des derniers jours.",
        "Débrancher les électroménagers au besoin.",
        "Préparer les documents importants dans un sac à part.",
        "Prévoir une trousse de premiers soins.",
      ] },
      { type: "group", title: "La veille", items: [
        "Terminer l'emballage.",
        "Charger les appareils électroniques.",
        "Préparer vêtements et articles de toilette pour 24 à 48 heures.",
        "Dégivrer le congélateur, si nécessaire.",
        "Vérifier que toutes les boîtes sont identifiées.",
      ] },
      { type: "group", title: "Le jour du déménagement", items: [
        "Faire un dernier tour complet de la propriété.",
        "Vérifier les armoires, tiroirs et garde-robes.",
        "Relever les compteurs au besoin.",
        "Remettre toutes les clés, télécommandes et ouvre-portes.",
        "Vérifier que portes et fenêtres sont verrouillées avant de quitter.",
      ] },
      { type: "group", title: "À l'arrivée", items: [
        "Vérifier que tous les meubles et boîtes sont présents.",
        "Brancher le réfrigérateur selon les recommandations du fabricant.",
        "Installer les détecteurs de fumée au besoin.",
        "Déballer les essentiels en priorité.",
        "Vérifier le fonctionnement du chauffage, de la climatisation et des principaux appareils.",
      ] },
      { type: "group", title: "Après le déménagement", items: [
        "Mettre à jour votre adresse partout où c'est nécessaire.",
        "Rencontrer vos voisins.",
        "Repérer les commerces et services à proximité.",
        "Recycler les boîtes.",
        "Prendre le temps de profiter de votre nouveau chez-vous!",
      ] },
      { type: "advice", title: "Petit rappel", paragraphs: [
        "Un déménagement est beaucoup plus agréable lorsqu'il est bien planifié. En préparant les étapes à l'avance et en procédant une à la fois, vous réduirez le stress et pourrez profiter pleinement de ce nouveau départ.",
      ] },
    ],
  },
  {
    slug: "documents-pour-vendre",
    audience: "Vendeur",
    icon: "file",
    title: "Les documents à préparer pour vendre votre propriété",
    intro:
      "Préparer les bons documents dès le début permet d'accélérer la mise en marché, de répondre rapidement aux questions des acheteurs et d'éviter les délais inutiles. Utilisez cette liste pour vous assurer de ne rien oublier.",
    blocks: [
      { type: "group", title: "Documents essentiels", items: [
        "Acte de vente (titre de propriété).",
        "Certificat de localisation le plus récent.",
        "Compte de taxes municipales.",
        "Compte de taxes scolaires.",
        "Facture ou contrat d'achat des équipements inclus (au besoin).",
        "Factures de services (Hydro-Québec, gaz, etc.) si pertinentes.",
      ] },
      { type: "group", title: "Travaux et rénovations", items: [
        "Factures des rénovations importantes.",
        "Garanties toujours en vigueur.",
        "Permis municipaux obtenus pour certains travaux.",
        "Rapports d'inspection ou d'expertise, si disponibles.",
      ] },
      { type: "group", title: "Informations sur la propriété", items: [
        "Liste des inclusions et exclusions souhaitées.",
        "Âge approximatif des principaux éléments (toiture, fenêtres, chauffage, thermopompe, chauffe-eau, etc.).",
        "Informations sur les servitudes, droits de passage ou ententes particulières.",
      ] },
      { type: "group", title: "Si la propriété est louée", items: [
        "Copie du ou des baux.",
        "Historique des loyers.",
        "Règlements d'immeubles, s'il y a lieu.",
        "Avis transmis aux locataires, si applicable.",
      ] },
      { type: "group", title: "Si la propriété est en copropriété", items: [
        "Déclaration de copropriété.",
        "Procès-verbaux des assemblées récentes.",
        "États financiers du syndicat.",
        "Budget annuel.",
        "Certificat d'assurance du syndicat.",
        "Carnet d'entretien et étude du fonds de prévoyance, si disponibles.",
      ] },
      { type: "group", title: "Bon à savoir", items: [
        "Vérifier si le certificat de localisation est toujours à jour (10 ans et moins & sans aucun changement).",
        "Prévoir les documents manquants rapidement.",
        "Conserver toutes les factures liées aux améliorations apportées à la propriété.",
      ] },
      { type: "advice", title: "Mon conseil", paragraphs: [
        "Ne vous inquiétez pas si vous n'avez pas tous ces documents en main dès le départ.",
        "Lors de notre première rencontre, je vous accompagne pour vérifier ce qui est nécessaire selon votre propriété et je vous aide à obtenir les documents manquants, afin que votre dossier soit complet avant la mise en marché.",
        "Une bonne préparation permet de vendre plus efficacement… et avec beaucoup moins de stress.",
      ] },
    ],
  },
  {
    slug: "acheter-une-propriete",
    audience: "Acheteur",
    icon: "key",
    title: "Acheter une propriété",
    intro:
      "L'achat d'une propriété est une étape importante. Cette liste vous aidera à préparer votre projet, à prendre des décisions éclairées et à ne rien oublier tout au long du processus.",
    blocks: [
      { type: "group", title: "Avant de commencer", items: [
        "Déterminer votre budget d'achat.",
        "Obtenir une préautorisation hypothécaire.",
        "Prévoir votre mise de fonds.",
        "Évaluer les frais de clôture (notaire, inspection, taxe de bienvenue, etc.).",
        "Définir vos besoins essentiels.",
        "Identifier vos critères souhaités.",
      ] },
      { type: "group", title: "Choisir le bon secteur", items: [
        "Temps de déplacement acceptable.",
        "Proximité du travail.",
        "Écoles ou garderies.",
        "Commerces et services.",
        "Parcs et espaces verts.",
        "Ambiance du quartier.",
        "Potentiel de revente.",
      ] },
      { type: "group", title: "Pendant les visites", items: [
        "Vérifier l'état général de la propriété.",
        "Observer la luminosité naturelle.",
        "Vérifier le rangement disponible.",
        "Examiner les fenêtres et les portes.",
        "Observer les signes d'humidité ou d'infiltration.",
        "Poser des questions sur les rénovations effectuées.",
        "Vérifier le fonctionnement des principaux systèmes (chauffage, climatisation, etc.).",
        "Évaluer le terrain et les espaces extérieurs.",
      ] },
      { type: "group", title: "Avant de faire une offre", items: [
        "Vérifier les inclusions et exclusions.",
        "Évaluer les coûts de rénovations éventuels.",
        "Vérifier les délais souhaités.",
        "Prévoir les conditions nécessaires (inspection, financement, etc.).",
      ] },
      { type: "group", title: "Après l'acceptation de la promesse d'achat", items: [
        "Planifier l'inspection, s'il y a lieu.",
        "Finaliser votre financement et autres conditions.",
        "Choisir votre notaire.",
        "Souscrire une assurance habitation.",
        "Prévoir le déménagement.",
        "Effectuer les changements d'adresse.",
      ] },
      { type: "group", title: "Les frais à prévoir", items: [
        "Inspection préachat.",
        "Frais de notaire.",
        "Taxe de mutation (« taxe de bienvenue »).",
        "Assurance habitation.",
        "Frais de déménagement.",
        "Branchement des services (Internet, électricité, etc.).",
        "Fonds d'urgence pour les premières dépenses.",
      ] },
      { type: "group", title: "Le jour de la prise de possession", items: [
        "Faire un tour de la propriété.",
        "Vérifier que les inclusions sont présentes.",
        "Tester les principaux équipements.",
        "Recevoir toutes les clés, télécommandes et codes d'accès.",
      ] },
      { type: "group", title: "Après votre arrivée", items: [
        "Changer les serrures, si souhaité.",
        "Installer vos détecteurs de fumée ou vérifier leur fonctionnement.",
        "Repérer les entrées d'eau et le panneau électrique.",
        "Localiser les services essentiels du quartier.",
        "Profiter de votre nouveau chez-vous!",
      ] },
      { type: "advice", title: "Mon conseil", paragraphs: [
        "Acheter une propriété, ce n'est pas seulement choisir une maison : c'est prendre une décision qui aura un impact pendant plusieurs années.",
        "En étant bien accompagné et bien préparé, vous pourrez avancer avec confiance, éviter les mauvaises surprises et choisir une propriété qui correspond réellement à vos besoins… aujourd'hui comme demain.",
      ] },
    ],
  },
  {
    slug: "visite-dune-propriete",
    audience: "Acheteur",
    icon: "search",
    title: "Check-list de visite d'une propriété",
    intro:
      "Visiter plusieurs maisons en peu de temps peut rapidement devenir mélangeant. Utilisez cette grille pour prendre des notes et comparer les propriétés plus facilement.",
    blocks: [
      { type: "fields", title: "Informations générales", items: [
        "Adresse",
        "Date de la visite",
        "Prix demandé",
        "Quartier",
        "Impression générale (sur 10)",
      ] },
      { type: "group", title: "L'extérieur", items: [
        "La façade est bien entretenue.",
        "Le revêtement semble en bon état.",
        "La toiture paraît en bon état.",
        "Les fenêtres semblent bien entretenues.",
        "Le terrain répond à vos besoins.",
        "L'entrée est pratique.",
        "Le stationnement est suffisant.",
        "Le voisinage vous plaît.",
      ] },
      { type: "notes" },
      { type: "group", title: "L'intérieur", items: [
        "Bonne luminosité.",
        "Les pièces sont bien disposées.",
        "Les plafonds et murs semblent en bon état.",
        "Les planchers sont en bon état.",
        "Les portes et fenêtres fonctionnent bien.",
        "Les espaces de rangement sont suffisants.",
      ] },
      { type: "notes" },
      { type: "group", title: "Cuisine", items: [
        "Fonctionnelle.",
        "Rangement convenable.",
        "Comptoirs en bon état.",
        "Électroménagers inclus (au besoin).",
        "L'espace répond à vos besoins.",
      ] },
      { type: "notes" },
      { type: "group", title: "Salle de bain", items: [
        "Propre et bien entretenue.",
        "Bonne ventilation.",
        "Signes d'humidité (oui / non).",
      ] },
      { type: "notes" },
      { type: "group", title: "Chambres", items: [
        "Nombre suffisant.",
        "Grandeur adéquate.",
        "Bon rangement.",
        "Bonne luminosité.",
      ] },
      { type: "notes" },
      { type: "group", title: "Aspects techniques", items: [
        "Chauffage adéquat.",
        "Thermopompe.",
        "Électricité satisfaisante.",
        "Isolation satisfaisante.",
        "Signes d'infiltration observés.",
        "Odeurs inhabituelles.",
        "Travaux à prévoir.",
      ] },
      { type: "notes" },
      { type: "group", title: "Le quartier", items: [
        "Temps de déplacement convenable.",
        "Écoles ou garderies à proximité.",
        "Commerces accessibles.",
        "Secteur calme.",
        "Parcs ou espaces verts.",
        "Le quartier correspond à votre style de vie.",
      ] },
      { type: "p", text: "Après la visite, cette propriété est un…" },
      { type: "group", title: "Verdict", items: [
        "Coup de cœur ❤️",
        "À revoir.",
        "À comparer.",
        "Ne convient pas.",
      ] },
      { type: "notes", title: "Mes questions" },
      { type: "ratings", title: "Mon appréciation", items: [
        "Prix demandé",
        "État général",
        "Emplacement",
        "Potentiel",
      ] },
      { type: "group", title: "Je pourrais me voir vivre ici", items: [
        "Oui",
        "Peut-être",
        "Non",
      ] },
    ],
  },
  {
    slug: "demenagement-acheteur",
    audience: "Acheteur",
    icon: "truck",
    title: "Check-list de déménagement — version acheteur",
    intro:
      "Félicitations! Votre offre a été acceptée. Voici une liste pour vous aider à préparer votre déménagement et à profiter pleinement de votre nouvelle propriété.",
    blocks: [
      { type: "group", title: "Dès l'acceptation de votre promesse d'achat", items: [
        "Planifier votre inspection (si applicable).",
        "Finaliser votre financement hypothécaire et autres conditions.",
        "Fournir les documents demandés par votre prêteur.",
        "Choisir votre notaire.",
        "Confirmer la date de signature et la prise de possession.",
        "Souscrire une assurance habitation (effective le jour de la prise de possession).",
      ] },
      { type: "group", title: "4 à 6 semaines avant le déménagement", items: [
        "Réserver vos déménageurs ou un camion.",
        "Commencer le tri de vos biens.",
        "Donner, vendre ou recycler ce dont vous n'avez plus besoin.",
        "Acheter boîtes, ruban adhésif et matériel d'emballage.",
        "Commencer à emballer les objets peu utilisés.",
      ] },
      { type: "group", title: "Aviser les fournisseurs de votre changement d'adresse", items: [
        "Poste Canada.",
        "Banque et cartes de crédit.",
        "Employeur.",
        "Assurance automobile et habitation.",
        "RAMQ.",
        "SAAQ (permis et immatriculation).",
        "Agence du revenu du Canada.",
        "Revenu Québec.",
        "Écoles ou garderie.",
        "Médecin, dentiste et autres professionnels.",
        "Abonnements et achats en ligne.",
      ] },
      { type: "group", title: "Planifier les services", items: [
        "Ouvrir votre compte Hydro-Québec.",
        "Transférer Internet, télévision et téléphone.",
        "Planifier l'installation du système d'alarme, si nécessaire.",
        "Prévoir le transfert du gaz naturel ou du propane, s'il y a lieu.",
      ] },
      { type: "group", title: "Une semaine avant", items: [
        "Confirmer l'heure avec les déménageurs.",
        "Préparer une boîte « essentiels » (vêtements, articles de toilette, médicaments, chargeurs, café, etc.).",
        "Prévoir nourriture et collations pour la journée du déménagement.",
        "Débrancher les appareils qui seront transportés.",
      ] },
      { type: "group", title: "Le jour de la signature chez le notaire", items: [
        "Apporter une pièce d'identité valide.",
        "Prévoir le montant requis, selon les instructions du notaire.",
        "Poser toutes vos questions avant la signature.",
        "Récupérer vos clés et les informations importantes concernant la propriété.",
      ] },
      { type: "group", title: "Le jour du déménagement", items: [
        "Vérifier que tous vos biens sont chargés.",
        "Faire un dernier tour de votre ancienne résidence.",
        "Vérifier que les portes et fenêtres sont verrouillées avant de quitter.",
        "À votre arrivée, confirmer que toutes les inclusions sont présentes.",
        "Vérifier le fonctionnement des principaux équipements.",
      ] },
      { type: "group", title: "Les premiers jours", items: [
        "Changer les serrures, si souhaité.",
        "Vérifier les détecteurs de fumée et de monoxyde de carbone.",
        "Repérer l'entrée d'eau principale et le panneau électrique.",
        "Localiser les valves d'arrêt et le chauffe-eau.",
        "Déballer les pièces essentielles en priorité.",
      ] },
      { type: "group", title: "Les premières semaines", items: [
        "Mettre à jour votre adresse auprès des organismes oubliés.",
        "Rencontrer vos voisins.",
        "Repérer les commerces et services à proximité.",
        "Établir votre calendrier d'entretien de la propriété (filtres, gouttières, entretien saisonnier, etc.).",
        "Profiter pleinement de votre nouveau chez-vous!",
      ] },
      { type: "advice", title: "Mon petit conseil", paragraphs: [
        "Les premiers jours dans une nouvelle maison passent souvent très vite. Préparez une boîte facilement accessible contenant les essentiels : papier hygiénique, savon, serviettes, draps, médicaments, chargeurs, outils de base, collations, bouteilles d'eau et cafetière. Vous serez heureux de l'avoir sous la main avant de commencer à déballer toutes les autres boîtes.",
        "Bon déménagement… et bienvenue dans votre nouveau chez-vous!",
      ] },
    ],
  },
];

export function getChecklist(slug: string): Checklist | undefined {
  return CHECKLISTS.find((c) => c.slug === slug);
}
