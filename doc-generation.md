## Documentation Generation

### Prereqs

- Have the npm package `@microsoft/api-documenter` installed globally.
- Install the latest version of [docfx](https://github.com/dotnet/docfx/releases)

### Steps

1. rush extract-api
   - ./doc-models should be populated with JSON files for each package that supports api-extractor.
2. Run api-documenter from the root of the repository (you will see lots of unsupported tag warnings):
   - `api-documenter.cmd yaml --input-folder .\doc-models\ --output-folder .\doc-output\`
3. Run `docfx.exe init -q` from the root of the repository.
4. Copy the yaml files from `./doc-output` into `docfx_project/api`.
   - `rm ./docfx_project/api/*` && `cp -r ./doc-output/* ./docfx_project/api/`
5. Run `docfx.exe` from `docfx_project` to generate html files.
6. Serve the static content on a local server by running the following command in `docfx_project`:
   - `docfx.exe serve _site`
7. Navigate to a package API:
   > http://localhost:8080/api/event-hubs.html
