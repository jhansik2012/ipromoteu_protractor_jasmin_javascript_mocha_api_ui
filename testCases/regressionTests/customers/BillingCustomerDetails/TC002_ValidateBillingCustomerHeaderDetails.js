let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    customerPage = requirePage('customerPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    tableHeaders = ['name', 'code', 'contact', 'phone', 'email', 'address', "city", 'st', 'zip', 'rep'];

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-BillingCustomerDetails_ValidateBillingCustomerHeaderDetails";
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

    it('Click on Billing radio button', function () {
        customerPage.clickOnCustomerBillingRadioButton();
    });

    it('Verify customer table headers are displayed', function () {
        Medium_Wait()
        tableHeaders.forEach(function (text) {
            customerPage.verifyCustomerTableHeadersDisplayed(text);
        })

    });

  //  Validate Customer Open Orders amount      -  as it is data validation we are not automated - jhansi
  //  Validate Customer Receivables             -  as it is data validation we are not automated - jhansi
  //  Validate Customer Order Volume            -  as it is data validation we are not automated - jhansi    
});