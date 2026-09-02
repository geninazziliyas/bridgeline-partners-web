import { Hero } from '@/components/home/Hero';
import { AboutIntro } from '@/components/home/AboutIntro';
import { TwoEntries } from '@/components/home/TwoEntries';
import { Approach } from '@/components/home/Approach';
import { Advantages } from '@/components/home/Advantages';
import { TeamPreview } from '@/components/home/TeamPreview';
import { OpportunitiesPreview } from '@/components/home/OpportunitiesPreview';
import { TrackRecord } from '@/components/home/TrackRecord';
import { RoomCta } from '@/components/home/RoomCta';

/**
 * Page d'accueil.
 *
 * Rendue statiquement et revalidee toutes les cinq minutes : seul l'apercu des
 * operations depend de la base, et cette fraicheur suffit pour un site vitrine.
 */
export const revalidate = 300;

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <TwoEntries />
      <Approach />
      <Advantages />
      <TeamPreview />
      <OpportunitiesPreview />
      <TrackRecord />
      <RoomCta />
    </>
  );
}
