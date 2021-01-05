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
        global.current_TestCase = "TC004-BillingCustomerDetails_ValidateContactAndInvoiceDetails";
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

    it('Click on Billing radio button', function() {
         customerPage.clickOnCustomerBillingRadioButton();
    });

    it('Validate vendor name in Line Item details page ', function (){
        customerPage.getBillingCustomerNameByText();    
        customerPage.clickOnFirstBillingCustomer();      
        customerPage.validateCompanyName();
    });

    it('Validate Contacts Header is displayed ',function(){
        customerPage.validateContactsHeader();
    });

    it('Validate Add Contact button ',function(){
        customerPage.validateAddContactButton();
    });

    it('Validate invoice details header',function(){
        customerPage.verifyInvoiceDetailsHeader();
    });

    it('Validate Terms dropdown inder Invoice details section',function(){
        customerPage.validateInvoicingTermDropdown();
    });
    it('Validate Tax Exempt ',function(){
        customerPage.validateInvoiceTaxExempt();
    });

    it('Validate Tax Exempt #',function(){
        customerPage.validateInvoiceTaxExemptYash();
    });

    it('Validate Lock Box ',function(){
        customerPage.validateLocBox();
    });

    it('Validate Email Invoice To',function(){
        customerPage.validateEMailInvoiceTo();
    });

    it('Validate CC Email',function(){
        customerPage.validateCCEMail();
    });

});