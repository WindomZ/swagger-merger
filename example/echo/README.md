# swagger-merger

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

## echo

| Directory/File | Description |
| :---: | :---: |
| example.sh | Example shell file |
| echo.json | Official swagger example |
| echo.yaml | Official swagger example |
| id.json | Link to $ref in index.json |
| id.yaml | Link to $ref in index.yaml |
| index.json | Main entrypoint swagger example |
| index.yaml | Main entrypoint swagger example |
| name.json | Link to $ref in index.json |
| name.yaml | Link to $ref in index.yaml |
| year.json | Link to $ref in index.json |
| year.yaml | Link to $ref in index.yaml |
