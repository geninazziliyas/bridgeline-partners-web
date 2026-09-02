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
import { roomNavigation } from '@/components/room/navigation';
import { cn, initials } from '@/lib/utils';

const icons = {
  overview: SquaresFour,
  deals: Briefcase,
  portfolio: ChartPieSlice,
  documents: Files,
} as const;

type RoomShellProps = {
  user: { name: string; email: string; company: string | null };
  children: ReactNode;
};

/**
 * Ossature de la Room : menu lateral navy fixe au-dela de lg, tiroir sous ce
 * seuil. Client Component parce qu'il depend de la route active, de l'etat du
 * tiroir et de la deconnexion.
 */
export function RoomShell({ user, children }: RoomShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Referme le tiroir apres une navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const nav = (
    <nav aria-label="Navigation de la Room" className="flex flex-col gap-1">
      {roomNavigation.map((item) => {
        const Icon = icons[item.icon];
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-control px-3 py-2.5 text-[15px] transition-colors duration-200',
              active
                ? 'bg-white/12 font-medium text-white'
                : 'text-white/65 hover:bg-white/8 hover:text-white',
            )}
          >
            <Icon size={19} weight={active ? 'fill' : 'regular'} />
            {item.label}
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

      <button
        type="button"
        onClick={() => signOut({ callbackUrl: '/' })}
        className="mt-4 flex w-full items-center gap-2.5 rounded-control px-3 py-2.5 text-[14px] text-white/65 transition-colors hover:bg-white/8 hover:text-white"
      >
        <SignOut size={17} weight="regular" />
        Se deconnecter
      </button>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-canvas lg:grid lg:grid-cols-[264px_1fr]">
      {/* Menu lateral, a partir de lg.
          L'aplat navy porte sur la colonne entiere, le panneau colle en haut :
          sur une page plus haute que la fenetre, la colonne reste navy jusqu'en
          bas au lieu de s'arreter a 100dvh. */}
      <div className="hidden bg-navy lg:block">
        <aside className="sticky top-0 flex h-[100dvh] flex-col justify-between p-6">
          <div>
            <Link href="/" aria-label="Bridgeline Partners, accueil">
              <Wordmark tone="white" />
            </Link>
            <div className="mt-8">{nav}</div>
          </div>
          {account}
        </aside>
      </div>

      {/* Barre superieure mobile. */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-navy px-5 text-white lg:hidden">
        <Link href="/room/dashboard" aria-label="Bridgeline Room">
          <Wordmark tone="white" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="menu-room"
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-control transition-colors hover:bg-white/10"
        >
          <span className="sr-only">{open ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
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
