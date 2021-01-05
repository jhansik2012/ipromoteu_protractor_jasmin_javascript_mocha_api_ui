describe('API data for UI validations .......', () => {

    it('customer_shipping_details', async () => {

        await testLib.login(username, password);

        let resp = await testLib.customers({
            action: get_shipping_customer_details_action,
            customerId: shipping_billing_customerId
        });
        respInJson = testLib.jsonparse(resp);
        data = testLib.jsonparse(respInJson.data);

        result = testLib.jsonparse(data.result);
        var billingCustomers = result.billingCustomers[0],

            customerShippingDetails = [{
                FAX: result.fax, CITY: result.city, EMAIL: result.email,
                PHONE: result.phone, STATE: result.state, CARRIER: result.carrier, TAXCODE: result.taxCode,
                ZIPCODE: result.zipCode, BILLCODE: result.billCode, CONTACTS: result.contacts, PHONEEXT: result.phoneExt,
                SHIPCODE: result.shipCode, DOCUMENTS: result.documents, TAXEXEMPT: result.taxExempt, MASTERCODE: result.masterCode,
                OPENORDERS: result.openOrders, COMPANYNAME: result.companyName, COUNTRYCODE: result.countryCode,
                RECEIVABLES: result.receivables, LTM_ORD_VOLUME: result.LTMOrdVolume, ADDRESSLINE1: result.addressLine1,
                ADDRESSLINE2: result.addressLine2, ADDRESSLINE3: result.addressLine3, CARRIERACCOUNT: result.carrierAccout,
                CLASSFICATION: result.classification, VERTICALMARKET: result.verticalMarket,
                BILLING_CUSTOMERS_ZIP: billingCustomers.zip, BILLING_CUSTOMERS_CITY: billingCustomers.city,
                BILLING_CUSTOMERS_STATE: billingCustomers.state, BILLING_CUSTOMERS_TERMS: billingCustomers.terms,
                BILLING_CUSTOMERS_LOCKBOX: billingCustomers.lockBox, BILLING_CUSTOMERS_BILLCODE: billingCustomers.billCode,
                BILLING_CUSTOMERS_COMPANYNAME: billingCustomers.companyName, BILLING_CUSTOMERS_ADDRESSLINE1: billingCustomers.addressLine1,
                BILLING_CUSTOMERS_ADDRESSLINE2: billingCustomers.addressLine2, BILLING_CUSTOMERS_ADDRESSLINE3: billingCustomers.addressLine3,
                BILLING_CUSTOMERS_PAPERBILLING: billingCustomers.paperBilling, NO_CARGO_INSURANCE: result.noCargoInsurance,
                BILLING_CUSTOMERS_CARGO_INSURANCE_COST_ONLY: billingCustomers.cargoInsuranceCostOnly
            }];

        const csv = new objectToCsv(customerShippingDetails);
        await csv.toDisk(customer_shipping_details_api_csv_path);

        tc_title = 'Retrieved the customer shipping details of the given shipping customerId.';
        values = {
            Affiliate_user: username,
            statusCode: successCode_200,
            CustomerId: shipping_billing_customerId
        };

    }).timeout(200000);

    it('Line_Items_data', async () => {

        await testLib.login(username, password);

        let resp = await testLib.getJobDetails(existedJob);
        respInJson = testLib.jsonparse(resp);
        data = testLib.jsonparse(respInJson.data);

        var exp_LineItemCode = data.result.lineItems[0].itemCode;

        let lineItemResp = await testLib.getLineItem({
            action: get_line_action,
            itemCode: exp_LineItemCode
        })
        respInJson = testLib.jsonparse(lineItemResp);
        data = testLib.jsonparse(respInJson.data);

        result = data.result;
        var productInfo = result.productInfo,
            vendorInfo = result.vendorInfo,

            lineItemDetails = [{
                ITEM_CODE: result.itemcode, PRODUCT_CODE: result.productCode, PRODUCT_DESC_1: result.product_desc_1,
                PRODUCT_DESC_2: result.product_desc_2, CUSTOMER_ITEM_CODE: result.customerItemCode,
                SUPPLIER_ITEM_CODE: result.supplierItemCode, ITEM_STATUS: result.itemStatus,
                FOLLOWUP_DATE: result.followUpDate,

                PRODUCT_INFO_PRODUCT_CODE: productInfo.productCode, PRODUCT_INFO_PRODUCT_COLOR: productInfo.productColor,
                PRODUCT_INFO_PRODUCT_SIZE_CODE: productInfo.productSizeCode, PRODUCT_INFO_PRODUCT_DESC: productInfo.productDescription,

                SELL_UNIT_OF_MEASURE: result.sell_unit_of_measure, BUY_UNIT_OF_MEASURE: result.buy_unit_of_measure,
                VENDOR_CODE: result.vendorCode,

                CODE: vendorInfo.code, NAME: vendorInfo.name, STATUS_ID: vendorInfo.statusId, STATUS_NAME: vendorInfo.statusName,

                BUY_QUANTITY_ORDERED: result.buy_quantity_ordered, BUY_QUANTITY_BILLED: result.buy_quantity_billed,
                SELL_QUANTITY_ORDERED: result.sell_quantity_ordered, SELL_QUANTITY_BILLED: result.sell_quantity_billed,
                QUANTITY_RECEIVED: result.quantity_received, ALLOW_DELETE: result.allow_delete, HAS_DECORATION: result.has_decoration,

                COST: result.cost, PRICE: result.price, DATE_DUE: result.date_due, IN_HANDS_DATE: result.in_hands_date,
                REMARKS: result.remarks, SOURCE: result.source, COLOR: result.color, STYLE_CODE: result.style_code,
                SIZE: result.size, ORIGINAL_PO_COST: result.original_po_cost, VEND_Q_NUM: result.vend_q_num,

                VENDORINS_ID: result.vendorins_id, COST_CENTER: result.cost_center, LONGDESC_ID: result.longdesc_id,
                IS_COST_ONLY: result.is_cost_only, HIDE_ITEM_NUMBER: result.hide_item_number, HIDE_QUANTITY: result.hide_quantity
            }];

        const csv = new objectToCsv(lineItemDetails);
        await csv.toDisk(lineItem_api_csv_path);

        tc_title = 'Retrieved Line Items.';
        values = {
            Affiliate_user: username,
            statusCode: respInJson.statusCode
        };
    }).timeout(200000);

});