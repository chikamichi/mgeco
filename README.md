mg-ecoconstruction.com
======================

Front-end for MG Éco, a wooden frame house building company.

Project's end goals & constraints:

1. make the gallery effective (snappy, maintainable)
2. make the whole website responsive
3. improve SEO
4. keep it simple so that the non-tech client is then able to work on/with it

How to implement / Core ideas:

* build with webpack and associated stack
* a snappy, custom gallery based on the popular and well maintained PhotoSwipe
* CSS using Sass & Inuit CSS (compiled with webpack, but allow for compiling using another tool)

## Synopsis

* Install dependencies: `npm install`
* Compile vendors' independent JS bundle (DLL): `npm run build:vendor`
* Compile project's JS/CSS bundle: `npm run build [-- --watch]`
* Compile project's JS/CSS bundle for production: `NODE_ENV=production npm run build[:vendor]`

## Adding a third-party library

1. Add the library to package.json (or `npm i -[S|D] library_name`)
2. Require the library from src/js/vendors.js
3. Rebuild the vendors DLL with `npm run build:vendor`

Only the vendor's JS assets get included in the DLL. (S)CSS files and other assets such as images are better handled manually at this stage.

## TODO

* build a DLL for Inuit's scss and sass-mq?
* build html using https://github.com/jantimon/html-webpack-plugin#configuration
* generate image tags, including size, using EJS through a partial (loop through images)

## Processing images

Regenerate thumbnails from large versions:

``` sh
cd images/gallery
rm -rf thumbnails
mkdir thumbnails
convert "*.jpg[288x>]" -depth 8 -quality 75% -set filename:original %t './thumbnails/%[filename:original].jpg'
cd thumbnails
mogrify -shave 1x1 -bordercolor white -border 1 -format jpg *.jpg
```
