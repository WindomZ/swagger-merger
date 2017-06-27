/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const path = require('path')
const fs = require('fs')

const fmtconv = require('fmtconv')

/**
 * Merge JSON swagger string.
 *
 * @param {string} dir
 * @param {object} obj
 * @return {string}
 * @api public
 */
function mergeJSON (dir, obj) {
  let doc = JSON.stringify(obj)
  return JSON.parse(mergeJSONDoc(dir, doc))
}

/**
 * Merge JSON swagger doc.
 *
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeJSONDoc (dir, doc) {
  // merge $ref
  doc = mergeJSONPoundSignRef(dir, doc)

  // merge $replace-*
  doc = mergeJSONDollarSignRefPoundSign(dir, doc)

  return doc
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
      let dirname = path.dirname(filePath)
      try {
        fs.accessSync(filePath, fs.R_OK)
      } catch (e) {
        return s
      }
      let fileContext = '' + fs.readFileSync(filePath)
      switch (path.extname(filePath).toLowerCase()) {
        case '.json':
          return mergeJSONDoc(dirname, fileContext)
        case '.yaml':
        case '.yml':
          return mergeJSONDoc(dirname, fmtconv.stringYAML2JSON(fileContext))
      }
    } catch (e) {
      throw e
    }
    return s
  })
}

/**
 * Merge JSON swagger $ref#* signs.
 *
 * @param {string} dir
 * @param {string} doc
 * @return {string}
 * @api private
 */
function mergeJSONDollarSignRefPoundSign (dir, doc) {
  return doc.replace(new RegExp(`("\\$ref#[A-Za-z0-9_#-]+")( *):( *)"[^"{}]+"`, 'gm'), s => {
    try {
      let filePath = path.join(dir,
        JSON.parse('{' + s + '}')[s.match(new RegExp(`\\$ref#[A-Za-z0-9_#-]+`, 'gm'))])
      let dirname = path.dirname(filePath)
      try {
        fs.accessSync(filePath, fs.R_OK)
      } catch (e) {
        return s
      }
      let fileContext = '' + fs.readFileSync(filePath)
      switch (path.extname(filePath).toLowerCase()) {
        case '.json':
          return mergeJSONDoc(dirname, fileContext.replace(new RegExp(`(^{)|(}$)`, 'g'), ''))
        case '.yaml':
        case '.yml':
          fileContext = fmtconv.stringYAML2JSON(fileContext)
          return mergeJSONDoc(dirname, fileContext.replace(new RegExp(`(^{)|(}$)`, 'g'), ''))
      }
    } catch (e) {
      throw e
    }
    return s
  })
}

module.exports = mergeJSON
