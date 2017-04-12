/**
 * Created by WindomZ on 17-4-11.
 */
const path = require('path')
const fs = require('fs')

const co = require('co')

const {stringYAML2JSON} = require('./transcode')

/**
 * Merge JSON swagger string.
 *
 * @param {string} dir
 * @param {object} obj
 * @return {string}
 * @api public
 */
function * mergeJSON (dir, obj) {
  let doc = JSON.stringify(obj)

  // merge $ref
  doc = mergeJSONPoundSignRef(dir, doc)

  // merge $replace-*
  doc = mergeJSONPoundSignRefMinusSign(dir, doc)

  return JSON.parse(doc)
}

/**
 * Merge JSON swagger $ref signs.
 *
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeJSONPoundSignRef (dir, doc) {
  return doc.replace(new RegExp(`({[ \n\r]*)("\\$ref")( *):( *)"[^"{}]+"([ \n\r]*})`, 'gm'), s => {
    try {
      let filePath = path.join(dir, JSON.parse(s).$ref)
      try {
        fs.accessSync(filePath, fs.R_OK)
      } catch (e) {
        return s
      }
      let fileContext = '' + fs.readFileSync(filePath)
      switch (path.extname(filePath).toLowerCase()) {
        case '.json':
          return fileContext
        case '.yaml':
          return stringYAML2JSON(fileContext)
      }
    } catch (e) {
      throw e
    }
    return s
  })
}

/**
 * Merge JSON swagger $ref-* signs.
 *
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeJSONPoundSignRefMinusSign (dir, doc) {
  return doc.replace(new RegExp(`("\\$ref-[A-Za-z0-9_#-]+")( *):( *)"[^"{}]+"`, 'gm'), s => {
    try {
      let filePath = path.join(dir,
        JSON.parse('{' + s + '}')[s.match(new RegExp(`\\$ref-[A-Za-z0-9_#-]+`, 'gm'))])
      try {
        fs.accessSync(filePath, fs.R_OK)
      } catch (e) {
        return s
      }
      let fileContext = '' + fs.readFileSync(filePath)
      switch (path.extname(filePath).toLowerCase()) {
        case '.json':
          return fileContext.replace(new RegExp(`(^{)|(}$)`, 'g'), '')
        case '.yaml':
          fileContext = stringYAML2JSON(fileContext)
          return fileContext.replace(new RegExp(`(^{)|(}$)`, 'g'), '')
      }
    } catch (e) {
      throw e
    }
    return s
  })
}

module.exports = (dir, obj) => co.wrap(mergeJSON)(dir, obj)
