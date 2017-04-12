/**
 * Created by WindomZ on 17-4-12.
 */
const test = require('ava')

const merger = require('../lib/merger_json')

test('merger_json pass', async (t) => {
  await merger({
    dir: './example/echo/',
    input: './example/echo/index.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))

  await merger({
    dir: './example/echo/',
    input: './example/echo/index.json',
    output: './example/echo/swagger.json'
  }).then(() => {
    t.pass()
  }).catch(err => t.fail(err))
})
