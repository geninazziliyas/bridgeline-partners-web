import type { Metadata } from 'next';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { EmptyState } from '@/components/room/EmptyState';
import { listAccessRequestsAdmin } from '@/lib/admin';
import { approveAccessRequest, rejectAccessRequest } from './actions';
import { formatShortDate } from '@/lib/utils';
import { fr } from '@/lib/i18n/dictionaries/fr';
import type { Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const statusLabels: Record<string, string> = {
  PENDING: 'En attente',
  APPROVED: 'Approuvée',
  REJECTED: 'Rejetée',
};

export default async function AdminAccessRequestsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const requests = await listAccessRequestsAdmin();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Demandes d'accès"
        lead="Approuver crée directement le compte investisseur (connexion par lien magique)."
      />

      {requests.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Aucune demande"
            body="Les demandes soumises depuis le formulaire public de la Room apparaîtront ici."
          />
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {requests.map((request) => (
            <li
              key={request.id}
              className="rounded-card border border-hairline bg-white p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-bold text-navy">
                    {request.firstName} {request.lastName}
                  </p>
                  <p className="mt-1 text-[14px] text-ink-muted">{request.email}</p>
                  {request.organisation ? (
                    <p className="text-[14px] text-ink-muted">{request.organisation}</p>
                  ) : null}
                  {request.investorType ? (
                    <p className="mt-1 text-[13px] text-ink-faint">
                      {fr.investorType[request.investorType]}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="text-[13px] text-ink-faint">
                    {formatShortDate(request.createdAt, params.locale)}
                  </span>
                  <span
                    className={
                      request.status === 'PENDING'
                        ? 'rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800'
                        : request.status === 'APPROVED'
                          ? 'rounded-full border border-accent/20 bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent'
                          : 'rounded-full border border-hairline bg-slate-100 px-2.5 py-1 text-xs font-medium text-ink-muted'
                    }
                  >
                    {statusLabels[request.status]}
                  </span>
                </div>
              </div>

              {request.message ? (
                <p className="mt-4 max-w-[70ch] text-[14px] leading-relaxed text-ink-muted">
                  {request.message}
                </p>
              ) : null}

              {request.status === 'PENDING' ? (
                <div className="mt-5 flex items-center gap-4 border-t border-hairline pt-4">
                  <form action={approveAccessRequest.bind(null, request.id)}>
                    <button
                      type="submit"
                      className="text-[14px] font-medium text-accent hover:underline"
                    >
                      Approuver et créer le compte
                    </button>
                  </form>
                  <form action={rejectAccessRequest.bind(null, request.id)}>
                    <button
                      type="submit"
                      className="text-[14px] font-medium text-red-700 hover:underline"
                    >
                      Rejeter
                    </button>
                  </form>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
