const { logging } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    customerPage = requirePage('customerPage'),
    createNewJobPage = requirePage('CreateNewJob')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    routingNumber = csvProcessor.filterData(testName, 'RoutingNumber'),
    checkNumber = csvProcessor.filterData(testName, 'CheckNumber'),
    zip = csvProcessor.filterData(testName, 'ZipCode'),
    today = new Date(),
    timeStamp = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();
    min = 1000000000000000,
    max = 9000000000000000
const currentDateAndTime = timeStamp,
    bankAccountName = 'BankAcct' + currentDateAndTime,
    accountNumber = Math.floor(Math.random() * max + min),
    companyNameShipTo = actions.strRandom(3),
    shipCode = companyNameShipTo + 0 + operatorName

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC005-NewCustomer-AddBankAccountBankTransfer_ValidateNewCustomerBillingDetailsAddBankAccountBankTransfer";
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
    it('Enter ZIP', function () {
        customerPage.enterCompanyZip(zip);
    }); 
    it('Select State', function () {
        customerPage.enterCompanyState();
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
    it('Verify Bank Transfer Radio Button is selected by default', function () {
        customerPage.verifyBankTransferRadioButtonSelectedByDefault();
    }); 
    it('Enter Name on Account', function () {
        customerPage.enterBankTransferNameOnAccount(bankAccountName);
    });
    it('Enter Account number', function () {
        customerPage.enterBankTransferAccountNumber(accountNumber);
    });
    it('Enter Confirm Account # ', function () {
        customerPage.enterBankTransferConfirmAccount(accountNumber);
    });
    it('Enter Routing Number', function () {
        customerPage.enterBankTransferRoutingNumber(routingNumber);
    });
    it('Enter Check Number', function () {
        customerPage.enterCheckNumber(checkNumber);
    });
    it('Click On Next Button', function () {
        customerPage.clickOnNewCustomerNextButton();
    });
    it("Validate the hilighted 'Billing Contacts' in subway map", function () {
        reporter.appendTest('<b>Validate Billing Contacts Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("4. Billing Contacts");
    });
});