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
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return {
    title: getDictionary(params.locale).roomNav.overview,
    robots: { index: false, follow: false },
  };
}

/** Les chiffres affichés dépendent de la session : jamais de mise en cache. */
export const dynamic = 'force-dynamic';

export default async function DashboardPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);
  const locale = params.locale;

  const session = await auth();
  if (!session?.user) redirect(localizedPath(locale, '/room/login'));

  const [summary, featured] = await Promise.all([
    getPortfolioSummary(session.user.id, locale),
    getFeaturedDeals(locale, 3),
  ]);

  const firstName = session.user.name?.split(' ')[0] ?? '';

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title={
          firstName ? `${dict.dashboard.greeting} ${firstName}` : dict.dashboard.fallbackTitle
        }
        lead={dict.dashboard.lead}
      />

      <section aria-label={dict.dashboard.summaryAria} className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label={dict.dashboard.committed}
            value={formatCompactCurrency(summary.committed, locale)}
            detail={dict.dashboard.committedDetail}
          />
          <StatCard
            label={dict.dashboard.currentValue}
            value={formatCompactCurrency(summary.currentValue, locale)}
            detail={dict.dashboard.currentValueDetail}
          />
          <StatCard
            label={dict.dashboard.performance}
            value={formatPercent(summary.performance, locale)}
            detail={dict.dashboard.performanceDetail}
            tone={summary.performance >= 0 ? 'positive' : 'negative'}
          />
          <StatCard
            label={dict.dashboard.positions}
            value={String(summary.positionCount)}
            detail={
              summary.nextClosing
                ? `${dict.dashboard.nextClosing} ${formatDate(summary.nextClosing.closingDate, locale)}`
                : dict.dashboard.noClosing
            }
          />
        </div>
      </section>

      <section aria-labelledby="featured-deals" className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 id="featured-deals" className="font-display text-xl font-bold text-navy">
            {dict.dashboard.featured}
          </h2>
          <Link
            href={localizedPath(locale, '/room/opportunities')}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {dict.dashboard.allDeals}
            <ArrowRight size={15} weight="bold" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title={dict.dashboard.emptyFeaturedTitle}
              body={dict.dashboard.emptyFeaturedBody}
              action={
                <ButtonLink
                  href={localizedPath(locale, '/room/opportunities')}
                  variant="secondary"
                  size="md"
                >
                  {dict.dashboard.seeDeals}
                </ButtonLink>
              }
            />
          </div>
        ) : (
          <ul className="mt-6 grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
            {featured.map((deal) => (
              <li key={deal.id}>
                <DealCard deal={deal} locale={locale} dict={dict} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
