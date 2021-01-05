describe('Create Purchase order Api validations .......', () => {

    var succMsgArray = ''

    it('Validate success message of create PO with multiple line items.', async () => {

        await testLib.login(username, password);

        let cj_resp = await testLib.postPO(create_job_params);
        respInJson = testLib.jsonparse(cj_resp);
        data = testLib.jsonparse(respInJson.data);

        existedJobId = data.jobId;

        var add_lineItems_params = {
            action: add_line_action,
            jobId: existedJobId,
            lineItems: [
                {
                    cost: Cost,
                    price: Price,
                    supplier_item_number: Supplier_item_number,
                    productCode: ProductCode,
                    productColor: ProductColor,
                    productSizeCode: ProductSizeCode,
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

        let cr_lineitem_resp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(cr_lineitem_resp);
        data = testLib.jsonparse(respInJson.data);
        lineItemCode1 = data.newItemCodes[0];

        cr_lineitem_resp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(cr_lineitem_resp);
        data = testLib.jsonparse(respInJson.data);
        lineItemCode2 = data.newItemCodes[0];

        var create_po_multiple_lineItems_params = {

            action: cp_action,
            jobNumber: existedJobId,
            vendorCode: ipro_vendorcode,
            poDate: currentDate_yyyy_mm_dd,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                }
            ]
        }

        let cp_resp = await testLib.postPO(create_po_multiple_lineItems_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result).to.have.haveOwnProperty('poJobDocumentId');
        console.log("\n Validated 'poJobDocumentId' field is displayed.");

        expect(true).to.equal(data.result.success);
        console.log("\n Validated the po got created.");

        var ponumber = data.result.poNumber;
        expect(existedJobId).to.equal((ponumber).split('-')[0]);
        console.log("\n Validated the poNumber : " + ponumber);

        expect('').to.equal(data.result.error);
        console.log("\n Validated the error message is empty.");

        tc_title = 'Validated the success message of create PO with multiple line items.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            JobId: existedJobId,
            LineItem1: lineItemCode1,
            LineItem2: lineItemCode2,
            PO_number: ponumber,
            PO_JobDoucumentId: result.poJobDocumentId
        };
    }).timeout(200000);

    it('Validate the success message of create PO with one line item.', async () => {

        await testLib.login(username, password);

        let cj_resp = await testLib.postPO(create_job_params);
        respInJson = testLib.jsonparse(cj_resp);
        data = testLib.jsonparse(respInJson.data);

        existedJobId = data.jobId;

        var add_lineItems_params = {
            action: add_line_action,
            jobId: existedJobId,
            lineItems: [
                {
                    cost: Cost,
                    price: Price,
                    supplier_item_number: Supplier_item_number,
                    productCode: ProductCode,
                    productColor: ProductColor,
                    productSizeCode: ProductSizeCode,
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

        let cr_lineitem_resp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(cr_lineitem_resp);
        data = testLib.jsonparse(respInJson.data);
        lineItemCode1 = data.newItemCodes[0];

        var create_po_one_lineItem_params = {
            action: cp_action,
            jobNumber: existedJobId,
            vendorCode: ipro_vendorcode,
            poDate: currentDate_yyyy_mm_dd,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: lineItemCode1
                }
            ]
        }

        let cp_resp = await testLib.postPO(create_po_one_lineItem_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result).to.have.haveOwnProperty('poJobDocumentId');
        console.log("\n Validated 'poJobDocumentId' field is displayed.");

        expect(true).to.equal(data.result.success);
        console.log("\n Validated the po got created.");

        var ponumber = data.result.poNumber;
        expect(existedJobId).to.equal((ponumber).split('-')[0]);
        console.log("\n Validated the poNumber : " + ponumber);

        expect('').to.equal(data.result.error);
        console.log("\n Validated the error message is empty.");

        tc_title = 'Validated the success message of create PO with one line items.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            JobId: existedJobId,
            LineItem1: lineItemCode1,
            PO_number: ponumber,
            PO_JobDoucumentId: result.poJobDocumentId
        };

    }).timeout(200000);

    it("Validate the error message with invalid jobId of 'Create Purchase Order'", async () => {

        var create_po_invalid_jobId_params = {

            action: cp_action,
            jobNumber: invalid_data,
            vendorCode: ssac_vendorcode,
            operatorCode: username,
            poDate: currentDate,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: existedItemCode
                }
            ]
        }

        await testLib.login(username, password);

        let cp_resp = await testLib.postPO(create_po_invalid_jobId_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(invalid_jobId_errorMsg2).to.equal(data.error);
        console.log("\n Validated the error message : " + invalid_jobId_errorMsg2);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message with invalid jobId of 'Create Purchase Order'";

        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            createdPo_invalid_jobId_errorMsg: invalid_jobId_errorMsg2,
            createdPo_invalid_jobId_errorCode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message with invalid vendor code of 'Create Purchase Order'", async () => {

        var create_po_invalid_jobId_params = {

            action: cp_action,
            jobNumber: existedJob,
            vendorCode: invalid_data,
            operatorCode: username,
            poDate: currentDate,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: existedItemCode
                }
            ]
        }

        await testLib.login(username, password);

        let cp_resp = await testLib.postPO(create_po_invalid_jobId_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(invalid_vendor_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + invalid_vendor_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message with invalid vendor code of 'Create Purchase Order'";

        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            createdPo_invalid_vendor_errorMsg: invalid_vendor_errorMsg,
            createdPo_invalid_data_ErrorCode: errorCode_400
        };

    }).timeout(200000);

    it("Validate the error message with invalid line item of 'Create Purchase Order'", async () => {

        var create_po_invalid_jobId_params = {

            action: cp_action,
            jobNumber: existedJob,
            vendorCode: ipro_vendorcode,
            poDate: currentDate_yyyy_mm_dd,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: invalid_data
                }
            ]
        }

        await testLib.login(username, password);

        let cp_resp = await testLib.postPO(create_po_invalid_jobId_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(invalid_lineItem_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + invalid_lineItem_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message with invalid line item of 'Create Purchase Order'";

        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            createdPo_errorMsg: invalid_lineItem_errorMsg,
            createdPo_ErrorCode: errorCode_400
        };

    }).timeout(200000);

    it('Validate the error message with missing action filter.', async () => {

        var create_po_missing_action_params = {
            jobNumber: existedJob,
            vendorCode: ipro_vendorcode,
            poDate: currentDate_yyyy_mm_dd,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: existedItemCode
                }
            ]
        }

        await testLib.login(username, password);

        let cp_resp = await testLib.postPO(create_po_missing_action_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missing_action_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_action_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the error message with missing action filter.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missing_action_errorMsg: missing_action_errorMsg,
            missing_action_errorCode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the error message with missing jobId filter.', async () => {
        var create_po_missing_jobId_params = {
            action: cp_action,
            vendorCode: ipro_vendorcode,
            poDate: currentDate_yyyy_mm_dd,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: existedItemCode
                }
            ]
        }

        await testLib.login(username, password);

        let cp_resp = await testLib.postPO(create_po_missing_jobId_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(Empty_or_missed_JobId).to.equal(data.error);
        console.log("\n Validated the error message : " + Empty_or_missed_JobId);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the error message with missing jobId filter.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missing_jobId_errorMsg: Empty_or_missed_JobId,
            missing_jobId_errorCode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the error message with missing vendorcode filter.', async () => {
        var create_po_missing_vendorcode_params = {
            action: cp_action,
            jobNumber: existedJob,
            operatorCode: username,
            poDate: currentDate,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: existedItemCode
                }
            ]
        }

        await testLib.login(username, password);

        let cp_resp = await testLib.postPO(create_po_missing_vendorcode_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(create_po_misses_vendorcode_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + create_po_misses_vendorcode_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the error message with missing vendorcode filter.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missing_vendorcode_errorMsg: create_po_misses_vendorcode_errorMsg,
            missing_vendorcode_errorCode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the error message with missing lineItem filter.', async () => {
        var create_po_missing_lineItems_params = {
            action: cp_action,
            jobNumber: existedJob,
            vendorCode: ssac_vendorcode,
            operatorCode: username,
            poDate: currentDate,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
        }

        await testLib.login(username, password);

        let cp_resp = await testLib.postPO(create_po_missing_lineItems_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(misses_lineItems_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + misses_lineItems_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the error message with missing lineItem filter.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missing_lineItems_errorMsg: misses_lineItems_errorMsg,
            missing_lineItems_errorCode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the error message with one missing lineItem of multiple PO orders.', async () => {

        await testLib.login(username, password);

        let getJobDetailsResp = await testLib.getJobDetails(existedJob);
        respInJson = testLib.jsonparse(getJobDetailsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode1 = data.result.lineItems[0].itemCode;
        lineItemCode2 = data.result.lineItems[1].itemCode;

        var create_po_missing_one_lineItem_params = {
            action: cp_action,
            jobNumber: existedJob,
            vendorCode: ssac_vendorcode,
            operatorCode: username,
            poDate: currentDate,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                },
                {

                }
            ]
        }

        let cp_resp = await testLib.postPO(create_po_missing_one_lineItem_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(missing_empty_lineItemCode_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_empty_lineItemCode_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validate the error message with one missing lineItem of multiple PO orders.";
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            One_Missing_line_itemcode_errorMsg: missing_empty_lineItemCode_errorMsg,
            One_Missing_line_itemcode_errorCode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the error message with one empty lineItem in multiple PO orders.', async () => {

        await testLib.login(username, password);

        var create_po_empty_lineItems_params = {
            action: cp_action,
            jobNumber: existedJob,
            vendorCode: ssac_vendorcode,
            poDate: currentDate,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: existedItemCode
                },
                {
                    itemCode: ''
                }
            ]
        }

        let cp_resp = await testLib.postPO(create_po_empty_lineItems_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missing_empty_lineItemCode_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_empty_lineItemCode_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message with one empty lineItem in multiple PO orders.";
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            Empty_line_itemcode_errorMsg: missing_empty_lineItemCode_errorMsg,
            Empty_line_itemcode_errorCode: errorCode_400
        };
    }).timeout(200000);


    it('Validate the error message with empty lineItem of single PO orders.', async () => {

        await testLib.login(username, password);

        var create_po_empty_lineItems_params = {
            action: cp_action,
            jobNumber: existedJob,
            vendorCode: ssac_vendorcode,
            operatorCode: username,
            poDate: currentDate,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: ''
                }
            ]
        }

        let cp_resp = await testLib.postPO(create_po_empty_lineItems_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missing_empty_lineItemCode_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missing_empty_lineItemCode_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message with empty lineItem of single PO orders.";
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            Empty_line_itemcode_errorMsg: missing_empty_lineItemCode_errorMsg,
            Empty_line_itemcode_errorCode: errorCode_400
        };
    }).timeout(200000);

    /**
     *                   This test case is deprecated
     */

    // it("Validate the error message with invalid operator code of 'Create Purchase Order'", async () => {

    //     await testLib.login(username, password);

    //     let cj_resp = await testLib.postPO(create_job_params);
    //     respInJson = testLib.jsonparse(cj_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     existedJobId = data.jobId;

    //     var add_lineItems_params = {
    //         action: add_line_action,
    //         jobId: existedJobId,
    //         lineItems: [
    //             {
    //                 cost: Cost,
    //                 price: Price,
    //                 supplier_item_number: Supplier_item_number,
    //                 productCode: ProductCode,
    //                 productColor: ProductColor,
    //                 productSizeCode: ProductSizeCode,
    //                 buy_unit_of_measure: Buy_unit_of_measure,
    //                 buy_quantity_ordered: Buy_quantity_ordered,
    //                 sell_unit_of_measure: Sell_unit_of_measure,
    //                 sell_quantity_ordered: Sell_quantity_ordered,
    //             }
    //         ]
    //     };

    //     await testLib.lineitems(add_lineItems_params);

    //     let jobIdResp1 = await testLib.getJobDetails(existedJobId);
    //     respInJson = testLib.jsonparse(jobIdResp1);
    //     data = testLib.jsonparse(respInJson.data);

    //     var lineItemCode = data.result.lineItems[0].itemCode;
    //     var vendorcode = data.result.lineItems[0].vendorCode;

    //     var create_po_invalid_operator_params = {

    //         action: cp_action,
    //         jobNumber: existedJobId,
    //         vendorCode: vendorcode,
    //         operatorCode: other_affiliate,
    //         poDate: currentDate,
    //         productionContactName: ProductionContactName,
    //         orderToContactId: OrderToContactId,
    //         carrier: Carrier,
    //         alternateShippingAccount: AlternateShippingAccount,
    //         additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
    //         additionalInstructions: AdditionalInstructions,
    //         automaticInstructions: AutomaticInstructions,
    //         imageDisplay: ImageDisplay,
    //         documentConfigurationID: DocumentConfigurationID,
    //         lineItems: [
    //             {
    //                 itemCode: lineItemCode
    //             }
    //         ]
    //     }

    //     let cp_resp = await testLib.postPO(create_po_invalid_operator_params);
    //     respInJson = testLib.jsonparse(cp_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     expect(successCode_200).to.equal(respInJson.statusCode);
    //     console.log("\n Validated the status code :  " + successCode_200);

    //     expect(invalid_operator_errorMsg).to.equal(data.error);
    //     console.log("\n Validated the error message : " + invalid_operator_errorMsg);

    //     expect(errorCode_400).to.equal(data.errorCode);
    //     console.log("\n Validated the error code : " + errorCode_400);

    //     tc_title = "alidated the error message with invalid operator code of 'Create Purchase Order'";

    //     values = {
    //         Affiliate_user: username,
    //         statusCode: successCode_200,
    //         createdPo_errorMsg: invalid_operator_errorMsg,
    //         createdPo_ErrorCode: errorCode_400
    //     };
    // }).timeout(200000);

    // it('Validate the Purchase Order should be created with missing operator code.', async () => {

    //     await testLib.login(username, password);

    //     var create_po_missing_operator_params = {

    //         action: cp_action,
    //         jobNumber: existedJob,
    //         vendorCode: ipro_vendorcode,
    //         poDate: currentDate,
    //         productionContactName: ProductionContactName,
    //         orderToContactId: OrderToContactId,
    //         carrier: Carrier,
    //         alternateShippingAccount: AlternateShippingAccount,
    //         additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
    //         additionalInstructions: AdditionalInstructions,
    //         automaticInstructions: AutomaticInstructions,
    //         imageDisplay: ImageDisplay,
    //         documentConfigurationID: DocumentConfigurationID,
    //         lineItems: [
    //             {
    //                 itemCode: existedItemCode
    //             }
    //         ]
    //     }

    //     let cp_resp = await testLib.postPO(create_po_missing_operator_params);
    //     respInJson = testLib.jsonparse(cp_resp);
    //     data = testLib.jsonparse(respInJson.data);
    //     result = data.result;

    //     expect(successCode_200).to.equal(respInJson.statusCode);
    //     console.log("\n Validated the status code :  " + successCode_200);

    //     expect(respInJson).to.not.have.haveOwnProperty('error');
    //     console.log("\n Validated the 'error' is not displayed.");

    //     expect(result).to.have.haveOwnProperty('poJobDocumentId');
    //     console.log("\n Validated 'poJobDocumentId' field is displayed.");

    //     expect(true).to.equal(result.success);
    //     console.log("\n Validated the po got created.");

    //     var ponumber = result.poNumber;
    //     expect(existedJobId).to.equal((ponumber).split('-')[0]);
    //     console.log("\n Validated the poNumber : " + existedJobId);

    //     expect('').to.equal(result.error);
    //     console.log("\n Validated the error message is empty.");

    //     tc_title = 'Validated the success message with with missing operator code of create Purchase Order.';
    //     values = {
    //         Affiliate_user: username,
    //         statusCode: successCode_200,
    //         operator_code: username,
    //         JobId: existedJob,
    //         LineItem1: existedItemCode,
    //         PO_number: ponumber,
    //         PO_JobDoucumentId: result.poJobDocumentId
    //     };

    // }).timeout(200000);

    //------------------------------------Is Po Available For PSPO---------------------------------------

    // it("Validate the success message of 'Is Po Available For PSPO'.", async () => {

    //     await testLib.login(username, password);
    //     let cj_resp = await testLib.postPO(create_job_params);
    //     respInJson = testLib.jsonparse(cj_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     existedJobId = data.jobId;

    //     var add_lineItems_params = {
    //         action: add_line_action,
    //         jobId: existedJobId,
    //         lineItems: [
    //             {
    //                 cost: Cost,
    //                 price: Price,
    //                 supplier_item_number: Supplier_item_number,
    //                 productCode: ProductCode,
    //                 productColor: ProductColor,
    //                 productSizeCode: ProductSizeCode,
    //                 buy_unit_of_measure: Buy_unit_of_measure,
    //                 buy_quantity_ordered: Buy_quantity_ordered,
    //                 sell_unit_of_measure: Sell_unit_of_measure,
    //                 sell_quantity_ordered: Sell_quantity_ordered,
    //                 source: Source,
    //                 vendor: ipro_vendorcode,
    //                 asi_supplier_id: Asi_supplier_id,
    //                 asi_product_id: Asi_product_id,
    //                 date_due: futureDate_yyyy_mm_dd
    //             }
    //         ]
    //     };

    //     let cr_lineitem_resp = await testLib.lineitems(add_lineItems_params);
    //     respInJson = testLib.jsonparse(cr_lineitem_resp);
    //     data = testLib.jsonparse(respInJson.data);
    //     lineItemCode1 = data.newItemCodes[0];

    //     var create_po_one_lineItem_params = {
    //         action: cp_action,
    //         jobNumber: existedJobId,
    //         vendorCode: ipro_vendorcode,
    //         poDate: currentDate_yyyy_mm_dd,
    //         productionContactName: ProductionContactName,
    //         orderToContactId: OrderToContactId,
    //         carrier: Carrier,
    //         alternateShippingAccount: AlternateShippingAccount,
    //         additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
    //         additionalInstructions: AdditionalInstructions,
    //         automaticInstructions: AutomaticInstructions,
    //         imageDisplay: ImageDisplay,
    //         documentConfigurationID: DocumentConfigurationID,
    //         lineItems: [
    //             {
    //                 itemCode: lineItemCode1
    //             }
    //         ]
    //     }

    //     let cp_resp = await testLib.postPO(create_po_one_lineItem_params);
    //     respInJson = testLib.jsonparse(cp_resp);
    //     data = testLib.jsonparse(respInJson.data);
    //     var ponumber = data.result.poNumber;

    //     global.is_po_available_for_pspo_params = {
    //         action: is_po_available_for_pspo,
    //         poNumber: ponumber
    //     }

    //     let ub_resp = await testLib.getPO(is_po_available_for_pspo_params);
    //     respInJson = testLib.jsonparse(ub_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     expect(successCode_200).to.equal(respInJson.statusCode);
    //     console.log("\n Validated the status code :  " + successCode_200);

    //     expect(respInJson).to.not.have.haveOwnProperty('error');
    //     console.log("\n Validated the 'error' is not displayed.");

    //     expect(data).to.have.haveOwnProperty('isValid');
    //     console.log("\n Validated 'isValid' field is displayed.");

    //     expect(1).to.equal(data.isValid);
    //     console.log("\n Validated 'isValid' data : 1");

    //     tc_title = "Validated the success message of 'Is Po Available For PSPO'.";
    //     values = {
    //         Affiliate_user: username,
    //         StatusCode: successCode_200,
    //         isValid_valude: 1
    //     };
    // }).timeout(200000);

    // it("Validate the error message of 'Is Po Available For PSPO' with missed poNumber field.", async () => {

    //     await testLib.login(username, password);

    //     global.is_po_available_for_pspo_params = {
    //         action: is_po_available_for_pspo
    //     }

    //     let ub_resp = await testLib.getPO(is_po_available_for_pspo_params);
    //     respInJson = testLib.jsonparse(ub_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     expect(missed_empty_poNumber_errorMsg).to.equal(data.error);
    //     console.log("\n Validated the error message : " + missed_empty_poNumber_errorMsg);

    //     expect(errorCode_400).to.equal(data.errorCode);
    //     console.log("\n Validated the error code : " + errorCode_400);

    //     tc_title = "Validated the success message of 'Is Po Available For PSPO' with missed poNumber field.";

    //     values = {
    //         Affiliate_user: username,
    //         statusCode: successCode_200,
    //         Missed_poNumber_errorMsg: missed_empty_poNumber_errorMsg,
    //         Missed_poNumber_errorCode: errorCode_400
    //     };
    // }).timeout(200000);

    // it("Validate the error message of 'Is Po Available For PSPO' with empty poNumber field.", async () => {

    //     await testLib.login(username, password);

    //     global.is_po_available_for_pspo_params = {
    //         action: is_po_available_for_pspo,
    //         poNumber: ''
    //     }

    //     let ub_resp = await testLib.getPO(is_po_available_for_pspo_params);
    //     respInJson = testLib.jsonparse(ub_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     expect(missed_empty_poNumber_errorMsg).to.equal(data.error);
    //     console.log("\n Validated the error message : " + missed_empty_poNumber_errorMsg);

    //     expect(errorCode_400).to.equal(data.errorCode);
    //     console.log("\n Validated the error code : " + errorCode_400);

    //     tc_title = "Validated the success message of 'Is Po Available For PSPO' with empty poNumber field.";

    //     values = {
    //         Affiliate_user: username,
    //         statusCode: successCode_200,
    //         Empty_poNumber_errorMsg: missed_empty_poNumber_errorMsg,
    //         Empty_poNumber_errorCode: errorCode_400
    //     };
    // }).timeout(200000);

    // it("Validate the error message of 'Is Po Available For PSPO' with invalid poNumber field.", async () => {

    //     await testLib.login(username, password);

    //     global.is_po_available_for_pspo_params = {
    //         action: is_po_available_for_pspo,
    //         poNumber: invalid_data
    //     }

    //     let ub_resp = await testLib.getPO(is_po_available_for_pspo_params);
    //     respInJson = testLib.jsonparse(ub_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     expect(invalid_poNumber_errorMsg).to.equal(data.error);
    //     console.log("\n Validated the error message : " + invalid_poNumber_errorMsg);

    //     expect(errorCode_400).to.equal(data.errorCode);
    //     console.log("\n Validated the error code : " + errorCode_400);

    //     tc_title = "Validated the success message of 'Is Po Available For PSPO' with invalid poNumber field.";

    //     values = {
    //         Affiliate_user: username,
    //         statusCode: successCode_200,
    //         Invalid_poNumber_errorMsg: invalid_poNumber_errorMsg,
    //         Invalid_poNumber_errorCode: errorCode_400
    //     };
    // }).timeout(200000);

    //------------------------------------Get PO---------------------------------------

    // it("Validate the success message of 'Get PO'.", async () => {

    //     await testLib.login(username, password);
    //     let cj_resp = await testLib.postPO(create_job_params);
    //     respInJson = testLib.jsonparse(cj_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     existedJobId = data.jobId;

    //     var add_lineItems_params = {
    //         action: add_line_action,
    //         jobId: existedJobId,
    //         lineItems: [
    //             {
    //                 cost: Cost,
    //                 price: Price,
    //                 supplier_item_number: Supplier_item_number,
    //                 productCode: ProductCode,
    //                 productColor: ProductColor,
    //                 productSizeCode: ProductSizeCode,
    //                 buy_unit_of_measure: Buy_unit_of_measure,
    //                 buy_quantity_ordered: Buy_quantity_ordered,
    //                 sell_unit_of_measure: Sell_unit_of_measure,
    //                 sell_quantity_ordered: Sell_quantity_ordered,
    //                 source: Source,
    //                 vendor: ipro_vendorcode,
    //                 asi_supplier_id: Asi_supplier_id,
    //                 asi_product_id: Asi_product_id,
    //                 date_due: futureDate_yyyy_mm_dd
    //             }
    //         ]
    //     };

    //     let cr_lineitem_resp = await testLib.lineitems(add_lineItems_params);
    //     respInJson = testLib.jsonparse(cr_lineitem_resp);
    //     data = testLib.jsonparse(respInJson.data);
    //     succMessage = data.message;
    //     succMsgArray = succMessage.split(" ");
    //     lineItemCode1 = String(succMsgArray.slice(-1));
    //     lineItemCode1 = lineItemCode1.slice(0, -1);

    //     let getJobDetailsResp = await testLib.getJobDetails(existedJobId);
    //     respInJson = testLib.jsonparse(getJobDetailsResp);
    //     data = testLib.jsonparse(respInJson.data);

    //     var create_po_one_lineItem_params = {

    //         action: cp_action,
    //         jobNumber: invalid_data,
    //         vendorCode: ipro_vendorcode,
    //         poDate: currentDate_yyyy_mm_dd,
    //         productionContactName: ProductionContactName,
    //         orderToContactId: OrderToContactId,
    //         carrier: Carrier,
    //         alternateShippingAccount: AlternateShippingAccount,
    //         additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
    //         additionalInstructions: AdditionalInstructions,
    //         automaticInstructions: AutomaticInstructions,
    //         imageDisplay: ImageDisplay,
    //         documentConfigurationID: DocumentConfigurationID,
    //         lineItems: [
    //             {
    //                 itemCode: lineItemCode1
    //             }
    //         ]
    //     }

    //     let cp_resp = await testLib.postPO(create_po_one_lineItem_params);
    //     respInJson = testLib.jsonparse(cp_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     var ponumber = data.result.poNumber;

    //     global.is_po_available_for_pspo_params = {
    //         action: is_po_available_for_pspo,
    //         poNumber: ponumber
    //     }

    //     let ub_resp = await testLib.getPO(is_po_available_for_pspo_params);
    //     respInJson = testLib.jsonparse(ub_resp);
    //     data = testLib.jsonparse(respInJson.data);

    //     expect(successCode_200).to.equal(respInJson.statusCode);
    //     console.log("\n Validated the status code :  " + successCode_200);

    //     expect(respInJson).to.not.have.haveOwnProperty('error');
    //     console.log("\n Validated the 'error' is not displayed.");

    //     expect("success message").to.have.haveOwnProperty(data.message);
    //     console.log("\n Validated 'updated success message' field is displayed.");

    //     tc_title = "Validated the success message of 'Get PO'.";
    //     values = {
    //         Affiliate_user: username,
    //         StatusCode: successCode_200
    //     };
    // }).timeout(200000);

    //------------------------------------Void PO---------------------------------------

    it("Validate the success message of 'Void PO'.", async () => {

        await testLib.login(username, password);

        let cj_resp = await testLib.postPO(create_job_params);
        respInJson = testLib.jsonparse(cj_resp);
        data = testLib.jsonparse(respInJson.data);

        existedJobId = data.jobId;

        let getJobDetailsResp = await testLib.getJobDetails(existedJobId);
        respInJson = testLib.jsonparse(getJobDetailsResp);
        data = testLib.jsonparse(respInJson.data);
        var jobStatus = data.result.jobStatus

        expect(jobStatusFilters[0]).to.equal(jobStatus);
        console.log("\n Validated 'jobStatus' for new job : " + jobStatusFilters[0]);

        var add_lineItems_params = {
            action: add_line_action,
            jobId: existedJobId,
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

        let cr_lineitem_resp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(cr_lineitem_resp);
        data = testLib.jsonparse(respInJson.data);
        lineItemCode1 = data.newItemCodes[0];

        var create_po_one_lineItem_params = {
            action: cp_action,
            jobNumber: existedJobId,
            vendorCode: ipro_vendorcode,
            poDate: currentDate_yyyy_mm_dd,
            productionContactName: ProductionContactName,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: AlternateShippingAccount,
            additionalInstructionsOnSeparatePage: AdditionalInstructionsOnSeparatePage,
            additionalInstructions: AdditionalInstructions,
            automaticInstructions: AutomaticInstructions,
            imageDisplay: ImageDisplay,
            documentConfigurationID: DocumentConfigurationID,
            lineItems: [
                {
                    itemCode: lineItemCode1
                }
            ]
        }

        let cp_resp = await testLib.postPO(create_po_one_lineItem_params);
        respInJson = testLib.jsonparse(cp_resp);
        data = testLib.jsonparse(respInJson.data);
        var ponumber = data.result.poNumber;

        let getJobDetailsResp_po = await testLib.getJobDetails(existedJobId);
        respInJson = testLib.jsonparse(getJobDetailsResp_po);
        data = testLib.jsonparse(respInJson.data);
        var jobStatus = data.result.jobStatus

        expect(jobStatusFilters[2]).to.equal(jobStatus);
        console.log("\n Validated 'jobStatus' for PO created job Id : " + jobStatusFilters[2]);

        global.void_po_params = {
            action: void_po,
            poNumber: ponumber
        }

        let vp_resp = await testLib.postPO(void_po_params);
        respInJson = testLib.jsonparse(vp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        succMessage = success_msg_void_po + ponumber

        expect(succMessage).to.equal(data.message);
        console.log("\n Validated 'message' data : " + succMessage);

        let getJobDetailsResp_vp = await testLib.getJobDetails(existedJobId);
        respInJson = testLib.jsonparse(getJobDetailsResp_vp);
        data = testLib.jsonparse(respInJson.data);
        var jobStatus = data.result.jobStatus

        expect(jobStatusFilters[0]).to.equal(jobStatus);
        console.log("\n Validated 'jobStatus' for void po Job Id : " + jobStatusFilters[0]);

        tc_title = "Validated the success message of 'Void PO'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            isValid_valude: 1
        };
    }).timeout(200000);

    it('Validate the error message of void po with missing poNumber field.', async () => {
       
        await testLib.login(username, password);

        global.void_po_params = {
            action: void_po
        }

        let vp_resp = await testLib.postPO(void_po_params);
        respInJson = testLib.jsonparse(vp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missed_ponumber).to.equal(data.error);
        console.log("\n Validated the error message : " + missed_ponumber);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the error message of void po with missing poNumber field.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missing_jobId_errorMsg: missed_ponumber,
            missing_jobId_errorCode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the error message of void po with empty poNumber field.', async () => {
        
        await testLib.login(username, password);
        
        global.void_po_params = {
            action: void_po,
            poNumber: ''
        }

        let vp_resp = await testLib.postPO(void_po_params);
        respInJson = testLib.jsonparse(vp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(empty_ponumber).to.equal(data.error);
        console.log("\n Validated the error message : " + empty_ponumber);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the error message of void po with empty poNumber field.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missing_jobId_errorMsg: empty_ponumber,
            missing_jobId_errorCode: errorCode_400
        };
    }).timeout(200000);

    it('Validate the error message of void po with invalid poNumber field.', async () => {
        
        await testLib.login(username, password);
        
        global.void_po_params = {
            action: void_po,
            poNumber: invalid_data
        }

        let vp_resp = await testLib.postPO(void_po_params);
        respInJson = testLib.jsonparse(vp_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(invalid_ponumber).to.equal(data.error);
        console.log("\n Validated the error message : " + invalid_ponumber);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = 'Validated the error message of void po with invalid poNumber field.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            missing_jobId_errorMsg: invalid_ponumber,
            missing_jobId_errorCode: errorCode_400
        };
    }).timeout(200000);
});