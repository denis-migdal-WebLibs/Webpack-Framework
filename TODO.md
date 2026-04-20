- github pages CI/CD (add).
  - exclude pages/tests from production.

- use tsup (or equiv) to generate libraries .d.ts files.
  - tsup src/index.ts --dts --emitDeclarationOnly ?

- /tests : own configuration

- plugin to emit lists (that can then be used by indexes).

## TS config

- `noErrorTruncation`: printing errors, change it if necessary.

### Potential issues :

- remove: `"allowSyntheticDefaultImports": true`,
- added: `"erasableSyntaxOnly": true`,
- added: `"noUncheckedSideEffectImports": true`
- added: `"declaration": true` => try to be compatible as much as possible (to have decl. merge).

## Markdown

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