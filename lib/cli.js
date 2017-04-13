/**
 * Created by WindomZ on 17-4-10.
 */
const process = require('process')

const program = require('commander')

const pkg = require('../package.json')
const merger = require('./merger')

let noArgs = true

program
  .version(pkg.version)
  .usage('[-h] [-v] [-c] [-o file] <-i file | file>')
  .description('Merge multiple swagger files into a swagger file, just support JSON/YAML.')
  .option('-i, --input <file>', 'input a main/entry JSON/YAML swagger file', new RegExp(/^.+\.(json|yaml)$/, 'gi'), null)
  .option('-o, --output <file>', 'output a merged JSON/YAML swagger file', new RegExp(/^.+\.(json|yaml)$/, 'gi'), null)
  .option('-c, --compact', 'compact JSON/YAML format string', null, null)
  .option('--debug', 'debug mode, such as print error tracks', null, null)
  .action((file, options) => {
    noArgs = false

    merger({
      input: options.input || file || '',
      output: options.output || '',
      compact: options.compact
    }).catch(e => {
      console.error(options.parent.debug ? e : e.message)
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
      console.error(program.opts().debug ? e : e.message)
    })
  } else {
    program.outputHelp()
  }
}
