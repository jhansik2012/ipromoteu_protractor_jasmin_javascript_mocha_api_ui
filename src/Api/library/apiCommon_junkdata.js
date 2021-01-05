const { config } = require('chai');

global.projectBasePath = process.cwd(),
  global.testDataFile = process.env.npm_package_config_testDataFile,
  global.testConfig = require(projectBasePath + '/src/Api/apiTestData/' + testDataFile + '.json'),
  global.testLib = require(projectBasePath + '/src/Api/library/Testlib'),
  global.getAuth = require(projectBasePath + '/src/Api/library/AuthUtil').getAuth,
  global.refreshAuthUser = require(projectBasePath + '/src/Api/library/AuthUtil').refreshAuthUser,
  global.apiRequest = require(projectBasePath + '/src/Api/library/Api').apiRequest,
  global.addContext = require('mochawesome/addContext'),
  global.expect = require('chai').expect,
  global.assert = require('chai').assert,
  global.mysql = require('mysql'),
  global.customer_shipping_details_api_csv_path = projectBasePath + '/testDataObjects/customerShiipingDetailsApiData.csv',
  global.lineItem_api_csv_path = projectBasePath + '/testDataObjects/lineItemsApiData.csv',
  global.objectToCsv = require('objects-to-csv'),

  global.respInJson = "",
  global.data = "",
  global.result = "",
  global.jobs = "",
  global.jobstatus = "",
  global.succMessage = "",
  global.newLineItemCode = "",
  global.lineItemCode1 = "",
  global.lineItemCode2 = "",
  global.shipmentId = '',
  global.tc_title = "",
  global.desc = "test Description",
  global.decorationName = "test",
  global.instruction = "instruction text",
  global.color = "red",
  global.size = "m",
  global.qty = 100,
  global.price = "1000.00",
  global.cost = "1100.00",
  global.artwork = "ipu.img",
  global.values = {
  },
  // global.mysqlHost = testConfig.mysqlHost,
  // global.mysqlUser = testConfig.mysqlUser,
  // global.mysqlPassword = testConfig.mysqlPassword,
  // global.mysqlDatabase = testConfig.mysqlDatabase,

  global.existedJobId = "",
  global.thiscount = "",
  global.iPromoteU = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  global.ipro_vendorcode = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  global.evans_vendorcode = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  global.sanm_vendorcode = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  global.ssac_vendorcode = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  global.apsp_vendorcode = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  global.prim_vendorcode = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  
  global.from_OrderDate = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  global.to_OrderDate = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  global.existed_decorationSet_id = testConfig.existed_decorationSet_id,
  global.existedJob = testConfig.existedJob,
  global.existedItemCode = testConfig.existedItemCode,
  global.other_affiliate_existed_decorationSet_id = testConfig.other_affiliate_existed_decorationSet_id,
  global.other_affiliate_existedItemCode = testConfig.other_affiliate_existedItemCode,
  global.invalid_decorationSetid = '000',

  global.adminUsername = "A5",
  global.adminPassword = "XOMS1234",
  global.username = testConfig.testerUsername,  
  global.affilite_id1 = testConfig.affiliateId1,  
  global.affilite_id2 = testConfig.affiliateId2,  
  global.affilite_id3 = testConfig.affiliateId3,
  global.afpOperatorName = 'Bruce Anderson',
  global.xsdOperatorName = 'Demo Account',
  global.operatorName = 'Demo Account',
  global.krcUsername = testConfig.testerKrcUsername,
  global.krcOperatorName = 'Kevin Casci',
  global.salesRepUserName = testConfig.salesRepUserName,
  global.password = testConfig.testerPassword,

  global.cj_action = "create-job",
  global.uj_action = "update-job",
  global.list_billing_Contacts_action = "list-billing-contacts",
  global.list_shipping_Contacts_action = "list-shipping-contacts",
  global.list_affiliateId_contacts_action = "list-affiliate-contacts",
  global.get_contact_lists_action = 'get-contact-lists',
  global.lbCustomers_action = "list-billing-customers",
  global.lsCustomers_action = "list-shipping-customers",
  global.gsCustomers_action = "get-shipping-customer",
  global.gbCustomers_action = "get-billing-customer",
  global.get_shipping_customer_details_action = "get-shipping-customer-detail",
  global.get_billing_customer_details_action = "get-billing-customer-detail",
  global.get_line_action = "get-line-item",
  global.add_line_action = 'add-line-items',
  global.delete_line_item_action = 'delete-line-item',
  global.update_line_item_action = 'update-line-item',
  global.gv_action = "get-vendor",
  global.list_vendor_invoice_action = "list-vendor-invoices",
  global.list_vendor_action = 'list-vendor',
  global.cp_action = "create-po",
  global.get_affiliate_action = "list-affiliate",
  global.list_salesrep_action = "list-salesrep",
  global.list_operator_action = "list-operator",
  global.create_decoration_set_action = 'create-and-save-decoration-set',
  global.update_decoration_set_action = 'update-decoration-set',
  global.update_decoration_detail_action = 'update-decoration-detail',
  global.get_named_decoration_set_action = 'get-named-decoration-set',
  global.add_decoration_detail_to_job_action = 'add-decoration-detail-to-job',
  global.list_job_doc_action = "list-job-docs",
  global.create_presentation_action = 'create-presentation',
  global.edit_presentation_action = 'edit-presentation',
  global.delete_presentation_item_action = 'delete-presentation-items',
  global.add_preso_fav_product_action = 'add-preso-fav-product',
  global.remove_preso_fav_product_action = 'remove-preso-fav-product',
  global.create_shipping_customer_action = "create-shipping-customer",
  global.get_suggestion_new_customer_code_action = "get-suggestion-new-customer-code",
  global.create_billing_customer = "create-billing-customer",
  global.update_shipping_customer_action = "update-shipping-customer",
  global.update_billing_customer_action = "update-billing-customer",
  global.add_Shipments_action = "add-shipment",
  global.get_Shipment_action = 'get-shipments',
  global.update_Shipment_action = 'update-shipment',
  global.delete_shipment_action = 'delete-shipment',
  global.add_contact_action = "add-contact",
  global.update_contact_action = 'update-contact',
  global.delete_contact_action = 'remove-contact-from-linking',
  global.set_as_default_contact_action = 'set-default-contact',
  global.add_quotes_fees_action = 'add-quote-fees',
  global.update_quotes_fees_action = 'update-quote-fees',
  global.guestAcceptsPresentationQuote_action = 'guest-accept-preso-quote',
  global.listPresentations_action = "list-presentations",
  global.getPresentationDetails = 'get-presentation',
  global.getListPresentationFavouriteProducts_action = 'list-preso-fav-products',
  global.send_presentation = 'send-presentation',
  global.guest_get_presentaion_detail_action = "guest-get-presentation",
  global.guest_Add_presentaion_comment_action = 'guest-add-preso-comments',
  global.add_presentation_style_setting_action = 'add-presentation-style-setting',
  global.update_presentaion_style_setting_action = 'update-presentation-style-setting',
  global.remove_presentaion_style_setting_action = 'remove-presentation-style-setting',
  global.add_job_notes_action = "add-job-notes",
  global.get_job_notes_action = "get-job-notes",
  global.add_job_Reminder_action = "add-job-reminder",
  global.get_sage_products_action = "get-sage-products",
  global.test_sage_connection_action = "test-sage-connection",
  global.get_reminder_action = "get-job-reminder",
  global.list_reminder_action = "list-job-reminders",
  global.delete_reminder_action = "delete-job-reminder",
  global.edit_reminder_action = "edit-job-reminder",
  global.add_update_contactList_action = "add-update-contact-list",
  global.get_xsource_products_action = "get-xsource-products",
  global.get_available_items_Bundled_po = "get-bundled-po-available-items",
  global.get_alternate_address_Bundled_po = "get-bundled-po-alternate-address",
  global.get_bundled_po_default_setting = "get-bundled-po-default-setting",
  global.get_bundled_po_fullfillment_list = "get-bundled-po-fullfillment-list",
  global.get_bundled_po_carrier_list = "get-bundled-po-carrier-list",
  global.create_bundled_po = "create-bundled-po",
  global.add_bundled_po_alternate_address = "add-bundled-po-alternate-address",
  global.update_bundled_po_address = "update-bundled-po-address",
  global.Update_bundled_po_default_setting = "Update-bundled-po-default-setting",
  global.update_bundled_po_default_address = "update-bundled-po-default-address",
  global.is_po_available_for_pspo = "is-po-available-for-pspo",
  global.void_po = 'void-po',
  global.revise_po = 'revise-po',
  global.list_dispute = 'list-disputes',

  global.futureDate_yyyy_mm_dd = testLib.futurePreviousDate_yyyy_mm_dd(5),
  global.futureDate = testLib.futurePreviousDate(5),
  global.previousDate = testLib.futurePreviousDate_yyyy_mm_dd(-1),
  global.currentDate = testLib.currentDate(),
  global.currentDate_yyyy_mm_dd = testLib.currentDate_yyyy_mm_dd(),
  global.currentDate_mm_dd_yyyy = testLib.currentDate_mm_dd_yyyy(),

  global.cj_salesrepId = testConfig.cj_salesrepId,
  global.match_term = testConfig.match_term,
  global.cj_customerId = testConfig.cj_customerId,
  global.shipping_billing_customerId = testConfig.shipping_billing_customerId,
  global.cj_jobTitle = testConfig.cj_jobTitle,
  global.cj_billToContactId = testConfig.cj_billToContactId,
  global.cj_shipToContactId = testConfig.cj_shipToContactId,
  global.cj_orderedByContactId = testConfig.cj_orderedByContactId,
  global.futureDate_yyyy_mm_dd = testLib.futurePreviousDate_yyyy_mm_dd(5),
  global.futureDate = testLib.futurePreviousDate(5),
  global.previousDate = testLib.futurePreviousDate_yyyy_mm_dd(-1),
  global.currentDate = testLib.currentDate(),
  global.currentDate_yyyy_mm_dd = testLib.currentDate_yyyy_mm_dd(),
  global.isrushJob = 0,
  global.issampleRequired = 0,
  global.other_affiliate = testConfig.other_affiliate,
  global.other_salesrepId = testConfig.other_salesrepId,
  global.uj_jobTitle = testConfig.uj_jobTitle,

  global.ProductionContactName = config.ProductionContactName,
  global.OrderToContactId = config.OrderToContactId,
  global.Carrier = config.Carrier,
  global.AlternateShippingAccount = '',
  global.AdditionalInstructionsOnSeparatePage = config.AdditionalInstructionsOnSeparatePage,
  global.AdditionalInstructions = '',
  global.AutomaticInstructions = '',
  global.ImageDisplay = 0,
  global.DocumentConfigurationID = config.DocumentConfigurationID,
  global.decorationName = "decoration_" + testLib.currentTime(),

  global.invalid_data = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  global.invalid_number = "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
  global.keyWord_test = testConfig.keyWord_test,

  global.successMsg = 'Success',
  global.create_shipping_customer_succMsg = 'Create customer shipping successfully.',
  global.create_billing_customer_succMsg = 'Create customer billing successfully.',
  global.update_billing_customer_succMsg = 'Customer billing updated successfully.',
  global.update_shipping_customer_succMsg = 'Customer shipping updated successfully.',
  global.add_lineItem_succMsg = 'line item created successfully.',
  global.update_lineItem_succMsg = 'line item updated successfully.',
  global.delete_lineItem_succMsg = 'line item deleted successfully.',
  global.edit_presentation_succMsg = 'Presentation updated successfully',
  global.missed_preso_id_errorMsg = 'Missing preso_id for edit presentation!',
  global.missed_preso_id_delete_presentation_errorMsg = 'Missing Presentation Item Id!',
  global.missed_product_id_errorMsg = "There's empty product ID.",
  global.missing_empty_reminder_id_errorMsg = "Missing or Empty reminder_id parameter!",
  global.missed_fav_item_id_errorMsg = "ID is empty.",
  global.missing_action_errorMsg = 'Missing action query parameter!',
  global.missing_query_type_errorMsg = "Missing `queryType` parameter.",
  global.misses_jobId_errorMsg = 'The request misses jobId field',
  global.misses_jobId_errorMsg1 = 'Missing jobId field!',
  global.missed_jobId_errorMsg2 = 'Missing jobId parameter!',
  global.misses_vendorcode_errorMsg = 'The request misses vendor code field',
  global.misses_operator_errorMsg = 'The request misses operator field',
  global.missing_affiliateID_errorMsg = 'Missing affiliateId filter.',
  global.misses_lineItems_errorMsg = 'Missing line items to create PO!',
  global.misses_lineItems_bundled_po_errorMsg = "Missing line items to create Bundled PO!"
