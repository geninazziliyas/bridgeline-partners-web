import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

import { auth } from '@/lib/auth';
import { Wordmark } from '@/components/layout/Wordmark';
import { LoginForm } from '@/components/forms/LoginForm';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Connexion a la Bridgeline Room.',
  robots: { index: false, follow: false },
};

type SearchParams = {
  callbackUrl?: string;
  error?: string;
  verify?: string;
};

/** Messages d'erreur renvoyes par NextAuth via la query string. */
const errorMessages: Record<string, string> = {
  CredentialsSignin: 'Identifiants invalides, ou compte sans acces a la Room.',
  AccessDenied:
    'Cette adresse n’est associee a aucun compte. Demandez un acces depuis la page de la Room.',
  Verification: 'Ce lien de connexion a expire ou a deja ete utilise.',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await auth();
  if (session) {
    redirect('/room/dashboard');
  }

  // N'accepte qu'une destination interne : une URL absolue fournie par un tiers
  // transformerait la redirection post-connexion en redirection ouverte.
  const requested = searchParams.callbackUrl ?? '';
  const callbackUrl =
    requested.startsWith('/') && !requested.startsWith('//')
      ? requested
      : '/room/dashboard';

  const error = searchParams.error ? errorMessages[searchParams.error] : undefined;

  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-2">
      {/* Colonne de marque, masquee sous lg pour laisser toute la place au formulaire. */}
      <div className="hidden flex-col justify-between bg-navy p-12 text-white lg:flex">
        <Link href="/" aria-label="Bridgeline Partners, accueil">
          <Wordmark tone="white" />
        </Link>
        <div>
          <p className="max-w-md font-display text-3xl font-bold leading-tight">
            Vos operations et votre portefeuille, au meme endroit.
          </p>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/70">
            L’acces a la Bridgeline Room est reserve aux investisseurs
            professionnels dont le compte a ete ouvert par notre equipe.
          </p>
        </div>
        <p className="text-[13px] text-white/50">Luxembourg et Geneve.</p>
      </div>

      <div className="flex flex-col justify-center bg-white px-5 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link
            href="/room"
            className="inline-flex items-center gap-2 text-[14px] text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={15} weight="bold" />
            Retour a la presentation
          </Link>

          <h1 className="mt-8 font-display text-3xl font-extrabold text-navy">
            Connexion
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">
            Saisissez vos identifiants, ou demandez un lien de connexion a usage
            unique.
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
              Consultez votre boite email : le lien de connexion vient d’etre
              envoye.
            </p>
          ) : null}

          <div className="mt-8">
            <LoginForm callbackUrl={callbackUrl} />
          </div>

          <p className="mt-8 text-[14px] leading-relaxed text-ink-muted">
            Pas encore de compte ?{' '}
            <Link
              href="/room#demander-l-acces"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Demander l’acces
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
