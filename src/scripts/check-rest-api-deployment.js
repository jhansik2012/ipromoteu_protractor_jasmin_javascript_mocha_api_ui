
const axios = require('axios');

const {version: currentVersion} = require('../package.json');
const config = require('../config.json');
const stage = config.stage.toUpperCase();
const region = config.ipuRegion || process.env.IPU_REGION || '';

const slug = `Xoms2-${stage}-${region}`;

const messageObject = {
    channel: config.slackBotChannel,
    icon_url: 'https://ipu-development.s3.amazonaws.com/images/dev-bot/dev-bot-avatar-v2-48x48.png',
    username: 'iPROMOTEu Dev Bot'
};

const announce = async (attachment) => {

  messageObject.attachments = [ attachment ];

  await axios( {
         method: 'post',
         url : 'https://slack.com/api/chat.postMessage',
         data: messageObject,
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.slackBotToken}`
         }
       });
}

const checkVersion = async () => {

  let hostname = config.apiHost;

  if (config.apiHosts && config.apiHosts.core)
     hostname = config.apiHosts.core;
  let stage = config.stage.toUpperCase();

  let url = `https://${hostname}/${config.stage}`;
  console.log('url is: ', url);
  try {

    let resp = await axios.get(url);
    console.log('Get version data: ', resp.data);

    const {version: deployedVersion} = resp.data;
    console.log('Deployed Version: ', deployedVersion);
    console.log('Current Version: ', currentVersion);
    let attachment = {};
    if (currentVersion === deployedVersion)  {
      console.log('Deployment succeeded!');
      attachment = {
        "fallback": `[${slug}] Xoms2 back-end deployment succeeded! (version: ${currentVersion})`,
        "color": "#2eb886",
        "title": `[${slug}] :tada: Xoms2 back-end deployment succeeded! (version: ${currentVersion})`
      };
    }
    else {
      console.log('Deployment Failed!');
      attachment = {
        "fallback": `[${slug}] Xoms2 back-end deployment failed! (version: ${currentVersion})`,
        "color": "#e50000",
        "title": `[${slug}] :bangbang: Xoms2 back-end deployment failed! Version mismatch: Expected: ${currentVersion}; Actual: ${deployedVersion}`
      }
    }
    await announce(attachment);
 }
 catch(error) {
    console.log('Internal Error checking deployment status:', error);
 }
}

checkVersion();

