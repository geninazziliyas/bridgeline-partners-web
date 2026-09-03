# Logo officiel

Un fichier attendu ici : `bridgeline-logo.png`, puis à déclarer dans
`lib/site.ts` :

```ts
export const site = {
  ...
  logo: '/brand/bridgeline-logo.png',
};
```

`Wordmark` (`components/layout/Wordmark.tsx`) bascule alors automatiquement
du glyphe dessiné à la main vers ce fichier, partout où la marque apparaît
(entête, pied de page, menu latéral, page de connexion).

## Le logo est sombre, la moitié des emplacements sont sur fond navy

Pas d'inquiétude à avoir : `Wordmark` applique un filtre CSS
(`brightness-0 invert`) qui convertit n'importe quel logo en silhouette
blanche sur les emplacements à fond navy (entête, pied de page, menu de la
Room). Sur fond clair, il s'affiche dans ses couleurs réelles. Un seul
fichier suffit, pas besoin d'une version blanche séparée.

## Format

- PNG, fond transparent
- Export le plus grand disponible : le fichier est ensuite contraint à 28 px
  de hauteur dans l'entête, davantage sur la page de connexion. Un export
  trop petit apparaîtra flou sur les écrans à forte densité
