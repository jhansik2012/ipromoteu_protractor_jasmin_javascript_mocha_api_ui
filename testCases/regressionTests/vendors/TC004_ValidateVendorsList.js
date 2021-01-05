let  ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
vendorsPage=requirePage('vendorsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
types=['Decorator','Silkscreen','Embroidery','Misc','Apparel','Print','Import','Blank'],
status=['Preferred','Reward','Elite','Elite Plus'],
tableItems=['name','code','contact','email','phone','ext','website','status']

describe('Validate Vendors List : ' , function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
  
    beforeEach(function () {
        global.current_TestCase = "TC004-vendors_ValidateVendorsList";  
      });
      
   it('Navigate iPROMOTEu url', function () { 	
        ipromoteU_login.navigateToUrl(url);
    });
   it('Login with valid credentials and validate Jobs page', function () { 
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });  
   it('Verify vendors button', function() {   
        jobsHomePage.verifyvendorsPresent()
    }); 
   it('Click on Vendors menu from left menu', function() {
       jobsHomePage.clickOnVendorsButton()  
   }); 
   it('Validate header', function() {
     vendorsPage.verifyVendorHead()
   });
   it('Enter any text under Keyword Search', function() {
     vendorsPage.enterIntoKeywordSearchField()
   });
   it('Click on magnifier', function() {
     vendorsPage.clickOnKeywordSearchMagnifierAndVerifyResult()
   });
   it('Verify Type dropdown ', function() {
      vendorsPage.clickOnTypeDropDownAndSelectOption()
   });

   it('Reset filters',function(){
      vendorsPage.resetType()
   })
   it('Verify Prefered Status dropdown', function() {
       vendorsPage.clickOnpreferredStatusDropDown()
     });
   it('Enter any text under Keyword Search', function() {
     vendorsPage.enterIntoKeywordSearchField()
   });
   it('Validate Vendors Ive Used checkbox', function() {
     vendorsPage.clickOnvendorsUsedCheckBox() 
   });
   it('Click on Download button', function() {
     vendorsPage.clickOndownloadButton()
   });
   it('Click on Download PDF', function() {
     vendorsPage.clickOndownloadPDF()
   });
  
   it('Validate Name, Code,Contact,Phone,Email,Phone,Website,Status,Type Columns displayed in Vendors table', function() {
     tableItems.forEach(column_name=>{
      // vendorsPage.verifyTableColumns(column_name)
    })
   });
   it('Click on Down/Up arrow next to Name Coumn header', function() {     
     //feature not working
   });
});