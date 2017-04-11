#!/usr/bin/env bash

./bin/swagger-merger -i ./example/echo/index.yaml
./bin/swagger-merger -i ./example/echo/index.json

./bin/swagger-merger transcode ./example/echo/swagger.json ./example/echo/swagger-trans.yaml
./bin/swagger-merger transcode ./example/echo/swagger.yaml ./example/echo/swagger-trans.json
