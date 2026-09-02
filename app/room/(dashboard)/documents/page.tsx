import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { getDocuments } from '@/lib/portfolio';
import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { DocumentList } from '@/components/room/DocumentList';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Documents',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function DocumentsPage() {
  const session = await auth();
  if (!session?.user) redirect('/room/login');

  const documents = await getDocuments(session.user.id);

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader
        title="Documents"
        lead="Les rapports, term sheets et releves rattaches a votre compte et aux operations que vous avez souscrites."
      />

      {documents.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title="Aucun document disponible"
            body="Vos rapports periodiques et releves apparaitront ici. Ils sont deposes par notre equipe au fil des echeances."
            action={
              <ButtonLink href="/contact" variant="secondary" size="md">
                Nous contacter
              </ButtonLink>
            }
          />
        </div>
      ) : (
        <div className="mt-8">
          <DocumentList documents={documents} />
        </div>
      )}
    </div>
  );
}
