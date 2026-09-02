import { StatusBadge } from '@/components/ui/StatusBadge';
import type { PositionView } from '@/lib/portfolio';
import { cn, formatCurrency, formatPercent, formatShortDate } from '@/lib/utils';

/**
 * Participations de l'investisseur.
 *
 * Tableau au-dela de md, liste empilee en dessous : une ligne de sept colonnes
 * n'est pas lisible sur un telephone, et un tableau a defilement horizontal se
 * consulte mal au pouce.
 */
export function PortfolioTable({ positions }: { positions: PositionView[] }) {
  return (
    <>
      <table className="hidden w-full border-collapse md:table">
        <caption className="sr-only">
          Vos participations, montant investi, valorisation et performance
        </caption>
        <thead>
          <tr className="border-b border-hairline text-left">
            <th scope="col" className="py-3 pr-4 text-[13px] font-medium text-ink-muted">
              Operation
            </th>
            <th scope="col" className="py-3 pr-4 text-[13px] font-medium text-ink-muted">
              Souscrit le
            </th>
            <th
              scope="col"
              className="py-3 pr-4 text-right text-[13px] font-medium text-ink-muted"
            >
              Montant investi
            </th>
            <th
              scope="col"
              className="py-3 pr-4 text-right text-[13px] font-medium text-ink-muted"
            >
              Valeur actuelle
            </th>
            <th
              scope="col"
              className="py-3 text-right text-[13px] font-medium text-ink-muted"
            >
              Performance
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
                {formatShortDate(position.investedAt)}
              </td>
              <td className="tabular py-4 pr-4 text-right font-mono text-[14px] text-navy">
                {formatCurrency(position.amountInvested)}
              </td>
              <td className="tabular py-4 pr-4 text-right font-mono text-[14px] text-navy">
                {formatCurrency(position.currentValue)}
              </td>
              <td
                className={cn(
                  'tabular py-4 text-right font-mono text-[14px] font-medium',
                  position.performance >= 0 ? 'text-emerald-700' : 'text-red-700',
                )}
              >
                {formatPercent(position.performance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Repli mobile : une carte par participation. */}
      <ul className="flex flex-col gap-4 md:hidden">
        {positions.map((position) => (
          <li
            key={position.id}
            className="rounded-card border border-hairline bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-navy">{position.dealName}</p>
                <p className="mt-0.5 text-[13px] text-ink-faint">{position.sector}</p>
              </div>
              <StatusBadge status={position.status} />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-hairline pt-4">
              <div>
                <dt className="text-[13px] text-ink-muted">Investi</dt>
                <dd className="tabular mt-1 font-mono text-[14px] text-navy">
                  {formatCurrency(position.amountInvested)}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-ink-muted">Valeur actuelle</dt>
                <dd className="tabular mt-1 font-mono text-[14px] text-navy">
                  {formatCurrency(position.currentValue)}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-ink-muted">Souscrit le</dt>
                <dd className="tabular mt-1 font-mono text-[14px] text-ink-muted">
                  {formatShortDate(position.investedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] text-ink-muted">Performance</dt>
                <dd
                  className={cn(
                    'tabular mt-1 font-mono text-[14px] font-medium',
                    position.performance >= 0 ? 'text-emerald-700' : 'text-red-700',
                  )}
                >
                  {formatPercent(position.performance)}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
