let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
lineitemdetails= requirePage('LineItemDetailsPage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url');

describe('Validate Vendor Details section',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC006-ShippingCustomerDetails_Validate BillingCustomerDocumentsSection";
      });    
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });    
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });

    it('Should Verify customers button on left side menu', function() {
        jobsHomePage.verifyCustomersInLeftMenu();      
    });

    it('Should Click on Customers button on side menu', function() {
         jobsHomePage.clickOnCustomersButton();
    });

     it('Validate vendor name in Line Item details page ', function (){
        customerPage.getCustomerNameByText();    
        customerPage.clickOnFirstCustomer();      
        customerPage.validateCompanyName();
    });
     
    it('Validate Invoicing Details',function(){
        customerPage.validateInvoicingDetails();
    });

    it('Validate Billing Customer', function() {
       customerPage.validateBillingCustomer();
    });

    // it('Validate Documents section',function(){
    //     //this functionality not yet available in application 
    // });
    // it('Click on any document',function(){
    //     //this functionality not yet available in application 
    // });

    
});