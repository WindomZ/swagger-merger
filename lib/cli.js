/**
 * Created by WindomZ on 17-4-10.
 */
const process = require('process')

const program = require('commander')

const pkg = require('../package.json')
const merger = require('./merger')
const transcoder = require('./transcoder')

let noArgs = true

program
  .version(pkg.version)
  .usage('[[-h] [-v] [-i=file] [-o=file]] [command]')
  .description('Merge multiple swagger files into a swagger file, just support JSON/YAML.')
  .option('-i, --input <file>', 'input a main/entry swagger file(JSON/YAML)', new RegExp(/^.+\.(json|yaml)$/, 'gi'), null)
  .option('-o, --output <file>', 'output a merged swagger file(JSON/YAML)', new RegExp(/^.+\.(json|yaml)$/, 'gi'), null)
  .option('--debug', 'debug mode, such as print error tracks', null, null)

program
  .command('merge <input> <output>')
  .description('Merge all associated files into a single `output` file from a `input` file.')
  .action((input, output, options) => {
    noArgs = false

    merger({
      input: input || options.input || '',
      output: output || options.output || ''
    }).catch(e => {
      console.error(options.parent.debug ? e : e.message)
    })
  })

program
  .command('transcode <input> <output>')
  .alias('trans')
  .description('Transcode with JSON/YAML swagger file.')
  .action((input, output, options) => {
    noArgs = false

    transcoder({
      input: input || options.parent.input || '',
      output: output || options.parent.output || ''
    }).catch(e => {
      console.error(options.parent.debug ? e : e.message)
    })
  })

program.parse(process.argv)

if (noArgs) {
  if (program.opts().input) {
    merger({
      input: program.opts().input,
      output: program.opts().output || ''
    }).catch(e => {
      console.error(program.opts().debug ? e : e.message)
    })
  } else {
    program.outputHelp()
  }
}
