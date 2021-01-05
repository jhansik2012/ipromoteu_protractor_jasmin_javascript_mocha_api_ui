let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product');

describe('ASIProductSearch-TC01', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
       
        global.current_TestCase = "TC001-ASIProductSearch_AddProductsFromASI";
      });
    
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });    
    it('Click on create job ', function () { 
        reporter.appendTest('<b>Create Job</b>', '*************', "");         
        createNewJobPage.clickOnCreateJob();           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("1. Job Details & Contacts");           
    }); 
    
    it('Enter Name or company code', function () {  
        reporter.appendTest('<b>Create Job</b>', '*************', ""); 
        createNewJobPage.enterNameOrCompanyCode("VWDEMOSTOR")                     
    });
    it('Validate shipping customer ', function () {        
        // createNewJobPage.verifyShippingCustomerIsDisplayed("VWDEMOSTOR")                     
    });     
    it('Enter job name', function () {          
        createNewJobPage.enterJobName("Test_Automation_");           
    });
    it('Click on rush job radio button', function () {          
        createNewJobPage.clickOnRushJobRadioButton("Yes");           
    });
    it('Click on smaple required radio button', function () {          
        jobsHomePage.clickOnSampleRequiredRadioButton("No");           
    });
    it('Enter job name', function () {          
        createNewJobPage.enterJobName("Test_Automation_");           
    }); 
      
    it('Click on next button', function () {          
        createNewJobPage.clickOnNextButton();           
    });
    it('Validate subway map ', function () {  
    reporter.appendTest('<b>2. Product Source</b>', '*************', "");        
        createNewJobPage.ValidateSubwayMap("2. Product Source");           
    }); 
    it('Select Product', function () {          
        createNewJobPage.clickOnProduct(product);           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Select Products");           
    });


});

