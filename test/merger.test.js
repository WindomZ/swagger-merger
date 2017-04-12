/**
 * Created by WindomZ on 17-4-11.
 */
const test = require('ava')

const merger = require('../lib/merger')

test('merger fail', async (t) => {
  await merger({
    input: ''
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())

  await merger({
    input: './example/echo/index.xxx'
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())

  await merger({
    input: './example/echo/index.yaml',
    output: './example/echo/swagger.json'
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())
})

test('merger pass', async (t) => {
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
})
