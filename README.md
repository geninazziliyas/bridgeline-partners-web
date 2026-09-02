# Bridgeline Partners

Site vitrine et espace investisseurs ("Bridgeline Room") de Bridgeline Partners.

- **Site public** : accueil, a propos, equipe, contact.
- **Bridgeline Room** : page de presentation publique, authentification, puis
  vue d'ensemble, opportunites, portefeuille et documents derriere la session.

---

## Stack

| Brique | Choix |
| --- | --- |
| Framework | Next.js 14 (App Router), TypeScript |
| Styles | Tailwind CSS 3.4, tokens dans `tailwind.config.ts` |
| Base de donnees | PostgreSQL via Prisma 5 |
| Authentification | NextAuth 4 (Credentials + lien magique), adapter Prisma |
| Emails | Resend |
| Icones | Phosphor Icons |
| Polices | Manrope (titres), Inter (corps), IBM Plex Mono (chiffres), via `next/font` |

---

## Demarrage rapide

```bash
# 1. Dependances
npm install

# 2. Variables d'environnement
cp .env.example .env
# puis renseigner DATABASE_URL, NEXTAUTH_SECRET, RESEND_API_KEY...

# 3. Base de donnees (voir section suivante) puis schema + donnees de demo
npm run db:push
npm run db:seed

# 4. Serveur de developpement
npm run dev
```

L'application est disponible sur http://localhost:3000.

Compte de demonstration cree par le seed :

```
camille.ferrand@meridien-fo.com / BridgelineDemo2026!
```

Le mot de passe du seed est surchargeable via la variable `SEED_PASSWORD`.

---

## Base de donnees

Le schema utilise des `enum` PostgreSQL et le type `Decimal`, ce qui exclut
SQLite : Prisma ne supporte pas les enums sur SQLite, et le passage a des
colonnes texte ferait perdre la verification de type a la compilation. Le plus
simple en local est donc un PostgreSQL jetable :

```bash
docker run --name bridgeline-db \
  -e POSTGRES_USER=bridgeline \
  -e POSTGRES_PASSWORD=bridgeline \
  -e POSTGRES_DB=bridgeline \
  -p 5432:5432 -d postgres:16
```

Puis dans `.env` :

```
DATABASE_URL="postgresql://bridgeline:bridgeline@localhost:5432/bridgeline?schema=public"
```

Commandes utiles :

| Commande | Effet |
| --- | --- |
| `npm run db:push` | Applique le schema sans creer de migration (developpement) |
| `npm run db:migrate` | Cree et applique une migration versionnee |
| `npm run db:seed` | Insere les donnees de demonstration (idempotent) |
| `npm run db:studio` | Ouvre Prisma Studio |

### Modele

| Table | Role |
| --- | --- |
| `User` | Investisseurs et membres de l'equipe (`role` = `INVESTOR` / `ADMIN`) |
| `Deal` | Operations : statut, montant cible, montant leve, ticket minimum, cloture |
| `Investment` | Participation d'un investisseur dans une operation |
| `Document` | Rapports, term sheets, releves (rattaches a un compte ou a une operation) |
| `AccessRequest` | Demandes d'acces a la Room, sans creation de compte |
| `ContactMessage` | Messages du formulaire de contact |
| `Account`, `Session`, `VerificationToken` | Tables techniques de NextAuth |

---

## Variables d'environnement

Toutes les variables sont decrites dans `.env.example`.

| Variable | Obligatoire | Role |
| --- | --- | --- |
| `DATABASE_URL` | oui | Connexion PostgreSQL |
| `NEXTAUTH_URL` | oui | URL publique de l'application |
| `NEXTAUTH_SECRET` | oui | Signature des JWT de session (`openssl rand -base64 32`) |
| `RESEND_API_KEY` | production | Cle API Resend |
| `EMAIL_FROM` | production | Expediteur, sur un domaine verifie dans Resend |
| `CONTACT_INBOX` | production | Boite qui recoit contacts et demandes d'acces |

Sans `RESEND_API_KEY`, les envois sont journalises dans la console en
developpement, et levent une erreur en production : aucun email n'est perdu
silencieusement.

---

## Authentification

Deux moyens de connexion pour un meme compte :

1. **Mot de passe** (provider Credentials). Les mots de passe sont hashes en
   bcrypt avec un cout de 12, jamais stockes en clair. Une tentative sur un
   email inconnu declenche tout de meme une comparaison bcrypt, pour que le
   temps de reponse ne permette pas d'enumerer les comptes.
2. **Lien de connexion par email** (provider Email). Le lien est valable 24
   heures et a usage unique.

Dans les deux cas, **le compte doit exister** : le callback `signIn` refuse un
lien magique adresse a une email inconnue, et le formulaire de demande d'acces
ne cree jamais de compte. Le provisionnement reste une action manuelle de
l'equipe.

Les sessions sont des JWT de 8 heures (la strategie base de donnees est
incompatible avec le provider Credentials de NextAuth 4).

### Routes protegees

Deux barrieres :

