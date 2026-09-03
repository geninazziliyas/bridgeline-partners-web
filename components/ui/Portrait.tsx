import Image from 'next/image';

import { initials } from '@/lib/utils';
import { cn } from '@/lib/utils';

/** Tailles utilisées : aperçu sur l'accueil, fiche sur la page équipe. */
const sizes = {
  sm: { box: 'h-24 w-24', px: 96, text: 'text-lg' },
  md: { box: 'h-32 w-32 md:h-40 md:w-40', px: 160, text: 'text-2xl' },
} as const;

/**
 * Portrait d'un membre de l'équipe, à taille fixe.
 *
 * Deux raisons de ne pas laisser l'image s'étirer : un portrait qui occupe
 * toute la largeur écrase le reste de la fiche sur mobile, et les photos
 * fournies n'ont pas toutes la même résolution, donc une taille contrainte
 * evite qu'une image de faible définition soit agrandie.
 *
 * Sans photo, affiche les initiales sur un aplat navy. C'est volontaire :
 * pointer un fichier absent afficherait une image cassée sur le site en ligne.
 */
export function Portrait({
  name,
  photo,
  alt,
  size = 'md',
  className,
}: {
  name: string;
  photo: string | null;
  alt: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-card border border-hairline bg-navy',
        s.box,
        className,
      )}
    >
      {photo ? (
        <Image
          src={photo}
          alt={alt}
          fill
          sizes={`${s.px}px`}
          quality={90}
          className="object-cover object-top"
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            'flex h-full w-full items-center justify-center font-display font-bold tracking-tight text-white/70',
            s.text,
          )}
        >
          {initials(name)}
        </span>
      )}
    </div>
  );
}
