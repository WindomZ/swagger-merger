#!/usr/bin/env bash

# example/echo
#./bin/swagger-merger -i ./example/echo/index.yaml
#./bin/swagger-merger -i ./example/echo/index.json
#
#./bin/swagger-merger transcode ./example/echo/swagger.json ./example/echo/swagger-trans.yaml
#./bin/swagger-merger transcode ./example/echo/swagger.yaml ./example/echo/swagger-trans.json

# example/petstore_simple
./bin/swagger-merger -i ./example/petstore_simple/index.yaml
#./bin/swagger-merger -i ./example/petstore_simple/index.json

#./bin/swagger-merger transcode ./example/petstore_simple/swagger.json ./example/petstore_simple/swagger-trans.yaml
#./bin/swagger-merger transcode ./example/petstore_simple/swagger.yaml ./example/petstore_simple/swagger-trans.json
