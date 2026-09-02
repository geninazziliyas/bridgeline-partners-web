import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Manrope, Inter, IBM_Plex_Mono } from 'next/font/google';

import { site } from '@/lib/site';
import { AuthProvider } from '@/components/layout/AuthProvider';
import { getDictionary, isLocale, locales, localeTags } from '@/lib/i18n';

import '../globals.css';

// Trois familles, chargées par next/font : aucune requête vers Google au
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

/**
 * Les deux langues sont connues à la compilation : Next génère les pages
 * statiques des deux versions plutôt que de les rendre à la demande.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  const locale = isLocale(params.locale) ? params.locale : 'fr';

  return {
    metadataBase: new URL(`https://${site.domain}`),
    title: {
      default: `${site.name} | ${dict.meta.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: dict.meta.description,
    // Indique aux moteurs que les deux versions sont équivalentes, et laquelle
    // servir selon la langue du visiteur.
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fr: '/fr',
        en: '/en',
        'x-default': '/fr',
      },
    },
    openGraph: {
      title: site.name,
      description: dict.meta.description,
      locale: localeTags[locale].replace('-', '_'),
      type: 'website',
      siteName: site.name,
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Layout racine de l'application : c'est lui qui porte la balise html, avec la
 * langue de la version consultée. Toutes les routes visibles vivent sous
 * /[locale], le middleware s'assurant qu'aucune URL n'y échappe.
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  return (
    <html
      lang={params.locale}
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
