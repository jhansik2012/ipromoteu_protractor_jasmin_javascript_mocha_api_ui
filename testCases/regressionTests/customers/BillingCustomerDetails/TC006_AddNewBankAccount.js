let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    lineitemdetails = requirePage('LineItemDetailsPage'),
    customerPage = requirePage('customerPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    routingNumber = csvProcessor.filterData(testName, 'RoutingNumber'),
    checkNumber = csvProcessor.filterData(testName, 'CheckNumber'),
    min = 1000000000000000,
    max = 9000000000000000,
    today = new Date(),
    timeStamp = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()

const currentDateAndTime = timeStamp,
    paymentMethodName = 'Payment Method_' + currentDateAndTime,
    accountNumber = Math.floor(Math.random() * max + min);

describe('Validate Vendor Details section', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC006-BillingCustomerDetails_AddNewBankAccount";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });

    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });

    it('Should Verify customers button on left side menu', function () {
        jobsHomePage.verifyCustomersInLeftMenu();
    });

    it('Should Click on Customers button on side menu', function () {
        jobsHomePage.clickOnCustomersButton();
    });

    it('Click on Billing radio button', function () {
        customerPage.clickOnCustomerBillingRadioButton();
    });

    it('Validate vendor name in Line Item details page ', function () {
        customerPage.getBillingCustomerNameByText();
        customerPage.clickOnFirstBillingCustomer();
        customerPage.validateCompanyName();
    });

    it('Validate Payment methods header is displayed ', function () {
        customerPage.validatePaymentMethodsHeader();
    });

    it('Validate New Bank Account button', function () {
        customerPage.validateNewPaymentMethodButton();
    });

    it('Click on New Bank Account button', function () {
        customerPage.clickOnNewPaymentMethodButton();
    });

    it('Enter Name on Account', function () {
        customerPage.enterNameOnAccount(paymentMethodName);
    });
    it('Enter Account number', function () {
        customerPage.enterAccountNumber(accountNumber);
    });

    it('Enter Confirm Account # ', function () {
        customerPage.enterConfirmAccount(accountNumber);
    });

    it('Enter Routing Number', function () {
        customerPage.enterRoutingNumber(routingNumber);
    });

    it('Enter Check Number', function () {
        customerPage.enterCheckNumber(checkNumber);
    });

    it('Click on Submit button', function () {
        customerPage.clickOnPaymentMethodSubmitButton();
    });

    it('Verify new Bank Account is added', function () {
        customerPage.verifyAddedNewBankAccount(paymentMethodName)
    });
});