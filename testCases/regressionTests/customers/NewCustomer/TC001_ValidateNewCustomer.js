let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-NewCustomer_ValidateNewCustomerPageDisplayed";
      });
      
    it('Navigate iPROMOTEu url', function () {
    	
        ipromoteU_login.navigateToUrl(url);
    });

    it('Should Login with valid credentials and validate Jobs page', function () { 

        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    }); 

    it('Should Verify customers button on left side menu', function() {
    	jobsHomePage.verifyCustomersInLeftMenu();     	
    });

    it('Should Click on Customers button on side menu', function() {
    	jobsHomePage.clickOnCustomersButton();
    });

    it('Validate New Customer button',function(){
        customerPage.verifyCreateCustomerButton()
    })

    it('Click on New Customer button',function(){
        customerPage.clickOnCreateCustomerButton()
    })

    it('Validate New Customer Page Header',function(){
        customerPage.verifyNewCustomersPageHeader()
    })

});