let ipromoteU_login = requirePage('LoginPage'),
    createPOPage = requirePage('CreatePO'),
    jobsHomePage = requirePage('JobsHomePage'),
    createNewJobPage = requirePage('CreateNewJob'),
    lineitemdetails = requirePage('LineItemDetailsPage'),
    commonAddProducts = requirePage('common_addProducts')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    product = csvProcessor.filterData(testName, 'Product'),
    postatus = null,
    lineItemStatus = 'PO Not Created',
    cost = "6",
    poNotCreatedstatusCount=0,
    fileName= 'ipromoteU.png',
    poCreatedStatus='PO CREATED',
    poNotCreateStatus='PO NOT CREATED'

describe('CreatePO-TC001', () => {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TCPO001-CreatePO-VendorDetails-ShippingDetails-LineItemsPage_VerifyingCreatePOPage";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on any one job for edit ', function () {
        jobsHomePage.clickOnFirstJob();
    });
    it('Store Available Products count to create PO ', function () {
       createPOPage.getLineItemsStatusesCountList(lineItemStatus) 
    });
    it("Add product if  Line item is not available or if for all line items 'PO CREATED'", () => {
     // poNotCreatedstatusCount= createPOPage.getLineItemsStatusesCountList(lineItemStatus)
      //poNotCreatedstatusCount variable is still storing reference instaed of returned value and throwing as undefeined( Even defined as global variable)
        if (global.poNotCreatedstatusCount==0)
        {
            reporter.appendTest('<b>Adding Product</b>', '*************', "");
            commonAddProducts.addProduct(product, cost)
            reporter.appendTest('<b>Added Product</b>', '*************', "");
        }
    })
    it('Click on Create PO button', () => {
        reporter.appendTest('<b>Create PO</b>', '*************', "");
        createPOPage.clickOnCreatePOS();
    });
    it('Select create po option from dropdown ', function () {
        createPOPage.selectCreatePOSOptionFromDropdown();
    });
    it('Verifying "Vendor Details" ', function () {
        reporter.appendTest('<b>Vendor Details</b>', 'Verifying "Vendor Details" page', "");
        createNewJobPage.ValidateSubwayMap("1. Vendor Details");
    });
    it('Get Selected Vendor ', function () {
        createPOPage.getSelectedVendorLocal()
    });
    it('Verifying Production Contact ', function () {
        createPOPage.verifyProductionContact();           
    });
    // it('Get Order Contac tMail ', function () {
    //     createPOPage.printtOrderContactMail();            //Depricated 10-12-2020 , Functionality change
    // });
    it('Verifying selected  and Displayed vendor ', function () {
        createPOPage.verifySelectedAndDisplayedVendor();
    });
    it('Enter PO DATE', function () {          
        createPOPage.enterPODate();           
    });
    it('Click on next button', function () {          
        createPOPage.clickOnNextButton("Next Button");           
    });
    it('Validate subway map ', function () {
        reporter.appendTest('<b>Shipping Details</b>', 'Verifying "Shipping Details" page', "");          
        createNewJobPage.ValidateSubwayMap("2. Shipping Details"); 
        createPOPage.printDisplayedDefaultShippingLocationSection()                 
    });
    it('Click on + Upload Dropship Instructions button', function () {          
        createPOPage.uploadDropshipInstructionsMethod();           
    });
    it('Verify file name of Dropship Instructions ', function () {          
        createPOPage.verifyFileNameforDropShipInstruction(fileName);           
    });
    it('Select Carrier/Method', function () {          
        createPOPage.selectCarrier();           
    });
    it('Select Inside Delivery Required', function () {          
        createPOPage.SelectInsideDeliveryRequired();           
    });    
    it('Select Request Freight Equalization', function () {          
        createPOPage.SelectRequestFreightEqualization();           
    });
    it('Add Alternative Shipping Account', function () {          
        createPOPage.alternativeShippingAccount();           
    });
    it('Click on Alternate address dropdown', function () {          
        createPOPage.clickOnDownArrawNextToCustomer();           
    });
    it('Click on down-arrow next to Customer and verify Vendor and Add New options are displayed', function () {          
        createPOPage.verifyNextToCustomer_VendorAndAddNewOptions();           
    });

    it('Click on next button', function () {          
        createPOPage.clickOnNextButton("Next Button");           
    });

    it('Validate subway map ', function () {  
        reporter.appendTest('<b>Confirm & Send</b>', 'Verifying "Confirm & Send" page', "");          
        createNewJobPage.ValidateSubwayMap("3. Confirm & Send");           
    });

    it('Validate PO Line Items section', function () {          
        createPOPage.verifyPOLineItem();           
    });

    it('Validate PO Line Item header section', function () {          
        createPOPage.verifyPOLineItemHeaders("DESCRIPTION");
        createPOPage.verifyPOLineItemHeaders("COLOR");           
        createPOPage.verifyPOLineItemHeaders("SIZE");           
        createPOPage.verifyPOLineItemHeaders("QTY");           
        createPOPage.verifyPOLineItemHeaders("COST");           
        createPOPage.verifyPOLineItemHeaders("TOTAL COST");               
    });

    it('Click on Advanced Instructions Search', function () {          
        createPOPage.clickOnAdvancedInstructionSearchLink();           
     });

    it('verify Advanced Instructions Search Fields', function () {          
        createPOPage.verifyAdvancedInstructionsSearchFields();           
        createPOPage.searchUsingKeyword("Test");           
      });
    
    it('Copy Information', function () {          
        createPOPage.copyInformation();           
      });

    it('Upload File in additional instruction', function () {          
        createPOPage.uploadFilesMethod();           
      });

    it('Verify Uploaded file name', function () {          
        createPOPage.verifyFileNameforDropShipInstruction(fileName);          
    });

    it('Click On Close Button', function () {          
        createPOPage.clickOnCloseButton();           
    });

    it('Verify and close Pop-up', function () {          
        createPOPage.verifyAlertAndclosePop('Any changes made will be lost. Do you wish to continue?','YES','ALERT');           
    });

    it('Verify that the PO is not created', function () {
       // poNotCreateStatus, poCreatedStatus
        createPOPage.VerifyPOStatusLocal(poNotCreateStatus)
    });
});

