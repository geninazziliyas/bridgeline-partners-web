import Image from 'next/image';

import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Marque nominale.
 *
 * Tant que `site.logo` vaut null, affiche un glyphe dessiné à la main (deux
 * appuis reliés par un tablier) plus le nom en texte. Une fois le logo
 * officiel déposé, cette version disparaît au profit de l'image.
 *
 * Le logo officiel est en couleurs sombres sur fond transparent, illisible
 * sur les fonds navy (entête, pied de page, menu latéral) qui composent la
 * majorité de ses usages sur ce site. Plutôt que demander une seconde
 * version blanche, `tone="white"` le convertit en silhouette blanche par
 * filtre CSS (`brightness-0 invert`) : fonctionne quelles que soient ses
 * couleurs d'origine, sans dépendre d'un second fichier.
 */
export function Wordmark({
  tone = 'navy',
  className,
}: {
  tone?: 'navy' | 'white';
  className?: string;
}) {
  const color = tone === 'white' ? 'text-white' : 'text-navy';

  if (site.logo) {
    return (
      <Image
        src={site.logo}
        alt={site.name}
        width={220}
        height={52}
        priority
        // w-auto conserve les proportions réelles du fichier : width/height
        // ci-dessus ne servent qu'à Next, pas au rendu final.
        className={cn(
          'h-7 w-auto object-contain',
          tone === 'white' && 'brightness-0 invert',
          className,
        )}
      />
    );
  }

  return (
    <span className={cn('inline-flex items-center gap-2.5', color, className)}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="square"
      >
        <path d="M3 15h18" />
        <path d="M7 15V8" />
        <path d="M17 15V8" />
        <path d="M3 20h18" opacity={0.45} />
      </svg>
      <span className="font-display text-[17px] font-extrabold leading-none tracking-tight">
        Bridgeline
        <span className="font-semibold opacity-70"> Partners</span>
      </span>
    </span>
  );
}
