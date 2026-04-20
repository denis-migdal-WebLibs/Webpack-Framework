<div align="center">
  <h1>Webpack Framework</h1>

  <p>Use Webpack without worrying about configurations.</p>
</div>

## Usage

### Use WebpackFramework in a new project:

In your project's git repository, install and initialize <i>Webpack Framework</i>:
```bash
git submodule add git@github.com:denis-migdal/Webpack-Framework.git ./build/WebpackFramework
./build/WebpackFramework/init.sh
```

You can then complete the informations in the `package.json` file.

💡 A a security measure, your existing files will NOT be overridden. Therefore, you may need to install some of the template files yourself.

⚠ You may need to run `npm install @swc/core`.

### Commands

- `npm run build`: build the project.
- `npm run watch`: re-build the project after each changes.
- `npm run tests`: run unit tests.
- `npm run build-prod`: build the production version of the project.

### Template

💡 We recommend to use the following directories:
- `src/components`: for components shared by several pages.
- `src/core`: for files that are not specific to a page or a library.
- `src/test`: for files used by tests, and specific to tests.

## Pages

The `src/pages/` directory is used to define webpages. Each `index.html`, `index.ts` and `index.css` files correspond to a webpage.

Special directories/files:
- `assets`: this directory is copied into the produced website. You can use it, e.g. for images.
- `templates`: defines files used by several pages. It produces files that can be imported by pages, without being included in the page generated files.


💡 We recommend to use `pages/tests` for test pages.

## Libs

The `src/libs/` directory is used to define libraries. Each `index.ts` files correspond to a library.

💡 We recommend to use `src/libs/tests` for test libraries.

## Tests

The `tests/` directory is used to define tests.

⚠ Only use output files (e.g. the generated libraries). Indeed Deno do not support some of Webpack features.

### Symbols

- `__DEBUG__`: `true` if built in dev mode.
- `__LOAD_FILE__`: an alias to `require()` used to import raw files.

## Projects using WebpackFramework

[TODO] link to MWL.