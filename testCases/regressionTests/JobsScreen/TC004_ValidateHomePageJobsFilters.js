var ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage')

var testName = 'TC001',
    operatorName = csvProcessor2.filterData(testName, 'OperatorName'),
    password = csvProcessor2.filterData(testName, 'Password'),
    url = csvProcessor2.filterData(testName, 'Url'),
    vendorName = csvProcessor2.filterData(testName, 'VendorName'),
    customerName = csvProcessor2.filterData(testName, 'CustomerName');

describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC004-JobsScreen-HomePageJobsFilters_ValidateHomePageJobsFilters";
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

    it('Verify expected results are displayed in the body', function () {
        jobsHomePage.verifyStatusSearchResults("ORDER IN PROCESS");
    });

    it('Select Order Dates', function () {
        reporter.appendTest('<b>Validate Order date dropdown</b>', '*************', "");
        jobsHomePage.selectOrderDates("Last 30 Days  ");
    });

    it('Select Req Ship Date', function () {
        reporter.appendTest('<b>Validate Requested Ship date dropdown</b>', '*************', "");
        jobsHomePage.selectReqShipDate("Last 30 Days  ");
    });

    it('Verify expected results are displayed in the body', function () {
        jobsHomePage.verifyOrderDatesInTableResults(30);
    });

    it('Verify expected results are displayed in the body', function () {
        jobsHomePage.verifyDisplayedTableResultsReqShipColumn(30);
    });

});

