# swagger-merger

[![Greenkeeper badge](https://badges.greenkeeper.io/WindomZ/swagger-merger.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/WindomZ/swagger-merger.svg?branch=master)](https://travis-ci.org/WindomZ/swagger-merger)
[![Coverage Status](https://coveralls.io/repos/github/WindomZ/swagger-merger/badge.svg?branch=master)](https://coveralls.io/github/WindomZ/swagger-merger?branch=master)
[![Dependency](https://david-dm.org/WindomZ/swagger-merger.svg)](https://david-dm.org/WindomZ/swagger-merger)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

> Merge **multiple** swagger files into **a** swagger file, support **JSON**/**YAML**.

[![NPM](https://nodei.co/npm/swagger-merger.png)](https://nodei.co/npm/swagger-merger/)

[![swagger-merger](https://img.shields.io/npm/v/swagger-merger.svg)](https://www.npmjs.com/package/swagger-merger)
[![status](https://img.shields.io/badge/status-stable-green.svg)](https://www.npmjs.com/package/swagger-merger)

## Features

- [x] _$ref_ - A tag, include a _single-level_ of swagger file.
- [x] _$ref#*_ - A tag, include a _multi-level_ of swagger file.
- [x] _CLI_ - Command line interface.
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
    -o, --output <file>  output a merged JSON/YAML swagger file, default is `swagger.*`
    -c, --compact        compact JSON/YAML format string
    --debug              debug mode, such as print error tracks
```

### $ref

> Include a _single-level_ of swagger file.

For example:
```yaml
parameters:
    - $ref: "./name.yaml"
    - $ref: "./year.yaml"
```

### $ref#*

> Include a _multi-level_ of swagger file.

For example:
```yaml
paths:
  $ref#pets: "./paths/pets.yaml"
  $ref#pets-id: "./paths/pets-id.yaml"
definitions:
  $ref#pets: "./definitions/pets.yaml"
  $ref#error: "./definitions/error.yaml"
```

### CLI

> How to use?

```bash
$ swagger-merger -i in.yaml                # Merge in.yaml into swagger.yaml
$ swagger-merger -i in.yaml -o out.yaml    # Merge in.yaml into out.yaml
$ swagger-merger -i in.yaml -o out.yaml -c # Merge in.yaml into out.yaml and compress it
$ swagger-merger -i in.yaml -o out.json    # Merge in.yaml into out.json

$ swagger-merger -i in.json                # Merge in.json into swagger.json
$ swagger-merger -i in.json -o out.json    # Merge in.json into out.json
$ swagger-merger -i in.json -o out.json -c # Merge in.json into out.json and compress it
$ swagger-merger -i in.json -o out.yaml    # Merge in.json into out.yaml
```

## Examples

### [./example/heroku-pets](https://github.com/WindomZ/swagger-merger/tree/master/example/heroku-pets)

- Official swagger example
- _No_ modification

```bash
$ swagger-merger -i ./example/heroku-pets/index.yaml
$ swagger-merger -i ./example/heroku-pets/index.json
```

The correct result in `./example/heroku-pets`:

- `swagger.json` same as `heroku-pets.json`.
- `swagger.yaml` same as `heroku-pets.yaml`.

### [./example/echo](https://github.com/WindomZ/swagger-merger/tree/master/example/echo)

- Official swagger example
- _Modify_ to support for [$ref](#ref) tags

```bash
$ swagger-merger -i ./example/echo/index.yaml
$ swagger-merger -i ./example/echo/index.json
```

The correct result in `./example/echo`:

- `swagger.json` same as `echo.json`.
- `swagger.yaml` same as `echo.yaml`.

### [./example/petstore_simple](https://github.com/WindomZ/swagger-merger/tree/master/example/petstore_simple)

- Official swagger example
- _Modify_ to support for [$ref#*](#ref-1) tags

```bash
$ swagger-merger -i ./example/petstore_simple/index.yaml
$ swagger-merger -i ./example/petstore_simple/index.json
```

The correct result in `./example/petstore_simple`:

- `swagger.json` same as `petstore_simple.json`.
- `swagger.yaml` same as `petstore_simple.yaml`.

## License

The [MIT License](https://github.com/WindomZ/swagger-merger/blob/master/LICENSE)
