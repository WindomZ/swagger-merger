/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const path = require('path')
const crypto = require('crypto')

const co = require('co')

const {clean, downloading} = require('./remote')
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

  param.tag = crypto.createHash('md5').update(param.output).digest('hex')

  clean(param.tag)
  merge(param)

  yield downloading(param.tag).then(again => {
    if (again) {
      param.input = param.output
      param.dir = path.dirname(param.input)
      merge(param)
      clean(param.tag)
    }
  }).catch(e => {
    console.error(e)
  })
}

function merge (param) {
  switch (param.ext) {
    case '.yaml':
    case '.yml':
      return mergerYAML(param)
    case '.json':
      return mergerJSON(param)
  }
}

module.exports = (param) => co.wrap(merger)(param)
