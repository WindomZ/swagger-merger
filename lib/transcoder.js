/**
 * Created by WindomZ on 17-4-11.
 */
const path = require('path')
const fs = require('fs')

const co = require('co')

const {stringJSON2YAML, stringYAML2JSON} = require('./transcode')

function *transcoder (param) {
  if (!param.input) {
    throw new TypeError('"input" argument must be a file path')
  } else if (!param.output) {
    throw new TypeError('"output" argument must be a file path')
  }

  let ext_input = path.extname(param.input).toLowerCase()
  if (ext_input !== '.yaml' && ext_input !== '.json') {
    throw new TypeError('"input" file extension must be ".yaml" or ".json"')
  }

  let ext_output = path.extname(param.output).toLowerCase()
  if (ext_output !== '.yaml' && ext_output !== '.json') {
    throw new TypeError('"output" file extension must be ".yaml" or ".json"')
  }

  if (ext_input === ext_output) {
    throw new TypeError('"input" file extension must not be same as "output" file extension')
  }

  let doc = '' + fs.readFileSync(param.input)
  switch (ext_input) {
    case '.yaml':
      fs.writeFileSync(param.output, stringYAML2JSON(doc), null)
      break
    case '.json':
      fs.writeFileSync(param.output, stringJSON2YAML(doc), null)
      break
  }
}

module.exports = param => co.wrap(transcoder)(param)
