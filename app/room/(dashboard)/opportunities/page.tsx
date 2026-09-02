import type { Metadata } from 'next';
import { DealStatus } from '@prisma/client';

import { getDeals } from '@/lib/deals';
import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { DealFilters } from '@/components/room/DealFilters';
import { DealCard } from '@/components/room/DealCard';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Opportunites',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type SearchParams = { q?: string; status?: string };

/** Verifie que le statut recu par l'URL fait bien partie de l'enumeration. */
function parseStatus(value?: string): DealStatus | undefined {
  if (!value) return undefined;
  return Object.values(DealStatus).includes(value as DealStatus)
    ? (value as DealStatus)
    : undefined;
}

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = searchParams.q?.trim() || undefined;
  const status = parseStatus(searchParams.status);

  const deals = await getDeals({ query, status });
  const filtered = Boolean(query || status);

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Opportunites"
        lead="Les operations ouvertes a la souscription et celles accessibles sur invitation."
      />

      <div className="mt-8">
        <DealFilters query={query} status={status} />
      </div>

      <p className="mt-6 text-[14px] text-ink-muted" aria-live="polite">
        {deals.length}{' '}
        {deals.length > 1 ? 'operations correspondent' : 'operation correspond'}
        {filtered ? ' a votre recherche' : ''}.
      </p>

      {deals.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title={filtered ? 'Aucun resultat' : 'Aucune operation ouverte'}
            body={
              filtered
                ? 'Aucune operation ne correspond a ces criteres. Elargissez la recherche ou reinitialisez les filtres.'
                : 'Les prochaines operations apparaitront ici. Votre charge de relation vous previent des l’ouverture d’une levee.'
            }
            action={
              filtered ? (
                <ButtonLink href="/room/opportunities" variant="secondary" size="md">
                  Reinitialiser les filtres
                </ButtonLink>
              ) : null
            }
          />
        </div>
      ) : (
        <ul className="mt-4 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {deals.map((deal) => (
            <li key={deal.id}>
              <DealCard deal={deal} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
