Site web de MG Éco-construction
===============================

Ce projet contient le code source nécessaire pour générer la version statique (hébergeable) de http://mg-ecoconstruction.com/ (MG ECO).

## Synopsys

> Cf. [Installation sous Windows](../INSTALL.windows.md) pour installer les outils de bases nécessaires aux étapes suivantes.

1. Installer les dépendances JS du projet : `npm install`.
2. Lancer Sass en *watch mode* : `sass --watch static-src/css:static/css`.
3. Lancer Hugo en *watch mode* : `hugo server -w` et se rendre sur http://localhost:1313/.

## Déployer

1. Lancer une génération complète du contenu statique du site : `hugo`.
2. Utiliser `git add|commit` sur la branche *master*.
3. Initier le déploiement avec `git push`.
4. Le nouveau contenu sera disponible dans quelques minutes sur http://mgeco.netlify.com/.
