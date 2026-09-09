import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { InvestmentForm } from '@/components/admin/InvestmentForm';
import { getInvestmentAdmin, listInvestorOptions, listDealOptions } from '@/lib/admin';
import { updateInvestment } from '../actions';
import type { Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function EditInvestmentPage({
  params,
}: {
  params: { locale: Locale; id: string };
}) {
  const [investment, investors, deals] = await Promise.all([
    getInvestmentAdmin(params.id),
    listInvestorOptions(),
    listDealOptions(),
  ]);
  if (!investment) notFound();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader title="Modifier la participation" />
      <div className="mt-8 max-w-2xl">
        <InvestmentForm
          locale={params.locale}
          action={updateInvestment.bind(null, investment.id)}
          investors={investors}
          deals={deals}
          investment={{
            userId: investment.userId,
            dealId: investment.dealId,
            amountInvested: Number(investment.amountInvested),
            currentValue: Number(investment.currentValue),
            investedAt: toDateInputValue(investment.investedAt),
          }}
        />
      </div>
    </div>
  );
}
