let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    financePage = requirePage('JobDetails_Finance')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    state = csvProcessor.filterData(testName, 'State'),
    taxCalculationFields = ['Tax Exempt Sales', 'Taxable Sales', 'Sales Tax'],
    salesTable = ['Product', 'Description', 'Qty', 'Price', 'ext', 'Shipping City', 'St', 'Vendor', 'Exempt']

describe('Add Credit card', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC004-JobDetails-Finance_AddCreditCard";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on first job', function () {
        jobsHomePage.clickOnJobIdByUsingRowNumber(1);
    });
    it('Click on Finance tab', () => {
        financePage.clickOnFinanceLink()
    });
    it('Click on Sales Tax tab', () => {
        financePage.clickOnPaymentLink()
    });
    it('Validate add payment button', () => {
        financePage.verifyPaymentButton()
    });

    it('Click on Add Payment button', () => {
        financePage.clickOnAddPaymentButton()
    });

    it('Click on Credit Card option  ', () => {
        financePage.clickOnCreditCardOrDebitCardOption()
    });

    it('Click on User New Credit/Debit Card link', () => {
        financePage.clickOnUseNewCreditCardOrDebitCard()
    });

    // it('Enter Card HolderName', () => {
    //     financePage.enterCardHolder("Test_Name")
    // });

    // it('Enter Address ', () => {
    //     financePage.enterAddress1("Test_Address1")
    // });

    // it('Enter Address 2', () => {
    //     financePage.enterAddress2("Test_Address2")
    // });

    // it('Enter City', () => {
    //     financePage.enterCity("NYC")
    // });

    it('Select State', () => {
        financePage.selectState(state)
    });

    // it('Enter ZIP Code', () => {
    //     financePage.enterZip("10000")
    // });

    // it('Check Save the card for future payment check box', () => {
    //     financePage.clickOnSaveCardForFuturePaymentCheckBox()
    // });

    // it('Enter Amount ', () => {
    //     financePage.enterAmmount("1000")
    // });

    // it('Enter Card Number', () => {
    //     financePage.enterACardNumber()
    // });

    // it('Select expiry Month and year', () => {
    //     //not yet available in the application
    // });

    // it('Enter CVV', () => {
    //     //not yet available in the application
    // });

    // it('Click on Process Payment button', () => {
    //     financePage.clickOnPaymentButton()
    // });

})
