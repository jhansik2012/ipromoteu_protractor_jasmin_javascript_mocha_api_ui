let ipromoteU_login = requirePage('LoginPage'),
    presentaionPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob'),
    jobsHomePage = requirePage('JobsHomePage');


var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    email = csvProcessor.filterData(testName, 'Email'),
    companyName = csvProcessor.filterData(testName, 'CompanyName'),
    zipCode = csvProcessor.filterData(testName, 'ZipCode'),
    phoneNo = csvProcessor.filterData(testName, 'PhoneNo'),
    phoneExt = csvProcessor.filterData(testName, 'PhoneExt'),
    address1 = csvProcessor.filterData(testName, 'Address1'),
    address2 = csvProcessor.filterData(testName, 'Address2'),
    city = csvProcessor.filterData(testName, 'City')

describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC003-Presentation_PresentationProductShowcasePreviewCustomerDetails";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on presentation link', () => {
        presentaionPage.clickOnPresentationLink();
    });
    it('Click on type filter', () => {
        presentaionPage.clickOntypeFilter();
    });
    it('Select Showcase type', () => {
        presentaionPage.selectShowcaseType();
    });
    it('Click on any Presentation from the list', () => {
        presentaionPage.clickOnFirstJob();
    });
    it('Verify Product showcase page is displayed', function () {
        presentaionPage.verifyProductShowcaseHeader();
    });
    it('Click on Preview button', function () {
        presentaionPage.clickOnPreviewPresentation()
    })
    /**These objects are not present in application */
    // it('Validate Affiliate details in right panel ', function () {
    //     presentaionPage.validatePresentationPreviewRightPannel()
    // })
    // it('Validate Contact details under customer section', function () {
    //     presentaionPage.validateContactPhoneDetails()
    // })
    it('Click on Exit Presentation Preview button', function () {
        presentaionPage.clickOnExitPresentation()
    })
    it('Click on edit presentation details option', function () {
        jobsHomePage.clickOnPresentationDetailsOption();
    });
    it('Edit presentation name', function () {
        presentaionPage.updatePresentationName('Presentation Names - updated');
    });
    it('Edit Presentation Date', function () {
        presentaionPage.updatePresentationDate('Customer Needs By - updated');
    });
    it('Edit Expiration Date', function () {
        presentaionPage.updateExpirationDate('Expiration Date - updated');
    });
    it('Edit Presentation Intro', function () {
        presentaionPage.updatePresentationIntroField('Presentation Intro - updated');
    });
    it('Edit Presentation Terms and Conditions', function () {
        presentaionPage.updatePresentationTermsAndConditionsField('erms and Conditions - updated');
    });
    // it('Edit Contact Name', function () {
    //     presentaionPage.updateContactName("Jennifer Weber - updated")
    // });
    it('Edit Company Name', function () {
        presentaionPage.updateCompanyName(companyName);
    });
    it('Edit Shipping Address', function () {
        presentaionPage.updateAddress(address1);
    });
    it('Edit Address 2', function () {
        presentaionPage.updateAddress2(address2);
    });
    it('Edit City', function () {
        presentaionPage.entercity(city);
    });
    it('Edit State', function () {
        presentaionPage.enterState();
    });
    it('Edit email', function () {
        presentaionPage.enterEmail(email);
    });
    it('Edit Zip code', function () {
        presentaionPage.enterZip(zipCode);
    });

    it('Edit phone number', function () {
        presentaionPage.enterPhone(phoneNo);
    });
    it('Edit phone ext', function () {
        presentaionPage.enterPhoneExt(phoneExt);
    });
    it('click on UPDATE button', function () {
        presentaionPage.clickOnUpdateButton();
    });
    it('click on OK button', function () {
        presentaionPage.clickOnOkButton();
    });
})