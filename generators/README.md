Générateurs
===========

Ce projet contient un ensemble de générateurs spécialisés, visant à alimenter le projet principal */website* en contenu généré dynamiquement car comportant des dépendances JS/CSS et un templating dynamique :

- le carousel de la homepage est basé sur [Siema](https://pawelgrzybek.com/siema/) ;
- la galerie du site de MG Éco est basée sur [PhotoSwipe](http://photoswipe.com/).

Par exemple, le générateur `gallery` automatise :

- la génération de thumbnails à partir des images originelles grand format ;
- la génération de la page ou du *partial* requis ;
- l'intégration des légendes personnalisées des photos depuis un fichier de configuration.

Le code HTML généré est automatiquement placé à la position idoine dans le projet */website*, pour que l'outil de génération HTML (Hugo) puisse prendre la suite.

## Utilisation

Ce projet fournit deux principales commandes :

``` sh
./bin/generate-thumbnails
```

génère les thumbnails à partir des images originelles grand-format stockées dans ../website/static/images/[gallery|carousel|…]/.

```
./bin/generate
```

lance les différents générateurs (cf. */src*).

## Développement

Installer les dépendances JS du projet : `npm install`.

### Utilisation des générateurs

*Ces commandes sont pour parties intégrées dans les scripts mentionnés ci-avant.*

* Générer la DLL des librairies tierces ie. les *vendors*, sous la forme de DLL Webpack : `npm run build:vendors`.
* Lancer les générateurs en mode développement : `npm run build [-- --watch]`.
* Lancer les générateurs en mode production : `NODE_ENV=production npm run build[:vendors]`.

### Ajouter une librairie tierce à un générateur

1. Ajouter la librairie dans package.json (ou `npm i -[S|D] library_name`).
2. Importer la librairie dans src/[generator]/vendors.js.
3. Recompiler les DLL des librairies *vendors* pour tous les générateurs : `npm run build:vendors`.
