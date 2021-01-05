
var apiConfig = require(projectBasePath+'/config/api-config');
import aws4 from 'aws4';
import AWS from 'aws-sdk';
import https from 'https';
import { refreshAwsCredentials } from './AuthUtil';
import _ from 'lodash';
var axios = require("axios")

function jsonStringify(obj) {
  // indent spaces: 2
  return JSON.stringify(obj, null, 2);
}

//
// Request to API Gateway.
//
export async function apiRequest(method, path, body, skipSign = false) {

  var host = _.get(apiConfig, 'apiHosts.primary', '') || apiConfig.apiHost;

  if (path.startsWith('/payment'))
    host = _.get(apiConfig, 'apiHosts.payment', '') || apiConfig.apiHost;

  var opts = {
    service: 'execute-api',
    host: host,
    path: '/' + apiConfig.stage + path,     // Include query string if exists.
    region: 'us-east-1',
    method: method,
    headers: { 'content-type': 'application/json' }
  };

  if (body) {
    if (typeof body !== 'string')
      body = JSON.stringify(body);
    opts.body = body;
  }

  console.log('apiRequest opts:', opts);
  console.log('-------------------------------------------');
  if (!skipSign) {
    // Refresh AWS credentials if it had expired.
    await refreshAwsCredentials();

    AWS.config.region = 'us-east-1';
    aws4.sign(opts, AWS.config.credentials);
    // console.log('Signed opts:', opts);
  }

  var apiResult = {};

  let promise = new Promise(function (resolve, reject) {
    var req = https.request(opts, function (res) {
      // What to do after response ...
      console.log('-------------------------------------------');
      console.log('Response HEADERS: ' + JSON.stringify(res.headers));
      console.log('-------------------------------------------');
      res.setEncoding('utf8');
      apiResult.data = '';
      res.on('data', function (chunk) {
        apiResult.data += chunk;
      });
      res.on('end', function () {
        console.log(JSON.stringify(apiResult)+'\n-------------------------------------resp------------------------------------\n\n'); 
        apiResult.statusCode = +res.statusCode;
        if (+res.statusCode !== 200) {
          reject(jsonStringify(apiResult));
        }
        else
          resolve(jsonStringify(apiResult));
      });
    });

    // What to do on error at client side.
    // If browser blocks API call due to cors, it fails here.
    req.on('error', function (e) {
      // apiResult.error = 'Problem with execute API request: ' + e.message;
      apiResult.error = e.message;
      reject(jsonStringify(apiResult));
      console.log('Problem with execute API request: ' + e.message);
    });

    // The write() or end() will trigger the real action.
    if (body) req.write(body);
    req.end();
  });
  return promise;
}


