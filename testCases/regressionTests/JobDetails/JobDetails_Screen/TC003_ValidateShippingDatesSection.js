let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    jobsShipmentPage = requirePage('JobDetails_Shipment')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url');
var shippingDetails = { customername: 'iPROMOTEu', address: '321 Commonwealth Road, Wayland, MA, USA, 01778' };
var billingDetails = { customername: 'North Georgia College & State University', address: '82 College Circle / Room 312, Dahlonega, GA, USA, 30597' };


describe('validate Shipping and Billing Customer to Job Details Header', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-JobDetails-ShippingDatesSection_ValidateShippingDatesSection";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });

    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });

    it('Validate Navigate to Job Details Page', function () {
        jobsHomePage.clickOnJobIdByUsingRowNumber(2);
    });

    it('Click on PO list Dropdown', function () {
        jobsShipmentPage.clickOnViewingDatesForDrop();
    });

    it('Verifying PO List and Selected Po', function () {
        jobsShipmentPage.verifyPolistDisplayed();
    });

    it('Message', () => {
        reporter.appendTest('Shipping dates section validation is on <b>Hold</b>', 'Functionality is under development', "");
    })

    // it('Validate Shipping Customer details', function () {
    //     jobsHomePage.verfyshippingorbillingdetails('Shipping Customer', shippingDetails);
    // });

    // it('Validate Billing Customer details', function(){
    //     jobsHomePage.verfyshippingorbillingdetails('Billing Customer', billingDetails);
    // });


});