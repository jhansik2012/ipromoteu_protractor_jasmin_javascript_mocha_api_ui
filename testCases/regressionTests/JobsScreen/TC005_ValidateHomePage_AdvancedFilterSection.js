var ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage')

var testName = 'TC001',
    operatorName = csvProcessor2.filterData(testName, 'OperatorName'),
    password = csvProcessor2.filterData(testName, 'Password'),
    url = csvProcessor2.filterData(testName, 'Url'),
    salesRep = 'A10',
    customers = "All Customer",
    vendors = "All Vendor"

describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC005-JobsScreen-HomePageAdvancedFilter_ValidateHomePageAdvancedFilterSection";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Select Status', function () {
        reporter.appendTest('<b>Validate status</b>', '*************', "");
        jobsHomePage.selectStatus("Order In Process");
    });
    it('Click on Advanced Job Filters', function () {
        jobsHomePage.clickOnAdvancedJobFilters();
    });
    it('Should Select sales rep', function () {
        reporter.appendTest('<b>Validate HomePage Advanced Filters Section</b>', '*************', "");
        jobsHomePage.selectSalesRep(salesRep);
    });

    it('Select Customer', function () {
        jobsHomePage.selectCustomer(customers);
    });

    it('Select Vendor', function () {
        jobsHomePage.selectVendor(vendors);
    });
    it('Verify expected results are displayed in the body', function () {
        jobsHomePage.verifyCustomerSearchResults(salesRep);
    });
    it('Click on reset filters button', function () {
        jobsHomePage.clickOnResetFilters();
        jobsHomePage.verifyFieldsAfterResetfilter()
    });
    it('Verify salesrep, customers, vendors dropdowns reset to default state', function () {
        jobsHomePage.verifyFieldsAfterResetfilter()
    });
    it('Verify keyword search textbox', function () {
        jobsHomePage.verifyKeywordSearchTextBoxDropdownDisplayed();
    });
});