global.empty_lineItems_errorMsg = 'Empty line items to create PO!',
  global.invalid_lineItems_errorMsg = 'Invalid line items to create PO!',
  global.misses_customerId_billing_constacts_errorMsg = 'Missing customerId to list billing contacts!',
  global.misses_customerId_shipping_constacts_errorMsg = 'Missing customerId to list shipping contacts!',
  global.misses_get_customer_shipping_errorMsg = 'Missing customerId to get customer shipping info!',
  global.misses_get_customer_billing_errorMsg = 'Missing customerId to get customer billing info!',
  global.misses_empty_create_customer_billing_errorMsg = 'The billing code is empty!',
  global.misses_vendorcode_to_get_vendor_info_errorMsg = 'Missing vendorCode to get vendor info!',
  global.missed_affiliateId_to_create_presentation_errorMsg = 'Missing affiliate identifier for create presentation!',
  global.create_po_misses_vendorcode_errorMsg = 'Missing vendor code field to create PO!',
  global.delete_line_item_missing_empty_lineItemId_errorMsg = 'Missing or Empty lineItemId option!',
  global.delete_line_item_misses_lineItemId_errorMsg = 'The request misses lineItemId field',
  global.mising_preso_for_sending_presentaion_errorMsg = 'Missing preso_id to send presentation!',
  global.commentAddedScucesfulMsg = 'Comment added successfully',
  global.missingName_errorMsg = 'Name is empty.',
  global.preso_id_empty_errorMsg = 'The preso_id is empty.',
  global.notes_added_succMsg = "Notes Added successfully",
  global.reminder_added_succMsg = "Reminder Added successfully",
  global.missing_reminder_id = "Missing reminder_id parameter for delete!",
  global.reminder_deleted_succMsg = "Reminder deleted.",
  global.reminder_edit_done_succMsg = "Reminder edit done successfully",
  global.missing_preso_id_to_get_PResentaion = "Missing preso_id to get presentation!",

  global.invalid_customerId_errorMsg = 'Invalid customerId!',
  global.invalid_customerId_1_errorMsg = 'Invalid customerId input!',
  global.invalid_customerId_2_errorMsg = 'Invalid customerId or no permission to view!',
  global.invalid_customerId_3_errorMsg = 'No Permission or Invalid customerId for this Job!: ',
  global.missing_customer_shipping_customerId_errorMsg = 'Missing customerId to get customer shipping info!',
  global.missing_customer_billing_customerId_errorMsg = 'Missing customerId to get customer billing info!',
  global.invalid_lineItem_errorMsg = 'Invalid line item on PO!',
  global.invalid_vendor_errorMsg = 'Invalid vendor ordering!',  
  global.invalid_vendor_errorMsg1 = 'Invalid vendorCode or no permission!',
  global.invalid_vendor_errorMsg2 = 'Invalid vendor!',
  global.invalid_jobId_errorMsg = 'Invalid Job!',
  global.invalid_jobId_errorMsg2 = 'Invalid JobId!',
  global.invalid_jobId_errorMsg1 = 'Invalid jobId input!',
  global.Empty_or_missed_JobId = "Empty or missed JobId!",
  global.invalid_operator_errorMsg = 'Invalid operator!',
  global.invalid_affiliateId_errorMsg = 'Only admin users can pass affiliateId !',
  global.invalid_affiliateId_errorMsg1 = "There is wrong affiliate ID.",
  global.invalid_affiliateId_errorMsg2 = "Enter valid Affiliate ID",
  global.invalid_salesrepId_errorMsg = 'Invalid salesrepId input!',
  global.invalid_itemCode_errorMsg = 'Invalid itemCode or no permission to view!',
  global.invalid_itemCode_errorMsg1 = 'Invalid itemCode option!',
  global.invalid_line_vendorcode_errorMsg = 'Invalid line vendorCode.',
  global.invalid_line_itemcode_errorMsg = 'invalid line itemcode.',
  global.invalid_line_itemcode_errorMsg1 = 'No line item found with such lineItemId!: ',
  global.invalid_decorationSet_id_errorMsg1 = "There's no matching records for this decorationset id.",
  global.empty_vendorcode_errorMsg = 'Vendorcode should not be empty',
  global.invalid_reqShipDate_errorMsg = 'reqShipDate should be current or future date.',
  global.previous_reqShipDate_errorMsg = 'newDecorationLineItems `reqShipDate` is less than current date.',
  global.invalid_format_reqShipDate_errorMsg = "Incorrect date value for newDecorationLineItems `reqShipDate`",
  global.missing_empty_lineItemCode_errorMsg = 'Missing or Invalid `lineItems.itemCode` to create PO!',
  global.other_affiliate_invaid_decorationset_id_errorMsg = "There's no matching records for this decorationset id.",
  global.missed_empty_decorationSet_id_errorMsg = 'Missing or Empty decoration set id!',
  global.missed_decorationSet_id_errorMsg = 'Missing decorationSet id!',  
  global.invalid_decorationSet_id_errorMsg = 'Invalid decoration set Id.',
  global.missing_empty_decorationDetails_id_errorMsg = "DecorationDetails parameter is empty.",
  global.empty_vendor_code_errorMsg = "Vendor code is empty.",
  global.invalid_datatype_decorationset_id_errorMsg = "DecorationSet id is not a number.",
  global.invalid_date_format_errorMsg = "invalid date format",
  global.invalid_date_errorMsg = "invalid date.",
  global.invalid_inHandsdate_errorMsg = "inHandsDate should be current or future date.",
  global.shipment_update_succesfull_msg = "Shipment Updated successfully.",
  global.shipment_delete_succesfull_msg = "Shipment Deleted successfully.",
  global.shipment_missing_jobid_error_msg = 'Missing jobId parameter!',
  global.reqShipDate_inHandsDate_warning = "Currently no support for reqShipDate option at job level.; Currently no support for inHandsDate option at job level.; The collectionContactId is missing or empty! Default value 599741 is assumed.",
  global.warningMsg = "Ignored invalid salesrepId input!  Ignored invalid billToContactId input!  Ignored invalid shipToContactId input!  Ignored invalid orderByContactId input!",
  global.presentation_title_warningMsg = 'Ignoring invalid titles value. Must be array of strings.',
  global.missing_shipment_jobId_errorMsg = 'Missing Shipment `jobId` parameter.',
  global.missing_shipment_id_errorMsg = 'Missing Shipment `id` parameter.',
  global.missing_contact_name_errorMsg = 'Missing `contact.name` parameter.',
  global.missing_contact_id_errorMsg = 'Missing `contact.id` parameter.',
  global.warningMsg = "Ignored invalid salesrepId input!  Ignored invalid billToContactId input!  Ignored invalid shipToContactId input!  Ignored invalid orderByContactId input!",
  global.presentation_title_warningMsg = 'Ignoring invalid titles value. Must be array of strings.',
  global.inavalidInputParameter_errorMsg = "Missing Contact `contactId` parameter.",
  global.missing_preso_id_errorMsg = 'PresentationID is empty.',
  global.missing_preso_to_get_presentation = 'Missing preso_id to get presentation!',
  global.missingPresoIdwhileAddingComment_errorMsg = 'PresentationID is empty.',
  global.id_is_empty_errorMsg = 'ID is empty.',
  global.Missing_reminder_id_errorMsg = "Missing reminder_id parameter for update!",
  global.enter_valid_affliateId_errorMsg = "Enter valid Affiliate ID",
  global.missing_contactId_errorMsg = "Missing contactId in selectedContacts or deletingContacts.",
  global.no_supplier_id_errorMsg = "supplierId and source and styleCode or vendorCode and productCode is necessary!",
  global.missing_or_empty_job_id_errorMsg = "Missing or Empty jobId!",  
  global.empty_job_id_errorMsg = "MEmpty jobId!",
  global.missing_or_empty_Item_code_errorMsg = "Missing or Empty itemCode option!",
  global.missingContactId_errorMsg = "Missing Contact `contactId` parameter.",
  global.missed_empty_bill_code_errorMsg = "The bill code is empty!",
  global.missed_empty_vendor_errorMsg = "Empty vendor!",
  global.invlaid_vendor_errorMsg = "Invalid vendor!",
  global.Missing_vendor_code_field_to_create_PO = "Missing vendor code field to create PO!",
  global.Empty_vendor_code_field_to_create_PO = "Empty vendor code field to create PO!",
  global.misses_gpoAddressID_errorMsg = 'Missing po AddressID to create PO!',
  global.empty_gpoAddressID_errorMsg = 'Empty po AddressID to create PO!',
  global.invalid_gpoAddressID_errorMsg = 'Invalid po AddressID to create PO!',
  global.missed_address_id_errorMsg = "Address id is missing!",
  global.empty_address_id_errorMsg = "Address id is empty!",
  global.invalid_address_id_errorMsg = "Address id is invalid!",
  global.missed_empty_poNumber_errorMsg = "Missed or Empty poNumber!",
  global.invalid_poNumber_errorMsg = "Invalid poNumber!",
  global.success_msg_void_po = "Voided PO successfully!: ",
  global.missed_ponumber = "Missing poNumber!",
  global.empty_ponumber = "Empty poNumber!",
  global.invalid_ponumber = "Invalid poNumber!",
  global.invalid_status_list_dispute = "Invalid status option! Valid values: Closed, Under review, Rejected, Pending, Open, All",
  global.invalid_affiliateId_errorMsg = "Invalid affilateId.",
  global.empty_affiliateId_errorMsg = "Empty affilateId.",
  global.invalid_salesrepId_errorMsg = "Invalid salesrepId.",
  global.missing_empty_selected_lineitems_errorMsg = "Missing or Empty selected line items.",

  global.errorMessage = "",
  global.errorCode = "",
  global.successCode_200 = 200,
  global.errorCode_400 = 400,
  global.errorCode_500 = 500,

  global.altAdr_zip = testConfig.altAdr_zip,
  global.altAdr_city = testConfig.altAdr_city,
  global.altAdr_name = testConfig.altAdr_name,
  global.altAdr_state = testConfig.altAdr_state,
  global.altAdr_countryCode = testConfig.altAdr_countryCode,
  global.altAdr_addressLine1 = testConfig.altAdr_addressLine1,
  global.altAdr_addressLine2 = testConfig.altAdr_addressLine2,
  global.altAdr_addressLine3 = testConfig.altAdr_addressLine3,
  global.updated_altAdr_addressLine1 = testConfig.updated_altAdr_addressLine1,
  global.updated_altAdr_state = testConfig.updated_altAdr_state,

  global.Cost = testConfig.cost,
  global.Price = testConfig.price,
  global.Supplier_item_number = testConfig.supplier_item_number,
  global.ProductCode = testConfig.productCode,
  global.ProductColor = testConfig.productColor,
  global.ProductSizeCode = testConfig.productSizeCode,
  global.Buy_unit_of_measure = testConfig.buy_unit_of_measure,
  global.Buy_quantity_ordered = testConfig.buy_quantity_ordered,
  global.Sell_unit_of_measure = testConfig.sell_unit_of_measure,
  global.Sell_quantity_ordered = testConfig.sell_quantity_ordered,
  global.Asi_supplier_id = testConfig.asi_supplier_id,
  global.Asi_product_id = testConfig.asi_product_id,
  global.Source = testConfig.source,

  global.CompanyName = "Tashman Screen & Hardware",
  global.billCode = "ABC00009",
  global.email = "test@cigniti.com",
  global.shipmentId = '',
  global.newContactId = '',
  global.newName = "Test_Contact",
  global.updatedName = "Test_Contact_1",
  global.linkTo = "customer_billing_contact",
  global.linkCode = "KRC",
  global.preso_id = 'P1724715AFP',
  global.preso_item_id = '',

  global.mysqlHost = "ec2-54-82-98-126.compute-1.amazonaws.com",
  global.mysqlUser = "us-dev-cp",
  global.mysqlPassword = "us-dev-xoms2",
  global.mysqlDatabase = "xebra",

  global.create_job_params = {
    action: cj_action,
    customerId: cj_customerId,
    salesrepId: cj_salesrepId,
    jobTitle: cj_jobTitle,
    billToContactId: cj_billToContactId,
    shipToContactId: cj_shipToContactId,
    orderByContactId: cj_orderedByContactId,
    inHandsDate: futureDate_yyyy_mm_dd,
    reqShipDate: currentDate_yyyy_mm_dd
  },

  global.add_lineItems_params = {
    action: add_line_action,
    jobId: existedJob,
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
  },

  global.add_bundled_po_alternate_address_params = {
    action: add_bundled_po_alternate_address,
    addressLine1: altAdr_addressLine1,
    addressLine2: altAdr_addressLine2,
    addressLine3: altAdr_addressLine3,
    city: altAdr_city,
    countryCode: altAdr_countryCode,
    name: altAdr_name,
    state: altAdr_state,
    zip: altAdr_zip
  },

  global.jobStatusPaidFilters = ['Paid', '5'],
  global.jobStatusFilters = ['In-Process', '2', 'Pending-Vendor-Invoice', '3', 'Invoiced', '4', 'In-Inventory', '6', 'Rejected', '7', 'Drafted', '10'],
  global.expJobStatusFilters = ['In-Process', 'Pending-Vendor-Invoice', 'Invoiced', 'Paid', 'In-Inventory', 'Rejected', 'Drafted'],
  global.imprintMethods = ['Embroidery', 'Silksreen', 'Direct Print', 'Engraved', 'Full Color', 'Laser Engraved', 'Debossed', 'Etched', 'Heat Transfer', 'Sublimation', 'Embossed', 'Foil Stamped', ' Hot Stamped', 'Other'],
  global.locations = ['Center Full Front', 'Left Chest', 'Right Chest', 'Custom Front', 'Back', 'Back Yoke', 'Custome Back', 'Left Sleeve', 'Right Sleeve'],
  global.documentTypeCodes = ['INV', 'PCO', 'CAK', 'QTC', 'PAK', 'RMC', 'GPO', 'DRP', 'MJD'],
  global.documentTypes = ['Invoice', 'Draft-Invoice', 'Purchase-Order', 'Customer-Ack', 'Customer-Quote',
    'Packing-Slip', 'Remit-Instructions', 'Group-PO', 'Deposit-Request', 'Misc-Job-Doc'],
  global.disputeStatuses = ['Open', 'Pending', 'Under review', 'Rejected', 'Closed', 'All'],

  global.create_decorationSet_params = {
    action: create_decoration_set_action,
    newDecorationSet: {
      affiliateId: username,
      salesrepId: cj_salesrepId,
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
  }

afterEach("After Each test case...", function (done) {
  if (this.currentTest.state === 'passed') {
    var test = this.currentTest
    addContext(this, {
      title: tc_title,
      value: values
    });
  }
  done();
});