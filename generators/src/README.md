Chaque générateur est contenu dans son propre dossier, qui possède *a minima* la structure suivante :

```
- nom_generateur/
  - generator.js
```

* generator.js doit faire un export par défaut d'une fonction de génération, retournant le document attendu.
* Si le générateur requière un template, il est recommandé de créer un fichier template.pug et de l'importer dans generator.js.
* Si du code JS doit être associé au document généré, il est recommandé de créer un fichier index.js et de l'importer avec une balise `<script>` en bas du template.
* Si des librairies tierces doivent être chargées depuis le document généré, il est recommandé de les importer dans un fichier vendors.js et de créer une DLL Webpack specifique, pour permettre une mise en cache conditionnelle par les navigateurs. Importer le résultat de cette DLL avec une balise `<script>` en bas du template.
