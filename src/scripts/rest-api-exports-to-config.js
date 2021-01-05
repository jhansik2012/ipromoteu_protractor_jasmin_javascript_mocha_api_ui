const fs = require('fs');

const configPath = process.argv[2];

const apiConfig = require('../rest-api/deploy/api-config');
const config = require(`../${configPath}`);

if (apiConfig.apiHost)
   config.apiHost = apiConfig.apiHost;

if (apiConfig.apiHosts)
   config.apiHosts = apiConfig.apiHosts;

fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
