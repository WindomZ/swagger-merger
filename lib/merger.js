/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const path = require('path')

const mergerYAML = require('./merger_yaml')
const mergerJSON = require('./merger_json')

function * merger (param) {
  if (!param.input) {
    throw new TypeError('"input" argument must be a file path')
  }

  let ext = path.extname(param.input).toLowerCase()
  if (ext !== '.yaml' && ext !== '.yml' && ext !== '.json') {
    throw new TypeError('"input" file extension must be ".yaml" or ".yml" or ".json"')
  }

  let dir = path.dirname(param.input)

  if (!param.output) {
    param.output = path.join(dir, 'swagger' + ext)
  }

  switch (ext) {
    case '.yaml':
    case '.yml':
      return mergerYAML({
        dir: dir,
        input: param.input,
        output: param.output,
        compact: param.compact
      })
    case '.json':
      return mergerJSON({
        dir: dir,
        input: param.input,
        output: param.output,
        compact: param.compact
      })
  }
}

module.exports = (param) => new Promise(resolve => {
  merger(param).next()
  resolve()
})
