/**
 * Created by WindomZ on 17-4-11.
 */
const test = require('ava')

const transcoder = require('../lib/transcoder')

test('transcoder fail', async (t) => {
  await transcoder({
    input: ''
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())

  await transcoder({
    input: './example/echo/swagger.yaml',
    output: ''
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())

  await transcoder({
    input: './example/echo/swagger.xxx',
    output: './example/echo/swagger-trans.yaml'
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())

  await transcoder({
    input: './example/echo/swagger.yaml',
    output: './example/echo/swagger-trans.xxx'
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())

  await transcoder({
    input: './example/echo/echo.yaml',
    output: './example/echo/swagger-trans.yaml'
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())
})

test('transcoder heroku-pets pass', async (t) => {
  await transcoder({
    input: './example/heroku-pets/heroku-pets.yaml',
    output: './example/heroku-pets/swagger-trans.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await transcoder({
    input: './example/heroku-pets/heroku-pets.json',
    output: './example/heroku-pets/swagger-trans.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))
})

test('transcoder echo pass', async (t) => {
  await transcoder({
    input: './example/echo/echo.yaml',
    output: './example/echo/swagger-trans.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await transcoder({
    input: './example/echo/echo.json',
    output: './example/echo/swagger-trans.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))
})

test('transcoder petstore_simple pass', async (t) => {
  await transcoder({
    input: './example/petstore_simple/petstore_simple.yaml',
    output: './example/petstore_simple/swagger-trans.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await transcoder({
    input: './example/petstore_simple/petstore_simple.json',
    output: './example/petstore_simple/swagger-trans.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))
})
