import type { Metadata } from 'next';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { InvestmentForm } from '@/components/admin/InvestmentForm';
import { listInvestorOptions, listDealOptions } from '@/lib/admin';
import { createInvestment } from '../actions';
import type { Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function NewInvestmentPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const [investors, deals] = await Promise.all([listInvestorOptions(), listDealOptions()]);

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader title="Nouvelle participation" />
      <div className="mt-8 max-w-2xl">
        <InvestmentForm
          locale={params.locale}
          action={createInvestment}
          investors={investors}
          deals={deals}
        />
      </div>
    </div>
  );
}
