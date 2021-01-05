const { logging } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    customerPage = requirePage('customerPage'),
    createNewJobPage = requirePage('CreateNewJob')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    city = csvProcessor.filterData(testName, 'City'),
    st = csvProcessor.filterData(testName, 'ST'),
    zip = csvProcessor.filterData(testName, 'ZipCode'),
    state = csvProcessor.filterData(testName, 'State'),
    cardNumber = csvProcessor.filterData(testName, 'CardNumber'),
    securityCode = csvProcessor.filterData(testName, 'SecurityCode'),
    shippingAddress = csvProcessor.filterData(testName, 'Address1'),
    today = new Date(),
    timeStamp = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();

const currentDateAndTime = timeStamp,
    cardHolderName = 'Card Name ' + currentDateAndTime,
    companyNameShipTo = actions.strRandom(3),
    shipCode = companyNameShipTo + 0 + operatorName

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC006-NewCustomer-AddBankAccountCreditCard_ValidateNewCustomerBillingDetailsAddBankAccountCreditCard";
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
        customerPage.enterCompanyState(state);
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
    it('Click on Same As Billing Address Above CheckBox to check the checkbox', function () {
        customerPage.clickOnSameAsBillingAddressAboveCheckBox();
    });
    it('Validate Shipping Address field is autompoulated from Billing Address Above', function () {
        customerPage.verifyCreditCardShippingAddress(shippingAddress);
    });
    it('Validate City  field is autompoulated from Billing Address Above', function () {
        customerPage.verifyCreditCardCity(city);
    });
    it('Select State field is autompoulated from Billing Address Above', function () {
        customerPage.verifyCreditCardCompanyState(state);
    });
    it('Validate Postal Code field is autompoulated from Billing Address Above', function () {
        customerPage.verifyCreditCardPostalCode(zip);
    });
    it('Select Country', function () {
        customerPage.selectCountry();
    });
    it('Click On Add Credit Card Details Button', function () {
        customerPage.clickOnaddCreditCardDetailsButton();
    });
    it('Enter Card Number', function () {
        customerPage.enterCardNumber(cardNumber);
    });
    it("Enter Card Holder's Name", function () {
        customerPage.enterCardHoldersName(cardHolderName);
    });
    it('Enter Select Month', function () {
        customerPage.selectMonth();
    });
    it('Enter Select Year', function () {
        customerPage.selectYear();
    });
    it('Enter Security Code', function () {
        customerPage.enterSecurityCode(securityCode);
    });
    it('Click on Make This My Default Payment Type CheckBox', function () {
        customerPage.clickOnMakeThisMyDefaultPaymentTypeCheckBox();
    });
    it('Click on Save Credit Card Details button', function () {
        customerPage.clickOnSaveCreditCardDetailsButton();
    });
    it('Verify New Credit Card name is saved', function () {
        customerPage.verifyNewCustomerAddedNewCreditCardName(cardHolderName)
    });
    it('Verify New Credit Card number is saved', function () {
        customerPage.verifyNewCustomerAddedNewCreditCardAccountNum(cardNumber)
    });
    it('Verify New Credit Account number is saved', function () {
        customerPage.verifyNewCustomerAddedNewCreditCardAccountNum(cardNumber)
    });
    it('Verify New Credit Card expiry date is saved', function () {
        customerPage.verifyNewCustomerAddedNewCreditCardExpiresDate()
    });
});