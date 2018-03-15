const fs = require('fs')
const execSync = require('child_process').execSync
const layout = require('./template.pug')
const cl = require('../_utils/config_loader')

module.exports = () => {
  const cmd = (path) => `identify -format '%wx%h' ${path}`
  const data = cl('images', 'gallery')
  const normalizeImage = (image, category) => {
    const [name, description] = image.split(/ = /)
    const filename = `${name}.jpg`
    const pathOriginal = `../website/static/images/gallery/${category}/${filename}`
    const pathThumbnail = `../website/static/images/gallery/${category}/thumbnails/${filename}`
    if (fs.existsSync(pathOriginal) && fs.existsSync(pathThumbnail)) {
      try {
        return {
          category: category,
          name: name,
          filename: filename,
          path: `${category}/${filename}`,
          pathThumbnail: `${category}/thumbnails/${filename}`,
          description: description,
          dimensions: execSync(cmd(pathOriginal)).toString()
        }
      } catch(e) {
        console.error(e)
      }
    }
  }
  const processCategory = (category) => {
    // _.invokeMap binds this to undefined somehow.
    category.images = _.map(category.images, (image) => normalizeImage(image, category.folder))
    return category
  }
  const galleryCategories = _.map(data, processCategory)
  return layout({galleryCategories: galleryCategories})
}
