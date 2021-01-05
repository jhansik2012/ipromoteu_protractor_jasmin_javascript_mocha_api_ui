let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Validate Contact And Shipping Method Details : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        
        global.current_TestCase = "TC004-ShippingCustomerDetails_ValidateContactAndShippingMethodDetails";
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

    it('should Validate Contacts are displayed', function() {      
          customerPage.validateContactsHeader()
    });

    it('should Validate Default Shipping Contact details', function() {        
        customerPage.validateDefaultShippingContact()
    });

    it('should Validate Add Contact button ', function() {        
        customerPage.validateAddContactButton()
    });

    it('should Validate Shipping method dropdown', function() {        
        customerPage.validateShippingMethodHeader()
    });

    it('should Validate Account #', function() {        
       customerPage.validateCargoInsuranceHeader() 
    });

    it('should Validate Cargo Insurance', function() {       
       customerPage.validateNoCorgoInsurance_chckBox()
       customerPage.validateCargoInsuranceCostOnly()
    });

});



