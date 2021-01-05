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
        global.current_TestCase = "TC005-Vendors-_ValidateCSVDownload";  
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
   it('Click on Download button', function() {
     vendorsPage.clickOndownloadButton()
   });
   it('Click on Download CSV', function() {
     vendorsPage.clickOndownloadCSV()
   });
   
});