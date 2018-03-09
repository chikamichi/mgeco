Site web de MG Éco-construction
===============================

Ce projet contient le code source nécessaire pour générer la version statique (hébergeable) de http://mg-ecoconstruction.com/ (SAS MG ECO).

## Synopsys

1. Installer les dépendances JS du projet : `npm install`.
2. Installer [Hugo](https://gohugo.io/getting-started/installing/), un générateur de site statique.
3. Installer [Sass](https://sass-lang.com/install) (requière Ruby ; sous Linux, utiliser [chruby](https://github.com/postmodern/chruby) & ruby-install).
4. Lancer Sass en *watch mode* : `sass --watch themes/mgeco/static-src/css:themes/mgeco/static/css`.
5. Lancer Hugo en *watch mode* : `hugo server -w` et se rendre sur http://localhost:1313/.

## Déployer

1. Lancer une génération complète du contenu statique du site : `hugo`.
2. Utiliser `git add|commit` sur la branche *master*.
3. Initier le déploiement avec `git push`.
4. Le nouveau contenu sera disponible dans quelques minutes sur http://mgeco.netlify.com/.
