const fs = require('fs')
const objectPath = require('object-path')
const toml = require('toml')

const configLoader = module.exports = (configName, path = null, cb = (config) => config) => {
  const data = fs.readFileSync(`../website/config.${configName}.toml`).toString()
  const config = toml.parse(data)
  return cb(objectPath.get(config, path))
}
