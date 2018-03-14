const fs = require('fs')
const rimraf = require('rimraf')
const execSync = require('child_process').execSync

// Not exporting a generator function, this script is executed through babel-node.

process.chdir('../website/static/images/gallery')

console.log('\nStarting generating images...')

// Generate gallery's thumbnails.
console.log('\n> Generating gallery\'s thumbnails')
rimraf.sync('thumbnails')
fs.mkdirSync('thumbnails')
execSync(`convert "*.jpg[276x>]" -monitor -depth 8 -quality 75% -set filename:original %t './thumbnails/%[filename:original].jpg'`)
process.chdir('./thumbnails')
execSync('mogrify -shave 3x3 -bordercolor white -border 3 -format jpg *.jpg')

// Generate homepage's carousel images.
console.log('\n> Generating homepage\'s carousel images')
process.chdir('../../')
rimraf.sync('carousel')
fs.mkdirSync('carousel')
// TODO: get filenames from website's toml config
execSync('cp gallery/{33,8,15,40,1}.jpg carousel')
process.chdir('./carousel')
execSync(`convert "*.jpg[300x>]" -monitor -depth 8 -quality 75% -set filename:original %t './%[filename:original].jpg'`)
execSync('mogrify -shave 3x3 -bordercolor white -border 3 -format jpg *.jpg')

console.log('\nDone.')
