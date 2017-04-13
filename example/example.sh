#!/usr/bin/env bash

# heroku-pets
../bin/swagger-merger -i ./heroku-pets/index.yaml --debug
../bin/swagger-merger -i ./heroku-pets/index.json --debug

# echo
../bin/swagger-merger -i ./echo/index.yaml --debug
../bin/swagger-merger -i ./echo/index.json --debug

# petstore_simple
../bin/swagger-merger -i ./petstore_simple/index.yaml --debug
../bin/swagger-merger -i ./petstore_simple/index.json --debug
