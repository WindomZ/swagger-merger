#!/usr/bin/env bash

./bin/swagger-merger -i ./example/index.yaml
./bin/swagger-merger -i ./example/index.json

./bin/swagger-merger transcode ./example/swagger.json ./example/swagger-trans.yaml
./bin/swagger-merger transcode ./example/swagger.yaml ./example/swagger-trans.json
