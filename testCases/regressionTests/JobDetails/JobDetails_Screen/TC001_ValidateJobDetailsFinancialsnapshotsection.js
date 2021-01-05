let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url');
var snaptitles = ['Customer Price','Your Cost','Est Revenue'];


describe('Validate JobDetails Financial snapshot section',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-JobDetails-Financialsnapshot_ValidateJobDetailsFinancialsnapshotsection";
      });
          
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });    
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Validate Financial snapshot section', function () {
     reporter.appendTest('Verifying Financial Snapshot Section', '*************************', "");
        jobsHomePage.clickOnJobIdByUsingRowNumber(1);
    });
    it('Validate Financial snapshot Fields', function () {
     reporter.appendTest('Verifying Section', 'Verifying Financial Snapshot Section', "");
        snaptitles.forEach(text=>{
            jobsHomePage.verifyFinancialSnapshotFieldsAreDisplayed(text);
         });
    });
    it('Validate Profit Margin is displayed with percentage symbol',function(){
        jobsHomePage.profitMargineIsDisplayedwithPercentage();
    });    
    it('Validate the Revenue calculation', function(){
     reporter.appendTest('Verifying <b>Revenue</b> calculation', 'Revenue should be equal to the difference between "Customer Price" and "Your Cost" ', "");
        jobsHomePage.verifyFinSnShtPriceCalculation(snaptitles);
    });
    it('Validate Profit margin calculation', function(){
      reporter.appendTest('Verifying <b>Profit margin</b> calculation', 'Profit Margin should be equal to "(Est Revenue/Customer price) * 100" ', "");
        jobsHomePage.verfifyProfitMargin(snaptitles);
    });
    it('Validate currency values are displayed with $ symbol', function(){
     reporter.appendTest('Verifying Snapshot Elements Format', 'Count should be displayed in the "$" format', "");
        snaptitles.forEach(text=>{
            jobsHomePage.verifyCurrencyValuesWithDollar(text);
        });
    });
    it('Validate Customer Price calculation', function(){
     reporter.appendTest('Verifying <b>Customer Price</b> calculation', 'Customer Price in financial snapshot should be equal to the product of "Qty" and "Price" under Customer price column of all the line items in a job  ', "");
        jobsHomePage.validateCustomerPriceAccordingAllList();
    });
    it('Validate User Cost calculation', function(){
     reporter.appendTest('Verifying <b>Your cost</b> calculation', 'Your Cost in financial snapshot should be equal to the product of "Qty" and "Price" under Your cost column of all the line items in a job  ', "");
       jobsHomePage.validateUserPriceAccordingAllList();
    }); 

  //Add one more product and validate Financial snap shot section


});





   





     
