# Example - echo

## Source File

- echo.json
- echo.yaml

## Entry File

- index.json
- index.yaml

### Related Files

- name.json
- name.yaml

- year.json
- year.yaml

- id.json
- id.yaml

## Usage

### JSON

Merge multiple swagger files from `index.json`.

```bash
swagger-merger -i index.json
```
In the same directory to get swagger file `swagger.json`, 
the content is same as `echo.json`.

### YAML

Merge multiple swagger files from `index.yaml`.

```bash
swagger-merger -i index.yaml
```

In the same directory to get swagger file `swagger.yaml`, 
the content is same as `echo.yaml`.
