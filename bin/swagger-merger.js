#!/usr/bin/env node
/**
 * Created by WindomZ on 17-4-10.
 */
'use strict'

const merger = require('../lib/merger')

if (require.main === module) {
  const program = require('commander')
  const util = require('util')

  let noArgs = true

  program
    .version(require('../package.json').version)
    .usage('[-h] [-v] [-c] [-o file] <-i file | file>')
    .description('Merge multiple swagger files into a swagger file, just support JSON/YAML.')
    .option('-i, --input <*.json|yaml|yml file>', 'input a main/entry JSON/YAML swagger file, MANDATORY',
      /^.+\.(json|yaml|yml)$/gi, null)
    .option('-o, --output <*.json|yaml|yml file>', 'output a merged JSON/YAML swagger file, default is `swagger.*`',
      /^.+\.(json|yaml|yml)$/gi, null)
    .option('-c, --compact', 'compact JSON/YAML format string', null, null)
    .option('--debug', 'debug mode, such as print error tracks', null, null)
    .action((options) => {
      noArgs = !(options.input)
      if (noArgs) {
        return
      }

      merger({
        input: options.input || '',
        output: options.output || '',
        compact: options.compact
      }).catch(e => {
        if (options.debug) {
          console.error(e)
        } else if (e.mark) {
          console.error(util.format('error: %s\ncontent: %s', e.message, e.mark.buffer))
        } else {
          console.error(util.format('error: %s', e.message))
        }
      })
    })

  program.parse(process.argv)

  if (noArgs) {
    if (program.opts().input) {
      merger({
        input: program.opts().input,
        output: program.opts().output || '',
        compact: program.opts().compact
      }).catch(e => {
        if (program.opts().debug) {
          console.error(e)
        } else if (e.mark) {
          console.error(util.format('error: %s\ncontent: %s', e.message, e.mark.buffer))
        } else {
          console.error(util.format('error: %s', e.message))
        }
      })
    } else {
      program.outputHelp()
    }
  }
}

module.exports.merge = merger
