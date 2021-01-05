#!/bin/bash

set -x

cd "$(dirname "$0")"
cd ..


npm version patch --force && 
bash ./scripts/update-api-version.sh &&
git push origin $(git symbolic-ref HEAD  --short)

set +x

