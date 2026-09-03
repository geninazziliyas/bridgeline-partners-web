import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { trackRecord } from '@/lib/site';
import type { Dictionary } from '@/lib/i18n';

/**
 * Bandeau des investissements passés.
 *
 * Défilement horizontal continu : c'est le seul de la page, et il sert à
 * montrer l'étendue de la liste sans l'étaler sur toute la hauteur. La bande est
 * dupliquée une fois pour que la boucle soit sans raccord, et la copie est
 * masquée aux lecteurs d'écran. L'animation s'arrête sous prefers-reduced-motion
 * (voir globals.css) et au survol.
 *
 * Chaque entrée affiche son logo s'il est fourni, sinon son nom en typographie
 * display. Le mélange des deux reste lisible : la hauteur des blocs est fixe.
 */
export function TrackRecord({ dict }: { dict: Dictionary }) {
  return (
    <section className="overflow-hidden border-b border-hairline bg-white py-16 lg:py-20">
      <Container>
        <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
          {dict.home.trackRecord.title}
        </h2>
      </Container>

      <div className="group relative mt-10 flex overflow-hidden">
        {/* Dégradés latéraux : la bande entre et sort du champ sans coupure nette. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"
        />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {trackRecord.map((entry) => (
                <li
                  key={`${copy}-${entry.name}`}
                  className="flex h-12 items-center border-r border-hairline px-9"
                >
                  {entry.logo ? (
                    // Logos officiels en couleurs réelles : c'est ce qui se
                    // fait sur un mur de logos "trusted by", pas de teinte
                    // monochrome imposée. width/height ne fixent que le ratio
                    // transmis à Next, w-auto pilote la taille affichée.
                    <Image
                      src={entry.logo}
                      alt={entry.name}
                      width={160}
                      height={40}
                      className="h-7 w-auto object-contain"
                    />
                  ) : (
                    // Meme couleur et meme hauteur optique que les logos, pour
                    // que la bande se lise comme un seul ensemble.
                    <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-navy">
                      {entry.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
