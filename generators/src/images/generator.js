const _ = require('lodash')
const fs = require('fs')
const rimraf = require('rimraf')
const execSync = require('child_process').execSync
const cl = require('../_utils/config_loader')

// Not exporting a generator function, this script is executed through babel-node.
const baseDir = process.cwd() // generators/ that is ^^
const galleryDir = `${baseDir}/../website/static/images/gallery`

process.chdir(galleryDir)

console.log('\nStarting generating images...')

// Generate gallery's thumbnails.
console.log('\n> Generating gallery\'s thumbnails')
const processGalleryCategory = (category) => {
  if (!fs.statSync(category).isDirectory()) return
  const initialLocation = process.cwd()
  process.chdir(category)
  rimraf.sync('thumbnails')
  fs.mkdirSync('thumbnails')
  execSync(`convert "*.jpg[276x>]" -monitor -depth 8 -quality 75% -set filename:original %t './thumbnails/%[filename:original].jpg'`)
  process.chdir('thumbnails')
  execSync('mogrify -shave 3x3 -bordercolor white -border 3 -format jpg *.jpg')
  process.chdir(initialLocation)
}
fs.readdirSync(process.cwd()).forEach(processGalleryCategory)

// Generate homepage's carousel images.
// TODO: generate from larger base images?
console.log('\n> Generating homepage\'s carousel images')
const appendExt = (name) => `${name}.jpg`
process.chdir(baseDir)
const images = cl('images', 'carousel', (images) => _.map(images, appendExt))
process.chdir(`${galleryDir}/../carousel`)
rimraf.sync('thumbnails')
fs.mkdirSync('thumbnails')
// images.forEach((image) => execSync(`cp gallery/${image} carousel`))
// process.chdir(`carousel`)
execSync(`convert "*.jpg[300x>]" -monitor -depth 8 -quality 75% -set filename:original %t './thumbnails/%[filename:original].jpg'`)
process.chdir('thumbnails')
execSync('mogrify -shave 3x3 -bordercolor white -border 3 -format jpg *.jpg')
process.chdir(baseDir)

console.log('\nDone.')
