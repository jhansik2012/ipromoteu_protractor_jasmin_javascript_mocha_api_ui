#!/bin/bash


cd "$(dirname "$0")"
cd ..

yarn fetch-config &&
node ./scripts/announce-deploy-init.js &&
yarn deploy-rest-api

