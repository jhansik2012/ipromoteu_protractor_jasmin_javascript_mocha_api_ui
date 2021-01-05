let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
contactDetails=requirePage('contactDetailsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Contact details- TC01', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {        
        global.current_TestCase = "TC001-ContactDetails_ValidateEditUpdateContactDetailsPage";
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
        contactDetails.getContactDetails(1)
        customerPage.clickOnContatsMenu();   
    });
    it('should Click on View/Edit Contact option', () => {
        contactDetails.clickOnMenuItem_ViewEditContact()  //default first contact
    });
    it('should Validate Contact name in Header section', () => {
        contactDetails.verifyContactName()
    });
    it('should Validate Contact Number in Header section', () => {
        contactDetails.verifyContactPhone()
    });
    it('should Validate Contact email in Header section', () => {
        contactDetails.verifyContactEmail()
    });
});