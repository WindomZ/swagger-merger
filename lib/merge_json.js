/**
 * Created by WindomZ on 17-4-11.
 */
const path = require('path')
const fs = require('fs')

const co = require('co')

function *mergeJSON (param) {
  let doc = '' + fs.readFileSync(param.input)

  let res = doc.replace(new RegExp(`([{ \n\r]*)("\\$ref")( *):( *)".+"([ \n\r}]*)`, 'gm'), s => {
    // console.log('s: |%s|', s)
    if (!s.includes('#')) {
      try {
        return '' + fs.readFileSync(path.join(param.dir, JSON.parse(s).$ref))
      } catch (e) {
        console.error(e)
      }
    }
    return s
  })

  // console.log('res: |%s|', res)
  fs.writeFileSync(param.output, res, null)
}

module.exports = param => co.wrap(mergeJSON)(param)