#!/bin/bash

set -x

export IPU_STAGE=local
export stage=local
export IPU_REGION=US
export ipu_region=us

cd "$(dirname "$0")"

cd ../rest-api
sls deploy --config yml/core/serverless.$ipu_region.$stage.yml 
sls deploy --config yml/payment/serverless.$ipu_region.$stage.yml 
cd deploy 
source deploy-utils.sh 
gen_api_client_config_file $IPU_REGION $stage
cd ../.. 
node ./scripts/rest-api-exports-to-config.js config.local.json
set +x

