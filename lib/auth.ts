import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';

import { prisma } from '@/lib/prisma';
import { sendMagicLinkEmail } from '@/lib/email';
import { loginSchema } from '@/lib/validations';
import { defaultLocale } from '@/lib/i18n/config';

/**
 * Hash bcrypt d'une valeur arbitraire, compare lorsqu'aucun compte ne
 * correspond a l'email saisi. Le temps de reponse reste ainsi constant, qu'un
 * compte existe ou non, ce qui empeche d'enumerer les investisseurs.
 */
const DUMMY_HASH = '$2a$12$C6UzMDM.H6dfI/f/IKcEe.7Nk7NrJ0DIY6mQBBrwCBLxHqzZQOwqK';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  // Strategie JWT : obligatoire des lors qu'un provider Credentials est utilise.
  // Les liens magiques restent stockes en base via VerificationToken.
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 8, // 8 heures
  },

  /**
   * Pages de NextAuth. Elles portent la langue par défaut : ce sont des
   * redirections internes de la librairie (lien magique expiré, erreur de
   * provider), pour lesquelles NextAuth ne connaît pas la langue de la page
   * d'origine. Les redirections déclenchées par une navigation, elles, sont
   * gérées par le middleware, qui conserve la langue courante.
   */
  pages: {
    signIn: `/${defaultLocale}/room/login`,
    verifyRequest: `/${defaultLocale}/room/login?verify=1`,
    error: `/${defaultLocale}/room/login`,
  },

  providers: [
    CredentialsProvider({
      name: 'Email et mot de passe',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        });

        // Toujours executer une comparaison bcrypt, meme sans compte trouve.
        const valid = await compare(
          parsed.data.password,
          user?.passwordHash ?? DUMMY_HASH,
        );

        if (!user || !user.passwordHash || !valid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
        };
      },
    }),

    EmailProvider({
      from: process.env.EMAIL_FROM,
      maxAge: 60 * 60 * 24, // lien valable 24 heures
      async sendVerificationRequest({ identifier, url }) {
        await sendMagicLinkEmail(identifier, url);
      },
    }),
  ],

  callbacks: {
    /**
     * Le lien magique ne doit ouvrir une session que pour un compte deja
     * provisionne par l'equipe : une demande d'acces ne cree jamais de compte.
     */
    async signIn({ user, account }) {
      if (account?.provider !== 'email') return true;
      if (!user.email) return false;

      const existing = await prisma.user.findUnique({
        where: { email: user.email },
      });
      return Boolean(existing);
    },

    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
        token.role = user.role ?? 'INVESTOR';
        token.company = user.company ?? null;
        return token;
      }

      // Rafraichit le role et la societe a chaque rotation du token, pour que
      // les changements cote base soient repercutes sans reconnexion.
      if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true, name: true, role: true, company: true },
        });
        if (dbUser) {
          token.uid = dbUser.id;
          token.name = dbUser.name;
          token.role = dbUser.role;
          token.company = dbUser.company;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.role = (token.role as 'INVESTOR' | 'ADMIN') ?? 'INVESTOR';
        session.user.company = (token.company as string | null) ?? null;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

/** Session cote serveur, dans les Server Components et les server actions. */
export function auth() {
  return getServerSession(authOptions);
}
