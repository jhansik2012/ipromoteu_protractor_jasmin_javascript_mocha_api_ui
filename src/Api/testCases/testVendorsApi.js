describe('Vendors Apis validations .......', () => {

  var sqlQuery;

  it('Validate the success message of Get vendor details..', async () => {

    await testLib.login(username, password);

    let resp = await testLib.vendors({
      action: gv_action,
      vendorCode: ipro_vendorcode
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var act_vendorcode = data.result.vendorCode;
    expect(ipro_vendorcode).to.equal(act_vendorcode);
    console.log("\n Validated vendorcode :  " + ipro_vendorcode);

    tc_title = 'Validated the success message of Get vendor details.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      ipro_vendorcode: ipro_vendorcode,
      act_vendorCode: act_vendorcode
    };
  }).timeout(200000);

  it('Validate the error message with invalid vendorcode.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.vendors({
      action: gv_action,
      vendorCode: invalid_data
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_vendor_errorMsg1).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_vendor_errorMsg1);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with invalid vendorcode.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_vendorcode_errorMsg: invalid_vendor_errorMsg1,
      Invalid_vendorCode_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message without action filter.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.vendors({
      vendorCode: ipro_vendorcode
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

    tc_title = 'Validated the error message without action filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message without vendorCode filter.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.vendors({
      action: gv_action
    });
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(misses_vendorcode_to_get_vendor_info_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + misses_vendorcode_to_get_vendor_info_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message without vendorCode filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missed_vendor_errorMsg: misses_vendorcode_to_get_vendor_info_errorMsg,
      Missed_vendor_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the success message of get 'list of vendor invoices' for a given job.", async () => {

    await testLib.login(username, password);

    let listJobsResp = await testLib.listJobs({
      status: jobStatusFilters[4]
    })
    respInJson = testLib.jsonparse(listJobsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      invoicedJobId = jobs[0].jobId;

    expect(jobStatusFilters[4]).to.equal(jobs[0].jobStatus);
    console.log("\n Validated the job status :  " + jobStatusFilters[4]);

    let vendorsResp = await testLib.vendors({
      action: list_vendor_invoice_action,
      jobId: invoicedJobId
    });
    respInJson = testLib.jsonparse(vendorsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    result = data.result;
    var i,
      resLength = (data.result).length;

    thiscount = data.thisCount;
    expect(resLength).to.equal(thiscount);
    console.log("\n vendors list count :  " + resLength)

    if (resLength > 0) {

      for (i = 0; i < resLength - 1; i++) {

        expect(result[i]).to.have.haveOwnProperty('ap_seq');
        console.log("\n Validated the 'ap_seq' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('id');
        console.log("\n Validated the 'id' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('file_id');
        console.log("\n Validated the 'file_id' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('file_name');
        console.log("\n Validated the 'file_name' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('vendor');
        console.log("\n Validated the 'vendor' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('invoice_amount');
        console.log("\n Validated the 'invoice_amount' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('invoice_number');
        console.log("\n Validated the 'invoice_number' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('purchase_date');
        console.log("\n Validated the 'purchase_date' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('invoice_date');
        console.log("\n Validated the 'invoice_date' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('vouchedTime');
        console.log("\n Validated the 'vouchedTime' is displayed.");

        expect(result[i]).to.have.haveOwnProperty('xebra_order');
        console.log("\n Validated the 'xebra_order' is displayed.");
      }
    }

    tc_title = "Validated the success message of get 'list of vendor invoices' for a given job.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      thiscount: thiscount
    };
  }).timeout(200000);
 
  it("Validate the error message with empty jobId of get 'list of vendor invoices'.", async () => {

    await testLib.login(username, password);

       let vendorsResp = await testLib.vendors({
      action: list_vendor_invoice_action,
      jobId: ''
    });
    respInJson = testLib.jsonparse(vendorsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_jobId_errorMsg2).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_jobId_errorMsg2);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with empty jobId of get 'list of vendor invoices'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Empty_jobid_errorMsg: missed_jobId_errorMsg2,
      Empty_jobid_errorCode: errorCode_400
    };
  }).timeout(200000);

  
  it("Validate the error message with missed jobId of get 'list of vendor invoices'.", async () => {

    await testLib.login(username, password);

       let vendorsResp = await testLib.vendors({
      action: list_vendor_invoice_action
    });
    respInJson = testLib.jsonparse(vendorsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_jobId_errorMsg2).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_jobId_errorMsg2);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with missed jobId of get 'list of vendor invoices'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missed_jobId_errorMsg: missed_jobId_errorMsg2,
      Missed_jobId_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with missed action field of get 'list of vendor invoices'.", async () => {

    await testLib.login(username, password);

    let resp = await testLib.vendors({
      jobId: existedJob
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

    tc_title = "Validated the error message with missed action field of get 'list of vendor invoices'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missing_action_errorMsg: missing_action_errorMsg,
      Missing_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Get all vendors list which are returned from database.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getPaginatedVendorList({
      action: list_vendor_action
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    thiscount = data.thisCount;
    expect(data.result.length).to.equal(thiscount);
    console.log("\n Validated thisCount :  " + thiscount);

    /*
    ====================Database connection and execute the query========================
    */
    sqlQuery = `SELECT COUNT(*) as totalCount FROM vendor_ordering`;
    var con = mysql.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDatabase
    });

    con.connect();
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      result = testLib.jsonparse(result);
      var dbTotalCount = result[0].totalCount

      expect(dbTotalCount).to.equal(thiscount);
      console.log("\n Validated totalCount :  " + thiscount + " is equal to vendors totalCount in database.");
    });

    con.end();

    tc_title = 'Get all vendors list which are returned from database.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      ThisCount: thiscount,
      TotalCount: thiscount
    };
  }).timeout(200000);

  it('Get first 100 entries, also fetch total vendors which are returned in database.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getPaginatedVendorList({
      action: list_vendor_action,
      getTotal: 1,
      limit: 100
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    result = data.result;
    var resultsLength = result.length;

    thiscount = data.thisCount;
    expect(thiscount).to.equal(resultsLength);
    console.log("\n Validated thisCount :  " + resultsLength);

    var totalcount = data.totalCount[0].totalCount;

    /*
    ====================Database connection and execute the query========================
    */
    sqlQuery = `SELECT COUNT(*) as totalCount FROM vendor_ordering`;
    var con = mysql.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDatabase
    });

    con.connect();
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      result = testLib.jsonparse(result);
      var dbTotalCount = result[0].totalCount
      expect(dbTotalCount).to.equal(totalcount);
      console.log("\n Validated totalCount :  " + totalcount + " is equal to vendors totalCount in database.");
    });

    con.end();

    tc_title = 'Get first 100 entries, also fetch total vendors which are returned from database.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      ThisCount: thiscount,
      TotalCount: totalcount
    };
  }).timeout(200000);

  it('Validate 100 entries after skipping 4000 and 4000th vendor code and name which are returned in database.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getPaginatedVendorList({
      action: list_vendor_action,
      offset: 4000,
      limit: 100
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    result = data.result;
    var resultsLength = result.length;
    thiscount = data.thisCount;

    expect(thiscount).to.equal(resultsLength);
    console.log("\n Validated thisCount :  " + resultsLength);

    var exp_vendor_Code = data.result[0].code,
      exp_vendor_name = data.result[0].name;

    /*
   ====================Database connection and execute the query========================
   */
    sqlQuery = `SELECT vendor_code AS code, company_name AS name FROM vendor_ordering limit 4000, 1`;

    var con = mysql.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlPassword,
      database: mysqlDatabase
    });

    con.connect();
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      result = testLib.jsonparse(result);

      var act_vendor_code = result[0].code,
        act_vendor_name = result[0].name;

      expect(exp_vendor_Code).to.equal(act_vendor_code);
      console.log("\n Validated the 4001th vendor code :  " + act_vendor_code);

      expect(exp_vendor_name).to.equal(act_vendor_name);
      console.log("\n Validated the 4001th vendor name :  " + act_vendor_name);
    });

    con.end();

    tc_title = 'Validated 100 entries after skipping 4000 and 4000th vendor code and name which are returned in database.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      exp_ThisCount: thiscount,
      VendorCode: exp_vendor_Code,
      vendorName: exp_vendor_name
    };
  }).timeout(200000);

  it('validate the error message without action filter', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getPaginatedVendorList({
      offset: 4000,
      limit: 100
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message without action filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_itemCode_errorMsg: missing_action_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

//*************************************Drepricated*********************************************

  // it("Validate the error message with invalid jobId of get 'list of vendor invoices'.", async () => {

  //   await testLib.login(username, password);

  //      let vendorsResp = await testLib.vendors({
  //     action: list_vendor_invoice_action,
  //     jobId: invalid_data
  //   });
  //   respInJson = testLib.jsonparse(vendorsResp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(invalid_jobId_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_jobId_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = "Validated the error message with invalid jobId of get 'list of vendor invoices'.";
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     Invalid_jobId_errorMessage: invalid_jobId_errorMsg,
  //     Invalid_jobId_errorCode: errorCode_400
  //   };
  // }).timeout(200000);
//***********************************Depricated****************************//
});