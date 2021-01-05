let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
masterCode = csvProcessor.filterData(testName, 'MasterCode');

var currentDate = new Date(),
    dd = currentDate.getDate(),
    mm = currentDate.getMonth() + 1, //as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateAndTimeStamp = dd + mm + yyyy + hour + minute,
    jobName= "Test_Automation_"+dateAndTimeStamp;


describe('EditJob-TC01', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase  = "TC001-EditJobCustomerDetails_EditJobDetails";
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

    it('Click on edit job details option', function () {          
        jobsHomePage.clickOnEditDetailsOption();           
    });

    it('Click On customer Details Dropdown', function () { 
    reporter.appendTest('<b>Verifying Customer options</b>', 'Shipping and Billing customer option should be displayed', "");         
        createNewJobPage.clickOncustomerDetailsDropdown();           
    });

    it('Verify Customer options', function () { 
        createNewJobPage.verifyNextToCustomer_VendorAndAddNewOptions();           
    });
    
    it('Verify Shipping Customer card', function () { 
        createNewJobPage.verifyShippingCustomerCard();           
    });

     it('Verify Billing Customer card', function () { 
        createNewJobPage.verifyBillingCustomerCard();           
    });

    it('Close Shipping Customer card', function () { 
        createNewJobPage.closeShippingCardAndVerify();           
    });

    it('Enter Name or company code', function () {  
        reporter.appendTest('Selecting Customer', 'Selecting "Shipping Customer"', "");  
        reporter.appendTest('Searching Customer', 'Searcrhing customer with keyword "VWDEMOSTOR" ', ""); 
        createNewJobPage.enterNameOrCompanyCode(masterCode)                     
    });

    it('get Selected Customer', function () { 
        createNewJobPage.getSelectedCustomer();     
    });

    it('Verify Alert', function () { 
    reporter.appendTest('Verifying Alert', 'Alert should be dispalyed while Changing the customer details', ""); 
        createNewJobPage.verifyAlertAndItsContent();     
    });

    it('Close Alert', function () { 
        createNewJobPage.closePopUpWithOk();     
    });

    it('Verify Shipping Customer card', function () { 
        createNewJobPage.verifyShippingCustomerCard();           
    });
//
    it('Close Billing Customer card', function () { 
        createNewJobPage.closeBillingCardAndVerify();         
    });
     
    it('Click on Customer Drop', function () { 
    reporter.appendTest('Selecting Customer', 'Selecting "Billing Customer"', "");  
        createNewJobPage.clickOncustomerDetailsDropdown();           
    });

    it('Select Billing Customer card', function () { 
       createNewJobPage.clickOnBillingCustomer()
    });
    
    it('Enter Name or company code', function () {
        reporter.appendTest('Searching Customer', 'Searching customer with keyword "VWDEMOSTOR" ', ""); 
        createNewJobPage.enterNameOrCompanyCode(masterCode)                     
    });

    it('get Selected Customer', function () { 
        createNewJobPage.getSelectedCustomer();     
    });

    it('Verify Alert', function () { 
    reporter.appendTest('Verifying Alert', 'Alert should be dispalyed while Changing the customer details', ""); 
        createNewJobPage.verifyAlertAndItsContent();     
    });

    it('Close Alert', function () { 
        createNewJobPage.closePopUpWithOk();     
    });
    it('Verify Shipping Customer card', function () { 
        createNewJobPage.verifyBillingCustomerCard();           
    });
    it('Enter job name', function () { 
        createNewJobPage.updateJobName(jobName); 
    });
    it('Verify existing Alternate Shipping Address', function () {
        createNewJobPage.verifyIsAlternativeAddress()
    });
    it('Click on update button', function () {          
        jobsHomePage.clickOnUpdateButton();             
    });
    it('verify Job name Of Created Job', function () { 
        createNewJobPage.verifyUpdatedJobNameDetailsPage(jobName);           
    });
    it('verify Shipping Customer', function () { 
        createNewJobPage.verifyUpdatedShippingCustomerInDetailsPage();           
    });
    it('verify BillingCustomer', function () { 
        createNewJobPage.verifyUpdatedSBillingCustomerInDetailsPage();           
    });

});

