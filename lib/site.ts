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
  email: 'info@bridgelinepartners.com',
  /**
   * Politique de confidentialité, servie par app/[locale]/(public)/privacy.
   * Chemin interne (localisé automatiquement) ou URL complète.
   */
  privacyPolicyUrl: '/privacy' as string | null,
  /**
   * Logo officiel, servi depuis /public/brand/bridgeline-logo.png.
   *
   * Tant qu'il vaut null, l'entête et le pied de page affichent la marque
   * nominale dessinée à la main (Wordmark). Une fois le fichier déposé,
   * renseigner son chemin ici : Wordmark bascule tout seul, y compris sur
   * fond navy, où le logo est rendu en blanc par filtre CSS.
   */
  logo: '/brand/bridgeline-logo.png' as string | null,
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
    email: 'info@bridgelinepartners.com',
    photo: 'https://picsum.photos/seed/bridgeline-office-luxembourg/1200/900',
  },
  {
    id: 'geneva',
    city: 'Genève',
    address: '11 rue Verdaine, 1204 Genève, Suisse',
    phone: '+41 79 345 77 08',
    email: 'info@bridgelinepartners.com',
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
  /**
   * Portrait officiel, servi depuis /public/team.
   *
   * A null, l'affichage retombe sur les initiales sur aplat navy : pointer un
   * fichier absent afficherait une image cassee sur le site en ligne.
   *
   * Pour activer : deposer le fichier dans public/team/ puis renseigner son
   * chemin ici. Voir public/team/README.md.
   */
  photo: string | null;
};

export const team: TeamMember[] = [
  { id: 'croset', name: 'Hervé Croset', photo: '/team/croset.jpg' },
  { id: 'pal', name: 'George Pal', photo: '/team/pal.jpg' },
  { id: 'tavares', name: 'John Tavares', photo: '/team/tavares.webp' },
];

export type TrackRecordEntry = {
  name: string;
  /**
   * Logo officiel de la société, servi depuis /public/logos.
   *
   * Tant qu'il vaut null, le bandeau affiche le nom en typographie display.
   * Ces logos appartiennent aux sociétés concernées : ils doivent venir
   * d'une source autorisée (kit de presse, accord de la société) avant
   * d'être publiés.
   */
  logo: string | null;
};

/** Bandeau des investissements passés. */
export const trackRecord: TrackRecordEntry[] = [
  { name: 'Palantir', logo: '/logos/palantir.png' },
  { name: 'Forward', logo: '/logos/forward.png' },
  { name: 'Impossible', logo: '/logos/impossible.png' },
  { name: 'SpaceX', logo: '/logos/spacex.png' },
  { name: 'wefox', logo: '/logos/wefox.png' },
  { name: 'Airbnb', logo: '/logos/airbnb.png' },
  { name: 'Stripe', logo: '/logos/stripe.png' },
  { name: 'Grab', logo: '/logos/grab.png' },
  { name: 'Revolut', logo: '/logos/revolut.png' },
  { name: 'Ripple', logo: '/logos/ripple.png' },
  { name: 'Kodiak', logo: '/logos/kodiak.png' },
  { name: 'Uber', logo: '/logos/uber.png' },
];
