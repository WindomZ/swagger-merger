/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const fs = require('fs')
const path = require('path')

const fmtconv = require('fmtconv')

const mergeJSON = require('./merge_json')

function mergerYAML (param) {
  // read file
  let doc = '' + fs.readFileSync(param.input, 'utf8')

  // parse to JSON
  doc = fmtconv.stringYAML2JSON(doc, true)

  // merge to JSON
  let obj = mergeJSON(param.tag, param.dir, JSON.parse(doc))

  if (param.output) {
    let ext = path.extname(param.output).toLowerCase()
    let dump

    switch (ext) {
      case '.json':
        // parse to JSON
        dump = fmtconv.stringJSON2JSON(obj, param.compact)
        break
      default:
        // parse to YAML
        dump = fmtconv.stringJSON2YAML(obj, param.compact)
        break
    }

    // write to file
    if (dump) {
      fs.writeFileSync(param.output, dump, null)
    }
  }

  return obj
}

module.exports = mergerYAML
