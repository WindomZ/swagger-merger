/**
 * Created by WindomZ on 17-4-11.
 */
const co = require('co')
const yaml = require('js-yaml')
const fs = require('fs')

function *mergeYAML (param) {
  console.log('dir: %s', param.dir)
  console.log('input: %s', param.input)
  console.log('output: %s', param.output)

  let doc = yaml.safeLoad(fs.readFileSync(param.input, 'utf8'))

  console.log('doc: %v', doc)
}

module.exports = param => co.wrap(mergeYAML)(param)