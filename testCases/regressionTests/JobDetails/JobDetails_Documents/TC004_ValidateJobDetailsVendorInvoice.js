/*
let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
documentsPage=requirePage('JobDetails_DocumentsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url');

describe('Validate Job Details Vendor Invoice',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC004-JobDetails-Documents_ValidateJobDetailsVendorInvoice";
      });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });    
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Click on first job', function () {
        jobsHomePage.clickOnJobIdByUsingRowNumber(1);
    });   
    it('Validate Documents tab', () => {
        documentsPage.()
    });
    it('Validate Documents table', () => {
        documentsPage.()
    });
    it('Click on ellipse at the end of each row', () => {
        documentsPage.()
    });
    it('Click on Email Document', () => {
        documentsPage.()
    });
    it('Click on View Document', () => {
        documentsPage.()
    });
})
*/