const { assert } = require("chai");

describe('Notes Apis validations .......', () => {

  it('Validate Succes message for "Add Job Notes" API.', async () => {

    await testLib.login(username, password);

    var addNote = {
            action: add_job_notes_action,
            jobId:  existedJob,   
            notes:   "Some example note for the job",
            note_type :  1 
    }

    let resp = await testLib.postNote(addNote);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('noteId');
    console.log("\n Validated the 'noteId' is displayed.");

    expect(data.message).to.equal(notes_added_succMsg);
    console.log("\n Validated the Success message :  " + notes_added_succMsg);

    var noteId=''
    noteId=data.noteId;

    tc_title = 'Validate Succes message for "Add Job Notes" API';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      noteId:noteId
    };

  }).timeout(200000);

   it('Validate Error message for "Add Job Notes" API without jobId.', async () => {

    await testLib.login(username, password);

    var addNote = {
            action: add_job_notes_action,
            notes:   "Some example note for the job",
            note_type :  1 
    }

    let resp = await testLib.postNote(addNote);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(shipment_missing_jobid_error_msg).to.equal(data.error);
    console.log("\n Validated the error message : " + shipment_missing_jobid_error_msg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message for "Add Job Notes" API without jobId';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: shipment_missing_jobid_error_msg
    };
  }).timeout(200000);

  it('Validate Reposnse of "Get Job Notes" API', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getNote({
      action: get_job_notes_action,
      jobId: existedJob
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result = testLib.jsonparse(data.result);

    let resultLength=result.length

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");
    
    if(resultLength>0)
    {
    expect(resultLength).to.equal(data.thisCount);
    console.log("\n Validated the 'thisCount' is eqaul to Number of notes.");

    expect(result[0]).to.have.haveOwnProperty('noteId');
    console.log("\n Validated the 'noteId' is displayed.");

    expect(result[0]).to.have.haveOwnProperty('jobId');
    console.log("\n Validated the 'jobId' is displayed.");

    expect(result[0]).to.have.haveOwnProperty('notes');
    console.log("\n Validated the 'notes' is displayed.");

    }
   else 
   console.log("\n No Notes Present");

    tc_title = 'Validate Reposnse of "Get Job Notes" API';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
       jobId: existedJob

    };

  }).timeout(200000);

  it('Validate Error message of "Get Job Notes" API without jobId', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getNote({
      action:get_job_notes_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    errorMessage=data.error;

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(shipment_missing_jobid_error_msg).to.equal(errorMessage);
    console.log("\n Validated the error message : " + shipment_missing_jobid_error_msg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate Error message of "Get Job Notes" API without jobId';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMessage: errorMessage
    };

  }).timeout(200000);

})