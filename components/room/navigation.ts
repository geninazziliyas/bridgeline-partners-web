/**
 * Entrées du menu latéral de la Bridgeline Room.
 * `href` est un chemin interne sans préfixe de langue ; `key` désigne le
 * libellé dans le dictionnaire.
 */
export const roomNavigation = [
  { href: '/room/dashboard', key: 'overview', icon: 'overview' },
  { href: '/room/opportunities', key: 'opportunities', icon: 'deals' },
  { href: '/room/portfolio', key: 'portfolio', icon: 'portfolio' },
  { href: '/room/documents', key: 'documents', icon: 'documents' },
] as const;

export type RoomNavItem = (typeof roomNavigation)[number];
