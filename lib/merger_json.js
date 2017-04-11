/**
 * Created by WindomZ on 17-4-11.
 */
const fs = require('fs')

const co = require('co')

const mergeJSON = require('./merge_json')

function * mergerJSON (param) {
  // read file
  let doc = '' + fs.readFileSync(param.input, 'utf8')

  // merge to JSON
  let obj = yield mergeJSON(param.dir, JSON.parse(doc))

  // write to file
  if (obj && param.output) {
    fs.writeFileSync(param.output, JSON.stringify(obj), null)
  }

  return obj
}

module.exports = param => co.wrap(mergerJSON)(param)
