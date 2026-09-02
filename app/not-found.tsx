import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { Wordmark } from '@/components/layout/Wordmark';

/** Page 404. Rendue hors du chrome public, qui vit dans le groupe (public). */
export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-canvas px-5 text-center">
      <Link href="/" aria-label="Bridgeline Partners, accueil">
        <Wordmark />
      </Link>

      <h1 className="mt-10 font-display text-3xl font-extrabold text-navy md:text-4xl">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-muted">
        Cette adresse ne correspond a aucune page du site. Elle a peut-etre ete
        deplacee, ou le lien qui vous a amene ici est incomplet.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Retour a l’accueil
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="lg">
          Nous contacter
        </ButtonLink>
      </div>
    </div>
  );
}
