/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const path = require('path')
const fs = require('fs')

const fmtconv = require('fmtconv')

const { isHTTP, isTmpDir, download, cacheRef } = require('./remote')
const { splitReference, sliceHashtag } = require('./reference')

/**
 * Merge JSON swagger strings.
 *
 * @param {object} param
 * @param {string} dir
 * @param {string} file
 * @param {string} doc
 * @return {string} the output file json string
 * @api public
 */
function mergeJSON (param, dir, file, doc) {
  return JSON.parse(mergeNestedJSON(param, dir, file, doc).replace(/{\[(.+?)\]}/g, s => {
    return s.substring(1, s.length - 1)
  }).replace(/{"((?!").)+?"}/g, s => {
    return s.substring(1, s.length - 1)
  }))
}

/**
 * Merge nested JSON swagger strings.
 *
 * @param {object} param
 * @param {string} dir
 * @param {string} file
 * @param {string} doc
 * @return {string} the nested json string
 * @api private
 */
function mergeNestedJSON (param, dir, file, doc) {
  // merge $ref
  doc = mergeJSONByRef(param, dir, file, doc)

  // merge $ref#*
  doc = mergeJSONByRefHashtag(param, dir, file, doc)

  return doc
}

function removeJSONBlock (s) {
  return s.replace(/(^{)|(}\s*$)/g, '')
}

/**
 * Merge JSON swagger $ref signs.
 *
 * @param {object} param
 * @param {string} dir
 * @param {string} file
 * @param {string} doc
 * @return {string} the nested json string
 * @api private
 */
function mergeJSONByRef (param, dir, file, doc) {
  return doc.replace(/\s*("\$ref")( *):( *)"[^"{}]+"\s*/gm, s => {
    let ref = JSON.parse('{' + s + '}').$ref.trim()
    if (ref.startsWith('#/') && file !== param.input) {
      ref = cacheRef(path.basename(file) + ref)
    }

    if (isHTTP(ref)) {
      // download file from url.
      const { filePath, hashtag } = splitReference(ref)
      return '"$ref":"' + download(param.tag, filePath) + (hashtag ? ('#' + hashtag) : '') + '"'
    } else if (isTmpDir(ref)) {
      s = '"$ref":"' + cacheRef(ref) + '"'
    }

    // parse out the file path and hashtag path.
    const { filePath, hashtag } = splitReference(path.isAbsolute(ref) ? ref : path.join(dir, ref))

    // read the file contents.
    const dirPath = path.dirname(filePath)
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
    switch (path.extname(filePath).toLowerCase()) {
      case '.json':
        // handle the hashtag
        fileContext = sliceHashtag(fileContext, hashtag)
        if (fileContext) {
          return mergeNestedJSON(param, dirPath, filePath, removeJSONBlock(fileContext))
        }
        break
      case '.yaml':
      case '.yml':
      case '':
        // yaml to json, handle the hashtag
        fileContext = sliceHashtag(fmtconv.stringYAML2JSON(fileContext), hashtag)
        if (fileContext) {
          return mergeNestedJSON(param, dirPath, filePath, removeJSONBlock(fileContext))
        }
        break
      default:
        console.error('warn: unsupported file extension "' + path.basename(filePath) + '"')
    }
    return s
  })
}

/**
 * Merge JSON swagger $ref#* signs.
 *
 * @param {object} param
 * @param {string} dir
 * @param {string} file
 * @param {string} doc
 * @return {string} the nested json string
 * @api private
 */
function mergeJSONByRefHashtag (param, dir, file, doc) {
  return doc.replace(/("\$ref#[A-Za-z0-9_#-]+")( *):( *)"[^"{}]+"/gm, s => {
    const refSign = s.match(/\$ref#[A-Za-z0-9_#-]+/gm)[0]
    const ref = JSON.parse('{' + s + '}')[refSign]

    // read the url contents.
    if (isHTTP(ref)) {
      const { filePath, hashtag } = splitReference(ref)
      return '"' + refSign + '":"' + download(param.tag, filePath) + (hashtag ? ('#' + hashtag) : '') + '"'
    } else if (isTmpDir(ref)) {
      s = '"' + refSign + '":"' + cacheRef(ref) + '"'
    }

    // parse out the file path and hashtag path.
    const { filePath, hashtag } = splitReference(path.isAbsolute(ref) ? ref : path.join(dir, ref))

    // read the file contents.
    const dirPath = path.dirname(filePath)
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

    // core code - swagger merge $ref#*
    switch (path.extname(filePath).toLowerCase()) {
      case '.json':
        // handle the hashtag
        fileContext = sliceHashtag(fileContext, hashtag)
        if (fileContext) {
          return mergeNestedJSON(param, dirPath, filePath, removeJSONBlock(fileContext))
        }
        break
      case '.yaml':
      case '.yml':
      case '':
        // yaml to json, handle the hashtag
        fileContext = sliceHashtag(fmtconv.stringYAML2JSON(fileContext), hashtag)
        if (fileContext) {
          return mergeNestedJSON(param, dirPath, filePath, removeJSONBlock(fileContext))
        }
        break
      default:
        console.error('warn: unsupported file extension "' + path.basename(filePath) + '"')
    }
    return s
  })
}

module.exports = mergeJSON
