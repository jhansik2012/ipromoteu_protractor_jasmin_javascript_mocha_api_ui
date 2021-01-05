var ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor2.filterData(testName, 'OperatorName'),
password = csvProcessor2.filterData(testName, 'Password'),
url  = csvProcessor2.filterData(testName, 'Url'),
leftMenuTabs=["Presentations", "Jobs", "Artwork", "Customers","Vendors","Reporting","Support & Feedback","Custom Products","Bundled POs","Disputes", "Business Information"];

describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
       global.current_TestCase = "TC002-JobsScreen_ValidateHomePageLeftSideMenu";
      });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Verify Hamburger menu', function () { 
        reporter.appendTest('<b>ValidateHomePageLeftSideMenu</b>', '*************', "");          
        jobsHomePage.verifyHamburgerMenu();           
    });
    it('Verify left side menu', function () {
     reporter.appendTest('<b> Verify Left Side Menu Tabs/Links </b>', '*************', "");         
      leftMenuTabs.forEach(column=>{
        jobsHomePage.verifyLeftSideMenu(column); 
      })             
    });
    // it('Verify left side menu', function () {                        //deprecated    01/09/2020
    //     jobsHomePage.verifyLeftSideMenu("Quotes");           
    // });
    // it('Verify left side menu', function () {          
    //     // jobsHomePage.verifyiPROMOTEudisplayed();        //depricated 04/11/2020   
    // });
    // it('Verify left side menu', function () {                      //deprecated      01/09/2020
    //     jobsHomePage.verifyLeftSideMenu("Browse Products");           
    // });
    // it('Verify left side menu', function () {          
    //     // jobsHomePage.verifyLeftSideMenu("Dashboard");           //deprecated  04-11-2020
    // });
   
    
});

