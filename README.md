# Bridgeline Partners

Site vitrine et espace investisseurs de Bridgeline Partners, en anglais et en
francais.

- **Site public** : accueil, a propos, services, equipe, contact.
- **Espace investisseur** : page de presentation publique, authentification, puis
  vue d'ensemble, opportunites, portefeuille et documents derriere la session.

Le contenu editorial reprend celui publie sur bridgelinepartners.com. La version
anglaise en est une traduction : si un texte anglais officiel existe, il doit
remplacer `lib/i18n/dictionaries/en.ts`.

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

- `middleware.ts` intercepte `/[locale]/room/dashboard`, `/[locale]/room/opportunities`,
  `/[locale]/room/portfolio` et `/[locale]/room/documents`, et redirige vers `/[locale]/room/login` avec la
  destination d'origine en `callbackUrl`.
- `app/[locale]/room/(dashboard)/layout.tsx` re-verifie la session cote serveur avant
  toute lecture en base.

`/[locale]/room` et `/[locale]/room/login` restent publiques.

---

## Langues

Le site est bilingue anglais / francais, avec une URL par langue :
`/en/...` et `/fr/...`. **L'anglais est la langue d'arrivee** : un visiteur qui n'a jamais choisi voit la version anglaise, quelle que soit la langue de son navigateur. Le francais reste a un clic, et le choix est ensuite memorise dans le cookie `bridgeline_locale`.

- **Textes de l'interface** : `lib/i18n/dictionaries/fr.ts` et `en.ts`. Le
  dictionnaire anglais est type d'apres le francais : une cle manquante ou mal
  orthographiee fait echouer la compilation, jamais l'affichage en production.
- **Contenu editorial** (biographies, approche, avantages) : dans les memes
  fichiers, indexe par les identifiants de `lib/site.ts`.
- **Donnees des operations** : le modele `Deal` porte des colonnes anglaises
  facultatives (`summaryEn`, `descriptionEn`, `sectorEn`, `geographyEn`). Quand
  un champ est vide, l'affichage anglais retombe sur le francais : l'equipe peut
  publier une operation sans la traduire.
- **Choix de la langue** : le middleware redirige toute URL sans prefixe vers
  l'anglais, sauf si le cookie `bridgeline_locale` porte un choix explicite. La
  langue du navigateur n'est volontairement pas consultee. Pour revenir a une
  detection automatique, lire `Accept-Language` dans `resolveLocale`
  (`middleware.ts`) avant le repli sur la langue par defaut.
- **Formatage** : montants, dates et pourcentages suivent la langue
  (`lib/utils.ts`).
- **Referencement** : chaque page declare ses alternates `hreflang`.

Pour ajouter une langue : l'ajouter dans `lib/i18n/config.ts`, creer le
dictionnaire correspondant, et TypeScript signalera tout ce qui manque.

---

## Structure

```
app/
├── [locale]/                  # /en/... et /fr/...
│   ├── layout.tsx             # balise html, polices, providers
│   ├── (public)/              # site vitrine (entete + pied de page publics)
│   │   ├── page.tsx           # accueil
│   │   └── about/ services/ team/ contact/
│   ├── room/
│   │   ├── (public)/          # /room : presentation + demande d’acces
│   │   ├── login/             # /room/login
│   │   └── (dashboard)/       # routes protegees, menu lateral
│   │       └── dashboard/ opportunities/ portfolio/ documents/
│   └── not-found.tsx
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
├── deals.ts       # lectures des operations, resolution des traductions
├── portfolio.ts   # lectures propres a l'investisseur connecte
├── validations.ts # schemas zod, messages issus du dictionnaire
├── site.ts        # donnees du site independantes de la langue
├── i18n/          # config des langues et dictionnaires fr / en
└── utils.ts       # formatage (montants, dates, pourcentages) par langue

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
| Adresses, telephones, email | `lib/site.ts` | Repris de bridgelinepartners.com. Le rattachement de chaque numero a un bureau reste a confirmer |
| Biographies des associes | `lib/i18n/dictionaries/*.ts`, `team_members` | Reprises de bridgelinepartners.com en francais, traduites en anglais |
| Portraits de l'equipe | `lib/site.ts`, champ `photo` | Placeholders `picsum.photos` |
| Photographies (accueil, bureaux, Room) | `components/home/Hero.tsx`, `app/(public)/about/page.tsx`, `app/room/(public)/page.tsx` | Placeholders `picsum.photos` |
| Logo vectoriel | `components/layout/Wordmark.tsx` | Marque nominale + glyphe geometrique provisoire |
| Track record (operations passees) | `lib/site.ts`, `trackRecord` | **Provisoire.** Les operations affichees sur bridgelinepartners.com le sont sous forme de logos : les noms reels n'ont pas pu etre recuperes et doivent remplacer cette liste |
| Traductions anglaises des operations | colonnes `*En` de `Deal` | Renseignees pour les 5 operations de demonstration |
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
