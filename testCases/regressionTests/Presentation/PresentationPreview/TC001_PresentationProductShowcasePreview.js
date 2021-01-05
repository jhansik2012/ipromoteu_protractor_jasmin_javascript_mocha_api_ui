let ipromoteU_login = requirePage('LoginPage'),
    presentaionPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob');

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url')

describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-Presentation_PresentationProductShowcasePreview";
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
    it('Click on Send To Customer button', function () {
        presentaionPage.clickOnSendToCustomer()
    })
    it('Validate the Presentation Name', function () {
        presentaionPage.validatePresentationNameInPreviewPage()
    })
    it('Validate Presentation Date', function () {
        presentaionPage.validatePresentationDate()
    })
    it('Validate Shipping Customer Name', function () {
        presentaionPage.validatePresentationShippingCustomer()
    })
    it('Validate Presentation Id ', function () {
        presentaionPage.valiatePresentationId()
    })
    it('Validate Download PDF', function () {
        presentaionPage.valiatePresentationPDFDownload()
    })
    it('Validate Overview', function () {
        presentaionPage.valiatePresentationOverview()
    })
    it('Click on Exit Presentation Preview button', function () {
        presentaionPage.clickOnExitPresentation()
    })
})