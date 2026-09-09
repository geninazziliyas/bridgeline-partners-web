import type { Metadata } from 'next';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { UserForm } from '@/components/admin/UserForm';
import { createUser } from '../actions';
import type { Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function NewUserPage({ params }: { params: { locale: Locale } }) {
  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader title="Nouveau compte" />
      <div className="mt-8 max-w-2xl">
        <UserForm locale={params.locale} action={createUser} />
      </div>
    </div>
  );
}
