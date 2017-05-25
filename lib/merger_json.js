/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const fs = require('fs')

const fmtconv = require('fmtconv')

const mergeJSON = require('./merge_json')

function mergerJSON (param) {
  // read file
  let doc = '' + fs.readFileSync(param.input, 'utf8')

  // merge to JSON
  let obj = mergeJSON(param.dir, JSON.parse(doc))

  // parse to JSON
  let dump = fmtconv.stringJSON2JSON(obj, param.compact)

  // write to file
  if (obj && param.output) {
    fs.writeFileSync(param.output, dump, null)
  }

  return obj
}

module.exports = mergerJSON
