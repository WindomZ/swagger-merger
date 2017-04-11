# swagger-merger

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
