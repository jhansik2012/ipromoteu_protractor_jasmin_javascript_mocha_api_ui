let ipromoteU_login = requirePage('LoginPage')
let jobPage = requirePage('JobsHomePage')


var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
operator = "AAA-David Stolper",
wrongOperatorName = "AA";

describe('Login validations', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {  
        global.current_TestCase  = "TC001-Login_LoginPageValidation-IncorrectOperatorName";
      });
      
    
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
   
    it('Login with incorrect Operator name', function () {
        reporter.appendTest('<b>Login with incorrect Operator name</b>', '', "");     
        ipromoteU_login.fillLoginDetails(wrongOperatorName, password, "Operator Name", "Password");        
        browser.sleep(3000);
        ipromoteU_login.verifyOperatorCodeErrorMsg('Operator Name', 'Operator code doesn’t exists');
    });
     

});

