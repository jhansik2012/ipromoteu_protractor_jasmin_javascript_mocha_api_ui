const { assert } = require('chai')
describe('List Billing, Shipping, affiliate and get Billing, Shipping contacts Api validations .......', () => {

  it('Retrieve all billing contacts information with given customerId', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_billing_Contacts_action,
      customerId: cj_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactId');
    console.log("\n Validated the 'contactId' is displayed.");

    var thiscount = data.thisCount;
    expect((data.result).length).to.equal(thiscount);
    console.log("\n Validated thisCount :  " + thiscount);

    tc_title = 'Retrieved all billing contacts information with given customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      CustomerId: cj_customerId,
      NumberOfContants: thiscount
    };
  }).timeout(200000);

  it('Validate the list-billing-contacts error message with invalid customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_billing_Contacts_action,
      customerId: invalid_data
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_customerId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_customerId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate the list-billing-contacts error message with invalid customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_customerId_errorMsg: invalid_customerId_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the all billing contacts information without action : <action=list-billing-contactss>', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      customerId: cj_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message without <action=get-billing-contacts> filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_customerId_errorMsg: missing_action_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the list-billing-contacts error message with missed customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_billing_Contacts_action
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(misses_customerId_billing_constacts_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + misses_customerId_billing_constacts_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with missed customerId filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_customerId_errorMsg: misses_customerId_billing_constacts_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Retrieve all shipping contacts information with given customerId', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_shipping_Contacts_action,
      customerId: cj_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactId');
    console.log("\n Validated the 'contactId' is displayed.");

    var thiscount = data.thisCount;
    expect((data.result).length).to.equal(thiscount);
    console.log("\n Validated thisCount :  " + thiscount);

    tc_title = 'Retrieved all shipping contacts information with given customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      CustomerId: cj_customerId,
      NumberOfContants: thiscount
    };
  }).timeout(200000);

  it('Validate the list-shipping-contacts error message with invalid customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_shipping_Contacts_action,
      customerId: invalid_data
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_customerId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_customerId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the list-shipping-contacts error message with invalid customerId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_customerId_errorMsg: invalid_customerId_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the all shipping contacts information without action : <action=list-shipping-contacts>', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      customerId: cj_customerId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message without <action=get-shipping-contacts> filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      missing_action_errorMsg: missing_action_errorMsg,
      missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the list-shipping-contacts error message with missed customerId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_shipping_Contacts_action
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(misses_customerId_shipping_constacts_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + misses_customerId_shipping_constacts_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with missed customerId filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_customerId_errorMsg: misses_customerId_shipping_constacts_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Retrieve all contacts information given the affiliateId', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_affiliateId_contacts_action,
      affiliateId: username
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactId');
    console.log("\n Validated the 'contactId' is displayed.");

    var thiscount = data.thisCount;
    expect((data.result).length).to.equal(thiscount);
    console.log("\n Validated thisCount :  " + thiscount);

    tc_title = 'Retrieved all contacts information given the affiliateId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      NumberOfContants: thiscount
    };
  }).timeout(200000);

  it('Validate the error message with invalid affiliateId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_affiliateId_contacts_action,
      affiliateId: invalid_data
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_affiliateId_errorMsg1).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg1);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with invalid affiliateId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_customerId_errorMsg: invalid_affiliateId_errorMsg1,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message with missed action : <list-affiliate-contacts>', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      affiliateId: username
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with missed <action=get-affiliate-contacts> filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the retrieve contant details of list-affiliate-contacts with missed affiliateId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_affiliateId_contacts_action,
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");


    expect(invalid_affiliateId_errorMsg1).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg1);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the retrieve contant details of list-affiliate-contacts with missed affiliateId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_customerId_errorMsg: invalid_affiliateId_errorMsg1,
      invalid_data_errorCode: errorCode_400
    };

  }).timeout(200000);

  it('Retrieve all contacts information given the affiliateId and match', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_affiliateId_contacts_action,
      affiliateId: username,
      match: match_term
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('contactId');
    console.log("\n Validated the 'contactId' is displayed.");

    expect(data.result[0]).to.have.haveOwnProperty('name');
    console.log("\n Validated the 'name' is displayed.");

    var resultLength = (data.result).length,
      i = 0,
      contactsNames = [],
      count = 0,
      thiscount = data.thisCount;
    if (resultLength > 0) {
      for (i = 0; i <= resultLength - 1; i++) {
        var actName = data.result[i].name;
        if (actName.includes(match_term)) {
          contactsNames[count] = actName;
          count++;
        } else {
          console.log("Unmatched contacts are displayed.");
          expect(fail());
        }
      }
    }

    expect(contactsNames.length).to.equal(thiscount);
    console.log("\n Validated the contactsNames :  " + thiscount);

    tc_title = 'Retrieved all contacts information given the affiliateId and match.';
    values = {
      Affiliate_user: username,
      ContactName_Match: match_term,
      statusCode: successCode_200,
      NumberOfContants: thiscount
    };
  }).timeout(200000);

  it('Validate the result with invalid match', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_affiliateId_contacts_action,
      affiliateId: username,
      match: invalid_data
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(0).to.equal((data.result).length);
    console.log("\n Validated the result length : 0.");

    thiscount = data.thisCount;
    expect(0).to.equal(thiscount);
    console.log("\nValidated the thisCount : 0 ");

    tc_title = 'Validated the result with invalid match.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Invalid_Mache: invalid_data,
      Result: 0,
      ThisCount: thiscount
    };
  }).timeout(200000);

  it('Validate the error message with the other valid subsecquent affiliateId.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.contacts({
      action: list_affiliateId_contacts_action,
      affiliateId: other_affiliate
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_affiliateId_errorMsg1).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg1);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with the other valid subsecquent affiliateId.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_affiliateId_errorMsg: invalid_affiliateId_errorMsg1,
      Invalid_affiliatedId_errorCode: errorCode_400
    };
  }).timeout(200000);


  // it('Fetch the all (or filter) the contactLists of the affiliate or sale_rep', async () => {

  //   await testLib.login(username, password);

  //   let resp = await testLib.contacts({
  //     action: get_contact_lists_action
  //   });
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(respInJson).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   expect(data.result[0]).to.have.haveOwnProperty('contactId');
  //   console.log("\n Validated the 'contactId' is displayed.");

  //   var thiscount = data.thisCount;
  //   expect((data.result).length).to.equal(thiscount);
  //   console.log("\n Validated thisCount :  " + thiscount);

  //   tc_title = 'Fetch the all (or filter) the contactLists of the affiliate or sale_rep';
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     CustomerId: cj_customerId,
  //     NumberOfContants: thiscount
  //   };
  // }).timeout(200000);
  //------------------------------Add new contact---------------------------//

  it('Validate the Success message for "Add new contact" Api.', async () => {

    await testLib.login(username, password);

    var addNewcontact =
    {
      action: add_contact_action,
      contact: {
        name: newName
      }
    }
    let resp = await testLib.postcontacts(addNewcontact)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('newContactId');
    console.log("\n Validated the 'newcontactId' is ndisplayed.");

    newContactId = data.newContactId;
    if (newContactId.length > 0)
      console.log("\n Validated the 'new contact id: " + newContactId);
    else
      assert.fail("New contact Id is empty: " + newContactId);

    tc_title = 'Validate the Success message for "Add new contact" Api.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      newContactId: newContactId
    };
  }).timeout(200000);

  it('Validate the Error message for "Add new contact" Api without contact name', async () => {

    await testLib.login(username, password);

    var addNewcontact =
    {
      action: add_contact_action
    }

    let resp = await testLib.postcontacts(addNewcontact);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorMessage).to.equal(missing_contact_name_errorMsg);
    console.log("\n Validated the 'error message' displayed.");

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code :  " + errorCode_400);

    tc_title = 'Validate the Error message for "Add new contact" Api. without contact name';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);
  //---------------------------------Update contact----------------------------------------//

  it('Validate the Success message for "Update contact" Api.', async () => {

    await testLib.login(username, password);

    var addNewcontact =
    {
      action: add_contact_action,
      contact: {
        name: newName
      }
    }

    let contactReponse = await testLib.postcontacts(addNewcontact),
      contactReponseJson = testLib.jsonparse(contactReponse),
      contactData = testLib.jsonparse(contactReponseJson.data);
    newContactId = contactData.newContactId;

    var update_contact = {
      action: update_contact_action,
      contact: {
        id: newContactId,
        name: updatedName
      }
    }
    let resp = await testLib.postcontacts(update_contact)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    succMessage= data.message;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('message');
    console.log("\n Validated the 'message' is displayed.");

    tc_title = 'Validate the Success message for "Update contact" Api.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      contactId: newContactId,
      SuccMessage: succMessage
    };
  }).timeout(200000);

  it('Validate the Error message for "Update contact" Api without contact number', async () => {

    await testLib.login(username, password);

    let resp = await testLib.postcontacts({
      action: update_contact_action
    })

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(errorMessage).to.equal(missing_contact_id_errorMsg);
    console.log("\n Validated the 'error message' displayed."+missing_contact_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code :  " + errorCode_400);

    tc_title = 'Validate the Error message for "Update contact" Api without contact id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);
  //---------------------------------Delete contact----------------------------------------//

  it('Validate the Success message for "Delete contact" Api.', async () => {

    await testLib.login(username, password);

    var addNewcontact =
    {
      action: add_contact_action,
      linkTo: linkTo,
      linkCode: linkCode,
      contact: {
        name: newName
      }
    }
    let contactReponse = await testLib.postcontacts(addNewcontact),
      contactReponseJson = testLib.jsonparse(contactReponse),
      contactData = testLib.jsonparse(contactReponseJson.data);
    newContactId = contactData.newContactId;

    var delete_contact =
    {
      action: delete_contact_action,
      contactId: newContactId,
      linkTo: linkTo,
      linkCode: linkCode
    }
    let resp = await testLib.postcontacts(delete_contact)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    // expect(data).to.have.haveOwnProperty('message');
    // console.log("\n Validated the 'message' is displayed.");

    tc_title = 'Validate the Success message for "Delete contact" Api.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      contactId: newContactId
    };
  }).timeout(200000);

  it('Validate the Error message for "Delete contact" Api without contact number', async () => {

    await testLib.login(username, password);

    var delete_contact =
    {
      action: delete_contact_action,
      linkTo: linkTo,
      linkCode: linkCode
    }
    let resp = await testLib.postcontacts(delete_contact)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error;

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorMessage).to.equal(missingContactId_errorMsg);
    console.log("\n Validated the 'error message' displayed.");

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code :  " + errorCode_400);

    tc_title = 'Validate the Error message for "Delete contact" Api without contact id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);

  //---------------------------------Set as default contact--------------------------------//

  it('Validate the Success message for "Set as default contact" Api.', async () => {

    await testLib.login(username, password);

    var addNewcontact =
    {
      action: add_contact_action,
      linkTo: linkTo,
      linkCode: linkCode,
      contact: {
        name: newName
      }
    }
    let contactReponse = await testLib.postcontacts(addNewcontact),
      contactReponseJson = testLib.jsonparse(contactReponse),
      contactData = testLib.jsonparse(contactReponseJson.data);
    newContactId = contactData.newContactId;

    var set_as_default_contact =
    {
      action: set_as_default_contact_action,
      contactId: newContactId,
      linkTo: linkTo,
      linkCode: linkCode
    }
    let resp = await testLib.postcontacts(set_as_default_contact)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    // expect(data).to.have.haveOwnProperty('message');
    // console.log("\n Validated the 'message' is displayed.");

    tc_title = 'Validate the Success message for "set as default contact" Api.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      contactId:newContactId
    };
  }).timeout(200000);

  it('Validate the Error message for "Set as default contact" Api without contact number', async () => {

    await testLib.login(username, password);

    var set_as_default_contact =
    {
      action: set_as_default_contact_action,
      linkTo: linkTo,
      linkCode: linkCode
    }
    let resp = await testLib.postcontacts(set_as_default_contact)
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage= data.error

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is  displayed.");

    expect(data.error).to.equal(inavalidInputParameter_errorMsg);
    console.log("\n Validated the 'error message' displayed."+inavalidInputParameter_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code :  " + errorCode_400);

    tc_title = 'Validate the Error message for "Set as default contact" Api without contact id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);
});