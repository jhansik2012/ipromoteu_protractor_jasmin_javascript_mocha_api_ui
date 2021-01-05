const { assert } = require('chai')
describe('Add, Get, Update and Delete Shipment Api Validation', () => {

  //------------------------------------Add Shipment-----------------------------------------//

  it('Validate Success message of \'Add Shipment\' Api ', async () => {

    await testLib.login(username, password);
    var addShipmentbody = {
      action: add_Shipments_action,
      jobId: existedJob,
      poNumber: existedJob,
      trackingNumber: trackingNumber,
      dateShipped: shipmentDate
    }
    let resp = await testLib.postShipments(addShipmentbody)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    succMessage = data.message;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(succMessage).to.have.string('Shipment created successfully');
    console.log("\n Validated success message in response");

    if (succMessage.indexOf('Shipment created successfully') > -1) {
      shipmentId = succMessage.split('+')[1].trim();
      console.log('\n Validated the id of shipment created: ' + shipmentId)
    }

    tc_title = 'Validate Success message of \'Add Shipment\' Api ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      jobId: existedJob,
      poNumber: existedJob,
      succMessage: succMessage
    }
  }).timeout(200000);

  it('Validate Error message of \'Add Shipment\' Api without Jobid', async () => {

    await testLib.login(username, password);

    var addShipmentbody = {
      action: add_Shipments_action,
      poNumber: existedJob,
      trackingNumber: trackingNumber,
      dateShipped: shipmentDate
    }
    let resp = await testLib.postShipments(addShipmentbody)

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage = testLib.jsonparse(data.error);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorMessage).to.equal(missing_shipment_jobId_errorMsg);
    console.log("\n Validated the 'error' message displayed: "+missing_shipment_jobId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message of \'Add Shipment\' Api without JobId';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    }
  }).timeout(200000);
  //------------------------------------Get Shipment-----------------------------------------// 

  it('Validate Success message of \'Get Shipment\' Api', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getShipments({
      action: get_Shipment_action,
      jobId: existedJob
    })

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result = testLib.jsonparse(data.result);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('result');
    console.log("\n Validated the 'result' is displayed.");
    var i = 0,
      flag = false,
      arrayLength = result.length;
    for (i; i < arrayLength; i++) {
      flag = true
      expect(result[i]).to.have.haveOwnProperty('id');
    }
    if (flag)
      console.log("\n Validated the 'id' is present for all the contact list.");

    tc_title = 'Validate Success message of \'Get Shipment\' Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      jobId: existedJob

    }
  }).timeout(200000);

  it('Validate Error message of \'Get Shipment\' Api without Job id', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getShipments({
      action: get_Shipment_action
    })

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage = testLib.jsonparse(data.error);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(errorMessage).to.equal(shipment_missing_jobid_error_msg);
    console.log("\n Validated the 'error' message displayed: " + errorMessage);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code :  " + errorCode_400);

    tc_title = 'Validate Error message of \'Get Shipment\' Api without Job id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage:errorMessage
    }
  }).timeout(200000);

  //------------------------------------Update Shipment-----------------------------------------//

  it('Validate Success message of \'Update Shipment\' Api ', async () => {

    await testLib.login(username, password);

    var addShipmentbody = {
      action: add_Shipments_action,
      jobId: existedJob,
      poNumber: existedJob,
      trackingNumber: trackingNumber,
      dateShipped: shipmentDate
    }

    let shipmentResponse = await testLib.postShipments(addShipmentbody),
      shipmentResponseInJson = testLib.jsonparse(shipmentResponse),
      shipmentdata = testLib.jsonparse(shipmentResponseInJson.data),
      shipmentId = shipmentdata.message.split('+')[1].trim();

    var updateShipmentbody = {
      action: update_Shipment_action,
      id: shipmentId,
      poNumber: existedJob,
      trackingNumber: trackingNumber,
      dateShipped: shipmentDate,
      isTrackingNumberUpdated: true
    }

    let resp = await testLib.postShipments(updateShipmentbody)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    succMessage = data.message;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(succMessage).to.equal(shipment_update_succesfull_msg);
    console.log("\n Validated the 'Success' message displayed: " + succMessage);

    tc_title = 'Validate Success message of \'Update Shipment\' Api ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      shipmentId: shipmentId,
      poNumber: existedJob,
      succMessage:succMessage
    }
  }).timeout(200000);

  it('Validate Error message of \'Update Shipment\' Api without Shipment id', async () => {

    await testLib.login(username, password);

    var updateShipmentbody = {
      action: update_Shipment_action,
      poNumber: existedJob,
      trackingNumber: trackingNumber,
      dateShipped: shipmentDate,
      isTrackingNumberUpdated: true
    }
    let resp = await testLib.postShipments(updateShipmentbody)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage = data.error;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is  displayed.");

    expect(errorMessage).to.equal("Missing Shipment `id` parameter.");
    console.log("\n Validated the 'error' message displayed: "+errorMessage);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message of \'Update Shipment\' Api without Shipment id ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    }
  }).timeout(200000);

  //------------------------------------Delete Shipment-----------------------------------------//

  it('Validate Success message of \'Delete Shipment\' Api ', async () => {

    await testLib.login(username, password);

    var addShipmentbody = {
      action: add_Shipments_action,
      jobId: existedJob,
      poNumber: existedJob,
      trackingNumber: trackingNumber,
      dateShipped: shipmentDate
    }
    let shipmentResponse = await testLib.postShipments(addShipmentbody),
      shipmentResponseInJson = testLib.jsonparse(shipmentResponse),
      shipmentdata = testLib.jsonparse(shipmentResponseInJson.data),
      shipmentId = shipmentdata.message.split('+')[1].trim();

    var deleteShipmentbody = {
      action: delete_shipment_action,
      id: shipmentId
    }
    let resp = await testLib.postShipments(deleteShipmentbody)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    succMessage = data.message;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(succMessage).to.equal(shipment_delete_succesfull_msg);
    console.log("\n Validated the 'Success' message displayed: " + succMessage);

    tc_title = 'Validate Success message of \'Delete Shipment\' Api ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      shipmentId: shipmentId,
      succMessage: succMessage
    }
  }).timeout(200000);

  it('Validate Error message of \'Delete Shipment\' Api without shipmet id', async () => {

    await testLib.login(username, password);

    var deleteShipmentbody = {
      action: delete_shipment_action
    }
    let resp = await testLib.postShipments(deleteShipmentbody)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage = testLib.jsonparse(data.error);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(errorMessage).to.equal(missing_shipment_id_errorMsg);
    console.log("\n Validated the 'error' message displayed: " + errorMessage);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Success message of \'Delete Shipment\' Api without shipment id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    }
  }).timeout(200000);

});