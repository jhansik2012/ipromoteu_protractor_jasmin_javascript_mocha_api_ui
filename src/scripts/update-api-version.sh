#!/bin/bash

set -x

cd "$(dirname "$0")"
cd ..

author=$(git log -1 --pretty=format:'%an')

node ./scripts/root-version-to-rest-api.js "$author" &&
git add ./rest-api/version.json && 
git commit -m "Version update" 

set +x

