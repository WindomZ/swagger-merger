#!/usr/bin/env bash

# example/echo
./bin/swagger-merger -i ./example/echo/index.yaml --debug
./bin/swagger-merger -i ./example/echo/index.json --debug

./bin/swagger-merger transcode ./example/echo/swagger.json ./example/echo/swagger-trans.yaml --debug
./bin/swagger-merger transcode ./example/echo/swagger.yaml ./example/echo/swagger-trans.json --debug

# example/petstore_simple
./bin/swagger-merger -i ./example/petstore_simple/index.yaml --debug
./bin/swagger-merger -i ./example/petstore_simple/index.json --debug

./bin/swagger-merger transcode ./example/petstore_simple/swagger.json ./example/petstore_simple/swagger-trans.yaml --debug
./bin/swagger-merger transcode ./example/petstore_simple/swagger.yaml ./example/petstore_simple/swagger-trans.json --debug
