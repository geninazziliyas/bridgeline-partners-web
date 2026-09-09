import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { localizedPath, type Locale } from '@/lib/i18n';

/**
 * Deuxième barrière, au-dessus de celle du layout (dashboard) parent : celle-ci
 * garantit qu'un compte INVESTOR authentifié ne peut pas atteindre les pages
 * d'administration, même en tapant l'URL directement.
 */
export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const session = await auth();

  if (session?.user.role !== 'ADMIN') {
    redirect(localizedPath(params.locale, '/room/dashboard'));
  }

  return <>{children}</>;
}
