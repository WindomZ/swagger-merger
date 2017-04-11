/**
 * Created by WindomZ on 17-4-11.
 */
const test = require('ava')

const merger = require('../lib/merger')

test.serial('merger error 1', async (t) => {
  await merger({
    input: ''
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())
})

test.serial('merger error 2', async (t) => {
  await merger({
    input: './example/index.xxx'
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())
})

test.serial('merger error 3', async (t) => {
  await merger({
    input: './example/index.yaml',
    output: './example/swagger.json'
  }).then(() => {
    t.fail('should be catch error')
  }).catch(() => t.pass())
})

test.serial('merger pass 1', async (t) => {
  await merger({
    input: './example/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))
})

test.serial('merger pass 2', async (t) => {
  await merger({
    input: './example/index.json',
    output: './example/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))
})
