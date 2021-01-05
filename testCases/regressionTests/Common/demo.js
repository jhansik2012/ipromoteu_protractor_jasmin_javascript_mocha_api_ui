let ipromoteU_login = requirePage('LoginPage')
let jobPage = requirePage('JobsHomePage')


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

describe('Login validations', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        browser.ignoreSynchronization = true;
        global.current_TestCase = "demo_firstDemo";
      });
      afterEach(function () {
        browser.ignoreSynchronization = false;
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

