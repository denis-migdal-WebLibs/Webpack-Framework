- github pages CI/CD (add).
  - exclude pages/tests + src/libs/tests from production.

- plugin to emit lists (that can then be used by indexes).

- webpages tests (?)

## TS config

- `noErrorTruncation`: printing errors, change it if necessary.
- `"declaration": false`: do not generate .d.ts files.

### Potential issues :

- remove: `"allowSyntheticDefaultImports": true`,
- added: `"erasableSyntaxOnly": true`,
- added: `"noUncheckedSideEffectImports": true`
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