Scripts:
--------

- `init.sh` : create a new WebpackFramework project.
    1. Copy the template
    2. Initialize npm

Directories:
------------

- `template/default`: the default template (copied into the new project).
- `src/rules`: tells Webpack how to load ressources.
- `src/loaders`: custom loaders (not used).

Files:
------

- `buildConfig.js`: build a Webpack configuration.
- `listEntries.js`: list the ressources (libs, pages).
- `listAssets.js`: list the assets to include in the distribution.
- `copyAssets.js`