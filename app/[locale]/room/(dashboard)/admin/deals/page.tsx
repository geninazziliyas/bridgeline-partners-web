import type { Metadata } from 'next';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { listDealsAdmin } from '@/lib/admin';
import { deleteDeal } from './actions';
import { formatCurrency, formatShortDate } from '@/lib/utils';
import { localizedPath, type Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const statusLabels: Record<string, string> = {
  OPEN: 'Ouvert',
  CLOSING_SOON: 'Clôture proche',
  INVITE_ONLY: 'Sur invitation',
  CLOSED: 'Clôturé',
};

export default async function AdminDealsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const deals = await listDealsAdmin();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Opérations"
        lead="Créer et mettre à jour les opérations présentées dans la Room."
        action={
          <ButtonLink href={localizedPath(params.locale, '/room/admin/deals/new')}>
            Nouvelle opération
          </ButtonLink>
        }
      />

      {deals.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Aucune opération"
            body="Créez la première opération pour qu'elle apparaisse dans la Room."
          />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-card border border-hairline bg-white">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-hairline bg-canvas">
                <th className="px-5 py-3 font-medium text-ink-muted">Nom</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Statut</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Levé / Cible</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Clôture</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Mis en avant</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Newsletter</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <tr key={deal.id} className="border-b border-hairline last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-medium text-navy">{deal.name}</p>
                    <p className="text-[13px] text-ink-faint">{deal.slug}</p>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {statusLabels[deal.status]}
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {formatCurrency(Number(deal.raisedAmount), params.locale)} /{' '}
                    {formatCurrency(Number(deal.targetAmount), params.locale)}
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {formatShortDate(deal.closingDate, params.locale)}
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {deal.featured ? 'Oui' : '—'}
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {deal.newsletterUrl ? (
                      <a
                        href={deal.newsletterUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-accent hover:underline"
                      >
                        Lien
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <ButtonLink
                        href={localizedPath(
                          params.locale,
                          `/room/admin/deals/${deal.id}`,
                        )}
                        variant="ghost"
                        size="sm"
                      >
                        Modifier
                      </ButtonLink>
                      <form action={deleteDeal.bind(null, deal.id)}>
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
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
