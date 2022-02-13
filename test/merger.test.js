/**
 * Created by WindomZ on 17-4-11.
 */
'use strict'

const os = require('os')
const path = require('path')
const fs = require('fs')

const test = require('ava')

const merger = require('../lib/merger')

test.serial('test -> `merger fail` - 1', async (t) => {
  await merger({
    input: ''
  }).then(() => {
    t.fail('should be catch error 1')
  }).catch(() => t.pass())
})

test.serial('test -> `merger fail` - 2', async (t) => {
  await merger({
    input: './example/echo/index.xxx'
  }).then(() => {
    t.fail('should be catch error 2')
  }).catch(() => t.pass())
})

test.serial('test -> `merger pass` - 1', async (t) => {
  await merger({
    input: './test/404.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger pass` - 2', async (t) => {
  await merger({
    input: './test/in.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))

  // whether the results are expected
  t.is('' + fs.readFileSync('./test/out.yaml'),
    '' + fs.readFileSync('./test/swagger.yaml'))
})

test.serial('test -> `merger pass` - 3', async (t) => {
  await merger({
    input: './test/in.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))

  // whether the results are expected
  t.is('' + fs.readFileSync('./test/out.json'),
    '' + fs.readFileSync('./test/swagger.json'))
})

test.serial('test -> `merger pass` - 4', async (t) => {
  await merger({
    input: './test/in.yaml',
    output: './test/out.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))

  // whether the results are expected
  t.is('' + fs.readFileSync('./test/out.json'),
    '' + fs.readFileSync('./test/swagger.json'))
})

test.serial('test -> `merger pass` - 5', async (t) => {
  await merger({
    input: './test/in.json',
    output: './test/out.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))

  // whether the results are expected
  t.is('' + fs.readFileSync('./test/out.yaml'),
    '' + fs.readFileSync('./test/swagger.yaml'))
})

test.serial('test -> `merger pass` - 6', async (t) => {
  await merger({
    input: './test/in.yaml',
    output: './test/out'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger pass` - 7', async (t) => {
  await merger({
    input: './test/in.json',
    output: './test/out'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger heroku-pets pass` - 1', async (t) => {
  await merger({
    input: './example/heroku-pets/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger heroku-pets pass` - 2', async (t) => {
  await merger({
    input: './example/heroku-pets/index.json',
    output: './example/heroku-pets/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))

  // whether the results are expected
  t.is('' + fs.readFileSync('./example/heroku-pets/swagger.json'),
    '' + fs.readFileSync('./example/heroku-pets/heroku-pets.json'))
})

test.serial('test -> `merger heroku-pets pass` - 3', async (t) => {
  await merger({
    input: './example/heroku-pets/index.yml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger echo pass` - 1', async (t) => {
  await merger({
    input: './example/echo/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger echo pass` - 2', async (t) => {
  await merger({
    input: './example/echo/index.json',
    output: './example/echo/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))

  // whether the results are expected
  t.is('' + fs.readFileSync('./example/echo/swagger.json'),
    '' + fs.readFileSync('./example/echo/echo.json'))
})

test.serial('test -> `merger echo pass` - 3', async (t) => {
  await merger({
    input: './example/echo/index.yml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger petstore_simple pass` - 1', async (t) => {
  await merger({
    input: './example/petstore_simple/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger petstore_simple pass` - 2', async (t) => {
  await merger({
    input: './example/petstore_simple/index.json',
    output: './example/petstore_simple/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))

  // whether the results are expected
  t.is('' + fs.readFileSync('./example/petstore_simple/swagger.json'),
    '' + fs.readFileSync('./example/petstore_simple/petstore_simple.json'))
})

test.serial('test -> `merger petstore_simple pass` - 3', async (t) => {
  await merger({
    input: './example/petstore_simple/index.yml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger petstore_domain pass` - 1', async (t) => {
  // make temp directory for testing
  const dir = path.join(os.tmpdir(), 'swagger-merger')
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    const dirTmp = path.join(dir, 'c1472d0a385c71aaf18cd770c366eb79')
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
  }).catch(err => t.fail(err.message))

  // clean temp directory
  if (fs.existsSync(dir)) {
    fs.rmdir(dir, () => {
      t.pass()
    })
  }
})

test.serial('test -> `merger petstore_domain pass` - 2', async (t) => {
  await merger({
    input: './example/petstore_domain/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})

test.serial('test -> `merger petstore_domain pass` - 3', async (t) => {
  await merger({
    input: './example/petstore_domain/index.json',
    output: './example/petstore_domain/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))

  // whether the results are expected
  t.is('' + fs.readFileSync('./example/petstore_domain/swagger.json'),
    '' + fs.readFileSync('./example/petstore_domain/petstore_simple.json'))
})

test.serial('test -> `merger petstore_domain pass` - 4', async (t) => {
  await merger({
    input: './example/petstore_domain/index.yml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err.message))
})
