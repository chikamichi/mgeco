Installation sous Windows
=========================

## Installer `git`

`git` est l'outil permettant de gérer l'historique du projet :

* on récupère le code source du projet, stocké sur [GitHub](https://github.com/), avec `git clone` ;
* à chaque micro-étape de la vie du projet (implémentation d'une nouvelle fonctionnalité, correction typographique, travail exploratoire sur une idée… peu importe), on utilise `git commit` pour enregistrer un « point de sauvegarde » ou *commit*.
* on utilise `git push` pour envoyer son code modifié sur GitHub, et éventuellement déclencher le déploiement du site en production sur http://mg-eco.com/.

**Télécharger `git` sur https://gitforwindows.org/ et l'installer.**

Réglages à choisir pendant l'installation :

* Use Git from the Windows Command Prompt
* Checkout as-is, commit Unix-style line endings

*Git for Windows* installe un terminal Bash dans lequel la commande `git` est disponible. Ce terminal, qui permet de lancer des commandes manuelles, est mis à disposition dans une console assez minimaliste, qui sera remplacée ci-après par une alternative plus robuste, ConEmu.

> Possibilité d'installer le gestionnaire graphique [GitHub Desktop](https://desktop.github.com/) pour éviter d'avoir à taper les commandes `git` en ligne de commande.

Configuration post-installation — dans *Git Bash* (à lancer depuis le menu Démarrer si fermé) :

* choisir un nom public qui sera visible dans ses commits : `git config --global user.name "Votre Nom"` ;
* associer son email à Git : `git config --global user.email "mon@email.com"`

## Créer son compte GitHub

Si pas déjà fait, se créer un compte utilisateur sur [GitHub](https://github.com/).

Suivre [ces instructions](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) pour créer sa clé SSH permettant d'interagir de façon sécurisée et authentifiée avec GitHub, que ce soit à travers l'outil `git` en ligne de commande ou *via* le gestionnaire graphique GitHub Desktop.

Configuration autour de sa clé SSH et des interactions avec GitHub — dans ConEmu :

* exécuter la commande `cd; echo 'ForwardAgent yes' >> .ssh/config` pour éviter d'avoir à entrer son mot de passe à chaque utilisation de sa clé ssh (et pour [gagner un peu en sécurité](http://www.unixwiz.net/techtips/ssh-agent-forwarding.html) au passage) ;
* suivre les instructions de [cette page](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/#platform-windows) pour rattacher sa clé SSH publique à son compte GitHub.

## Installer ConEmu

La commande `git` installée par *Git for Windows* est mise à disposition dans un terminal, ou *shell*, de [type Bash](https://fr.wikipedia.org/wiki/Bourne-Again_shell). Cet interpréteur de ligne de commande est exposé à l'utilisateur au travers d'une console ou « interface semi-graphique » qui permet de taper des commandes et de voir les résultats. Cette console étant assez limitée, on souhaite la remplacer par une autre, qui encapsulera le même terminal Bash+`git`.

**Télécharger et installer [ConEmu](https://conemu.github.io/) depuis [ce lien](https://www.fosshub.com/ConEmu.html).** Prendre la version « ConEmu Stable, Installer (32-bit, 64-bit). »

Configuration post-installation :

* lancer ConEmu
* exécuter, en appuyant sur entrée, la commande `cd; curl https://gist.githubusercontent.com/jirutka/99d57c82fa8981f56fb5/raw/.bashrc > .bashrc` pour télécharger une configuration minimale pour le terminal Bash qui va tourner à l'intérieur de la console ConEmu ;
* ouvrir les réglages de ConEmu avec le raccourci `Win+Alt+P` ;
* dans la section *Startup*, associer le terminal Bash+`git` installé par *Git for Windows* à ConEmu en sélectionnant `{Bash::Git Bash}` dans la liste déroulante intitulée *Specified named task* ;
* dans la section *Startup/Environment*, copier/coller les réglages linguistiques suivants dans le champ texte :
```
set LANG=en_GB.UTF-8
set LC_ALL=en_GB.UTF-8
```
* dans la section *Main*, cocher *Clear Type* ;
* dans la section *Main/Confirm*, décocher *Confirm creating new console/tab* et *Confirm tab closing* ;
* dans la section *Main/Update*, cocher *Check on startup* et *Stable (or Preview)*.

Fermer et relancer ConEmu, de façon à prendre en compte ces réglages. Au prochain lancement, la console ConEmu fait tourner le terminal Bash+`git`.

## Installer Node.js et npm

> Un outil généraliste.

L'utilitaire `npm` rend plusieurs services :

* c'est un gestionnaire de paquet, qui va permettre d'installer tout un tas de dépendances du projet — des librairies JavaScript et CSS, principalement. Certaines de ces dépendances ne seront utilisées que localement, pour développer, tandis que d'autres sont nécessaires en production, pour faire fonctionner le site.
* il permet également de lancer des outils et des scripts écrits en JavaScript permettant de générer le HTML et le JavaScript de certaines parties très spécifiques du site web, notamment la galerie de photos — cf. la section [generators/](./generators/).

`npm` est fournit par [Node.js](https://nodejs.org/en/).

**Télécharger et installer la version LTS (*Long Term Support*) de [Node.js](https://nodejs.org/en/).**

## Installer Ruby et Sass

> Un générateur de CSS.

L'outil [Sass](https://sass-lang.com/) est une surcouche à CSS, qui facilite la vie du développeur en proposant des fonctionnalités supplémentaires très pratiques pour développer des feuilles de styles. Sass étant écrit en Ruby, il faut d'abord installer ce language.

**Télécharger et installer [Ruby](https://rubyinstaller.org/) dans sa version 2.5.0-n (x64)**, où `n` est un numéro arbitraire (prendre la dernière version disponible, en somme).

Relancer ConEmu pour que cette installation soit prise en compte, puis **installer Sass** en utilisant le gestionnaire de paquet fournit par Ruby (nommé `gem`) en exécutant la commande `gem install sass`.

## Installer Hugo

> Un générateur de HTML.

L'outil [Hugo](http://gohugo.io/) permet de générer du HTML à partir d'un ensemble de fichiers disparates.

**Télécharger et installer [la version Windows-64bit](https://github.com/gohugoio/hugo/releases) de Hugo.**

## Récupérer une copie du projet en local

> À ne faire qu'une seule fois, sur son ordinateur :)

Dans ConEmu, utiliser la commande `cd` (*change directory*) pour se rendre dans un répertoire de travail bien choisi et y « cloner » le projet depuis GitHub :

```
cd un/dossier/de/travail
git clone https://github.com/chikamichi/mgeco.git
cd mgeco
```

> * La commande `cd` tout-court ramène à son dossier personnel, en général C:\Users\pseudonyme, aussi appelé `~`.
> * Il est possible de créer des répertoires avec la commande `mkdir`, par exemple `cd; mkdir travail; cd travail`.
