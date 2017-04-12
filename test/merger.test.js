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

test('merger heroku-pets pass', async (t) => {
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
})

test('merger echo pass', async (t) => {
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

test('merger petstore_simple pass', async (t) => {
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
})
