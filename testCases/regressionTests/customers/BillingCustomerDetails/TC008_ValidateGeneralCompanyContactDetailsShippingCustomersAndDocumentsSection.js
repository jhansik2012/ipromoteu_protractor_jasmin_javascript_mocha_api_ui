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
        global.current_TestCase = "TC008-BillingCustomerDetails_ValidateGeneralCompanyContactDetailsShippingCustomersAndDocumentsSection";
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

    it('Validate Company Name ', function (){
        customerPage.getBillingCustomerNameByText();    
        customerPage.clickOnFirstBillingCustomer();      
        customerPage.validateCompanyName();
    });

    it('Validate Phone',function(){
        customerPage.validatePhone();
    });

    it('Validate Phone is editable',function(){
        customerPage.validatePhoneFieldEditable();
    });

    it('Validate phone Extension',function(){
        customerPage.validatePhoneExt();
    });

    it('Validate Phone Extension is editable',function(){
        customerPage.validatePhoneExtFieldEditable();
    });

    it('Validate Fax',function(){
        customerPage.validateFax();
    });

    it('Validate fax is editable',function(){
        customerPage.validateFaxFieldEditable();
    });

    it('Validate Email',function(){
        customerPage.validateEmail();
    });

    it('Validate Email is editable',function(){
        customerPage.validateEmailFieldEditable();
    });

     it('Validate Shipping customer Title',function(){
        customerPage.validateShippingCustomerTitle();            
    });

    it('Validate Shipping customers Names',function(){
        Medium_Wait();
        customerPage.validateShippingCustomersNames();            
    });

    it('Validate Shipping customers Addresses',function(){
        customerPage.validateShippingCustomersAddresses();            
    });

    it('Validate Shipping customers Codes',function(){
        customerPage.validateShippingCustomersCodes();            
    });

//******************************************************************************* */

    // it('Validate Show More buttonEnter Phone',function(){
    //     this functionality is not available
    // });

    // it('Click on Show More Button ',function(){
    //       this functionality is not available
    // });

    // it('Click on any document',function(){
    //      this functionality is not available
    // });    

});