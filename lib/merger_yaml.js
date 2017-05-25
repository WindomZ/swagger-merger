/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const fs = require('fs')

const fmtconv = require('fmtconv')

const mergeJSON = require('./merge_json')

function mergerYAML (param) {
  // read file
  let doc = '' + fs.readFileSync(param.input, 'utf8')

  // parse to JSON
  doc = fmtconv.stringYAML2JSON(doc, true)

  // merge to JSON
  let obj = mergeJSON(param.dir, JSON.parse(doc))

  // parse to YAML
  let dump = fmtconv.stringJSON2YAML(obj, param.compact)

  // write to file
  if (dump && param.output) {
    fs.writeFileSync(param.output, dump, null)
  }

  return obj
}

module.exports = mergerYAML
