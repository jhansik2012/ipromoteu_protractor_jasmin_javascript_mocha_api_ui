#!/bin/bash

#
# Purpose: Should run after deploying Rest API in order to update
#          the deployed apiHosts value into config.json and secrets store.
#

set -x

cd "$(dirname "$0")"
cd ..

yarn fetch-config &&
node ./scripts/rest-api-exports-to-config.js config.json && 
yarn update-config

