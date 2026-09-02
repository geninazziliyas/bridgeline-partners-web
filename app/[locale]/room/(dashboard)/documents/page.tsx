import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { getDocuments } from '@/lib/portfolio';
import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { DocumentList } from '@/components/room/DocumentList';
import { EmptyState } from '@/components/room/EmptyState';
import { ButtonLink } from '@/components/ui/Button';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  return {
    title: getDictionary(params.locale).documents.title,
    robots: { index: false, follow: false },
  };
}

export const dynamic = 'force-dynamic';

export default async function DocumentsPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);
  const locale = params.locale;

  const session = await auth();
  if (!session?.user) redirect(localizedPath(locale, '/room/login'));

  const documents = await getDocuments(session.user.id);

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader title={dict.documents.title} lead={dict.documents.lead} />

      {documents.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            title={dict.documents.emptyTitle}
            body={dict.documents.emptyBody}
            action={
              <ButtonLink
                href={localizedPath(locale, '/contact')}
                variant="secondary"
                size="md"
              >
                {dict.common.contact}
              </ButtonLink>
            }
          />
        </div>
      ) : (
        <div className="mt-8">
          <DocumentList documents={documents} locale={locale} dict={dict} />
        </div>
      )}
    </div>
  );
}
