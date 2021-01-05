let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Validate Other And General Company Contact Details : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        
        global.current_TestCase = "TC005-ShippingCustomerDetails_ValidateOtherAndGeneralCompanyContactDetails";
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
    it('should Click on first customer', function() {        
        customerPage.clickOnFirstCustomer();
    });

    /**This field has removed from application */
    // it('should Validate Tax Code', function() {        
    //     customerPage.validateTaxCode();
    // });

    it('should Validate Tax Exempt#', function() {        
        customerPage.validateTaxExemptYash();
    });
    it('should Validate Vertical Market', function() {        
        customerPage.validateVerticalMarket();
    });
    it('should Validate Classification', function() {      
      customerPage.validateClasification(); 
    });
    it('should Validate Phone', function() {        
        customerPage.validatePhone();
    });
    it('should Validate Extension', function() {        
        customerPage.validatePhoneExt();
    });

    it('should Validate Fax', function() {        
        customerPage.validateFax();
    });
    it('should Validate Email', function() {        
        customerPage.validateEmail();
    });

});