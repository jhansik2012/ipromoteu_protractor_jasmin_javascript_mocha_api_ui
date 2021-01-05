const { assert } = require("chai");

var count = 0

describe('Add, update, delete and get Lineitems Api validations .......', () => {

  it('Retrieve Line Items and validate lineitemcode, lineitemstatus of get-line-item.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    var exp_LineItemCode = data.result.lineItems[0].itemCode,
      exp_ItemStatus = data.result.lineItems[0].itemStatus;

    let lineItemResp = await testLib.getLineItem({
      action: get_line_action,
      itemCode: exp_LineItemCode
    })
    respInJson = testLib.jsonparse(lineItemResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    var act_LineItemCode = data.result.itemcode,
      act_ItemStatus = data.result.itemStatus;

    expect(exp_LineItemCode).to.equal(act_LineItemCode);
    console.log("\n Validated lineItemCode :  " + act_LineItemCode);

    expect(exp_ItemStatus).to.equal(act_ItemStatus);
    console.log("\n Validated ItemStatus :  " + act_ItemStatus);

    tc_title = 'Retrieved Line Items and validate lineitemcode, lineitemstatus of get-line-item.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      exp_lineItemCount: exp_LineItemCode,
      act_lineItemCount: act_LineItemCode,
      exp_lineItemStatus: exp_ItemStatus,
      act_lineItemStatus: act_ItemStatus
    };
  }).timeout(200000);

  it('Validate the error message with invalid lineItemcode of get-line-item.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getLineItem({
      action: get_line_action,
      itemCode: '0001111'
    })
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_itemCode_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_itemCode_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validated the error message with invalid lineItemcode of get-line-item.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Invalid_line_itemcode_errorMsg: invalid_itemCode_errorMsg,
      Invalid_line_itemcode_errorCode: errorCode_400
    };
  }).timeout(200000);

  it('Validate the error message missed get-lineitems action field of get-line-item.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getLineItem({
      itemCode: existedItemCode
    })
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

    tc_title = 'Validated the error message without action field of get-line-item.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      missed_action_errorMsg: missing_action_errorMsg,
      missed_action_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the success message of 'Add-line-item'.", async () => {

    await testLib.login(username, password);

    let lineitemsResp = await testLib.lineitems(add_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    succMessage = data.message;
    var succMsgArray = succMessage.split(" ");
    newLineItemCode = String(succMsgArray.slice(-1));
    newLineItemCode = newLineItemCode.slice(0, -1);
    expect(succMessage).to.have.string(add_lineItem_succMsg);
    expect(succMessage).to.have.string('[lineItemIds: ' + newLineItemCode + ']');
    console.log("\n Validated the add line item message : " + succMessage);

    let jobIdResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    var lineItems_length = (data.result.lineItems).length - 1;

    expect(existedJob).to.equal(data.result.jobId);
    console.log("Validated the existedJobId : " + existedJob);

    expect(newLineItemCode.trim).to.equal((data.result.lineItems[lineItems_length].itemCode).trim);
    console.log("Validated the lineItemCode : " + newLineItemCode);

    expect(Cost).to.equal(data.result.lineItems[lineItems_length].cost);
    console.log("Validated the cost : " + Cost);

    expect(Price).to.equal(data.result.lineItems[lineItems_length].price);
    console.log("Validated the price : " + Price);

    expect(Supplier_item_number).to.equal(data.result.lineItems[lineItems_length].supplier_item_number);
    console.log("Validated the supplier_item_number : " + Supplier_item_number);

    expect(Source).to.equal(data.result.lineItems[lineItems_length].source);
    console.log("Validated the Source : " + Source);

    expect(ipro_vendorcode).to.equal(data.result.lineItems[lineItems_length].vendorCode);
    console.log("Validated the vendor : " + ipro_vendorcode);

    expect(Asi_supplier_id).to.equal(data.result.lineItems[lineItems_length].asi_supplier_id);
    console.log("Validated the Asi_supplier_id : " + Asi_supplier_id);

    expect(String(Asi_product_id)).to.equal(data.result.lineItems[lineItems_length].asi_product_id);
    console.log("Validated the Asi_product_id : " + Asi_product_id);

    expect(ProductCode).to.equal(data.result.lineItems[lineItems_length].productInfo.productCode);
    console.log("Validated the productCode : " + ProductCode);

    expect(Buy_unit_of_measure).to.equal(data.result.lineItems[lineItems_length].buy_unit_of_measure);
    console.log("Validated the buy_unit_of_measure : " + Buy_unit_of_measure);

    expect(Buy_quantity_ordered).to.equal(data.result.lineItems[lineItems_length].buy_quantity_ordered);
    console.log("Validated the buy_quantity_ordered : " + Buy_quantity_ordered);

    expect(Sell_unit_of_measure).to.equal(data.result.lineItems[lineItems_length].sell_unit_of_measure);
    console.log("Validated the sell_unit_of_measure : " + Sell_unit_of_measure);

    expect(Sell_quantity_ordered).to.equal(data.result.lineItems[lineItems_length].sell_quantity_ordered);
    console.log("Validated the sell_quantity_ordered : " + Sell_quantity_ordered);

    var lineItemsCount = (data.result.lineItems).length;
    expect(lineItemsCount).to.equal(data.result.thisTotalLineItems);
    console.log("Validated the lineItems count : " + lineItemsCount);

    tc_title = "Validated the success message of 'Add-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      JobId: existedJob,
      LineItemCode: newLineItemCode
    };

  }).timeout(200000);

  it("Validate the lineitem is added successfully with invalid supplier_item_number of 'Add-line-item'.", async () => {

    await testLib.login(username, password);

    var add_lineItems_params = {
      action: add_line_action,
      jobId: existedJob,
      lineItems: [
        {
          cost: Cost,
          price: Price,
          supplier_item_number: invalid_data,
          productCode: ProductCode,
          color: ProductColor,
          sizeCode: ProductSizeCode,
          buy_unit_of_measure: Buy_unit_of_measure,
          buy_quantity_ordered: Buy_quantity_ordered,
          sell_unit_of_measure: Sell_unit_of_measure,
          sell_quantity_ordered: Sell_quantity_ordered,
          source: Source,
          vendor: ipro_vendorcode,
          asi_supplier_id: Asi_supplier_id,
          asi_product_id: Asi_product_id,
          date_due: futureDate_yyyy_mm_dd
        }
      ]
    };

    let lineitemsResp = await testLib.lineitems(add_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp),
      data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    succMessage = data.message;
    var succMsgArray = succMessage.split(" ");
    newLineItemCode = String(succMsgArray.slice(-1));
    newLineItemCode = newLineItemCode.slice(0, -1);
    expect(succMessage).to.have.string(add_lineItem_succMsg);
    expect(succMessage).to.have.string('[lineItemIds: ' + newLineItemCode + ']');
    console.log("\n Validated the add line item message : " + succMessage);

    let jobIdResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    var lineItems_length = (data.result.lineItems).length - 1;

    expect(existedJob).to.equal(data.result.jobId);
    console.log("Validated the existedJobId : " + existedJob);

    expect(newLineItemCode.trim).to.equal((data.result.lineItems[lineItems_length].itemCode).trim);
    console.log("Validated the lineItemCode : " + newLineItemCode);

    expect(Cost).to.equal(data.result.lineItems[lineItems_length].cost);
    console.log("Validated the cost : " + Cost);

    expect(Price).to.equal(data.result.lineItems[lineItems_length].price);
    console.log("Validated the price : " + Price);

    expect(invalid_data).to.equal(data.result.lineItems[lineItems_length].supplier_item_number);
    console.log("Validated the supplier_item_number : " + Supplier_item_number);

    expect(Source).to.equal(data.result.lineItems[lineItems_length].source);
    console.log("Validated the Source : " + Source);

    expect(ipro_vendorcode).to.equal(data.result.lineItems[lineItems_length].vendorCode);
    console.log("Validated the vendor : " + ipro_vendorcode);

    expect(Asi_supplier_id).to.equal(data.result.lineItems[lineItems_length].asi_supplier_id);
    console.log("Validated the Asi_supplier_id : " + Asi_supplier_id);

    expect(String(Asi_product_id)).to.equal(data.result.lineItems[lineItems_length].asi_product_id);
    console.log("Validated the Asi_product_id : " + Asi_product_id);

    expect(ProductCode).to.equal(data.result.lineItems[lineItems_length].productInfo.productCode);
    console.log("Validated the productCode : " + ProductCode);

    expect(Buy_unit_of_measure).to.equal(data.result.lineItems[lineItems_length].buy_unit_of_measure);
    console.log("Validated the buy_unit_of_measure : " + Buy_unit_of_measure);

    expect(Buy_quantity_ordered).to.equal(data.result.lineItems[lineItems_length].buy_quantity_ordered);
    console.log("Validated the buy_quantity_ordered : " + Buy_quantity_ordered);

    expect(Sell_unit_of_measure).to.equal(data.result.lineItems[lineItems_length].sell_unit_of_measure);
    console.log("Validated the sell_unit_of_measure : " + Sell_unit_of_measure);

    expect(Sell_quantity_ordered).to.equal(data.result.lineItems[lineItems_length].sell_quantity_ordered);
    console.log("Validated the sell_quantity_ordered : " + Sell_quantity_ordered);

    var lineItemsCount = (data.result.lineItems).length;
    expect(lineItemsCount).to.equal(data.result.thisTotalLineItems);
    console.log("Validated the lineItems count : " + lineItemsCount);

    tc_title = "Validated the lineitem is added successfully with invalid supplier_item_number of 'Add-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      JobId: existedJob,
      LineItemCode: newLineItemCode
    };

  }).timeout(200000);

  it("Validate the error message with invalid jobId of 'Add-line-item'.", async () => {

    await testLib.login(username, password);

    var add_lineItems_params = {
      action: add_line_action,
      jobId: invalid_data,
      lineItems: [
        {
          cost: Cost,
          price: Price,
          supplier_item_number: Supplier_item_number,
          productCode: ProductCode,
          color: ProductColor,
          sizeCode: ProductSizeCode,
          buy_unit_of_measure: Buy_unit_of_measure,
          buy_quantity_ordered: Buy_quantity_ordered,
          sell_unit_of_measure: Sell_unit_of_measure,
          sell_quantity_ordered: Sell_quantity_ordered,
          source: Source,
          vendor: ipro_vendorcode,
          asi_supplier_id: Asi_supplier_id,
          asi_product_id: Asi_product_id,
          date_due: futureDate_yyyy_mm_dd
        }
      ]
    };

    let lineitemsResp = await testLib.lineitems(add_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp),
      data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_jobId_errorMsg1).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_jobId_errorMsg1);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error message : " + errorCode_400);

    tc_title = "Validated the error message with invalid jobId of 'Add-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      JobId: invalid_data,
      invalid_jobId_errorMsg: invalid_jobId_errorMsg1,
      invalid_jobid_errorCode: errorCode_400
    };

  }).timeout(200000);

  it("Validate the success message with missing supplier_item_number of 'Add-line-item'.", async () => {

    await testLib.login(username, password);

    var add_lineItems_with_missing_siNumber_params = {
      action: add_line_action,
      jobId: existedJob,
      lineItems: [
        {
          cost: Cost,
          price: Price,
          productCode: ProductCode,
          color: ProductColor,
          sizeCode: ProductSizeCode,
          buy_unit_of_measure: Buy_unit_of_measure,
          buy_quantity_ordered: Buy_quantity_ordered,
          sell_unit_of_measure: Sell_unit_of_measure,
          sell_quantity_ordered: Sell_quantity_ordered,
          source: Source,
          vendor: ipro_vendorcode,
          asi_supplier_id: Asi_supplier_id,
          asi_product_id: Asi_product_id,
          date_due: futureDate_yyyy_mm_dd
        }
      ]
    };

    let lineitemsResp = await testLib.lineitems(add_lineItems_with_missing_siNumber_params);
    respInJson = testLib.jsonparse(lineitemsResp),
      data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    succMessage = data.message;
    var succMsgArray = succMessage.split(" ");
    newLineItemCode = String(succMsgArray.slice(-1));
    newLineItemCode = newLineItemCode.slice(0, -1);
    expect(succMessage).to.have.string(add_lineItem_succMsg);
    expect(succMessage).to.have.string('[lineItemIds: ' + newLineItemCode + ']');
    console.log("\n Validated the add line item message : " + succMessage);

    let jobIdResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);

    var lineItems_length = (data.result.lineItems).length - 1;

    expect(existedJob).to.equal(data.result.jobId);
    console.log("Validated the existedJob : " + existedJob);

    expect(newLineItemCode.trim).to.equal((data.result.lineItems[lineItems_length].itemCode).trim);
    console.log("Validated the lineItemCode : " + newLineItemCode);

    expect(Cost).to.equal(data.result.lineItems[lineItems_length].cost);
    console.log("Validated the cost : " + Cost);

    expect(Price).to.equal(data.result.lineItems[lineItems_length].price);
    console.log("Validated the price : " + Price);

    expect('').to.equal(data.result.lineItems[lineItems_length].supplier_item_number);
    console.log("Validated the supplier_item_number is empty.");

    expect(Source).to.equal(data.result.lineItems[lineItems_length].source);
    console.log("Validated the Source : " + Source);

    expect(ipro_vendorcode).to.equal(data.result.lineItems[lineItems_length].vendorCode);
    console.log("Validated the vendor : " + ipro_vendorcode);

    expect(Asi_supplier_id).to.equal(data.result.lineItems[lineItems_length].asi_supplier_id);
    console.log("Validated the Asi_supplier_id : " + Asi_supplier_id);

    expect(String(Asi_product_id)).to.equal(data.result.lineItems[lineItems_length].asi_product_id);
    console.log("Validated the Asi_product_id : " + Asi_product_id);

    expect(ProductCode).to.equal(data.result.lineItems[lineItems_length].productInfo.productCode);
    console.log("Validated the productCode : " + ProductCode);

    expect(Buy_unit_of_measure).to.equal(data.result.lineItems[lineItems_length].buy_unit_of_measure);
    console.log("Validated the buy_unit_of_measure : " + Buy_unit_of_measure);

    expect(Buy_quantity_ordered).to.equal(data.result.lineItems[lineItems_length].buy_quantity_ordered);
    console.log("Validated the buy_quantity_ordered : " + Buy_quantity_ordered);

    expect(Sell_unit_of_measure).to.equal(data.result.lineItems[lineItems_length].sell_unit_of_measure);
    console.log("Validated the sell_unit_of_measure : " + Sell_unit_of_measure);

    expect(Sell_quantity_ordered).to.equal(data.result.lineItems[lineItems_length].sell_quantity_ordered);
    console.log("Validated the sell_quantity_ordered : " + Sell_quantity_ordered);

    var lineItemsCount = (data.result.lineItems).length;
    expect(lineItemsCount).to.equal(data.result.thisTotalLineItems);
    console.log("Validated the lineItems count : " + lineItemsCount);

    tc_title = "Validated the success message with missing supplier_item_number of 'Add-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      JobId: existedJob,
      LineItemCode: newLineItemCode
    };

  }).timeout(200000);

  it("Validate the error message with missing action field of 'add-line-item'.", async () => {
    var add_lineItems_with_missing_action_params = {
      jobId: existedJob,
      lineItems: [
        {
          cost: Cost,
          price: Price,
          productCode: ProductCode,
          color: ProductColor,
          sizeCode: ProductSizeCode,
          buy_unit_of_measure: Buy_unit_of_measure,
          buy_quantity_ordered: Buy_quantity_ordered,
          sell_unit_of_measure: Sell_unit_of_measure,
          sell_quantity_ordered: Sell_quantity_ordered,
          source: Source,
          vendor: ipro_vendorcode,
          asi_supplier_id: Asi_supplier_id,
          asi_product_id: Asi_product_id,
          date_due: futureDate_yyyy_mm_dd
        }
      ]
    };

    await testLib.login(username, password);

    let resp = await testLib.lineitems(add_lineItems_with_missing_action_params);
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

    tc_title = 'Validated the error message with missing action field of add-line-item.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_itemCode_errorMsg: missing_action_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with missed jobId field of 'add-line-item'.", async () => {
    var add_lineItems_with_missing_jobId_params = {
      action: add_line_action,
      lineItems: [
        {
          cost: Cost,
          price: Price,
          productCode: ProductCode,
          color: ProductColor,
          sizeCode: ProductSizeCode,
          buy_unit_of_measure: Buy_unit_of_measure,
          buy_quantity_ordered: Buy_quantity_ordered,
          sell_unit_of_measure: Sell_unit_of_measure,
          sell_quantity_ordered: Sell_quantity_ordered,
          source: Source,
          vendor: ipro_vendorcode,
          asi_supplier_id: Asi_supplier_id,
          asi_product_id: Asi_product_id,
          date_due: futureDate_yyyy_mm_dd
        }
      ]
    };

    await testLib.login(username, password);

    let resp = await testLib.lineitems(add_lineItems_with_missing_jobId_params);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_or_empty_job_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_or_empty_job_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with missed jobId field of 'add-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      missed_jobId_errorMsg: missing_or_empty_job_id_errorMsg,
      missed_jobId_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with empty jobId of 'Add-line-item'.", async () => {

    await testLib.login(username, password);

    var add_lineItems_params = {
      action: add_line_action,
      jobId: '',
      lineItems: [
        {
          cost: Cost,
          price: Price,
          supplier_item_number: '',
          productCode: ProductCode,
          color: ProductColor,
          sizeCode: ProductSizeCode,
          buy_unit_of_measure: Buy_unit_of_measure,
          buy_quantity_ordered: Buy_quantity_ordered,
          sell_unit_of_measure: Sell_unit_of_measure,
          sell_quantity_ordered: Sell_quantity_ordered,
          source: Source,
          vendor: ipro_vendorcode,
          asi_supplier_id: Asi_supplier_id,
          asi_product_id: Asi_product_id,
          date_due: futureDate_yyyy_mm_dd
        }
      ]
    };

    let lineitemsResp = await testLib.lineitems(add_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp),
      data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_or_empty_job_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_or_empty_job_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error message : " + errorCode_400);

    tc_title = "Validated the error message with empty jobId of 'Add-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      JobId: invalid_data,
      invalid_jobId_errorMsg: missing_or_empty_job_id_errorMsg,
      invalid_jobid_errorCode: errorCode_400
    };

  }).timeout(200000);

  it('Validate the success message of update-line-item.', async () => {

    await testLib.login(username, password);

    let resp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(resp);
    data = testLib.jsonparse(respInJson.data);
    result = data.result;

    var lineItems_length = (data.result.lineItems).length,
      lineItems_length = lineItems_length - 1,

      lineItemCode = result.lineItems[lineItems_length].itemCode,
      supplierItemNumber = result.lineItems[lineItems_length].supplier_item_number,
      updated_cost = result.lineItems[lineItems_length].cost + 1,
      updated_price = result.lineItems[lineItems_length].price + 1;

    var update_lineItems_params = {
      action: update_line_item_action,
      itemCode: lineItemCode,
      cost: updated_cost,
      price: updated_price,
      supplier_item_number: Supplier_item_number,
      productCode: ProductCode,
      color: ProductColor,
      sizeCode: ProductSizeCode,
      buy_unit_of_measure: Buy_unit_of_measure,
      buy_quantity_ordered: Buy_quantity_ordered,
      sell_unit_of_measure: Sell_unit_of_measure,
      sell_quantity_ordered: Sell_quantity_ordered
    };

    let lineitemsResp = await testLib.lineitems(update_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(respInJson).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(update_lineItem_succMsg).to.have.string(data.message);
    console.log("\n Validated the success message : " + update_lineItem_succMsg);

    let jobIdResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(jobIdResp);
    data = testLib.jsonparse(respInJson.data);
    result = data.result;

    expect(existedJob).to.equal(result.jobId);
    console.log("Validated the existedJobId : " + existedJob);

    expect(lineItemCode.trim).to.equal((result.lineItems[lineItems_length].itemCode).trim);
    console.log("Validated the lineItemCode : " + lineItemCode);

    expect(updated_cost).to.equal(result.lineItems[lineItems_length].cost);
    console.log("Validated the cost : " + Cost);

    expect(updated_price).to.equal(result.lineItems[lineItems_length].price);
    console.log("Validated the price : " + Price);

    expect(supplierItemNumber).to.equal(result.lineItems[lineItems_length].supplier_item_number);
    console.log("Validated the supplier_item_number : " + Supplier_item_number);

    expect(Buy_unit_of_measure).to.equal(result.lineItems[lineItems_length].buy_unit_of_measure);
    console.log("Validated the buy_unit_of_measure : " + Buy_unit_of_measure);

    expect(Buy_quantity_ordered).to.equal(result.lineItems[lineItems_length].buy_quantity_ordered);
    console.log("Validated the buy_quantity_ordered : " + Buy_quantity_ordered);

    expect(Sell_unit_of_measure).to.equal(result.lineItems[lineItems_length].sell_unit_of_measure);
    console.log("Validated the sell_unit_of_measure : " + Sell_unit_of_measure);

    expect(Sell_quantity_ordered).to.equal(result.lineItems[lineItems_length].sell_quantity_ordered);
    console.log("Validated the sell_quantity_ordered : " + Sell_quantity_ordered);

    tc_title = 'Validated the success message of update-line-item.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      JobId: existedJob,
      LineItemCode: lineItemCode
    };

  }).timeout(200000);

  it("Validate the error message with invalid lineItemcode of 'update-line-item'.", async () => {

    await testLib.login(username, password);

    var update_lineItems_params = {
      action: update_line_item_action,
      itemCode: invalid_data,
      cost: Cost,
      price: Price,
      supplier_item_number: Supplier_item_number,
      productCode: ProductCode,
      color: ProductColor,
      sizeCode: ProductSizeCode,
      buy_unit_of_measure: Buy_unit_of_measure,
      buy_quantity_ordered: Buy_quantity_ordered,
      sell_unit_of_measure: Sell_unit_of_measure,
      sell_quantity_ordered: Sell_quantity_ordered
    };

    let lineitemsResp = await testLib.lineitems(update_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(invalid_itemCode_errorMsg1).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_itemCode_errorMsg1);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with invalid lineItemcode of 'update-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Invalid_line_itemcode_errorMsg: invalid_itemCode_errorMsg1,
      Invalid_line_itemcode_errorCode: errorCode_400
    };
  }).timeout(200000);


  it("Validate the error message with empty Itemcode of 'update-line-item'.", async () => {

    await testLib.login(username, password);

    var update_lineItems_params = {
      action: update_line_item_action,
      itemCode: '',
      cost: Cost,
      price: Price,
      supplier_item_number: Supplier_item_number,
      productCode: ProductCode,
      color: ProductColor,
      sizeCode: ProductSizeCode,
      buy_unit_of_measure: Buy_unit_of_measure,
      buy_quantity_ordered: Buy_quantity_ordered,
      sell_unit_of_measure: Sell_unit_of_measure,
      sell_quantity_ordered: Sell_quantity_ordered
    };

    let lineitemsResp = await testLib.lineitems(update_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_or_empty_Item_code_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_or_empty_Item_code_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with empty Itemcode of 'update-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missed_line_itemcode_errorMsg: missing_or_empty_Item_code_errorMsg,
      Missed_line_itemcode_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with missing update-lineitems action field of 'update-line-item'.", async () => {

    await testLib.login(username, password);

    var update_lineItems_params = {
      itemCode: existedItemCode,
      cost: Cost,
      price: Price,
      supplier_item_number: Supplier_item_number,
      productCode: ProductCode,
      color: ProductColor,
      sizeCode: ProductSizeCode,
      buy_unit_of_measure: Buy_unit_of_measure,
      buy_quantity_ordered: Buy_quantity_ordered,
      sell_unit_of_measure: Sell_unit_of_measure,
      sell_quantity_ordered: Sell_quantity_ordered
    };

    let lineitemsResp = await testLib.lineitems(update_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with missing update-lineitems action field of 'update-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_itemCode_errorMsg: missing_action_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with missing itemCode field of 'update-line-item'.", async () => {

    await testLib.login(username, password);

    var update_lineItems_params = {
      action: update_line_item_action,
      cost: Cost,
      price: Price,
      supplier_item_number: Supplier_item_number,
      productCode: ProductCode,
      color: ProductColor,
      sizeCode: ProductSizeCode,
      buy_unit_of_measure: Buy_unit_of_measure,
      buy_quantity_ordered: Buy_quantity_ordered,
      sell_unit_of_measure: Sell_unit_of_measure,
      sell_quantity_ordered: Sell_quantity_ordered
    };

    let lineitemsResp = await testLib.lineitems(update_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_or_empty_Item_code_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_or_empty_Item_code_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with missing itemCode field of 'update-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      invalid_itemCode_errorMsg: missing_or_empty_Item_code_errorMsg,
      invalid_data_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the success message of 'Delete lineitem'.", async () => {

    await testLib.login(username, password);

    let lineitemsResp = await testLib.lineitems(add_lineItems_params);
    respInJson = testLib.jsonparse(lineitemsResp);
    data = testLib.jsonparse(respInJson.data);
    newLineItemCode = data.message.split(": ")[1];
    newLineItemCode = newLineItemCode.replace(']', '').trim();

    var delete_lineItems_params = {
      action: delete_line_item_action,
      lineItemId: newLineItemCode
    };

    let deleteLineitemsResp = await testLib.lineitems(delete_lineItems_params);
    respInJson = testLib.jsonparse(deleteLineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).not.to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    succMessage = data.message;
    var deletedItemCode = succMessage.split(": ")[1];
    deletedItemCode = deletedItemCode.replace(']', '').trim();

    expect(newLineItemCode).to.equal(deletedItemCode);
    console.log("\n Validated the deleted line item.");

    expect(succMessage).to.have.string(delete_lineItem_succMsg);

    let jobDetailsResp = await testLib.getJobDetails(existedJob);
    respInJson = testLib.jsonparse(jobDetailsResp);
    data = respInJson.data;
    data = testLib.jsonparse(data);

    var existedLineItems = data.result.lineItems,
      existedLineItemsLength = existedLineItems.length

    count = 0;
    var flag = false
    for (var i = 0; i <= existedLineItemsLength - 1; i++) {
      var act_itemcode = (existedLineItems[i].itemCode).trim();
      if (act_itemcode == newLineItemCode) {
        expect(newLineItemCode).to.equal(act_itemcode);
        ++count;
        flag = true
        console.log("Validated the deleted lineItemId : " + newLineItemCode);
        break;
      }
    }
    console.log("count--" + count);
    expect(flag, true, 'deleted lineitem ' + newLineItemCode + ' is existed.')
    console.log("deleted lineitem.");

    tc_title = "Validated the success message of 'Delete lineitem'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      JobId: existedJob,
      deleted_LineItemId: newLineItemCode,
      deleted_lineitem_succMsg: delete_lineItem_succMsg
    };

  }).timeout(200000);

  it("Validate the error message with invalid lineItemId for 'delete-line-item.'", async () => {

    await testLib.login(username, password);

    var delete_lineItem_invalid_itemCode_params = {
      action: delete_line_item_action,
      lineItemId: invalid_data
    };

    let deleteLineitemsResp = await testLib.lineitems(delete_lineItem_invalid_itemCode_params);
    respInJson = testLib.jsonparse(deleteLineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");
    invalid_line_itemcode_errorMsg1 = invalid_line_itemcode_errorMsg1 + invalid_data +'!'

    expect(invalid_line_itemcode_errorMsg1).to.equal(data.error);
    console.log("\n Validated the error message : " + invalid_line_itemcode_errorMsg1);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with the invalid lineItemId for 'delete-line-item.'";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Invalid_line_itemcode_errorMsg: invalid_line_itemcode_errorMsg1,
      Invalid_line_itemcode_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with empty lineItemId for 'delete-line-item.'", async () => {

    await testLib.login(username, password);

    var delete_lineItem_invalid_itemCode_params = {
      action: delete_line_item_action,
      lineItemId: null
    };

    let deleteLineitemsResp = await testLib.lineitems(delete_lineItem_invalid_itemCode_params);
    respInJson = testLib.jsonparse(deleteLineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(delete_line_item_missing_empty_lineItemId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + delete_line_item_missing_empty_lineItemId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with the empty lineItemId for 'delete-line-item.'";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Invalid_line_itemcode_errorMsg: delete_line_item_missing_empty_lineItemId_errorMsg,
      Invalid_line_itemcode_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with the missed lineItemId for 'delete-line-item.'", async () => {

    await testLib.login(username, password);

    var delete_lineItem_invalid_itemCode_params = {
      action: delete_line_item_action
    };

    let deleteLineitemsResp = await testLib.lineitems(delete_lineItem_invalid_itemCode_params);
    respInJson = testLib.jsonparse(deleteLineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(delete_line_item_missing_empty_lineItemId_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + delete_line_item_missing_empty_lineItemId_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with the missed lineItemId for 'delete-line-item.'";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      Missed_line_itemcode_errorMsg: delete_line_item_missing_empty_lineItemId_errorMsg,
      Missed_line_itemcode_errorCode: errorCode_400
    };
  }).timeout(200000);

  it("Validate the error message with missed action field of 'delete-line-item'.", async () => {

    await testLib.login(username, password);

    var delete_lineItem_missed_action_params = {
      lineItemId: existedItemCode
    };

    let deleteLineitemsResp = await testLib.lineitems(delete_lineItem_missed_action_params);
    respInJson = testLib.jsonparse(deleteLineitemsResp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(missing_action_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + missing_action_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = "Validated the error message with missed action field of 'delete-line-item'.";
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
      missed_action_errorMsg: missing_action_errorMsg,
      missed_action_errorCode: errorCode_400
    };
  }).timeout(200000);

});