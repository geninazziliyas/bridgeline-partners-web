import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

import { auth } from '@/lib/auth';
import { getFeaturedDeals } from '@/lib/deals';
import { getPortfolioSummary } from '@/lib/portfolio';
import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { StatCard } from '@/components/room/StatCard';
import { DealCard } from '@/components/room/DealCard';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { formatCompactCurrency, formatDate, formatPercent } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Vue d’ensemble',
  robots: { index: false, follow: false },
};

/** Les chiffres affiches dependent de la session : jamais de mise en cache. */
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect('/room/login');

  const [summary, featured] = await Promise.all([
    getPortfolioSummary(session.user.id),
    getFeaturedDeals(3),
  ]);

  const firstName = session.user.name?.split(' ')[0] ?? '';

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title={firstName ? `Bonjour ${firstName}` : 'Vue d’ensemble'}
        lead="Votre exposition aux vehicules Bridgeline et les operations a l’ordre du jour."
      />

      <section aria-label="Synthese" className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Capital engage"
            value={formatCompactCurrency(summary.committed)}
            detail="Somme des montants souscrits"
          />
          <StatCard
            label="Valorisation actuelle"
            value={formatCompactCurrency(summary.currentValue)}
            detail="Derniere valorisation connue"
          />
          <StatCard
            label="Performance"
            value={formatPercent(summary.performance)}
            detail="Depuis la souscription"
            tone={summary.performance >= 0 ? 'positive' : 'negative'}
          />
          <StatCard
            label="Participations"
            value={String(summary.positionCount)}
            detail={
              summary.nextClosing
                ? `Prochaine cloture le ${formatDate(summary.nextClosing.closingDate)}`
                : 'Aucune cloture programmee'
            }
          />
        </div>
      </section>

      <section aria-labelledby="featured-deals" className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2
            id="featured-deals"
            className="font-display text-xl font-bold text-navy"
          >
            Operations a la une
          </h2>
          <Link
            href="/room/opportunities"
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Toutes les operations
            <ArrowRight size={15} weight="bold" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="Aucune operation a la une"
              body="Les operations mises en avant apparaissent ici des qu’une nouvelle levee est ouverte."
              action={
                <ButtonLink href="/room/opportunities" variant="secondary" size="md">
                  Voir les operations
                </ButtonLink>
              }
            />
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
            {featured.map((deal) => (
              <li key={deal.id}>
                <DealCard deal={deal} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
