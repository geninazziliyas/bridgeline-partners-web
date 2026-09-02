'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { locales, localeNames, stripLocale, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

/**
 * Sélecteur de langue.
 *
 * Chaque langue est un vrai lien vers la même page dans l'autre version : un
 * moteur de recherche peut le suivre, et un clic droit « ouvrir dans un nouvel
 * onglet » fonctionne. Le choix est mémorisé dans un cookie, lu par le
 * middleware pour les visites suivantes sur une URL sans préfixe de langue.
 */
export function LocaleSwitcher({
  locale,
  tone = 'navy',
  className,
}: {
  locale: Locale;
  /** onNavy pour les fonds sombres (entête, menu de la Room). */
  tone?: 'navy' | 'onNavy';
  className?: string;
}) {
  const pathname = usePathname();
  const path = stripLocale(pathname);

  function remember(next: Locale) {
    // 1 an, limité à ce site, envoyé uniquement en navigation de premier niveau.
    document.cookie = `bridgeline_locale=${next};path=/;max-age=31536000;samesite=lax`;
  }

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="group"
      aria-label={locale === 'fr' ? 'Langue' : 'Language'}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={path === '/' ? `/${code}` : `/${code}${path}`}
            hrefLang={code}
            onClick={() => remember(code)}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'rounded px-1.5 py-1 text-[13px] font-medium uppercase transition-colors',
              tone === 'onNavy'
                ? active
                  ? 'text-white'
                  : 'text-white/50 hover:text-white'
                : active
                  ? 'text-navy'
                  : 'text-ink-faint hover:text-accent',
            )}
          >
            <span className="sr-only">{localeNames[code]}</span>
            <span aria-hidden="true">{code}</span>
          </Link>
        );
      })}
    </div>
  );
}
