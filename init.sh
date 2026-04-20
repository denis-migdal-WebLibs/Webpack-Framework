#!/usr/bin/bash

WF_ROOT=$(dirname "$0")
echo "* Found WebpackFramework root: $WF_ROOT"

cp -rn "$WF_ROOT/template/default/"{*,.[^.]*} ./

mkdir dist src

git add .gitignore
npm install