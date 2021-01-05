let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
contactPage=requirePage('contactDetailsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
columns=['name','Default','email','phone','Customer Code'],
Name="David"

describe('Contact List- TC01 ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {      
        global.current_TestCase = "TC001-ContactsList_ValidateContactList";
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
    it('verify Customers Page Header', function() {
         customerPage.verifyCustomersPageHeader(); 
     });
    it('should Click on Contacts tab', function() {
        customerPage.clickOnContactsList();
     }); 
     it('verify Contact List Table Displayed', function() {
        customerPage.verifyContactListTableDisplayed()
     });    
    it('should Validate Add Contact button ', function() {
        // feature not present
     });

    it('should Verify Contact Type', function() {
         contactPage.verifyContactType()
     });
    it('should Verify Contact Type Enabled', function() {
         customerPage.verifyContactTypeEnabled()
     });
    it('should Enter [Fist Name, Last name] under Keyword Search', function() {
         contactPage.verifyNameSeachfield(Name)
     });
    // it('should Click on magnifier', function() {
    //      //magnifier is not working
    //  });

    it('Verify Name seacrh results', function() {
          contactPage.verifyNameSeacrhResults(Name)
     });
    it('should Validate Add List button', function() {
          customerPage.verifyAddToListButton()
     });    
    it('should Validate Name, Default,Email,Phone, Ext,Customer Code Columns displayed in Contacts table', function() {
         columns.forEach(function(text){
            customerPage.verifyTableColums(text)
         });   
     });
    it('should Click on Buttons next to Name Column header', function() {
        //featue removed
     });
    it('should Validate Check Box in contacts table', function() {
         customerPage.verifyContactListCheckBox()
     });

    it('should Click on Billing radio button', function() {
        customerPage.clickOnBillingRadio()  
     });
    it('should Validate Name, Default,Email,Phone, Ext,Customer Code Columns displayed in Contacts table', function() {
         columns.forEach(text=>{
         customerPage.verifyTableColums(text)
         })  
     });
    it('should Click on Ellipse next to any Contact row', function() {
         customerPage.clickOnContatsMenu()
         customerPage.verifyContactsMenuItems()
     });  
});
