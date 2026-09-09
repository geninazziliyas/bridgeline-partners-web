import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PageHeader } from '@/components/layout/PageHeader';
import { getPublicDeals } from '@/lib/deals';
import { formatShortDate } from '@/lib/utils';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.nav.investments,
    description: dict.investments.lead,
    alternates: { canonical: `/${params.locale}/investments` },
  };
}

/**
 * Investissements en cours, publics : mêmes garde-fous que l'aperçu de la
 * page d'accueil (jamais de montants ni de tickets, réservés à la Room).
 * Contrairement à l'aperçu, cette page liste toutes les opérations non
 * clôturées plutôt que les quatre premières.
 */
export default async function InvestmentsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);
  const deals = await getPublicDeals(params.locale, 50);

  return (
    <>
      <PageHeader title={dict.investments.title} lead={dict.investments.lead} />

      <section className="bg-white py-20 lg:py-24">
        <Container>
          {deals.length === 0 ? (
            <div className="rounded-card border border-dashed border-hairline bg-canvas p-10 text-center">
              <p className="text-[16px] text-ink-muted">{dict.investments.emptyBody}</p>
              <ButtonLink
                href={localizedPath(params.locale, '/contact')}
                variant="secondary"
                size="md"
                className="mt-6"
              >
                {dict.common.contact}
              </ButtonLink>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-hairline border-y border-hairline">
                {deals.map((deal) => (
                  <li key={deal.id}>
                    <div className="grid gap-4 py-8 md:grid-cols-12 md:items-center md:gap-6">
                      <div className="md:col-span-5">
                        <h2 className="font-display text-lg font-bold text-navy">
                          {deal.name}
                        </h2>
                        <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
                          {deal.summary}
                        </p>
                      </div>
                      <p className="text-[15px] text-ink-muted md:col-span-3">
                        {deal.sector} · {deal.geography}
                      </p>
                      <p className="tabular font-mono text-[14px] text-ink-muted md:col-span-2">
                        {formatShortDate(deal.closingDate, params.locale)}
                      </p>
                      <div className="md:col-span-2 md:justify-self-end">
                        <StatusBadge status={deal.status} dict={dict} />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={localizedPath(params.locale, '/room')}
                size="lg"
                className="mt-12"
              >
                {dict.common.room}
              </ButtonLink>
            </>
          )}
        </Container>
      </section>
    </>
  );
}
