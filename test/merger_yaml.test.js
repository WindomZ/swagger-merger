/**
 * Created by WindomZ on 17-4-12.
 */
const test = require('ava')

const merger = require('../lib/merger_yaml')

test('merger_json pass', t => {
  try {
    merger({
      dir: './example/echo/',
      input: './example/echo/index.yaml'
    })
    t.pass()
  } catch (e) {
    t.fail(e)
  }

  try {
    merger({
      dir: './example/echo/',
      input: './example/echo/index.yaml',
      output: './example/echo/swagger.yaml',
      compress: true
    })
    t.pass()
  } catch (e) {
    t.fail(e)
  }

  try {
    merger({
      dir: './example/echo/',
      input: './example/echo/index.yaml',
      output: './example/echo/swagger.yaml'
    })
    t.pass()
  } catch (e) {
    t.fail(e)
  }
})
