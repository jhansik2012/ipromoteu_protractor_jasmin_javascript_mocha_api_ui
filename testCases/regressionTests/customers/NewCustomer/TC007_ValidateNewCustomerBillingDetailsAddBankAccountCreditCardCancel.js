const { logging } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    customerPage = requirePage('customerPage'),
    createNewJobPage = requirePage('CreateNewJob')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),    
    shippingAddress = csvProcessor.filterData(testName, 'Address1'),
    state = csvProcessor.filterData(testName, 'State'),
    city = csvProcessor.filterData(testName, 'City'),
    zip = csvProcessor.filterData(testName, 'ZipCode')

const companyNameShipTo = actions.strRandom(3),
    shipCode = companyNameShipTo + 0 + operatorName
  
describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC007-NewCustomer-AddBankAccountCreditCard-Cancel_ValidateNewCustomerBillingDetailsAddBankAccountCreditCardCancel.js";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Should Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Should Verify customers button on left side menu', function () {
        jobsHomePage.verifyCustomersInLeftMenu();
    });
    it('Should Click on Customers button on side menu', function () {
        jobsHomePage.clickOnCustomersButton();
    });
    it('Click on Create Customer button', function () {
        customerPage.clickOnCreateCustomerButton()
    })
    it("Validate the hilighted 'Shipping Details' in subway map", function () {
        reporter.appendTest('<b>Shipping Details Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Shipping Details");
    });
    it('Enter Company Name/Ship To ', function () {
        customerPage.enterCompanyNameShipTo(companyNameShipTo);
    });
    it('Enter Address', function () {
        customerPage.enterCompanyShippingAddress(shippingAddress);
    });
    it('Enter City', function () {
        customerPage.enterCompanyCity(city);
    });
    it('Select State', function () {
        customerPage.enterCompanyState();
    });
    it('Enter ZIP', function () {
        customerPage.enterCompanyZip(zip);
    });
    it('Validate shipe code', function () {
        customerPage.validateShipCode(shipCode);
    });
    it('Click On Next Button', function () {
        customerPage.clickOnNewCustomerNextButton();
    });
    it("Validate the hilighted 'Shipping Contacts' in subway map", function () {
        reporter.appendTest('<b>Validate Shipping Contacts Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("2. Shipping Contacts");
    });
    it('Click On Next Button', function () {
        customerPage.clickOnNewCustomerNextButton();
    });
    it("Validate the hilighted 'Billing Details' in subway map", function () {
        reporter.appendTest('<b>Validate Billing Details Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("3. Billing Details");
    });
    it('Click On +Add Payment Method / Bank Transfer or Credit Card', function () {
        customerPage.clickOnAddPaymentMethodBankTransferOrCreditCard();
    });
    it('Click on Credit Card Radio Button', function () {
        customerPage.clickOnCreditCardRadioButton();
    });
    it('Click On Cancel Credit Card Entry Button', function () {
        customerPage.clickOnCancelCreditCardEntryButton();
    });
    it("Validate the hilighted 'Billing Contacts' in subway map", function () {
        reporter.appendTest('<b>Validate Billing Contacts Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("4. Billing Contacts");
    });
    it('Validate Submit button in Billing contacts screen', function () {
        customerPage.verifyNewCustomerSubmitButton();
    });  
});