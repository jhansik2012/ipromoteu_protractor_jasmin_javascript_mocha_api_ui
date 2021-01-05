let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-BillingCustomerDetails_ValidateViewEditCustomer";
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
    
    it('Click on Billing radio button', function() {
         customerPage.clickOnCustomerBillingRadioButton();
    });

    it('verify Customers List is present', function() {
        customerPage.verifyCustomersList(); 
    });

    it('Click on Ellipse next to any customer row', function() {
        customerPage.clickOnCustomerDetailsIcon();      
    });

    it('View/Edit Customer, View Open Jobs,Add Contact options are displayed', function() {     
        customerPage.verifyCustomerDetailsIconList();
    });

    it('Click on View/Edit Customer', function() {
        customerPage.clickOnViewEditCustomerDetailsIcon();      
    });

    it('Verify Customers Billing Details page is present', function() {
        customerPage.verifyCustomerBillingDetailsTitle(); 
    });
});