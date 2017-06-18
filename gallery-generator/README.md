mg-ecoconstruction.com — Gallery generator
==========================

mg-ecoconstruction.com's gallery is built on top of Photoswipe, with a small amount of custom code.

## Usage

This project provides **two main commands**:

``` sh
./bin/generate-thumbnails
```

generates thumbnails from larger size, original pictures stored in dist/images/gallery/.

```
./bin/generate-gallery
```

generates a full-flegded, Hugo-compliant, production-ready gallery page that is automatically transfered to the appropriate location inside the website sub-project.

It's also through this project that one controls the gallery's content: images orders & captions (see src/html/gallery/images_list.yml).

## Development

Install project's dependencies first: `npm install`.

### Compiling

* Compile vendors' JS bundle (Webpack DLL): `npm run build:vendor`
* Compile project's bundle: `npm run build [-- --watch]`
* Compile project's bundle minified/compressed: `NODE_ENV=production npm run build[:vendor]`

### Adding a third-party library

1. Add the library to package.json (or `npm i -[S|D] library_name`)
2. Require the library from src/js/vendors.js
3. Rebuild the vendors DLL with `npm run build:vendor`
