/**
 * Created by WindomZ on 17-4-11.
 */
const test = require('ava')

const transcoder = require('../lib/transcoder')

test.serial('transcoder error 1', async (t) => {
  await transcoder({
    input: ''
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())
})

test.serial('transcoder error 2', async (t) => {
  await transcoder({
    input: './example/echo/swagger.xxx'
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())
})

test.serial('transcoder error 3', async (t) => {
  await transcoder({
    input: './example/echo/echo.yaml',
    output: './example/echo/swagger-trans.yaml'
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())
})

test.serial('transcoder pass 1', async (t) => {
  await transcoder({
    input: './example/echo/echo.yaml',
    output: './example/echo/swagger-trans.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))
})

test.serial('transcoder pass 2', async (t) => {
  await transcoder({
    input: './example/echo/echo.json',
    output: './example/echo/swagger-trans.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))
})
