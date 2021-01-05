let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    customerPage = requirePage('customerPage'),
    createNewJobPage = requirePage('CreateNewJob')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url')

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-NewCustomer-NewCustomerShippingDetails_ValidateNewCustomerShippingDetails";
    });

    it('Navigate iPROMOTEu url', function () {

        ipromoteU_login.navigateToUrl(url);
    });

    it('Should Login with valid credentials and validate Jobs page', function () {

        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });

    it('Should Verify customers button on left side menu', function () {
        jobsHomePage.verifyCustomersInLeftMenu();
    });

    it('Should Click on Customers button on side menu', function () {
        jobsHomePage.clickOnCustomersButton();
    });

    it('Click on Create Customer button', function () {
        customerPage.clickOnCreateCustomerButton()
    })

    it("Validate the hilighted 'Shipping Details' in subway map", function () {
        createNewJobPage.ValidateSubwayMap("1. Shipping Details");
    });

    it('Enter Company Name/Ship To ', function () {
        customerPage.enterCompanyNameShipTo("Sai_Test_Company");
    });

    it('Enter Address', function () {
        customerPage.enterCompanyShippingAddress("Sai_Test_Address");
    });

    it('Enter Address2', function () {
        customerPage.enterAddress2("Sai_Test_Company2");
    });

    it('Enter Address3', function () {
        customerPage.enterAddress3("Sai_Test_Company3");
    });

    it('Enter City', function () {
        customerPage.enterCompanyCity("Central");
    });

    it('Select State', function () {
        customerPage.enterCompanyState();
    });

    it('Enter ZIP', function () {
        customerPage.enterCompanyZip("50084");
    });
 
    it('Enter shipe code', function () {
        customerPage.enterNewCustomerShipCode("5000282");
    });

    it('Select Carrier/Method under Additional details', function () {
        customerPage.enterNewCarrierMethod("FedEx");
    });

    it('Enter Account #', function () {
        customerPage.enterNewCustomerAccount("1524585");
    });

    it('Select Tax Exempt', function () {
        customerPage.enterNewCustomerTaxExempt("Exempt MN");
    });

    it('Enter Tax Exempt #', function () {
        customerPage.enterNewCustomerTaxExemptYash("111");
    });

    it('Select Vertical Market', function () {
        customerPage.enterNewCustomerVerticalMarket("Automotive");
    });

    it('Select Classification', function () {
        customerPage.enterNewCustomerClassification("A");
    });

    it('Select Sales Rep', function () {
        customerPage.enterNewCustomerSalesRep("Jen Regan");
    });

    it('Click on + Add To Master Customer button', function () {
        customerPage.clickNewCustomerAddToMasterCustomer();
    });

    it('Select Master Customer', function () {
        customerPage.enterNewCustomerAddToMasterCustomerInput("VWDEMOSTOR");
    });

    it('Click On Next Button', function () {
        customerPage.clickOnNewCustomerNextButton();
    });

    it("Validate the hilighted 'Shipping Contacts' in subway map", function () {
        createNewJobPage.ValidateSubwayMap("2. Shipping Contacts");
    });
});