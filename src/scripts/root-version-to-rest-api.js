const fs = require('fs');

const {version} = require('../package.json');

const lastDeployBy = process.argv[2] || 'Git commit author not provided!';

fs.writeFileSync('rest-api/version.json', JSON.stringify({version, lastDeployBy}, null, 2));