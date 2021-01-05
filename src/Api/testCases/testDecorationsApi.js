describe('create, update, add, get decoration set Api validations .......', () => {

  it('Create decoration set.', async () => {

    await testLib.login(username, password);

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      let resp = await testLib.decorations(create_decorationSet_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(respInJson).to.not.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is not displayed.");

      expect(data.message).to.have.haveOwnProperty('decorationSetId');
      console.log("\n Validated 'decorationSetId' field is displayed.");
    };

    tc_title = 'Created decoration set.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      createdJobId: data.message.decorationSetId
    };
  }).timeout(200000);

  it('Validate the create decoration error message with missed action query parameter.', async () => {

    var create_decorationSet_with_missing_action_params = {
      newDecorationSet: {
        decorationName: decorationName,
        description: desc
      },
      addDecorations: [
        {
          size: size,
          color: color,
          artwork: artwork,
          location: locations[4],
          instruction: instruction,
          imprintMethod: imprintMethods[2]
        }
      ]
    };

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_with_missing_action_params);
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

    tc_title = 'Validated the create decoration error message with missed action query parameter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the success message of update decoration set of existed decoration.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    var update_decorator_params = {
      action: update_decoration_set_action,
      existingDecorationSet: {
        id: existedDecorationSetId,
        decorationName: decorationName,
        description: desc
      },

      decorationSet: [
        {
          size: "",
          color: "",
          artwork: "",
          location: locations[3],
          instruction: "",
          imprintMethod: imprintMethods[3]
        }
      ]
    };

    let updateResp = await testLib.decorations(update_decorator_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    succMessage = data.message.message;
    expect(successMsg).to.have.string(succMessage);
    console.log("\n Validated the updated job message : " + succMessage);

    tc_title = 'Validated the success message of update decoration set of existed decoration.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      SuccMessage: succMessage
    };
  }).timeout(200000);

  it("Validate the error message of update decoration set with missed 'id' field.", async () => {

    await testLib.login(username, password);

    var update_decorator_missed_id_params = {
      action: update_decoration_set_action,
      existingDecorationSet: {
        decorationName: decorationName,
        description: desc
      },

      decorationSet: [
        {
          size: "",
          color: "",
          artwork: "",
          location: locations[3],
          instruction: "",
          imprintMethod: imprintMethods[3]
        }
      ]
    };

    let updateResp = await testLib.decorations(update_decorator_missed_id_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_empty_decorationSet_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_empty_decorationSet_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message of update decoration set with missed 'id' field.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_id_errorMsg: missed_empty_decorationSet_id_errorMsg,
      Missing_id_errorcode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message of update decoration set with empty 'id' field.", async () => {

    await testLib.login(username, password);

    var update_decorator_empty_id_params = {
      action: update_decoration_set_action,
      existingDecorationSet: {
        id: '',
        decorationName: decorationName,
        description: desc
      },

      decorationSet: [
        {
          size: "",
          color: "",
          artwork: "",
          location: locations[3],
          instruction: "",
          imprintMethod: imprintMethods[3]
        }
      ]
    };

    let updateResp = await testLib.decorations(update_decorator_empty_id_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_empty_decorationSet_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_empty_decorationSet_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message  of update decoration set with empty 'id' field.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      empty_id_errorMsg: missed_empty_decorationSet_id_errorMsg,
      empty_id_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message  of update decoration set with invalid 'id' field.", async () => {

    await testLib.login(username, password);

    var update_decorator_empty_id_params = {
      action: update_decoration_set_action,
      existingDecorationSet: {
        id: invalid_number,
        decorationName: decorationName,
        description: desc
      },

      decorationSet: [
        {
          size: "",
          color: "",
          artwork: "",
          location: locations[3],
          instruction: "",
          imprintMethod: imprintMethods[3]
        }
      ]
    };

    let updateResp = await testLib.decorations(update_decorator_empty_id_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(invalid_decorationSet_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_decorationSet_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message of update decoration set with invalid 'id' field.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Invalid_id_errorMsg: invalid_decorationSet_id_errorMsg,
      Invalid_id_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message of update decoration set with invalid datatype of 'id' field.", async () => {

    await testLib.login(username, password);

    var update_decorator_invalid_datatype_id_params = {
      action: update_decoration_set_action,
      existingDecorationSet: {
        id: invalid_data,
        decorationName: decorationName,
        description: desc
      },

      decorationSet: [
        {
          size: "",
          color: "",
          artwork: "",
          location: locations[3],
          instruction: "",
          imprintMethod: imprintMethods[3]
        }
      ]
    };

    let updateResp = await testLib.decorations(update_decorator_invalid_datatype_id_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(invalid_datatype_decorationset_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_datatype_decorationset_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validate the error message  of update decoration set with invalid datatype of 'id' field.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_datatype_decorationsetid_errorMsg: invalid_datatype_decorationset_id_errorMsg,
      invalid_datatype_decorationsetid_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of update decoration set with missed action query parameter.', async () => {

    await testLib.login(username, password);

    var update_decorator_missed_action_params = {
      existingDecorationSet: {
        id: invalid_number,
        decorationName: decorationName,
        description: desc
      },

      decorationSet: [
        {
          size: "",
          color: "",
          artwork: "",
          location: locations[3],
          instruction: "",
          imprintMethod: imprintMethods[3]
        }
      ]
    };

    let updateResp = await testLib.decorations(update_decorator_missed_action_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message of update decoration set with missed action query parameter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorcode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with other subsequent affiliate id of 'update decoration set'.", async () => {

    await testLib.login(username, password);

    var update_decorator_with_other_affiliate_data_params = {
      action: update_decoration_set_action,
      existingDecorationSet: {
        id: other_affiliate_existed_decorationSet_id,
        decorationName: decorationName,
        description: desc
      },

      decorationSet: [
        {
          size: "",
          color: "",
          artwork: "",
          location: locations[3],
          instruction: "",
          imprintMethod: imprintMethods[3]
        }
      ]
    };

    let updateResp = await testLib.decorations(update_decorator_with_other_affiliate_data_params);
    respInJson = testLib.jsonparse(updateResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_decorationSet_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_decorationSet_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with other affiliate id of 'update decoration set'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMsg: invalid_decorationSet_id_errorMsg,
      errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message of update decoration set with missed 'decorationSetId' field.", async () => {

    await testLib.login(username, password);

    var update_decorator_missed_decorationId_params = {
      "action": update_decoration_set_action,
      "decorationSet": [
        {
          "id": '142',
          "size": "",
          "color": "",
          "artwork": "",
          "location": "Right Chest",
          "instruction": "",
          "imprintMethod": "Silksreen"
        }
      ],
      "decorationDetails": {
        "sendProofsTo": "",
        "vendorCode": "IPU ART",
        "proofRequired": 0,
        "decorationNotes": ""
      }
    };

    let updateResp = await testLib.decorations(update_decorator_missed_decorationId_params);
    respInJson = testLib.jsonparse(updateResp);
    data = '';
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_empty_decorationSet_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_empty_decorationSet_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message of update decoration set with missed 'decorationSetId' field.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_id_errorMsg: missed_empty_decorationSet_id_errorMsg,
      Missing_id_errorcode: errorCode_400
    };
  }).timeout(200000);

  /**
  * Deprecated as the update decoration set scema got changed on date : 12/11/2020
  */
  // it('Validate the update decoration set of existed decoration with empty vendor code. ', async () => {

  //   await testLib.login(username, password);
  //   var update_decorator_empty_vendorcode_params = {
  //     "action": update_decoration_set_action,
  //     "decorationSet": [
  //       {
  //         "id": existedItemCode,
  //         "size": "",
  //         "color": "",
  //         "artwork": "",
  //         "location": locations[0],
  //         "instruction": "",
  //         "imprintMethod": imprintMethods[1]
  //       }
  //     ],
  //     "decorationDetails": {
  //       "sendProofsTo": "",
  //       "vendorCode": '',
  //       "proofRequired": 0,
  //       "decorationNotes": "",
  //       "decorationSetid": existed_decorationSet_id
  //     }
  //   };

  //   let updateResp = await testLib.decorations(update_decorator_empty_vendorcode_params);
  //   respInJson = testLib.jsonparse(updateResp);
  //   data = '';
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(empty_vendor_code_errorMsg).to.equal(data.error)
  //   console.log("\n Validated the error message : " + empty_vendor_code_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error message : " + errorCode_400);

  //   tc_title = 'Validated the update decoration set of existed decoration with empty vendor code.';
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     empty_vendorcode_errorMsg: empty_vendor_code_errorMsg,
  //     empty_venforcode_errorCode: errorCode_400
  //   };
  // }).timeout(200000);

  // it("Validate the error message  of update decoration set with empty 'decorationSetid' field.", async () => {

  //   await testLib.login(username, password);

  //   var update_decorator_empty_id_params = {
  //     "action": update_decoration_set_action,
  //     "decorationSet": [
  //       {
  //         "id": existedItemCode,
  //         "size": "",
  //         "color": "",
  //         "artwork": "",
  //         "location": locations[3],
  //         "instruction": "",
  //         "imprintMethod": imprintMethods[6]
  //       }
  //     ],
  //     "decorationDetails": {
  //       "sendProofsTo": "",
  //       "vendorCode": ipro_vendorcode,
  //       "proofRequired": 0,
  //       "decorationNotes": "",
  //       "decorationSetid": ''
  //     }
  //   };

  //   let updateResp = await testLib.decorations(update_decorator_empty_id_params);
  //   respInJson = testLib.jsonparse(updateResp);
  //   data = '';
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(missed_decorationSet_id_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + missed_decorationSet_id_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = "Validated the error message  of update decoration set with empty 'decorationSetid' field.";
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     empty_decorationsetid_errorMsg: missed_decorationSet_id_errorMsg,
  //     empty_decorationsetid_errorCode: errorCode_400
  //   };
  // }).timeout(200000);

  // it("Validate the error message  of update decoration set with invalid 'decorationSetid' field.", async () => {

  //   await testLib.login(username, password);

  //   var update_decorator_empty_id_params = {
  //     "action": update_decoration_set_action,
  //     "decorationSet": [
  //       {
  //         "id": existedItemCode,
  //         "size": "",
  //         "color": "",
  //         "artwork": "",
  //         "location": locations[5],
  //         "instruction": "",
  //         "imprintMethod": imprintMethods[7]
  //       }
  //     ],
  //     "decorationDetails": {
  //       "sendProofsTo": "",
  //       "vendorCode": ipro_vendorcode,
  //       "proofRequired": 0,
  //       "decorationNotes": "",
  //       "decorationSetid": invalid_decorationSetid
  //     }
  //   };

  //   let updateResp = await testLib.decorations(update_decorator_empty_id_params);
  //   respInJson = testLib.jsonparse(updateResp);
  //   data = '';
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(respInJson).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   expect(other_affiliate_invaid_decorationset_id_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + other_affiliate_invaid_decorationset_id_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = "Validated the error message  of update decoration set with invalid 'decorationSetid' field.";
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     ErrorMsg_Invalid_decorationset_id: other_affiliate_invaid_decorationset_id_errorMsg,
  //     invalid_decorationset_id_errorCode: errorCode_400
  //   };
  // }).timeout(200000);

  // it("Validate the error message  of update decoration set with invalid datatype of 'decorationSetid' field.", async () => {

  //   await testLib.login(username, password);

  //   var update_decorator_empty_id_params = {
  //     "action": update_decoration_set_action,
  //     "decorationSet": [
  //       {
  //         "id": existedItemCode,
  //         "size": "",
  //         "color": "",
  //         "artwork": "",
  //         "location": locations[5],
  //         "instruction": "",
  //         "imprintMethod": imprintMethods[7]
  //       }
  //     ],
  //     "decorationDetails": {
  //       "sendProofsTo": "",
  //       "vendorCode": ipro_vendorcode,
  //       "proofRequired": 0,
  //       "decorationNotes": "",
  //       "decorationSetid": 'xxx'
  //     }
  //   };

  //   let updateResp = await testLib.decorations(update_decorator_empty_id_params);
  //   respInJson = testLib.jsonparse(updateResp);
  //   data = '';
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(respInJson).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   expect(invalid_datatype_decorationset_id_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_datatype_decorationset_id_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = "Validated the error message of update decoration set with invalid datatype of 'decorationSetid' field.";
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     invalid_datatype_decorationsetid_errorMsg: invalid_datatype_decorationset_id_errorMsg,
  //     invalid_datatype_decorationsetid_errorCode: errorCode_400
  //   };
  // }).timeout(200000);

  it('Retrieve Named DecorationSet List.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getDecorationSets({
      action: get_named_decoration_set_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('result');
    console.log("\n Validated the 'result' is displayed.");

    result = data.result;

    if (result.length > 0) {

      expect(result[0]).to.have.haveOwnProperty('description');
      console.log("\n Validated the 'description' is displayed.");

      expect(result[0]).to.have.haveOwnProperty('decorationSet');
      console.log("\n Validated the 'decorationSet' is displayed.");

      expect(result[0]).to.have.haveOwnProperty('decorationName');
      console.log("\n Validated the 'decorationName' is displayed.");
    }

    tc_title = 'Retrieved Named DecorationSet List.';
    values = {
      Affiliate_user: username,
      statusCode: respInJson.statusCode
    };
  }).timeout(200000);

  it('Validate the error message with action <get-named-decoration-set> filter.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getDecorationSets();
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

    tc_title = 'Validated the error message with missed action <get-named-decoration-set> filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the Success message of add decoration detail to job.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          existedItemCode
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJob,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(respInJson).to.not.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is not displayed.");

      var newDecorationId = data.message.decorationDetailId;
      expect(newDecorationId).to.equal(data.message.decorationDetailId);
      console.log("\n Validated the added new decoration Id : " + newDecorationId);
    };

    tc_title = 'Validated the Success message of add decoration detail to job.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      new_decorationId: newDecorationId
    };
  }).timeout(200000);

  it('Validate the error message with the previous date than current date of reqShipDate field of add decoration detail to job.', async () => {

    await testLib.login(username, password);

    var add_decoration_detail_to_job_params = {
      action: add_decoration_detail_to_job_action,
      "selectedLineItems": [
        existedItemCode
      ],
      "newDecorationLineItems": [
        {
          "jobNumber": existedJob,
          "vendor": apsp_vendorcode,
          "product": "",
          "qty": qty,
          "price": price,
          "cost": cost,
          "description": imprintMethods[3] + " " + color + " " + size,
          "inHandDate": futureDate_yyyy_mm_dd,
          "reqShipDate": previousDate
        }
      ],
      "decorationSet": {
        "id": existed_decorationSet_id,
        "affiliateId": username,
        "salesrepId": username,
        "decorationName": decorationName,
        "description": desc
      },
      "addDecorations": [
        {
          "imprintMethod": imprintMethods[4],
          "location": locations[2],
          "color": color,
          "size": size,
          "instruction": instruction,
          "artwork": "",
          "id": "artwork-id-5"
        }
      ],
      "decorationDetails": {
        "jobNumber": existedJob,
        "vendorCode": apsp_vendorcode,
        "sendProofsTo": "",
        "proofRequired": "0",
        "decorationNotes": "",
        "decorationSetid": existed_decorationSet_id
      }
    }

    let resp = await testLib.decorations(add_decoration_detail_to_job_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(previous_reqShipDate_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + previous_reqShipDate_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with the previous date than current date of reqShipDate field of add decoration detail to job.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMsg: previous_reqShipDate_errorMsg,
      errorCode: errorCode_400
    };

  }).timeout(200000);

  it('Validate the error message with the invalid date format of reqShipDate field of add decoration detail to job.', async () => {

    await testLib.login(username, password);

    var add_decoration_detail_to_job_params = {
      action: add_decoration_detail_to_job_action,
      "selectedLineItems": [
        existedItemCode
      ],
      "newDecorationLineItems": [
        {
          "jobNumber": existedJob,
          "vendor": apsp_vendorcode,
          "product": "",
          "qty": qty,
          "price": price,
          "cost": cost,
          "description": imprintMethods[3] + " " + color + " " + size,
          "inHandDate": futureDate_yyyy_mm_dd,
          "reqShipDate": currentDate
        }
      ],
      "decorationSet": {
        "id": existed_decorationSet_id,
        "affiliateId": username,
        "salesrepId": username,
        "decorationName": decorationName,
        "description": desc
      },
      "addDecorations": [
        {
          "imprintMethod": imprintMethods[4],
          "location": locations[2],
          "color": color,
          "size": size,
          "instruction": instruction,
          "artwork": "",
          "id": "artwork-id-5"
        }
      ],
      "decorationDetails": {
        "jobNumber": existedJob,
        "vendorCode": apsp_vendorcode,
        "sendProofsTo": "",
        "proofRequired": "0",
        "decorationNotes": "",
        "decorationSetid": existed_decorationSet_id
      }
    }

    let resp = await testLib.decorations(add_decoration_detail_to_job_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_format_reqShipDate_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_format_reqShipDate_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with the invalid date format of reqShipDate field  of add decoration detail to job.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      errorMsg: invalid_format_reqShipDate_errorMsg,
      errorCode: errorCode_400
    };

  }).timeout(200000);

  it('Validate the Success message of add decoration detail to job with multiple selected lineitems.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJob,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(respInJson).to.not.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is not displayed.");

      var newDecorationId = data.message.decorationDetailId;
      expect(newDecorationId).to.equal(data.message.decorationDetailId);
      console.log("\n Validated the added new decoration Id : " + newDecorationId);
    };

    tc_title = 'Validated the Success message of add decoration detail to job with multiple selected lineitems.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      new_decorationId: newDecorationId
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the line items are under the other job.', async () => {

    await testLib.login(username, password);

    let cj_resp = await testLib.createJob(create_job_params);
    respInJson = testLib.jsonparse(cj_resp);
    data = testLib.jsonparse(respInJson.data);

    existedJobId = data.jobId;

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJobId,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJobId,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the line items are under the other job.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      LineItems_with_other_JobId_errorMsg: invalid_affiliateId_errorMsg,
      LineItems_with_other_JobId_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing selected LineItems section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "newDecorationLineItems": [
          {
            "jobNumber": existedJob,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect(missing_empty_selected_lineitems_errorMsg).to.equal(data.error);
      console.log("\n Validated the error message : " + missing_empty_selected_lineitems_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing selected LineItems section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_LineItems_Section_errorMsg: missing_empty_selected_lineitems_errorMsg,
      Missing_LineItems_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing newDecorationLineItems section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing newDecorationLineItems section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_newDecorationLineItems_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_newDecorationLineItems_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing JobNumber in newDecorationLineItems section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing JobNumber in newDecorationLineItems section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_jobNumber_In_newDecorationLineItems_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_jobNumber_In_newDecorationLineItems_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing ReqShipDate in newDecorationLineItems section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJob,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect(invalid_format_reqShipDate_errorMsg).to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_format_reqShipDate_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing ReqShipDate in newDecorationLineItems section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_ReqShipDate_In_newDecorationLineItems_Section_errorMsg: invalid_format_reqShipDate_errorMsg,
      Missing_ReqShipDate_In_newDecorationLineItems_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing Vendor in newDecorationLineItems section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJob,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing Vendor in newDecorationLineItems section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_Vendor_In_newDecorationLineItems_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_Vendor_In_newDecorationLineItems_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing decorationSet section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJob,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing decorationSet section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_DecorationSet_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_DecorationSet_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing id in decorationSet section.', async () => {

    await testLib.login(username, password);

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJobId,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJobId,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing id in decorationSet section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_Id_In_DecorationSet_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_Id_In_DecorationSet_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing addDecorations section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJobId,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "decorationDetails": {
          "jobNumber": existedJobId,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing addDecorations section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_addDecorations_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_addDecorations_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing imprintMethod in addDecorations section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJob,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing imprintMethod in addDecorations section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_imprintMethod_In_addDecorations_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_imprintMethod_In_addDecorations_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing location in addDecorations section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJob,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing location in addDecorations section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_location_In_addDecorations_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_location_In_addDecorations_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing decorationDetails section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJobId,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect(missing_empty_decorationDetails_id_errorMsg).to.equal(data.error);
      console.log("\n Validated the error message : " + missing_empty_decorationDetails_id_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing decorationDetails section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_decorationDetails_Section_errorMsg: missing_empty_decorationDetails_id_errorMsg,
      Missing_decorationDetails_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing JobNumber in decorationDetails section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJobId,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing JobNumber in decorationDetails section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_JobNumber_In_decorationDetails_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_JobNumber_In_decorationDetails_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing proofRequired in decorationDetails section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJobId,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "vendorCode": apsp_vendorcode,
          "sendProofsTo": "",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing proofRequired in decorationDetails section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_proofRequired_In_decorationDetails_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_proofRequired_In_decorationDetails_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message of add decoration detail to job with the missing Vendor in decorationDetails section.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.decorations(create_decorationSet_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    var existedDecorationSetId = data.message.decorationSetId;

    let getJobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(getJobDetailsResp);
    data = testLib.jsonparse(respInJson.data);

    lineItemCode1 = data.result.lineItems[0].itemCode;
    lineItemCode2 = data.result.lineItems[1].itemCode;

    for (var i = 0, j = 0; i <= imprintMethods.length - 1, j <= locations.length - 1; i++, j++) {

      var add_decoration_detail_to_job_params = {
        action: add_decoration_detail_to_job_action,
        "selectedLineItems": [
          lineItemCode1,
          lineItemCode2
        ],
        "newDecorationLineItems": [
          {
            "jobNumber": existedJobId,
            "vendor": apsp_vendorcode,
            "product": "",
            "qty": qty,
            "price": price,
            "cost": cost,
            "description": imprintMethods[i] + " " + color + " " + size,
            "inHandDate": futureDate_yyyy_mm_dd,
            "reqShipDate": currentDate_yyyy_mm_dd
          }
        ],
        "decorationSet": {
          "id": existedDecorationSetId,
          "affiliateId": username,
          "salesrepId": username,
          "decorationName": decorationName,
          "description": desc
        },
        "addDecorations": [
          {
            "imprintMethod": imprintMethods[i],
            "location": locations[j],
            "color": color,
            "size": size,
            "instruction": instruction,
            "artwork": "",
            "id": "artwork-id-5"
          }
        ],
        "decorationDetails": {
          "jobNumber": existedJob,
          "sendProofsTo": "",
          "proofRequired": "0",
          "decorationNotes": "",
          "decorationSetid": existedDecorationSetId
        }
      }

      let resp = await testLib.decorations(add_decoration_detail_to_job_params);
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(successCode_200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code :  " + successCode_200);

      expect(data).to.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is displayed.");

      expect('Error message').to.equal(data.error);
      console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

      expect(errorCode_400).to.equal(data.errorCode);
      console.log("\n Validated the error code : " + errorCode_400);
    };

    tc_title = 'Validated the error message of add decoration detail to job with the missing Vendor in decorationDetails section.';
    values = {
      Affiliate_user: username,
      StatusCode: successCode_200,
      Missing_Vendor_In_decorationDetails_Section_errorMsg: invalid_affiliateId_errorMsg,
      Missing_Vendor_In_decorationDetails_Section_errcode: errorCode_400
    };
  }).timeout(200000);

  /**
   * --------------------------update decoration detaials------------------------------------
   */
  // it('Validate the success message of update decoration detaials of existed decoration.', async () => {

  //   await testLib.login(username, password);

  //   let resp = await testLib.decorations(create_decorationSet_params);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);
  //   var existedDecorationSetId1 = data.message.decorationSetId;

  //   let resp = await testLib.decorations(create_decorationSet_params);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);
  //   var existedDecorationSetId2 = data.message.decorationSetId;

  //   let resp = await testLib.decorations(create_decorationSet_params);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);
  //   var existedDecorationSetId3 = data.message.decorationSetId;

  //   var lineitemsResp = await testLib.lineitems(add_lineItems_params);
  //   respInJson = testLib.jsonparse(lineitemsResp);
  //   data = testLib.jsonparse(respInJson.data);
  //   lineItemCode1 = data.newItemCodes[0]

  //   lineitemsResp = ''
  //   lineitemsResp = await testLib.lineitems(add_lineItems_params);
  //   respInJson = testLib.jsonparse(lineitemsResp);
  //   data = testLib.jsonparse(respInJson.data);
  //   lineItemCode2 = data.newItemCodes[0]

  //   var update_decoration_detail_params = {
  //     action: update_decoration_detail_action,
  //     addedLineItems: [
  //       lineItemCode1
  //     ],
  //     deletedLineItems: [
  //       lineItemCode2
  //     ],
  //     addDecorations: [
  //       {
  //         size: size,
  //         color: color,
  //         artwork: "",
  //         location: locations[3],
  //         instruction: "",
  //         imprintMethod: imprintMethods[3]
  //       }],
  //     deletedDecorations: [
  //       existedDecorationSetId2,
  //       existedDecorationSetId3 
  //     ],
  //     decorationSet: [
  //       {
  //         id: existedDecorationSetId1,
  //         size: size,
  //         color: color,
  //         artwork: "",
  //         location: locations[3],
  //         instruction: "",
  //         imprintMethod: imprintMethods[3]
  //       }],
  //     decorationDetails: {
  //       jobNumber: existedJob,
  //       vendorCode: apsp_vendorcode,
  //       sendProofsTo: "",
  //       proofRequired: "0",
  //       decorationNotes: "",
  //       decorationSetid: existedDecorationSetId1
  //     }
  //   }

  //   let updateResp = await testLib.decorations(update_decoration_detail_params);
  //   respInJson = testLib.jsonparse(updateResp);
  //   data = '';
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(respInJson).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   succMessage = data.message.message;
  //   expect(successMsg).to.have.string(succMessage);
  //   console.log("\n Validated the updated job message : " + succMessage);

  //   tc_title = 'Validated the success message of update decoration detaials of existed decoration.';
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     SuccMessage: succMessage
  //   };
  // }).timeout(200000);

  // it("Validate the error message of update decoration detaials with missed 'id' field.", async () => {

  //   await testLib.login(username, password);

  //   var update_decorator_missed_id_params = {
  //     action: update_decoration_set_action,
  //     existingDecorationSet: {
  //       decorationName: decorationName,
  //       description: desc
  //     },

  //     decorationSet: [
  //       {
  //         size: "",
  //         color: "",
  //         artwork: "",
  //         location: locations[3],
  //         instruction: "",
  //         imprintMethod: imprintMethods[3]
  //       }
  //     ]
  //   };

  //   let updateResp = await testLib.decorations(update_decorator_missed_id_params);
  //   respInJson = testLib.jsonparse(updateResp);
  //   data = '';
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(missed_empty_decorationSet_id_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + missed_empty_decorationSet_id_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = "Validated the error message of update decoration detaials with missed 'id' field.";
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     Missing_id_errorMsg: missed_empty_decorationSet_id_errorMsg,
  //     Missing_id_errorcode: errorCode_400
  //   };
  // }).timeout(200000);



  /**
   * *******************************Deffered as functionality changes******************************
   * */

  // it('Validate the error message of create decoration set with the other valid subsecquent affiliateId.', async () => {

  //   var create_decorationSet_invalid_data_params = {
  //     action: create_decoration_set_action,
  //     newDecorationSet: {
  //       affiliateId: other_affiliate,
  //       salesrepId: cj_salesrepId,
  //       decorationName: decorationName,
  //       description: desc
  //     },
  //     addDecorations: [
  //       {
  //         size: size,
  //         color: color,
  //         artwork: artwork,
  //         location: locations[4],
  //         instruction: instruction,
  //         imprintMethod: imprintMethods[2]
  //       }
  //     ]
  //   };
  //   await testLib.login(username, password);

  //   let resp = await testLib.decorations(create_decorationSet_invalid_data_params);
  //   respInJson = testLib.jsonparse(resp);
  //   var data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect('invalid_affiliateId_errorMsg').to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = 'Validated the error message of create decoration set with the other valid subsecquent affiliateId.';
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     invalid_data_errorMsg: invalid_affiliateId_errorMsg,
  //     invalid_data_errcode: errorCode_400
  //   };
  // }).timeout(200000);

  // it('Validate the error message with invalid salesRepId of Create decoraton set.', async () => {

  //   var create_decorationSet_invalid_data_params = {
  //     action: create_decoration_set_action,
  //     newDecorationSet: {
  //       decorationName: decorationName,
  //       description: desc
  //     },
  //     addDecorations: [
  //       {
  //         size: size,
  //         color: color,
  //         artwork: artwork,
  //         location: locations[4],
  //         instruction: instruction,
  //         imprintMethod: imprintMethods[2]
  //       }
  //     ]
  //   };
  //   await testLib.login(username, password);

  //   let resp = await testLib.decorations(create_decorationSet_invalid_data_params);
  //   respInJson = testLib.jsonparse(resp);
  //   var data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(invalid_salesrepId_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_salesrepId_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = 'Validated the error message with invalid salesRepId of Create decoraton set.';

  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     create_decorationSet_errorMsg: invalid_salesrepId_errorMsg,
  //     create_decorationSet_errorCode: errorCode_400
  //   };
  // }).timeout(200000);

  // it('Validate the error message with invalid affiliateId of Create decoraton set.', async () => {

  //   var create_decorationSet_invalid_data_params = {
  //     action: create_decoration_set_action,
  //     newDecorationSet: {
  //       affiliateId: invalid_data,
  //       salesrepId: cj_salesrepId,
  //       decorationName: decorationName,
  //       description: desc
  //     },
  //     addDecorations: [
  //       {
  //         size: size,
  //         color: color,
  //         artwork: artwork,
  //         location: locations[4],
  //         instruction: instruction,
  //         imprintMethod: imprintMethods[2]
  //       }
  //     ]
  //   };
  //   await testLib.login(username, password);

  //   let resp = await testLib.decorations(create_decorationSet_invalid_data_params);
  //   respInJson = testLib.jsonparse(resp);
  //   var data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(invalid_data_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_data_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = 'Validated the error message with invalid affiliateId of Create decoraton set.';

  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     invalid_data_errorMsg: invalid_data_errorMsg,
  //     invalid_data_ErrorCode: errorCode_400
  //   };
  // // }).timeout(200000);

  // it('Validate the error message of create decoration set with the valid salesRepId of other subsequent affiliate.', async () => {

  //   var create_decorationSet_invalid_data_params = {
  //     action: create_decoration_set_action,
  //     newDecorationSet: {
  //      
  //       salesrepId: other_salesrepId,
  //       decorationName: decorationName,
  //       description: desc
  //     },
  //     addDecorations: [
  //       {
  //         size: size,
  //         color: color,
  //         artwork: artwork,
  //         location: locations[4],
  //         instruction: instruction,
  //         imprintMethod: imprintMethods[2]
  //       }
  //     ]
  //   };
  //   await testLib.login(username, password);

  //   let resp = await testLib.decorations(create_decorationSet_invalid_data_params);
  //   respInJson = testLib.jsonparse(resp);
  //   var data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect('invalid_salesrepId_errorMsg').to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_salesrepId_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = 'Validated the error message of create decoration set with the valid salesRepId of other subsequent affiliate.';
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     invalid_salesrepId_errorMsg: invalid_salesrepId_errorMsg,
  //     invalid_data_errcode: errorCode_400
  //   };
  // }).timeout(200000);
});