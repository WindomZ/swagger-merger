/**
 * Created by WindomZ on 17-4-11.
 */
const yaml = require('js-yaml')

/**
 * Transcode JSON to YAML string.
 *
 * @param {string|Object} doc
 * @return {string}
 * @api public
 */
function stringJSON2YAML (doc) {
  if (!doc || (typeof doc !== 'string' && typeof doc !== 'object')) {
    throw new TypeError('"doc" argument must be a string or object, and not empty')
  }

  let obj = doc
  if (typeof doc === 'string') {
    obj = JSON.parse(doc)
  }

  if (!obj) {
    throw new TypeError('"doc" argument must be in json format')
  }

  return yaml.safeDump(obj)
}

/**
 * Transcode YAML to JSON string.
 *
 * @param {string} doc
 * @return {string}
 * @api public
 */
function stringYAML2JSON (doc) {
  if (!doc || typeof doc !== 'string') {
    throw new TypeError('"doc" argument must be a string or object, and not empty')
  }

  let obj = yaml.safeLoad(doc)

  if (!obj || typeof obj !== 'object') {
    throw new TypeError('"doc" argument must be in yaml format')
  }

  return JSON.stringify(obj)
}

module.exports = {stringJSON2YAML, stringYAML2JSON}
