describe('Bundled PO Apis validations .......', () => {

    var AutomaticInstructions = 'test bunldedPO'

    //-------------------get available items for Bundled po-----------------------

    it("Validate the success message of 'get available items for Bundled po'.", async () => {

        await testLib.login(username, password);

        var get_available_items_Bundled_po_params = {
            action: get_available_items_Bundled_po,
            vendor: sanm_vendorcode
        }
        let gb_resp = await testLib.getBundledPo(get_available_items_Bundled_po_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result).to.have.haveOwnProperty('bundledPOItems');
        console.log("\n Validated 'bundledPOItems' field is displayed.");

        thiscount = data.thisCount
        var bundledPOItems = data.result.bundledPOItems,
            bundledPOItemsLength = bundledPOItems.length;
        expect(bundledPOItemsLength).to.equal(thiscount);
        console.log("\n Validated the 'bundledPOItems' count : " + thiscount);

        tc_title = "Validated the success message of 'get available items for Bundled po'.";
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            availableItems: thiscount
        };
    }).timeout(200000);

    it("Validate the error message of 'get available items for Bundled po' with missed vendor.", async () => {

        await testLib.login(username, password);

        var get_available_items_Bundled_po_params = {
            action: get_available_items_Bundled_po
        }
        let gb_resp = await testLib.getBundledPo(get_available_items_Bundled_po_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missed_empty_vendor_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missed_empty_vendor_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'get available items for Bundled po' with missed vendor.";
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            Missed_Vendor_errorMsg: missed_empty_vendor_errorMsg,
            Missed_Vendor_errcode: errorCode_400
        };

    }).timeout(200000);

    it("Validate the error message of 'get available items for Bundled po' with empty vendor field.", async () => {

        await testLib.login(username, password);

        var get_available_items_Bundled_po_params = {
            action: get_available_items_Bundled_po,
            vendor: ''
        }
        let gb_resp = await testLib.getBundledPo(get_available_items_Bundled_po_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missed_empty_vendor_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missed_empty_vendor_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'get available items for Bundled po' with empty vendor field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Missed_Vendor_errorMsg: missed_empty_vendor_errorMsg,
            Missed_Vendor_errcode: errorCode_400
        };

    }).timeout(200000);

    it("Validate the error message of 'get available items for Bundled po' with invalid vendor.", async () => {

        await testLib.login(username, password);

        var get_available_items_Bundled_po_params = {
            action: get_available_items_Bundled_po,
            vendor: invalid_data
        }
        let gb_resp = await testLib.getBundledPo(get_available_items_Bundled_po_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(invlaid_vendor_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + invlaid_vendor_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'get available items for Bundled po' with invalid vendor.";
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            Invalid_Vendor_errorMsg: invlaid_vendor_errorMsg,
            Invalid_Vendor_errcode: errorCode_400
        };
    }).timeout(200000);

    //-------------------------get alternate address for Bundled po----------------------

    it("Validate the success message of 'get alternate address for Bundled po'.", async () => {

        await testLib.login(username, password);

        var get_alternate_address_Bundled_po_params = {
            action: get_alternate_address_Bundled_po
        }
        let gb_resp = await testLib.getBundledPo(get_alternate_address_Bundled_po_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data.result).to.have.haveOwnProperty('altAddress');
        console.log("\n Validated 'altAddress' field is displayed.");

        thiscount = data.thisCount
        var altAddresses = data.result.altAddress,
            altAddressesLength = altAddresses.length;
        expect(altAddressesLength).to.equal(thiscount);
        console.log("\n Validated the 'altAddress' count : " + thiscount);

        tc_title = "Validated the success message of 'get alternate address for Bundled po'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            AltAddresses: thiscount
        };
    }).timeout(200000);

    //-------------------------Get Default Setting of Bunlded PO----------------------

    it("Validate the success message of 'Get Default Setting of Bunlded PO'.", async () => {

        await testLib.login(username, password);

        var get_bundled_po_default_setting_params = {
            action: get_bundled_po_default_setting
        }
        let gb_resp = await testLib.getBundledPo(get_bundled_po_default_setting_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('result');
        console.log("\n Validated 'result' field is displayed.");

        tc_title = "Validated the success message of 'Get Default Setting of Bunlded PO'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200
        };
    }).timeout(200000);

    //-------------------------Get Fullfillment List of Bunlded PO----------------------

    it("Validate the success message of 'Get Fullfillment List of Bunlded PO'.", async () => {

        await testLib.login(username, password);

        var get_bundled_po_fullfillment_list_params = {
            action: get_bundled_po_fullfillment_list
        }
        let gb_resp = await testLib.getBundledPo(get_bundled_po_fullfillment_list_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data.result).to.have.haveOwnProperty('fullFillmentList');
        console.log("\n Validated 'fullFillmentList' field is displayed.");

        tc_title = "Validated the success message of 'Get Fullfillment List of Bunlded PO'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200
        };
    }).timeout(200000);

    //-------------------------Get Bundled PO Suggestion Carrier List----------------------

    it("Validate the success message of 'Get Bundled PO Suggestion Carrier List'.", async () => {

        await testLib.login(username, password);

        var get_bundled_po_carrier_list_params = {
            action: get_bundled_po_carrier_list,
            vendor: sanm_vendorcode
        }
        let gb_resp = await testLib.getBundledPo(get_bundled_po_carrier_list_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data.result).to.have.haveOwnProperty('carriers');
        console.log("\n Validated 'carriers' field is displayed.");

        tc_title = "Validated the success message of 'Get Bundled PO Suggestion Carrier List'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200
        };
    }).timeout(200000);

    it("Validate the error message of 'Get Bundled PO Suggestion Carrier List' with missed vendor.", async () => {

        await testLib.login(username, password);

        var get_bundled_po_carrier_list_params = {
            action: get_bundled_po_carrier_list
        }
        let gb_resp = await testLib.getBundledPo(get_bundled_po_carrier_list_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missed_empty_vendor_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missed_empty_vendor_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Get Bundled PO Suggestion Carrier List' with missed vendor.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Missed_Vendor_errorMsg: missed_empty_vendor_errorMsg,
            Missed_Vendor_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Get Bundled PO Suggestion Carrier List' with empty vendor.", async () => {

        await testLib.login(username, password);

        var get_bundled_po_carrier_list_params = {
            action: get_bundled_po_carrier_list,
            vendor: ''
        }
        let gb_resp = await testLib.getBundledPo(get_bundled_po_carrier_list_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missed_empty_vendor_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missed_empty_vendor_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Get Bundled PO Suggestion Carrier List' with empty vendor.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Empty_Vendor_errorMsg: missed_empty_vendor_errorMsg,
            Empty_Vendor_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Get Bundled PO Suggestion Carrier List' with invalid vendor.", async () => {

        await testLib.login(username, password);

        var get_bundled_po_carrier_list_params = {
            action: get_bundled_po_carrier_list,
            vendor: invalid_data
        }
        let gb_resp = await testLib.getBundledPo(get_bundled_po_carrier_list_params);
        respInJson = testLib.jsonparse(gb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(invlaid_vendor_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + invlaid_vendor_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Get Bundled PO Suggestion Carrier List' with invalid vendor.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Invalid_Vendor_errorMsg: invlaid_vendor_errorMsg,
            Invalid_Vendor_errcode: errorCode_400
        };
    }).timeout(200000);

    //------------------------------------Create Bundled PO---------------------------------------

    it("Validate the success message of 'Create Bundled PO'.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);

        var poAddressId = data.id

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode1 = data.newItemCodes[0]

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode2 = data.newItemCodes[0]

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: sanm_vendorcode,
            affiliateCode: username,
            gpoAddressID: poAddressId,
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            // fileAttachments: [
            //     {
            //         id: "2191200"
            //     }
            // ],
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result).to.have.haveOwnProperty('success');
        console.log("\n Validated 'success' field is displayed.");

        expect(data.result).to.have.haveOwnProperty('poJobDocumentId');
        console.log("\n Validated 'poJobDocumentId' field is displayed.")

        expect(data.result).to.have.haveOwnProperty('poNumber');
        console.log("\n Validated 'poNumber' field is displayed.")

        expect(data.result).to.have.haveOwnProperty('error');
        console.log("\n Validated 'error' field is displayed.")

        var poNumber = data.result.poNumber,
            poJobDocumentId = data.result.poJobDocumentId,
            success = data.result.success,
            poNumberLast3Letters = poNumber.slice(poNumber.length - 3)

        expect(poNumberLast3Letters).to.equal(username);
        console.log("\n Validated the poNumber : " + poNumberLast3Letters)

        tc_title = "Validated the success message of 'Create Bundled PO'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Success: success,
            PoJobDocumentId: poJobDocumentId,
            PoNumber: poNumber
        };
    }).timeout(200000);

    it("Validate the success message of 'Create Bundled PO' with gpoAddressID : 443 which is use for 'See attach list'.", async () => {

        await testLib.login(username, password);

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode1 = data.newItemCodes[0]

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode2 = data.newItemCodes[0]

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: sanm_vendorcode,
            affiliateCode: username,
            gpoAddressID: '443',     //po address : '443' which use for “See attach list”     
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data.result).to.have.haveOwnProperty('success');
        console.log("\n Validated 'success' field is displayed.");

        expect(data.result).to.have.haveOwnProperty('poJobDocumentId');
        console.log("\n Validated 'poJobDocumentId' field is displayed.")

        expect(data.result).to.have.haveOwnProperty('poNumber');
        console.log("\n Validated 'poNumber' field is displayed.")

        expect(data.result).to.have.haveOwnProperty('error');
        console.log("\n Validated 'error' field is displayed.")

        var poNumber = data.result.poNumber,
            poJobDocumentId = data.result.poJobDocumentId,
            success = data.result.success,
            poNumberLast3Letters = poNumber.slice(poNumber.length - 3)

        expect(poNumberLast3Letters).to.equal(username);
        console.log("\n Validated the poNumber : " + poNumberLast3Letters)

        tc_title = "Validated the success message of 'Create Bundled PO' with gpoAddressID : 443 which is use for 'See attach list'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Success: success,
            PoJobDocumentId: poJobDocumentId,
            PoNumber: poNumber
        };
    }).timeout(200000);

    it("Validate the error message of 'Create Bundled PO' with missed vendorCode field.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);


        var poAddressId = data.id

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode1 = data.newItemCodes[0]

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode2 = data.newItemCodes[0]

        var create_bundled_po_params = {
            action: create_bundled_po,
            affiliateCode: username,
            gpoAddressID: poAddressId,
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(Missing_vendor_code_field_to_create_PO).to.equal(data.error);
        console.log("\n Validated the error message : " + Missing_vendor_code_field_to_create_PO);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Create Bundled PO' with missed vendorCode.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Missed_Vendor_errorMsg: Missing_vendor_code_field_to_create_PO,
            Missed_Vendor_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Create Bundled PO' with empty vendorCode field.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);

        var poAddressId = data.id

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode1 = data.newItemCodes[0]

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode2 = data.newItemCodes[0]

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: '',
            affiliateCode: username,
            gpoAddressID: poAddressId,
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(Empty_vendor_code_field_to_create_PO).to.equal(data.error);
        console.log("\n Validated the error message : " + Empty_vendor_code_field_to_create_PO);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Create Bundled PO' with empty vendorCode.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Empty_Vendor_errorMsg: Empty_vendor_code_field_to_create_PO,
            Empty_Vendor_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Create Bundled PO' with invalid vendorCode field.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);


        var poAddressId = data.id

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode1 = data.newItemCodes[0]

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode2 = data.newItemCodes[0]

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: invalid_data,
            affiliateCode: username,
            gpoAddressID: poAddressId,
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(Empty_vendor_code_field_to_create_PO).to.equal(data.error);
        console.log("\n Validated the error message : " + Empty_vendor_code_field_to_create_PO);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Create Bundled PO' with invalid vendorCode.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Empty_Vendor_errorMsg: Empty_vendor_code_field_to_create_PO,
            Empty_Vendor_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Create Bundled PO' with missed LineItem field.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);


        var poAddressId = data.id

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: sanm_vendorcode,
            affiliateCode: username,
            gpoAddressID: poAddressId,
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(misses_lineItems_bundled_po_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + misses_lineItems_bundled_po_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Create Bundled PO' with missed lineitem field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Missed_LineItems_errorMsg: misses_lineItems_bundled_po_errorMsg,
            Missed_LineItems_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Create Bundled PO' with empty LineItem field.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);

        var poAddressId = data.id

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: sanm_vendorcode,
            affiliateCode: username,
            gpoAddressID: poAddressId,
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            lineItems: [
                {
                    itemCode: ''
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(empty_lineItems_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + empty_lineItems_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Create Bundled PO' with empty lineitem field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Empty_LineItems_errorMsg: empty_lineItems_errorMsg,
            Empty_LineItems_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Create Bundled PO' with invalid LineItem field.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);

        var poAddressId = data.id

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: sanm_vendorcode,
            affiliateCode: username,
            gpoAddressID: poAddressId,
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            lineItems: [
                {
                    itemCode: invalid_data
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(invalid_lineItems_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + invalid_lineItems_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Create Bundled PO' with invalid lineitem field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Invalid_LineItems_errorMsg: invalid_lineItems_errorMsg,
            Invalid_LineItems_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Create Bundled PO' with missed gpoAddressID field.", async () => {

        await testLib.login(username, password);

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode1 = data.newItemCodes[0]

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode2 = data.newItemCodes[0]

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: sanm_vendorcode,
            affiliateCode: username,
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(misses_gpoAddressID_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + misses_gpoAddressID_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Create Bundled PO' with missed gpoAddressID field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Missed_gpoAddressID_errorMsg: misses_gpoAddressID_errorMsg,
            Missed_gpoAddressID_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Create Bundled PO' with empty gpoAddressID field.", async () => {

        await testLib.login(username, password);

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode1 = data.newItemCodes[0]

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode2 = data.newItemCodes[0]

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: sanm_vendorcode,
            affiliateCode: username,
            gpoAddressID: '',
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(empty_gpoAddressID_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + empty_gpoAddressID_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Create Bundled PO' with empty gpoAddressID field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Empty_gpoAddressID_errorMsg: empty_gpoAddressID_errorMsg,
            Empty_gpoAddressID_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Create Bundled PO' with invalid gpoAddressID field.", async () => {

        await testLib.login(username, password);

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode1 = data.newItemCodes[0]

        var lineitemsResp = await testLib.lineitems(add_lineItems_params);
        respInJson = testLib.jsonparse(lineitemsResp);
        data = testLib.jsonparse(respInJson.data);

        lineItemCode2 = data.newItemCodes[0]

        var create_bundled_po_params = {
            action: create_bundled_po,
            vendorCode: sanm_vendorcode,
            affiliateCode: username,
            gpoAddressID: invalid_data,
            operatorCode: username,
            poDate: currentDate,
            productionSalesRepCode: username,
            orderToContactId: OrderToContactId,
            carrier: Carrier,
            alternateShippingAccount: "",
            additionalInstructions: "",
            automaticInstructions: AutomaticInstructions,
            documentConfigurationID: DocumentConfigurationID,
            summaryOnly: 0,
            additionalInstructionsOnSeparatePage: 0,
            noBreakVendins: 1,
            includeBlankgoodsPklist: 0,
            showInsBelowEachItem: 0,
            useAutoGenDescription: 1,
            freightEqualization: 0,
            insideDeliveryRequired: 1,
            updateCosts: 0,
            lineItems: [
                {
                    itemCode: lineItemCode1
                },
                {
                    itemCode: lineItemCode2
                }
            ]
        }
        let cb_resp = await testLib.postBundledPo(create_bundled_po_params);
        respInJson = testLib.jsonparse(cb_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(invalid_gpoAddressID_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + invalid_gpoAddressID_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Create Bundled PO' with invalid gpoAddressID field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Invalid_gpoAddressID_errorMsg: invalid_gpoAddressID_errorMsg,
            Invalid_gpoAddressID_errcode: errorCode_400
        };
    }).timeout(200000);

    //------------------------------------Add Bundled PO Address---------------------------------------

    it("Validate the success message of 'Add Bundled PO Address'.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data).to.have.haveOwnProperty('id');
        console.log("\n Validated 'id' field is displayed.");

        tc_title = "Validated the success message of 'Add Bundled PO Address'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            NewBundledPoAddress: data.id
        };
    }).timeout(200000);

    it("Validate the success message of 'Add Bundled PO Address' with out all optional fields", async () => {

        await testLib.login(username, password);

        var add_bundled_po_alternate_address_params = {
            action: add_bundled_po_alternate_address
        }
        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect(data).to.have.haveOwnProperty('id');
        console.log("\n Validated 'id' field is displayed.");

        tc_title = "Validated the success message of 'Add Bundled PO Address' with out all optional fields.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            NewBundledPoAddress: data.id
        };
    }).timeout(200000);


    //------------------------------------Update Bundled PO Address---------------------------------------

    it("Validate the success message of 'Update Bundled PO Address'.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);

        var poAddressId = data.id

        global.update_bundled_po_alternate_address_params = {
            action: update_bundled_po_address,
            id: poAddressId,
            updatingAddress: {
                addressLine1: updated_altAdr_addressLine1,
                addressLine2: altAdr_addressLine2,
                addressLine3: altAdr_addressLine3,
                city: altAdr_city,
                countryCode: altAdr_countryCode,
                name: altAdr_name,
                state: updated_altAdr_state,
                zip: altAdr_zip
            }
        }

        let ua_resp = await testLib.postBundledPo(update_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ua_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect("success message").to.have.haveOwnProperty(data.message);
        console.log("\n Validated 'updated success message' field is displayed.");

        tc_title = "Validated the success message of 'Update Bundled PO Address'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            UpdatedBundledPoAddress: poAddressId
        };
    }).timeout(200000);

    it("Validate the success message of 'Update Bundled PO Address' with missed updatingAddress section.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);

        var poAddressId = data.id

        global.update_bundled_po_alternate_address_params = {
            action: update_bundled_po_address,
            id: poAddressId,
        }

        let ua_resp = await testLib.postBundledPo(update_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ua_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect("success message").to.have.haveOwnProperty(data.message);
        console.log("\n Validated 'updated success message' field is displayed.");

        tc_title = "Validated the success message of 'Update Bundled PO Address' with missed updatingAddress section.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            UpdatedBundledPoAddress: poAddressId
        };
    }).timeout(200000);

    it("Validate the error message of 'Update Bundled PO Address' with missed id field.", async () => {

        await testLib.login(username, password);

        global.update_bundled_po_alternate_address_params = {
            action: update_bundled_po_address,
            updatingAddress: {
                addressLine1: updated_altAdr_addressLine1,
                addressLine2: altAdr_addressLine2,
                addressLine3: altAdr_addressLine3,
                city: altAdr_city,
                countryCode: altAdr_countryCode,
                name: altAdr_name,
                state: updated_altAdr_state,
                zip: altAdr_zip
            }
        }

        let ua_resp = await testLib.postBundledPo(update_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ua_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missed_address_id_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missed_address_id_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Update Bundled PO Address' with missed id field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Invalid_gpoAddressID_errorMsg: missed_address_id_errorMsg,
            Invalid_gpoAddressID_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Update Bundled PO Address' with empty id field.", async () => {

        await testLib.login(username, password);

        global.update_bundled_po_alternate_address_params = {
            action: update_bundled_po_address,
            id: '',
            updatingAddress: {
                addressLine1: updated_altAdr_addressLine1,
                addressLine2: altAdr_addressLine2,
                addressLine3: altAdr_addressLine3,
                city: altAdr_city,
                countryCode: altAdr_countryCode,
                name: altAdr_name,
                state: updated_altAdr_state,
                zip: altAdr_zip
            }
        }

        let ua_resp = await testLib.postBundledPo(update_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ua_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(empty_address_id_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + empty_address_id_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Update Bundled PO Address' with empty id field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Empty_address_id_errorMsg: empty_address_id_errorMsg,
            Empty_address_id_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Update Bundled PO Address' with invalid id field.", async () => {

        await testLib.login(username, password);

        global.update_bundled_po_alternate_address_params = {
            action: update_bundled_po_address,
            id: invalid_data,
            updatingAddress: {
                addressLine1: updated_altAdr_addressLine1,
                addressLine2: altAdr_addressLine2,
                addressLine3: altAdr_addressLine3,
                city: altAdr_city,
                countryCode: altAdr_countryCode,
                name: altAdr_name,
                state: updated_altAdr_state,
                zip: altAdr_zip
            }
        }

        let ua_resp = await testLib.postBundledPo(update_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ua_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(invalid_address_id_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + invalid_address_id_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Update Bundled PO Address' with invalid id field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Invalid_address_id_errorMsg: invalid_address_id_errorMsg,
            Invalid_address_id_errcode: errorCode_400
        };
    }).timeout(200000);

    //------------------------------------Update Default Setting of Bunlded PO---------------------------------------

    it("Validate the success message of 'Update Default Setting of Bunlded PO'.", async () => {

        await testLib.login(username, password);

        global.Update_bundled_po_default_setting_params = {
            action: Update_bundled_po_default_setting,
            carrier: Carrier,
            insideDeliveryReq: 1,
            productionSaleRep: cj_salesrepId,
            notAllowInsToBreakPg: 0,
            showOnSeparatePg: 0,
            useAutoGenDescription: 0,
            showInsBelowLineItem: 0,
            genSummaryOnlyPO: 0,
            includeBlankGood: 0
        }

        let ub_resp = await testLib.postBundledPo(Update_bundled_po_default_setting_params);
        respInJson = testLib.jsonparse(ub_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect("success message").to.have.haveOwnProperty(data.message);
        console.log("\n Validated 'updated success message' field is displayed.");

        tc_title = "Validated the success message of 'Update Default Setting of Bunlded PO'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200
        };
    }).timeout(200000);

    it("Validate the error message of 'Update Default Setting of Bunlded PO' with out all optional fields.", async () => {

        await testLib.login(username, password);

        global.Update_bundled_po_default_setting_params = {
            action: Update_bundled_po_default_setting
        }

        let ub_resp = await testLib.postBundledPo(Update_bundled_po_default_setting_params);
        respInJson = testLib.jsonparse(ub_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect("success message").to.have.haveOwnProperty(data.message);
        console.log("\n Validated 'updated success message' field is displayed.");

        tc_title = "Validated the error message of 'Update Default Setting of Bunlded PO' with out all optional fields.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200
        };
    }).timeout(200000);

    //------------------------------------Update Bundled PO Default Address---------------------------------------

    it("Validate the success message of 'Update Bundled PO Default Address'.", async () => {

        await testLib.login(username, password);

        let ab_resp = await testLib.postBundledPo(add_bundled_po_alternate_address_params);
        respInJson = testLib.jsonparse(ab_resp);
        data = testLib.jsonparse(respInJson.data);

        var poAddressId = data.id

        global.update_bundled_po_default_address_params = {
            action: update_bundled_po_default_address,
            id: poAddressId
        }

        let ub_resp = await testLib.postBundledPo(update_bundled_po_default_address_params);
        respInJson = testLib.jsonparse(ub_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(respInJson).to.not.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is not displayed.");

        expect("success message").to.have.haveOwnProperty(data.message);
        console.log("\n Validated 'updated success message' field is displayed.");

        tc_title = "Validated the success message of 'Update Bundled PO Default Address'.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200
        };
    }).timeout(200000);

    it("Validate the error message of 'Update Bundled PO Default Address' with missed id field.", async () => {

        await testLib.login(username, password);

        global.update_bundled_po_default_address_params = {
            action: update_bundled_po_default_address
        }

        let ub_resp = await testLib.postBundledPo(update_bundled_po_default_address_params);
        respInJson = testLib.jsonparse(ub_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(missed_address_id_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + missed_address_id_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Update Bundled PO Default Address' with missed id field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Invalid_gpoAddressID_errorMsg: missed_address_id_errorMsg,
            Invalid_gpoAddressID_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Update Bundled PO Default Address' with empty id field.", async () => {

        await testLib.login(username, password);

        global.update_bundled_po_default_address_params = {
            action: update_bundled_po_default_address,
            id: ''
        }

        let ub_resp = await testLib.postBundledPo(update_bundled_po_default_address_params);
        respInJson = testLib.jsonparse(ub_resp);
        data = testLib.jsonparse(respInJson.data);
        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(empty_address_id_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + empty_address_id_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Update Bundled PO Default Address' with empty id field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Empty_address_id_errorMsg: empty_address_id_errorMsg,
            Empty_address_id_errcode: errorCode_400
        };
    }).timeout(200000);

    it("Validate the error message of 'Update Bundled PO Default Address' with invalid id field.", async () => {

        await testLib.login(username, password);

        global.update_bundled_po_default_address_params = {
            action: update_bundled_po_default_address,
            id: invalid_data
        }

        let ub_resp = await testLib.postBundledPo(update_bundled_po_default_address_params);
        respInJson = testLib.jsonparse(ub_resp);
        data = testLib.jsonparse(respInJson.data);

        expect(successCode_200).to.equal(respInJson.statusCode);
        console.log("\n Validated the status code :  " + successCode_200);

        expect(data).to.have.haveOwnProperty('error');
        console.log("\n Validated the 'error' is displayed.");

        expect(invalid_address_id_errorMsg).to.equal(data.error);
        console.log("\n Validated the error message : " + invalid_address_id_errorMsg);

        expect(errorCode_400).to.equal(data.errorCode);
        console.log("\n Validated the error code : " + errorCode_400);

        tc_title = "Validated the error message of 'Update Bundled PO Default Address' with invalid id field.";
        values = {
            Affiliate_user: username,
            StatusCode: successCode_200,
            Invalid_address_id_errorMsg: invalid_address_id_errorMsg,
            Invalid_address_id_errcode: errorCode_400
        };
    }).timeout(200000);
})