/**
 * Created by WindomZ on 18-2-26.
 */
'use strict'

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
  const idxHashtag = ref.indexOf('#')
  if (idxHashtag > 5) {
    filePath = ref.slice(0, idxHashtag)
    if (filePath.endsWith('/') || filePath.endsWith('\\')) {
      filePath = ref
      return { filePath }
    }

    hashtag = ref.slice(idxHashtag + 1)

    // in case of windows operating system
    hashtag = hashtag.replace(/\\/g, '/')

    if (hashtag.startsWith('/')) {
      hashtag = hashtag.slice(1)
    }
  }
  if (!filePath) filePath = ref
  return { filePath, hashtag }
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
      k = k.replace(/~0/g, '~')
        .replace(/~1/g, '/')
      const desc = Object.getOwnPropertyDescriptor(obj, k)
      if (desc) {
        obj = desc.value
      } else {
        obj = null
        return false
      }
      return true
    })
    return obj ? JSON.stringify(obj) : null
  }
  return content
}

module.exports.splitReference = splitReference
module.exports.sliceHashtag = sliceHashtagJSON
