import { StatusBadge } from '@/components/ui/StatusBadge';
import type { PositionView } from '@/lib/portfolio';
import { cn, formatCurrency, formatPercent, formatShortDate } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n';

/**
 * Participations de l'investisseur.
 *
 * Tableau au-delà de md, liste empilée en dessous : une ligne de cinq colonnes
 * n'est pas lisible sur un téléphone, et un tableau à défilement horizontal se
 * consulte mal au pouce.
 */
export function PortfolioTable({
  positions,
  locale,
  dict,
}: {
  positions: PositionView[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <>
      <table className="hidden w-full border-collapse md:table">
        <caption className="sr-only">{dict.portfolio.tableCaption}</caption>
        <thead>
          <tr className="border-b border-hairline text-left">
            <th scope="col" className="py-3 pr-4 text-[13px] font-medium text-ink-muted">
              {dict.portfolio.deal}
            </th>
            <th scope="col" className="py-3 pr-4 text-[13px] font-medium text-ink-muted">
              {dict.portfolio.subscribedOn}
            </th>
            <th
              scope="col"
              className="py-3 pr-4 text-right text-[13px] font-medium text-ink-muted"
            >
              {dict.portfolio.invested}
            </th>
            <th
              scope="col"
              className="py-3 pr-4 text-right text-[13px] font-medium text-ink-muted"
            >
              {dict.portfolio.value}
            </th>
            <th
              scope="col"
              className="py-3 text-right text-[13px] font-medium text-ink-muted"
            >
              {dict.portfolio.performance}
            </th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id} className="border-b border-hairline">
              <td className="py-4 pr-4">
                <p className="font-medium text-navy">{position.dealName}</p>
                <p className="mt-0.5 text-[13px] text-ink-faint">{position.sector}</p>
              </td>
              <td className="tabular py-4 pr-4 font-mono text-[14px] text-ink-muted">
                {formatShortDate(position.investedAt, locale)}
              </td>
              <td className="tabular py-4 pr-4 text-right font-mono text-[14px] text-navy">
                {formatCurrency(position.amountInvested, locale)}
              </td>
              <td className="tabular py-4 pr-4 text-right font-mono text-[14px] text-navy">
                {formatCurrency(position.currentValue, locale)}
              </td>
              <td
                className={cn(
                  'tabular py-4 text-right font-mono text-[14px] font-medium',
                  position.performance >= 0 ? 'text-emerald-700' : 'text-red-700',
                )}
              >
                {formatPercent(position.performance, locale)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Repli mobile : une carte par participation. */}
      <ul className="flex flex-col gap-4 md:hidden">
        {positions.map((position) => (
          <li key={position.id} className="rounded-card border border-hairline bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-navy">{position.dealName}</p>
                <p className="mt-0.5 text-[13px] text-ink-faint">{position.sector}</p>
              </div>
              <StatusBadge status={position.status} dict={dict} />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-hairline pt-4">
              <div>
                <dt className="text-[13px] text-ink-muted">
                  {dict.portfolio.investedShort}
                </dt>
                <dd className="tabular mt-1 font-mono text-[14px] text-navy">
                  {formatCurrency(position.amountInvested, locale)}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-ink-muted">
                  {dict.portfolio.currentValue}
                </dt>
                <dd className="tabular mt-1 font-mono text-[14px] text-navy">
                  {formatCurrency(position.currentValue, locale)}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-ink-muted">
                  {dict.portfolio.subscribedOn}
                </dt>
                <dd className="tabular mt-1 font-mono text-[14px] text-ink-muted">
                  {formatShortDate(position.investedAt, locale)}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-ink-muted">
                  {dict.portfolio.performance}
                </dt>
                <dd
                  className={cn(
                    'tabular mt-1 font-mono text-[14px] font-medium',
                    position.performance >= 0 ? 'text-emerald-700' : 'text-red-700',
                  )}
                >
                  {formatPercent(position.performance, locale)}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
