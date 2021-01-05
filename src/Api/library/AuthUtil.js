/**
 * Authentication related util functions.
 *
 */

import Amplify, { Auth } from 'aws-amplify';

import _ from 'lodash';

import jsonwebtoken from 'jsonwebtoken';

var awsconfig  = require(projectBasePath+'/config/aws-exports');

import AWS from 'aws-sdk';

import * as LocalStore from './LocalStore';

// window.aws = AWS;
// console.log('AWS module assigned to global aws');

Amplify.configure(awsconfig);

AWS.config.region = 'us-east-1';
var cognitoidentity = new AWS.CognitoIdentity({apiVersion: '2014-06-30'});

export function  decodejwt(token)
{
    return jsonwebtoken.decode(token, {complete: true});
}

export function isNodejs() {
  return typeof process === 'object' && typeof process.versions === 'object' &&
         typeof process.versions.node !== 'undefined'; 
}

if (isNodejs()){
  global.fetch = require("node-fetch");
}

/*
 * This authState is primarily used for Debug purposes.
 * We fetch the real values using Amplify library calls as needed.
 */
export const authState = {
  cognitoUser: null,      // CognitoUser object from User Pool.
  userSession: null,      // User Pool Session Type: CognitoUserSession.
  sessionToken: null      // AWS ATS Session Opaque Token. For info debug only.
};

/**
 * Refresh Existing User pool Session: CognitoUserSession 
 * UserSession is usually valid for long time (30 days or so) 
 * It expires rarely.
 *
 * Note:  It does not attempt to create user session if it does not exist!
 *
 * Returns the new refreshed user session.
 *
 */
export async function refreshUserSession()
{
  // No need to force create user session. Refresh only if it exists already.
  //
  let  userSession = authState.userSession;

  if (userSession && userSession.isValid())  return userSession;

  // User session exists but it is invalid or expired.
  authState.userSession = null;

  try {
	  userSession = await Auth.currentSession();
	  authState.userSession = userSession;
      console.log('New Cognito User session acquired ');
      // console.log('User session acquired: ', userSession);
	  return userSession;
	}
	catch(e) {
	  console.log('Could not refresh current userpool session: ', e)
	  return null;
	}
}

/**
 * Check if Identity Pool Session needs refresh and do so if needed.
 * Check authState.sessionToken (obtained as result of IAM credentials fetch)
 *
 * Note: It is nothing to do with other user pool session expiration.
 *
 * See https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Credentials.html
 *
 * Note: Returns refreshed credentials only if credentials already exists.
 */

export async function  refreshAwsCredentials()
{
  let creds = AWS.config.credentials;


  console.log('Enter refresh AWS creds');
  // There is internal expiry window of 15 seconds. 
  // needsRefresh() will return true if it is going to expire soon.

  if (creds && (!creds.needsRefresh()))  return creds;    // Already valid.

  // If credentials do not exist yet, will need to create it.

  // If User session does not exist, do not bother to refresh.
  let userSession = await refreshUserSession();
  // console.log('user session: ', userSession);
  if (!userSession) return null;

  let providerName = 'cognito-idp.us-east-1.amazonaws.com/' + 
                   awsconfig.aws_user_pools_id;
  var logins = {};
  logins[providerName] = userSession.getIdToken().getJwtToken();

  AWS.config.region = 'us-east-1';

  let params = {
	 IdentityPoolId: awsconfig.aws_cognito_identity_pool_id,
     Logins: logins
  };

  let promise = new Promise(function(resolve, reject) {    

    cognitoidentity.getId(params, function(err, data) {

      if (err) {
         console.log('Could not retrieve IdentityId using getId!');
         console.log(err, err.stack); // an error occurred
         reject(err);
      }
      else  {
          console.log('Got IdentityId Result:', data);    // successful response
          // { IdentityId: 'us-east-1:63f46f9e-87df-xxxx-93ee-012705073a5e' }
          // It is primary key for user in Identity Pool. It does not change.
          //
          let params = {
                IdentityId: data.IdentityId,
                Logins: logins
          };

          cognitoidentity.getCredentialsForIdentity(params, function(err, data) {
            if (err) {
                 console.log('getCredentialsForIdentity failed!');
                 console.log(err, err.stack); // an error occurred
                 reject(err);
            }
            else  {
              // console.log('Got ATS Credentials:', data);   
              let  creds   = new AWS.Credentials( {
                    accessKeyId: data.Credentials.AccessKeyId,
                    secretAccessKey: data.Credentials.SecretKey,
                    sessionToken: data.Credentials.SessionToken
                 });

              AWS.config.credentials = creds;
              authState.accessKeyId = creds.accessKeyId;
              authState.secretAccessKey = creds.secretAccessKey;
              authState.sessionToken = creds.sessionToken;
              // This sessionToken is opaque not JWT one.

              resolve(true);

              // LocalStore.set({ sessionToken : creds.sessionToken });
              // console.log('AWS.Credentials:', AWS.config.credentials);
              // getS3();
              // apiRequest();
            }
          });
        }
     });
  });
  return  await promise;
}

