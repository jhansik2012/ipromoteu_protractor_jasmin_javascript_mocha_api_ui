let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product'),
searchKeyword = csvProcessor.filterData(testName, 'searchKeyword'),
masterCode = csvProcessor.filterData(testName, 'MasterCode');


describe('CreateJob-TC001', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {       
        global.current_TestCase = "TC001-CreateJob-SaveAndExit_ValidateCreateJobWithSaveAndExit";
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
    it('Verify Save & Exit, Next button and Sales rep elements disabled and Click On customer Details Dropdown', function () { 
      reporter.appendTest('<b>Verifying Customer options</b>', 'Shipping and Billing customer option should be displayed', "");         
        createNewJobPage.verifyElementdisabled();           
        createNewJobPage.clickOncustomerDetailsDropdown();           
    });
    it('Verify Customer options and Enter Name or company code', function () {  
        createNewJobPage.verifyNextToCustomer_VendorAndAddNewOptions();           
        reporter.appendTest('Searching Customer', 'Searcrhing customer with keyword "VWDEMOSTOR" ', ""); 
        createNewJobPage.enterNameOrCompanyCode(masterCode)                     
    });
    it('verify Customer Details', function () { 
    reporter.appendTest('Verifying Shipping And Billing customer details', 'Shipping And Billing customer details should be auto populated after selecting customer', ""); 
        createNewJobPage.getSelectedCustomer();     
        createNewJobPage.verifyShippingCustomerDetails();           
        createNewJobPage.verifyBillingCustomerDetais();           
        createNewJobPage.validateShippingCustomer();           
     });
   
    // it('validate Billing Customer', function () { 
    //     createNewJobPage.validateBillingCustomer();           
    // });  //used when selected billing customer is selected as customer option 
   
    it('Validate displayed details', function () { 
        createNewJobPage.verifyAutoPopulatedContacts();           
        createNewJobPage.validateOrderingContac();           
        createNewJobPage.validateShippingContact();           
        createNewJobPage.validateInvoicingContact();           
        createNewJobPage.validatearContact();           
        createNewJobPage.verifyAutoPopulatedSalesRep();        //   global.salesRep   
    });
  
    it('Enter Job details', function () {          
        createNewJobPage.enterJobName("Test_Automation_");      //     global.jobName     
        createNewJobPage.clickOnRushJobRadioButton("Yes");           
        jobsHomePage.clickOnSampleRequiredRadioButton("No");           
    });
    it('Click on Need to stop for some reason ? Save and Exit', function () {          
        createNewJobPage.clickOnSaveAndExitButton();           
    }); 
    it('verify Created job Name', function () { 
        createNewJobPage.verifyStatusOfCreatedJob();           
        createNewJobPage.verifyCreatedJobId();           
        createNewJobPage.verifySalesRepInList();           
        createNewJobPage.verifyCreatedNewJobNameListPage(true);           
        createNewJobPage.verifyRushAndSampleJob("Rush");   //Here rush is selected as it is the option selected while creating a job //"Rush", "Sample" or "Both"   
    });
    it('Click on Job ID', function () {
     reporter.appendTest('<b>Verifying Job in Job Details Page</b>', "Created Job Data should be same as the data used to create", "");
        jobsHomePage.clickOnJobIdByUsingRowNumber(1);
    });  
    it('verify details Created Job', function () { 
        Short_Wait()
        createNewJobPage.verifyCreatedNewJobNameDetailsPage();           
        createNewJobPage.statusOfCreatedJobInDetailsPage();           
        createNewJobPage.verifyCustomerNameOfCreatedJob();           
        createNewJobPage.verifyShippingCustomerInDetailsPage();           
        createNewJobPage.verifyBillingCustomerInDetailsPage();           
        createNewJobPage.verifyOrderContactInDetailsPage();           
        createNewJobPage.verifyARContactInDetailsPage();           
        createNewJobPage.verifyShippingContactInDetailsPage();           
        createNewJobPage.verifyInvoicingContactInDetailsPage();           
        createNewJobPage.verifySalesRepInDetailsPage();           
    });
});

