'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { List, X } from '@phosphor-icons/react';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/layout/Wordmark';
import { navigation } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Entete du site public. Hauteur fixe de 68px, navigation sur une seule ligne
 * au-dela de lg, repliee en panneau sous ce seuil.
 */
export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Referme le panneau mobile apres une navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
      <Container className="flex h-[68px] items-center justify-between gap-6">
        <Link href="/" aria-label="Bridgeline Partners, accueil">
          <Wordmark tone="white" />
        </Link>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigation.map((item) => {
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
          <ButtonLink href="/room" variant="onNavy" size="sm">
            Bridgeline Room
          </ButtonLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-control text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
          {open ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
        </button>
      </Container>

      {open ? (
        <div id="menu-mobile" className="border-t border-white/10 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-control px-3 py-3 text-[15px] text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/room" variant="onNavy" size="md" className="mt-3 w-full">
              Bridgeline Room
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
