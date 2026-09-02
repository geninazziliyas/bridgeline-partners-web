'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useEffect, useState, type ReactNode } from 'react';
import {
  Briefcase,
  ChartPieSlice,
  Files,
  List,
  SignOut,
  SquaresFour,
  X,
} from '@phosphor-icons/react';

import { Wordmark } from '@/components/layout/Wordmark';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { roomNavigation } from '@/components/room/navigation';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';
import { cn, initials } from '@/lib/utils';

const icons = {
  overview: SquaresFour,
  deals: Briefcase,
  portfolio: ChartPieSlice,
  documents: Files,
} as const;

type RoomShellProps = {
  locale: Locale;
  dict: Dictionary;
  user: { name: string; email: string; company: string | null };
  children: ReactNode;
};

/**
 * Ossature de la Room : menu latéral navy fixe au-delà de lg, tiroir sous ce
 * seuil. Client Component parce qu'il dépend de la route active, de l'état du
 * tiroir et de la déconnexion.
 */
export function RoomShell({ locale, dict, user, children }: RoomShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Referme le tiroir après une navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const nav = (
    <nav aria-label={dict.roomNav.ariaLabel} className="flex flex-col gap-1">
      {roomNavigation.map((item) => {
        const Icon = icons[item.icon];
        const href = localizedPath(locale, item.href);
        const active = pathname === href;

        return (
          <Link
            key={item.href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-control px-3 py-2.5 text-[15px] transition-colors duration-200',
              active
                ? 'bg-white/12 font-medium text-white'
                : 'text-white/65 hover:bg-white/8 hover:text-white',
            )}
          >
            <Icon size={19} weight={active ? 'fill' : 'regular'} />
            {dict.roomNav[item.key]}
          </Link>
        );
      })}
    </nav>
  );

  const account = (
    <div className="border-t border-white/10 pt-5">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/12 font-mono text-[13px] font-medium text-white"
        >
          {initials(user.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium text-white">{user.name}</p>
          <p className="truncate text-[12px] text-white/55">
            {user.company ?? user.email}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: localizedPath(locale, '/') })}
          className="flex items-center gap-2.5 rounded-control px-3 py-2.5 text-[14px] text-white/65 transition-colors hover:bg-white/8 hover:text-white"
        >
          <SignOut size={17} weight="regular" />
          {dict.roomNav.signOut}
        </button>
        <LocaleSwitcher locale={locale} tone="onNavy" />
      </div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-canvas lg:grid lg:grid-cols-[264px_1fr]">
      {/* Menu latéral, à partir de lg.
          L'aplat navy porte sur la colonne entière, le panneau colle en haut :
          sur une page plus haute que la fenêtre, la colonne reste navy jusqu'en
          bas au lieu de s'arrêter à 100dvh. */}
      <div className="hidden bg-navy lg:block">
        <aside className="sticky top-0 flex h-[100dvh] flex-col justify-between p-6">
          <div>
            <Link href={localizedPath(locale, '/')} aria-label={dict.nav.homeAria}>
              <Wordmark tone="white" />
            </Link>
            <div className="mt-8">{nav}</div>
          </div>
          {account}
        </aside>
      </div>

      {/* Barre supérieure mobile. */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-navy px-5 text-white lg:hidden">
        <Link
          href={localizedPath(locale, '/room/dashboard')}
          aria-label={dict.common.room}
        >
          <Wordmark tone="white" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-room"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-control transition-colors hover:bg-white/10"
        >
          <span className="sr-only">
            {open ? dict.nav.closeMenu : dict.nav.openMenu}
          </span>
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </header>

      {open ? (
        <div
          id="menu-room"
          className="sticky top-16 z-30 border-t border-white/10 bg-navy px-5 py-5 lg:hidden"
        >
          {nav}
          <div className="mt-5">{account}</div>
        </div>
      ) : null}

      <main className="min-w-0">{children}</main>
    </div>
  );
}
