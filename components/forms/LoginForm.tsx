'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState, type FormEvent } from 'react';
import { CircleNotch, EnvelopeSimple } from '@phosphor-icons/react';

import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Field';
import { FormFeedback } from '@/components/forms/FormFeedback';
import type { FormState } from '@/lib/validations';
import type { Dictionary } from '@/lib/i18n';

/**
 * Connexion à la Room. Deux chemins pour un même compte :
 * mot de passe (provider Credentials) ou lien de connexion par email
 * (provider Email). Les deux exigent un compte déjà provisionné.
 */
export function LoginForm({
  callbackUrl,
  dict,
}: {
  callbackUrl: string;
  dict: Dictionary;
}) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<FormState>({ status: 'idle' });
  const [pending, setPending] = useState<'password' | 'link' | null>(null);

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending('password');
    setState({ status: 'idle' });

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setPending(null);

    if (!result || result.error) {
      // Message volontairement identique quel que soit le motif : il ne doit
      // pas permettre de déterminer si un compte existe.
      setState({
        status: 'error',
        message: dict.login.errors.CredentialsSignin,
      });
      return;
    }

    router.push(result.url ?? callbackUrl);
    router.refresh();
  }

  async function handleMagicLink() {
    if (!email.trim()) {
      setState({ status: 'error', message: dict.login.magicLinkNeedsEmail });
      return;
    }

    setPending('link');
    setState({ status: 'idle' });

    const result = await signIn('email', { email, redirect: false, callbackUrl });

    setPending(null);

    setState(
      result?.error
        ? { status: 'error', message: dict.login.magicLinkFailed }
        : { status: 'success', message: dict.login.magicLinkSent },
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <FormFeedback state={state} />

      <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-5" noValidate>
        <Field id="login-email" label={dict.login.email}>
          <Input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Field>

        <Field id="login-password" label={dict.login.password}>
          <Input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Field>

        <Button type="submit" size="lg" disabled={pending !== null}>
          {pending === 'password' ? (
            <>
              <CircleNotch size={17} weight="bold" className="animate-spin" />
              {dict.login.signingIn}
            </>
          ) : (
            dict.common.signIn
          )}
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-hairline" />
        <span className="text-[13px] text-ink-faint">{dict.login.or}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <Button
        type="button"
        variant="secondary"
        size="lg"
        onClick={handleMagicLink}
        disabled={pending !== null}
      >
        {pending === 'link' ? (
          <>
            <CircleNotch size={17} weight="bold" className="animate-spin" />
            {dict.login.sendingLink}
          </>
        ) : (
          <>
            <EnvelopeSimple size={17} weight="regular" />
            {dict.login.magicLink}
          </>
        )}
      </Button>
    </div>
  );
}
