let ipromoteU_login = requirePage('LoginPage')
let jobPage = requirePage('JobsHomePage')


var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
admin = "A5",
adminPassword = "XOMS1234";

//disabled due to admin user A5 is not working
xdescribe('Login validations', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {   
        global.current_TestCase  = "TC003-Login_LogInPageValidationAsOperator";
      });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
   
    
    it('Login with valid Admin credentials and validate Jobs page', function () {
      reporter.appendTest('<b>Login with valid Admin credentials and validate Jobs page</b>', '', ""); 
      ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Admin", "Valid password");
      browser.sleep(10000);
      ipromoteU_login.verifyJobsPageHeader('Jobs', 'Jobs');
      browser.sleep(10000);
      jobPage.clickonAvatar();
      browser.sleep(1000);
      jobPage.verifyUserProfileNameAccountDisplayed();
      jobPage.verifyUserProfileNameLogOutDisplayed();
      jobPage.clickonAvatar();
    }); 

    
});

