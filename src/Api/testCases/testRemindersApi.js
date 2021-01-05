const { assert } = require("chai");

describe('Reminder Apis validations .......', () => {

  it('Validate Succes message for "Add Reminder" API.', async () => {

    await testLib.login(username, password);
   
   let d1 = new Date(); 
    d1=await d1.toISOString().replace('T',' ').substr(0,19)
                   
    var addReminder = {
            action: add_job_Reminder_action,
            jobId: existedJob,   
            title: "Reminder to myself to contact my customer",
            description: "I should send e-mail to all my customers for survey.",
            target_time: d1,
            enable_email: 1,         
            enable_sms: 0,        
            enable_app: 1 
    }

    let resp = await testLib.postReminder(addReminder);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('new_reminder_id');
    console.log("\n Validated the 'new_reminder_id' is displayed.");

    expect(data.message).to.equal(Reminder_added_succMsg);
    console.log("\n Validated the Success message :  " + Reminder_added_succMsg);
    
    var ReminderId=''
    ReminderId=data.new_reminder_id;

    tc_title = 'Validate Succes message for "Add Reminder" API';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      ReminderId:ReminderId,
      succMessage: Reminder_added_succMsg
    };

  }).timeout(200000);

  it('Validate error message for "Add Reminder" API without job id.', async () => {

    await testLib.login(username, password);
   
   let d1 = new Date(); 
    d1=await d1.toISOString().replace('T',' ').substr(0,19)
                   
    var addReminder = {
            action: add_job_Reminder_action,
            title: "Reminder to myself to contact my customer",
            description: "I should send e-mail to all my customers for survey.",
            target_time: d1,
            enable_email: 1,         
            enable_sms: 0,        
            enable_app: 1 
    }

    let resp = await testLib.postReminder(addReminder);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the errorCode code : " + errorCode_400);

    expect(errorMessage).to.equal(shipment_missing_jobid_error_msg);
    console.log('\n Validated the error message: '+errorMessage);

    tc_title = 'Validate error message for "Add Reminder" API without job id.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };
  }).timeout(200000);

 
//-----------------------------GET REMINDER-------------------------------------//
  it('Validate Success message of "Get Reminder" API ', async () => {

     await testLib.login(username, password);

     let d1 = new Date(); 
    d1=await d1.toISOString().replace('T',' ').substr(0,19)
   
    var addReminder = {
            action: add_job_Reminder_action,
            jobId: existedJob,   
            title: "Reminder to myself to contact my customer",
            description: "I should send e-mail to all my customers for survey.",
            target_time: d1,
            enable_email: 1,         
            enable_sms: 0,        
            enable_app: 1 
    }

    let resp = await testLib.postReminder(addReminder);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var ReminderId=await data.new_reminder_id;
   
    //Getting created reminder

    resp = await testLib.getReminder({
      action: get_reminder_action,
      reminder_id: ReminderId
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    tc_title = 'Validate Response of "Get Reminder" API';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      reminderId: ReminderId
    };

  }).timeout(200000);

  it('Validate Error message of "Get Reminder" API without reminder id', async () => {

     await testLib.login(username, password);

    let resp = await testLib.getReminder({
      action:get_reminder_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage= data.error

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the errorCode code : " + errorCode_400);

    expect(errorMessage).to.equal("Missing or Empty reminder_id parameter!");
    console.log('\n Validated the error message: '+errorMessage);

    tc_title = 'Validate Error message of "Get Reminder" API without reminder id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };

  }).timeout(200000);

  //---------------------------List Job Reminder-------------------------------------------//

   it('Validate Response of "List Reminder" API ', async () => {

     await testLib.login(username, password);
   
    let resp = await testLib.getReminder({
      action: list_reminder_action,
      jobId: existedJob
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);
    let resultLength=result.length

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    if(resultLength>0)
    {
    expect(result[0]).to.have.haveOwnProperty('reminder_id');
    console.log("\n Validated the 'reminder_id' is displayed.");
    
    expect(result[0]).to.have.haveOwnProperty('job_number');
    console.log("\n Validated the 'job_number' is displayed.");

    expect(result[0]).to.have.haveOwnProperty('affiliate');
    console.log("\n Validated the 'affiliate' is displayed.");
     
     var i=0,
      affiliate=null,
      affFlag=false,
      jobFlag=false,
      job=null

    for( i; i<resultLength;i++)
     {
      affFlag=true;
      affiliate = await (result[i].affiliate);    
      if(affiliate!==username)
        assert.fail('\n Validated affiliateId: '+affiliate+' is different from logged Affiliate user: '+username)     
      
      jobFlag=true;
      job = await (result[i].job_number);    
      if(job!==existedJob)
        assert.fail('\n Validated job_number: '+job+' is different from logged Job Number used: '+existedJob)     
     }
   if(affFlag)    
    console.log("\n Validated Affliate id of All Reminder with logged username ")

   if(jobFlag)    
    console.log("\n Validated job_number of All Reminder with used job ")
    }
    else 
   console.log("\n Recieved No Reminder ");

    tc_title = 'Validate Response of "List Reminder" API';
    values = {
      Affiliate_user: username,
      statusCode: respInJson.statusCode
    };

  }).timeout(200000);

  it('Validate Error message of "List Reminder" API without Job id', async () => {

     await testLib.login(username, password);

    let resp = await testLib.getReminder({
      action:list_reminder_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);
    errorMessage=data.error

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the errorCode code : " + errorCode_400);

    expect(errorMessage).to.equal(missed_jobId_errorMsg2);
    console.log('\n Validated the error message: '+errorMessage);

    tc_title = 'Validate Error message of "List Reminder" API without Job id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };

  }).timeout(200000);

  //------------------------------------Delete Reminder-------------------------------------------//

  it('Validate Success message of "Delete Reminder" API ', async () => {

     await testLib.login(username, password);

     let d1 = new Date(); 
    d1=await d1.toISOString().replace('T',' ').substr(0,19)
   
    var addReminder = {
            action: add_job_Reminder_action,
            jobId: existedJob,   
            title: "Reminder to myself to contact my customer",
            description: "I should send e-mail to all my customers for survey.",
            target_time: d1,
            enable_email: 1,         
            enable_sms: 0,        
            enable_app: 1 
    }

    let resp = await testLib.postReminder(addReminder);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var ReminderId=await data.new_reminder_id;
   
    //Getting created reminder

    resp = await testLib.postReminder({
      action: delete_reminder_action,
      reminder_id: ReminderId
    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);
    succMessage= data.message

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('deletedCount');
    console.log("\n Validated the 'deletedCount' is displayed.");

    expect(succMessage).to.equal(reminder_deleted_succMsg);
    console.log("\n Validated the success message displayed")

    tc_title = 'Validate Success message of "Delete Reminder" API ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      succMessage:succMessage
    };

  }).timeout(200000);

  it('Validate Error message of "Delete Reminder" API without reminder id', async () => {

     await testLib.login(username, password);

    let resp = await testLib.postReminder({
      action:delete_reminder_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);
    errorMessage=data.error

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the errorCode code : " + errorCode_400); 

    expect(errorMessage).to.equal(missing_reminder_id);
    console.log('\n Validated the error message: '+errorMessage);
  
    tc_title = 'Validate Error message of "Delete Reminder" API without reminder id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };

  }).timeout(200000);

  //----------------------------Edit Reminder---------------------------------------------------//

  it('Validate Success message of "Edit Reminder" API ', async () => {

     await testLib.login(username, password);

     let d1 = new Date(); 
    d1=await d1.toISOString().replace('T',' ').substr(0,19)
    var title1="Testing Reminder",
    title2="Testing Reminder-updated"
    
    var addReminder = {
            action: add_job_Reminder_action,
            jobId: existedJob,   
            title: title1,
            description: "I should send e-mail to all my customers for survey.",
            target_time: d1,
            enable_email: 1,         
            enable_sms: 0,        
            enable_app: 1 
    }

    let resp = await testLib.postReminder(addReminder);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var ReminderId=await data.new_reminder_id;
   
    //Getting created reminder

    resp = await testLib.postReminder({
      action: edit_reminder_action,
      reminder_id: ReminderId,
      title: title2

    });

    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result= testLib.jsonparse(data.result);
    succMessage=data.message

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(succMessage).to.equal(reminder_edit_done_succMsg)
    console.log("\n Validated the Success message :  " + data.message);

    expect(data.affectedRows).to.equal(1)
    console.log("\n Validated the affectedRows equal to: 1 " );


    tc_title = 'Validate Success message of "Edit Reminder" API ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      succMessage: succMessage
    };

  }).timeout(200000);

  it('Validate Error message of "Edit Reminder" API without reminder id', async () => {

     await testLib.login(username, password);

    let resp = await testLib.postReminder({
      action:edit_reminder_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the errorCode code : " + errorCode_400); 

    expect(errorMessage).to.equal(Missing_reminder_id_errorMsg);
    console.log('\n Validated the error message: '+errorMessage);
  
    tc_title = 'Validate Error message of "Edit Reminder" API without reminder id';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };

  }).timeout(200000);

})