/**
 * Données du site indépendantes de la langue.
 *
 * Tout ce qui se traduit (rôles, biographies, libellés, textes de sections)
 * vit dans lib/i18n/dictionaries/, indexé par les identifiants ci-dessous.
 * Les données de la Bridgeline Room, elles, viennent de la base.
 *
 * À COMPLÉTER AVANT MISE EN PRODUCTION (voir README, « Contenu à fournir ») :
 * adresses postales, numéros de téléphone, biographies validées par chaque
 * associé, photographies de l'équipe et des bureaux.
 */

export const site = {
  name: 'Bridgeline Partners',
  domain: 'bridgelinepartners.com',
} as const;

/** Chemins internes, sans préfixe de langue. */
export const navigation = [
  { href: '/about', key: 'about' },
  { href: '/team', key: 'team' },
  { href: '/contact', key: 'contact' },
] as const;

export type OfficeId = 'luxembourg' | 'geneva';

export type Office = {
  id: OfficeId;
  /** Nom de ville, identique dans les deux langues. */
  city: string;
  /** Adresse postale complète. À renseigner par l'équipe. */
  address: string | null;
  /** Numéro de téléphone du bureau. À renseigner par l'équipe. */
  phone: string | null;
  email: string;
  /** Photographie de placeholder, à remplacer par le visuel du bureau. */
  photo: string;
};

export const offices: Office[] = [
  {
    id: 'luxembourg',
    city: 'Luxembourg',
    address: null,
    phone: null,
    email: 'luxembourg@bridgelinepartners.com',
    photo: 'https://picsum.photos/seed/bridgeline-office-luxembourg/1200/900',
  },
  {
    id: 'geneva',
    city: 'Genève',
    address: null,
    phone: null,
    email: 'geneve@bridgelinepartners.com',
    photo: 'https://picsum.photos/seed/bridgeline-office-geneve/1200/900',
  },
];

export type TeamMemberId = 'croset' | 'pal' | 'tavares';

export type TeamMember = {
  id: TeamMemberId;
  name: string;
  /** Bureau de rattachement, référencé par son identifiant. */
  office: OfficeId;
  /** Portrait de placeholder, à remplacer par la photographie officielle. */
  photo: string;
};

export const team: TeamMember[] = [
  {
    id: 'croset',
    name: 'Hervé Croset',
    office: 'luxembourg',
    photo: 'https://picsum.photos/seed/bridgeline-portrait-croset/640/800',
  },
  {
    id: 'pal',
    name: 'George Pal',
    office: 'geneva',
    photo: 'https://picsum.photos/seed/bridgeline-portrait-pal/640/800',
  },
  {
    id: 'tavares',
    name: 'John Tavares',
    office: 'geneva',
    photo: 'https://picsum.photos/seed/bridgeline-portrait-tavares/640/800',
  },
];

/**
 * Bandeau des investissements passés.
 * Noms propres et années : identiques dans les deux langues.
 * À confirmer par l'équipe.
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
