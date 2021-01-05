var currentDateyyyymmdd = currentDate;

describe('Create Job Api validations .......', () => {

  it('Validate the success message of Create Job.', async () => {

    await testLib.login(username, password);

    let cj_resp = await testLib.createJob(create_job_params);
    respInJson = testLib.jsonparse(cj_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('jobId');
    console.log("\n Validated 'jobId' field is displayed.");

    succMessage = data.message;
    var createdJobId = succMessage.split(" ")[2];

    expect(succMessage).to.have.string('New job ');
    expect(succMessage).to.have.string(' created successfully');
    expect(createdJobId).to.have.string(testConfig.testerUsername);
    console.log("\n Validated created job message : " + succMessage);

    expect(createdJobId).to.equal(data.jobId);
    console.log("\n Validated that job got created : " + createdJobId);

    let jobIdResp = await testLib.getJobDetails(createdJobId);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobId = data.result.jobId;

    expect(createdJobId).to.equal(jobId);
    console.log("Validated '" + createdJobId + "' Job details.\n\n");

    expect(cj_jobTitle).to.equal(data.result.jobTitle);
    console.log("Validated the updated job title '" + cj_jobTitle + "'.\n");

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

    tc_title = 'Validated the success message of Create Job.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdJobId: jobId,
      updated_JobTitle: cj_jobTitle,
      updated_customerId: cj_customerId,
      updated_salesrepId: cj_salesrepId,
      updated_billToContactId: cj_billToContactId,
      updated_shipToContactId: cj_shipToContactId,
      updated_orderedByContactId: cj_orderedByContactId,
    };

  }).timeout(200000);

  it('Validate the salesRepId as affiliateId by default of Create Job.', async () => {

    var create_job_without_salesrepId_params = {
      action: cj_action,
      customerId: cj_customerId,
      jobTitle: cj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId,
      inHandsDate: futureDate_yyyy_mm_dd,
      reqShipDate: currentDate_yyyy_mm_dd
    };
    await testLib.login(username, password);

    let cj_resp = await testLib.createJob(create_job_without_salesrepId_params);
    respInJson = testLib.jsonparse(cj_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('jobId');
    console.log("\n Validated 'jobId' field is displayed.");

    succMessage = data.message;
    var createdJobId = succMessage.split(" ")[2];

    expect(succMessage).to.have.string('New job ');
    expect(succMessage).to.have.string(' created successfully');
    expect(createdJobId).to.have.string(testConfig.testerUsername);
    console.log("\n Validated created job message : " + succMessage);

    expect(createdJobId).to.equal(data.jobId);
    console.log("\n Validated that job got created : " + createdJobId);

    let jobIdResp = await testLib.getJobDetails(createdJobId);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobId = data.result.jobId;

    expect(createdJobId).to.equal(jobId);
    console.log("Validated '" + createdJobId + "' Job details.\n\n");

    expect(cj_jobTitle).to.equal(data.result.jobTitle);
    console.log("Validated the updated job title '" + cj_jobTitle + "'.\n");

    expect(cj_customerId).to.equal(data.result.customerId);
    console.log("Validated the updated customerId '" + cj_customerId + "'.\n");

    expect(username).to.equal(data.result.salesRep);
    console.log("Validated the updated salesrepId '" + username + "'.\n");

    expect(cj_billToContactId).to.equal(data.result.billToContactId);
    console.log("Validated the updated billToContactId '" + cj_billToContactId + "'.\n");

    expect(cj_shipToContactId).to.equal(data.result.shipToContactId);
    console.log("Validated the updated shipToContactId '" + cj_shipToContactId + "'.\n");

    expect(cj_orderedByContactId).to.equal(data.result.orderedByContactId);
    console.log("Validated the updated orderByContactId '" + cj_orderedByContactId + "'.\n");

    tc_title = 'Validated salesRepId as affiliateId by default of Create Job.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdJobId: jobId,
      updated_JobTitle: cj_jobTitle,
      updated_customerId: cj_customerId,
      updated_salesrepId: username,
      updated_billToContactId: cj_billToContactId,
      updated_shipToContactId: cj_shipToContactId,
      updated_orderedByContactId: cj_orderedByContactId,
    };
  }).timeout(200000);

  it('Validate the Error message with invalid salesRepId, billToContactId, shipToContactId, orderedByContactId of Create Job.', async () => {

    var create_job_invalid_params = {
      action: cj_action,
      customerId: cj_customerId,
      jobTitle: cj_jobTitle,
      salesrepId: invalid_data,
      billToContactId: invalid_data,
      shipToContactId: invalid_data,
      orderByContactId: invalid_data,
      inHandsDate: futureDate_yyyy_mm_dd,
      reqShipDate: currentDate_yyyy_mm_dd
    };
    await testLib.login(username, password);

    let cj_resp = await testLib.createJob(create_job_invalid_params);
    respInJson = testLib.jsonparse(cj_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(invalid_salesrepId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_salesrepId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

/****************************Response got changed****************************************/

    // expect(data).to.have.haveOwnProperty('jobId');
    // console.log("\n Validated 'jobId' field is displayed.");

    // expect(data).to.have.haveOwnProperty('warning');
    // console.log("\n Validated 'warning' field is displayed.");

    // succMessage = data.message;
    // var createdJobId = succMessage.split(" ")[2];

    // expect(succMessage).to.have.string('New job ');
    // expect(succMessage).to.have.string(' created successfully');
    // expect(createdJobId).to.have.string(testConfig.testerUsername);
    // console.log("\n Validated the created job message : " + succMessage);

    // expect(createdJobId).to.equal(data.jobId);
    // console.log("\n Validated that job got created : " + createdJobId);

    // expect(warningMsg.trim).to.equal((data.warning).trim);
    // console.log("\n Validated the warning message : '" + warningMsg + "'");

    // let jobIdResp = await testLib.getJobDetails(createdJobId);
    // respInJson = testLib.jsonparse(jobIdResp);
    // data = testLib.jsonparse(respInJson.data);

    // expect(successCode_200).to.equal(respInJson.statusCode);
    // console.log("\n Validated the status code :  " + successCode_200);

    // expect(respInJson).to.not.have.haveOwnProperty('error');
    // console.log("\n Validated the 'error' is not displayed.");

    // var jobId = data.result.jobId;

    // expect(createdJobId).to.equal(jobId);
    // console.log("Validated '" + createdJobId + "' Job details.\n\n");

    // expect(cj_jobTitle).to.equal(data.result.jobTitle);
    // console.log("Validated the updated job title '" + cj_jobTitle + "'.\n");

    // expect(cj_customerId).to.equal(data.result.customerId);
    // console.log("Validated the updated customerId '" + cj_customerId + "'.\n");

    // expect('').to.equal(data.result.salesRep);
    // console.log("Validated the updated salesrepId with null. \n");

    // expect('').to.equal(data.result.billToContactId);
    // console.log("Validated the updated billToContactId with null. \n");

    // expect('').to.equal(data.result.shipToContactId);
    // console.log("Validated the updated shipToContactId with null. \n");

    // expect('').to.equal(data.result.orderedByContactId);
    // console.log("Validated the updated orderByContactId with null. \n");

/*******************************Response got changed ************************************************/

    tc_title = 'Validated the Error message with invalid salesRepId, billToContactId, shipToContactId, orderedByContactId of Create Job.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      ErrorMessage: invalid_salesrepId_errorMsg,
      ErrorCode: errorCode_400   
    };
  }).timeout(200000);

  it('Validate the error message of Create Job with invalid CustomerId.', async () => {

    var error_params = {
      action: cj_action,
      customerId: invalid_data,
      salesrepId: cj_salesrepId,
      jobTitle: cj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId,
      inHandsDate: futureDate_yyyy_mm_dd,
      reqShipDate: currentDate_yyyy_mm_dd
    };
    await testLib.login(username, password);

    let cj_resp = await testLib.createJob(error_params);
    respInJson = testLib.jsonparse(cj_resp);
    var data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_customerId_1_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_customerId_1_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message of Create Job with invalid CustomerId.';

    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdJob_invalid_customerId_errorMsg: invalid_customerId_1_errorMsg,
      createdJob_invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of Create Job with invalid format of reqShipDate.', async () => {

    var createJob_params = {
      action: cj_action,
      customerId: cj_customerId,
      salesrepId: cj_salesrepId,
      jobTitle: cj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId,   
      reqShipDate : currentDateyyyymmdd,   
      inHandsDate: futureDate_yyyy_mm_dd,      
    };

    await testLib.login(username, password);

    let cj_resp = await testLib.createJob(createJob_params);
    respInJson = testLib.jsonparse(cj_resp);
    var data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('jobId');
    console.log("\n Validated 'jobId' field is displayed.");

    succMessage = data.message;
    var createdJobId = succMessage.split(" ")[2];

    expect(succMessage).to.have.string('New job ');
    expect(succMessage).to.have.string(' created successfully');
    expect(createdJobId).to.have.string(testConfig.testerUsername);
    console.log("\n Validated created job message : " + succMessage);

    expect(createdJobId).to.equal(data.jobId);
    console.log("\n Validated that job got created : " + createdJobId);

    expect(reqShipDate_inHandsDate_warning).to.equal(data.warning);
    console.log("\n Validated the invalid format of reqShipDate worning : " + reqShipDate_inHandsDate_warning);

    let jobIdResp = await testLib.getJobDetails(createdJobId);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    var jobId = data.result.jobId;

    expect(createdJobId).to.equal(jobId);
    console.log("Validated '" + createdJobId + "' Job details.\n\n");

    expect(cj_jobTitle).to.equal(data.result.jobTitle);
    console.log("Validated the updated job title '" + cj_jobTitle + "'.\n");

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

     /* The below validations will be changing in future.*/

    expect('').to.equal(data.result.reqShipDate);
    console.log("Validated the updated reqShipDate as empty");

    expect('').to.equal(data.result.inHandsDate);
    console.log("Validated the updated inHandsDate as empty");

    tc_title = 'Validated the error message of Create Job with invalid format of reqShipDate.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdJobId: jobId,
      updated_JobTitle: cj_jobTitle,
      updated_customerId: cj_customerId,
      updated_salesrepId: cj_salesrepId,
      updated_billToContactId: cj_billToContactId,
      updated_shipToContactId: cj_shipToContactId,
      updated_orderedByContactId: cj_orderedByContactId,
    };
  }).timeout(200000);

  it('Validate the error message of Create Job with invalid format of inHandsDate.', async () => {

    var error_params = {
      action: cj_action,
      customerId: cj_customerId,
      salesrepId: cj_salesrepId,
      jobTitle: cj_jobTitle,
      billToContactId: cj_billToContactId,
      shipToContactId: cj_shipToContactId,
      orderByContactId: cj_orderedByContactId,
      inHandsDate: futureDate,
      reqShipDate: currentDate_yyyy_mm_dd
    };
    await testLib.login(username, password);

    let cj_resp = await testLib.createJob(error_params);
    respInJson = testLib.jsonparse(cj_resp);
    var data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);
expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('jobId');
    console.log("\n Validated 'jobId' field is displayed.");

    succMessage = data.message;
    var createdJobId = succMessage.split(" ")[2];

    expect(succMessage).to.have.string('New job ');
    expect(succMessage).to.have.string(' created successfully');
    expect(createdJobId).to.have.string(testConfig.testerUsername);
    console.log("\n Validated created job message : " + succMessage);

    expect(createdJobId).to.equal(data.jobId);
    console.log("\n Validated that job got created : " + createdJobId);

    expect(reqShipDate_inHandsDate_warning).to.equal(data.warning);
    console.log("\n Validated the invalid format of reqShipDate worning : " + reqShipDate_inHandsDate_warning);

    let jobIdResp = await testLib.getJobDetails(createdJobId);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    var jobId = data.result.jobId;

    expect(createdJobId).to.equal(jobId);
    console.log("Validated '" + createdJobId + "' Job details.\n\n");

    expect(cj_jobTitle).to.equal(data.result.jobTitle);
    console.log("Validated the updated job title '" + cj_jobTitle + "'.\n");

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

    /* The below validations will be changing in future.*/

    expect('').to.equal(data.result.reqShipDate);
    console.log("Validated the updated reqShipDate as empty");

    expect('').to.equal(data.result.inHandsDate);
    console.log("Validated the updated inHandsDate as empty.");

    tc_title = 'Validated the error message of Create Job with invalid format of inHandsDate.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdJobId: jobId,
      updated_JobTitle: cj_jobTitle,
      updated_customerId: cj_customerId,
      updated_salesrepId: cj_salesrepId,
      updated_billToContactId: cj_billToContactId,
      updated_shipToContactId: cj_shipToContactId,
      updated_orderedByContactId: cj_orderedByContactId,
    };
  }).timeout(200000);


  /**
   * *****************************Deprecated test case********************************************
   */

  // it('Validate the error message of Create Job with previous date of reqShipDate.', async () => {

  //   var error_params = {
  //     action: cj_action,
  //     customerId: cj_customerId,
  //     salesrepId: cj_salesrepId,
  //     jobTitle: cj_jobTitle,
  //     billToContactId: cj_billToContactId,
  //     shipToContactId: cj_shipToContactId,
  //     orderByContactId: cj_orderedByContactId,
  //     inHandsDate: futureDate_yyyy_mm_dd,
  //     reqShipDate: previousDate
  //   };
  //   await testLib.login(username, password);

  //   let cj_resp = await testLib.createJob(error_params);
  //   respInJson = testLib.jsonparse(cj_resp);
  //   var data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(invalid_reqShipDate_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_reqShipDate_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = 'Validated the error message of Create Job with previous date of reqShipDate.';

  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     createdJob_previous_date_reqShipDate_errorMsg: invalid_reqShipDate_errorMsg,
  //     createdJob_previous_date_reqShipDate_errorCode: errorCode_400
  //   };
  // }).timeout(200000);

  // it('Validate the error message of Create Job with current date of inHandsDate.', async () => {

  //   var error_params = {
  //     action: cj_action,
  //     customerId: cj_customerId,
  //     salesrepId: cj_salesrepId,
  //     jobTitle: cj_jobTitle,
  //     billToContactId: cj_billToContactId,
  //     shipToContactId: cj_shipToContactId,
  //     orderByContactId: cj_orderedByContactId,
  //     inHandsDate: currentDate_yyyy_mm_dd,
  //     reqShipDate: previousDate
  //   };
  //   await testLib.login(username, password);

  //   let cj_resp = await testLib.createJob(error_params);
  //   respInJson = testLib.jsonparse(cj_resp);
  //   var data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(invalid_inHandsdate_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_inHandsdate_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = 'Validated the error message of Create Job with current date of inHandsDate.';

  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     createdJob_current_date_inHandsDate_errorMsg: invalid_inHandsdate_errorMsg,
  //     createdJob_current_date_inHandsDate_errorCode: errorCode_400
  //   };
  // }).timeout(200000);

  // it('Validate the error message of Create Job with previous date of inHandsDate.', async () => {

  //   var error_params = {
  //     action: cj_action,
  //     customerId: cj_customerId,
  //     salesrepId: cj_salesrepId,
  //     jobTitle: cj_jobTitle,
  //     billToContactId: cj_billToContactId,
  //     shipToContactId: cj_shipToContactId,
  //     orderByContactId: cj_orderedByContactId,
  //     inHandsDate: previousDate,
  //     reqShipDate: currentDate_yyyy_mm_dd
  //   };
  //   await testLib.login(username, password);

  //   let cj_resp = await testLib.createJob(error_params);
  //   respInJson = testLib.jsonparse(cj_resp);
  //   var data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(invalid_inHandsdate_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_inHandsdate_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = 'Validated the error message of Create Job with previous date of inHandsDate.';

  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     createdJob_previous_date_inHandsDate_errorMsg: invalid_inHandsdate_errorMsg,
  //     createdJob_previous_date_inHandsDate_errorCode: errorCode_400
  //   };
  // }).timeout(200000);

});