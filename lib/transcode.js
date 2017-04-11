/**
 * Created by WindomZ on 17-4-11.
 */
const yaml = require('js-yaml')

function stringYAML2JSON (doc) {
  let obj = yaml.safeLoad(doc)
  if (!obj) {
    throw new TypeError('"doc" string must be in a yaml format')
  }
  return JSON.stringify(obj)
}

module.exports = {stringYAML2JSON}
