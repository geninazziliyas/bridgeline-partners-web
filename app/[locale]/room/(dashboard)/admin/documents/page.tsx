import type { Metadata } from 'next';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { listDocumentsAdmin } from '@/lib/admin';
import { deleteDocument } from './actions';
import { formatShortDate, formatBytes } from '@/lib/utils';
import { fr } from '@/lib/i18n/dictionaries/fr';
import { localizedPath, type Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminDocumentsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const documents = await listDocumentsAdmin();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Documents"
        lead="Rapports, term sheets et relevés consultables dans la Room."
        action={
          <ButtonLink href={localizedPath(params.locale, '/room/admin/documents/new')}>
            Nouveau document
          </ButtonLink>
        }
      />

      {documents.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Aucun document"
            body="Ajoutez un document pour qu'il apparaisse dans la Room."
          />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-card border border-hairline bg-white">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-hairline bg-canvas">
                <th className="px-5 py-3 font-medium text-ink-muted">Titre</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Type</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Rattaché à</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Taille</th>
                <th className="px-5 py-3 font-medium text-ink-muted">Ajouté le</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id} className="border-b border-hairline last:border-0">
                  <td className="px-5 py-4">
                    <a
                      href={document.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-navy hover:underline"
                    >
                      {document.title}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-ink-muted">{fr.documentType[document.type]}</td>
                  <td className="px-5 py-4 text-ink-muted">
                    {document.deal?.name ?? document.user?.name ?? '—'}
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {formatBytes(document.sizeBytes, params.locale) ?? '—'}
                  </td>
                  <td className="px-5 py-4 text-ink-muted">
                    {formatShortDate(document.createdAt, params.locale)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <form action={deleteDocument.bind(null, document.id)}>
                      <button
                        type="submit"
                        className="text-[14px] font-medium text-red-700 hover:underline"
                      >
                        Supprimer
                      </button>
                    </form>
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
