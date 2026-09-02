import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

import { auth } from '@/lib/auth';
import { Wordmark } from '@/components/layout/Wordmark';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { LoginForm } from '@/components/forms/LoginForm';
import { getDictionary, localizedPath, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: dict.login.title,
    description: dict.login.lead,
    robots: { index: false, follow: false },
  };
}

type SearchParams = {
  callbackUrl?: string;
  error?: string;
  verify?: string;
};

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: SearchParams;
}) {
  const dict = getDictionary(params.locale);

  const session = await auth();
  if (session) {
    redirect(localizedPath(params.locale, '/room/dashboard'));
  }

  // N'accepte qu'une destination interne : une URL absolue fournie par un tiers
  // transformerait la redirection post-connexion en redirection ouverte.
  const requested = searchParams.callbackUrl ?? '';
  const callbackUrl =
    requested.startsWith('/') && !requested.startsWith('//')
      ? requested
      : localizedPath(params.locale, '/room/dashboard');

  const errorKey = searchParams.error as keyof typeof dict.login.errors | undefined;
  const error = errorKey ? dict.login.errors[errorKey] : undefined;

  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-2">
      {/* Colonne de marque, masquée sous lg pour laisser toute la place au formulaire. */}
      <div className="hidden flex-col justify-between bg-navy p-12 text-white lg:flex">
        <Link
          href={localizedPath(params.locale, '/')}
          aria-label={dict.nav.homeAria}
        >
          <Wordmark tone="white" />
        </Link>
        <div>
          <p className="max-w-md font-display text-3xl font-bold leading-tight">
            {dict.login.brandTitle}
          </p>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/70">
            {dict.login.brandBody}
          </p>
        </div>
        <p className="text-[13px] text-white/50">{dict.login.offices}</p>
      </div>

      <div className="flex flex-col justify-center bg-white px-5 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="flex items-center justify-between gap-4">
            <Link
              href={localizedPath(params.locale, '/room')}
              className="inline-flex items-center gap-2 text-[14px] text-ink-muted transition-colors hover:text-accent"
            >
              <ArrowLeft size={15} weight="bold" />
              {dict.login.back}
            </Link>
            <LocaleSwitcher locale={params.locale} />
          </div>

          <h1 className="mt-8 font-display text-3xl font-extrabold text-navy">
            {dict.login.title}
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
            {dict.login.lead}
          </p>

          {error ? (
            <p
              role="alert"
              className="mt-6 rounded-control border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-800"
            >
              {error}
            </p>
          ) : null}

          {searchParams.verify ? (
            <p
              role="status"
              className="mt-6 rounded-control border border-accent/25 bg-accent-soft px-4 py-3 text-[15px] text-accent"
            >
              {dict.login.verifySent}
            </p>
          ) : null}

          <div className="mt-8">
            <LoginForm callbackUrl={callbackUrl} dict={dict} />
          </div>

          <p className="mt-8 text-[14px] leading-relaxed text-ink-muted">
            {dict.login.noAccount}{' '}
            <Link
              href={`${localizedPath(params.locale, '/room')}#demander-l-acces`}
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              {dict.common.requestAccess}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
