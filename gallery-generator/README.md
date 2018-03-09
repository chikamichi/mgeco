Générateur de gallerie
======================

La gallerie du site de MG Éco est basée sur [PhotoSwipe](http://photoswipe.com/). Ce projet automatise la création de la page /galerie du site :

- génération de thumbnails à partir des originaux
- génération de la page avec un *markup* adapté pour PhotoSwipe et le thème du site
- intégration des légendes personnalisées des photos (src/html/gallery/images_list.yml)

Le code HTML généré est automatiquement placé à la position idoine dans le projet */website*.

## Utilisation

Ce projet fournit deux principales commandes :

``` sh
./bin/generate-thumbnails
```

génère les thumbnails à partir des images grand-format stockées dans ../website/static/images/gallery/.

```
./bin/generate-gallery
```

génère une page-galerie statique pour Hugo (cf. projet */website*). Cette page est transférée vers ../website/themes/mgeco/layouts/galerie/single.html.

## Développement

Installer les dépendances JS du projet : `npm install`.

### Générations

*Ces commandes sont pour parties intégrées dans les scripts mentionnés ci-avant.*

* Générer la DLL des librairies tierces ie. *vendors* (Webpack DLL): `npm run build:vendor`.
* Générer le projet en mode développement : `npm run build [-- --watch]`.
* Générer le projet en mode production : `NODE_ENV=production npm run build[:vendor]`.

### Ajouter une librairie tierce

1. Ajouter la librairie dans package.json (ou `npm i -[S|D] library_name`).
2. Importer la librairie dans src/js/vendors.js.
3. Recompiler la DLL des librairies *vendors* : `npm run build:vendor`.
