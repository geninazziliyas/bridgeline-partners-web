import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { DealView } from '@/lib/deals';
import { formatCompactCurrency, formatShortDate, daysUntil } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Fiche d'une opération dans la Room : statut, avancement de la levée, ticket
 * minimum et date de clôture. Tous les chiffres sont en monospace tabulaire.
 */
export function DealCard({
  deal,
  locale,
  dict,
}: {
  deal: DealView;
  locale: Locale;
  dict: Dictionary;
}) {
  const remaining = daysUntil(deal.closingDate);

  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-bold text-navy">{deal.name}</h3>
          <p className="mt-1 text-[13px] text-ink-faint">
            {deal.sector} · {deal.geography}
          </p>
        </div>
        <StatusBadge status={deal.status} dict={dict} />
      </div>

      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-muted">
        {deal.summary}
      </p>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <p className="tabular font-mono text-[15px] font-medium text-navy">
            {formatCompactCurrency(deal.raisedAmount, locale)}
          </p>
          <p className="tabular font-mono text-[13px] text-ink-muted">
            {dict.opportunities.raisedOf}{' '}
            {formatCompactCurrency(deal.targetAmount, locale)}
          </p>
        </div>
        <ProgressBar
          value={deal.progress}
          label={`${dict.opportunities.progressLabel} ${deal.name}`}
          className="mt-2.5"
        />
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline pt-5">
        <div>
          <dt className="text-[13px] text-ink-muted">{dict.opportunities.minTicket}</dt>
          <dd className="tabular mt-1 font-mono text-[15px] text-navy">
            {formatCompactCurrency(deal.minTicket, locale)}
          </dd>
        </div>
        <div>
          <dt className="text-[13px] text-ink-muted">{dict.opportunities.closing}</dt>
          <dd className="tabular mt-1 font-mono text-[15px] text-navy">
            {formatShortDate(deal.closingDate, locale)}
          </dd>
          {remaining > 0 && remaining <= 45 ? (
            <p className="mt-1 text-[12px] text-amber-700">
              {remaining} {dict.opportunities.daysLeft}
            </p>
          ) : null}
        </div>
      </dl>
    </Card>
  );
}
