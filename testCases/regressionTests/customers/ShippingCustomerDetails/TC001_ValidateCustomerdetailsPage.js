let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Validate Customer details page: ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        
        global.current_TestCase = "TC001-ShippingCustomerDetails_ValidateCustomerDetailsPage";
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

    it('should Click on Ellipse next to any customer row', function() {
        
        customerPage.clickOnEllipseIconOfFirstCustomerRow();
    });

    it('should Click on "View/Edit Customer" option', function() {

        customerPage.clickOnViewEditCustomer();
    });

});
