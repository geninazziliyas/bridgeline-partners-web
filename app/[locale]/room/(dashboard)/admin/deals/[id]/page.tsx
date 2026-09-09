import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RoomPageHeader } from '@/components/room/RoomPageHeader';
import { DealForm } from '@/components/admin/DealForm';
import { getDealAdmin } from '@/lib/admin';
import { updateDeal } from '../actions';
import type { Locale } from '@/lib/i18n/config';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

/** Date -> "YYYY-MM-DD", format attendu par un input type="date". */
function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function EditDealPage({
  params,
}: {
  params: { locale: Locale; id: string };
}) {
  const deal = await getDealAdmin(params.id);
  if (!deal) notFound();

  return (
    <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <RoomPageHeader title={deal.name} />
      <div className="mt-8 max-w-3xl">
        <DealForm
          locale={params.locale}
          action={updateDeal.bind(null, deal.id)}
          deal={{
            name: deal.name,
            slug: deal.slug,
            summary: deal.summary,
            description: deal.description,
            sector: deal.sector,
            geography: deal.geography,
            summaryEn: deal.summaryEn ?? '',
            descriptionEn: deal.descriptionEn ?? '',
            sectorEn: deal.sectorEn ?? '',
            geographyEn: deal.geographyEn ?? '',
            currency: deal.currency,
            status: deal.status,
            targetAmount: Number(deal.targetAmount),
            raisedAmount: Number(deal.raisedAmount),
            minTicket: Number(deal.minTicket),
            closingDate: toDateInputValue(deal.closingDate),
            featured: deal.featured,
          }}
        />
      </div>
    </div>
  );
}
