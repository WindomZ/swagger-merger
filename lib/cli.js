/**
 * Created by WindomZ on 17-4-10.
 */
const process = require('process')

const program = require('commander')

const pkg = require('../package.json')
const merger = require('./merge')

let noArgs = true

program
  .version(pkg.version)
  .description('Merge multiple swagger files into a swagger file.')
  .option('-i, --input <file>', 'main or entry swagger file', /^.+$/, null)
  .option('-o, --output <file>', 'generated merge swagger file', /^.+$/, null)

program
  .command('merge <input> <output>')
  .description('Through the `input` swagger file, merge all associated files into a single `output` file')
  .action((input, output, options) => {
    noArgs = false

    merger({
      input: input || options.input || '',
      output: output || options.output || '',
    })
  })

program.parse(process.argv)

if (noArgs) {
  if (program.opts().input) {
    merger({
      input: program.opts().input,
      output: program.opts().output || '',
    })
  } else {
    program.outputHelp()
  }
}
