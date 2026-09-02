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
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return {
    title: getDictionary(params.locale).portfolio.title,
    robots: { index: false, follow: false },
  };
}

export const dynamic = 'force-dynamic';

export default async function PortfolioPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);
  const locale = params.locale;

  const session = await auth();
  if (!session?.user) redirect(localizedPath(locale, '/room/login'));

  const positions = await getPositions(session.user.id, locale);

  const committed = positions.reduce((total, p) => total + p.amountInvested, 0);
  const currentValue = positions.reduce((total, p) => total + p.currentValue, 0);
  const overall = committed > 0 ? ((currentValue - committed) / committed) * 100 : 0;

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader title={dict.portfolio.title} lead={dict.portfolio.lead} />

      {positions.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={dict.portfolio.emptyTitle}
            body={dict.portfolio.emptyBody}
            action={
              <ButtonLink
                href={localizedPath(locale, '/room/opportunities')}
                size="md"
              >
                {dict.dashboard.seeDeals}
              </ButtonLink>
            }
          />
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard
              label={dict.portfolio.committed}
              value={formatCompactCurrency(committed, locale)}
            />
            <StatCard
              label={dict.portfolio.currentValue}
              value={formatCompactCurrency(currentValue, locale)}
            />
            <StatCard
              label={dict.portfolio.overall}
              value={formatPercent(overall, locale)}
              tone={overall >= 0 ? 'positive' : 'negative'}
            />
          </div>

          <section aria-label={dict.portfolio.detailAria} className="mt-10">
            <PortfolioTable positions={positions} locale={locale} dict={dict} />
          </section>

          <p className="mt-6 max-w-[80ch] text-[13px] leading-relaxed text-ink-faint">
            {dict.portfolio.disclaimer}
          </p>
        </>
      )}
    </div>
  );
}
