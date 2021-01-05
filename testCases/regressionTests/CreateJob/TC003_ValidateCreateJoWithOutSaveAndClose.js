let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product'),
masterCode = csvProcessor.filterData(testName, 'MasterCode');


describe('CreateJob-TC003', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {       
        global.current_TestCase = "TC003-CreateJob-SaveAndClose_ValidateCreateJoWithOutSaveAndClose";
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
        createNewJobPage.enterJobName("Trash-");           
    });
    it('Click on X mark on Create Job window/Back button', function () {  
    reporter.appendTest('Closing Page', '<b>Closing Job without saving</b>', ""); 
        createNewJobPage.clickOnCloseEditJobPopup();           
    });
    it('verify Created JobId', function () { 
    reporter.appendTest('Verifying the Job Tried to create', '<b>Job should not created</b>', ""); 
        createNewJobPage.verifyCreatedNewJobNameListPage(false);           
    });
 
});

