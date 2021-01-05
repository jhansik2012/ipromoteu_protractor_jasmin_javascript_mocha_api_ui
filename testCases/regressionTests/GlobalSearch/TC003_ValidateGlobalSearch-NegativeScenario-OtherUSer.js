let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
jobIDAAA  = '1725435AAA';

describe('GlobalSearch', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-GlobalSearch-OtherUSerJobId_ValidateGlobalSearchOtherUserJobId";
      });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Enter Global Search text', function () { 
      reporter.appendTest('Verifying "Global Search" Functionality', 'Using Job Id of different user to verify', "");                  
        jobsHomePage.globalSearchBox(jobIDAAA);  
    });
    it('Click on search icon', function () {          
        jobsHomePage.clickOnSearchIcon();       
    });
    it('Verify Global search results', function () {          
        jobsHomePage.verifyGlobalSearchNoResults("No Matching Data Found",true);       
    });      

});

