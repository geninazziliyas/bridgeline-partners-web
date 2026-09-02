import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { Wordmark } from '@/components/layout/Wordmark';
import { getDictionary, defaultLocale, localizedPath } from '@/lib/i18n';

/**
 * Page 404.
 *
 * Rendue hors du chrome public, qui vit dans le groupe (public). Next ne
 * transmet pas les paramètres de route à not-found : la page s'affiche donc
 * dans la langue par défaut.
 */
export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-canvas px-5 text-center">
      <Link href={localizedPath(defaultLocale, '/')} aria-label={dict.nav.homeAria}>
        <Wordmark />
      </Link>

      <h1 className="mt-10 font-display text-3xl font-extrabold text-navy md:text-4xl">
        {dict.notFound.title}
      </h1>
      <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-ink-muted">
        {dict.notFound.body}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={localizedPath(defaultLocale, '/')} size="lg">
          {dict.common.backHome}
        </ButtonLink>
        <ButtonLink
          href={localizedPath(defaultLocale, '/contact')}
          variant="secondary"
          size="lg"
        >
          {dict.common.contact}
        </ButtonLink>
      </div>
    </div>
  );
}
