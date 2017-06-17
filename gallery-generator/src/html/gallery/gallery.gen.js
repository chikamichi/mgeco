const execSync = require('child_process').execSync;
let images = require('json-loader!yaml-loader!./images_list.yml');
// TODO: don't use the full layout actually, just generate the gallery?
// Lisa will run the script (npm run build) and copy/paste the generated html into the proper galerie.html page
// Or, do use the layout, but then it'd be better using it on all other pages as well, which means generating them… :(
// Or, just tell Lisa to update the layout if she ever changes other pages.
// => https://www.jonathan-petitcolas.com/2016/01/23/webpack-html-plugin-in-a-nutshell.html
const layout = require('../layout.pug');

function cmd(path) { return "identify -format '%wx%h' " + path }

const generator = module.exports = function(templateParams) {
  let failures = [];
  for (let [index, image] of images.entries()) {
    const path = 'dist/images/gallery/' + image.path;
    try {
      image.dimensions = execSync(cmd(path)).toString();
    } catch(e) {
      failures.push(image);
    }
  }
  _.pullAll(images, failures);

  return layout({images: images});
};
