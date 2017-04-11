# swagger-merger
[![Build Status](https://travis-ci.org/WindomZ/swagger-merger.svg?branch=master)](https://travis-ci.org/WindomZ/swagger-merger)
![License](https://img.shields.io/badge/license-MIT-green.svg)
[![Dependency](https://david-dm.org/WindomZ/swagger-merger.svg)](https://david-dm.org/WindomZ/`)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)

Merge **multiple** swagger files into **a** swagger file, support **JSON**/**YAML**.

[![swagger-merger](https://img.shields.io/npm/v/swagger-merger.svg)](https://www.npmjs.com/package/swagger-merger)
![status](https://img.shields.io/badge/status-beta-green.svg)

## Features

- [x] Merge ***multiple*** swagger files into ***a*** swagger file.
- [x] Transcode with `.yaml` and `.json` swagger file.

## Installation

```bash
npm install -g swagger-merger
```

## Usage

```bash
$ swagger-merger -h

  Usage: swagger-merger [options] [command]


  Commands:

    merge <input> <output>            Through the `input` swagger file, merge all associated files into a single `output` file
    transcode|trans <input> <output>  Transcode between with .yaml and .json swagger file

  Merge multiple swagger files into a swagger file.

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -i, --input <file>   main or entry swagger file
    -o, --output <file>  generated merge swagger file
```

## Examples

### [echo](https://github.com/WindomZ/swagger-merger/tree/master/example/echo)

## License

The [MIT License](https://github.com/WindomZ/swagger-merger/blob/master/LICENSE)
