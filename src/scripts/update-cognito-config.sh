#!/bin/bash

#
# Purpose: Should run after deploying cognito in order to update
#          the config.json and secrets store.
#

set -x

cd "$(dirname "$0")"
cd ..

yarn fetch-config &&
node ./scripts/cognito-exports-to-config.js && 
yarn update-config

