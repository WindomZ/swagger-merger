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

let tmpDir = path.join(os.tmpdir(), 'swagger-merger')
let tasks = {}

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
      return
  }

  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir)
  }
  let fileDir = path.join(tmpDir, tag)
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir)
  }

  let filePath = path.join(fileDir, crypto.createHash('md5').update(url).digest('hex')) + extName

  if (!tasks[tag]) {
    tasks[tag] = {}
  }
  tasks[tag][filePath] = url

  return filePath.split(path.sep).join('/')
}

function downloadTasks (tag) {
  let result = []
  Object.keys(tasks[tag]).forEach((filePath) => {
    let url = tasks[tag][filePath]
    result.push((callback) => {
      let file = fs.createWriteStream(filePath)
      let timeout
      let req = (url.startsWith('https://') ? https : http).get(url, (resp) => {
        clearTimeout(timeout)

        resp.pipe(file)
        file.on('finish', () => {
          file.close()
          callback(null)
        })
      }).on('error', (err) => {
        console.error(err)
        fs.unlinkSync(filePath)
      }).on('timeout', () => {
        callback(null)
        req.abort()
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
      let filePath = path.join(dirPath, file)
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
      resolve(false)
      return
    }
    async.parallel(
      downloadTasks(tag),
      function () {
        resolve(fs.existsSync(path.join(tmpDir, tag)))
      }
    )
  })
}

function clean (tag) {
  deleteFolder(path.join(tmpDir, tag))
}

module.exports.isHTTP = isHTTP
module.exports.isTmpDir = isTmpDir
module.exports.download = download
module.exports.downloading = downloading
module.exports.clean = clean
