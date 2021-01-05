#!/bin/bash


echo This should be done from developer local env 
cd cognito 
source stack-utils.sh 
setup_stack
cd .. 
yarn update-cognito-config

