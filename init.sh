#!/usr/bin/bash

WF_ROOT=$(dirname "$0")
echo "* Found WebpackFramework root: $WF_ROOT"

cp --update=none -r "$WF_ROOT/templates/default/"{*,.[^.]*} ./

mkdir dist

git add .gitignore
npm install