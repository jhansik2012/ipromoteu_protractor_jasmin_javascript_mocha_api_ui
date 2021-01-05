let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    createNewJobPage=requirePage('CreateNewJob')


var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
   contactName= csvProcessor.filterData(testName, 'ContactName'),
  zipCode = csvProcessor.filterData(testName, 'ZipCode'),
  address1 = csvProcessor.filterData(testName, 'Address1'),
  address2 = csvProcessor.filterData(testName, 'Address2'),
  city = csvProcessor.filterData(testName, 'City'),
  state = csvProcessor.filterData(testName, 'State')


describe('EditJob-TC05', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-EditJobAlternativeAddress_UpdateAlternateAddress";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on any one job for edit ', function () {
        jobsHomePage.clickOnFirstJob();
    });
    it('Click on edit job details option', function () {
        jobsHomePage.clickOnEditDetailsOption();
    });
    it('Verify existing Alternate Shipping Address', function () {
    reporter.appendTest('<b>Adding Alternative shipping address</b>', '*************************', ""); 
        createNewJobPage.verifyIsAlternativeAddress()
    });
    it('Click on Add Alternate Shipping Address', function () {
        jobsHomePage.clickOnAddAlternateShippingAddress();
    });
    it('Enter address details ', function () {
        jobsHomePage.enterAlternativeAddressDetails(contactName,address1,address2,city,state,zipCode);
    });
    it('Click on submit button', function () {
        jobsHomePage.clickOnSubmitButton();
    });
    it('Validate updated shipping address', function () {
        createNewJobPage.verifyAlternateShippingAdsressCard(contactName,address1,address2,city,state,zipCode);
    });
    it('Click on update button', function () {
        jobsHomePage.clickOnUpdateButton();
    });
    it('Validate updated shipping address', function () {
        createNewJobPage.verifyAlternateShippingAdsressDetails(contactName,address1,address2,city,state,zipCode);
    });

});

