const { ActionSequence } = require("protractor");
const actionLibrary = require("../../../../library/actionLibrary");
const { assert } = require("chai");

let ipromoteU_login = requirePage('LoginPage'),
    presentationPage = requirePage('PresentationPage'),
    jobsHomePage = requirePage('JobsHomePage');

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url');

var currentDate = new Date(),
    dd = currentDate.getDate(),
    mm = currentDate.getMonth() + 1,//as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateStamp= mm+''+dd+''+ yyyy,
    timeStamp =  hour + '' + minute,
    dateAndTimeStamp= dateStamp+''+timeStamp,
    presentationName= "Presentation_"+dateAndTimeStamp;
    
describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-EditPresentaionAndCloseWithoutSaving_EditPresentaionAndCloseWithoutSavingAndVerifyPresentation";
    });

    var editedCompanyName = "Novartis Consumer Health Inc - update"

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Verify Presentaion link and click on presentation link', () => {
        presentationPage.clickOnPresentationLink();
    });
    it('Click on any Presentation from the list', () => {
        presentationPage.clickOnFirstJob();
    });
    it('Click on edit presentation details option', function () {
        jobsHomePage.clickOnPresentationDetailsOption();
    });
    it('Update presentation name', function () {
        presentationPage.updateNewPresentationName(presentationName);
    });

    it('click on X button', function () {
        presentationPage.clickOnXButton()
    });

    it("Verify Alert pop up is displayed with text saying 'Any changes made will be lost. Do you wish to continue ?' and   “Yes” “No” Buttons", function () {
        presentationPage.verifyAlertPopup()
        presentationPage.verifyAlertPopupMessage('Any changes made will be lost. Do you wish to continue ?')
        presentationPage.verifyYesButtonInPopup()
        presentationPage.verifyNoButtonInPopup()
    });
    it('click on No button', function () {
        presentationPage.clickOnNoButtonInPopup()
    });
    it('Validate Edit Presentation header', function () {
        presentationPage.verifyEditPrentationHeader();
    });
    it('click on X button', function () {
        presentationPage.clickOnXButton()
    });
    it('Click on Yes button', function () {
        presentationPage.clickOnYesButtonInPopup()
    });

    //re open and validate presentation
    it('Click on edit presentation details option', function () {
        jobsHomePage.clickOnPresentationDetailsOption();
    });
    it('validate Presentation Name Displayed', function () {
        presentationPage.validatePresentationNameDisplayedToNotUpdated(presentationName);
    });
})