const cl = require('../_utils/config_loader')
const layout = require('./template.pug')

const generator = module.exports = () => {
  const appendExt = (name) => `${name}.jpg`
  const images = cl('images', 'carousel', (images) => _.map(images, appendExt))
  return layout({images: images})
}
