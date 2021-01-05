#!/bin/bash

#
# Utility functions 
#

setenv_dev_ca(){
  export IPU_STAGE=dev
  export IPU_REGION=CA
}

setenv_dev_us(){
  export IPU_STAGE=dev
  export IPU_REGION=US
}

setenv_prod_ca(){
  export IPU_STAGE=prod
  export IPU_REGION=CA
}

setenv_prod_us(){
  export IPU_STAGE=prod
  export IPU_REGION=US
}

