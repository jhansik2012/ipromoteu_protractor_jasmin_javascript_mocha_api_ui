let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
contactDetails=requirePage('contactDetailsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Contact details- TC04', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {      
        global.current_TestCase = "TC004-ContactDetails_ValidateLinkedCustomersSection";
      });
    it('Navigate iPROMOTEu url', function () {    	
        ipromoteU_login.navigateToUrl(url);
    });
    it('Should Login with valid credentials and validate Jobs page', function () { 

        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });      
    it('Should Click on Customers button on side menu', function() {
    	 jobsHomePage.clickOnCustomersButton();       
    });
    it('should Clickon Contacts tab', () => {
        customerPage.clickOnContactsList()        
    });
    it('should Click on Ellipse next to any Contact row', () => {
        //contactDetails.getContactDetails(1)
          customerPage.clickOnContatsMenu(); //by default fist one
    });
    it('should Click on View/Edit Contact option', () => {
        contactDetails.clickOnMenuItem_ViewEditContact()
        Medium_Wait() 
    });
    //optional
  /*  it('should select contact', function() {
        contactDetails.selectContact()
    });  */
    
    it('should Validate Linked Customers section', function() {
        contactDetails.verifyLinkedCustomerSection()
    });
    /**
     * Billing type, and shipping type sections are not present in beta realease (26-10-2020)
     */
// Only some contacts have the billing customer details 
    // it('should Validate Billing Type Customer', function() {       
    //     contactDetails.verifyBillingTypeCustomer()
    // });
    // it('should Validate Shipping Type Customer', function() {
    //     contactDetails.verifyShipingCsustomer()
    // });

});