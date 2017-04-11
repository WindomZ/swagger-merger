/**
 * Created by WindomZ on 17-4-11.
 */
const fs = require('fs')

const co = require('co')
const yaml = require('js-yaml')

const mergeJSON = require('./merge_json')
const {stringYAML2JSON} = require('./transcode')

function *mergerYAML (param) {
  // read file
  let doc = '' + fs.readFileSync(param.input, 'utf8')

  // parse to JSON
  doc = stringYAML2JSON(doc)

  // merge to JSON
  let obj = yield mergeJSON(param.dir, JSON.parse(doc))

  // parse to YAML
  let dump = yaml.safeDump(obj)

  // write to file
  if (dump && param.output) {
    fs.writeFileSync(param.output, dump, null)
  }

  return obj
}

module.exports = param => co.wrap(mergerYAML)(param)