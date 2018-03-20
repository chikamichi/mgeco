const objectPath = require('object-path')
const YAML = require('yamljs')

const configLoader = module.exports = (configName, path = null, cb = (config) => config) => {
  const config = YAML.load('../website/config.images.yml')
  return cb(objectPath.get(config, path))
}
