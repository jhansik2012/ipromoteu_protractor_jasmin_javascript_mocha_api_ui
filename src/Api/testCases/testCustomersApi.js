describe('List Billing, Shipping and get Billing, Shipping Customers Api validations .......', () => {

  it('List billing customer details', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: lbCustomers_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    result = data.result;
    thiscount = data.thisCount;
    expect(result.length).to.equal(thiscount);
    console.log("\n Validated thisCount :  " + thiscount);

    expect(result[0]).to.have.haveOwnProperty('customerId');

    tc_title = 'Listed billing customer details.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalCountOfCustomers: thiscount
    };
  }).timeout(200000);

  it('Validate error message with the missed action : <list-billing-customers>', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({

    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with the missed action <list-billing-customers> filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('List Shipping customer details', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: lsCustomers_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    result = data.result;
    thiscount = data.thisCount;
    expect(result.length).to.equal(thiscount);
    console.log("\n Validated thisCount :  " + thiscount);

    expect(result[0]).to.have.haveOwnProperty('customerId');

    tc_title = 'Listed shipping customer details.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalCountOfCustomers: thiscount
    };
  }).timeout(200000);

  it('Validate error message with the missed action : <action=list-shipping-customers>', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({});
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with missed action filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Get all shipping customer information with the given shipping customerId', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: gsCustomers_action,
      customerId: cj_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    result = data.result;
    expect(cj_customerId).to.equal(result.customerId);
    console.log("\n Validated the customerId :  " + cj_customerId);

    expect(username).to.equal(result.affiliateId);
    console.log("\n Validated the affiliateId :  " + username);

    tc_title = 'Retrieved all shipping customer information with given the shipping customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      CustomerId: cj_customerId
    };
  }).timeout(200000);

  it('Validate the get-shipping-customer error message with invalid customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: gsCustomers_action,
      customerId: invalid_data
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_customerId_2_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_customerId_2_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate the get-shipping-customer error message with invalid customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_customerId_errorMsg: invalid_customerId_2_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message with the missed action : <action=get-shipping-customers>', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      customerId: cj_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message without <action=get-shipping-customers> filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the the error message with the missed customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: gsCustomers_action
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(misses_get_customer_shipping_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + misses_get_customer_shipping_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with the missed customerId filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Misses_get_customer_shipping_errorMsg: misses_get_customer_shipping_errorMsg,
      misses_get_customer_shipping_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Get all billing customer information with the given billing customerId', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: gbCustomers_action,
      customerId: cj_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    result = data.result;
    expect(cj_customerId).to.equal(result.customerId);
    console.log("\n Validated the customerId :  " + cj_customerId);

    expect(username).to.equal(result.affiliateId);
    console.log("\n Validated the affiliateId :  " + username);

    tc_title = 'Retrieved all billing customer information with given the billing customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      CustomerId: cj_customerId
    };
  }).timeout(200000);

  it('Validate the get-billing-customer error message with invalid customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: gbCustomers_action,
      customerId: invalid_data
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_customerId_2_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_customerId_2_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate the get-billing-customer error message with invalid customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_customerId_errorMsg: invalid_customerId_2_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the  error message with the missed action : <get-billing-customer>', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      customerId: cj_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with the missed <get-billing-customer> filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the get-billing-customer error message with missing customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: gbCustomers_action
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(misses_get_customer_billing_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + misses_get_customer_billing_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message without customerId filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      misses_get_customer_billing_errorMsg: misses_get_customer_billing_errorMsg,
      misses_get_customer_billing_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Retrieve the customer-shipping-detail of the given shipping customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: get_shipping_customer_details_action,
      customerId: shipping_billing_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result = testLib.jsonparse(data.result);
    var billingCustomers = result.billingCustomers[0];

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('result');
    console.log("\n Validated the 'result' is displayed in customer-info section.");  

    expect(result).to.have.haveOwnProperty('fax');
    console.log("\n Validated the 'fax' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('city');
    console.log("\n Validated the 'city' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('email');
    console.log("\n Validated the 'email' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('phone');
    console.log("\n Validated the 'phone' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('state');
    console.log("\n Validated the 'state' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('carrier');
    console.log("\n Validated the 'carrier' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('taxCode');
    console.log("\n Validated the 'taxCode' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('zipCode');
    console.log("\n Validated the 'zipCode' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('billCode');
    console.log("\n Validated the 'billCode' is displayed in customer-info section.");

    expect(shipping_billing_customerId).to.equal(result.billCode);
    console.log("\n Validated the value of 'billCode' : " + shipping_billing_customerId);

    expect(result).to.have.haveOwnProperty('contacts');
    console.log("\n Validated the 'contacts' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('phoneExt');
    console.log("\n Validated the 'phoneExt' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('shipCode');
    console.log("\n Validated the 'shipCode' is displayed in customer-info section.");

    expect(shipping_billing_customerId).to.equal(result.shipCode);
    console.log("\n Validated the value of 'shipCode' : " + shipping_billing_customerId);

    expect(result).to.have.haveOwnProperty('documents');
    console.log("\n Validated the 'documents' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('taxExempt');
    console.log("\n Validated the 'taxExempt' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('masterCode');
    console.log("\n Validated the 'masterCode' is displayed in customer-info section.");

    expect(shipping_billing_customerId).to.equal(result.masterCode);
    console.log("\n Validated the value of 'masterCode' : " + shipping_billing_customerId);

    expect(result).to.have.haveOwnProperty('openOrders');
    console.log("\n Validated the 'openOrders' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('companyName');
    console.log("\n Validated the 'companyName' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('countryCode');
    console.log("\n Validated the 'countryCode' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('receivables');
    console.log("\n Validated the 'receivables' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('LTMOrdVolume');
    console.log("\n Validated the 'LTMOrdVolume' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('addressLine1');
    console.log("\n Validated the 'addressLine1' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('addressLine2');
    console.log("\n Validated the 'addressLine2' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('addressLine3');
    console.log("\n Validated the 'addressLine3' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('carrierAccout');
    console.log("\n Validated the 'carrierAccout' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('classification');
    console.log("\n Validated the 'classification' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('verticalMarket');
    console.log("\n Validated the 'verticalMarket' is displayed in customer-info section.");

    expect(billingCustomers).to.have.haveOwnProperty('zip');
    console.log("\n Validated the 'zip' is displayed in Customer Shipping Details section.");

    expect(billingCustomers).to.have.haveOwnProperty('city');
    console.log("\n Validated the 'city' is displayed in Customer Shipping Details section.");

    expect(billingCustomers).to.have.haveOwnProperty('state');
    console.log("\n Validated the 'state' is displayed in Customer Shipping Details section.");

    expect(billingCustomers).to.have.haveOwnProperty('terms');
    console.log("\n Validated the 'terms' is displayed in Customer Shipping Details section.");

    expect(billingCustomers).to.have.haveOwnProperty('lockBox');
    console.log("\n Validated the 'lockBox' is displayed in Customer Shipping Details section.");

    expect(billingCustomers).to.have.haveOwnProperty('billCode');
    console.log("\n Validated the 'billCode' is displayed in Customer Shipping Details section.");

    expect(shipping_billing_customerId).to.equal(result.billCode);
    console.log("\n Validated the value of 'billCode' : " + shipping_billing_customerId);

    expect(billingCustomers).to.have.haveOwnProperty('companyName');
    console.log("\n Validated the 'companyName' is displayed in Customer Shipping Details section.");

    expect(billingCustomers).to.have.haveOwnProperty('addressLine1');
    console.log("\n Validated the 'addressLine1' is displayed in Customer Shipping Details section.");

    expect(billingCustomers).to.have.haveOwnProperty('addressLine2');
    console.log("\n Validated the 'addressLine2' is displayed in Customer Shipping Details section.");

    expect(billingCustomers).to.have.haveOwnProperty('addressLine3');
    console.log("\n Validated the 'addressLine3' is displayed in Customer Shipping Details section.");

    expect(billingCustomers).to.have.haveOwnProperty('paperBilling');
    console.log("\n Validated the 'paperBilling' is displayed in Customer Shipping Details section.");

    expect(result).to.have.haveOwnProperty('noCargoInsurance');
    console.log("\n Validated the 'noCargoInsurance' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('cargoInsuranceCostOnly');
    console.log("\n Validated the 'cargoInsuranceCostOnly' is displayed in customer-info section.");

    tc_title = 'Retrieved the customer-shipping-detail of the given shipping customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      CustomerId: shipping_billing_customerId
    };
  }).timeout(200000);

  it('Validate the error message with invalid customerId of customer-shipping-details.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: get_shipping_customer_details_action,
      customerId: invalid_data
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(invalid_customerId_2_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : "+invalid_customerId_2_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error message : "+errorCode_400);

    tc_title = 'Validated the error message with invalid customerId of customer-shipping-details.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_CustomerId: invalid_data,
      error_message: invalid_customerId_2_errorMsg,
      error_code: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message with empty customerId of customer-shipping-details.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: get_shipping_customer_details_action,
      customerId: ''
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(missing_customer_shipping_customerId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : "+missing_customer_shipping_customerId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error message : "+errorCode_400);

    tc_title = 'Validated the error message with empty customerId of customer-shipping-details.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_CustomerId: invalid_data,
      error_message: missing_customer_shipping_customerId_errorMsg,
      error_code: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message with missed action field of customer-shipping-detail.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      customerId: shipping_billing_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with missed action field of customer-shipping-detail.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message with missed customerId field of customer-shipping-detail.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: get_shipping_customer_details_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_customer_shipping_customerId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_customer_shipping_customerId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with missed customerId field of customer-shipping-detail.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_customerId_errorMsg: missing_customer_shipping_customerId_errorMsg,
      Missing_customerId_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Retrieve the customer-billing-detail  of the given shipping customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: get_billing_customer_details_action,
      customerId: shipping_billing_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result = testLib.jsonparse(data.result);
    var shippingCustomers = result.shippingCustomers[0];

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('result');
    console.log("\n Validated the 'result' is displayed in customer-info section.");  

    expect(result).to.have.haveOwnProperty('fax');
    console.log("\n Validated the 'fax' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('city');
    console.log("\n Validated the 'city' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('email');
    console.log("\n Validated the 'email' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('phone');
    console.log("\n Validated the 'phone' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('state');
    console.log("\n Validated the 'state' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('terms');
    console.log("\n Validated the 'terms' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('ccEmail');
    console.log("\n Validated the 'ccEmail' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('lockBox');
    console.log("\n Validated the 'lockBox' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('zipCode');
    console.log("\n Validated the 'zipCode' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('billCode');
    console.log("\n Validated the 'billCode' is displayed in customer-info section.");

    expect(shipping_billing_customerId).to.equal(result.billCode);
    console.log("\n Validated the value of 'billCode' : " + shipping_billing_customerId);

    expect(result).to.have.haveOwnProperty('contacts');
    console.log("\n Validated the 'contacts' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('phoneExt');
    console.log("\n Validated the 'phoneExt' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('documents');
    console.log("\n Validated the 'documents' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('taxExempt');
    console.log("\n Validated the 'taxExempt' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('openOrders');
    console.log("\n Validated the 'openOrders' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('companyName');
    console.log("\n Validated the 'companyName' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('countryCode');
    console.log("\n Validated the 'countryCode' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('creditCards');
    console.log("\n Validated the 'creditCards' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('lockBoxDesc');
    console.log("\n Validated the 'lockBoxDesc' is displayed in customer-info section.");     

    expect(result).to.have.haveOwnProperty('receivables');
    console.log("\n Validated the 'receivables' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('LTMOrdVolume');
    console.log("\n Validated the 'LTMOrdVolume' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('addressLine1');
    console.log("\n Validated the 'addressLine1' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('addressLine2');
    console.log("\n Validated the 'addressLine2' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('addressLine3');
    console.log("\n Validated the 'addressLine3' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('paperBilling');
    console.log("\n Validated the 'paperBilling' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('bankTransfers');
    console.log("\n Validated the 'bankTransfers' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('customerSince');
    console.log("\n Validated the 'customerSince' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('noCreditCards');
    console.log("\n Validated the 'noCreditCards' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('emailInvoiceTo');
    console.log("\n Validated the 'emailInvoiceTo' is displayed in customer-info section.");

    expect(result).to.have.haveOwnProperty('taxExemptNumber');
    console.log("\n Validated the 'taxExemptNumber' is displayed in customer-info section.");

  

    expect(shippingCustomers).to.have.haveOwnProperty('zip');
    console.log("\n Validated the 'zip' is displayed in Customer Shipping Details section.");

    expect(shippingCustomers).to.have.haveOwnProperty('city');
    console.log("\n Validated the 'city' is displayed in Customer Shipping Details section.");

    expect(shippingCustomers).to.have.haveOwnProperty('state');
    console.log("\n Validated the 'state' is displayed in Customer Shipping Details section.");

    expect(shippingCustomers).to.have.haveOwnProperty('shipCode');
    console.log("\n Validated the 'shipCode' is displayed in Customer Shipping Details section.");

    expect(shipping_billing_customerId).to.equal(shippingCustomers.shipCode);
    console.log("\n Validated the value of 'shipCode' : " + shipping_billing_customerId);

    expect(shippingCustomers).to.have.haveOwnProperty('companyName');
    console.log("\n Validated the 'companyName' is displayed in Customer Shipping Details section.");

    expect(shippingCustomers).to.have.haveOwnProperty('addressLine1');
    console.log("\n Validated the 'addressLine1' is displayed in Customer Shipping Details section.");

    expect(shippingCustomers).to.have.haveOwnProperty('addressLine2');
    console.log("\n Validated the 'addressLine2' is displayed in Customer Shipping Details section.");

    expect(shippingCustomers).to.have.haveOwnProperty('addressLine3');
    console.log("\n Validated the 'addressLine3' is displayed in Customer Shipping Details section.");

    tc_title = 'Retrieved the customer-billing-detail of the given shipping customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      CustomerId: shipping_billing_customerId
    };
  }).timeout(200000);

  it('Validate the error message with invalid customerId of customer-billing-details.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: get_billing_customer_details_action,
      customerId: invalid_data
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(invalid_customerId_2_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : "+invalid_customerId_2_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error message : "+errorCode_400);

    tc_title = 'Validated the error message with invalid customerId of customer-billing-details.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_CustomerId: invalid_data,
      error_message: invalid_customerId_2_errorMsg,
      error_code: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message with empty customerId of customer-billing-details.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: get_billing_customer_details_action,
      customerId: ''
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(missing_customer_billing_customerId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : "+missing_customer_billing_customerId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error message : "+errorCode_400);

    tc_title = 'Validated the error message with empty customerId of customer-billing-details.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_CustomerId: invalid_data,
      error_message: missing_customer_billing_customerId_errorMsg,
      error_code: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message with missed action field of customer-billing-detail.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      customerId: shipping_billing_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with missed action field of customer-billing-detail.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message with missed customerId field of customer-billing-detail.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.customers({
      action: get_billing_customer_details_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : "+successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_customer_billing_customerId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_customer_billing_customerId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with missed customerId field of customer-billing-detail.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_customerId_errorMsg: missing_customer_billing_customerId_errorMsg,
      Missing_customerId_errorCode: errorCode_400
    };
  }).timeout(200000);

});