const fs = require('fs');

const awsmobile = require('../cognito/aws-exports');
const config = require('../config.json');

const {
  aws_cognito_identity_pool_id: identityPoolId,
  aws_user_pools_id: userPoolId,
  aws_user_pools_web_client_id: userPoolWebClientId,
  oauth
} = awsmobile;

config.aws.cognito = Object.assign(config.aws.cognito, {
  identityPoolId,
  userPoolId,
  userPoolWebClientId,
  oauth
});

fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
