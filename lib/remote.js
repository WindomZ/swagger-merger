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
let downloading = 0

function isHTTP (p) {
  return p.startsWith('http://') || p.startsWith('https://')
}

function isTmpDir (p) {
  return p.startsWith(tmpDir)
}

function download (url) {
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

  let filePath = path.join(tmpDir, crypto.createHash('md5').update(url).digest('hex')) + extName

  if (fs.existsSync(filePath)) {
    return filePath
  }

  let file = fs.createWriteStream(filePath)
  downloading++
  (url.startsWith('https://') ? https : http).get(url, (resp) => {
    resp.pipe(file)
    file.on('finish', () => {
      file.close()
      downloading--
    })
  }).on('error', () => {
    fs.unlink(filePath)
    downloading--
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

function clean () {
  deleteFolder(tmpDir)
}

function wait () {
  return new Promise(resolve => {
    let id = setInterval(() => {
      if (id && isFinish()) {
        resolve(fs.existsSync(tmpDir))
        clearInterval(id)
        id = undefined
      }
    }, 200)
  })
}

function isFinish () {
  return downloading <= 0
}

module.exports.isHTTP = isHTTP
module.exports.isTmpDir = isTmpDir
module.exports.download = download
module.exports.clean = clean
module.exports.wait = wait
