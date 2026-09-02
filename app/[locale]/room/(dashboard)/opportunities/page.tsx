import type { Metadata } from 'next';
import { DealStatus } from '@prisma/client';

import { getDeals } from '@/lib/deals';
import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { DealFilters } from '@/components/room/DealFilters';
import { DealCard } from '@/components/room/DealCard';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return {
    title: getDictionary(params.locale).opportunities.title,
    robots: { index: false, follow: false },
  };
}

export const dynamic = 'force-dynamic';

type SearchParams = { q?: string; status?: string };

/** Vérifie que le statut reçu par l'URL fait bien partie de l'énumération. */
function parseStatus(value?: string): DealStatus | undefined {
  if (!value) return undefined;
  return Object.values(DealStatus).includes(value as DealStatus)
    ? (value as DealStatus)
    : undefined;
}

export default async function OpportunitiesPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: SearchParams;
}) {
  const dict = getDictionary(params.locale);
  const locale = params.locale;

  const query = searchParams.q?.trim() || undefined;
  const status = parseStatus(searchParams.status);

  const deals = await getDeals(locale, { query, status });
  const filtered = Boolean(query || status);

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title={dict.opportunities.title}
        lead={dict.opportunities.lead}
      />

      <div className="mt-8">
        <DealFilters locale={locale} dict={dict} query={query} status={status} />
      </div>

      <p className="mt-6 text-[14px] text-ink-muted" aria-live="polite">
        {deals.length}{' '}
        {deals.length > 1 ? dict.opportunities.countMany : dict.opportunities.countOne}
        {filtered ? ` ${dict.opportunities.countSuffixFiltered}` : ''}.
      </p>

      {deals.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title={
              filtered
                ? dict.opportunities.emptyFilteredTitle
                : dict.opportunities.emptyTitle
            }
            body={
              filtered
                ? dict.opportunities.emptyFilteredBody
                : dict.opportunities.emptyBody
            }
            action={
              filtered ? (
                <ButtonLink
                  href={localizedPath(locale, '/room/opportunities')}
                  variant="secondary"
                  size="md"
                >
                  {dict.opportunities.resetFilters}
                </ButtonLink>
              ) : null
            }
          />
        </div>
      ) : (
        <ul className="mt-4 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {deals.map((deal) => (
            <li key={deal.id}>
              <DealCard deal={deal} locale={locale} dict={dict} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
