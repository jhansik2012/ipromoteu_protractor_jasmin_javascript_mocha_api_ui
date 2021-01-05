const https = require('https');

const {version, lastDeployBy} = require('../rest-api/version.json');
const config = require('../config.json');

const { spawnSync } = require( 'child_process' );

const gitLastAuthor = spawnSync( 'git', 
                 'log -1 --pretty=format:%an'.split(' ')).stdout.toString().trim();

const author = gitLastAuthor || lastDeployBy || 'unknown';

const prefix = config.stage === 'prod'? ':warning: ' : '';
const stage = config.stage.toUpperCase();
const region = config.ipuRegion || process.env.IPU_REGION || '';
const begins_msg = `${prefix}[Xoms2-${stage}-${region}] Xoms2 back-end deployment has begun...`;

console.log(begins_msg);

function minimalRequest(options, callback) {
  return https.request(
    options,
    (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => callback(data));
    }
  ).on('error', (err) => {
    console.log('Error: ' + err.message);
    process.exit(1);
  });
}

const message = JSON.stringify({
  channel: config.slackBotChannel,
  icon_url: 'https://ipu-development.s3.amazonaws.com/images/dev-bot/dev-bot-avatar-v2-48x48.png',
  username: 'iPROMOTEu Dev Bot',
  attachments: [
    {
      'fallback': begins_msg,
      'color': '#ffde00',
      'pretext': begins_msg,
      'title': `Xoms2 Deployment initiated by ${author}; version:${version}`,
      'image_url': 'https://ipu-development.s3.amazonaws.com/images/dev-bot/deploy-icon-api-128x128.png'
    }
  ]
});

const req = minimalRequest({
  hostname: 'slack.com',
  path: `/api/chat.postMessage`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': message.length,
    'Authorization': `Bearer ${config.slackBotToken}`
  }
}, (response) => {
  console.log(response);
  process.exit(0);
});

req.write(message);
req.end();
