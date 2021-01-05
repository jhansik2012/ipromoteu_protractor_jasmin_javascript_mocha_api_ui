let ipromoteU_login = requirePage('LoginPage'),
createPOPage=requirePage('CreatePO'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob'),
commonAddProducts = requirePage('common_addProducts')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product'),
vendorCode= csvProcessor.filterData(testName, 'VendorCode'),
poNumber='',
lineItemStatus = 'PO Not Created',
cost = "6",
poNotCreatedstatusCount=0,
poCreatedStatus='PO CREATED',
poNotCreateStatus='PO NOT CREATED'

describe('CreatePO-TC006', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {  
        global.current_TestCase  = "TCPO004-CreatePO-WithExistingCustomerAndDiscard_WithExistingCustomerAndDiscard";
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
         if (global.poNotCreatedstatusCount==0)
        {
            reporter.appendTest('<b>Adding Product</b>', '*************', "");
            commonAddProducts.addProduct(product, cost)
            reporter.appendTest('<b>Added Product</b>', '*************', "");
        }
    }) 
    it('Click on Create PO button ', function () { 
        reporter.appendTest('<b>Create PO</b>', '*************', "");         
        createPOPage.clickOnCreatePOS();           
    }); 
    it('select create po option from dropdown ', function () {          
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
    // it('Get Order Contac Mail ', function () {
    //     createPOPage.printtOrderContactMail();             
    // }); //depricated
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
    it('Click on down-arrow next to Customer', function () {          
        createPOPage.clickOnDownArrawNextToCustomer();           
    });   
    it('Click on down-arrow next to Customer and verify Vendor and Add New options are displayed', function () {          
        createPOPage.verifyNextToCustomer_VendorAndAddNewOptions();           
    });
    it('Select Cutomer and enter any Customer name', function () {  
        createPOPage.enterCustomerName(vendorCode);           
    });
    it('Click on next button', function () {          
        createPOPage.clickOnNextButton("Next Button");           
    });
    it('Click on Create PO button', function () {          
        createPOPage.clickOnNextButton("Create PO Button");           
    });
    it('Verify po created or not', function () {          
        createPOPage.ismodelPopupDisplayed();           
        createPOPage.storeCreatedPoNumberLocal();           
        createPOPage.clickOnOkButton();           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("4. Send PO");           
        createPOPage.veifySendPOPageElements();           
        createPOPage.validateCreatedPONumberInSubjectAndMessageBodyLocal();           
    });
   
    it('Click on Discard button', function () {          
        createPOPage.clickOndiscardButtton();           
    });
    it('Verify Alert and close Pop-up', function () {          
        createPOPage.verifyAlertAndclosePop('PO discarded successfully','OK','Alert');           
    });
    it('Verify that the PO is not created', function () {
       // poNotCreateStatus, poCreatedStatus
        createPOPage.VerifyPOStatusLocal(poNotCreateStatus)
    });
});

