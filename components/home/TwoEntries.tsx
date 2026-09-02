import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Bloc à deux entrées. Deux panneaux de même poids, l'un clair l'autre navy,
 * pour que le choix soit lisible d'un coup d'œil sans hiérarchiser l'un des
 * deux publics.
 */
export function TwoEntries({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const entries = [
    {
      href: localizedPath(locale, '/room'),
      title: dict.home.entries.investTitle,
      body: dict.home.entries.investBody,
      action: dict.home.entries.investAction,
      dark: false,
    },
    {
      href: localizedPath(locale, '/contact'),
      title: dict.home.entries.raiseTitle,
      body: dict.home.entries.raiseBody,
      action: dict.home.entries.raiseAction,
      dark: true,
    },
  ];

  return (
    // Section pleine largeur : la coupure au centre porte le choix, une
    // gouttière de conteneur l'affaiblirait.
    <section className="border-b border-hairline">
      <div className="grid md:grid-cols-2">
        {entries.map((entry) => (
          <Link
            key={entry.href}
            href={entry.href}
            className={[
              'group flex flex-col justify-between gap-10 p-10 transition-colors duration-200 lg:p-14',
              entry.dark
                ? 'bg-navy text-white hover:bg-navy-700'
                : 'bg-white text-navy hover:bg-accent-soft',
            ].join(' ')}
          >
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                {entry.title}
              </h2>
              <p
                className={[
                  'mt-4 max-w-[46ch] text-[16px] leading-relaxed',
                  entry.dark ? 'text-white/75' : 'text-ink-muted',
                ].join(' ')}
              >
                {entry.body}
              </p>
            </div>

            <span
              className={[
                'inline-flex items-center gap-2 text-[15px] font-medium',
                entry.dark ? 'text-white' : 'text-accent',
              ].join(' ')}
            >
              {entry.action}
              <ArrowRight
                size={17}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
