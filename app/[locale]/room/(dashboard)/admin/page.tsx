import type { Metadata } from 'next';
import {
  Briefcase,
  Files,
  UserCircle,
  UsersThree,
} from '@phosphor-icons/react/dist/ssr';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { getAdminOverviewCounts } from '@/lib/admin';
import { localizedPath, type Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const counts = await getAdminOverviewCounts();

  const cards = [
    {
      href: '/room/admin/deals',
      icon: Briefcase,
      title: 'Opérations',
      body: `${counts.deals} opération${counts.deals > 1 ? 's' : ''} publiée${counts.deals > 1 ? 's' : ''}.`,
    },
    {
      href: '/room/admin/investors',
      icon: UsersThree,
      title: 'Comptes',
      body: `${counts.investors} investisseur${counts.investors > 1 ? 's' : ''} avec accès à la Room.`,
    },
    {
      href: '/room/admin/investments',
      icon: UserCircle,
      title: 'Participations',
      body: 'Lier un investisseur à une opération et suivre sa valorisation.',
    },
    {
      href: '/room/admin/documents',
      icon: Files,
      title: 'Documents',
      body: 'Rapports, term sheets et relevés consultables dans la Room.',
    },
  ];

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Administration"
        lead="Gérer les opérations, les comptes et les demandes d'accès de la Bridgeline Room."
      />

      {counts.pendingRequests > 0 ? (
        <a
          href={localizedPath(params.locale, '/room/admin/access-requests')}
          className="mt-8 flex items-center justify-between rounded-card border border-amber-200 bg-amber-50 px-6 py-4 transition-colors hover:border-amber-300"
        >
          <p className="text-[15px] font-medium text-amber-800">
            {counts.pendingRequests} demande{counts.pendingRequests > 1 ? 's' : ''} d&apos;accès
            en attente
          </p>
          <span className="text-[14px] font-medium text-amber-800">Traiter →</span>
        </a>
      ) : null}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <a
            key={card.href}
            href={localizedPath(params.locale, card.href)}
            className="rounded-card border border-hairline bg-white p-6 transition-colors hover:border-accent"
          >
            <card.icon size={24} weight="light" className="text-accent" />
            <h2 className="mt-4 font-display text-lg font-bold text-navy">
              {card.title}
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
              {card.body}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
