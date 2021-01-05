let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product'),
masterCode = csvProcessor.filterData(testName, 'MasterCode'),
hardGoodsKeyword= "Bags";

describe('CreateJob-TC002', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {       
        global.current_TestCase = "TC002-CreateJobASI-WithHardGoods_ValidateCreateJobWithHardGoods";
      });
    
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });    
    it('Click on create job ', function () { 
        reporter.appendTest('<b>Creating a Job</b>', '*************', "");         
        createNewJobPage.clickOnCreateJob();           
    }); 

    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("1. Job Details & Contacts");           
    }); 
    
    it('Verify Save & Exit, Next button and Sales rep elements disabled',function () { 
    reporter.appendTest('<b>Verifying Disabled Buttons/Fields</b>', 'Save and Exit button, Next button and Sales rep fields should be in disabled state', "");         
        createNewJobPage.verifyElementdisabled();           
    });
    it('Click On customer Details Dropdown', function () { 
    reporter.appendTest('<b>Verifying Customer options</b>', 'Shipping and Billing customer option should be displayed', "");         
        createNewJobPage.clickOncustomerDetailsDropdown();           
    });
    it('Verify Customer options', function () { 
        createNewJobPage.verifyNextToCustomer_VendorAndAddNewOptions();           
    });
    it('Enter Name or company code', function () {  
        reporter.appendTest('Searching Customer', 'Searcrhing customer with keyword "VWDEMOSTOR" ', ""); 
        createNewJobPage.enterNameOrCompanyCode(masterCode)                     
    });
    it('get Selected Customer', function () { 
        createNewJobPage.getSelectedCustomer();           
    });
    it('verify Shipping Customer Details', function () { 
    reporter.appendTest('Verifying Shipping And Billing customer details', 'Shipping And Billing customer details should be auto populated after selecting customer', ""); 
        createNewJobPage.verifyShippingCustomerDetails();           
    });
    it('verify Billing Customer Detais', function () { 
        createNewJobPage.verifyBillingCustomerDetais();           
    });
    it('validate Shipping Customer', function () { 
        createNewJobPage.validateShippingCustomer();           
    });
    // it('validate Billing Customer', function () { 
    //     createNewJobPage.validateBillingCustomer();           
    // });  //used when selected billing customer is selected as customer option
    it('verify Auto Populated Contacts', function () { 
        createNewJobPage.verifyAutoPopulatedContacts();           
    });
    it('validate Ordering Contact', function () { 
        createNewJobPage.validateOrderingContac();           
    });
    it('validate Shipping Contact', function () { 
        createNewJobPage.validateShippingContact();           
    });
    it('validate Invoicing Contact', function () { 
        createNewJobPage.validateInvoicingContact();           
    });
    it('validate arContact', function () { 
        createNewJobPage.validatearContact();           
    });
    it('verify Auto Populated SalesRep', function () { 
        createNewJobPage.verifyAutoPopulatedSalesRep();           
    });
    it('Enter job name', function () { 
        createNewJobPage.enterJobName("Test_Automation_");           
    });
    it('Click on rush job radio button', function () {          
        createNewJobPage.clickOnRushJobRadioButton("No");           
    });
    it('Click on smaple required radio button', function () {          
        jobsHomePage.clickOnSampleRequiredRadioButton("Yes");           
    });
    it('Click on next button', function () {          
        createNewJobPage.clickOnNextButton();           
    });
    it('Validate subway map ', function () {  
     reporter.appendTest('<b>2. Product Source</b>', '*************', "");        
        createNewJobPage.ValidateSubwayMap("2. Product Source");          
    }); 
    it('Select Product', function () {    
     reporter.appendTest('<b>Selecting Product source </b>', 'Selecting "ASI Products"', "");         
        createNewJobPage.clickOnProduct(product);           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Select Products");           
    }); 
    it('Search For Products', function () { 
     reporter.appendTest('<b>Selecting Products </b>', 'Searching for Produtcs in a "Hard goods" category- ex: '+hardGoodsKeyword, "");                  
        createNewJobPage.searchProducts(hardGoodsKeyword);           
    });
    // it('Select Products', function () {          
    //     createNewJobPage.selectItems();           
    // });  //Functionality removed
    it('Click on order now button', function () {   
        createNewJobPage.clickOnOrderNowButton();           
    });
    it('Get selected product', function () {          
        createNewJobPage.storeProduct();     //stores prouct name in global.productName
    });
    
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("4. Quantities");           
    }); 
    it('Enter product quantity', function () {          
        createNewJobPage.enterProductQuantity();           
    }); 
    // it('enter pricing', function () {          
    //     createNewJobPage.enterProductPricing();           
    // }); //Automatically Pricing values are getting update
    it('Click on add pricing button', function () {          
        createNewJobPage.clickOnAddPricingButton();           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("5. Pricing & Dates");           
    }); 
    it('enter Requested Ship Date', function () {          
        createNewJobPage.enterRequestedShipDate();           
    });
    it('enter in hand date', function () {          
        createNewJobPage.enterInHandDate();           
    });
    it('Click on add line item', function () {          
        createNewJobPage.clickOnAddLineItemButton();           
    }); 
    it('verify Created JobId', function () { 
    reporter.appendTest('<b>Verifying Created Job </b>', 'Validating job with the data used while creating the job', "");                  
        createNewJobPage.verifyFormatOfCreatedJobIdFromDetailsPage(operatorName);           
    });
    it('verify details of Created Job', function () { 
        createNewJobPage.verifyCreatedNewJobNameDetailsPage();           
        createNewJobPage.statusOfCreatedJobInDetailsPage();           
        createNewJobPage.verifyCustomerNameOfCreatedJob();           
        createNewJobPage.verifyShippingCustomerInDetailsPage();           
        createNewJobPage.verifyBillingCustomerInDetailsPage();           
        createNewJobPage.verifyOrderContactInDetailsPage();           
        createNewJobPage.verifyShippingContactInDetailsPage();           
        createNewJobPage.verifySalesRepInDetailsPage();           
        createNewJobPage.verifyProductsCreatedJob();           
    });
    // it('verify AR Contact', function () { 
    //     createNewJobPage.verifyARContactInDetailsPage();           
    // }); //depricated
 
    // it('verify Invoicing Contact', function () { 
    //     createNewJobPage.verifyInvoicingContactInDetailsPage();           
    // }); //depricated
  

    // it('Click on back to Job list',function(){
    //     createNewJobPage.clickOnbackToJobListButton()
    // });
    
    // it('Verify rush /smaple required option in job list', function () {          
    //     createNewJobPage.verifyRushAndSampleJob("Sample");   //"Rush", "Sample" or "Both"         
    // }); //Here "Sample" is selected as it is the option selected while creating a job
    
});

