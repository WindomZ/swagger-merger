/**
 * Created by WindomZ on 18-4-11.
 */
'use strict'

const os = require('os')
const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')
const crypto = require('crypto')

const async = require('async')

const { splitReference } = require('./reference')

const tmpDir = path.join(os.tmpdir(), 'swagger-merger')
const tmpPaths = {}
const tasks = {}

function isHTTP (p) {
  return p.startsWith('http://') || p.startsWith('https://')
}

function isTmpDir (p) {
  return p.startsWith(tmpDir)
}

function download (tag, url) {
  let extName
  switch (path.extname(url).toLowerCase()) {
    case '.json':
      extName = '.json'
      break
    case '.yaml':
      extName = '.yaml'
      break
    case '.yml':
      extName = '.yml'
      break
    default:
      extName = ''
  }

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir)
  }
  const fileDir = path.join(tmpDir, tag)
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir)
  }

  const filePath = path.join(fileDir, crypto.createHash('md5').update(url).digest('hex')) + extName

  if (!tasks[tag]) {
    tasks[tag] = {}
  }
  tasks[tag][filePath] = url

  const tmpPath = filePath.split(path.sep).join('/')
  tmpPaths[tmpPath] = url
  return tmpPath
}

function downloadTasks (tag) {
  const result = []
  Object.keys(tasks[tag]).forEach((filePath) => {
    const url = tasks[tag][filePath]
    result.push((callback) => {
      const file = fs.createWriteStream(filePath)
      let timeout = null
      const req = (url.startsWith('https://') ? https : http).get(url, (resp) => {
        if (timeout) {
          clearTimeout(timeout)
        }

        if (resp.statusCode < 200 || resp.statusCode > 299) {
          file.close()
          callback(null, 'download failed: ' + url + ' response: ' + resp.statusCode +
            '(' + resp.statusMessage + ')')
          return
        }

        resp.pipe(file)
        file.on('finish', () => {
          file.close()
          callback(null, 'download success: ' + url)
        })
      }).on('error', (err) => {
        if (err.message.indexOf('socket hang up') === -1) {
          callback(null, 'download error: ' + err)
        }
        // fs.unlinkSync(filePath)
      }).on('timeout', () => {
        req.destroy()
        callback(null, 'download timeout: ' + url)
      })

      timeout = setTimeout(() => {
        req.emit('timeout')
      }, 15000)
    })
    return true
  })
  return result
}

function deleteFolder (dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const filePath = path.join(dirPath, file)
      if (fs.statSync(filePath).isDirectory()) {
        deleteFolder(filePath)
      } else {
        fs.unlinkSync(filePath)
      }
    })
    fs.rmdirSync(dirPath)
    return true
  }
  return false
}

function downloading (tag) {
  return new Promise(resolve => {
    if (!tasks[tag]) {
      resolve(fs.existsSync(path.join(tmpDir, tag)))
      return
    }
    async.parallel(
      downloadTasks(tag),
      function (_, result) {
        result.forEach(r => console.log(r))
        resolve(fs.existsSync(path.join(tmpDir, tag)))
      }
    )
  })
}

function clean (tag) {
  deleteFolder(path.join(tmpDir, tag))
}

function cacheRef (ref) {
  const { filePath, hashtag } = splitReference(ref)
  return tmpPaths[filePath]
    ? (tmpPaths[filePath] +
      (hashtag ? '#' + hashtag : ''))
    : ref
}

module.exports.isHTTP = isHTTP
module.exports.isTmpDir = isTmpDir
module.exports.download = download
module.exports.downloading = downloading
module.exports.clean = clean
module.exports.cacheRef = cacheRef
