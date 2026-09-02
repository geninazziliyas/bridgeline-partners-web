'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { List, X } from '@phosphor-icons/react';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/layout/Wordmark';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { navigation } from '@/lib/site';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * Entête du site public. Hauteur fixe de 68px, navigation sur une seule ligne
 * au-delà de lg, repliée en panneau sous ce seuil.
 *
 * Client Component : dépend de la route active et de l'état du menu mobile.
 * Le dictionnaire lui est passé par le layout serveur, il n'est donc pas
 * rechargé côté navigateur.
 */
export function PublicHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Referme le panneau mobile après une navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const items = navigation.map((item) => ({
    href: localizedPath(locale, item.href),
    label: dict.nav[item.key],
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
      <Container className="flex h-[68px] items-center justify-between gap-6">
        <Link href={localizedPath(locale, '/')} aria-label={dict.nav.homeAria}>
          <Wordmark tone="white" />
        </Link>

        <nav aria-label={dict.nav.primary} className="hidden items-center gap-8 lg:flex">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'text-[15px] transition-colors duration-200',
                  active ? 'text-white' : 'text-white/70 hover:text-white',
                )}
              >
                {item.label}
              </Link>
            );
          })}

          <LocaleSwitcher locale={locale} tone="onNavy" />

          <ButtonLink href={localizedPath(locale, '/room')} variant="onNavy" size="sm">
            {dict.common.room}
          </ButtonLink>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher locale={locale} tone="onNavy" />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-control text-white transition-colors hover:bg-white/10"
          >
            <span className="sr-only">
              {open ? dict.nav.closeMenu : dict.nav.openMenu}
            </span>
            {open ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div id="menu-mobile" className="border-t border-white/10 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-control px-3 py-3 text-[15px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href={localizedPath(locale, '/room')}
              variant="onNavy"
              size="md"
              className="mt-3 w-full"
            >
              {dict.common.room}
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
