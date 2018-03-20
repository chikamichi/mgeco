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

Ce projet fournit plusieurs commandes :

``` sh
npm run build:images
```

génère des thumbnails à partir des images originelles grand-format stockées dans ../website/static/images/[gallery|carousel|…]/.

---

``` sh
npm run build:vendors
```

génère des DLL Webpack pour la mise en cache conditionnelle des librairies tierces requises par les documents générés par la commande `build`.

---

``` sh
npm run build:documents
```

lance les différents générateurs (cf. */src*) et construit les documents appropriés, en incorporant les DLL Webpack idoines.

---

``` sh
npm run build
```

lance l'ensemble des commandes `build:X` pour réaliser une génération complète.

> **Attention**, ces commandes *doivent* être lancées depuis le dossier generators/, et non depuis un éventuel sous-dossier ou depuis le dossier parent contenant generators/ et website/.

## Synosys

> Cf. [Installation sous Windows](../INSTALL.windows.md) pour installer les outils de bases nécessaires aux étapes suivantes.

Installer les dépendances JS du projet : `npm install`.

### Exemples d'utilisation des générateurs

*Ces commandes sont pour parties intégrées dans les scripts mentionnés ci-avant.*

* Générer la DLL des librairies tierces ie. les *vendors*, sous la forme de DLL Webpack : `npm run build:vendors`.
* Lancer les générateurs en mode développement : `npm run build:documents [-- --watch]`.
* Réaliser une génération complète en mode production : `NODE_ENV=production npm run build`.

### Ajouter une librairie tierce à un générateur

1. Ajouter la librairie dans package.json (ou `npm i -[S|D] library_name`).
2. Importer la librairie dans src/[generator_name]/vendors.js.
3. Recompiler les DLL des librairies *vendors* pour tous les générateurs : `npm run build:vendors`.
