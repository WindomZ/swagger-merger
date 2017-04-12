/**
 * Created by WindomZ on 17-4-12.
 */
const test = require('ava')

const merger = require('../lib/merger_yaml')

test('merger_json pass', async (t) => {
  await merger({
    dir: './example/echo/',
    input: './example/echo/index.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    dir: './example/echo/',
    input: './example/echo/index.yaml',
    output: './example/echo/swagger.yaml'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))
})
