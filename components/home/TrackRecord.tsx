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
                  className="flex items-baseline gap-3 border-r border-hairline px-8 py-2"
                >
                  <span className="whitespace-nowrap font-display text-lg font-semibold text-navy">
                    {entry.name}
                  </span>
                  <span className="tabular font-mono text-[13px] text-ink-faint">
                    {entry.year}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
