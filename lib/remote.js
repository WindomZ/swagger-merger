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

let tmpDir = path.join(os.tmpdir(), 'swagger-merger')
let downloading = {}

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

  if (fs.existsSync(filePath)) {
    return filePath
  }

  let file = fs.createWriteStream(filePath)
  if (!downloading[tag]) downloading[tag] = 0
  downloading[tag]++
  (url.startsWith('https://') ? https : http).get(url, (resp) => {
    resp.pipe(file)
    file.on('finish', () => {
      file.close()
      downloading[tag]--
    })
  }).on('error', () => {
    fs.unlink(filePath)
    downloading[tag]--
  })

  return filePath
}

function deleteFolder (dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(function (file) {
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

function clean (tag) {
  deleteFolder(path.join(tmpDir, tag))
}

function wait (tag) {
  return new Promise(resolve => {
    let id = setInterval(() => {
      if (id && isFinish(tag)) {
        resolve(fs.existsSync(path.join(tmpDir, tag)))
        clearInterval(id)
        id = undefined
      }
    }, 200)
  })
}

function isFinish (tag) {
  return !downloading[tag]
}

module.exports.isHTTP = isHTTP
module.exports.isTmpDir = isTmpDir
module.exports.download = download
module.exports.clean = clean
module.exports.wait = wait
