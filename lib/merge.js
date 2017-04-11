/**
 * Created by WindomZ on 17-4-11.
 */
const path = require('path')

const co = require('co')

const mergeYAML = require('./merge_yaml')
const mergeJSON = require('./merge_json')

function * merge (param) {
  if (!param.input) {
    throw new TypeError('"input" argument must be a file path')
  }

  let ext = path.extname(param.input)
  if (ext !== '.yaml' && ext !== '.json') {
    throw new TypeError('"input" file extension must be ".yaml" or ".json"')
  }

  let dir = path.dirname(param.input)

  if (!param.output) {
    param.output = path.join(dir, 'swagger' + ext)
  }

  if (ext !== path.extname(param.output)) {
    // TODO: support transcoding
    throw new TypeError('"output" file extension must same as "input" file extension')
  }

  switch (ext) {
    case '.yaml':
      return yield mergeYAML({
        dir: dir,
        input: param.input,
        output: param.output,
      })
    case '.json':
      return yield mergeJSON({
        dir: dir,
        input: param.input,
        output: param.output,
      })
  }
}

module.exports = param => co.wrap(merge)(param)