// Get the instance of Auth.
// The advantage of getting this directly is that Amplify.configure()
// is guaranteed to have finished before getting this instance.
export function getAuth(){
  return Auth;
}

export function setAuthState(props){
   _.extend(authState, props)
}

export function getAuthState(){
  console.log('Get Auth State:', authState);
  return authState
}


/**
 * Update user authentication state.
 * Useful to call after long idle time and during first initialization.
 *
 * Also saves the user info in local store and auth state for debug only.
 * We rely on Amplify lib to retrieve current user and session.
 * Amplify itself uses local storage as cache.
 * Our own local store is for informational purposes only.
 *
 * force = false : Attempt to use local cache information.
 * force = true  : Don't use cache and force to call Cognito User Pool.
 *
 */

export async function  refreshAuthUser(force = false)
{

 // console.log('Enter: refreshAuthUser')

  let cognitoUser = null;

  if (force){
    authState.userSession = null;
    AWS.config.credentials = null;
  }

  // Get current CognitoUser. Auto refresh credentials if needed.
  try {

  //  console.log('Call Auth.currentAuthenticatedUser(force)', force);
    cognitoUser = await Auth.currentAuthenticatedUser({ bypassCache:force });
  //  console.log('refreshAuthUser.cognitoUser', cognitoUser);
    // LocalStore.set({ cognitoUser });  // It exceeds quota.
    setAuthState( { cognitoUser });
    let email = _.get(cognitoUser, 'attributes.email', '')
    let username = _.get(cognitoUser, 'username', '')
    LocalStore.set({ email, username });
    setAuthState( { email, username });
  }
  catch(e) { 
    console.log('Auth.currentAuthenticatedUser: Not signedIn.', e)
    LocalStore.set({ cognitoUser: null });
    setAuthState({ cognitoUser: null });
    LocalStore.set({ email: '', username: '' });
    setAuthState({ email: '', username: '' });
  }

  // console.log('Done: Global updateAuthUserState. State:', authState);

  return cognitoUser;
}

/*
 * Get cognito user groups current user belongs to.
 *
 * Valid Group names:
 *    'Admin-Userpool-Group'
 *    'Customer-Userpool-Group'
 *    'Affiliate-Userpool-Group'
 *
 */
export async function getUserCognitoGroups()
{
  let userSession = await refreshUserSession();
  return _.get(userSession, 'idToken.payload.cognito:groups', '').toString();
}

// Return current Cognito User Object.
export async function getCognitoUser()
{
    try {
	  return await Auth.currentAuthenticatedUser({ bypassCache: false });
	}
	catch(e) { 
	  console.log('Auth.currentAuthenticatedUser: Not signedIn.', e);
	  return null;
	}
}

//
// export async function getUserCognitoGroups()
//

/**
 * Get User Role Type. e.g. 'Customer', 'Affiliate', 'Guest', etc.
 *
 * The cognito role name includes deployment specific prefix and looks 
 * like IpuCpCustomerRole, etc. 
 *
 * Returns User Type based on the cognito role.
 *
 */
export function getUserRoleType()
{
  let session = authState.userSession;
  if (!session) return 'Guest';
  // session is of type CognitoUserSession
  let role = _.get(session, 'idToken.payload.cognito:preferred_role', '');
  if (!role) {
    console.log('Warning! CognitoUserSession found but role not found!');
    return 'Guest';
  }

  if (role.includes('UnauthRole'))
    return 'Guest';
  // For the time being AuthRole is also just a Guest.
  if (role.includes('AuthRole'))
    return 'Guest';

  if (role.includes('AdminRole'))
    return 'Admin';
  if (role.includes('AffiliateRole'))
    return 'Affiliate';
  if (role.includes('CustomerRole'))
    return 'Customer';
  if (role.includes('CustomerTier1Role'))
    return 'Customer-Tier1';
}

/**
 * Get basic current user information.
 *
 */
export async function getCurrentUserInfo()
{

  let info = {
    userId      : '',
    email       : '',
    name        : '',
    role        : 'Guest',
    userPoolId  : ''
  };

  await refreshAuthUser(false);  // soft refresh
  await refreshUserSession();

  let user = authState.cognitoUser;
  console.log('authState.cognitoUser from getCurrentUserInfo ', user);
  if (!user) return info;

  info.userId = user.username;
  info.email  = _.get(user, 'attributes.email', '');
  info.name   = _.get(user, 'attributes.name', '');
  info.userPoolId = _.get(user, 'pool.userPoolId', '');
  info.role   = getUserRoleType();
  return info;
}

export function cognitoUserToStr(u) {

  let userId   = u.username;
  let poolId   = _.get(u, 'pool.userPoolId', '')
  let email    = _.get(u, 'attributes.email', '')
  let nickName = 'Guest';
  if (email) nickName = email;

  return   `
    nickName    : ${nickName}
    email       : ${email}
    userId      : ${userId}
    poolId      : ${poolId}   `;
}

