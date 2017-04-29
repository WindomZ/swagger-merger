# swagger-merger

[![Greenkeeper badge](https://badges.greenkeeper.io/WindomZ/swagger-merger.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/WindomZ/swagger-merger.svg?branch=master)](https://travis-ci.org/WindomZ/swagger-merger)
[![License](https://img.shields.io/badge/license-Apache-green.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)
[![Dependency](https://david-dm.org/WindomZ/swagger-merger.svg)](https://david-dm.org/WindomZ/swagger-merger)
[![Coverage Status](https://coveralls.io/repos/github/WindomZ/swagger-merger/badge.svg?branch=master)](https://coveralls.io/github/WindomZ/swagger-merger?branch=master)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

> Merge **multiple** swagger files into **a** swagger file, support **JSON**/**YAML**.

[![NPM](https://nodei.co/npm/swagger-merger.png)](https://nodei.co/npm/swagger-merger/)

[![swagger-merger](https://img.shields.io/npm/v/swagger-merger.svg)](https://www.npmjs.com/package/swagger-merger)
![status](https://img.shields.io/badge/status-stable-green.svg)

## Features

- [x] _Support_ **JSON**/**YAML** swagger files.
- [x] _Merge_ ***multiple*** swagger files into ***a*** swagger file.

## Installation

```bash
npm install -g swagger-merger
```

## Usage

```bash
$ swagger-merger -h

  Usage: swagger-merger [-h] [-v] [-c] [-o file] <-i file | file>

  Merge multiple swagger files into a swagger file, just support JSON/YAML.

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -i, --input <file>   input a main/entry JSON/YAML swagger file
    -o, --output <file>  output a merged JSON/YAML swagger file
    -c, --compact        compact JSON/YAML format string
    --debug              debug mode, such as print error tracks
```

## Examples

Run shell `./example/example.sh` for more help.

### [heroku-pets](https://github.com/WindomZ/swagger-merger/tree/master/example/heroku-pets)

- Official swagger example
- No modification

### [echo](https://github.com/WindomZ/swagger-merger/tree/master/example/echo)

- Official swagger example
- Modify to support for `$ref` tags

### [petstore_simple](https://github.com/WindomZ/swagger-merger/tree/master/example/petstore_simple)

- Official swagger example
- Modify to support for `$ref#`* tags

## License

The [Apache License 2.0](https://github.com/WindomZ/swagger-merger/blob/master/LICENSE)
