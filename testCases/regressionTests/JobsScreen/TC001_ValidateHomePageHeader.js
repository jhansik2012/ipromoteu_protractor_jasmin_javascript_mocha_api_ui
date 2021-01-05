var ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor2.filterData(testName, 'OperatorName'),
password = csvProcessor2.filterData(testName, 'Password'),
url  = csvProcessor2.filterData(testName, 'Url');

describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-JobsScreen_ValidateHomePageHeader";
      });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);         
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Verify Hamburger menu', function () {
        reporter.appendTest('<b>Jobs Home Page - Header Validations</b>', '*************', "");          
        jobsHomePage.verifyHamburgerMenu();           
    });
    it('Verify iPromoteu icon', function () {          
        jobsHomePage.verifyIPromoteIcon();           
    });
    it('Verify Search box', function () {          
        jobsHomePage.verifysearchFieldDisplayed();           
    });

    it('Verify Notification bell', function () {          
        jobsHomePage.verifyNotificationsDisplayed();                   
    });
    it('Verify User name text', function () {          
        jobsHomePage.verifyAvatartDisplayed();           
    });
    it('Click on avatar', function () {          
        jobsHomePage.clickonAvatar();           
    });
    it('Verify sign out dropdown button', function () {          
        jobsHomePage.verifyUserProfileNameLogOutDisplayed();           
    });
});

