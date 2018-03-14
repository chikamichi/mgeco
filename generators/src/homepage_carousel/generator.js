const execSync = require('child_process').execSync;
let images = require('json-loader!yaml-loader!./images_list.yml');
const layout = require('./template.pug');

function cmd(path) { return "identify -format '%wx%h' " + path }

const generator = module.exports = function(templateParams) {
  let failures = [];
  for (let [index, image] of images.entries()) {
    const path = '../website/static/images/carousel/' + image.path;
    try {
      image.dimensions = execSync(cmd(path)).toString();
    } catch(e) {
      failures.push(image);
    }
  }
  _.pullAll(images, failures);

  return layout({images: images});
};
