import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getPublicDeals } from '@/lib/deals';
import { formatShortDate } from '@/lib/utils';
import { localizedPath, type Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Aperçu des opérations en cours.
 *
 * Le site public annonce l'existence des opérations et leur calendrier, jamais
 * leurs montants : la donnée chiffrée reste derrière l'authentification de la
 * Room.
 */
export async function OpportunitiesPreview({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const deals = await getPublicDeals(locale, 4);

  return (
    <section className="border-b border-hairline bg-canvas py-20 lg:py-28">
      <Container>
        <div>
          <h2 className="max-w-xl font-display text-3xl font-bold text-navy md:text-4xl">
            {dict.home.opportunities.title}
          </h2>
          <p className="mt-3 max-w-[56ch] text-[16px] leading-relaxed text-ink-muted">
            {dict.home.opportunities.lead}
          </p>
        </div>

        {deals.length === 0 ? (
          // État vide : aucune opération ouverte, ou base momentanément injoignable.
          <div className="mt-10 rounded-card border border-dashed border-hairline bg-white p-10 text-center">
            <p className="text-[16px] text-ink-muted">
              {dict.home.opportunities.emptyBody}
            </p>
            <ButtonLink
              href={localizedPath(locale, '/contact')}
              variant="secondary"
              size="md"
              className="mt-6"
            >
              {dict.common.contact}
            </ButtonLink>
          </div>
        ) : (
          <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
            {deals.map((deal) => (
              <li key={deal.id}>
                <div className="grid gap-4 py-6 md:grid-cols-12 md:items-center md:gap-6">
                  <div className="md:col-span-5">
                    <h3 className="font-display text-lg font-bold text-navy">
                      {deal.name}
                    </h3>
                    <p className="mt-1 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
                      {deal.summary}
                    </p>
                  </div>
                  <p className="text-[15px] text-ink-muted md:col-span-3">
                    {deal.sector}
                  </p>
                  <p className="tabular font-mono text-[14px] text-ink-muted md:col-span-2">
                    {formatShortDate(deal.closingDate, locale)}
                  </p>
                  <div className="md:col-span-2 md:justify-self-end">
                    <StatusBadge status={deal.status} dict={dict} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <ButtonLink
          href={localizedPath(locale, '/room')}
          variant="ghost"
          size="md"
          className="mt-8 -ml-3"
        >
          {dict.common.room}
          <ArrowRight size={16} weight="bold" />
        </ButtonLink>
      </Container>
    </section>
  );
}
