/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const path = require('path')
const fs = require('fs')

const fmtconv = require('fmtconv')

const {splitReference, sliceHashtag} = require('./reference')

/**
 * Merge JSON swagger strings.
 *
 * @param {string} dir
 * @param {object} obj
 * @return {string}
 * @api public
 */
function mergeJSON (dir, obj) {
  return JSON.parse(mergeNestedJSON(dir, JSON.stringify(obj)))
}

/**
 * Merge nested JSON swagger strings.
 *
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeNestedJSON (dir, doc) {
  // merge $ref
  doc = mergeJSONDollarRef(dir, doc)

  // merge $ref#*
  doc = mergeJSONDollarRefPound(dir, doc)

  return doc
}

const regDollarRef = new RegExp(`([ \n\r]*)("\\$ref")( *):( *)"[^"{}]+"([ \n\r]*)`, 'gm')
const regBlock = new RegExp(`(^{)|(}[ \n\r]*$)`, 'g')

function removeJSONBlock (s) {
  return s.replace(regBlock, '')
}

/**
 * Merge JSON swagger $ref signs.
 *
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeJSONDollarRef (dir, doc) {
  return doc.replace(regDollarRef, s => {
    try {
      // parse out the file path and hashtag path.
      let {filePath, hashtag} = splitReference(path.join(dir, JSON.parse('{' + s + '}').$ref))

      // read the file contents.
      let dirName = path.dirname(filePath)
      try {
        fs.accessSync(filePath, fs.R_OK)
      } catch (e) {
        return s
      }
      let fileContext = '' + fs.readFileSync(filePath)

      // core code - swagger merge $ref
      switch (path.extname(filePath).toLowerCase()) {
        case '.json':
          // handle the hashtag
          fileContext = sliceHashtag(fileContext, hashtag)
          return mergeNestedJSON(dirName, removeJSONBlock(fileContext))
        case '.yaml':
        case '.yml':
          // yaml to json, handle the hashtag
          fileContext = sliceHashtag(fmtconv.stringYAML2JSON(fileContext), hashtag)
          return mergeNestedJSON(dirName, removeJSONBlock(fileContext))
      }
    } catch (e) {
      throw e
    }
    return s
  })
}

const regDollarRefPound = new RegExp(`("\\$ref#[A-Za-z0-9_#-]+")( *):( *)"[^"{}]+"`, 'gm')
const regDollarRefPoundSign = new RegExp(`\\$ref#[A-Za-z0-9_#-]+`, 'gm')

/**
 * Merge JSON swagger $ref#* signs.
 *
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeJSONDollarRefPound (dir, doc) {
  return doc.replace(regDollarRefPound, s => {
    try {
      // parse out the file path and hashtag path.
      let {filePath, hashtag} = splitReference(path.join(dir,
        JSON.parse('{' + s + '}')[s.match(regDollarRefPoundSign)]))

      // read the file contents.
      let dirName = path.dirname(filePath)
      try {
        fs.accessSync(filePath, fs.R_OK)
      } catch (e) {
        return s
      }
      let fileContext = '' + fs.readFileSync(filePath)

      // core code - swagger merge $ref#*
      switch (path.extname(filePath).toLowerCase()) {
        case '.json':
          // handle the hashtag
          fileContext = sliceHashtag(fileContext, hashtag)
          return mergeNestedJSON(dirName, removeJSONBlock(fileContext))
        case '.yaml':
        case '.yml':
          // yaml to json, handle the hashtag
          fileContext = sliceHashtag(fmtconv.stringYAML2JSON(fileContext), hashtag)
          return mergeNestedJSON(dirName, removeJSONBlock(fileContext))
      }
    } catch (e) {
      throw e
    }
    return s
  })
}

module.exports = mergeJSON
