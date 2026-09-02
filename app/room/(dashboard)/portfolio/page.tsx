import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { getPositions } from '@/lib/portfolio';
import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { StatCard } from '@/components/room/StatCard';
import { PortfolioTable } from '@/components/room/PortfolioTable';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { formatCompactCurrency, formatPercent } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Mon portefeuille',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const session = await auth();
  if (!session?.user) redirect('/room/login');

  const positions = await getPositions(session.user.id);

  const committed = positions.reduce((total, p) => total + p.amountInvested, 0);
  const currentValue = positions.reduce((total, p) => total + p.currentValue, 0);
  const overall =
    committed > 0 ? ((currentValue - committed) / committed) * 100 : 0;

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Mon portefeuille"
        lead="Vos participations dans les vehicules Bridgeline, a leur derniere valorisation connue."
      />

      {positions.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Aucune participation pour le moment"
            body="Des votre premiere souscription, le detail de vos participations et leur valorisation apparaitront ici."
            action={
              <ButtonLink href="/room/opportunities" size="md">
                Voir les operations
              </ButtonLink>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Capital engage"
              value={formatCompactCurrency(committed)}
            />
            <StatCard
              label="Valorisation actuelle"
              value={formatCompactCurrency(currentValue)}
            />
            <StatCard
              label="Performance globale"
              value={formatPercent(overall)}
              tone={overall >= 0 ? 'positive' : 'negative'}
            />
          </div>

          <section aria-label="Detail des participations" className="mt-10">
            <PortfolioTable positions={positions} />
          </section>

          <p className="mt-6 max-w-[80ch] text-[13px] leading-relaxed text-ink-faint">
            Les valorisations sont indicatives et refletent la derniere evaluation
            communiquee par la societe de gestion du vehicule concerne. Elles ne
            constituent pas une valeur de rachat.
          </p>
        </>
      )}
    </div>
  );
}
