const { assert } = require("chai");

describe('XSource Products Apis validations .......', () => {

  it('Validate the success message of Get XSource Products.', async () => {

    await testLib.login(username, password);

    let create_presentation_resp = await testLib.getXSource({
      action: get_xsource_products_action,
      supplierId: "50042",
      source: "SAGE",
      styleCode: "363807"
    });
    respInJson = testLib.jsonparse(create_presentation_resp);
    data = testLib.jsonparse(respInJson.data);
    result = data.result

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.not.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is not displayed.");

    expect(data).to.have.haveOwnProperty('vendor');
    console.log("\n Validated the 'vendor' is displayed.");

    expect(data).to.have.haveOwnProperty('sizes');
    console.log("\n Validated the 'sizes' is displayed.");

    if (result.length > 0) {
      result = testLib.jsonparse(data.result[0]);

      expect(result).to.have.haveOwnProperty('color');
      console.log("\n Validated the 'color' is not displayed.");

      expect(result).to.have.haveOwnProperty('xsource_size_name');
      console.log("\n Validated the 'xsource_size_name' is  displayed.");

      expect(result).to.have.haveOwnProperty('cost_1');
      console.log("\n Validated the 'cost_1' is not displayed.");

      expect(result).to.have.haveOwnProperty('supplier_item_number');
      console.log("\n Validated the 'supplier_item_number' is  displayed.");

      expect(result).to.have.haveOwnProperty('uuid');
      console.log("\n Validated the 'uuid' is  displayed.");

      expect(result).to.have.haveOwnProperty('product_code');
      console.log("\n Validated the 'product_code' is not displayed.");

    }

    tc_title = 'Validate the success message of Get XSource Products.';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
    };

  }).timeout(200000);

  it('Validate the Error message of Get XSource Products without supplierId', async () => {

    await testLib.login(username, password);

    let create_presentation_resp = await testLib.getXSource({
      action: get_xsource_products_action,
      source: "SAGE",
      styleCode: "363807"
    });
    respInJson = testLib.jsonparse(create_presentation_resp);
    data = testLib.jsonparse(respInJson.data);

    expect(successCode_200).to.equal(respInJson.statusCode);
    console.log("\n Validated the status code :  " + successCode_200);

    expect(data).to.have.haveOwnProperty('error');
    console.log("\n Validated the 'error' is displayed.");

    expect(no_supplier_id_errorMsg).to.equal(data.error);
    console.log("\n Validated the error message : " + no_supplier_id_errorMsg);

    expect(errorCode_400).to.equal(data.errorCode);
    console.log("\n Validated the error code : " + errorCode_400);

    tc_title = 'Validate the Error message of Get XSource Products without supplierId ';
    values = {
      Affiliate_user: username,
      statusCode: successCode_200,
    };

  }).timeout(200000);

})