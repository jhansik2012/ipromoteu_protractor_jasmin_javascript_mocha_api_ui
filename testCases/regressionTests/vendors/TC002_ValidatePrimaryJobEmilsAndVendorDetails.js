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
        global.current_TestCase = "TC002-vendors_ValidatePrimaryJobEmilsAndVendorDetails";    
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
   it('Select first vendor', function() {
       vendorsPage.selectVendorByRowNum(1)
   });
   it('Validate Primary Job emails ', function() {
       vendorsPage.verifyPrimaryEmailDetails()   
   });
   it('Validate Company Name ', function() { 
      vendorsPage.verifyCompanyName()
   });
   it('Validate Phone', function() {
      vendorsPage.verifyphone()
   });
   it('Validate EXT', function() {
      vendorsPage.verifyExt()
   });
   it('Validate Fax', function() {
      vendorsPage.verifyFax()
   });
   it('Validate Address', function() {
      vendorsPage.verifyAddress()
   });
   it('Validate City', function() {
      vendorsPage.verifyCity()
   });
   it('Validate State', function() {
      vendorsPage.verifyState()
   });
   it('validate ZIP', function() {
      vendorsPage.verifyZip()
   });
   it('Validate Country', function() {
      vendorsPage.verifyCountry()
   });

 });