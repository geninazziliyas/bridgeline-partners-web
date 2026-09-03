# Portraits de l'equipe

Trois fichiers a deposer ici, puis a declarer dans `lib/site.ts`.

## Correspondance

Dans l'ordre ou les photos ont ete transmises :

| Photo transmise | Personne | Nom de fichier attendu |
| --- | --- | --- |
| 1re (costume sombre, cravate violette) | Herve Croset, co-fondateur | `croset.jpg` |
| 2e (chemise bleu clair) | George Pal, co-fondateur | `pal.jpg` |
| 3e (lunettes, costume marine, cravate rouge) | John Tavares, directeur investissement | `tavares.jpg` |

## Activation

Deposer les fichiers, puis dans `lib/site.ts` :

```ts
export const team: TeamMember[] = [
  { id: 'croset', name: 'Hervé Croset', photo: '/team/croset.jpg' },
  { id: 'pal', name: 'George Pal', photo: '/team/pal.jpg' },
  { id: 'tavares', name: 'John Tavares', photo: '/team/tavares.jpg' },
];
```

Tant qu'un `photo` vaut `null`, la fiche affiche les initiales sur un aplat
navy. C'est volontaire : pointer un fichier absent afficherait une image
cassee en ligne.

## Format

Les portraits sont affiches dans un carre a coins arrondis, cadre en haut
(`object-top`), de 96 px sur l'accueil et 160 px sur la page equipe.

- Carre ou proche du carre, cadrage buste
- **1000 x 1000 px au minimum.** Les portraits sont servis en densite 2x sur
  les ecrans retina : en dessous de cette taille, l'image sera visiblement
  molle. Fournir les originaux les plus grands disponibles, pas des versions
  redimensionnees pour le web
- JPEG de bonne qualite, ou PNG. Next.js les recompresse et les sert en WebP
  ou AVIF selon le navigateur, il n'y a donc pas a les optimiser en amont

Une image de faible definition ne peut pas etre rattrapee : agrandir n'ajoute
aucun detail. Si les seuls fichiers disponibles sont petits, mieux vaut garder
les initiales que d'afficher un portrait flou.
