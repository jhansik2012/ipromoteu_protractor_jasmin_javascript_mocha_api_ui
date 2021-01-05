#!/bin/bash

set -x

cd "$(dirname "$0")"

export IPU_STAGE=$(node get-config.js stage)
export stage=$IPU_STAGE

export IPU_REGION=$(node get-config.js ipuRegion)
export ipu_region=$(echo $IPU_REGION | tr '[A-Z]' '[a-z]')

cd ../rest-api
sls deploy --config yml/core/serverless.$ipu_region.$stage.yml 
sls deploy --config yml/payment/serverless.$ipu_region.$stage.yml 
sleep 5
cd deploy 
source deploy-utils.sh 
gen_api_client_config_file $IPU_REGION $stage
cd ../.. 
yarn update-rest-api-config 
# Allow few seconds for deployment to take effect ...
sleep 20
yarn check-rest-api-deploy

set +x

