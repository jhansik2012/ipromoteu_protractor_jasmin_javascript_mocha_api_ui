 const {assert}=require('chai')
describe('Add, Update Quote fees and , Guest Accept presentation quote Apis validations .......', () => {

  it("Validate Success message for 'Add Quote fees' Api", async () => {

    await testLib.login(username, password);
    
    var addQuoteFees= {
       action: add_quotes_fees_action,
       preso_id: preso_id,
       cost: '3.00',
       price: '5.00',
       qty: 100
      }

    let resp = await testLib.quoteFees(addQuoteFees);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    preso_item_id=data.preso_item_id;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('preso_item_id');
    console.log("\n Validated the 'preso item id' is displayed.");
    
    if(preso_item_id.length<0)
    	assert.fail("Preso item id is empty")
    console.log('\n Validated the preso_item_id : '+preso_item_id);

    tc_title = 'Validate Success message for "Add Quote fees" Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      presoItemId: preso_item_id
    };
  }).timeout(200000);

  it('Validate Error message for "Add Quote fees" Api without preso id', async () => {

    await testLib.login(username, password);
    
    var addQuoteFees= {
       action: add_quotes_fees_action,
       cost: '3.00',
       price: '5.00',
       qty: 100
      }

    let resp = await testLib.quoteFees(addQuoteFees);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage= testLib.jsonparse(data.error);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorMessage).to.equal(missing_preso_id_errorMsg);
    console.log('\n Validated the error message : '+errorMessage);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message for "Add Quote fees" Api without preso id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);

   it('Validate Success message for "Update Quote fees" Api', async () => {

    await testLib.login(username, password);
    
    var addQuoteFees= {
       action: add_quotes_fees_action,
       preso_id: preso_id,
       cost: '3.00',
       price: '5.00',
       qty: 100
      }

    let presoResp = await testLib.quoteFees(addQuoteFees),
    presoRespInJson = testLib.jsonparse(presoResp),
    presodata = testLib.jsonparse(presoRespInJson.data);
    preso_item_id=presodata.preso_item_id;

    var update_quote={
       action: update_quotes_fees_action,
       preso_item_id: preso_item_id,
       cost: '4.00',
       price: '6.00',
       qty: 200
    }

   let resp = await testLib.quoteFees(update_quote);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    tc_title = 'Validate Success message for "Update Quote fees" Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
    };
  }).timeout(200000);

it('Validate Error message for "Update Quote fees" Api without preso item id', async () => {

    await testLib.login(username, password);

    var update_quote={
       action: update_quotes_fees_action,
       cost: '4.00',
       price: '6.00',
       qty: 200
    }

   let resp = await testLib.quoteFees(update_quote);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error;
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorMessage).to.equal('presItemID is empty.');
    console.log("\n Validated the error message: "+errorMessage);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);
    
    tc_title = 'Validate Error message for "Update Quote fees" Api without preso item id';
     values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };

  }).timeout(200000);

it('Validate Success message for "Guest accept presntation quote " Api', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020',
      preso_type: 'quote'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params),
    presoRespInJson = testLib.jsonparse(create_presentation_resp),
    presoData = testLib.jsonparse(presoRespInJson.data);
   var  createdPresentationId = presoData.preso_id

    let PresoListresp = await testLib.listPresentationList({
      action: listPresentations_action,
      preso_id: createdPresentationId
    });

    presoRespInJson = testLib.jsonparse(PresoListresp)
    presoData = testLib.jsonparse(presoRespInJson.data);
    result= testLib.jsonparse(presoData.result);
    var preso = testLib.jsonparse(result.presos),
    preso_uuid= preso[0].preso_uuid

    console.log(preso_uuid)

    var guestAcceptPresentationQuote= {
     action: guestAcceptsPresentationQuote_action,
     preso_uuid: preso_uuid,
     preso_id: createdPresentationId,
     is_accepted: 1         
     }

    let resp = await testLib.guestPresentations(guestAcceptPresentationQuote);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

   
    tc_title = 'Validate Success message for "Guest accept presntation quote " Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdPresentationId: createdPresentationId,
      preso_uuid: preso_uuid
    };

  }).timeout(200000);


it('Validate Error message for "Guest accept presntation quote " Api without preso id', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020',
      preso_type: 'quote'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params),
    presoRespInJson = testLib.jsonparse(create_presentation_resp),
    presoData = testLib.jsonparse(presoRespInJson.data);
   var  createdPresentationId = presoData.preso_id

    let PresoListresp = await testLib.listPresentationList({
      action: listPresentations_action,
      preso_id: createdPresentationId
    });

    presoRespInJson = testLib.jsonparse(PresoListresp)
    presoData = testLib.jsonparse(presoRespInJson.data);
    result= testLib.jsonparse(presoData.result);
    var preso = testLib.jsonparse(result.presos),
    preso_uuid= preso[0].preso_uuid

    var guestAcceptPresentationQuote= {
     action: guestAcceptsPresentationQuote_action,
     preso_uuid: preso_uuid,
     is_accepted: 1         
     }

    let resp = await testLib.guestPresentations(guestAcceptPresentationQuote);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage= testLib.jsonparse(data.error)

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");
    
    expect(data.error).to.equal(preso_id_empty_errorMsg);
    console.log("\n Validated the error message displayed: "+preso_id_empty_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the errorCode code : " + errorCode_400); 

    tc_title = 'Validate Error message for "Guest accept presntation quote " Api without preso id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: preso_id_empty_errorMsg
    };

  }).timeout(200000);

})