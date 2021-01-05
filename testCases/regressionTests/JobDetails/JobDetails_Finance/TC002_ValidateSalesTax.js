let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    financePage = requirePage('JobDetails_Finance')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    taxCode = 'CBN',
    taxCalculationFields = ['Tax Exempt Sales', 'Taxable Sales', 'Sales Tax'],
    salesTable = ['Product', 'Description', 'Qty', 'Price', 'ext', 'Shipping City', 'St', 'Vendor', 'Exempt']

describe('Validate Sales Tax', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-JobDetails-Finance_ValidateSalesTax";
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
        financePage.clickOnSalesTabLink()
    });
    // it('Validate Tax Code if exists', () => {
    //     financePage.VerifyTaxCode()
    // }); //depricated
    // it('Select TaxCode From DropDown', () => {
    //     financePage.selectTaxCodeFromDrop(taxCode)
    // }); //depricated
    // it('Verify Percentage will be displayed based on tax code selected', () => {
    //     financePage.verifyTaxCodeChange()
    // }); //depricated
    it('Enter Any Tax Exempt #', () => {
        financePage.enterTaxExcempt(123)
    });
    it('Validate Tax Calculations', () => {
        taxCalculationFields.forEach(field => {
            financePage.verifyTaxCalulationSection(field)
        })
    });
    it('Validate Methods options', () => {
        financePage.validateMethodsOption()
    });
    it('verify is default Method Option Selected', () => {
        financePage.verifyIsdefaultOptionSelected()
    });
    it('Validate Sales table', () => {
        salesTable.forEach(colName => {
            financePage.validateSalesTable(colName)
        })
    });
    it('Click on Down/Up arrow next to Product column header', () => {
        financePage.clickOnSortProduct()
    });
    // it('Verify Sort', () => {
    //     financePage.()
    // });
})
