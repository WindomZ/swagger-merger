/**
 * Created by WindomZ on 17-4-11.
 */
const path = require('path')
const fs = require('fs')

const co = require('co')

const {stringJSON2YAML, stringYAML2JSON} = require('./transcode')

function * transcoder (param) {
  if (!param.input) {
    throw new TypeError('"input" argument must be a file path')
  } else if (!param.output) {
    throw new TypeError('"output" argument must be a file path')
  }

  let extInput = path.extname(param.input).toLowerCase()
  if (extInput !== '.yaml' && extInput !== '.json') {
    throw new TypeError('"input" file extension must be ".yaml" or ".json"')
  }

  let extOutput = path.extname(param.output).toLowerCase()
  if (extOutput !== '.yaml' && extOutput !== '.json') {
    throw new TypeError('"output" file extension must be ".yaml" or ".json"')
  }

  if (extInput === extOutput) {
    throw new TypeError('"input" file extension must not be same as "output" file extension')
  }

  let doc = '' + fs.readFileSync(param.input)
  switch (extInput) {
    case '.yaml':
      fs.writeFileSync(param.output, stringYAML2JSON(doc), null)
      break
    case '.json':
      fs.writeFileSync(param.output, stringJSON2YAML(doc), null)
      break
  }
}

module.exports = param => co.wrap(transcoder)(param)
