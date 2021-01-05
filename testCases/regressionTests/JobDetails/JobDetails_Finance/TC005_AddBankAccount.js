let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
financePage=requirePage('JobDetails_Finance')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
taxCalculationFields=['Tax Exempt Sales','Taxable Sales','Sales Tax'],
 salesTable=['Product','Description','Qty','Price','ext','Shipping City','St','Vendor','Exempt']

describe('Add Credit card',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC005-JobDetails-Finance_AddBankAccount";
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
    it('Click on Bank Account button', () => {
        financePage.clickOnBankAccount()
    });
    it('Click on User New Bank Account link', () => {
        financePage.clickOnuseNewBankAccount()
    });
    it('Enter  Name on Account', () => {
        financePage.enterCardHolder()
    });
    it('Enter Account Number', () => {
        financePage.enterAccountNumber()
    });
    it('Enter Confirm Account Number', () => {
        financePage.enterAccountNumber()
    });
    it('Enter Routing Number', () => {
        financePage.enterRoutingNumber()
    });
    it('Enter Cheque number', () => {
        financePage.enterCheckNumber()
    });
    it('Check Save the account for future payment check box', () => {
        financePage.clickOnSaveCardForFuturePaymentCheckBox()
    });
    it('Enter Amount ', () => {
        financePage.enterAmmount('2')
    });
    it('Click on Pay button ', () => {
        financePage.clickOnPayButton()
    });
     
})
    