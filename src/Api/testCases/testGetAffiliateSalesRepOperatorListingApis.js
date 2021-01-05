describe('Get affiliate, SalesRep, and Operator Listing Apis validations .......', () => {

    it('Validate the success message of get affiliate details with admin user.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: get_affiliate_action
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result[0]).to.have.haveOwnProperty('affiliateId');
        console.log("\n Validated the 'affiliateId' is displayed.");

        expect(data.result[0]).to.have.haveOwnProperty('affiliateCompany');
        console.log("\n Validated the 'affiliateCompany' is displayed.");

        tc_title = 'Validate the success message of get affiliate details with admin user.';
        values = {
            Affiliate_user: adminUsername,
            statusCode: successCode_200,

        };
    }).timeout(200000);

    it('Validate the get affiliate error message with missed action query parameter.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing();
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missing_action_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_action_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the get affiliateId error message with missed action query parameter.';
        values = {
            Affiliate_user: adminUsername,
            statusCode: successCode_200,
            missed_action_field_errorMsg: missing_action_errorMsg,
            missed_action_field_errorcode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the success message of Get SalesRep Listing with IPU Admin, and affiliateId.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_salesrep_action,
            affiliateId: krcUsername
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);
        result= testLib.jsonparse(data.result);
        var resultLength = result.length

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(result[0]).to.have.haveOwnProperty('salesrepId');
        console.log("\n Validated the 'salesrepId' is displayed.");

        expect(result[0]).to.have.haveOwnProperty('salesrepName');
        console.log("\n Validated the 'salesrepName' is displayed.");

        tc_title = 'Validated the success message of Get SalesRep Listing with IPU Admin, and affiliateId.';
        values = {
            Login_user: adminUsername,
            statusCode: successCode_200,
            affiliateId: username
        };
    }).timeout(200000);

    it('Validate the success message of Get SalesRep Listing with affiliateId.', async () => {

        await testLib.login(username, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_salesrep_action,
            affiliateId: username
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);
        result= testLib.jsonparse(data.result);
        var resultLength= result.length

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        if(resultLength>0){       
        expect(result[0]).to.have.haveOwnProperty('salesrepId');
        console.log("\n Validated the 'salesrepId' is displayed.");

        expect(result[0]).to.have.haveOwnProperty('salesrepName');
        console.log("\n Validated the 'salesrepName' is displayed.");
       }
       else console.log("\n Recieved an empty list");

        tc_title = 'Validated the success message of Get SalesRep Listing with affiliateId.';
        values = {
            Login_user: username,
            statusCode: successCode_200,
            affiliateId: username
        };
    }).timeout(200000);

    it('Validate the success message of Get SalesRep Listing with IPU Admin and salseRep.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_salesrep_action,
            affiliateId: cj_salesrepId
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);
        result= testLib.jsonparse(data.result);
        var resultLength= result.length

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");
        
        if(resultLength>0){

        expect(result[0]).to.have.haveOwnProperty('salesrepId');
        console.log("\n Validated the 'salesrepId' is displayed.");

        expect(result[0]).to.have.haveOwnProperty('salesrepName');
        console.log("\n Validated the 'salesrepName' is displayed.");

       }
        else console.log("\n Recieved an empty list");

        tc_title = 'Validate the success message of Get SalesRep Listing with IPU Admin and salseRep.';
        values = {
            Login_user: adminUsername,
            statusCode: successCode_200,
            salesRepId: cj_salesrepId
        };
    }).timeout(200000);

    it('Validate the success message of Get SalesRep Listing with affiliate user and salseRep.', async () => {

        await testLib.login(username, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_salesrep_action,
            affiliateId: username
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);
        result= testLib.jsonparse(data.result);
        var resultLength= result.length

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");
        
        if(resultLength>0){

        expect(result[0]).to.have.haveOwnProperty('salesrepId');
        console.log("\n Validated the 'salesrepId' is displayed.");

        expect(result[0]).to.have.haveOwnProperty('salesrepName');
        console.log("\n Validated the 'salesrepName' is displayed.");

       }
        else console.log("\n Recieved an empty list");

        tc_title = 'Validate the success message of Get SalesRep Listing with IPU Admin and salseRep.';
        values = {
            Login_user: username,
            statusCode: successCode_200,
            salesRepId: cj_salesrepId
        };
    }).timeout(200000);

    it('Validate the Get SalesRep Listing error message with missed action field.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            affiliateId: cj_salesrepId
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missing_action_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_action_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the Get SalesRep Listing error message with missed action field.';
        values = {
            Affiliate_user: adminUsername,
            statusCode: successCode_200,
            missed_action_field_errorMsg: missing_action_errorMsg,
            missed_action_field_errorcode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the Get SalesRep Listing error message with called by IPU-Admin and missed affiliateID field.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_salesrep_action
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missing_affiliateID_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_affiliateID_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the Get SalesRep Listing error message with called by IPU-Admin and missed affiliateID field.';
        values = {
            Affiliate_user: adminUsername,
            statusCode: successCode_200,
            missed_affiliateID_field_errorMsg: missing_affiliateID_errorMsg,
            missed_affiliateID_field_errorcode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the Get SalesRep Listing success message with called by affiliate user and missed affiliateID field.', async () => {

        await testLib.login(username, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_salesrep_action
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result[0]).to.have.haveOwnProperty('salesrepId');
        console.log("\n Validated the 'salesrepId' is displayed.");

        expect(data.result[0]).to.have.haveOwnProperty('salesrepName');
        console.log("\n Validated the 'salesrepName' is displayed.");

        tc_title = 'Validate the Get SalesRep Listing success message with called by user and missed affiliateID field.';
        values = {
            Login_user: username,
            statusCode: successCode_200,
            affiliateId: username
        };
    }).timeout(200000);

    it('Validate the success message of Get Operator Listing with IPU-Admin, and affiliateId.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_operator_action,
            affiliateId: krcUsername
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result[0]).to.have.haveOwnProperty('operator');
        console.log("\n Validated the 'operator' is displayed.");

        expect(krcUsername).to.equal(data.result[0].operator);
        console.log("\n Validated the 'operator' is : " + krcUsername);

        expect(data.result[0]).to.have.haveOwnProperty('operatorName');
        console.log("\n Validated the 'operatorName' is displayed.");

        expect(krcOperatorName).to.equal(data.result[0].operatorName);
        console.log("\n Validated the 'operator' is : " + krcUsername);

        tc_title = 'Validated the success message of Get Operator Listing with IPU-Admin, and affiliateId.';
        values = {
            Login_user: adminUsername,
            statusCode: successCode_200,
            affiliateId: krcUsername,
            OperatorName: krcOperatorName
        };
    }).timeout(200000);

    it('Validate the success message of Get Operator Listing with IPU-Admin, and invalid affiliateId.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_operator_action,
            affiliateId: invalid_data
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        var resultsLength = (data.result).length;
        expect(0).to.equal(resultsLength);
        console.log("\n Validated the operators list is not available.");

        expect(0).to.equal(data.thisCount);
        console.log("\n Validated the thisCount = 0.");

        tc_title = 'Validated the success message of Get Operator Listing with IPU-Admin, and invalid affiliateId.';
        values = {
            Login_user: adminUsername,
            statusCode: successCode_200,
            affiliateId: invalid_data,
            operatorsListCount: 0
        };
    }).timeout(200000);

    it('Validate the success message of Get Operator Listing with IPU-Admin, and empty affiliateId.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_operator_action,
            affiliateId: ''
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(invalid_affiliateId_errorMsg2).to.equal(data.error);
        console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg2);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the error message of Get Operator Listing with IPU-Admin, and empty affiliateId.';
        values = {
            Affiliate_user: adminUsername,
            statusCode: successCode_200,
            Empty_affiliateId_errorMsg: invalid_affiliateId_errorMsg2,
            Empty_affiliateId_errorcode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the success message of Get Operator Listing with affiliate user and same affiliateId.', async () => {

        await testLib.login(username, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_operator_action,
            affiliateId: username
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result[0]).to.have.haveOwnProperty('operator');
        console.log("\n Validated the 'operator' is displayed.");

        expect(username).to.equal(data.result[0].operator);
        console.log("\n Validated the 'operator' is : " + username);

        expect(data.result[0]).to.have.haveOwnProperty('operatorName');
        console.log("\n Validated the 'operatorName' is displayed.");

        expect(operatorName).to.equal(data.result[0].operatorName);
        console.log("\n Validated the 'operator' is : " + operatorName);

        tc_title = 'Validated the success message of Get Operator Listing with affiliate user and same affiliateId.';
        values = {
            Login_user: username,
            statusCode: successCode_200,
            affiliateId: username,
            OperatorName: operatorName,
        };
    }).timeout(200000);

    it('Validate the error message of Get Operator Listing with affiliate user and other affiliateId.', async () => {

        await testLib.login(username, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_operator_action,
            affiliateId: krcUsername
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result[0]).to.have.haveOwnProperty('operator');
        console.log("\n Validated the 'operator' is displayed.");

        expect(username).to.equal(data.result[0].operator);
        console.log("\n Validated the 'operator' is : " + username);

        expect(data.result[0]).to.have.haveOwnProperty('operatorName');
        console.log("\n Validated the 'operatorName' is displayed.");

        expect(operatorName).to.equal(data.result[0].operatorName);
        console.log("\n Validated the 'operator' is : " + operatorName);

        tc_title = 'Validated the error message of Get Operator Listing with affiliate user and affiliateId.';
        values = {
            Login_user: username,
            statusCode: successCode_200,
            affiliateId: krcUsername,
            OperatorName: operatorName
        };
    }).timeout(200000);

    it('Validate the error message of Get Operator Listing with IPU-Admin, and without affiliateId.', async () => {

        await testLib.login(adminUsername, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_operator_action
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(enter_valid_affliateId_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_affiliateID_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the error message of Get Operator Listing with IPU-Admin, and without affiliateId.';
        values = {
            Affiliate_user: adminUsername,
            statusCode: successCode_200,
            missed_affiliateID_field_errorMsg: missing_affiliateID_errorMsg,
            missed_affiliateID_field_errorcode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the error message of Get Operator Listing with affiliate user, and without affiliateId.', async () => {

        await testLib.login(username, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            action: list_operator_action
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result[0]).to.have.haveOwnProperty('operator');
        console.log("\n Validated the 'operator' is displayed.");

        expect(username).to.equal(data.result[0].operator);
        console.log("\n Validated the 'operator' is : " + username);

        expect(data.result[0]).to.have.haveOwnProperty('operatorName');
        console.log("\n Validated the 'operatorName' is displayed.");

        expect(operatorName).to.equal(data.result[0].operatorName);
        console.log("\n Validated the 'operator' is : " + operatorName);

        tc_title = 'Validated the error message of Get Operator Listing with affiliate user, and without affiliateId.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missed_affiliateID_field_errorMsg: missing_affiliateID_errorMsg,
            missed_affiliateID_field_errorcode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the error message of Get Operator Listing with missed action filter.', async () => {

        await testLib.login(username, password);

        let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
            affiliateId: krcUsername
        });
        respInJson = testLib.jsonparse(affiliate_list_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missing_action_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_action_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validate the error message of Get Operator Listing with missed action filter.';
        values = {
            Affiliate_user: adminUsername,
            statusCode: successCode_200,
            missed_action_field_errorMsg: missing_action_errorMsg,
            missed_action_field_errorcode: errorCode_400
        };
    }).timeout(200000);


    /**
      *   *********************   This test case is deprecated  *********************
      */

    // it('Validate the error message of get affiliate list with affiliate id.', async () => {

    //     await testLib.login(username, password);

    //     let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
    //         action: get_affiliate_action
    //     });
    //     respInJson = testLib.jsonparse(affiliate_list_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     expect(successCode_200).to.equal(respInJson.statusCode);
    //     console.log("\n Validated the status code :  " + successCode_200);

    //     expect(respInJson).to.have.haveOwnProperty('error');
    //     console.log("\n Validated the 'error' is displayed.");

    //     expect(invalid_affiliateId_errorMsg1).to.equal(data.error);
    //     console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg1);

    //     expect(errorCode_400).to.equal(data.errorCode);
    //     console.log("\n Validated the error code : " + errorCode_400);

    //     tc_title = 'Validated the error message of get affiliate list with affiliate id';
    //     values = {
    //       Affiliate_user: username,
    //       statusCode: successCode_200,
    //       invalid_affiliateId_errorMsg: invalid_affiliateId_errorMsg1,
    //       Invalid_affiliatedId_errorCode: errorCode_400
    //     };
    // }).timeout(200000);

    // it('Validate the error message of get affiliate list with salesRep.', async () => {

    //     await testLib.login(cj_salesrepId, password);

    //     let affiliate_list_resp = await testLib.getAffiliateSalesRepAndOperatorListing({
    //         action: get_affiliate_action
    //     });
    //     respInJson = testLib.jsonparse(affiliate_list_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     expect(successCode_200).to.equal(respInJson.statusCode);
    //     console.log("\n Validated the status code :  " + successCode_200);

    //     expect(respInJson).to.have.haveOwnProperty('error');
    //     console.log("\n Validated the 'error' is displayed.");

    //     expect(invalid_affiliateId_errorMsg1).to.equal(data.error);
    //     console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg1);

    //     expect(errorCode_400).to.equal(data.errorCode);
    //     console.log("\n Validated the error code : " + errorCode_400);

    //     tc_title = 'Validated the error message of get affiliate list with salesRep';
    //     values = {
    //       Affiliate_user: username,
    //       statusCode: successCode_200,
    //       invalid_affiliateId_errorMsg: invalid_affiliateId_errorMsg1,
    //       Invalid_affiliatedId_errorCode: errorCode_400
    //     };
    // }).timeout(200000);
});