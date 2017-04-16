* Install dependencies: `npm install`
* Compile vendors' JS: `npm run build:vendor`
* Compile JS & CSS: `npm run build [-- --watch]`

Installing a third-party library:

1. Add to package.json (or `npm i -[S|D] library_name`)
2. Require from src/js/vendors.js
3. Rebuild the vendors DLL with `npm run build:vendor`

Only the JS gets included in the DLL. (S)CSS files and other assets like images are better handled manually at this stage.

TODO: build a DLL for Inuit's scss and sass-mq?

