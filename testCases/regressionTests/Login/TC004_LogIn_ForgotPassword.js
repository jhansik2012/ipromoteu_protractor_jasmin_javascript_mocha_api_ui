var ipromoteU_login = requirePage('LoginPage'),
    jobPage = requirePage('JobsHomePage')


var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
affiliate = "AAA-AAA Specialty Wholesale, Inc.",
operator = "AAA-David Stolper",

admin = "A5",
adminPassword = "XOMS1234",

wrongOperatorName = "AA",
wrongPassword = "xxx";

xdescribe('Login validations', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {   
        global.current_TestCase  = "TC004-Login_LogIn-ForgotPassword";
      });

    xit('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    xit('Forgot your password?', function () {
        //functionality is Not yet available in application
    });
   
    
   
});

