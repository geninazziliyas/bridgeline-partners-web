import { Hero } from '@/components/home/Hero';
import { AboutIntro } from '@/components/home/AboutIntro';
import { TwoEntries } from '@/components/home/TwoEntries';
import { Approach } from '@/components/home/Approach';
import { Advantages } from '@/components/home/Advantages';
import { TeamPreview } from '@/components/home/TeamPreview';
import { OpportunitiesPreview } from '@/components/home/OpportunitiesPreview';
import { TrackRecord } from '@/components/home/TrackRecord';
import { RoomCta } from '@/components/home/RoomCta';
import { getDictionary, type Locale } from '@/lib/i18n';

/**
 * Page d'accueil.
 *
 * Rendue statiquement et revalidée toutes les cinq minutes : seul l'aperçu des
 * opérations dépend de la base, et cette fraîcheur suffit pour un site vitrine.
 */
export const revalidate = 300;

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const locale = params.locale;

  return (
    <>
      <Hero locale={locale} dict={dict} />
      <AboutIntro locale={locale} dict={dict} />
      <TwoEntries locale={locale} dict={dict} />
      <Approach dict={dict} />
      <Advantages dict={dict} />
      <TeamPreview locale={locale} dict={dict} />
      <OpportunitiesPreview locale={locale} dict={dict} />
      <TrackRecord dict={dict} />
      <RoomCta locale={locale} dict={dict} />
    </>
  );
}
