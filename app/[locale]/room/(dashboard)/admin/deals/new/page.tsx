import type { Metadata } from 'next';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { DealForm } from '@/components/admin/DealForm';
import { createDeal } from '../actions';
import type { Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function NewDealPage({ params }: { params: { locale: Locale } }) {
  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader title="Nouvelle opération" />
      <div className="mt-8 max-w-3xl">
        <DealForm locale={params.locale} action={createDeal} />
      </div>
    </div>
  );
}
