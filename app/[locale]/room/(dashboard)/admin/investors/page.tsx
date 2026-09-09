import type { Metadata } from 'next';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { listUsersAdmin } from '@/lib/admin';
import { deleteUser } from './actions';
import { formatShortDate } from '@/lib/utils';
import { localizedPath, type Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminInvestorsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const users = await listUsersAdmin();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Comptes"
        lead="Investisseurs et membres de l'équipe ayant accès à la Room."
        action={
          <ButtonLink href={localizedPath(params.locale, '/room/admin/investors/new')}>
            Nouveau compte
          </ButtonLink>
        }
      />

      {users.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Aucun compte"
            body="Créez le premier compte pour donner accès à la Room."
          />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-card border border-hairline bg-white">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-hairline bg-canvas">
                <th className="px-5 py-3 font-medium text-ink-muted">Nom</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Email</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Rôle</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Participations</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Depuis</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-hairline last:border-0">
                  <td className="px-5 py-4">
                    <p className="font-medium text-navy">{user.name}</p>
                    {user.company ? (
                      <p className="text-[13px] text-ink-faint">{user.company}</p>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{user.email}</td>
                  <td className="px-5 py-4 text-ink-muted">
                    {user.role === 'ADMIN' ? 'Administrateur' : 'Investisseur'}
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {user._count.investments}
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {formatShortDate(user.createdAt, params.locale)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <ButtonLink
                        href={localizedPath(
                          params.locale,
                          `/room/admin/investors/${user.id}`,
                        )}
                        variant="ghost"
                        size="sm"
                      >
                        Modifier
                      </ButtonLink>
                      <form action={deleteUser.bind(null, user.id)}>
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
