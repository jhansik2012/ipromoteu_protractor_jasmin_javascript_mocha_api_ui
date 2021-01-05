const { ActionSequence } = require("protractor");
const actionLibrary = require("../../../../library/actionLibrary");
const { assert } = require("chai");

let ipromoteU_login = requirePage('LoginPage'),
    presentationPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob');
    jobsHomePage = requirePage('JobsHomePage');

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    product = csvProcessor.filterData(testName, 'Product'),
    masterCode = csvProcessor.filterData(testName, 'MasterCode'),
    email = csvProcessor.filterData(testName, 'Email'),
    companyName = csvProcessor.filterData(testName, 'CompanyName'),
    contactName= csvProcessor.filterData(testName, 'ContactName'),
    minCost = csvProcessor.filterData(testName, 'MinCost'),
    maxCost = csvProcessor.filterData(testName, 'MaxCost'),
    zipCode = csvProcessor.filterData(testName, 'ZipCode'),
    phoneNo = csvProcessor.filterData(testName, 'PhoneNo'),
    phoneExt = csvProcessor.filterData(testName, 'PhoneExt'),
    address1 = csvProcessor.filterData(testName, 'Address1'),
    address2 = csvProcessor.filterData(testName, 'Address2'),
    city = csvProcessor.filterData(testName, 'City'),
    fax = csvProcessor.filterData(testName, 'Fax'),
    state = csvProcessor.filterData(testName, 'State'),
    emptyValue='';

var currentDate = new Date(),
    dd = currentDate.getDate()+1,
    mm = currentDate.getMonth() + 1,//as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateStamp= mm+''+dd+''+ yyyy,
    timeStamp =  hour + '' + minute,
    dateAndTimeStamp= dateStamp+''+timeStamp,
    presentationName= "Presentation_"+dateAndTimeStamp


describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC004-EditPresentationScreenMandotoryFields_VerifyNewCustomerEditPresentationScreenMandotoryFields";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Verify Presentaion link and click on presentation link', () => {
        presentationPage.clickOnPresentationLink();
    });
    it('Verify Prentation Header', () => {
        presentationPage.verifyPrentationHeader();
    });
    it('Click on Create Presentation Button', () => {
        presentationPage.clickCreatePresentationButton();
    });
    it('Click on Add New Customer radio button', function () {
        presentationPage.clickOnNewCustomersRadioButton();
    }); 
    it('Enter Company Name', function () {
        presentationPage.enterCompanyName(companyName);
    });
    it('Enter Contact name', function () {
        presentationPage.enterContactName(contactName);
    });
    it('Enter email', function () {
        presentationPage.enterEmailCreatePage(email);
    });
    it('Enter phone number', function () {
        presentationPage.enterPhoneCreatePage(phoneNo);
    });
    it('Enter State', function () {
        presentationPage.enterState(state);
    });
    it('Enter Zip code', function () {
        presentationPage.enterZipCreatePage(zipCode);
    });
    it('Click on Next buton', function () {
        presentationPage.clickOnNextButton()
    });
    it('Enter presentation Name', function () {
       presentationPage.enterNewPresentationName(presentationName);
    });
    it('Click on Next buton', function () {
        presentationPage.clickOnNextButton()
    });
    it('Click on ASI Products button', function () {
        createNewJobPage.clickOnProduct(product);
    });
    it('Click on Select button', function () {
        createNewJobPage.clickOnSelectButton();
    });
    it('Enter Min, Max Price values', function () {
        createNewJobPage.enterMinCost(minCost);
        createNewJobPage.enterMaxCost(maxCost);
    });
    it('Click on add line item', function () {
        createNewJobPage.clickOnAddLineItemButton();
    });

    //Edit
    it('Click on Edit presentation details option', function () {
        jobsHomePage.clickOnPresentationDetailsOption();
    });

    //validate Mandatory Fields
    it('Update Contact Name ', function () {
        presentationPage.updateContactName(emptyValue);
    })
    it('click on Update button', function () {
        presentationPage.clickOnUpdateButton()
    });
    it('Verify Contact Name Required Text', function () {
        presentationPage.verifyContactNameRequiredText();
    });
    it('Update email', function () {
        presentationPage.updateEmail(emptyValue);
    });
    it('click on Update button', function () {
        presentationPage.clickOnUpdateButton()
    });
    it('Verify Email Required Text', function () {
        presentationPage.verifyEmailRequiredText();
    });
    it('Update phone number', function () {
        presentationPage.updatePhone(emptyValue);
    });
    it('click on Update button', function () {
        presentationPage.clickOnUpdateButton()
    });
    it('Verify Phone Required Text', function () {
        presentationPage.verifyPhoneRequiredText();
    });
 
})