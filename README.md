## Synopsis

* Install dependencies: `npm install`
* Compile vendors' JS: `npm run build:vendor`
* Compile JS & CSS: `npm run build [-- --watch]`
* Compile for production: `NODE_ENV=production npm run build[:vendor]`

## Installing a third-party library

1. Add to package.json (or `npm i -[S|D] library_name`)
2. Require from src/js/vendors.js
3. Rebuild the vendors DLL with `npm run build:vendor`

Only the JS gets included in the DLL. (S)CSS files and other assets like images are better handled manually at this stage.

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

