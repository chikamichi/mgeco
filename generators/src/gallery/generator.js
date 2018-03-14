const fs = require('fs')
const execSync = require('child_process').execSync
const layout = require('./template.pug')
const cl = require('../_utils/config_loader')

module.exports = () => {
  const cmd = (path) => `identify -format '%wx%h' ${path}`

  const appendExt = (_, name) => `${name}.jpg`
  const processImage = (image) => _.mapKeys(image, appendExt)
  const processImages = (images) => _.map(images, processImage)
  const images = cl('images', 'gallery.0.image', processImages)

  const normalizeImage = (image) => {
    const name = Object.keys(image)[0]
    const description = Object.values(image)[0]
    const path = `../website/static/images/gallery/${name}`
    if (fs.existsSync(path)) {
      try {
        return {
          path: name,
          description: description,
          dimensions: execSync(cmd(path)).toString()
        }
      } catch(e) {
        console.error(e)
      }
    }
  }

  const collection = _.chain(images).map(normalizeImage).compact().value()
  return layout({images: collection})
}
