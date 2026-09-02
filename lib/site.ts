/**
 * Contenu editorial du site public.
 *
 * Centralise ici pour qu'une mise a jour de texte ne demande pas de toucher aux
 * composants. Les donnees de la Bridgeline Room, elles, viennent de la base
 * (Prisma) et ne figurent jamais dans ce fichier.
 *
 * A COMPLETER AVANT MISE EN PRODUCTION (voir README, section "Contenu a fournir") :
 * adresses postales exactes, numeros de telephone, biographies validees par
 * chaque associe, photographies de l'equipe et des bureaux.
 */

export const site = {
  name: 'Bridgeline Partners',
  domain: 'bridgelinepartners.com',
  tagline: 'Marches prives, investisseurs professionnels.',
  description:
    'Bridgeline Partners structure et distribue des opportunites de marches prives a des investisseurs professionnels, depuis Luxembourg et Geneve.',
} as const;

/**
 * Navigation principale. L'acces a la Room est traite a part, en bouton :
 * un libelle par intention, repris a l'identique dans l'entete, la page
 * d'accueil et le pied de page.
 */
export const navigation = [
  { href: '/about', label: 'A propos' },
  { href: '/team', label: 'Equipe' },
  { href: '/contact', label: 'Nous contacter' },
] as const;

export type Office = {
  city: string;
  country: string;
  /** Adresse postale complete. A renseigner par l'equipe. */
  address: string | null;
  /** Numero de telephone du bureau. A renseigner par l'equipe. */
  phone: string | null;
  email: string;
  role: string;
};

export const offices: Office[] = [
  {
    city: 'Luxembourg',
    country: 'Grand-Duche de Luxembourg',
    address: null,
    phone: null,
    email: 'luxembourg@bridgelinepartners.com',
    role: 'Structuration des vehicules et administration des fonds.',
  },
  {
    city: 'Geneve',
    country: 'Suisse',
    address: null,
    phone: null,
    email: 'geneve@bridgelinepartners.com',
    role: 'Relation investisseurs et origination des operations.',
  },
];

export type TeamMember = {
  name: string;
  role: string;
  office: string;
  /**
   * Biographie courte. Volontairement descriptive du role exerce chez
   * Bridgeline Partners : les parcours anterieurs doivent etre fournis et
   * valides par chaque associe avant publication.
   */
  bio: string;
  /** Photographie de placeholder. A remplacer par le portrait officiel. */
  photo: string;
};

export const team: TeamMember[] = [
  {
    name: 'Herve Croset',
    role: 'Co-fondateur',
    office: 'Luxembourg',
    bio: 'Co-fondateur de Bridgeline Partners. Il supervise la structuration des vehicules d’investissement et les relations avec les depositaires, administrateurs et conseils juridiques du groupe.',
    photo: 'https://picsum.photos/seed/bridgeline-portrait-croset/640/800',
  },
  {
    name: 'George Pal',
    role: 'Co-fondateur',
    office: 'Geneve',
    bio: 'Co-fondateur de Bridgeline Partners. Il dirige l’origination des operations et la relation avec les family offices, gerants de fortune et investisseurs institutionnels du reseau.',
    photo: 'https://picsum.photos/seed/bridgeline-portrait-pal/640/800',
  },
  {
    name: 'John Tavares',
    role: 'Investment Principal',
    office: 'Geneve',
    bio: 'Investment principal. Il conduit l’analyse des dossiers, la due diligence et le suivi des participations en portefeuille jusqu’a leur sortie.',
    photo: 'https://picsum.photos/seed/bridgeline-portrait-tavares/640/800',
  },
];

/** Notre approche. Les libelles sont des actions, pas des numeros d'etape. */
export const approach = [
  {
    title: 'Origination',
    body: 'Les operations arrivent par notre reseau de gerants, de conseils et de co-investisseurs. Nous ecartons ce que nous ne pouvons pas documenter.',
  },
  {
    title: 'Structuration',
    body: 'Chaque operation retenue est logee dans un vehicule dedie, avec un depositaire, un administrateur et une documentation juridique complete.',
  },
  {
    title: 'Suivi',
    body: 'Reporting periodique, valorisations et documents disponibles dans la Bridgeline Room pendant toute la duree de detention.',
  },
] as const;

/** Ce que nous apportons. Alimente la grille asymetrique de la page d’accueil. */
export const advantages = [
  {
    title: 'Acces a des operations fermees',
    body: 'Secondaires, co-investissements et clubs deals qui ne sont pas distribues publiquement.',
  },
  {
    title: 'Deux juridictions, un interlocuteur',
    body: 'Structuration luxembourgeoise, relation investisseurs a Geneve. Un seul point de contact pour les deux.',
  },
  {
    title: 'Tickets calibres',
    body: 'Des seuils d’entree pensés pour les family offices et les gerants independants, pas seulement pour les institutionnels.',
  },
  {
    title: 'Suivi apres la souscription',
    body: 'La relation ne s’arrete pas au closing : valorisations, rapports et documents restent accessibles en ligne.',
  },
] as const;

/**
 * Bandeau des investissements passes.
 * Les secteurs et annees sont des reperes de track record a valider par l’equipe.
 */
export const trackRecord = [
  { name: 'Helvetia Metals', year: '2019' },
  { name: 'Nordkapp Logistics', year: '2020' },
  { name: 'Caldera Renewables', year: '2021' },
  { name: 'Atlas Bioscience', year: '2022' },
  { name: 'Verdaline Foods', year: '2023' },
  { name: 'Sable Data Centres', year: '2024' },
  { name: 'Pontis Marine', year: '2025' },
] as const;

/** Benefices de la Room, presentes sur sa page d’entree publique. */
export const roomBenefits = [
  {
    title: 'Opportunites en direct',
    body: 'Les operations ouvertes, leur avancement de levee, le ticket minimum et la date de cloture, mis a jour en continu.',
  },
  {
    title: 'Souscription en ligne',
    body: 'Marquez votre interet et lancez le processus de souscription depuis la fiche de l’operation, sans echange de documents par email.',
  },
  {
    title: 'Suivi de portefeuille',
    body: 'Capital engage, valorisation courante et performance de chaque participation, avec les rapports associes.',
  },
] as const;
