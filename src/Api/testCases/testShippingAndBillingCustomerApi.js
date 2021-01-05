const { assert } = require('chai');

describe('Shipping and Billing customer Api validations .......', () => {

  it('Validate the success message for Create Shipping customer Api ', async () => {

    await testLib.login(username, password);

    var date = new Date()
    var customerCode = 'ABC' + date.getSeconds() + date.getMilliseconds();

    var createShippingCustomerParams = {
      action: create_shipping_customer_action,
      companyName: CompanyName,
      customerCode: customerCode
    }

    let resp = await testLib.ShippingAndBillingCustomer(createShippingCustomerParams)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log('\n Validated the status code : ' + successCode_200);

    succMessage = data.message;
    var succMsgArray = succMessage.split(" ");
    var newShipCode = String(succMsgArray.slice(-1));
    newShipCode = newShipCode.slice(0, -1);
    expect(succMessage).to.have.string(create_shipping_customer_succMsg);
    expect(succMessage).to.have.string('[Ship code: ' + newShipCode + ']');
    console.log("\n Validated the created shipping code message : " + succMessage);

    tc_title = 'Validated the success message for Create Shipping customer Api ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      newShippingCustomerCode: newShipCode
    }

  }).timeout(200000);

  it('Validate Error message for Create Shipping customer Api without customerCode ', async () => {

    await testLib.login(username, password);

    var createShippingCustomerParams = {
      action: create_shipping_customer_action,
      companyName: CompanyName
    }

    let resp = await testLib.ShippingAndBillingCustomer(createShippingCustomerParams)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log('\n Validated the status code : ' + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated success message in response");

    expect(missing_empty_cutomer_code_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_empty_cutomer_code_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error message : " + errorCode_400);


    tc_title = 'Validatee Error message for Create Shipping customer Api without customerCode';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_customerCode_errorMsg: missing_empty_cutomer_code_errorMsg,
      Missing_customerCode_errorCode: errorCode_400
    }

  }).timeout(200000);

  it('Validate the success message for Create Billing customer Api', async () => {

    await testLib.login(username, password);

    var date = new Date()
    var billCode = 'ABC' + date.getSeconds() + date.getMilliseconds();

    var createBillingCustomerParams = {
      action: create_billing_customer,
      companyName: CompanyName,
      billCode: billCode
    }

    let resp = await testLib.ShippingAndBillingCustomer(createBillingCustomerParams)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log('\n Validated the status code :  ' + successCode_200);

    succMessage = data.message;
    var succMsgArray = succMessage.split(" ");
    var newBillCode = String(succMsgArray.slice(-1));
    newBillCode = newBillCode.slice(0, -1);
    expect(succMessage).to.have.string(create_billing_customer_succMsg);
    expect(succMessage).to.have.string('[Bill code: ' + newBillCode + ']');
    console.log("\n Validated the created billing code message : " + succMessage);

    tc_title = 'Validated the success message for Create Billing customer Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      CusstomerBillingCode: newBillCode
    }

  }).timeout(200000);

  it('Validate Error message for Create Billing customer Api without billCode', async () => {

    await testLib.login(username, password);

    var createBillingCustomerParams = {
      action: create_billing_customer
    }

    let resp = await testLib.ShippingAndBillingCustomer(createBillingCustomerParams)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log('\n Validated the status code :  ' + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated success message in response");

    expect(misses_empty_create_customer_billing_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + misses_empty_create_customer_billing_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message for Create Billing customer Api without billCode';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_billCode_errorMsg: misses_empty_create_customer_billing_errorMsg,
      Missing_billCode_itemcode_errorCode: errorCode_400
    }
  }).timeout(200000);

  it('Validate the Success message for Update Shipping customer Api', async () => {

    await testLib.login(username, password);

    var date = new Date()
    var customerCode = 'ABC' + date.getSeconds() + date.getMilliseconds();
    var createShippingCustomerParams = {
      action: create_shipping_customer_action,
      companyName: CompanyName,
      customerCode: customerCode
    }


    let resp = await testLib.ShippingAndBillingCustomer(createShippingCustomerParams)

    var updateShippingCustomerParams = {
      action: update_shipping_customer_action,
      companyName: CompanyName,
      shipCode: customerCode,
      email: email
    }

    resp = await testLib.ShippingAndBillingCustomer(updateShippingCustomerParams)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log('\n Validated the status code : ' + successCode_200);

    succMessage = data.message;
    var succMsgArray = succMessage.split(" "),
      newShipCode = String(succMsgArray.slice(-1));
    newShipCode = newShipCode.slice(0, -1);
    expect(succMessage).to.have.string(update_shipping_customer_succMsg);
    expect(succMessage).to.have.string('[Ship code: ' + newShipCode + ']');
    console.log("\n Validated the update customer shipping message : " + succMessage);

    tc_title = 'Validated the Success message for Update Shipping customer Api ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Created_BillCode: newShipCode
    }

  }).timeout(200000);

  it('Validate error message for Update Shipping customer Api without customerCode', async () => {

    await testLib.login(username, password);

    var updateShippingCustomerParams = {
      action: update_shipping_customer_action,
      companyName: CompanyName,
      email: email
    }

    let resp = await testLib.ShippingAndBillingCustomer(updateShippingCustomerParams)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log('\n Validated the status code :  ' + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated success message in response");

    expect(missing_empty_cutomer_code_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_empty_cutomer_code_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error message : " + errorCode_400);

    tc_title = 'Validate error message for Update Shipping customer Api without customerCode';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_customerCode_errorMsg: missing_empty_cutomer_code_errorMsg,
      Missing_customerCode_errorCode: errorCode_400
    }

  }).timeout(200000);

  it('Validate the Success message for Update Billing customer Api', async () => {

    await testLib.login(username, password);

    var date = new Date()
    var billCode = 'ABC' + date.getSeconds() + date.getMilliseconds();

    var createBillingCustomerParams = {
      action: create_billing_customer,
      companyName: CompanyName,
      billCode: billCode
    }
    let resp = await testLib.ShippingAndBillingCustomer(createBillingCustomerParams)
    var updateBillingCustomerParams = {
      action: update_billing_customer_action,
      companyName: CompanyName,
      billCode: billCode,
      email: email
    }

    resp = await testLib.ShippingAndBillingCustomer(updateBillingCustomerParams)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log('\n Validated the status code :  ' + successCode_200);

    succMessage = data.message;
    var succMsgArray = succMessage.split(" "),
      newBillCode = String(succMsgArray.slice(-1));
    newBillCode = newBillCode.slice(0, -1);
    expect(succMessage).to.have.string(update_billing_customer_succMsg);
    expect(succMessage).to.have.string('[Bill code: ' + newBillCode + ']');
    console.log("\n Validated the update customer billing message : " + succMessage);

    tc_title = 'Validate Success message for Update Billing customer Api ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Created_BillCode: newBillCode
    }
  }).timeout(200000);

  it('Validate error message for Update Billing customer without billCode', async () => {

    await testLib.login(username, password);

    var updateBillingCustomerParams = {
      action: update_billing_customer_action,
      companyName: CompanyName,
      email: email
    }

    let resp = await testLib.ShippingAndBillingCustomer(updateBillingCustomerParams)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log('\n Validated the status code : ' + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated success message in response");

    expect(missed_empty_bill_code_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_empty_bill_code_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error message : " + errorCode_400);

    tc_title = 'Validate error message for Update Billing customer Api without billCode';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_billCode_errorMsg: missed_empty_bill_code_errorMsg,
      Missing_customerCode_errorCode: errorCode_400
    }
  }).timeout(200000);
})