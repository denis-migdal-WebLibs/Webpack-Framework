- skeleton
- cmd
- TS extends
- test libs
- /tests : own configuration
- tsup.

⚠ .vscode + .github missing

//TODO: .d.ts bundle
// outil externe (?).
// tsup src/index.ts --dts --emitDeclarationOnly ?

//TODO: multiple named target.

## ---------------

- custom loader to emit entries ?
    - tester si type asset/ressource ne fonctionne pas avec un custom loader.

## TS config

- `noErrorTruncation`: printing errors, change it if necessary.

### Potential issues :

- remove: `"allowSyntheticDefaultImports": true`,
- added: `"erasableSyntaxOnly": true`,
- added: `"noUncheckedSideEffectImports": true`
- added: `"declaration": true` => try to be compatible as much as possible (to have decl. merge).



Avoid using markdown.

⚠ markdown-loader is currently bugged, `markdown-loader/src/loader.js` needs to be :

```javascript
/* eslint-disable @babel/no-invalid-this */
import {parse, use} from "marked";

const extensions = [];

export function markdownLoader(markdown) {
  const options = this.getOptions();

  for(let extension of options.extensions) {
    if( extensions.includes(extension) )
      break;

    use(extension);
    extensions.push(extension);
  }

  return parse(markdown, options.options);
}
```