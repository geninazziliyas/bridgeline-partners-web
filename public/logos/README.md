# Logos des investissements passes

Deposer ici un fichier SVG par societe, puis renseigner son chemin dans le
champ `logo` de `trackRecord` (`lib/site.ts`) :

```ts
{ name: 'Palantir', logo: '/logos/palantir.svg' },
```

Le bandeau bascule automatiquement du nom typographique au logo.

Recommandations :

- SVG monochrome, trace en `currentColor` ou en navy `#0a1a33`
- Hauteur de trace utile d'environ 32 px, sans marge interne
- Le composant contraint la hauteur a 28 px et laisse la largeur libre

Ces logos appartiennent aux societes concernees. Ils doivent etre obtenus
depuis leur kit de presse ou avec leur accord avant toute publication.
