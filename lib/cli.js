/**
 * Created by WindomZ on 17-4-10.
 */
const process = require('process')

const program = require('commander')

const pkg = require('../package.json')

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
    console.log('options: %v', options)
    console.log('input: %s', input)
    console.log('output: %s', output)
  })

program.parse(process.argv)

if (noArgs) {
  if (program.opts().input) {
    console.log('options: %v', program.opts())
  } else {
    program.outputHelp()
  }
}
