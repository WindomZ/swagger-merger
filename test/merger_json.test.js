/**
 * Created by WindomZ on 17-4-12.
 */
'use strict'

const test = require('ava')

const merger = require('../lib/merger_json')

test.serial('test -> `merger_json pass` - 1', async (t) => {
  try {
    merger({
      dir: './example/echo/',
      input: './example/echo/index.json'
    })
    t.pass()
  } catch (e) {
    t.fail(e.message)
  }
})

test.serial('test -> `merger_json pass` - 2', async (t) => {
  try {
    merger({
      dir: './example/echo/',
      input: './example/echo/index.json',
      output: './example/echo/swagger.json',
      compact: true
    })
    t.pass()
  } catch (e) {
    t.fail(e.message)
  }
})

test.serial('test -> `merger_json pass` - 3', async (t) => {
  try {
    merger({
      dir: './example/echo/',
      input: './example/echo/index.json',
      output: './example/echo/swagger.json'
    })
    t.pass()
  } catch (e) {
    t.fail(e.message)
  }
})
