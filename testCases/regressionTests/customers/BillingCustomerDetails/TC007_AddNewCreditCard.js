const { element } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    lineitemdetails = requirePage('LineItemDetailsPage'),
    customerPage = requirePage('customerPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    zipCode = csvProcessor.filterData(testName, 'ZipCode'),
    address1 = csvProcessor.filterData(testName, 'Address1'),
    address2 = csvProcessor.filterData(testName, 'Address2'),
    city = csvProcessor.filterData(testName, 'City'),
    cardNumber = csvProcessor.filterData(testName, 'CardNumber'),
    securityCode = csvProcessor.filterData(testName, 'SecurityCode'),
    
    today = new Date(),
    timeStamp = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()
const currentDateAndTime = timeStamp,
    cardHolderName = 'Card Name' + currentDateAndTime

describe('Validate Vendor Details section', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC007-BillingCustomerDetails_AddNewCreditCard";
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

    it('Validate Credit cards header is displayed ', function () {
        customerPage.validateCreditCardsHeader();
    });

    it('Validate New Credit Card button', function () {
        customerPage.validateNewCreditCardButton();
    });

    it('Click on New Credit Card button', function () {
        customerPage.clickOnNewCreditCardButton();
    });

    // it('Click on Use Customer Billing address',function(){
    //     object is not visible
    // });

    // it('Validate Address will be auto filled in fields',function(){
    //     object is not visible
    // });

    // it('Uncheck Use Customer Billing address',function(){
    //     object is not visible
    // });

    // it('All Address fields are cleared',function(){
    //     object is not visible
    // });

    it('Enter Address', function () {
        customerPage.enterAddress(address1);
    });

    it('Enter Address2', function () {
        customerPage.enterCreditCardAddress2Field(address2);
    });

    it('Enter City', function () {
        customerPage.enterCreditCardCity(city);
    });

    it('Select State', function () {
        customerPage.selectState();
    });

    it('Enter ZIP', function () {
        customerPage.enterCompanyZip(zipCode);
    });

    it('Enter Card Number', function () {
        customerPage.enterCardNumber(cardNumber);
    });

    it("Enter Card Holder's Name", function () {
        customerPage.enterCreditCardHoldersName(cardHolderName);
    });

    it('Enter Select Month', function () {
        customerPage.selectExpiryMonth();
    });

    it('Enter Select Year', function () {
        customerPage.selectExpiryYear();
    });

    it('Enter Security Code', function () {
        customerPage.enterSecurityCode(securityCode);
    });

    it('Click on Submit button', function () {
        customerPage.clickOnCreditCardSubmitButton();
    });

    it('Verify New Credit Card information is saved', function () {
        customerPage.verifyAddedNewCreditCard(cardHolderName)
    });
});