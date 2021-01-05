const { ActionSequence } = require("protractor");
const actionLibrary = require("../../../../library/actionLibrary");

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
    minCost = csvProcessor.filterData(testName, 'MinCost'),
    maxCost = csvProcessor.filterData(testName, 'MaxCost');

var currentDate = new Date(),
    dd = currentDate.getDate()+1,
    mm = currentDate.getMonth() + 1,//as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateStamp= mm+''+dd+''+ yyyy,
    timeStamp =  hour + '' + minute,
    dateAndTimeStamp= dateStamp+''+timeStamp,
    presentationName= "Presentation_"+dateAndTimeStamp,
    presentationNameUpdated= "New_"+presentationName,
    intro= "Intro_"+dateAndTimeStamp,
    terms= "Terms_"+dateAndTimeStamp;

describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-EditExistingCustomerPresentation_EditExistingCustomerPresentationOfShowCaseTypeAndVerify";
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
    it('Enter any existing Company Name or Code', function () {
        presentationPage.enterCustomerCodeOrNameInSearchBox(masterCode);
    }); 
    it('Get the Customer or Company code value', function () {
        presentationPage.getCustomerFieldValue();
    });
    it('Click on Next buton', function () {
        presentationPage.clickOnNextButton()
    });
    it('Enter presentation Name', function () {
       presentationPage.enterNewPresentationName(presentationName);
    });
    it('Enter customer needs by Date', function () {
        presentationPage.selectCustomerNeedsByDate(dateStamp);
    });
    it('Enter Expiration Date', function () {
        presentationPage.selectExpireDate(dateStamp);
    });
    it('Enter Intro', function () {
       presentationPage.enterIntro(intro)
    });
    it('Enter Terms', function () {
       presentationPage.enterTerms(terms)
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
    it('validate Presentation Name Displayed', function () {
        presentationPage.validatePresentationNameDisplayed(presentationName);
    });
    it('Update presentation name', function () {
        presentationPage.updateNewPresentationName(presentationNameUpdated);
    });
    it('validate Cusomer Needs By Date', function () {
        presentationPage.validateCustomerNeedsByDateDisplayed(dateStamp);
    });
    it('validate Expiration Date', function () {
        presentationPage.validateExpireDateDisplayed(dateStamp);
    });
    it('validate Presentation Intro Displayed', function () {
        presentationPage.validatePresentationIntroDisplayed(intro);
    });
    it('validate Presentation Terms Displayed', function () {
        presentationPage.validatePresentationTermsDisplayed(terms);
    })

    //Verify "Fields"
    it('Verify is Contact Name field disabled', function () {
        presentationPage.verifyContactNameField();
    })
    it('Verify Company Name', function () {
        presentationPage.verifyCompanyNameFieldIsNotModifiable();
    });
    it('Verify Shipping Address', function () {
        presentationPage.verifyAddress1FieldIsNotModifiable();
    });
    it('Verify Address 2', function () {
        presentationPage.verifyAddress2FieldIsNotModifiable();
    });
    it('Verify City', function () {
        presentationPage.verifyCityFieldIsNotModifiable();
    });
    it('Verify email', function () {
        presentationPage.verifyEmailFieldIsNotModifiable();
    });
    it('Verify Zip code', function () {
        presentationPage.verifyZipFieldIsNotModifiable();
    });
    it('Verify phone number', function () {
        presentationPage.verifyPhoneFieldIsNotModifiable();
    });
    
    it('click on UPDATE button', function () {
        presentationPage.clickOnUpdateButton();
    });
    it('click on OK button', function () {
        presentationPage.clickOnOkButton();
    });
    it('Verify Updated Presentation Name', function () {
        presentationPage.verifyUpdatedPresentationName(presentationNameUpdated);
    });  

    //Validate Updated PResentation 
    it('Click on Edit presentation details option', function () {
        jobsHomePage.clickOnPresentationDetailsOption();
    });
    it('validate Presentation Name Displayed', function () {
        presentationPage.validatePresentationNameDisplayed(presentationNameUpdated);
    });

    //Edit Existing Customer
    it('Store Existing Customer Details', function () {
        // presentationPage.storeExistingCustomerDetails(); //to be used after compelting the remaining steps
    });
    it('Verify Edit Existing Customer Link Displayed', function () {
        presentationPage.verifyeditExistingCustomerLink();
    });
    it('Click on Edit Existing Customer Link', function () {
        presentationPage.clickOneditExistingCustomerLink();
    });
   //Waiting for the functional clarification


})