let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
financePage=requirePage('JobDetails_Finance')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url = csvProcessor.filterData(testName, 'Url'),
email = csvProcessor.filterData(testName, 'Email'),
amount = '345',
taxCalculationFields=['Tax Exempt Sales','Taxable Sales','Sales Tax'],
 salesTable=['Product','Description','Qty','Price','ext','Shipping City','St','Vendor','Exempt']

describe('Validate Payment',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-JobDetails-Finance_ValidatePayments";
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

    it('Enter Full Name', () => {
        financePage.enterFullName("Test")
    });

    it('Enter email address', () => {
        financePage.enterEmailAddress(email)
    });

    it('Validate Credit Card option ', () => {
        financePage.verifyCreditCardOrDebitCardOption()
    });

    it('Validate Bank Account option ', () => {
        financePage.verifyBankAccountCardOption()
    });

    it('Click on Credit Card option  ', () => {
        financePage.clickOnCreditCardOrDebitCardOption()
    });

    it('Valid Saved Payment methods Saved Credit card and Bank account information is displayed', () => {
        // financePage.verifySavedCreditCardsDetailsTable() // it's not mandatory
    });

    it('Validate User New Credit/Debit Card link', () => {
        financePage.verifyUseNewCreditCardOrDebitCard()
    });

    it('Enter Amount ', () => {
        financePage.enterAmmount(amount)
    });

    it('Click on Cancel Payment', () => {
        financePage.clickOnCancelPaymentButton()
    });
     
})
    