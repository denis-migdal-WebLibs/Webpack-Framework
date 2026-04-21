#!/usr/bin/bash

FILES=$(find ./src/libs ./src/pages/templates -name "index.ts")

readarray -t FILES <<< "$FILES"

for FILE in "${FILES[@]}" ; do

    OUT=""
    if [[ "$FILE" =~ ^./src/pages/templates/(.*) ]]; then
        OUT="./dist/dev/templates/${BASH_REMATCH[1]%.ts}.d.ts"
    fi

    if [[ "$FILE" =~ ^./src/libs/(.*) ]]; then
        OUT="./dist/dev/libs/${BASH_REMATCH[1]%.ts}.d.ts"
    fi

    dts-bundle-generator --no-check --export-referenced-types false -o "$OUT" "$FILE"
done