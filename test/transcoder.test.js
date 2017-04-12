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

test('transcoder pass', async (t) => {
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
