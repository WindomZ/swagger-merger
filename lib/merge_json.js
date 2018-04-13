/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const path = require('path')
const fs = require('fs')

const fmtconv = require('fmtconv')

const {isHTTP, isTmpDir, download} = require('./remote')
const {splitReference, sliceHashtag} = require('./reference')

const regFixBlock = new RegExp(`{\\[(.+?)\\]}`, 'g')

/**
 * Merge JSON swagger strings.
 *
 * @param {string} tag
 * @param {string} dir
 * @param {object} obj
 * @return {string}
 * @api public
 */
function mergeJSON (tag, dir, obj) {
  return JSON.parse(mergeNestedJSON(tag, dir, JSON.stringify(obj)).replace(regFixBlock, s => {
    return s.substring(1, s.length - 1)
  }))
}

/**
 * Merge nested JSON swagger strings.
 *
 * @param {string} tag
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeNestedJSON (tag, dir, doc) {
  // merge $ref
  doc = mergeJSONDollarRef(tag, dir, doc)

  // merge $ref#*
  doc = mergeJSONDollarRefPound(tag, dir, doc)

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
 * @param {string} tag
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeJSONDollarRef (tag, dir, doc) {
  return doc.replace(regDollarRef, s => {
    try {
      let ref = JSON.parse('{' + s + '}').$ref

      // read the url contents.
      if (isHTTP(ref)) {
        let {filePath, hashtag} = splitReference(ref)
        return '"$ref":"' + download(tag, filePath) + '#' + hashtag + '"'
      } else if (isTmpDir(ref)) {
        dir = ''
      }

      // parse out the file path and hashtag path.
      let {filePath, hashtag} = splitReference(path.join(dir, ref))

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
          return mergeNestedJSON(tag, dirName, removeJSONBlock(fileContext))
        case '.yaml':
        case '.yml':
          // yaml to json, handle the hashtag
          fileContext = sliceHashtag(fmtconv.stringYAML2JSON(fileContext), hashtag)
          return mergeNestedJSON(tag, dirName, removeJSONBlock(fileContext))
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
 * @param {string} tag
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeJSONDollarRefPound (tag, dir, doc) {
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
          return mergeNestedJSON(tag, dirName, removeJSONBlock(fileContext))
        case '.yaml':
        case '.yml':
          // yaml to json, handle the hashtag
          fileContext = sliceHashtag(fmtconv.stringYAML2JSON(fileContext), hashtag)
          return mergeNestedJSON(tag, dirName, removeJSONBlock(fileContext))
      }
    } catch (e) {
      throw e
    }
    return s
  })
}

module.exports = mergeJSON
