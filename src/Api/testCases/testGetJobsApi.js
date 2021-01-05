const { assert } = require("chai");

describe('GetJobs Api validations .......', () => {

  var count = 10;

  it('Get Jobs list without filter.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.listJobs({
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    thiscount = data.thisCount;

    var jobs = data.result.jobs,
      jobslength = jobs.length;

    expect(thiscount).to.equal(jobslength);
    console.log("\n Validated the thisCount :  " + count);
    var flag = false;
    if (jobslength <= 10000) {
      flag = true;
      assert.equal(flag, true);
      console.log("\n Jobs count is lessthan or equal to 10000.");
    }
    else {
      assert.fail("\n Jobs count is greatethan 10000");
    }

    tc_title = 'Get Jobs list without filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      thiscount: thiscount
    };
  }).timeout(200000);

  it('Get Jobs list of limit 10 filter', async () => {

    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      limit: count
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    thiscount = data.thisCount;
    expect(thiscount).to.equal(count);
    console.log("\n Validated the thisCount :  " + count);

    var jobs = data.result.jobs,
      jobslength = jobs.length;
    expect(jobslength).to.equal(count);
    console.log("\n Jobs count :  " + count)

    tc_title = 'Get Jobs list on limit 10 filter';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      thiscount: thiscount
    };
  }).timeout(200000);

  jobStatusFilters.forEach(filter => {
    it("Get Jobs list on status filters : " + filter, async () => {

      testLib.log(`Logging in as ${username} : ${password} ... `);
      await testLib.login(username, password);

      let resp = await testLib.listJobs({
        status: filter
      })
      respInJson = testLib.jsonparse(resp);
      data = testLib.jsonparse(respInJson.data);

      expect(200).to.equal(respInJson.statusCode);
      console.log("\n Validated the status code : 200");

      expect(respInJson).to.not.have.haveOwnProperty('error');
      console.log("\n Validated the 'error' is not displayed.");

      var jobs = data.result.jobs,
        jobslength = jobs.length,
        i,
        expFilter;
      if (jobslength > 0) {
        for (i = 0; i <= jobslength - 1; i++) {
          jobstatus = data.result.jobs[i].jobStatus;

          switch (filter) {

            case '0':
            case 'New':
              expFilter = expJobStatusFilters[0];
              break;

            case '2':
            case 'In-Process':
              expFilter = expJobStatusFilters[1];
              break;

            case '3':
            case 'Pending-Vendor-Invoice':
              expFilter = expJobStatusFilters[2];
              break;

            case '4':
            case 'Invoiced':
              expFilter = expJobStatusFilters[3];
              break;

            case '5':
            case 'Paid':
              expFilter = expJobStatusFilters[4];
              break;

            case '6':
            case 'In-Inventory':
              expFilter = expJobStatusFilters[5];
              break;

            case '7':
            case 'Rejected':
              expFilter = expJobStatusFilters[6];
              break;

            case '10':
            case 'Drafted':
              expFilter = expJobStatusFilters[7];
              break;

            default:
              jobstatus = 'Filters are not valid.'
              assert.fail;
          };
          expect(jobstatus).to.equal(expFilter);
        };
      }
      else if (jobslength == 0) {
        jobstatus = "Jobs are not available with '" + filter + "' filter.";
      }
      else {
        assert.fail;
      }

      tc_title = "Get Jobs list on status filter :'" + filter + "'";
      values = {
        Affiliate_user: username,
        statusCode: successCode_200,
        exp_Filter: filter,
        jobStatus: jobstatus
      };

    }).timeout(200000);
  });

  it("Validate the job details of given jobId.", async () => {

    await testLib.login(username, password);

    let resp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result.jobId).to.equal(existedJob);
    console.log("Validated '" + existedJobId + "' Job details.\n\n");

    tc_title = "Validate the job details of given jobId :'" + existedJob + "'";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      jobId: existedJob
    };

  }).timeout(200000);

  it("Get Job details with invalid jobId ", async () => {
    await testLib.login(username, password);

    var invalid_data = '2221623XXX';
    let resp = await testLib.getJobDetails(invalid_data);
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var totalLineItems = data.result.thisTotalLineItems

    expect(0).to.equal(totalLineItems);
    console.log("\n Validated 'thisTotalLineItems' = " + totalLineItems);

    tc_title = "Get Job details of invalid jobId '" + invalid_data + "'";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_data: invalid_data,
      thisTotalLineItems: totalLineItems
    };

  }).timeout(200000);

  it("Get Jobs List on customerId filter ", async () => {
    await testLib.login(username, password);

    var custid = 1643;
    let resp = await testLib.listJobs({
      customerId: 1643
    })

    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i,
      customerid;
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        customerid = data.result.jobs[i].customerId;
        expect(parseInt(customerid)).to.equal(custid);
      }
      console.log("Validated customerId = " + custid);
    }

    tc_title = "Get Jobs List on customerId filter";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      customerId: customerid
    };

  }).timeout(200000);

  it("Get Jobs List on salesRep filter ", async () => {
    await testLib.login(username, password);

    var salesRep = 'AAA';
    let resp = await testLib.listJobs({
      salesrepId: 'AAA'
    })
    respInJson = testLib.jsonparse(resp);
    var data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i,
      sRep;
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        sRep = data.result.jobs[i].salesRep;
        expect(sRep).to.equal(salesRep);
      }
      console.log("Validated salesRep = " + salesRep);
    }

    tc_title = "Get Jobs List on salesRep filter";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      salesRepId: sRep
    };

  }).timeout(200000);

  it("Retrieve jobs List on affiliateId filter. ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      affiliateId: username
    })

    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);
    jobs = data.result.jobs;
    jobs = jobs.length;

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    thiscount = data.thisCount;
    expect(thiscount).to.equal(jobs);
    console.log("\n Jobs count :  " + thiscount)

    tc_title = 'Retrieved jobs List on affiliateId filter';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      thiscount: thiscount
    };

  }).timeout(200000);

  it("Retrieve jobs List on affiliateId filter. ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      affiliateId: username
    })

    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);
    jobs = data.result.jobs;
    jobs = jobs.length;

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    thiscount = data.thisCount;
    expect(thiscount).to.equal(jobs);
    console.log("\n Jobs count :  " + thiscount)

    tc_title = 'Retrieved jobs List on affiliateId filter';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      thiscount: thiscount
    };

  }).timeout(200000);

  it("Retrieve jobs List with affiliateId filter. ", async () => {
    await testLib.login(adminUsername, adminPassword);

    let resp = await testLib.listJobs({
      affiliateId: krcUsername,
      limit: count
    })

    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);
    jobs = data.result.jobs;

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(jobs[0].jobId).to.have.string(krcUsername);
    console.log("\n JobId contains :  " + krcUsername)

    thiscount = data.thisCount
    expect(thiscount).to.equal(jobs.length);
    console.log("\n Jobs count :  " + thiscount)

    tc_title = 'Retrieve jobs List with affiliateId filter.';
    values = {
      AdminUsername: adminUsername,
      StatusCode: successCode_200,
      Affiliate_user: krcUsername,
      Thiscount: thiscount
    };

  }).timeout(200000);

  it("Retrieve the Jobs list on keyword filter. ", async () => {
    await testLib.login(username, password);

    var jobTitle = 'large t-shirt';
    let resp = await testLib.listJobs({
      keywords: jobTitle
    })
    respInJson = testLib.jsonparse(resp);
    var data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    jobs = data.result.jobs;
    var jobslength = jobs.length,
      i,
      jobttl;
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        jobttl = data.result.jobs[i].jobTitle;
        expect(jobTitle).to.contains(jobttl);
      }
      console.log("Validated jobTitle = " + jobTitle);
    }

    tc_title = "Retrieved the Jobs list on keyword filter. ";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      jobTitle: jobttl
    };

  }).timeout(200000);

  it("Retrieve the Jobs List with vendorCode filter.", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      vendorCode: ipro_vendorcode
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length;

    var i = 0,
      j = 0,
      k = 0,
      vendorcode;
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        var puchageorders = data.result.jobs[i].purchaseOrders,
          puchageordersLength = puchageorders.length;
        if (puchageordersLength > 0) {
          for (j = 0; j <= puchageordersLength - 1; j++) {
            var poVendorinfo = data.result.jobs[i].purchaseOrders[j],
              poVendorinfoLength = poVendorinfo.length;
            if (poVendorinfoLength > 0) {
              for (k = 0; k <= poVendorinfoLength - 1; k++) {
                vendorcode = data.result.jobs[i].purchaseOrders[j].poVendorInfo[k].code;
                console.log("vendor code = " + vendorcode);
                expect(ipro_vendorcode).to.equal(vendorcode);
              }
            }
            else {
              break;
            }
          }
        }
        else {
          break;
        }
      }
      console.log("Validated vendor code = " + ipro_vendorcode);
    }

    tc_title = "Retrieved the Jobs List with vendorCode filter.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      vendorCode: vendorcode
    };

  }).timeout(200000);

  it("Get Jobs list with out filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({})

    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length;
    thiscount = data.thisCount;

    assert(jobslength <= 10000, 'Less or equal to 10000 jobs are not displayed');
    console.log("Validated the number of jobs are less or equal to 10000 are displayed.\n\n");

    expect(jobslength).to.equal(data.thisCount);
    console.log("Validated number of displayed jobs are same as the 'thiscount' value.\n\n");

    tc_title = "Validated the number of jobs are less or equal to 10000 are displayed of 'get jobs' with no filter";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      JobsLength: jobslength,
      ThisCount: thiscount
    };

  }).timeout(200000);

  it("Get Jobs list on stats 1 filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      getStats: 1
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result).to.have.haveOwnProperty('stats');
    console.log("\n Validated 'stats' is displayed.");

    tc_title = "Get Jobs list on stats 1 filter";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      stats_filter: 1
    };

  }).timeout(200000);

  it("Get Jobs list on offset = 120 and limit=20 filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      limit: 20,
      offset: 120
    })

    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs;
    thiscount = data.thisCount;
    expect(jobs.length).to.equal(thiscount);
    console.log("Validated number of displayed jobs are same as the 'thiscount' value.\n\n");

    tc_title = "Get Jobs list on offset = 120 and limit=20 filter";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      thisCount: thiscount
    };

  }).timeout(200000);

  it("Get Jobs list on fromOrderDate, toOrderDate filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      limit: count,
      fromOrderDate: from_OrderDate,
      toOrderDate: to_OrderDate
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i = 0,
      flag,
      act_createdDate;

    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        act_createdDate = data.result.jobs[i].createdDate;
        if (act_createdDate >= from_OrderDate || act_createdDate <= to_OrderDate) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      expect(true).to.equal((flag))
    }
    console.log("Validated 'jobs are displayed in between fromOrderDate, toOrderDate'");

    tc_title = "Get Jobs list on fromOrderDate, toOrderDate filter";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      from_orderDate: from_OrderDate,
      to_orderDate: to_OrderDate,
      jobs_OrderDate: act_createdDate
    };

  }).timeout(200000);

  it("Get Jobs list on fromOrderDate, toOrderDate, and status as 'Paid' filter ", async () => {
    await testLib.login(username, password);

    var jstatus = 'Paid';

    let resp = await testLib.listJobs({
      limit: count,
      fromOrderDate: from_OrderDate,
      toOrderDate: to_OrderDate,
      status: 5
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i = 0,
      flag,
      act_createdDate;
    thiscount = data.thisCount;
    expect(jobslength).to.equal(thiscount);
    console.log("Validated number of displayed jobs are same as the 'thiscount' value.\n\n");
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        act_createdDate = data.result.jobs[i].createdDate;
        jobstatus = data.result.jobs[i].jobStatus;
        expect(jobstatus).to.equal(jstatus);
        if (act_createdDate >= from_OrderDate || act_createdDate <= to_OrderDate || jobstatus.equal(jstatus)) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      expect(true).to.equal((flag))
    }
    console.log("Validated 'jobs are displayed in between fromOrderDate, toOrderDate, status.'");

    tc_title = "Get Jobs list on fromOrderDate, toOrderDate, status filter";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      from_orderDate: from_OrderDate,
      to_orderDate: to_OrderDate,
      jobs_OrderDate: act_createdDate,
      status: jstatus,
      thisCount: thiscount
    };

  }).timeout(200000);

  it("Get Jobs list on fromReqShipDate, toReqShipDate filter ", async () => {
    await testLib.login(username, password);

    var fromReqShipDate = '2020-01-01',
      toReqShipDate = '2020-03-30';

    let resp = await testLib.listJobs({
      limit: count,
      fromReqShipDate: '2020-01-01',
      toReqShipDate: '2020-03-30'
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i = 0,
      flag,
      act_reqShipDate;

    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        act_reqShipDate = data.result.jobs[i].reqShipDate;
        if (act_reqShipDate >= fromReqShipDate || act_reqShipDate <= toReqShipDate) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      expect(true).to.equal((flag))
    }
    console.log("Validated 'jobs are displayed in between fromReqShipDate, toReqShipDate'");

    tc_title = "Get Jobs list on fromReqShipDate, toReqShipDate filter";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      from_ReqShipDate: fromReqShipDate,
      to_ReqShipDate: toReqShipDate,
      jobs_ReqShipDate: act_reqShipDate
    };

  }).timeout(200000);

  it("Get Jobs list on sort_by: jobId.desc filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      limit: count,
      sort_by: 'jobId.desc'
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i = 0,
      jobIds = [],
      act_jobId,
      flag;
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        act_jobId = data.result.jobs[i].jobId;
        jobIds[i] = [act_jobId];
      }
    }
    for (i = 0; i < jobslength - 1; i++) {
      if (jobIds[i] >= jobIds[i + 1]) {
        flag = true;
      } else {
        flag = false;
        break;
      }
    }
    expect(true).to.equal((flag))
    console.log("Validated 'the jobs are displayed which are sorted by jobId in descending order'");

    tc_title = "Get Jobs list on sort_by: jobId.desc filter ";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      sort_by: 'jobId.desc',
      sort_order: 'jobId is sorted by descending order',
    };
  }).timeout(200000);

  // it.skip("Get Jobs list on sort_by: jobId filter ", async () => {
  //   testLib.log(`Logging in as ${username} : ${password} ... `);
  //   await testLib.login(username, password);

  //   let resp = await testLib.listJobs({
  //     limit: count,
  //     sort_by: 'jobId'
  //   })
  //   respInJson = testLib.jsonparse(resp);
  //     data = respInJson.data;
  //   data = testLib.jsonparse(data);

  //   expect(200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code : 200");

  //   expect(respInJson).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   var jobs = data.result.jobs,
  //     jobslength = jobs.length,
  //     i = 0,
  //     jobIds = [],
  //     act_jobId,
  //     flag;
  //   if (jobslength > 0) {
  //     for (i = 0; i <= jobslength - 1; i++) {
  //       act_jobId = data.result.jobs[i].jobId;
  //       jobIds[i] = [act_jobId];
  //     }
  //   }
  //   for (i = 0; i < jobslength - 1; i++) {
  //     if (jobIds[i] <= jobIds[i + 1]) {
  //       flag = true;
  //     } else {
  //       flag = false;
  //       break;
  //     }
  //   }
  //   expect(true).to.equal((flag))
  //   console.log("Validated 'the jobs are displayed which are sorted by jobId in ascending order'");

  //   tc_title = "Get Jobs list on sort_by: jobId filter ";
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     sort_by: 'jobId',
  //     sort_order: 'jobIdis sorted by ascending order',
  //   };
  // }).timeout(200000);

  it("Get Jobs list on sort_by: sort_by=orderdate.desc filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      stats: 1,
      limit: count,
      sort_by: 'orderdate.desc'
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i = 0,
      createdDates = [],
      act_createdDate,
      flag;
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        act_createdDate = data.result.jobs[i].createdDate;
        console.log(typeof act_createdDate + "---act_createdDate------" + act_createdDate)
        createdDates[i] = [act_createdDate];
      }
    }
    for (i = 0; i < jobslength - 1; i++) {
      console.log(typeof createdDates[i] + "---createdDates[i]------" + createdDates[i])
      if (createdDates[i] >= createdDates[i + 1]) {
        flag = true;
      } else if ((createdDates[i] = 'null') || (createdDates[i + 1] = 'null')) {
        flag = true;
      } else {
        flag = false;
        break;
      }
    }

    expect(true).to.equal((flag))
    console.log("Validated 'the jobs are displayed which are sorted by orderdate.desc in descending order'");

    tc_title = "Get Jobs list on sort_by: orderdate.desc filter ";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      sort_by: 'orderdate',
      sort_order: 'descending order',
    };

  }).timeout(200000);

  it("Get Jobs list on sort_by: sort_by=orderdate.asc filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      stats: 1,
      limit: count,
      sort_by: 'orderdate.asc'
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i = 0,
      createdDates = [],
      act_createdDate,
      flag;
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        act_createdDate = data.result.jobs[i].createdDate;
        createdDates[i] = [act_createdDate];
      }
    }
    for (i = 0; i < jobslength - 1; i++) {
      if (createdDates[i] <= createdDates[i + 1]) {
        flag = true;
      } else {
        flag = false;
        break;
      }
    }
    expect(true).to.equal((flag))
    console.log("Validated 'the jobs are displayed which are sorted by orderdate.asc in ascending order'");

    tc_title = "Get Jobs list on sort_by: orderdate.asc filter ";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      sort_by: 'orderdate',
      sort_order: 'ascending order',
    };

  }).timeout(200000);

  it("Get Jobs list on sort_by=reqShipDate filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      stats: 1,
      limit: count,
      sort_by: 'reqShipDate'
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i = 0,
      reqShipDates = [],
      flag;
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        reqShipDates[i] = [data.result.jobs[i].reqShipDate];
      }
    }
    for (i = 0; i < jobslength - 1; i++) {
      if (reqShipDates[i] >= reqShipDates[i + 1]) {
        flag = true;
      } else {
        flag = false;
        break;
      }
    }
    expect(true).to.equal((flag))
    console.log("Validated 'the jobs are displayed which are sorted by reqshipdate.'");

    tc_title = "Get Jobs list on sort_by: reqshipdate filter ";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      sort_by: 'reqshipdate',
      sort_order: 'ascending order',
    };

  }).timeout(200000);

  it("Get Jobs list on sort_by: sort_by=inHandsDate filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      stats: 1,
      limit: count,
      sort_by: 'inHandsDate'
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var jobs = data.result.jobs,
      jobslength = jobs.length,
      i = 0,
      inHandsDates = [],
      flag;
    if (jobslength > 0) {
      for (i = 0; i <= jobslength - 1; i++) {
        inHandsDates[i] = [data.result.jobs[i].inHandsDate];
      }
    }
    for (i = 0; i < jobslength - 1; i++) {
      if (inHandsDates[i] >= inHandsDates[i + 1]) {
        flag = true;
      } else {
        flag = false;
        break;
      }
    }
    expect(true).to.equal((flag))
    console.log("Validated 'the jobs are displayed which are sorted by inHandsDate'");

    tc_title = "Get Jobs list on sort_by: inHandsDate filter ";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      sort_by: 'inHandsDate',
      sort_order: 'ascending order',
    };
  }).timeout(200000);

  it("Get Jobs list on extended = 1 filter ", async () => {
    await testLib.login(username, password);

    let resp = await testLib.listJobs({
      extended: 1
    })
    respInJson = testLib.jsonparse(resp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    expect(200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code : 200");

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data.result).to.have.haveOwnProperty('vendors');
    console.log("\n Validated the 'vendors' are displayed.");

    tc_title = "Get Jobs list on extended = 1 filter";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      extended_filter: 1
    };
  }).timeout(200000);
});