describe('Update Job Api validations .......', () => {

  it('Update Job with altAddress', async () => {

    await testLib.login(username, password);

    //Create Job
    let cj_resp = await testLib.createJob(create_job_params);
    respInJson = testLib.jsonparse(cj_resp);
    data = testLib.jsonparse(respInJson.data);

    existedJobId = data.jobId;

    //Update Job
    var update_altAddress_params = {
      action: uj_action,
      jobId: existedJobId,
      customerId: cj_customerId,
      salesrepId: cj_salesrepId,
      jobTitle: uj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId,
      "isRushJob": isrushJob,
      "isSampleRequired": issampleRequired,
      "altAddress": {
        "zip": altAdr_zip,
        "city": altAdr_city,
        "name": altAdr_name,
        "state": altAdr_state,
        "countryCode": altAdr_countryCode,
        "addressLine1": altAdr_addressLine1,
        "addressLine2": altAdr_addressLine2,
        "addressLine3": altAdr_addressLine3,
      },
    };

    let updateResp = await testLib.updateJob(update_altAddress_params);

    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    succMessage = data.message;

    expect(succMessage).to.have.string('Job updated successfully. [JobID: ');
    expect(succMessage).to.have.string(existedJobId);
    console.log("\n Validated the updated job message : " + succMessage);

    let jobIdResp = await testLib.getJobDetails(existedJobId);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(existedJobId).to.equal(data.result.jobId);
    console.log("Validated the updated jobid '" + existedJobId + "'.\n");

    expect(uj_jobTitle).to.equal(data.result.jobTitle);
    console.log("Validated the updated job title '" + uj_jobTitle + "'.\n");

    expect(cj_customerId).to.equal(data.result.customerId);
    console.log("Validated the updated customerId '" + cj_customerId + "'.\n");

    expect(cj_salesrepId).to.equal(data.result.salesRep);
    console.log("Validated the updated salesrepId '" + cj_salesrepId + "'.\n");

    expect(cj_billToContactId).to.equal(data.result.billToContactId);
    console.log("Validated the updated billToContactId '" + cj_billToContactId + "'.\n");

    expect(cj_shipToContactId).to.equal(data.result.shipToContactId);
    console.log("Validated the updated shipToContactId '" + cj_shipToContactId + "'.\n");

    expect(cj_orderedByContactId).to.equal(data.result.orderedByContactId);
    console.log("Validated the updated orderByContactId '" + cj_orderedByContactId + "'.\n");

    expect(0).to.equal(data.result.isRushJob);
    console.log("Validated the updated isRushJob :'" + 0 + "'.\n");

    expect(0).to.equal(data.result.isSampleJob);
    console.log("Validated the updated isSampleJob :'" + 0 + "'.\n");

    expect(altAdr_zip).to.equal(data.result.alternateAddressInfo.zip);
    console.log("Validated the updated zip '" + altAdr_zip + "'.\n");

    expect(altAdr_city).to.equal(data.result.alternateAddressInfo.city);
    console.log("Validated the updated city '" + altAdr_city + "'.\n");

    expect(altAdr_name).to.equal(data.result.alternateAddressInfo.name);
    console.log("Validated the updated name '" + altAdr_name + "'.\n");

    expect(altAdr_state).to.equal(data.result.alternateAddressInfo.state);
    console.log("Validated the updated state '" + altAdr_state + "'.\n");

    expect(altAdr_countryCode).to.equal(data.result.alternateAddressInfo.countryCode);
    console.log("Validated the updated countryCode '" + altAdr_countryCode + "'.\n");

    expect(altAdr_addressLine1).to.equal(data.result.alternateAddressInfo.addressLine1);
    console.log("Validated the updated addressLine1 '" + altAdr_addressLine1 + "'.\n");

    expect(altAdr_addressLine2).to.equal(data.result.alternateAddressInfo.addressLine2);
    console.log("Validated the updated addressLine2 '" + altAdr_addressLine2 + "'.\n");

    expect(altAdr_addressLine3).to.equal(data.result.alternateAddressInfo.addressLine3);
    console.log("Validated the updated addressLine3 '" + altAdr_addressLine3 + "'.\n");

    tc_title = 'Update Job with altAddress.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      updated_JobId: existedJobId,
      updated_JobTitle: uj_jobTitle + '--  updated field',
      updated_customerId: cj_customerId,
      updated_salesrepId: cj_salesrepId,
      updated_billToContactId: cj_billToContactId,
      updated_shipToContactId: cj_shipToContactId,
      updated_orderedByContactId: cj_orderedByContactId,
      added_isRushJob: 0 + '--  added isRushJob',
      added_isSampleRequired: 0 + '--  added isSampleRequired',
      added_zip: altAdr_zip + '--  added altaddress',
      added_city: altAdr_city,
      added_name: altAdr_name,
      added_state: altAdr_state,
      added_countryCode: altAdr_countryCode,
      added_addressLine1: altAdr_addressLine1,
      added_addressLine2: altAdr_addressLine2,
      added_addressLine3: altAdr_addressLine3
    };
  }).timeout(300000);

  it('Update Job with basic details.', async () => {

    await testLib.login(username, password);

    //Create Job
    let cj_resp = await testLib.createJob(create_job_params);
    respInJson = testLib.jsonparse(cj_resp);
    data = testLib.jsonparse(respInJson.data);

    existedJobId = data.jobId;

    //Update Job
    var update_params = {
      action: uj_action,
      jobId: existedJobId,
      customerId: cj_customerId,
      salesrepId: cj_salesrepId,
      jobTitle: uj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId,
      "isRushJob": 0,
      "isSampleRequired": 0,
    };

    let updateResp = await testLib.updateJob(update_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    succMessage = data.message;

    expect(succMessage).to.have.string('Job updated successfully. [JobID: ');
    expect(succMessage).to.have.string(existedJobId);
    console.log("\n Validated the updated job message : " + succMessage);

    let jobIdResp = await testLib.getJobDetails(existedJobId);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(existedJobId).to.equal(data.result.jobId);
    console.log("Validated the updated jobid '" + existedJobId + "'.\n");

    expect(uj_jobTitle).to.equal(data.result.jobTitle);
    console.log("Validated the updated job title '" + uj_jobTitle + "'.\n");

    expect(cj_customerId).to.equal(data.result.customerId);
    console.log("Validated the updated customerId '" + cj_customerId + "'.\n");

    expect(cj_salesrepId).to.equal(data.result.salesRep);
    console.log("Validated the updated salesrepId '" + cj_salesrepId + "'.\n");

    expect(cj_billToContactId).to.equal(data.result.billToContactId);
    console.log("Validated the updated billToContactId '" + cj_billToContactId + "'.\n");

    expect(cj_shipToContactId).to.equal(data.result.shipToContactId);
    console.log("Validated the updated shipToContactId '" + cj_shipToContactId + "'.\n");

    expect(cj_orderedByContactId).to.equal(data.result.orderedByContactId);
    console.log("Validated the updated orderByContactId '" + cj_orderedByContactId + "'.\n");

    expect(0).to.equal(data.result.isRushJob);
    console.log("Validated the updated isRushJob :'" + 0 + "'.\n");

    expect(0).to.equal(data.result.isSampleJob);
    console.log("Validated the updated isSampleJob :'" + 0 + "'.\n");

    tc_title = 'Update Job with basic details.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      updated_JobId: existedJobId,
      updated_JobTitle: uj_jobTitle + '--  updated field',
      updated_customerId: cj_customerId,
      updated_salesrepId: cj_salesrepId,
      updated_billToContactId: cj_billToContactId,
      updated_shipToContactId: cj_shipToContactId,
      updated_orderedByContactId: cj_orderedByContactId,
      added_isRushJob: 0 + '--  added isRushJob',
      added_isSampleRequired: 0 + '--  added isSampleRequired'
    };
  }).timeout(200000);

  it("Validate the error message with invalid CustomerId of 'Update Job'.", async () => {

    await testLib.login(username, password);

    //Update Job
    var update_invalid_customerId_params = {
      action: uj_action,
      jobId: existedJob,
      customerId: invalid_data,
      salesrepId: cj_salesrepId,
      jobTitle: uj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId
    };

    let updateResp = await testLib.updateJob(update_invalid_customerId_params);
    respInJson = testLib.jsonparse(updateResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_customerId_3_errorMsg+invalid_data).to.equal(data.error);
    console.log("\n Validated message : " + invalid_customerId_3_errorMsg+invalid_data);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated error code + errorCode_400");

    tc_title = "Validated the error message with invalid CustomerId of 'Update Job'.";

    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      provided_customerId: invalid_data,
      UpdateJob_errorMsg: invalid_customerId_3_errorMsg+invalid_data,
      UpdateJob_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with missing jobId field of 'Update Job", async () => {

    var update_without_jobId_params = {
      action: uj_action,
      customerId: cj_customerId,
      salesrepId: cj_salesrepId,
      jobTitle: uj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId,
      inHandsDate: futureDate_yyyy_mm_dd,
      reqShipDate: currentDate_yyyy_mm_dd,
      isRushJob: 0,
      isSampleRequired: 0,
      jobInstructions: 'Please make sure the all items to be shipped ASAP.'
    };

    await testLib.login(username, password);

    let resp = await testLib.updateJob(update_without_jobId_params);

    respInJson = testLib.jsonparse(resp);
    var data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(misses_jobId_errorMsg1).to.equal(data.error);
    console.log("\n Validated the error message : " + misses_jobId_errorMsg1);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated error code + errorCode_400");

    tc_title = "Validated the error message with missing jobId field of 'Update Job'.";

    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_jobId_errorMsg: misses_jobId_errorMsg1,
      Missing_jobId_errorCode: errorCode_400
    };

  }).timeout(200000);

  it("Validate the error message with invalid jobId of 'Update Job'", async () => {

    var update_invalid_jobId_params = {
      action: uj_action,
      jobId: invalid_data,
      customerId: cj_customerId,
      salesrepId: cj_salesrepId,
      jobTitle: cj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId,
      inHandsDate: futureDate_yyyy_mm_dd,
      reqShipDate: currentDate_yyyy_mm_dd,
      isRushJob: 0,
      isSampleRequired: 0,
      jobInstructions: 'Please make sure the all items to be shipped ASAP.'
    };

    await testLib.login(username, password);

    let resp = await testLib.updateJob(update_invalid_jobId_params);

    respInJson = testLib.jsonparse(resp);
    var data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect("Invalid jobId!").to.equal(data.error);
    console.log("\n Validated message : " + invalid_jobId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with invalid jobId of 'Update Job'.";

    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      UpdateJob_invalid_jobId_errorMsg: invalid_jobId_errorMsg,
      UpdateJob_invalid_jobId_errorCode: errorCode_400
    };

  }).timeout(200000);

  it('Update the Job without action filter.', async () => {

    await testLib.login(username, password);

    //Update Job
    var update_without_action_params = {
      jobId: '1721754AAA',
      customerId: cj_customerId,
      salesrepId: cj_salesrepId,
      jobTitle: cj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId
    };
    let updateResp = await testLib.updateJob(update_without_action_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated error code + errorCode_400");

    tc_title = 'Validated the error message of update Job without action filter.';

    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_field: 'action',
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };

  }).timeout(200000);

  /**
   * This test cases is excluded in execution. Because 'altAddressId' has removed from request.
   */
  /*
  it('Update Job with valid altAddressId.', async () => {

    await testLib.login(username, password);

    //Create Job
    let cj_resp = await testLib.createJob(create_job_params);
    respInJson = testLib.jsonparse(cj_resp);
    data = testLib.jsonparse(respInJson.data);

    succMessage = data.message;
    existedJobId = succMessage.split(" ")[2];

    //Update Job
    var update_altAddressId_params = {
      action: uj_action,
      jobId: existedJobId,
      customerId: cj_customerId,
      salesrepId: cj_salesrepId,
      jobTitle: uj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId,
      "isRushJob": 0,
      "isSampleRequired": 0,
    };

    let updateResp = await testLib.updateJob(update_altAddressId_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    succMessage = data.message;

    expect(succMessage).to.have.string('Job updated successfully. [JobID: ');
    expect(succMessage).to.have.string(existedJobId);
    console.log("\n Validated the updated job message : " + succMessage);

    let jobIdResp = await testLib.getJobDetails(existedJobId);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(existedJobId).to.equal(data.result.jobId);
    console.log("Validated the updated jobid '" + existedJobId + "'.\n");

    expect(uj_jobTitle).to.equal(data.result.jobTitle);
    console.log("Validated the updated job title '" + uj_jobTitle + "'.\n");

    expect(cj_customerId).to.equal(data.result.customerId);
    console.log("Validated the updated customerId '" + cj_customerId + "'.\n");

    expect(cj_salesrepId).to.equal(data.result.salesRep);
    console.log("Validated the updated salesrepId '" + cj_salesrepId + "'.\n");

    expect(cj_billToContactId).to.equal(data.result.billToContactId);
    console.log("Validated the updated billToContactId '" + cj_billToContactId + "'.\n");

    expect(cj_shipToContactId).to.equal(data.result.shipToContactId);
    console.log("Validated the updated shipToContactId '" + cj_shipToContactId + "'.\n");

    expect(cj_orderedByContactId).to.equal(data.result.orderedByContactId);
    console.log("Validated the updated orderByContactId '" + cj_orderedByContactId + "'.\n");

    expect(0).to.equal(data.result.isRushJob);
    console.log("Validated the updated isRushJob :'" + 0 + "'.\n");

    expect(0).to.equal(data.result.isSampleJob);
    console.log("Validated the updated isSampleJob :'" + 0 + "'.\n");

    tc_title = 'Update Job with valid altAddressId.';
     values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      updated_JobId: existedJobId,
      updated_JobTitle: uj_jobTitle + '--  updated field',
      updated_customerId: cj_customerId,
      updated_salesrepId: cj_salesrepId,
      updated_billToContactId: cj_billToContactId,
      updated_shipToContactId: cj_shipToContactId,
      updated_orderedByContactId: cj_orderedByContactId,
      added_isRushJob: 0 + '--  added isRushJob',
      added_isSampleRequired: 0 + '--  added isSampleRequired'
    };

  }).timeout(200000);
*/

  /**
  * This test cases is not included in execution. Because 'altAddressId' got removed from request.
  */
  /* it('Update Job with invalid AltAddressId.', async () => {
 
     await testLib.login(username, password);
 
     //Create Job
     let cj_resp = await testLib.createJob(create_job_params);
     console.log(resp + ("----------------------------------------------------------"))
     respInJson = testLib.jsonparse(cj_resp);
     data = testLib.jsonparse(respInJson.data);
 
     succMessage = data.message;
     existedJobId = succMessage.split(" ")[2];
 
     //Update Job
     var update_invalid_altAddressId_params = {
       action: uj_action,
       jobId: existedJobId,
       customerId: cj_customerId,
       salesrepId: cj_salesrepId,
       jobTitle: uj_jobTitle,
       billToContactId: cj_billToContactId,
       shipToContactId: cj_shipToContactId,
       orderByContactId: cj_orderedByContactId,
       "altAddressId": "01419"
     };
     let UpdateResp = await testLib.updateJob(update_invalid_altAddressId_params);
     respInJson = testLib.jsonparse(UpdateResp);
     data = '';
     data = testLib.jsonparse(respInJson.data);
 
     expect(successCode_200).to.equal(respInJson.statusCode);
     console.log("\n Validated the status code :  " + successCode_200);
 
     expect(data).to.have.haveOwnProperty('error');
     console.log("\n Validated the 'error' is displayed.");
 
     expect(data.error).to.equal(null);
     console.log("Validated 'error' return null value.\n");
 
     expect(data.warning).to.not.equal(null);
     console.log("Validated 'warning' return null value.\n");
 
     expect(data).to.not.have.haveOwnProperty('newAltAddressId');
     console.log("\n Validated 'newAltAddressId' is displayed.");
 
     succMessage = data.message;
 
     expect(succMessage).to.have.string('Job updated successfully. [JobID: ');
     expect(succMessage).to.have.string(existedJobId);
     console.log("\n Validated the updated job message : " + succMessage);
 
     let jobIdResp = await testLib.getJobDetails(existedJobId);
     respInJson = testLib.jsonparse(jobIdResp);
     data = testLib.jsonparse(respInJson.data);
 
     expect(successCode_200).to.equal(respInJson.statusCode);
     console.log("\n Validated the status code :  " + successCode_200);
 
     expect(respInJson).to.not.have.haveOwnProperty('error');
     console.log("\n Validated the 'error' is not displayed.");
 
     var jobId = data.result.jobId;
     expect(data.result.jobId).to.equal(existedJobId);
     console.log("Validated the updated jobid '" + existedJobId + "'.\n");
 
     expect(data.result.jobTitle).to.equal(uj_jobTitle);
     console.log("Validated the updated job title '" + uj_jobTitle + "'.\n");
 
     expect(data.result.customerId).to.equal(cj_customerId);
     console.log("Validated the updated customerId '" + cj_customerId + "'.\n");
 
     expect(data.result.salesRep).to.equal(cj_salesrepId);
     console.log("Validated the updated salesrepId '" + cj_salesrepId + "'.\n");
 
     expect(data.result.billToContactId).to.equal(cj_billToContactId);
     console.log("Validated the updated billToContactId '" + cj_billToContactId + "'.\n");
 
     expect(data.result.shipToContactId).to.equal(cj_shipToContactId);
     console.log("Validated the updated shipToContactId '" + cj_shipToContactId + "'.\n");
 
     expect(data.result.orderedByContactId).to.equal(cj_orderedByContactId);
     console.log("Validated the updated orderByContactId '" + cj_orderedByContactId + "'.\n");
 
     tc_title = 'Update the Job with invalid AltAddressId.';
      values = {
       Affiliate_user: username,
       statusCode: successCode_200,
       updated_JobId: existedJobId,
       updated_JobTitle: uj_jobTitle + '--  updated field',
       updated_customerId: cj_customerId,
       updated_salesrepId: cj_salesrepId,
       updated_billToContactId: cj_billToContactId,
       updated_shipToContactId: cj_shipToContactId,
       updated_orderedByContactId: cj_orderedByContactId
     };
   }).timeout(200000);
 */
});