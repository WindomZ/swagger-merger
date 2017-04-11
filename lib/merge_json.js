/**
 * Created by WindomZ on 17-4-11.
 */
const path = require('path')
const fs = require('fs')

const co = require('co')

const {stringYAML2JSON} = require('./transcode')

function * mergeJSON (dir, obj) {
  let doc = JSON.stringify(obj)

  // merge
  let res = doc.replace(new RegExp(`({[ \n\r]*)("\\$ref")( *):( *)"[^"{}]+"([ \n\r]*})`, 'gm'), s => {
    if (!s.includes('#')) {
      try {
        let fileName = JSON.parse(s).$ref
        let fileContext = '' + fs.readFileSync(path.join(dir, fileName))
        switch (path.extname(fileName).toLowerCase()) {
          case '.json':
            return fileContext
          case '.yaml':
            return stringYAML2JSON(fileContext)
        }
      } catch (e) {
        console.error(e)
      }
    }
    return s
  })

  return JSON.parse(res)
}

module.exports = (dir, obj) => co.wrap(mergeJSON)(dir, obj)
