var ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    customerPage = requirePage('customerPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    shippingType = csvProcessor.filterData(testName, 'ShippingType')

describe('Customer Should Exists : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-ShippingCustomerDetails_CustomerShouldExists";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });

    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });

    it('Verify customers button on left side menu', function () {
        jobsHomePage.verifyCustomersInLeftMenu();
    });

    it('Click on Customers button on side menu', function () {
        jobsHomePage.clickOnCustomersButton();
    });

    it('Click on first customer', function () {
        customerPage.clickOnFirstCustomer();
    });

    it('Validate customer name', function () {
        customerPage.verifyShippingCustomerName();
    });

    it('Validate customer type', function () {
        customerPage.verifyCustomerTypeOpenedPopup(shippingType)
    })

    it('Validate Customer phone', function () {
        customerPage.verifycustomerPhone();
    });

    it('Validate Customer email id', function () {
        customerPage.verifycustomerMail();
    });

    it('Validate Customer Open Orders amount', function () {
        customerPage.verifyopenOrdersValue();
    });

    it('Validate Customer Receivables', function () {
        customerPage.verifyrecieveOrdersValue();
    });

    it('Validate Customer Order Volume', function () {
        customerPage.verifyvolumeOrdersValue();
    });

});