/** Entrees du menu lateral de la Bridgeline Room. */
export const roomNavigation = [
  { href: '/room/dashboard', label: 'Vue d’ensemble', icon: 'overview' },
  { href: '/room/opportunities', label: 'Opportunites', icon: 'deals' },
  { href: '/room/portfolio', label: 'Mon portefeuille', icon: 'portfolio' },
  { href: '/room/documents', label: 'Documents', icon: 'documents' },
] as const;

export type RoomNavItem = (typeof roomNavigation)[number];
