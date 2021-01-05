const { assert } = require("chai");

describe('List Disputes Apis validations .......', () => {

  //----------------------------------- List Dispute --------------------------------------

  it('Validate the success message for "List Dispute" with "Open" status filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      status: disputeStatuses[0]
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      totalDisps = 0

    thiscount = data.thisCount

    expect(data.disputes[0]).to.have.haveOwnProperty('status');
    console.log("\n Validated the 'Status' is displayed.");
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2]))
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      ttlDisputes = data.stats.totalDisputes

    totalDisps = pendingCount + underReviewCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validated the success message for "List Dispute" with "Open" status filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the success message for "List Dispute" with "Pending" status filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      status: disputeStatuses[1]
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0

    thiscount = data.thisCount

    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if (status == disputeStatuses[1])
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
      }
    }

    var totalPend = data.stats.totalPending,
      ttlDisputes = data.stats.totalDisputes

    expect(pendingCount).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisputes :  " + pendingCount);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(pendingCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + pendingCount);

    tc_title = 'Validated the success message for "List Dispute" with "Pending" status filter';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: pendingCount,
      totalPending_Disputes: pendingCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the success message for "List Dispute" with "Under-Review" status filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      status: disputeStatuses[2]
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      underReviewCount = 0

    thiscount = data.thisCount
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if (status == disputeStatuses[2])
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[2])
          underReviewCount++
      }
    }

    var totalDisps = data.stats.totalDisputes,
      totalUnderRev = data.stats.totalUnderReview

    expect(underReviewCount).to.equal(totalDisps);
    console.log("\n Validated the totalDisputes :  " + underReviewCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the pendingCount :  " + underReviewCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(underReviewCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + underReviewCount);

    tc_title = 'Validated the success message for "List Dispute" with "Under-Review" status filter';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: underReviewCount,
      totalUnderReviewCount_Disputes: underReviewCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the success message for "List Dispute" with "Rejected" status filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      status: disputeStatuses[3]
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      rejectedCount = 0

    thiscount = data.thisCount
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if (status == disputeStatuses[3])
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[3])
          rejectedCount++
      }
    }

    var totalDisps = data.stats.totalDisputes,
      totalRejected = data.stats.totalRejected

    expect(rejectedCount).to.equal(totalDisps);
    console.log("\n Validated the totalDisputes :  " + rejectedCount);

    expect(rejectedCount).to.equal(totalRejected);
    console.log("\n Validated the pendingCount :  " + rejectedCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(rejectedCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + rejectedCount);

    tc_title = 'Validated the success message for "List Dispute" with "Rejected" status filter';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: rejectedCount,
      totalRejectedCount_Disputes: rejectedCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the success message for "List Dispute" with "Closed" status filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      status: disputeStatuses[4]
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      closedCount = 0

    thiscount = data.thisCount
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if (status == disputeStatuses[4])
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[4])
          closedCount++
      }
    }

    var totalDisps = data.stats.totalDisputes,
      totalClosed = data.stats.totalClosed

    expect(closedCount).to.equal(totalDisps);
    console.log("\n Validated the totalDisputes :  " + closedCount);

    expect(closedCount).to.equal(totalClosed);
    console.log("\n Validated the pendingCount :  " + closedCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(closedCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + closedCount);

    tc_title = 'Validated the success message for "List Dispute" with "Closed" status filter';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: closedCount,
      totalClosedCount_Disputes: closedCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the success message for "List Dispute" with "All" status filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      status: disputeStatuses[5]
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      rejectedCount = 0,
      closedCount = 0,
      totalDisps = 0

    console.log("disputesCount - " + disputesCount)
    thiscount = data.thisCount

    expect(data.disputes[0]).to.have.haveOwnProperty('status');
    console.log("\n Validated the 'Status' is displayed.");
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
          || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
        )
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
        else if (status == disputeStatuses[3])
          rejectedCount++
        else if (status == disputeStatuses[4])
          closedCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      totalRejected = data.stats.totalRejected,
      totalClosed = data.stats.totalClosed,
      ttlDisputes = data.stats.totalDisputes

    console.log("\n pendingCount :  " + pendingCount);
    console.log("\n underReviewCount :  " + underReviewCount);
    console.log("\n rejectedCount :  " + rejectedCount);
    console.log("\n closedCount :  " + closedCount);

    totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(rejectedCount).to.equal(totalRejected);
    console.log("\n Validated the rejectedCount :  " + rejectedCount);

    expect(closedCount).to.equal(totalClosed);
    console.log("\n Validated the closedCount :  " + closedCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validated the success message for "List Dispute" with "All" status filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      totalRejected_Disputes: rejectedCount,
      totalClosed_Disputes: closedCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the error message for "List Dispute" with missed status filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      totalDisps = 0

    thiscount = data.thisCount

    expect(data.disputes[0]).to.have.haveOwnProperty('status');
    console.log("\n Validated the 'Status' is displayed.");
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2]))
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      ttlDisputes = data.stats.totalDisputes

    totalDisps = pendingCount + underReviewCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validated the success message for "List Dispute" with "Open" status filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      thisCount: disputesCount,
    };
  }).timeout(200000);

  it('Validate the error message for "List Dispute" with empty status.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      status: ''
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      totalDisps = 0

    thiscount = data.thisCount

    expect(data.disputes[0]).to.have.haveOwnProperty('status');
    console.log("\n Validated the 'Status' is displayed.");
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2]))
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      ttlDisputes = data.stats.totalDisputes

    totalDisps = pendingCount + underReviewCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validated the success message for "List Dispute" with "Open" status filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      thisCount: disputesCount,
    };
  }).timeout(200000);

  it('Validate the error message for "List Dispute" with invalid status.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      status: invalid_data
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_status_list_dispute).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_status_list_dispute);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate the error message for "List Dispute" with invalid status.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Invalid_status_errorMsg: invalid_status_list_dispute,
      Invalid_status_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the success message for "List Dispute" with vendor code filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      vendorCode: prim_vendorcode
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      rejectedCount = 0,
      closedCount = 0,
      totalDisps = 0

    console.log("disputesCount - " + disputesCount)
    thiscount = data.thisCount

    expect(data.disputes[0]).to.have.haveOwnProperty('status');
    console.log("\n Validated the 'Status' is displayed.");
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
          || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
        )
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
        else if (status == disputeStatuses[3])
          rejectedCount++
        else if (status == disputeStatuses[4])
          closedCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      totalRejected = data.stats.totalRejected,
      totalClosed = data.stats.totalClosed,
      ttlDisputes = data.stats.totalDisputes

    console.log("\n pendingCount :  " + pendingCount);
    console.log("\n underReviewCount :  " + underReviewCount);
    console.log("\n rejectedCount :  " + rejectedCount);
    console.log("\n closedCount :  " + closedCount);

    totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(rejectedCount).to.equal(totalRejected);
    console.log("\n Validated the rejectedCount :  " + rejectedCount);

    expect(closedCount).to.equal(totalClosed);
    console.log("\n Validated the closedCount :  " + closedCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validated the success message for "List Dispute" with vendor code filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      totalRejected_Disputes: rejectedCount,
      totalClosed_Disputes: closedCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the error message for "List Dispute" with empty vendor code filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      vendor: ''
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missed_empty_vendor_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missed_empty_vendor_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message for "List Dispute" with empty vendor code.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Empty_vendorcode_errorMsg: missed_empty_vendor_errorMsg,
      Empty_vendorcode_errorCode: errorCode_400
    };

  }).timeout(200000);

  it('Validate the error message for "List Dispute" with invalid vendor code.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      vendor: invalid_data
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_vendor_errorMsg2).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_vendor_errorMsg2);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message for "List Dispute" with invalid vendor code filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Invalid_vendorcode_errorMsg: invalid_vendor_errorMsg2,
      Invalid_vendorcode_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the success message for "List Dispute" with "Open" status, and VendorCode filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      status: disputeStatuses[0],
      vendorCode: prim_vendorcode
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      totalDisps = 0

    thiscount = data.thisCount

    expect(data.disputes[0]).to.have.haveOwnProperty('status');
    console.log("\n Validated the 'Status' is displayed.");
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2]))
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      ttlDisputes = data.stats.totalDisputes

    totalDisps = pendingCount + underReviewCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validated the success message for "List Dispute" with "Open" status, and VendorCode filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the success message for "List Dispute" with JobId filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      jobId: existedJob
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      rejectedCount = 0,
      closedCount = 0,
      totalDisps = 0

    console.log("disputesCount - " + disputesCount)
    thiscount = data.thisCount

    console.log("\n Validated the 'Status' is displayed.");
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
          || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
        )
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
        else if (status == disputeStatuses[3])
          rejectedCount++
        else if (status == disputeStatuses[4])
          closedCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      totalRejected = data.stats.totalRejected,
      totalClosed = data.stats.totalClosed,
      ttlDisputes = data.stats.totalDisputes

    console.log("\n pendingCount :  " + pendingCount);
    console.log("\n underReviewCount :  " + underReviewCount);
    console.log("\n rejectedCount :  " + rejectedCount);
    console.log("\n closedCount :  " + closedCount);

    totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(rejectedCount).to.equal(totalRejected);
    console.log("\n Validated the rejectedCount :  " + rejectedCount);

    expect(closedCount).to.equal(totalClosed);
    console.log("\n Validated the closedCount :  " + closedCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validated the success message for "List Dispute" with JobId filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      totalRejected_Disputes: rejectedCount,
      totalClosed_Disputes: closedCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the error message for "List Dispute" with empty JobId filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      jobId: ''
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(empty_job_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + empty_job_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message for "List Dispute" with empty JobId filter';

    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Empty_jobId_errorMsg: empty_job_id_errorMsg,
      Empty_jobId_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message for "List Dispute" with invalid JobId filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute,
      jobId: invalid_data
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_jobId_errorMsg2).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_jobId_errorMsg2);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message for "List Dispute" with invalid JobId filter';

    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Invalid_jobId_errorMsg: invalid_jobId_errorMsg2,
      Invalid_jobId_errorCode: errorCode_400
    };
  }).timeout(200000);


  it('Validate the success message for "List Dispute" with missed JobId filter.', async () => {

    await testLib.login(username, password);

    var listDispute = {
      action: list_dispute
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      rejectedCount = 0,
      closedCount = 0,
      totalDisps = 0

    console.log("disputesCount - " + disputesCount)
    thiscount = data.thisCount

    expect(data.disputes[0]).to.have.haveOwnProperty('status');
    console.log("\n Validated the 'Status' is displayed.");
    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var status = disputes[i].status
        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
          || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
        )
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
        else if (status == disputeStatuses[3])
          rejectedCount++
        else if (status == disputeStatuses[4])
          closedCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      totalRejected = data.stats.totalRejected,
      totalClosed = data.stats.totalClosed,
      ttlDisputes = data.stats.totalDisputes

    console.log("\n pendingCount :  " + pendingCount);
    console.log("\n underReviewCount :  " + underReviewCount);
    console.log("\n rejectedCount :  " + rejectedCount);
    console.log("\n closedCount :  " + closedCount);

    totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(rejectedCount).to.equal(totalRejected);
    console.log("\n Validated the rejectedCount :  " + rejectedCount);

    expect(closedCount).to.equal(totalClosed);
    console.log("\n Validated the closedCount :  " + closedCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validated the success message for "List Dispute" with missed JobId filter.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      totalRejected_Disputes: rejectedCount,
      totalClosed_Disputes: closedCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the success message for "List Dispute" with affiliate filter used by IPU-Admin.', async () => {

    await testLib.login(adminUsername, adminPassword);

    var listDispute = {
      action: list_dispute,
      affiliateId: affilite_id1
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      rejectedCount = 0,
      closedCount = 0,
      totalDisps = 0

    console.log("disputesCount - " + disputesCount)
    thiscount = data.thisCount

    expect(data.disputes[0]).to.have.haveOwnProperty('status');
    console.log("\n Validated the 'Status' field is displayed.");

    expect(data.disputes[0]).to.have.haveOwnProperty('affiliateId');
    console.log("\n Validated the 'affiliateId' field is displayed.");

    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var affiliateId = disputes[i].affiliateId,
          status = disputes[i].status
        expect(affiliateId).to.equal(affilite_id1);
        console.log("\n Validated the affiliateId :  " + affilite_id1);

        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
          || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
        )
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
        else if (status == disputeStatuses[3])
          rejectedCount++
        else if (status == disputeStatuses[4])
          closedCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      totalRejected = data.stats.totalRejected,
      totalClosed = data.stats.totalClosed,
      ttlDisputes = data.stats.totalDisputes

    console.log("\n pendingCount :  " + pendingCount);
    console.log("\n underReviewCount :  " + underReviewCount);
    console.log("\n rejectedCount :  " + rejectedCount);
    console.log("\n closedCount :  " + closedCount);

    totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(rejectedCount).to.equal(totalRejected);
    console.log("\n Validated the rejectedCount :  " + rejectedCount);

    expect(closedCount).to.equal(totalClosed);
    console.log("\n Validated the closedCount :  " + closedCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validate the success message for "List Dispute" with affiliate filter used by IPU-Admin.';
    values = {
      Affiliate_user: adminUsername,
      statusCode: successCode_200,
      affiliateId: affilite_id1,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      totalRejected_Disputes: rejectedCount,
      totalClosed_Disputes: closedCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the success message for "List Dispute" with missed affiliate filter used by IPU-Admin.', async () => {

    await testLib.login(adminUsername, adminPassword);

    var listDispute = {
      action: list_dispute
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('disputes');
    console.log("\n Validated the 'disputes' is displayed.");

    var disputes = data.disputes,
      disputesCount = disputes.length,
      i,
      flag = false,
      pendingCount = 0,
      underReviewCount = 0,
      rejectedCount = 0,
      closedCount = 0,
      totalDisps = 0

    console.log("disputesCount - " + disputesCount)
    thiscount = data.thisCount

    expect(data.disputes[0]).to.have.haveOwnProperty('status');
    console.log("\n Validated the 'Status' field is displayed.");

    expect(data.disputes[0]).to.have.haveOwnProperty('affiliateId');
    console.log("\n Validated the 'affiliateId' field is displayed.");

    if (disputesCount > 0) {
      for (i = 0; i < disputesCount; i++) {
        var affiliateId = disputes[i].affiliateId,
          status = disputes[i].status

        if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
          || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
        )
          flag = true

        expect(flag).to.equal(true);
        console.log("\n Validated the status :  " + status);

        if (status == disputeStatuses[1])
          pendingCount++
        else if (status == disputeStatuses[2])
          underReviewCount++
        else if (status == disputeStatuses[3])
          rejectedCount++
        else if (status == disputeStatuses[4])
          closedCount++
      }
    }

    var totalPend = data.stats.totalPending,
      totalUnderRev = data.stats.totalUnderReview,
      totalRejected = data.stats.totalRejected,
      totalClosed = data.stats.totalClosed,
      ttlDisputes = data.stats.totalDisputes

    console.log("\n pendingCount :  " + pendingCount);
    console.log("\n underReviewCount :  " + underReviewCount);
    console.log("\n rejectedCount :  " + rejectedCount);
    console.log("\n closedCount :  " + closedCount);

    totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

    expect(totalDisps).to.equal(ttlDisputes);
    console.log("\n Validated the totalDisps :  " + totalDisps);

    expect(pendingCount).to.equal(totalPend);
    console.log("\n Validated the pendingCount :  " + pendingCount);

    expect(underReviewCount).to.equal(totalUnderRev);
    console.log("\n Validated the underReviewCount :  " + underReviewCount);

    expect(rejectedCount).to.equal(totalRejected);
    console.log("\n Validated the rejectedCount :  " + rejectedCount);

    expect(closedCount).to.equal(totalClosed);
    console.log("\n Validated the closedCount :  " + closedCount);

    expect(disputesCount).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + disputesCount);

    expect(totalDisps).to.equal(thiscount);
    console.log("\n Validated the thisCount :  " + totalDisps);

    tc_title = 'Validate the success message for "List Dispute" with missed affiliate filter used by IPU-Admin.';
    values = {
      Affiliate_user: adminUsername,
      statusCode: successCode_200,
      totalDisputes: totalDisps,
      totalPending_Disputes: pendingCount,
      totalUnderReview_Disputes: underReviewCount,
      totalRejected_Disputes: rejectedCount,
      totalClosed_Disputes: closedCount,
      thisCount: disputesCount,
    };

  }).timeout(200000);

  it('Validate the error message for "List Dispute" with empty affiliate filter used by IPU-Admin.', async () => {

    await testLib.login(adminUsername, adminPassword);

    var listDispute = {
      action: list_dispute,
      affiliateId: ''
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);
    expect(empty_affiliateId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + empty_affiliateId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message for "List Dispute" with empty affiliate filter used by IPU-Admin..';

    values = {
      Affiliate_user: adminUsername,
      statusCode: successCode_200,
      Empty_affiliateId_errorMsg: empty_affiliateId_errorMsg,
      Empty_affiliateId_errorCode: errorCode_400
    };

  }).timeout(200000);

  it('Validate the error message for "List Dispute" with invalid affiliate filter used by IPU-Admin.', async () => {

    await testLib.login(adminUsername, adminPassword);

    var listDispute = {
      action: list_dispute,
      affiliateId: invalid_data
    }

    let resp = await testLib.getDispute(listDispute);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);
    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_affiliateId_errorMsg4).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_affiliateId_errorMsg4);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message for "List Dispute" with invalid affiliate filter used by IPU-Admin.';

    values = {
      Affiliate_user: adminUsername,
      statusCode: successCode_200,
      Invalid_affiliateId_errorMsg: invalid_affiliateId_errorMsg4,
      Invalid_affiliateId_errorCode: errorCode_400
    };

  }).timeout(200000);

  // it('Validate the success message for "List Dispute" with salesrepId filter used by IPU-Admin.', async () => {

  //   await testLib.login(adminUsername, adminPassword);

  //   var listDispute = {
  //     action: list_dispute,
  //     salesrepId: cj_salesrepId
  //   }

  //   let resp = await testLib.getDispute(listDispute);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   expect(data).to.have.haveOwnProperty('disputes');
  //   console.log("\n Validated the 'disputes' is displayed.");

  //   var disputes = data.disputes,
  //     disputesCount = disputes.length,
  //     i,
  //     flag = false,
  //     pendingCount = 0,
  //     underReviewCount = 0,
  //     rejectedCount = 0,
  //     closedCount = 0,
  //     totalDisps = 0

  //   console.log("disputesCount - " + disputesCount)
  //   thiscount = data.thisCount

  //   expect(data.disputes[0]).to.have.haveOwnProperty('status');
  //   console.log("\n Validated the 'Status' field is displayed.");

  //   expect(data.disputes[0]).to.have.haveOwnProperty('affiliateId');
  //   console.log("\n Validated the 'affiliateId' field is displayed.");

  //   if (disputesCount > 0) {
  //     for (i = 0; i < disputesCount; i++) {
  //       var salesrepId = disputes[i].salesrepId,
  //         status = disputes[i].status
  //       expect(salesrepId).to.equal(cj_salesrepId);
  //       console.log("\n Validated the salesrepId :  " + cj_salesrepId);

  //       if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
  //         || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
  //       )
  //         flag = true

  //       expect(flag).to.equal(true);
  //       console.log("\n Validated the status :  " + status);

  //       if (status == disputeStatuses[1])
  //         pendingCount++
  //       else if (status == disputeStatuses[2])
  //         underReviewCount++
  //       else if (status == disputeStatuses[3])
  //         rejectedCount++
  //       else if (status == disputeStatuses[4])
  //         closedCount++
  //     }
  //   }

  //   var totalPend = data.stats.totalPending,
  //     totalUnderRev = data.stats.totalUnderReview,
  //     totalRejected = data.stats.totalRejected,
  //     totalClosed = data.stats.totalClosed,
  //     ttlDisputes = data.stats.totalDisputes

  //   console.log("\n pendingCount :  " + pendingCount);
  //   console.log("\n underReviewCount :  " + underReviewCount);
  //   console.log("\n rejectedCount :  " + rejectedCount);
  //   console.log("\n closedCount :  " + closedCount);

  //   totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

  //   expect(totalDisps).to.equal(ttlDisputes);
  //   console.log("\n Validated the totalDisps :  " + totalDisps);

  //   expect(pendingCount).to.equal(totalPend);
  //   console.log("\n Validated the pendingCount :  " + pendingCount);

  //   expect(underReviewCount).to.equal(totalUnderRev);
  //   console.log("\n Validated the underReviewCount :  " + underReviewCount);

  //   expect(rejectedCount).to.equal(totalRejected);
  //   console.log("\n Validated the rejectedCount :  " + rejectedCount);

  //   expect(closedCount).to.equal(totalClosed);
  //   console.log("\n Validated the closedCount :  " + closedCount);

  //   expect(disputesCount).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + disputesCount);

  //   expect(totalDisps).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + totalDisps);

  //   tc_title = 'Validated the success message for "List Dispute" with salesrepId filter used by IPU-Admin.';
  //   values = {
  //     Affiliate_user: adminUsername,
  //     statusCode: successCode_200,
  //     salesrepId: cj_salesrepId,
  //     totalDisputes: totalDisps,
  //     totalPending_Disputes: pendingCount,
  //     totalUnderReview_Disputes: underReviewCount,
  //     totalRejected_Disputes: rejectedCount,
  //     totalClosed_Disputes: closedCount,
  //     thisCount: disputesCount,
  //   };

  // }).timeout(200000);

  // it('Validate the success message for "List Dispute" with salesrepId filter used by affiliate.', async () => {

  //   await testLib.login(username, password);

  //   var listDispute = {
  //     action: list_dispute,
  //     salesrepId: cj_salesrepId
  //   }

  //   let resp = await testLib.getDispute(listDispute);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   expect(data).to.have.haveOwnProperty('disputes');
  //   console.log("\n Validated the 'disputes' is displayed.");

  //   var disputes = data.disputes,
  //     disputesCount = disputes.length,
  //     i,
  //     flag = false,
  //     pendingCount = 0,
  //     underReviewCount = 0,
  //     rejectedCount = 0,
  //     closedCount = 0,
  //     totalDisps = 0

  //   console.log("disputesCount - " + disputesCount)
  //   thiscount = data.thisCount

  //   expect(data.disputes[0]).to.have.haveOwnProperty('status');
  //   console.log("\n Validated the 'Status' field is displayed.");

  //   expect(data.disputes[0]).to.have.haveOwnProperty('affiliateId');
  //   console.log("\n Validated the 'affiliateId' field is displayed.");

  //   if (disputesCount > 0) {
  //     for (i = 0; i < disputesCount; i++) {
  //       var salesrepId = disputes[i].salesrepId,
  //         status = disputes[i].status
  //       expect(salesrepId).to.equal(cj_salesrepId);
  //       console.log("\n Validated the salesrepId :  " + cj_salesrepId);

  //       if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
  //         || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
  //       )
  //         flag = true

  //       expect(flag).to.equal(true);
  //       console.log("\n Validated the status :  " + status);

  //       if (status == disputeStatuses[1])
  //         pendingCount++
  //       else if (status == disputeStatuses[2])
  //         underReviewCount++
  //       else if (status == disputeStatuses[3])
  //         rejectedCount++
  //       else if (status == disputeStatuses[4])
  //         closedCount++
  //     }
  //   }

  //   var totalPend = data.stats.totalPending,
  //     totalUnderRev = data.stats.totalUnderReview,
  //     totalRejected = data.stats.totalRejected,
  //     totalClosed = data.stats.totalClosed,
  //     ttlDisputes = data.stats.totalDisputes

  //   console.log("\n pendingCount :  " + pendingCount);
  //   console.log("\n underReviewCount :  " + underReviewCount);
  //   console.log("\n rejectedCount :  " + rejectedCount);
  //   console.log("\n closedCount :  " + closedCount);

  //   totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

  //   expect(totalDisps).to.equal(ttlDisputes);
  //   console.log("\n Validated the totalDisps :  " + totalDisps);

  //   expect(pendingCount).to.equal(totalPend);
  //   console.log("\n Validated the pendingCount :  " + pendingCount);

  //   expect(underReviewCount).to.equal(totalUnderRev);
  //   console.log("\n Validated the underReviewCount :  " + underReviewCount);

  //   expect(rejectedCount).to.equal(totalRejected);
  //   console.log("\n Validated the rejectedCount :  " + rejectedCount);

  //   expect(closedCount).to.equal(totalClosed);
  //   console.log("\n Validated the closedCount :  " + closedCount);

  //   expect(disputesCount).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + disputesCount);

  //   expect(totalDisps).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + totalDisps);

  //   tc_title = 'Validated the success message for "List Dispute" with salesrepId filter used by affiliate.';
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     salesrepId: cj_salesrepId,
  //     totalDisputes: totalDisps,
  //     totalPending_Disputes: pendingCount,
  //     totalUnderReview_Disputes: underReviewCount,
  //     totalRejected_Disputes: rejectedCount,
  //     totalClosed_Disputes: closedCount,
  //     thisCount: disputesCount,
  //   };

  // }).timeout(200000);

  // it('Validate the success message for "List Dispute" with missed salesrepId filter used by IPU-Admin.', async () => {

  //   await testLib.login(adminUsername, adminPassword);

  //   var listDispute = {
  //     action: list_dispute
  //   }

  //   let resp = await testLib.getDispute(listDispute);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   expect(data).to.have.haveOwnProperty('disputes');
  //   console.log("\n Validated the 'disputes' is displayed.");

  //   var disputes = data.disputes,
  //     disputesCount = disputes.length,
  //     i,
  //     flag = false,
  //     pendingCount = 0,
  //     underReviewCount = 0,
  //     rejectedCount = 0,
  //     closedCount = 0,
  //     totalDisps = 0

  //   console.log("disputesCount - " + disputesCount)
  //   thiscount = data.thisCount

  //   expect(data.disputes[0]).to.have.haveOwnProperty('status');
  //   console.log("\n Validated the 'Status' field is displayed.");

  //   expect(data.disputes[0]).to.have.haveOwnProperty('affiliateId');
  //   console.log("\n Validated the 'affiliateId' field is displayed.");

  //   if (disputesCount > 0) {
  //     for (i = 0; i < disputesCount; i++) {
  //       var affiliateId = disputes[i].affiliateId,
  //         status = disputes[i].status

  //       if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
  //         || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
  //       )
  //         flag = true

  //       expect(flag).to.equal(true);
  //       console.log("\n Validated the status :  " + status);

  //       if (status == disputeStatuses[1])
  //         pendingCount++
  //       else if (status == disputeStatuses[2])
  //         underReviewCount++
  //       else if (status == disputeStatuses[3])
  //         rejectedCount++
  //       else if (status == disputeStatuses[4])
  //         closedCount++
  //     }
  //   }

  //   var totalPend = data.stats.totalPending,
  //     totalUnderRev = data.stats.totalUnderReview,
  //     totalRejected = data.stats.totalRejected,
  //     totalClosed = data.stats.totalClosed,
  //     ttlDisputes = data.stats.totalDisputes

  //   console.log("\n pendingCount :  " + pendingCount);
  //   console.log("\n underReviewCount :  " + underReviewCount);
  //   console.log("\n rejectedCount :  " + rejectedCount);
  //   console.log("\n closedCount :  " + closedCount);

  //   totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

  //   expect(totalDisps).to.equal(ttlDisputes);
  //   console.log("\n Validated the totalDisps :  " + totalDisps);

  //   expect(pendingCount).to.equal(totalPend);
  //   console.log("\n Validated the pendingCount :  " + pendingCount);

  //   expect(underReviewCount).to.equal(totalUnderRev);
  //   console.log("\n Validated the underReviewCount :  " + underReviewCount);

  //   expect(rejectedCount).to.equal(totalRejected);
  //   console.log("\n Validated the rejectedCount :  " + rejectedCount);

  //   expect(closedCount).to.equal(totalClosed);
  //   console.log("\n Validated the closedCount :  " + closedCount);

  //   expect(disputesCount).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + disputesCount);

  //   expect(totalDisps).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + totalDisps);

  //   tc_title = 'Validated the success message for "List Dispute" with missed salesrepId filter used by IPU-Admin.';
  //   values = {
  //     Affiliate_user: adminUsername,
  //     statusCode: successCode_200,
  //     totalDisputes: totalDisps,
  //     totalPending_Disputes: pendingCount,
  //     totalUnderReview_Disputes: underReviewCount,
  //     totalRejected_Disputes: rejectedCount,
  //     totalClosed_Disputes: closedCount,
  //     thisCount: disputesCount,
  //   };

  // }).timeout(200000);

  // it('Validate the success message for "List Dispute" with missed salesrepId filter used by affiliate.', async () => {

  //   await testLib.login(username, password);

  //   var listDispute = {
  //     action: list_dispute
  //   }

  //   let resp = await testLib.getDispute(listDispute);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   expect(data).to.have.haveOwnProperty('disputes');
  //   console.log("\n Validated the 'disputes' is displayed.");

  //   var disputes = data.disputes,
  //     disputesCount = disputes.length,
  //     i,
  //     flag = false,
  //     pendingCount = 0,
  //     underReviewCount = 0,
  //     rejectedCount = 0,
  //     closedCount = 0,
  //     totalDisps = 0

  //   console.log("disputesCount - " + disputesCount)
  //   thiscount = data.thisCount

  //   expect(data.disputes[0]).to.have.haveOwnProperty('status');
  //   console.log("\n Validated the 'Status' field is displayed.");

  //   expect(data.disputes[0]).to.have.haveOwnProperty('affiliateId');
  //   console.log("\n Validated the 'affiliateId' field is displayed.");

  //   if (disputesCount > 0) {
  //     for (i = 0; i < disputesCount; i++) {
  //       var salesrepId = disputes[i].salesrepId,
  //         status = disputes[i].status
  //       expect(salesrepId).to.equal(cj_salesrepId);
  //       console.log("\n Validated the salesrepId :  " + cj_salesrepId);

  //       if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
  //         || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
  //       )
  //         flag = true

  //       expect(flag).to.equal(true);
  //       console.log("\n Validated the status :  " + status);

  //       if (status == disputeStatuses[1])
  //         pendingCount++
  //       else if (status == disputeStatuses[2])
  //         underReviewCount++
  //       else if (status == disputeStatuses[3])
  //         rejectedCount++
  //       else if (status == disputeStatuses[4])
  //         closedCount++
  //     }
  //   }

  //   var totalPend = data.stats.totalPending,
  //     totalUnderRev = data.stats.totalUnderReview,
  //     totalRejected = data.stats.totalRejected,
  //     totalClosed = data.stats.totalClosed,
  //     ttlDisputes = data.stats.totalDisputes

  //   console.log("\n pendingCount :  " + pendingCount);
  //   console.log("\n underReviewCount :  " + underReviewCount);
  //   console.log("\n rejectedCount :  " + rejectedCount);
  //   console.log("\n closedCount :  " + closedCount);

  //   totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

  //   expect(totalDisps).to.equal(ttlDisputes);
  //   console.log("\n Validated the totalDisps :  " + totalDisps);

  //   expect(pendingCount).to.equal(totalPend);
  //   console.log("\n Validated the pendingCount :  " + pendingCount);

  //   expect(underReviewCount).to.equal(totalUnderRev);
  //   console.log("\n Validated the underReviewCount :  " + underReviewCount);

  //   expect(rejectedCount).to.equal(totalRejected);
  //   console.log("\n Validated the rejectedCount :  " + rejectedCount);

  //   expect(closedCount).to.equal(totalClosed);
  //   console.log("\n Validated the closedCount :  " + closedCount);

  //   expect(disputesCount).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + disputesCount);

  //   expect(totalDisps).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + totalDisps);

  //   tc_title = 'Validated the success message for "List Dispute" with missed salesrepId filter used by affiliate.';
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     salesrepId: cj_salesrepId,
  //     totalDisputes: totalDisps,
  //     totalPending_Disputes: pendingCount,
  //     totalUnderReview_Disputes: underReviewCount,
  //     totalRejected_Disputes: rejectedCount,
  //     totalClosed_Disputes: closedCount,
  //     thisCount: disputesCount,
  //   };

  // }).timeout(200000);

  // it('Validate the success message for "List Dispute" with empty salesrepId filter used by IPU-Admin.', async () => {

  //   await testLib.login(adminUsername, adminPassword);

  //   var listDispute = {
  //     action: list_dispute,
  //     salesrepId: ''
  //   }

  //   let resp = await testLib.getDispute(listDispute);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   expect(data).to.have.haveOwnProperty('disputes');
  //   console.log("\n Validated the 'disputes' is displayed.");

  //   var disputes = data.disputes,
  //     disputesCount = disputes.length,
  //     i,
  //     flag = false,
  //     pendingCount = 0,
  //     underReviewCount = 0,
  //     rejectedCount = 0,
  //     closedCount = 0,
  //     totalDisps = 0

  //   console.log("disputesCount - " + disputesCount)
  //   thiscount = data.thisCount

  //   expect(data.disputes[0]).to.have.haveOwnProperty('status');
  //   console.log("\n Validated the 'Status' field is displayed.");

  //   expect(data.disputes[0]).to.have.haveOwnProperty('salesrepId');
  //   console.log("\n Validated the 'salesrepId' field is displayed.");

  //   if (disputesCount > 0) {
  //     for (i = 0; i < disputesCount; i++) {
  //       var status = disputes[i].status

  //       if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
  //         || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
  //       )
  //         flag = true

  //       expect(flag).to.equal(true);
  //       console.log("\n Validated the status :  " + status);

  //       if (status == disputeStatuses[1])
  //         pendingCount++
  //       else if (status == disputeStatuses[2])
  //         underReviewCount++
  //       else if (status == disputeStatuses[3])
  //         rejectedCount++
  //       else if (status == disputeStatuses[4])
  //         closedCount++
  //     }
  //   }

  //   var totalPend = data.stats.totalPending,
  //     totalUnderRev = data.stats.totalUnderReview,
  //     totalRejected = data.stats.totalRejected,
  //     totalClosed = data.stats.totalClosed,
  //     ttlDisputes = data.stats.totalDisputes

  //   console.log("\n pendingCount :  " + pendingCount);
  //   console.log("\n underReviewCount :  " + underReviewCount);
  //   console.log("\n rejectedCount :  " + rejectedCount);
  //   console.log("\n closedCount :  " + closedCount);

  //   totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

  //   expect(totalDisps).to.equal(ttlDisputes);
  //   console.log("\n Validated the totalDisps :  " + totalDisps);

  //   expect(pendingCount).to.equal(totalPend);
  //   console.log("\n Validated the pendingCount :  " + pendingCount);

  //   expect(underReviewCount).to.equal(totalUnderRev);
  //   console.log("\n Validated the underReviewCount :  " + underReviewCount);

  //   expect(rejectedCount).to.equal(totalRejected);
  //   console.log("\n Validated the rejectedCount :  " + rejectedCount);

  //   expect(closedCount).to.equal(totalClosed);
  //   console.log("\n Validated the closedCount :  " + closedCount);

  //   expect(disputesCount).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + disputesCount);

  //   expect(totalDisps).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + totalDisps);

  //   tc_title = 'Validated the success message for "List Dispute" with empty salesrepId filter used by IPU-Admin.';
  //   values = {
  //     Affiliate_user: adminUsername,
  //     statusCode: successCode_200,
  //     totalDisputes: totalDisps,
  //     totalPending_Disputes: pendingCount,
  //     totalUnderReview_Disputes: underReviewCount,
  //     totalRejected_Disputes: rejectedCount,
  //     totalClosed_Disputes: closedCount,
  //     thisCount: disputesCount,
  //   };

  // }).timeout(200000);


  // it('Validate the success message for "List Dispute" with empty salesrepId filter used by affiliate.', async () => {

  //   await testLib.login(username, password);

  //   var listDispute = {
  //     action: list_dispute,
  //     salesrepId: ''
  //   }

  //   let resp = await testLib.getDispute(listDispute);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);

  //   expect(data).to.not.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is not displayed.");

  //   expect(data).to.have.haveOwnProperty('disputes');
  //   console.log("\n Validated the 'disputes' is displayed.");

  //   var disputes = data.disputes,
  //     disputesCount = disputes.length,
  //     i,
  //     flag = false,
  //     pendingCount = 0,
  //     underReviewCount = 0,
  //     rejectedCount = 0,
  //     closedCount = 0,
  //     totalDisps = 0

  //   console.log("disputesCount - " + disputesCount)
  //   thiscount = data.thisCount

  //   expect(data.disputes[0]).to.have.haveOwnProperty('status');
  //   console.log("\n Validated the 'Status' field is displayed.");

  //   expect(data.disputes[0]).to.have.haveOwnProperty('salesrepId');
  //   console.log("\n Validated the 'salesrepId' field is displayed.");

  //   if (disputesCount > 0) {
  //     for (i = 0; i < disputesCount; i++) {
  //       var salesrepId = disputes[i].salesrepId,
  //         status = disputes[i].status
  //       expect(salesrepId).to.equal(cj_salesrepId);
  //       console.log("\n Validated the salesrepId :  " + cj_salesrepId);

  //       if ((status == disputeStatuses[1]) || (status == disputeStatuses[2])
  //         || (status == disputeStatuses[3]) || (status == disputeStatuses[4])
  //       )
  //         flag = true

  //       expect(flag).to.equal(true);
  //       console.log("\n Validated the status :  " + status);

  //       if (status == disputeStatuses[1])
  //         pendingCount++
  //       else if (status == disputeStatuses[2])
  //         underReviewCount++
  //       else if (status == disputeStatuses[3])
  //         rejectedCount++
  //       else if (status == disputeStatuses[4])
  //         closedCount++
  //     }
  //   }

  //   var totalPend = data.stats.totalPending,
  //     totalUnderRev = data.stats.totalUnderReview,
  //     totalRejected = data.stats.totalRejected,
  //     totalClosed = data.stats.totalClosed,
  //     ttlDisputes = data.stats.totalDisputes

  //   console.log("\n pendingCount :  " + pendingCount);
  //   console.log("\n underReviewCount :  " + underReviewCount);
  //   console.log("\n rejectedCount :  " + rejectedCount);
  //   console.log("\n closedCount :  " + closedCount);

  //   totalDisps = pendingCount + underReviewCount + rejectedCount + closedCount

  //   expect(totalDisps).to.equal(ttlDisputes);
  //   console.log("\n Validated the totalDisps :  " + totalDisps);

  //   expect(pendingCount).to.equal(totalPend);
  //   console.log("\n Validated the pendingCount :  " + pendingCount);

  //   expect(underReviewCount).to.equal(totalUnderRev);
  //   console.log("\n Validated the underReviewCount :  " + underReviewCount);

  //   expect(rejectedCount).to.equal(totalRejected);
  //   console.log("\n Validated the rejectedCount :  " + rejectedCount);

  //   expect(closedCount).to.equal(totalClosed);
  //   console.log("\n Validated the closedCount :  " + closedCount);

  //   expect(disputesCount).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + disputesCount);

  //   expect(totalDisps).to.equal(thiscount);
  //   console.log("\n Validated the thisCount :  " + totalDisps);

  //   tc_title = 'Validated the success message for "List Dispute" with empty salesrepId filter used by affiliate.';
  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     salesrepId: cj_salesrepId,
  //     totalDisputes: totalDisps,
  //     totalPending_Disputes: pendingCount,
  //     totalUnderReview_Disputes: underReviewCount,
  //     totalRejected_Disputes: rejectedCount,
  //     totalClosed_Disputes: closedCount,
  //     thisCount: disputesCount,
  //   };

  // }).timeout(200000);

  // it('Validate the error message for "List Dispute" with invalid salesrepId filter used by IPU-Admin.', async () => {

  //   await testLib.login(adminUsername, adminPassword);

  //   var listDispute = {
  //     action: list_dispute,
  //     salesrepId: invalid_data
  //   }

  //   let resp = await testLib.getDispute(listDispute);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);
  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(invalid_salesrepId_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_salesrepId_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = 'Validated the error message for "List Dispute" with invalid salesrepId filter used by IPU-Admin.';

  //   values = {
  //     Affiliate_user: adminUsername,
  //     statusCode: successCode_200,
  //     Invalid_salesrepId_errorMsg: invalid_salesrepId_errorMsg,
  //     Invalid_salesrepId_errorCode: errorCode_400
  //   };

  // }).timeout(200000);

  // it('Validate the error message for "List Dispute" with invalid salesrepId filter used by affiliate.', async () => {

  //   await testLib.login(username, password);

  //   var listDispute = {
  //     action: list_dispute,
  //     salesrepId: invalid_data
  //   }

  //   let resp = await testLib.getDispute(listDispute);
  //   respInJson = testLib.jsonparse(resp);
  //   data = testLib.jsonparse(respInJson.data);

  //   expect(successCode_200).to.equal(respInJson.statusCode);
  //   console.log("\n Validated the status code :  " + successCode_200);
  //   expect(data).to.have.haveOwnProperty('error');
  //   console.log("\n Validated the 'error' is displayed.");

  //   expect(invalid_salesrepId_errorMsg).to.equal(data.error);
  //   console.log("\n Validated the error message : " + invalid_salesrepId_errorMsg);

  //   expect(errorCode_400).to.equal(data.errorCode);
  //   console.log("\n Validated the error code : " + errorCode_400);

  //   tc_title = 'Validated the error message for "List Dispute" with invalid salesrepId filter used by affiliate.';

  //   values = {
  //     Affiliate_user: username,
  //     statusCode: successCode_200,
  //     Invalid_salesrepId_errorMsg: invalid_salesrepId_errorMsg,
  //     Invalid_salesrepId_errorCode: errorCode_400
  //   };

  // }).timeout(200000);

})