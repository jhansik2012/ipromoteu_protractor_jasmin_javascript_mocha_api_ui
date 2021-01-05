let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    vendorName = csvProcessor.filterData(testName, 'VendorName')

describe('GlobalSearch', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-GlobalSearch-WithVendorName_ValidateGlobalSearchVendor";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Enter Global Search text', function () {
     reporter.appendTest('Verifying "Global Search" Functionality', 'Using Vendor Name to verify', "");         
        jobsHomePage.globalSearchBox(vendorName);
    });

    it('Click on search icon', function () {
        jobsHomePage.clickOnSearchIcon();
    });
    it('Verify Global search results', function () {
        jobsHomePage.verifyGlobalSearchResults('VENDOR', vendorName, true);
    });

    it('Verify global search results resides in', function () {
        jobsHomePage.verifyGlobalSearchResultsResidesIn('VENDOR', vendorName, true);
    });

});

