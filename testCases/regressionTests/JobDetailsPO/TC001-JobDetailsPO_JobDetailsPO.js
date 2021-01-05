let ipromoteU_login = requirePage('LoginPage'),
createPOPage=requirePage('CreatePO'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product'),
poNumber='';

describe('JobDetails PO', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-JobDetailsPO_JobDetails-PO";
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
    it('Click on create job ', function () { 
        reporter.appendTest('<b>Create PO</b>', '*************', "");         
        createPOPage.clickOnCreatePOS();           
    }); 
    it('select create po option from dropdown ', function () {          
        createPOPage.selectCreatePOSOptionFromDropdown();           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("1. Vendor Details");           
    });          
             
    it('Click on order to', function () {          
       createPOPage.clickOnOrderTo();           
    });
    it('Verify production contact', function () {          
        createPOPage.verifyProductionContact("A4 Promo 916-361-3682");           
    });
    it('Select Order to ', function () {          
     //   createPOPage.selectOrderTo();    //here Order ID is empty list           
    });
    it('Verify order contact mail ', function () {          
        createPOPage.verifyOrderContactMail();           
    });         

     it('Verify PO DATE', function () {          
        createPOPage.verifyPODate();           
    });
     
    it('Enter PO DATE', function () {          
        createPOPage.enterPODate();    
    });   

    it('Click on next button', function () {          
        createPOPage.clickOnNextButton("Next Button");           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("2. Shipping Details");           
    });
    
    it('Under Default Shipping Location section Location Name and Location details are displayed', function () {          
        createPOPage.printDisplayedDefaultShippingLocationSection()          
    });
    it('Click on down-arrow next to Customer', function () {          
        createPOPage.clickOnDownArrawNextToCustomer();           
    });
    it('Click on down-arrow next to Customer and verify Vendor and Add New options are displayed', function () {          
        createPOPage.verifyNextToCustomer_VendorAndAddNewOptions();           
    });

    it('Click on next button', function () {          
        createPOPage.clickOnNextButton("Next Button");           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Confirm & Send");           
    });
    it('Validate PO Line Items section', function () {          
        createPOPage.verifyPOLineItem();           
    });
    it('Validate PO Line Item header section', function () {          
        createPOPage.verifyPOLineItemHeaders("PRODUCT");           
    });
    it('Validate PO Line Item header section', function () {          
        createPOPage.verifyPOLineItemHeaders("DESCRIPTION");           
    });
    it('Validate PO Line Item header section', function () {          
        createPOPage.verifyPOLineItemHeaders("COLOR");           
    });
    it('Validate PO Line Item header section', function () {          
        createPOPage.verifyPOLineItemHeaders("SIZE");           
    });
    it('Validate PO Line Item header section', function () {          
        createPOPage.verifyPOLineItemHeaders("QTY");           
    });
    it('Validate PO Line Item header section', function () {          
        createPOPage.verifyPOLineItemHeaders("COST");           
    });
    it('Validate PO Line Item header section', function () {          
        createPOPage.verifyPOLineItemHeaders("TOTAL COST");           
    });
    it('Click on show below line items', function () {          
    //    createPOPage.clickOnShowBelowLineItemsRadioButton();     //Commented because radio button which is already selected resulting time Out             
    });
    it('Click on Do not show on PO', function () {          
    //    createPOPage.clickOndoNotShowOnPORadioButton();         //Commented because radio button which is already selected resulting time Out         
    });
    it('Click on Advanced Instructions Search', function () {          
        createPOPage.clickOnAdvancedInstructionSearchLink();           
    });
    it('Close Advanced Instructions Search screen', function () {          
        createPOPage.clickOnBackToPOCreationButton();           
    });
    it('Click on Create PO button', function () {          
        createPOPage.clickOnNextButton("Create PO Button");           
    });
    it('Verify po created or not', function () {          
        createPOPage.ismodelPopupDisplayed();           
    });
    it('Get created po number', function () {          
       createPOPage.storeCreatedPoNumberLocal();           
    });
    it('Click on ok button', function () {          
        createPOPage.clickOnOkButton();           
    });
});

