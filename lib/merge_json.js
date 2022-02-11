/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const path = require('path')
const fs = require('fs')

const fmtconv = require('fmtconv')

const { isHTTP, isTmpDir, download, undo } = require('./remote')
const { splitReference, sliceHashtag } = require('./reference')

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
  return JSON.parse(mergeNestedJSON(tag, dir, JSON.stringify(obj)).replace(/{\[(.+?)\]}/g, s => {
    return s.substring(1, s.length - 1)
  }).replace(/{"((?!").)+?"}/g, s => {
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
  doc = mergeJSONByRef(tag, dir, doc)

  // merge $ref#*
  doc = mergeJSONByRefHashtag(tag, dir, doc)

  return doc
}

function removeJSONBlock (s) {
  return s.replace(/(^{)|(}\s*$)/g, '')
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
function mergeJSONByRef (tag, dir, doc) {
  return doc.replace(/\s*("\$ref")( *):( *)"[^"{}]+"\s*/gm, s => {
    const ref = JSON.parse('{' + s + '}').$ref

    // read the url contents.
    if (isHTTP(ref)) {
      const { filePath, hashtag } = splitReference(ref)
      return '"$ref":"' + download(tag, filePath) + (hashtag ? ('#' + hashtag) : '') + '"'
    } else if (isTmpDir(ref)) {
      dir = ''
      s = '"$ref":"' + undo(ref) + '"'
    }

    // parse out the file path and hashtag path.
    const { filePath, hashtag } = splitReference(path.join(dir, ref))

    // read the file contents.
    const dirName = path.dirname(filePath)
    try {
      fs.accessSync(filePath, fs.R_OK)
    } catch (e) {
      return s
    }
    let fileContext = '' + fs.readFileSync(filePath)
    if (!fileContext) {
      if (!isTmpDir(ref)) console.error('error: "' + ref + '" should not be empty.')
      return s
    }

    // core code - swagger merge $ref
    let ext = path.extname(filePath).toLowerCase()
    if (!ext) ext = '.yaml'
    do {
      switch (ext) {
        case '.json':
          // handle the hashtag
          fileContext = sliceHashtag(fileContext, hashtag)
          return mergeNestedJSON(tag, dirName, removeJSONBlock(fileContext))
        case '.yaml':
        case '.yml':
          // yaml to json, handle the hashtag
          fileContext = sliceHashtag(fmtconv.stringYAML2JSON(fileContext), hashtag)
          return mergeNestedJSON(tag, dirName, removeJSONBlock(fileContext))
        default:
          ext = null
      }
    } while (ext)
    return s
  })
}

/**
 * Merge JSON swagger $ref#* signs.
 *
 * @param {string} tag
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeJSONByRefHashtag (tag, dir, doc) {
  return doc.replace(/("\$ref#[A-Za-z0-9_#-]+")( *):( *)"[^"{}]+"/gm, s => {
    const refSign = s.match(/\$ref#[A-Za-z0-9_#-]+/gm)[0]
    const ref = JSON.parse('{' + s + '}')[refSign]

    // read the url contents.
    if (isHTTP(ref)) {
      const { filePath, hashtag } = splitReference(ref)
      return '"' + refSign + '":"' + download(tag, filePath) + (hashtag ? ('#' + hashtag) : '') + '"'
    } else if (isTmpDir(ref)) {
      dir = ''
      s = '"' + refSign + '":"' + undo(ref) + '"'
    }

    // parse out the file path and hashtag path.
    const { filePath, hashtag } = splitReference(path.join(dir, ref))

    // read the file contents.
    const dirName = path.dirname(filePath)
    try {
      fs.accessSync(filePath, fs.R_OK)
    } catch (e) {
      return s
    }
    let fileContext = '' + fs.readFileSync(filePath)
    if (!fileContext) {
      if (!isTmpDir(ref)) console.error('error: "' + ref + '" should not be empty.')
      return s
    }

    let ext = path.extname(filePath).toLowerCase()
    if (!ext) ext = '.yaml'
    do {
      // core code - swagger merge $ref#*
      switch (ext) {
        case '.json':
          // handle the hashtag
          fileContext = sliceHashtag(fileContext, hashtag)
          return mergeNestedJSON(tag, dirName, removeJSONBlock(fileContext))
        case '.yaml':
        case '.yml':
          // yaml to json, handle the hashtag
          fileContext = sliceHashtag(fmtconv.stringYAML2JSON(fileContext), hashtag)
          return mergeNestedJSON(tag, dirName, removeJSONBlock(fileContext))
        default:
          ext = null
      }
    } while (ext)
    return s
  })
}

module.exports = mergeJSON
