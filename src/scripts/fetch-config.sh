#!/bin/bash

set -x

cd "$(dirname "$0")"
cd ..

[ -z "$IPU_STAGE" ] && IPU_STAGE=dev
[ -z "$IPU_REGION" ] && IPU_REGION=US
keyname=Xoms2.server.$IPU_STAGE.$IPU_REGION.keys

aws secretsmanager get-secret-value --secret-id $keyname |
node ./scripts/secret-to-config.js && 
cat config.json > rest-api/config.json

set +x

