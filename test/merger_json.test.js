/**
 * Created by WindomZ on 17-4-12.
 */
const test = require('ava')

const merger = require('../lib/merger_json')

test('merger_json pass', t => {
  try {
    merger({
      dir: './example/echo/',
      input: './example/echo/index.json'
    })
    t.pass()
  } catch (e) {
    t.fail(e)
  }

  try {
    merger({
      dir: './example/echo/',
      input: './example/echo/index.json',
      output: './example/echo/swagger.json',
      compress: true
    })
    t.pass()
  } catch (e) {
    t.fail(e)
  }

  try {
    merger({
      dir: './example/echo/',
      input: './example/echo/index.json',
      output: './example/echo/swagger.json'
    })
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})
