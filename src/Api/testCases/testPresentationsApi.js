const { assert } = require("chai");


describe('Presentations Apis validations .......', () => {

  it('Validate the success message of Create Presentation with affiliate user.', async () => {

    await testLib.login(username, password);

    var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params);
    respInJson = testLib.jsonparse(create_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('preso_id');
    console.log("\n Validated 'preso_id' field is displayed.");

    succMessage = data.message;
    var createdPresentationId = succMessage.split(" ")[2];

    expect(succMessage).to.have.string('New presentation ');
    expect(succMessage).to.have.string(' created successfully');
    expect(createdPresentationId.slice(0, 1)).to.have.string('P');
    expect(createdPresentationId.slice(-3)).to.have.string(testConfig.testerUsername);
    console.log("\n Validated created presentation message : " + succMessage);

    expect(createdPresentationId).to.equal(data.preso_id);
    console.log("\n Validated the created presentation id : " + createdPresentationId);

    tc_title = 'Validated the success message of Create Presentation with affiliate user.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Presentation_id: createdPresentationId,
      succMessage: succMessage
    };

  }).timeout(200000);

  it('Validate the error message of Create Presentation with IPU-Admin user and missed affiliateId field.', async () => {

    await testLib.login(adminUsername, password);

    var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params);
    respInJson = testLib.jsonparse(create_presentation_resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error;
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_affiliateId_to_create_presentation_errorMsg).to.equal(errorMessage);
    console.log("\n Validated the error message : " + missed_affiliateId_to_create_presentation_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message of Create Presentation with IPU-Admin user and missed affiliateId field.';
    values = {
      Affiliate_user: adminUsername,
      statusCode: successCode_200,
      Missed_affiliateId_errorMsg: missed_affiliateId_to_create_presentation_errorMsg,
      Missed_affiliateId_errorCode: errorCode_400
    };

  }).timeout(200000);

  it('Validate the success message of Edit Presentation with affiliate user.', async () => {

    await testLib.login(username, password);

    var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params);
    respInJson = testLib.jsonparse(create_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    succMessage = data.message;
    var createdPresentationId = succMessage.split(" ")[2];

    var edit_presentation_params = {
      action: edit_presentation_action,
      preso_id: createdPresentationId,
      titles: 'Updated-Customer campaign - Aug 2020'
    }

    let edit_presentation_resp = await testLib.presentations(edit_presentation_params);
    respInJson = testLib.jsonparse(edit_presentation_resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.message;
    let warningMessage= data.warning

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(edit_presentation_succMsg).to.equal(errorMessage);
    console.log("\n Validated the success message : " + edit_presentation_succMsg);

    expect(presentation_title_warningMsg).to.equal(data.warning);
    console.log("\n Validated the warning : " + presentation_title_warningMsg);


    tc_title = 'Validated the success message of Edit Presentation with affiliate user.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage,
      warningMessage: warningMessage
    };
  }).timeout(200000);

  it('Validate the error message of Edit Presentation with affiliate user and missed preso_id field.', async () => {

    await testLib.login(username, password);

    var edit_presentation_params = {
      action: edit_presentation_action,
      titles: 'Customer campaign - Aug 2020 - 1'
    }

    let edit_presentation_resp = await testLib.presentations(edit_presentation_params);
    respInJson = testLib.jsonparse(edit_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_preso_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_preso_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message of Edit Presentation with affiliate user and missed preso_id field.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missed_preso_id_errorMsg: missed_preso_id_errorMsg,
      Missed_preso_id_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the success message of Delete Presentation Item with affiliate user.', async () => {

    await testLib.login(username, password);

    var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params);
    respInJson = testLib.jsonparse(create_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    succMessage = data.message;
    var createdPresentationId = succMessage.split(" ")[2];

    var addQuoteFees= {
      action: add_quotes_fees_action,
      preso_id: createdPresentationId,
      cost: '3.00',
      price: '5.00',
      qty: 100
     }

   let addQuoteFees_resp = await testLib.quoteFees(addQuoteFees);
   respInJson = testLib.jsonparse(addQuoteFees_resp);
   data = testLib.jsonparse(respInJson.data);
   var preso_itemId = data.preso_item_id;

    var delete_presentation_params = {
      action: delete_presentation_item_action,
      preso_item_id: preso_itemId
    }

    let delete_presentation_resp = await testLib.presentations(delete_presentation_params);
    respInJson = testLib.jsonparse(delete_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(delete_presentation_item_succMsg).to.equal(data.message);
    console.log("\n Validated the message : "+delete_presentation_item_succMsg);

    tc_title = 'Validated the success message of Delete Presentation Item with affiliate user.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      SuccessMessage: delete_presentation_item_succMsg,
      Deleted_preso_item_id: preso_itemId
    };

  }).timeout(200000);

  it('Validate the error message of Delete Presentation Item with affiliate user and missed preso_item_id field.', async () => {

    await testLib.login(adminUsername, password);

    var delete_presentation_params = {
      action: delete_presentation_item_action
    }

    let delete_presentation_resp = await testLib.presentations(delete_presentation_params);
    respInJson = testLib.jsonparse(delete_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_preso_id_delete_presentation_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_preso_id_delete_presentation_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message of Delete Presentation Item with affiliate user and missed preso_item_id field.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missed_affiliateId_errorMsg: missed_preso_id_delete_presentation_errorMsg,
      Missed_affiliateId_errorCode: errorCode_400
    };

  }).timeout(200000);

  it("Validate the success message of 'Add Presentation Favourite Product' with affiliate user.", async () => {

    await testLib.login(username, password);

    let jobIdResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    var lineItems_length = (data.result.lineItems).length - 1,
      exp_source = data.result.lineItems[lineItems_length].source,
      exp_Asi_product_id = data.result.lineItems[lineItems_length].asi_product_id,
      exp_sage_product_id = data.result.lineItems[lineItems_length].sage_product_id;

    var add_preso_fav_product_params = {
      action: add_preso_fav_product_action,
      source: exp_source,
      asi_product_id: exp_Asi_product_id,
      sage_product_id: exp_sage_product_id
    }

    let add_preso_fav_product_resp = await testLib.presentations(add_preso_fav_product_params);
    respInJson = testLib.jsonparse(add_preso_fav_product_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('fav_item_id');
    console.log("\n Validated 'fav_item_id' field is displayed.");

    var favItemId = data.fav_item_id;

    tc_title = "Validated the success message of 'Add Presentation Favourite Product' with affiliate user.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Added_fav_item_id: favItemId
    };

  }).timeout(200000);

  it("Validate the error message of 'Add Presentation Favourite Product' with affiliate user and missed product_id field.", async () => {

    await testLib.login(username, password);

    var add_preso_fav_product_invalid_asi_prod_id_params = {
      action: add_preso_fav_product_action
    }

    let add_preso_fav_product_resp = await testLib.presentations(add_preso_fav_product_invalid_asi_prod_id_params);
    respInJson = testLib.jsonparse(add_preso_fav_product_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_product_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_product_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message of 'Add Presentation Favourite Product' with affiliate user and missed product_id field.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missed_product_id_errorMsg: missed_product_id_errorMsg,
      Missed_product_id_errorCode: errorCode_400
    };

  }).timeout(200000);

  it("Validate the success message of 'Remove Presentation Favourite Product' with affiliate user.", async () => {

    await testLib.login(username, password);

    let jobIdResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    var lineItems_length = (data.result.lineItems).length - 1,
      exp_Asi_product_id = data.result.lineItems[lineItems_length].asi_product_id;

    var add_preso_fav_product_params = {
      action: add_preso_fav_product_action,
      asi_product_id: exp_Asi_product_id
    }

    let add_preso_fav_product_resp = await testLib.presentations(add_preso_fav_product_params);
    respInJson = testLib.jsonparse(add_preso_fav_product_resp);
    data = testLib.jsonparse(respInJson.data);

    var favItemId = data.fav_item_id;

    var remove_preso_fav_product_params = {
      action: remove_preso_fav_product_action,
      fav_item_id: favItemId,
    }

    let remove_preso_fav_product_resp = await testLib.presentations(remove_preso_fav_product_params);
    respInJson = testLib.jsonparse(remove_preso_fav_product_resp);
    data = testLib.jsonparse(respInJson.data);

    tc_title = "Validated the success message of 'Remove Presentation Favourite Product' with affiliate user.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Removed_fav_item_id: favItemId
    };

  }).timeout(200000);

  it("Validate the error message of 'Remove Presentation Favourite Product' with affiliate user and missed product_id field.", async () => {

    await testLib.login(username, password);

    var remove_preso_fav_product_params = {
      action: remove_preso_fav_product_action
    }

    let remove_preso_fav_product_resp = await testLib.presentations(remove_preso_fav_product_params);
    respInJson = testLib.jsonparse(remove_preso_fav_product_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_fav_item_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_fav_item_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message of 'Remove Presentation Favourite Product' with affiliate user and missed product_id field.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missed_fav_item_id_errorMsg: missed_fav_item_id_errorMsg,
      Missed_fav_item_id_errorCode: errorCode_400
    };

  }).timeout(200000);

//--------------------------List Presentations-----------------------------//

  it('Retrieve the list of Presentations ', async () => {

    await testLib.login(username, password);

    let resp = await testLib.listPresentationList({
      action: listPresentations_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    var result = testLib.jsonparse(data.result),
      presentationsList = testLib.jsonparse(result.presos),
      presosLength = presentationsList.length;
 
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");
    
    if (presosLength > 0) {

    expect(presentationsList[0]).to.have.haveOwnProperty('preso_id');
    console.log("\n Validated the 'preso_id' is displayed.");

    expect(presentationsList[0]).to.have.haveOwnProperty('preso_uuid');
    console.log("\n Validated the 'preso_uuid' is displayed.");

    expect(presentationsList[0]).to.have.haveOwnProperty('affiliateId');
    console.log("\n Validated the 'affiliateId' is displayed.");

    expect(presosLength).to.equal(data.thisCount);
    console.log("\n Validated the 'thisCount' is eqaul to presentations.");

      var i=0,
      affiliate=null,
      flag=false

   for( i; i<presosLength;i++)
     {
      flag=true;
      affiliate = await (presentationsList[i].affiliateId);    
      if(affiliate!==username)
        assert.fail('\n Validated affiliateId: '+affiliate+' is different from logged Affiliate user: '+username)     
     }
   if(flag)    
    console.log("\n Validated Affliate id of All presentations with logged username ")
   }  

 else 
   console.log("\n Recieved empty Presentationse ");

    tc_title = 'Retrieve the list of Presentations without using keyword ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      NumberOfPresentationLists: presosLength
    };
  }).timeout(200000);

 it('Retrieve the list of Presentations using keyword', async () => {

    await testLib.login(username, password);

    let resp = await testLib.listPresentationList({
      action: listPresentations_action,
      keywords: keyWord_test
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    var result = testLib.jsonparse(data.result),
      presentationsList = testLib.jsonparse(result.presos),
      presosLength = presentationsList.length;
 
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);
    
    if (presosLength > 0) {

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

   expect(presentationsList[0]).to.have.haveOwnProperty('preso_id');
    console.log("\n Validated the 'preso_id' is displayed.");

    expect(presentationsList[0]).to.have.haveOwnProperty('preso_uuid');
    console.log("\n Validated the 'preso_uuid' is displayed.");

    expect(presentationsList[0]).to.have.haveOwnProperty('affiliateId');
    console.log("\n Validated the 'affiliateId' is displayed.");

    expect(presosLength).to.equal(data.thisCount);
    console.log("\n Validated the 'thisCount' is eqaul to Number of Presentations(presos).");

      var i=0,
      j=0,
      affiliate=null,
      flag=false,
      preso_name='',
      keywordflag=false,
      comments=[],
      commentLength=null,
      author=null,
      comm=null

   for( i; i<presosLength;i++)
     {
      flag=true;
      affiliate = await (presentationsList[i].affiliateId);    
      if(affiliate!==username)
        assert.fail('\n Validated affiliateId: '+affiliate+' is different from logged Affiliate user: '+username)     

      preso_name = await (presentationsList[i].preso_name);
      preso_name = String(preso_name).toLowerCase();
      keyWord_test = String(keyWord_test).toLowerCase();

      if ((preso_name.indexOf(keyWord_test)) > -1)
          keywordflag = true ;
      else {
          comments= await testLib.jsonparse(presentationsList[i].comments)
          commentLength=comments.length;
          for(j; j<commentLength;j++)
          {
            author=await comments[j].author;
            comm=await comments[j].comments;
             
           author = String(author).toLowerCase();
           comm = String(comm).toLowerCase();

          if ( author.indexOf(keyWord_test) > -1 || comm.indexOf(keyWord_test) > -1)
               { 
               keywordflag = true ;
               break;
               }
             else 
              keywordflag = false ;

         if(!keywordflag){
          assert.fail("\n Given keyword: "+keyWord_test+" Not present in List Name: "+preso_name+", Author: "+author+", or Comment: "+comm);
          break;
            }
          } //out of sub for
         } //out of main else
       } //out of for loop
     if(keywordflag) 
      console.log("\n Validated the keyword is contained in all list");
     if(flag)    
      console.log("\n Validated Affliate id of All presentations with logged username ")
    }
  else 
   console.log("\n Recieved empty Presentationse ");

    tc_title = 'Retrieve the list of Presentations with using keyword ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      };
  }).timeout(200000);

 //-------------------------------Get Preso details-----------------------------------------//

 it('Validate error message for Get Presentation details without preso id', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getPresentationDetails({
      action: getPresentationDetails
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage= testLib.jsonparse(data.error)
 
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);
    
    expect(data).to.have.haveOwnProperty('error');
    console.log('\n Validated the status "error" to be displayed \n');
    
    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the errorCode code : " + errorCode_400);

    expect(errorMessage).to.equal(missing_preso_to_get_presentation);
    console.log('\n Validated the error message: '+errorMessage);
    
    tc_title = 'Validate error message for Get Presentation details without preso id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);


 it('Validate Response for Get Presentation details with preso id', async () => {

    await testLib.login(username, password);

    var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params),
    presoRespInJson = testLib.jsonparse(create_presentation_resp),
    presoData = testLib.jsonparse(presoRespInJson.data);
    succMessage = presoData.message;
    var createdPresentationId = succMessage.split(" ")[2];

    let resp = await testLib.getPresentationDetails({
      action: getPresentationDetails,
      preso_id: createdPresentationId
    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result)
 
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);
    
    expect(data).not.to.have.haveOwnProperty('error');
    console.log('\n Validated the status "error" not displayed \n');

    expect(result.preso_id).to.equal(createdPresentationId);
    console.log('\n Validated the preso id:'+createdPresentationId+' of presentaion displayed');
    
    tc_title = 'Validate Response for Get Presentation details with preso id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      succMessage: succMessage
    };
  }).timeout(200000);

//------------------------------List Presentation Favourite Products ------------------------------------//
 
 it('Validate Response for List Presentation Favourite Products API', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getListPresentationFavouriteProducts({
      action: getListPresentationFavouriteProducts_action
    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.products)

    var produsctsLength= result.length;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);
    
    expect(data).not.to.have.haveOwnProperty('error');
    console.log('\n Validated the status "error" not displayed \n');

    expect(produsctsLength).to.equal(data.thisCount);
    console.log('\n Validated the thisCount: '+data.thisCount +' is eqaul to Number of products: '+produsctsLength);

    tc_title = 'Validate Response for List Presentation Favourite Products API';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      NumberofProducts: produsctsLength
    };
  }).timeout(200000);


 //--------------------------Send Presntation -----------------------------------//

 it.only('Validate the Response fields of Send Presentation ', async () => {

    await testLib.login(username, password);

    var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params);
    respInJson = testLib.jsonparse(create_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    succMessage = data.message;
    var createdPresentationId = succMessage.split(" ")[2];

    var sendPresntaionParams = {
     action: send_presentation,
     preso_id: createdPresentationId
    }

    let send_presentation_resp = await testLib.presentations(sendPresntaionParams);
    respInJson = testLib.jsonparse(send_presentation_resp);
    data = testLib.jsonparse(respInJson.data);
   
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.preso_id).to.equal(createdPresentationId);
    console.log("\n Validated the status code preso id ");

    expect(data).to.have.haveOwnProperty('subject');
    console.log("\n Validated the 'subject' is displayed.");
   
    expect(data).to.have.haveOwnProperty('to_emails');
    console.log("\n Validated the 'to_emails' is displayed.");
    
    expect(data).to.have.haveOwnProperty('cc_emails');
    console.log("\n Validated the 'cc_emails' is displayed.");

    expect(data).to.have.haveOwnProperty('replyTo');
    console.log("\n Validated the 'replyTo' is displayed.");

    expect(data).to.have.haveOwnProperty('message');
    console.log("\n Validated the 'message' is displayed.");

    tc_title = 'Validate the Response fields of Send Presentation';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      succMessage: succMessage
    };
  }).timeout(200000);

 it('Validate the Error message of Send Presentation without preso id ', async () => {

    await testLib.login(username, password);

    var sendPresntaionParams = {
     action: send_presentation
     }

    let send_presentation_resp = await testLib.presentations(sendPresntaionParams);
    respInJson = testLib.jsonparse(send_presentation_resp);
    data = testLib.jsonparse(respInJson.data);
   
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(mising_preso_for_sending_presentaion_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + data.error);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);
 
    tc_title = 'Validate the Error message of Send Presentation without preso id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: mising_preso_for_sending_presentaion_errorMsg
    };
  }).timeout(200000);

 //-------------------------Add presentaion comment- Affliate --------------------------------//
 
   it('Validate Response of Add Presentation comment API using affiliate user.', async () => {

    await testLib.login(username, password);

    var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params);
    respInJson = testLib.jsonparse(create_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    succMessage = data.message;
    var createdPresentationId = succMessage.split(" ")[2];

    var addPresentaionComment = {
     action: 'add-preso-comments',
     preso_id: createdPresentationId,
     comments: 'I need quotes for more colors',
     author_name: 'John Smith'
    }

    let edit_presentation_resp = await testLib.presentations(addPresentaionComment);
    respInJson = testLib.jsonparse(edit_presentation_resp);
    data = testLib.jsonparse(respInJson.data);
    succMessage= data.message;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('id');
    console.log("\n Validated the 'id' is displayed.");

    expect(succMessage).to.equal(commentAddedScucesfulMsg);
    console.log("\n Validated the Success message: "+succMessage);

    var createdId= data.id

    tc_title = 'Validate Response of Add Presentation comment API using affiliate user.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      id: createdId,
      succMessage: succMessage
    };
   }).timeout(200000);

   it('Validate Error message of Add Presentation comment API without preso id using Sales rep user.', async () => {

    await testLib.login(username, password);

    var addPresentaionComment = {
     action: 'add-preso-comments',
     comments: 'I need quotes for more colors',
     author_name: 'John Smith'
    }

    let edit_presentation_resp = await testLib.presentations(addPresentaionComment);
    respInJson = testLib.jsonparse(edit_presentation_resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    expect(errorMessage).to.equal(missingPresoIdwhileAddingComment_errorMsg);
    console.log("\n Validated the Error message: "+errorMessage);

    tc_title = 'Validate Error message of Add Presentation comment API without preso id using Sales rep user.';
    values = {
      Salesrep_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);

 //-------------------------Add presentaion comment- Sales rep --------------------------------//

    it('Validate Response of Add Presentation comment API using Sales rep user.', async () => {

    await testLib.login(cj_salesrepId, password);

    var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params);
    respInJson = testLib.jsonparse(create_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    succMessage = data.message;
    var createdPresentationId = succMessage.split(" ")[2];

    var addPresentaionComment = {
     action: 'add-preso-comments',
     preso_id: createdPresentationId,
     comments: 'I need quotes for more colors',
     author_name: 'John Smith'
    }

    let edit_presentation_resp = await testLib.presentations(addPresentaionComment);
    respInJson = testLib.jsonparse(edit_presentation_resp);
    data = testLib.jsonparse(respInJson.data);
    succMessage= data.message;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('id');
    console.log("\n Validated the 'id' is displayed.");

    expect(succMessage).to.equal(commentAddedScucesfulMsg);
    console.log("\n Validated the Success message: "+succMessage);

    var createdId= data.id

    tc_title = 'Validate Response of Add Presentation comment API using Sales rep user.';
    values = {
      Salesrep_user: cj_salesrepId,
      statusCode: successCode_200,
      id: createdId,
      succMessage: succMessage
    };
   }).timeout(200000);

   it('Validate Error message of Add Presentation comment API without preso id using Sales rep user.', async () => {

    await testLib.login(cj_salesrepId, password);

    var addPresentaionComment = {
     action: 'add-preso-comments',
     comments: 'I need quotes for more colors',
     author_name: 'John Smith'
    }

    let edit_presentation_resp = await testLib.presentations(addPresentaionComment);
    respInJson = testLib.jsonparse(edit_presentation_resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    expect(errorMessage).to.equal(missingPresoIdwhileAddingComment_errorMsg);
    console.log("\n Validated the Error message: "+errorMessage);

    tc_title = 'Validate Error message of Add Presentation comment API without preso id using Sales rep user.';
    values = {
      Salesrep_user: cj_salesrepId,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);
   //-----------------------Guest Get Presntation Details---------------------------------------//

   it('Validate Response for "Guest Get presentation Details " Api', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name:'Customer campaign - Aug 2020'
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

    var guestGetPresentationQuote= {
     action: guest_get_presentaion_detail_action,
     preso_uuid: preso_uuid,
     preso_id: createdPresentationId       
     }

    let resp = await testLib.guestGetPresentations(guestGetPresentationQuote);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);
    let preso_name= result.preso_name

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(result.preso_id).to.equal(createdPresentationId);
    console.log("\n Validated the preso id ");
    
    expect(result.preso_uuid).to.equal(preso_uuid);
    console.log("\n Validated the preso uuid");

    expect(result).to.have.haveOwnProperty('preso_type');
    console.log("\n Validated the 'preso_type' is  displayed.");

    expect(result).to.have.haveOwnProperty('preso_name');
    console.log("\n Validated the 'preso_name' is  displayed.");

    tc_title = 'Validate Response for "Guest Get presentation Details " Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdPresentationId: createdPresentationId,
      preso_name: preso_name
    };

  }).timeout(200000);

    it('Validate Error message for "Guest Get presentation Details " Api without preso id', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
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

    var guestGetPresentationQuote= {
     action: guest_get_presentaion_detail_action,
     preso_uuid: preso_uuid    
     }

    let resp = await testLib.guestGetPresentations(guestGetPresentationQuote);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is  displayed.");
    
    expect(data.error).to.equal(missing_preso_id_to_get_PResentaion);
    console.log("\n Validated the error message : " + missing_preso_id_to_get_PResentaion);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message for "Guest Get presentation Details " Api without preso id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdPresentationId: createdPresentationId,
      errorMessage: missing_preso_id_to_get_PResentaion
    };

  }).timeout(200000);
//-----------------------Guest Add Presntaion Comment------------------------------//
  it('Validate Response for "Guest Add presentation Comment " Api', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
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

    var guestAddPresentationCommenet= {
     action: guest_Add_presentaion_comment_action,
     preso_uuid: preso_uuid,
     preso_id: createdPresentationId,
     comments: 'Please update quote to include Red color items'      
     }

    let resp = await testLib.guestPresentations(guestAddPresentationCommenet);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('id');
    console.log("\n Validated the 'id' is not displayed.");

    expect(data.message).to.equal(commentAddedScucesfulMsg);
    console.log("\n Validated the success message :  " + commentAddedScucesfulMsg);

    tc_title = 'Validate Response for "Guest Add presentation Comment " Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      succMessage: commentAddedScucesfulMsg
    };

  }).timeout(200000); 

  it('Validate Error message for "Guest Add presentation Comment " Api without preso id', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
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

    var guestAddPresentationCommenet= {
     action: guest_Add_presentaion_comment_action,
     preso_uuid: preso_uuid,
     comments: 'Please update quote to include Red color items'      
     }

    let resp = await testLib.guestPresentations(guestAddPresentationCommenet);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(data.error).to.equal(missing_preso_id_errorMsg);
    console.log("\n Validated the error message : " + missing_preso_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message for "Guest Add presentation Comment " Api without preso id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: missing_preso_id_errorMsg
    };

  }).timeout(200000); 

  //------------------------Add Presentaion Style Setting-----------------------//

    it('Validate id for "Add Presentaion Style Setting " Api', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params),
    presoRespInJson = testLib.jsonparse(create_presentation_resp),
    presoData = testLib.jsonparse(presoRespInJson.data);
    var  createdPresentationId = presoData.preso_id,
    createdId=''

    var AddPresentationStyleSetting= {
       action: add_presentation_style_setting_action,
       name: createdPresentationId,
       product_image_size: 0,
       pricing_display_style: 1,
       font: 'Roboto',
       color: '#5BC0EB'
     }
    let resp = await testLib.presentations(AddPresentationStyleSetting);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    createdId= data.id;
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('id');
    console.log("\n Validated the the created 'id': "+createdId);

    tc_title = 'Validate id for "Add Presentaion Style Setting " Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdId:createdId
    };

  }).timeout(200000); 

  it('Validate Error message for Add Presntaion Style Setting " Api  without preso name', async()=>{
    
      await testLib.login(username, password);
  
    var AddPresentationStyleSetting= {
       action: add_presentation_style_setting_action,
       product_image_size: 0,
       pricing_display_style: 1,
       font: 'Roboto',
       color: '#5BC0EB'
     }

    let resp = await testLib.presentations(AddPresentationStyleSetting);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error;
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorMessage).to.equal(missingName_errorMsg);
    console.log("\n Validated the error message : " + missingName_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message for Add Presntaion Style Setting " Api  without preso name';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };

  }).timeout(200000); 

  //-------------------------Update Presntaion Style Setting--------------------------------//

   it('Validate response for "Update Presentaion Style Setting " Api', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params),
    presoRespInJson = testLib.jsonparse(create_presentation_resp),
    presoData = testLib.jsonparse(presoRespInJson.data);
    var  createdPresentationId = presoData.preso_id,
    createdId=''

    var AddPresentationStyleSetting= {
       action: add_presentation_style_setting_action,
       name: createdPresentationId,
       product_image_size: 0,
       pricing_display_style: 1,
       font: 'Roboto',
       color: '#5BC0EB'
     }
    let presoResp = await testLib.presentations(AddPresentationStyleSetting)
    presoRespInJson = testLib.jsonparse(presoResp)
    presoData = testLib.jsonparse(presoRespInJson.data);
    createdId= presoData.id;

    var updatePresntationStyleSetting={
       action: update_presentaion_style_setting_action,
       id: createdId,
       name: createdPresentationId,
       product_image_size: 0,
       pricing_display_style: 1,
       font: 'Roboto',
       color: '#5BC0EB'
    }

    let resp = await testLib.presentations(updatePresntationStyleSetting);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    tc_title = 'Validate response for "Update Presentaion Style Setting " Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdPresentationId: createdPresentationId
    };

   }).timeout(200000); 

  it('Validate Error message for "Update Presentaion Style Setting" Api without id', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params),
    presoRespInJson = testLib.jsonparse(create_presentation_resp),
    presoData = testLib.jsonparse(presoRespInJson.data);
    var  createdPresentationId = presoData.preso_id,
    createdId=''

    var AddPresentationStyleSetting= {
       action: add_presentation_style_setting_action,
       name: createdPresentationId,
       product_image_size: 0,
       pricing_display_style: 1,
       font: 'Roboto',
       color: '#5BC0EB'
     }
    let presoResp = await testLib.presentations(AddPresentationStyleSetting)
    presoRespInJson = testLib.jsonparse(presoResp)
    presoData = testLib.jsonparse(presoRespInJson.data);
    createdId= presoData.id;

    var updatePresntationStyleSetting={
       action: update_presentaion_style_setting_action,
       name: createdPresentationId,
       product_image_size: 0,
       pricing_display_style: 1,
       font: 'Roboto',
       color: '#5BC0EB'
    }

    let resp = await testLib.presentations(updatePresntationStyleSetting);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is  displayed.");

    expect(errorMessage).to.equal(id_is_empty_errorMsg);
    console.log("\n Validated the error message : " +errorMessage );

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message for "Update Presentaion Style Setting " Api without id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdPresentationId: createdPresentationId,
      errorMessage: errorMessage
    };

  }).timeout(200000); 

  //------------------Delete Presentaion settings----------------------------------------//
  it('Validate Repsonse for "Delete Presentaion Style Setting " Api', async () => {

    await testLib.login(username, password);
  
   var create_presentation_params = {
      action: create_presentation_action,
      customerId: cj_customerId,
      preso_name: 'Customer campaign - Aug 2020'
    }

    let create_presentation_resp = await testLib.presentations(create_presentation_params),
    presoRespInJson = testLib.jsonparse(create_presentation_resp),
    presoData = testLib.jsonparse(presoRespInJson.data);
    var createdPresentationId = presoData.preso_id,
    createdId=''

    var AddPresentationStyleSetting= {
       action: add_presentation_style_setting_action,
       name: createdPresentationId,
       product_image_size: 0
     }
    let resp = await testLib.presentations(AddPresentationStyleSetting);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    createdId= data.id;

    var removePresentationStyleSetting= {
       action: remove_presentaion_style_setting_action,
       id: createdId
     }

    resp = await testLib.presentations(removePresentationStyleSetting);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    tc_title = 'Validate Response for "Delete Presentaion Style Setting " Api';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdId: createdId
    };

  }).timeout(200000); 

it('Validate Error message for "Delete Presentaion Style Setting " Api without id', async () => {

    await testLib.login(username, password);

    var removePresentationStyleSetting= {
       action: remove_presentaion_style_setting_action
     }

    let resp = await testLib.presentations(removePresentationStyleSetting),
    respInJson = testLib.jsonparse(resp),
    data = testLib.jsonparse(respInJson.data);
    errorMessage= data.error
    
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

     expect(errorMessage).to.equal(id_is_empty_errorMsg);
    console.log("\n Validated the error message : " +errorMessage );

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message for "Delete Presentaion Style Setting " Api without id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000); 

//---------------------List Presentation Style settings--------------------------------------//
it('Validate Response for "List Presentation Style settings" API', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getPresentationStyleSettings({
      action: "list-presentation-style-setting"
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage= testLib.jsonparse(data.error)
 
    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);
    
    expect(data).not.to.have.haveOwnProperty('error');
    console.log('\n Validated "error" not to be displayed \n');
    
    expect(data).to.have.haveOwnProperty('styleList');
    console.log('\n Validated "styleList" to be displayed \n');
    
    tc_title = 'Validate Response for "List Presentation Style settings" API';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);
  
});