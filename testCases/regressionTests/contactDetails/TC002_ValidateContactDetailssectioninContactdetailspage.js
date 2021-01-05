let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
contactDetails=requirePage('contactDetailsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Contact details- TC02', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
     beforeEach(function () {      
        global.current_TestCase = "TC002-ContactDetails_Validate Contact Details Section in Contact Details Page";
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
      //  contactDetails.getContactDetails(1)
        customerPage.clickOnContatsMenu();   
    });
    it('should Click on View/Edit Contact option', () => {
        contactDetails.clickOnMenuItem_ViewEditContact() 
    });
    it('Click salutation dropdown', function() {
        contactDetails.clickSalutationDropdown()
    });
     it('Should Validate salutation dropdown', function() {
        contactDetails.verifyDropDown()
    });
    it('should Update Name', function() {
        contactDetails.validateNameField()
    });
    it('should Update Phone', function() {
        contactDetails.validatephoneField()
    });
 /*   it('should Update Ext', function() {
        contactDetails.()
    });
 */
    it('should Update Fax', function() {
        contactDetails.validateFaxField()
    });
    it('should Update email', function() {
        contactDetails.validateemailfield()
    });
    it('should Update Web/Url', function() {
        contactDetails.validateWebField()
    });
    it('should Update Notes', function() {
        contactDetails.validateNotesfield()
    });
});
    
    