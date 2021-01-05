let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    financePage = requirePage('JobDetails_Finance')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    financeReviewTable = ['Description', 'Size', 'Qty', 'Price', 'Cost', 'Margin', 'Mrg%']

describe('Validate Finance Review', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-JobDetails-Finance_ValidateFinanceReview";
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
    it('Store Line Items', () => {
        financePage.storeLineItemFromLineItemPage()
    });
    it('Validate Finance tab', () => {
        financePage.clickOnFinanceLink()
    });
    it('Validate Finance table to be Active', () => {
        financePage.verifyActiveFinanceLink()
    });
    it('Verifies Finance Review Link, Sales Tax Link, Payments Link', () => {
        financePage.verifyFinancePageElements()
    });
    it('Validate Financial Review table', () => {
        financeReviewTable.forEach(colName => {
            financePage.validateFinancialTable(colName)
        })
    });
    it('Store Line Items', () => {
        financePage.storeLineItemFromfinancePage()
    });
    it('Verify Line Items in Finance Page', () => {
        //  financePage.validateLineItems()
    });
    it('Click on down/Up arrow next to description coumn header', () => {
        financePage.clickOnSort()
    });
    // it('Verify Sort', () => {
    //     financePage.()
    // });
    it('Click on Description of line Item', () => {
        financePage.clickOnDescLineItem()
    });
    it('Line Item details page is opened in new window', () => {
        financePage.verifyLineItemDetailsPage()
    });
})