```
┌─┐┬ ┬┌─┐┌─┐┌─┐┌─┐┬─┐   ┌┬┐┌─┐┬─┐┌─┐┌─┐┬─┐
└─┐│││├─┤│ ┬│ ┬├┤ ├┬┘───│││├┤ ├┬┘│ ┬├┤ ├┬┘
└─┘└┴┘┴ ┴└─┘└─┘└─┘┴└─   ┴ ┴└─┘┴└─└─┘└─┘┴└─
```

[![Greenkeeper badge](https://badges.greenkeeper.io/WindomZ/swagger-merger.svg)](https://greenkeeper.io/)
[![Node.js(≥12.22) CI](https://github.com/WindomZ/swagger-merger/actions/workflows/ci.yml/badge.svg)](https://github.com/WindomZ/swagger-merger/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/WindomZ/swagger-merger/badge.svg?branch=master)](https://coveralls.io/github/WindomZ/swagger-merger?branch=master)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

> Merge **multiple** related files from **a** input swagger file, Write to **a** output swagger file.
> 
> Support **JSON**/**YAML**.

[![NPM](https://nodei.co/npm/swagger-merger.png)](https://nodei.co/npm/swagger-merger/)

[![swagger-merger](https://img.shields.io/npm/v/swagger-merger.svg)](https://www.npmjs.com/package/swagger-merger)
[![status](https://img.shields.io/badge/status-stable-green.svg)](https://www.npmjs.com/package/swagger-merger)

## Features
- [x] _Merge_ ***multiple*** swagger files into ***a*** swagger file.
- [x] _$ref_ - A tag, include a **single-level** of swagger file.
- [x] _$ref#*_ - A tag, include a **multi-level** of swagger file.
- [x] _Support_ **JSON**/**YAML** swagger files(`.json`/`.yaml`/`.yml`).
- [x] _CLI_ - Command line interface.

## Usage

### $ref
> Includes a _single-level_ of swagger file.

- [Official standards](https://swagger.io/docs/specification/using-ref/)
- Recommended, universal

For `yaml` example:

```yaml
$ref: "./host.yaml"
parameters:
  - $ref: "name.yaml"
  - $ref: "./year.yaml"
  - $ref: "age.yaml#/alex/son"
remote:
  $ref: "https://raw.githubusercontent.com/WindomZ/swagger-merger/remote.yaml#/name"
responses:
  $ref: "./responses.yaml#/post"
```

### $ref#*
> Includes a _multi-level_ of swagger file.

- Non-standard, suggest you use it for yourself
- Instead of `$ref`, can be used _side by side_ and not an array

For `yaml` example:

```yaml
paths:
  $ref#pets: "./paths/pets.yaml"
  $ref#pets-id: "./paths/pets-id.yaml"
paths-url:
  $ref#paths: "https://raw.githubusercontent.com/WindomZ/swagger-merger/master/test/no_ext_json"
```

Output `yaml`:

```yaml
paths:
  /pets:
    hello: world
  /pets/{id}:
    good: bye
paths-url:
  /pets:
    hello: world
  /pets/{id}:
    good: bye
```
### CLI
> How to use?

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

Easy to use.
```bash
swagger-merger -i in.yaml                # Merge in.yaml into swagger.yaml
swagger-merger -i in.yaml -o out.yaml    # Merge in.yaml into out.yaml
swagger-merger -i in.yaml -o out.yaml -c # Merge in.yaml into out.yaml and compress it
swagger-merger -i in.yaml -o out.json    # Merge in.yaml into out.json

swagger-merger -i in.json                # Merge in.json into swagger.json
swagger-merger -i in.json -o out.json    # Merge in.json into out.json
swagger-merger -i in.json -o out.json -c # Merge in.json into out.json and compress it
swagger-merger -i in.json -o out.yaml    # Merge in.json into out.yaml
```

### Module
> How to use?

```bash
npm install swagger-merger
```

```js
#!/usr/bin/env node

const swaggerMerger = require('swagger-merger')

swaggerMerger.merge({
  input: 'index.json',
  output: 'swagger.json',
  compact: false
}).catch(e => {
  console.error(e)
})
```

## Install
```bash
npm install swagger-merger -g
```

## Examples
> It would be more helpful to see these examples.

Open the terminal, **choose** one of the following ways: 

- [npm](https://www.npmjs.com/)
    ```bash
    npm install
    npm run test
    ```

- [yarn](https://yarnpkg.com/)
    ```bash
    yarn
    yarn run test
    ```

- [swagger-merger]((https://www.npmjs.com/package/swagger-merger)) (installed, go to each examples)
    ```bash
    swagger-merger -i index.yaml
    swagger-merger -i index.json
    ```

Then, these examples may help you:

### [heroku-pets](https://github.com/WindomZ/swagger-merger/tree/master/example/heroku-pets)
- Official swagger example
- _No_ modification

Go to `example/heroku-pets`
1. The output `swagger.json` is same as the expected `heroku-pets.json`.
1. The output `swagger.yaml` is similar to the expected `heroku-pets.yaml`.

### [echo](https://github.com/WindomZ/swagger-merger/tree/master/example/echo)
- Base on official swagger example
- _Modify_ to support for [$ref](#ref) tags

Go to `example/echo`
1. The output `swagger.json` is same as the expected `echo.json`.
1. The output `swagger.yaml` is similar to the expected `echo.yaml`.

### [petstore_simple](https://github.com/WindomZ/swagger-merger/tree/master/example/petstore_simple)
- Base on official swagger example
- _Modify_ to support for [$ref#*](#ref-1) tags

Go to `example/petstore_simple`
1. The output `swagger.json` is same as the expected `petstore_simple.json`.
1. The output `swagger.yaml` is similar to the expected `petstore_simple.yaml`.

### [petstore_domain](https://github.com/WindomZ/swagger-merger/tree/master/example/petstore_domain)
> A way of using [$ref](#ref) instead of [$ref#*](#ref-1), and better compatibility.

- Same as [petstore_simple](#examplepetstore_simple)
- _Modify_ to support for [$ref](#ref) tags
- _Modify_ to support for **multiple levels** schema

Go to `example/petstore_domain`
1. The output `swagger.json` is same as the expected `petstore_simple.json`.
1. The output `swagger.yaml` is similar to the expected `petstore_simple.yaml`.

## Contributing
Welcome to pull requests, report bugs, suggest ideas and discuss **swagger-merger**, 
i would love to hear what you think about **swagger-merger** on [issues page](https://github.com/WindomZ/swagger-merger/issues).

If you like it then you can put a :star: on it.

## License
[MIT](https://github.com/WindomZ/swagger-merger/blob/master/LICENSE)