- `middleware.ts` intercepte `/room/dashboard`, `/room/opportunities`,
  `/room/portfolio` et `/room/documents` et redirige vers `/room/login` avec la
  destination d'origine en `callbackUrl`.
- `app/room/(dashboard)/layout.tsx` re-verifie la session cote serveur avant
  toute lecture en base.

`/room` et `/room/login` restent publiques.

---

## Structure

```
app/
├── (public)/                  # site vitrine (entete + pied de page publics)
│   ├── page.tsx               # accueil
│   ├── about/ team/ contact/
├── room/
│   ├── (public)/              # /room : presentation + demande d'acces
│   ├── login/                 # /room/login
│   └── (dashboard)/           # routes protegees, menu lateral
│       ├── dashboard/ opportunities/ portfolio/ documents/
└── api/auth/[...nextauth]/    # handler NextAuth

components/
├── layout/   # entete, pied de page, marque, entete de page interieure
├── ui/       # Button, Card, Field, ProgressBar, StatusBadge, Container
├── home/     # sections de la page d'accueil
├── room/     # ossature et composants de la Room
└── forms/    # formulaires clients (contact, demande d'acces, connexion)

lib/
├── auth.ts        # configuration NextAuth
├── prisma.ts      # client Prisma en singleton
├── email.ts       # envois Resend
├── deals.ts       # lectures des operations
├── portfolio.ts   # lectures propres a l'investisseur connecte
├── validations.ts # schemas zod partages
├── site.ts        # contenu editorial du site public
└── utils.ts       # formatage (montants, dates, pourcentages)

prisma/            # schema et seed
types/             # extension des types NextAuth
```

---

## Design

Les tokens vivent dans `tailwind.config.ts` :

- **Couleurs** : navy `#0a1a33` (entete, pied de page, menu lateral), accent
  unique `#1c56a8`, fond `#f3f6fb`, texte `#10203a` et `#5a6b85`.
- **Typographie** : Manrope pour les titres, Inter pour le corps, IBM Plex Mono
  pour tous les chiffres (avec `font-variant-numeric: tabular-nums`, classe
  `.tabular`).
- **Formes** : un seul rayon par famille, `rounded-card` (14px) et
  `rounded-control` (10px).
- **Ombres** : teintees navy, jamais de noir pur.

Le site est verrouille en theme clair (`color-scheme: light`) : la palette de
marque est construite autour du navy sur fond clair.

Accessibilite : contrastes verifies au niveau AA, focus clavier visible sur tout
element focusable, libelles au-dessus des champs, erreurs sous les champs,
animations desactivees sous `prefers-reduced-motion`.

---

## Contenu a fournir avant mise en production

Le code est complet ; ces elements editoriaux sont a remplacer.

| Element | Ou | Etat |
| --- | --- | --- |
| Adresses postales et telephones des bureaux | `lib/site.ts`, `offices` | `null`, les champs ne s'affichent pas tant qu'ils sont vides |
| Biographies des associes | `lib/site.ts`, `team` | Descriptives du role exerce, sans parcours anterieur : a valider et completer par chaque associe |
| Portraits de l'equipe | `lib/site.ts`, champ `photo` | Placeholders `picsum.photos` |
| Photographies (accueil, bureaux, Room) | `components/home/Hero.tsx`, `app/(public)/about/page.tsx`, `app/room/(public)/page.tsx` | Placeholders `picsum.photos` |
| Logo vectoriel | `components/layout/Wordmark.tsx` | Marque nominale + glyphe geometrique provisoire |
| Track record (operations passees) | `lib/site.ts`, `trackRecord` | Noms et annees a confirmer |
| Mentions legales et politique de confidentialite | a creer | Absentes |

Les domaines `picsum.photos` sont declares dans `next.config.js` : une fois les
visuels definitifs en place, retirer ces entrees.

### Documents

Les documents de la Room pointent vers `fileUrl`. Le jeu de demonstration
reference `/documents/placeholder.pdf`, servi depuis `public/`. Pour un usage
reel, deposer les fichiers sur un stockage objet (S3, Vercel Blob, R2) et
stocker dans `fileUrl` une URL signee a duree limitee, generee a la demande :
les documents d'investisseurs ne doivent pas etre accessibles par URL publique
permanente.

---

## Deploiement (Vercel)

1. Importer le depot dans Vercel.
2. Renseigner les variables d'environnement du tableau ci-dessus, avec
   `NEXTAUTH_URL` pointant sur le domaine de production.
3. Provisionner une base PostgreSQL (Vercel Postgres, Neon, Supabase) et
   renseigner `DATABASE_URL`.
4. La commande de build (`npm run build`) execute `prisma generate` avant
   `next build`. Appliquer les migrations avec `npx prisma migrate deploy`
   depuis un job de deploiement ou en local contre la base de production.
5. Verifier le domaine d'envoi dans Resend avant la mise en ligne.

---

## Scripts

| Script | Effet |
| --- | --- |
| `npm run dev` | Serveur de developpement |
| `npm run build` | `prisma generate` puis build de production |
| `npm start` | Serveur de production |
| `npm run lint` | ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | Verification TypeScript sans emission |
