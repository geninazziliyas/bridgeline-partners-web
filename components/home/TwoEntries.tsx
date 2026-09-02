import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

/**
 * Bloc a deux entrees. Deux panneaux de meme poids, l'un clair l'autre navy,
 * pour que le choix soit lisible d'un coup d'oeil sans hierarchiser l'un des
 * deux publics.
 */
const entries = [
  {
    href: '/room',
    title: 'Je veux investir',
    body: 'Accedez aux operations ouvertes, a leur documentation et au suivi de vos participations dans la Bridgeline Room.',
    action: 'Decouvrir la Room',
    tone: 'light' as const,
  },
  {
    href: '/contact',
    title: 'Je cherche du capital',
    body: 'Presentez votre operation. Nous revenons vers vous apres une premiere lecture du dossier, sous dix jours ouvres.',
    action: 'Presenter une operation',
    tone: 'dark' as const,
  },
];

export function TwoEntries() {
  return (
    // Section pleine largeur : la coupure au centre porte le choix, une
    // gouttiere de conteneur l'affaiblirait.
    <section className="border-b border-hairline">
      <div className="grid md:grid-cols-2">
        {entries.map((entry) => {
          const dark = entry.tone === 'dark';
          return (
            <Link
              key={entry.href}
              href={entry.href}
              className={[
                'group flex flex-col justify-between gap-10 p-10 transition-colors duration-200 lg:p-14',
                dark
                  ? 'bg-navy text-white hover:bg-navy-700'
                  : 'bg-white text-navy hover:bg-accent-soft',
              ].join(' ')}
            >
              <div>
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  {entry.title}
                </h2>
                <p
                  className={[
                    'mt-4 max-w-[46ch] text-[16px] leading-relaxed',
                    dark ? 'text-white/75' : 'text-ink-muted',
                  ].join(' ')}
                >
                  {entry.body}
                </p>
              </div>

              <span
                className={[
                  'inline-flex items-center gap-2 text-[15px] font-medium',
                  dark ? 'text-white' : 'text-accent',
                ].join(' ')}
              >
                {entry.action}
                <ArrowRight
                  size={17}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
