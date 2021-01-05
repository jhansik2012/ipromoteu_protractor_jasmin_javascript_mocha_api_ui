let  ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
vendorsPage=requirePage('vendorsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Customer Page Item Validation  : ' , function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
  
    beforeEach(function () {
        global.current_TestCase = "TC003-vendors_ValidateVendorId&Pricing&Notes";
      
      });
    it('Navigate iPROMOTEu url', function () { 	
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () { 
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });   
    it('Verify vendors button', function() {      
        jobsHomePage.verifyvendorsPresent ()
    }); 
    it('Click on vendors', function() {
       jobsHomePage.clickOnVendorsButton()  
   });
   it('Click on vendor', function() {   
    vendorsPage.selectVendorByRowNum(1)
   });
   it('Validate vendor code', function() {
     vendorsPage.verifyvendorCode()
   });
   it('Validate ASI', function() {
     vendorsPage.verifyASI()  
   });
   it('Validate SAGE', function() {
     vendorsPage.verifySage()
   });
   it('Validate Pricing Information', function() {
     vendorsPage.verifyPricingInformation()
   });
   it('Validate Sample Policy & Notes', function() {
     vendorsPage.verifySamplePolicy()
   });
   it('Validate Contacts section', function() {
     vendorsPage.verifyNotes()
   });
   it('Click on  X button', function() {
      vendorsPage.clickOnClose()
   });
});