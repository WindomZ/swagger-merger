#!/usr/bin/env bash

# Merge index.yaml into swagger.yaml
../../bin/swagger-merger.js -i index.yaml

# Merge index.yaml into swagger.yaml and compress it.
#../../bin/swagger-merger.js -i index.yaml -c

# Merge index.json into swagger.json
../../bin/swagger-merger.js -i index.json

# Merge index.json into swagger.json and compress it.
#../../bin/swagger-merger.js -i index.json -c
