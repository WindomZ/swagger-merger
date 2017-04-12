# swagger-merger
[![Build Status](https://travis-ci.org/WindomZ/swagger-merger.svg?branch=master)](https://travis-ci.org/WindomZ/swagger-merger)
![License](https://img.shields.io/badge/license-MIT-green.svg)
[![Dependency](https://david-dm.org/WindomZ/swagger-merger.svg)](https://david-dm.org/WindomZ/swagger-merger`)
[![Coverage Status](https://coveralls.io/repos/github/WindomZ/swagger-merger/badge.svg?branch=master)](https://coveralls.io/github/WindomZ/swagger-merger?branch=master)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

Merge **multiple** swagger files into **a** swagger file, support **JSON**/**YAML**.

[![swagger-merger](https://img.shields.io/npm/v/swagger-merger.svg)](https://www.npmjs.com/package/swagger-merger)
![status](https://img.shields.io/badge/status-beta-green.svg)

## Features

- [x] Support **JSON**/**YAML** swagger files.
- [x] *Merge* ***multiple*** swagger files into ***a*** swagger file.
- [x] *Transcode* with **JSON**/**YAML** swagger file.

## Installation

```bash
npm install -g swagger-merger
```

## Usage

```bash
$ swagger-merger -h

  Usage: swagger-merger [[-h] [-v] [-i=file] [-o=file]] [command]


  Commands:

    merge <input> <output>            Merge all associated files into a single `output` file from a `input` file.
    transcode|trans <input> <output>  Transcode with JSON/YAML swagger file.

  Merge multiple swagger files into a swagger file, just support JSON/YAML.

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -i, --input <file>   input a main/entry swagger file(JSON/YAML)
    -o, --output <file>  output a merged swagger file(JSON/YAML)
    --debug              debug mode, such as print error tracks
```

## Examples

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
