var ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    customerPage = requirePage('customerPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    // searchKeyword = csvProcessor.filterData(testName, 'searchKeyword'),
    // masterCode = csvProcessor.filterData(testName, 'MasterCode'),
    searchKeyword = 'SHAL',
    masterCode = 'SHAL'

describe('Customer Page Item Validation  : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");

    beforeEach(function () {
        global.current_TestCase = "TC002-customerList-CustomerTab_ValidateCustomerTab";

    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });

    it('Should Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });

    it('Should Click on Customers button on side menu', function () {
        jobsHomePage.clickOnCustomersButton();
    });
    it('should verify Customer types : Shipping, Billing ', function () {
        customerPage.verifyCustomerType();
    });
    it('should Enter Text in Keyword Search', function () {
        customerPage.enterInKeywordSearchField(searchKeyword);
    });
    it('should Click on keyword serch button', function () {
        customerPage.clickOnKeywordSearchMagnifier();
    });
    // it('Verify the listed shipping customers names on search keyword', function () {
    //     customerPage.verifyCustomersNamesList(searchKeyword);
    // });
    it('should Enter Text in Keyword Search', function () {
        customerPage.enterInKeywordSearchField(''); //Empty field for other filter validation
    });
    it('should Click on SalesRepDropdown', function () {
        customerPage.clickOnSalesRepDropdown();
    });
    // it('should verify Option sales Rep', function () {
    //     customerPage.verifySalesRepDropdownOptionsMenu();
    // });
    it('Enter text on Master Search', function () {
        customerPage.enterMasterCodeInMasterSearch(masterCode);
    });
    it('should Click on Master Search Magnifier ', function () {
        customerPage.clickOnMastercustomerSearchMagnifier();
    });
    it('Verify the listed shipping customers Master code on search Master code', function () {
        customerPage.verifyCustomersMasterCodesList(masterCode);
    });
    it('Enter text on Master Search', function () {
        customerPage.enterMasterCodeInMasterSearch('');
    });
    // it('Click on Buttons next to Name Column header', function () {
    //     not available in application
    // });
    // it('Customers list is sorted based on Name', function () {
    //     not available in application
    // });
    it("should verify Table Hearder : NAME", function () {
        customerPage.verifyTableItems('name');
    });
    it("should verify Table Hearder : CODE", function () {
        customerPage.verifyTableItems('code');
    });
    it("should verify Table Hearder : MASTER", function () {
        customerPage.verifyTableItems('master');
    });
    it("should verify Table Hearder : PHONE", function () {
        customerPage.verifyTableItems('phone');
    });
    it("should verify Table Hearder : EMAIL", function () {
        customerPage.verifyTableItems('email');
    });
    it("should verify Table Hearder : ADDRESS", function () {
        customerPage.verifyTableItems('address');
    });
    it("should verify Table Hearder : CITY", function () {
        customerPage.verifyTableItems('city');
    });
    it("should verify Table Hearder : ST", function () {
        customerPage.verifyTableItems('st');
    });
    it("should verify Table Hearder : ZIP", function () {
        customerPage.verifyTableItems('zip');
    });
    it("should verify Table Hearder : REP", function () {
        customerPage.verifyTableItems('rep');
    });
    it('Click on Billing radio button', function () {
        customerPage.clickOnCustomerBillingRadioButton();
    });
    it("should verify Table Hearder : NAME", function () {
        Medium_Wait()
        customerPage.verifyTableItems('name');
    });
    it("should verify Table Hearder : CODE", function () {
        customerPage.verifyTableItems('code');
    });
    it("should verify Table Hearder : CONTACT", function () {
        customerPage.verifyTableItems('contact');
    });
    it("should verify Table Hearder : PHONE", function () {
        customerPage.verifyTableItems('phone');
    });
    it("should verify Table Hearder : EMAIL", function () {
        customerPage.verifyTableItems('email');
    });
    it("should verify Table Hearder : ADDRESS", function () {
        customerPage.verifyTableItems('address');
    });
    it("should verify Table Hearder : CITY", function () {
        customerPage.verifyTableItems('city');
    });
    it("should verify Table Hearder : ST", function () {
        customerPage.verifyTableItems('st');
    });
    it("should verify Table Hearder : ZIP", function () {
        customerPage.verifyTableItems('zip');
    });
    it("should verify Table Hearder : REP", function () {
        customerPage.verifyTableItems('rep');
    });
    it("Mouse Hover on thumbnail of Rep in any customer row", function () {
        customerPage.hoverOnRepAvathar();
    });
    it("Rep full Name is dispayed in tool tip", function () {
        customerPage.verifytoolTipOfRepAvatharOnHover();
    });
    it('Click on Ellipse next to any customer row', function () {
        customerPage.clickOnEllipseIconOfFirstCustomerRow();
    });
    it("View/Edit Customer, View Open Jobs,Add Contact options are displayed", function () {
        customerPage.verifyCustomerMenuItems();
    });
});