let ipromoteU_login = requirePage('LoginPage'),
    presentaionPage = requirePage('PresentationPage'),
    addProductPage = requirePage('addProduct'),
    createNewJobPage = requirePage('CreateNewJob')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    alertMsg = "Any changes made will be lost. Do you wish to continue?"
    
describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC009-PresentationDetails_validateQuoteProductConvertToJob";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Verify Presentaion link and click on presentation link', () => {
        presentaionPage.clickOnPresentationLink();
    });
    it('Click on type filter', () => {
        presentaionPage.clickOntypeFilter();
    });
    it('Select Quote type', () => {
        presentaionPage.selecQuoteType();
    });
    it('Click on any Presentation from the list', () => {
        presentaionPage.clickOnFirstJob();
    });
    it('Click on Convert To Job Button', () => {
        presentaionPage.clickOnConvertToJobHomeButton();
    });
    it("In Subway Customer & Job Details", function () {
        reporter.appendTest('<b>1. Customer & Job Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Customer & Job Details");
    }); 
    it('click on X button', function () {
        presentaionPage.clickOnXButton()
    });

    it("Verify Alert pop up is displayed with text saying 'Any changes made will be lost.Do you wish to continue?' ", function () {
        presentaionPage.verifyAlertPopup()
        presentaionPage.verifyAlertPopupMessage(alertMsg)
        presentaionPage.verifyYesButtonInPopup()
        presentaionPage.verifyNoButtonInPopup()
    });
    it('click on No button', function () {
        presentaionPage.clickOnNoButtonInPopup()
    });
    it("In Subway Customer & Job Details", function () {
        reporter.appendTest('<b>1. Customer & Job Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Customer & Job Details");
    }); 
    it('click on X button', function () {
        presentaionPage.clickOnXButton()
    });
    it('click on Yes button', function () {
        presentaionPage.clickOnYesButtonInPopup()
    });
    it('Verify Prentation Header', () => {
        reporter.appendTest('<b>Verifying<b>', 'Weather the user is able to navigate to Detailed Quote page or not' , "PASS");
        presentaionPage.verifyPrentationQuoteHeader();
    });

})