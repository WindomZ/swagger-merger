/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const path = require('path')

const {clean, wait} = require('./remote')
const mergerYAML = require('./merger_yaml')
const mergerJSON = require('./merger_json')

function * merger (param) {
  if (!param.input) {
    throw new TypeError('"input" argument must be a file path')
  }

  param.ext = path.extname(param.input).toLowerCase()
  if (param.ext !== '.yaml' && param.ext !== '.yml' && param.ext !== '.json') {
    throw new TypeError('"input" file extension must be ".yaml" or ".yml" or ".json"')
  }

  param.dir = path.dirname(param.input)

  if (!param.output) {
    param.output = path.join(param.dir, 'swagger' + param.ext)
  }

  clean()
  merge(param)

  wait().then(again => {
    if (again) {
      param.input = param.output
      param.dir = path.dirname(param.input)
      merge(param)
      clean()
    }
  }).catch(e => {
    console.error(e)
  })
}

function merge (param) {
  switch (param.ext) {
    case '.yaml':
    case '.yml':
      return mergerYAML({
        dir: param.dir,
        input: param.input,
        output: param.output,
        compact: param.compact
      })
    case '.json':
      return mergerJSON({
        dir: param.dir,
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
