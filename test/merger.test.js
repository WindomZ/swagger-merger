/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const os = require('os')
const path = require('path')
const fs = require('fs')

const test = require('ava')

const merger = require('../lib/merger')

test.serial('merger fail', async (t) => {
  await merger({
    input: ''
  }).then(() => {
    t.fail('should be catch error 1')
  }).catch(() => t.pass())

  await merger({
    input: './example/echo/index.xxx'
  }).then(() => {
    t.fail('should be catch error 2')
  }).catch(() => t.pass())
})

test.serial('merger heroku-pets pass', async (t) => {
  await merger({
    input: './example/heroku-pets/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    input: './example/heroku-pets/index.json',
    output: './example/heroku-pets/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    input: './example/heroku-pets/index.yml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  // whether the results are expected
  t.is('' + fs.readFileSync('./example/heroku-pets/swagger.json'),
    '' + fs.readFileSync('./example/heroku-pets/heroku-pets.json'))
})

test.serial('merger echo pass', async (t) => {
  await merger({
    input: './example/echo/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    input: './example/echo/index.json',
    output: './example/echo/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    input: './example/echo/index.yml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  // whether the results are expected
  t.is('' + fs.readFileSync('./example/echo/swagger.json'),
    '' + fs.readFileSync('./example/echo/echo.json'))
})

test.serial('merger petstore_simple pass', async (t) => {
  await merger({
    input: './example/petstore_simple/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    input: './example/petstore_simple/index.json',
    output: './example/petstore_simple/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    input: './example/petstore_simple/index.yml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  // whether the results are expected
  t.is('' + fs.readFileSync('./example/petstore_simple/swagger.json'),
    '' + fs.readFileSync('./example/petstore_simple/petstore_simple.json'))
})

test.serial('merger petstore_domain pass', async (t) => {
  // make temp directory for testing
  let dir = path.join(os.tmpdir(), 'swagger-merger')
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    let dirTmp = path.join(dir, 'c1472d0a385c71aaf18cd770c366eb79')
    if (!fs.existsSync(dirTmp)) {
      fs.mkdirSync(dirTmp)
    }
    fs.mkdirSync(path.join(dirTmp, 'test'))
    fs.openSync(path.join(dirTmp, 'd27dac1b6e9f308b0214205efaeb71cc.yaml'), 'w', 644)
  } catch (e) {
    t.pass()
  }

  await merger({
    input: './example/petstore_domain/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  // clean temp directory
  if (fs.existsSync(dir)) {
    fs.rmdir(dir, () => {
      t.pass()
    })
  }

  await merger({
    input: './example/petstore_domain/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    input: './example/petstore_domain/index.json',
    output: './example/petstore_domain/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    input: './example/petstore_domain/index.yml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  // whether the results are expected
  t.is('' + fs.readFileSync('./example/petstore_domain/swagger.json'),
    '' + fs.readFileSync('./example/petstore_domain/petstore_simple.json'))
})
