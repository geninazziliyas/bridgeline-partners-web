import type { Metadata } from 'next';
import { Manrope, Inter, IBM_Plex_Mono } from 'next/font/google';

import { site } from '@/lib/site';
import { AuthProvider } from '@/components/layout/AuthProvider';

import './globals.css';

// Trois familles, chargees par next/font : aucune requete vers Google au
// runtime, les fichiers sont servis depuis le domaine de l'application.
const display = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: 'fr_FR',
    type: 'website',
    siteName: site.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
