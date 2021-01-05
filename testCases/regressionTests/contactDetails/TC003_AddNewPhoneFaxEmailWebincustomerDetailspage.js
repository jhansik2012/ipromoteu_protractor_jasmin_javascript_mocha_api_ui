let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
contactDetails=requirePage('contactDetailsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Contact details- TC03', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {        
        global.current_TestCase = "TC003-ContactDetails_AddNewPhone-Fax-Email-WebInCustomerDetailsPage";
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
        contactDetails.clickOnMenuItem_ViewEditContact() 
    });
/*--------------------------------------------------*/
    it('should Click on +Add Phone', () => {
        contactDetails.ValidateAddPhone()        
    });
    it('should Enter Phone2/Ext2', () => {
        contactDetails.enterPhone2()        
    });
    it('should Click on  Make default Phone', () => {
        contactDetails.makePhone2AsDefault()        
    });
    it('should Validate  +Add Phone button', () => {
        contactDetails.verifyAddPhonebutton()        
    });
/*--------------------------------------------------*/
    it('should Click on +Add Fax', () => {
        contactDetails.ValidateAddFax()        
    });
    it('should Enter Fax2', () => {
        contactDetails.enterFax2()        
    });
    it('should Click on  Make default Fax', () => {
        contactDetails.makeFax2AsDefault()        
    });
    it('should Validate  +Add Fax button', () => {
        contactDetails.verifyAddFaxbutton()        
    });
/*--------------------------------------------------*/
   it('should Click on +Add Email', () => {
        contactDetails.ValidateAddEmail()        
    });
    it('should Enter Email2', () => {
        contactDetails.enterEmail2()        
    });
    it('should Click on  Make default Email', () => {
        contactDetails.makeEmail2AsDefault()        
    });
    it('should Validate  +Add Email button', () => {
        contactDetails.verifyAddEmailbutton()        
    }); 
/*--------------------------------------------------*/
    it('should Click on +Add Web/Url', () => {
        contactDetails.ValidateAddWeb()        
    });
    it('should Enter Web/Url2', () => {
        contactDetails.enterWeb2()        
    });
    it('should Click on  Make default Web/Url', () => {
        contactDetails.makeWebAsDefault()        
    });
    it('should Validate  +Add Web/Url button', () => {
        contactDetails.verifyAddWebbutton()        
    });  
    it('should click on update button', ()=> {
        contactDetails.clickOnUpdate()
    });
    it('should get Contact Details', function() {
       contactDetails.getContactDetails(1)
    });
    it('should validate updated value', function() {
       contactDetails.verifyAfterUpdate() 
    });
});

