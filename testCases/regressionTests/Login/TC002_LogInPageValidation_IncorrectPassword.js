let ipromoteU_login = requirePage('LoginPage')
let jobPage = requirePage('JobsHomePage')


var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
wrongPassword = "xxx";

describe('Login validations', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {   
        global.current_TestCase  = "TC002-Login_LogInPageValidation-IncorrectPassword";
      });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
   
    it('Login with incorrect password', function () {
      reporter.appendTest('<b>Login with incorrect password</b>', '', "PASS");        
        ipromoteU_login.fillLoginDetails(operatorName, wrongPassword, "Valid Operator Name", "Invalid password");
    });

     it('Verify Wrong password error', function () {
        ipromoteU_login.verifyOperatorCodeErrorMsg('Password', 'Password is wrong');
    });
    
    

});

