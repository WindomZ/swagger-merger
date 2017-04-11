/**
 * Created by WindomZ on 17-4-11.
 */
const co = require('co')

function *mergeJSON (param) {
  console.log('dir: %s', param.dir)
  console.log('input: %s', param.input)
  console.log('output: %s', param.output)
}

module.exports = param => co.wrap(mergeJSON)(param)