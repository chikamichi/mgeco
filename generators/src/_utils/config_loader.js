const fs = require('fs')
const toml = require('toml')

const configLoader = module.exports = (configName, path = null, cb = (config) => config) => {
  const data = fs.readFileSync(`../website/config.${configName}.toml`).toString()
  const config = toml.parse(data)
  return cb(path ? config[path] : config)
  // const appendExt = (name) => `${name}.jpg`
}
