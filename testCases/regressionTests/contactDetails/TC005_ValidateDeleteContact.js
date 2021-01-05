let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
contactDetails=requirePage('contactDetailsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Contact details- TC05', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {       
        global.current_TestCase = "TC005-ContactDetails_ValidateDeleteContact";
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
    it('should get contact details', function() {
        contactDetails.getContactName(1)
    });
    it('should Click on Ellipse next to any Contact row', () => {
        customerPage.clickOnContatsMenu(); //by default fist one
    });
    it('should Click on Delete Contact button', function() {
        contactDetails.ClickOnDeleteMenuItem()
    });
//There is a bug where above feature is not working so using details menu do delete contact
    it('should Click on Delete from details page', function() {
        contactDetails.ClickOnDeleteButtonFromDetailsPage()
    });
    it('should Click on No', function() {
        contactDetails.SelectDeleteContactNo()
    });
    it('Click on Close Button', function() {
        contactDetails.verifyByNotDeleting() 
    });
    it('Should Search for the contact ', function() {
        contactDetails.EnterNameInNameSearch() 
    });
     it('should Search for the contact ', function() {
        contactDetails.verifyContacInList() 
    })
    it('should Click on Contact Menu button', function() {
        customerPage.clickOnContatsMenu();  
    });
    it('should Click on Delete Contact button', function() {
        contactDetails.ClickOnDeleteMenuItem()
    });
//There is a bug where above feature is not working, so using details menu do delete contact
    it('should Click on Delete from details page', function() {
        contactDetails.ClickOnDeleteButtonFromDetailsPage()
    });
    it('should Click Yes', function() {
        contactDetails.SelectDeleteContactYes()
    });
    it('Should Search for the contact ', function() {
        contactDetails.EnterNameInNameSearch() 
    });
    it('Validate List- Contact Should not be present ', function() {
        contactDetails.verifyByDeleting() 
    });
         
})