/**
 * Données du site indépendantes de la langue.
 *
 * Tout ce qui se traduit (rôles, biographies, libellés, textes de sections)
 * vit dans lib/i18n/dictionaries/, indexé par les identifiants ci-dessous.
 * Les données de la Bridgeline Room, elles, viennent de la base.
 */

export const site = {
  name: 'Bridgeline Partners',
  domain: 'bridgelinepartners.com',
  email: 'contact@bridgelinepartners.com',
} as const;

/** Chemins internes, sans préfixe de langue. */
export const navigation = [
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/team', key: 'team' },
  { href: '/contact', key: 'contact' },
] as const;

export type OfficeId = 'luxembourg' | 'geneva';

export type Office = {
  id: OfficeId;
  /** Nom de ville, identique dans les deux langues. */
  city: string;
  address: string;
  phone: string;
  email: string;
  /** Photographie de placeholder, à remplacer par le visuel du bureau. */
  photo: string;
};

export const offices: Office[] = [
  {
    id: 'luxembourg',
    city: 'Luxembourg',
    address: '2 place de Strasbourg, 2562 Luxembourg',
    phone: '+41 78 743 60 76',
    email: 'contact@bridgelinepartners.com',
    photo: 'https://picsum.photos/seed/bridgeline-office-luxembourg/1200/900',
  },
  {
    id: 'geneva',
    city: 'Genève',
    address: '11 rue Verdaine, 1204 Genève, Suisse',
    phone: '+41 79 345 77 08',
    email: 'contact@bridgelinepartners.com',
    photo: 'https://picsum.photos/seed/bridgeline-office-geneve/1200/900',
  },
];

/**
 * Les deux numéros publiés par la société. Ils figurent au pied de page et sur
 * la page de contact. Leur rattachement à un bureau plutôt qu'à l'autre reste
 * à confirmer par l'équipe.
 */
export const phones = ['+41 79 345 77 08', '+41 78 743 60 76'] as const;

export type TeamMemberId = 'croset' | 'pal' | 'tavares';

export type TeamMember = {
  id: TeamMemberId;
  name: string;
  /** Portrait de placeholder, à remplacer par la photographie officielle. */
  photo: string;
};

export const team: TeamMember[] = [
  {
    id: 'croset',
    name: 'Hervé Croset',
    photo: 'https://picsum.photos/seed/bridgeline-portrait-croset/640/800',
  },
  {
    id: 'pal',
    name: 'George Pal',
    photo: 'https://picsum.photos/seed/bridgeline-portrait-pal/640/800',
  },
  {
    id: 'tavares',
    name: 'John Tavares',
    photo: 'https://picsum.photos/seed/bridgeline-portrait-tavares/640/800',
  },
];

/**
 * Bandeau des investissements passés.
 *
 * A COMPLÉTER : les opérations affichées sur bridgelinepartners.com le sont
 * sous forme de logos, dont les noms n'ont pas pu être récupérés. Les entrées
 * ci-dessous sont provisoires et doivent être remplacées par la liste réelle.
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
