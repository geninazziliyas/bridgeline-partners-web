import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { getDictionary, type Locale } from '@/lib/i18n';

/**
 * Les pages de présentation de la Room restent des pages publiques : elles
 * portent le même chrome que le reste du site vitrine.
 */
export default function RoomPublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <PublicHeader locale={params.locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <PublicFooter locale={params.locale} dict={dict} />
    </div>
  );
}
