/**
 * Created by WindomZ on 18-2-26.
 */
'use strict'

const path = require('path')

/**
 * Split the reference definition to file path and hashtag path.
 * start with '$ref' or '$ref#'.
 *
 * @param {string} ref
 * @return {object}
 * @api private
 */
function splitReference (ref) {
  // parse out the file path.
  // file path cases: ./responses.yaml
  // parse out the hashtag path from the file path.
  // hashtag path cases: #/components/root/get
  let filePath, hashtag
  let idxHashtag = ref.indexOf('#')
  if (idxHashtag > 5) {
    filePath = ref.slice(0, idxHashtag)
    switch (path.extname(filePath).toLowerCase()) {
      case '.json':
      case '.yaml':
      case '.yml':
        hashtag = ref.slice(idxHashtag + 1)

        // in case of windows operating system
        hashtag = hashtag.replace(/\\/g, '/')

        if (hashtag.startsWith('/')) {
          hashtag = hashtag.slice(1)
        }
        break
      default:
        filePath = ref
        break
    }
  }
  if (!filePath) filePath = ref
  return {filePath, hashtag}
}

/**
 * Slice hashtag path from JSON content.
 *
 * @param {string} content
 * @param {string} hashtag
 * @return {string}
 * @api private
 */
function sliceHashtagJSON (content, hashtag) {
  if (hashtag) {
    let obj = JSON.parse(content)
    hashtag.split('/').every(k => {
      obj = Object.getOwnPropertyDescriptor(obj, k).value
      return obj
    })
    if (obj) {
      content = JSON.stringify(obj)
    }
  }
  return content
}

module.exports.splitReference = splitReference
module.exports.sliceHashtag = sliceHashtagJSON
