#!/bin/bash

set -x

[ -z "$IPU_STAGE" ] && IPU_STAGE=dev
[ -z "$IPU_REGION" ] && IPU_REGION=US
keyname=Xoms2.server.$IPU_STAGE.$IPU_REGION.keys

aws secretsmanager put-secret-value --secret-id $keyname \
    --secret-string file://config.json

set +x

