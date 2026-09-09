import type { Metadata } from 'next';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { listInvestmentsAdmin } from '@/lib/admin';
import { deleteInvestment } from './actions';
import { formatCurrency, formatShortDate, performance, formatPercent } from '@/lib/utils';
import { localizedPath, type Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminInvestmentsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const investments = await listInvestmentsAdmin();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Participations"
        lead="Lier un investisseur à une opération et suivre sa valorisation."
        action={
          <ButtonLink href={localizedPath(params.locale, '/room/admin/investments/new')}>
            Nouvelle participation
          </ButtonLink>
        }
      />

      {investments.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Aucune participation"
            body="Liez un investisseur à une opération pour qu'elle apparaisse dans son portefeuille."
          />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-card border border-hairline bg-white">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-hairline bg-canvas">
                <th className="px-5 py-3 font-medium text-ink-muted">Investisseur</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Opération</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Investi</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Valorisation</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Performance</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Depuis</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => {
                const invested = Number(investment.amountInvested);
                const current = Number(investment.currentValue);
                return (
                  <tr key={investment.id} className="border-b border-hairline last:border-0">
                    <td className="px-5 py-4">
                      <p className="font-medium text-navy">{investment.user.name}</p>
                      <p className="text-[13px] text-ink-faint">{investment.user.email}</p>
                    </td>
                    <td className="px-5 py-4 text-ink-muted">{investment.deal.name}</td>
                    <td className="px-5 py-4 text-ink-muted">
                      {formatCurrency(invested, params.locale)}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {formatCurrency(current, params.locale)}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {formatPercent(performance(invested, current), params.locale)}
                    </td>
                    <td className="px-5 py-4 text-ink-muted">
                      {formatShortDate(investment.investedAt, params.locale)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-4">
                        <ButtonLink
                          href={localizedPath(
                            params.locale,
                            `/room/admin/investments/${investment.id}`,
                          )}
                          variant="ghost"
                          size="sm"
                        >
                          Modifier
                        </ButtonLink>
                        <form action={deleteInvestment.bind(null, investment.id)}>
                          <button
                            type="submit"
                            className="text-[14px] font-medium text-red-700 hover:underline"
                          >
                            Supprimer
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
