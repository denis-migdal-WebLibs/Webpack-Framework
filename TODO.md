- custom loader to emit entries ?
    - tester si type asset/ressource ne fonctionne pas avec un custom loader.

## TS config

- `noErrorTruncation`: printing errors, change it if necessary.

### Potential issues :

- remove: `"allowSyntheticDefaultImports": true`,
- added: `"erasableSyntaxOnly": true`,
- added: `"noUncheckedSideEffectImports": true`
- added: `"declaration": true` => try to be compatible as much as possible (to have decl. merge).