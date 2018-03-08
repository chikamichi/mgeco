MG Eco's website
================

## Synopsys

1. Install project's dependencies first: `npm install`.
2. Install [Hugo](https://gohugo.io/getting-started/installing/), a static generator.
3. Install [Sass](https://sass-lang.com/install) (requires Ruby, on Linux go for [chruby](https://github.com/postmodern/chruby) & ruby-install).
4. Run Sass (`sass --watch themes/mgeco/static-src/css:themes/mgeco/static/css`).
5. Run Hugo in watch mode: `hugo server -w` and connect to http://localhost:1313.

## Deploying

1. Run a full-fledged content generation before deployment: `hugo`.
2. `git add|commit` all relevant parts on *master*
3. Deploy with `git push`.
