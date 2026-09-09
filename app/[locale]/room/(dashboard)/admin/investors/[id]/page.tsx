import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { UserForm } from '@/components/admin/UserForm';
import { getUserAdmin } from '@/lib/admin';
import { updateUser } from '../actions';
import type { Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function EditUserPage({
  params,
}: {
  params: { locale: Locale; id: string };
}) {
  const user = await getUserAdmin(params.id);
  if (!user) notFound();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader title={user.name} />
      <div className="mt-8 max-w-2xl">
        <UserForm
          locale={params.locale}
          action={updateUser.bind(null, user.id)}
          user={{
            name: user.name,
            email: user.email,
            company: user.company ?? '',
            jurisdiction: user.jurisdiction ?? '',
            role: user.role,
          }}
        />
      </div>
    </div>
  );
}
