const { assert } = require("chai");

describe('Sage Products Apis validations .......', () => {

  it('Validate Response of "Get Sage Products" API ', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getSageProducts({
      action: get_sage_products_action,
      queryType: "categories"
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(result[0]).to.have.haveOwnProperty('ID');
    console.log("\n Validated the 'ID' is displayed.");
    
    expect(result[0]).to.have.haveOwnProperty('Name');
    console.log("\n Validated the 'Name' is displayed.");

    tc_title = 'Validate Response of "Get Sage Products" API';
    values = {
      Affiliate_user: username,
      statusCode: respInJson.statusCode
    };

  }).timeout(200000);

  it('Validate Error message of "Get Sage Products" API without query type', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getSageProducts({
      action: get_sage_products_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_query_type_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_query_type_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message of "Get Sage Products" API without query type';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missed_QueryType_errorMsg: missing_query_type_errorMsg,
      Missed_QueryType_errorCode: errorCode_400
    };

  }).timeout(200000);

    it('Validate Response of "Test Sage Connections" API ', async () => {

    await testLib.login(username, password);

    let testSageProducts={
      action: test_sage_connection_action,
      sage_enabled: true,
      sage_account_number: 27907,
      sage_token: "5d86368ba3e0e4e6fabbf1cff251391f"
    }

    let resp = await testLib.testSageconnections(testSageProducts);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('result');
    console.log("\n Validated the 'result' is displayed.");
    
    console.log("\n Validated the result: "+result);

    tc_title = 'Validate Response of "Test Sage Connections" API';
    values = {
      Affiliate_user: username,
      statusCode: respInJson.statusCode
    };
}).timeout(200000);

    it('Validate Error message of "Test Sage Connection" API without sage_account_number ', async () => {

    await testLib.login(username, password);

    let testSageProducts={
      action: test_sage_connection_action,
      sage_enabled: true,
      sage_token: "5d86368ba3e0e4e6fabbf1cff251391f"
    }

    let resp = await testLib.testSageconnections(testSageProducts);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(result).to.equal(false);
    console.log("\n Validated the 'result' displayed.");

    tc_title = 'Validate Error message of "Test Sage Connection" API without sage_account_number';
    values = {
      Affiliate_user: username,
      statusCode: respInJson.statusCode
    };
}).timeout(200000);

  })