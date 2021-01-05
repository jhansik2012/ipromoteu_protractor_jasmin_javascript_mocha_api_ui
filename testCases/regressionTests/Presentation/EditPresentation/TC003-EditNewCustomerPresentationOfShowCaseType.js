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

    contactNameUpdated= 'Brad',
    emailUpdated = 'brad@ics.com',
    companyNameUpdated ='ICS Pvt. Ltd',
    zipCodeUpdated = '98927',
    phoneNoUpdated = '434-439-9334',
    phoneExtUpdated = '96',
    address1Updated = 'Church street',
    address2Updated = 'Silver town',
    cityUpdated = 'Massachussets',
    stateUpdated = 'Georgia';

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

        global.current_TestCase = "TC003-EditNewCustomerPresentation_EditNewCustomerPresentationOfShowCaseType";
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
    it('Enter State', function () {
        presentationPage.enterState(state);
    });
    it('Enter Zip code', function () {
        presentationPage.enterZipCreatePage(zipCode);
    });
    it('Enter phone number', function () {
        presentationPage.enterPhoneCreatePage(phoneNo);
    });
    it('Enter phone ext', function () {
        presentationPage.enterPhoneExtCreatePage(phoneExt);
    });
    it('Enter Fax', function () {
        presentationPage.enterFax(fax);
    });
    it('Enter Shipping Address', function () {
        presentationPage.enterAddress(address1);
    });
    it('Enter Address 2', function () {
        presentationPage.enterAddress2(address2);
    });
    it('Enter City', function () {
        jobsHomePage.enterCity(city);
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

    //Validate all field "values".
    it('Validate Company Name', function () {
        presentationPage.verifyCompanyName(companyName);
    });
    it('Validate Contact name', function () {
        presentationPage.verifyContactName(contactName);
    });
    it('Validate email', function () {
        presentationPage.verifyEmail(email);
    });
    it('Validate phone number', function () {
        presentationPage.verifyPhone(phoneNo);
    });
    it('Validate State', function () {
        presentationPage.verifyState(state);
    });
    it('Validate Zip code', function () {
        presentationPage.verifyZip(zipCode);
    });
    it('Validate phone ext', function () {
        presentationPage.verifyPhoneExt(phoneExt);
    });
    it('Validate Address 1', function () {
        presentationPage.verifyAddress(address1);
    });
    it('Validate Address 2', function () {
        presentationPage.verifyAddress2(address2);
    });
    it('Validate City', function () {
        presentationPage.verifyCity(city);
    });

   //Verify "fields" and update.
    it('Verify is Contact Name field', function () {
        presentationPage.verifyContactNameFieldIsModifiable();
    })
    it('Verify Company Name', function () {
        presentationPage.verifyCompanyNameFieldIsModifiable();
    });
    it('Verify Shipping Address', function () {
        presentationPage.verifyAddress1FieldIsModifiable();
    });
    it('Verify Address 2', function () {
        presentationPage.verifyAddress2FieldIsModifiable();
    });
    it('Verify City', function () {
        presentationPage.verifyCityFieldIsModifiable();
    });
    it('Verify email', function () {
        presentationPage.verifyEmailFieldIsModifiable();
    });
    it('Verify Zip code', function () {
        presentationPage.verifyZipFieldIsModifiable();
    });
    it('Verify phone number', function () {
        presentationPage.verifyPhoneFieldIsModifiable();
    });

 //update "Field values"
    it('Update Contact Name ', function () {
        presentationPage.updateContactName(contactNameUpdated);
    })
    it('Update Company Name', function () {
        presentationPage.updateCompanyName(companyNameUpdated);
    });
    it('Update Address 1', function () {
        presentationPage.updateAddress(address1Updated);
    });
    it('Update Address 2', function () {
        presentationPage.updateAddress2(address2Updated);
    });
    it('Update City', function () {
        presentationPage.updatecity(cityUpdated);
    });
    it('Update email', function () {
        presentationPage.updateEmail(emailUpdated);
    });
    it('Update Zip code', function () {
        presentationPage.updateZip(zipCodeUpdated);
    });
    it('Update phone number', function () {
        presentationPage.updatePhone(phoneNoUpdated);
    });
    it('Update State', function () {
        presentationPage.updateState(stateUpdated);
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
    it('Validate Company Name', function () {
        presentationPage.verifyCompanyName(companyNameUpdated);
    });
    it('Validate Contact name', function () {
        presentationPage.verifyContactName(contactNameUpdated);
    });
    it('Validate email', function () {
        presentationPage.verifyEmail(emailUpdated);
    });
    it('Validate phone number', function () {
        presentationPage.verifyPhone(phoneNoUpdated);
    });
    it('Validate State', function () {
        presentationPage.verifyState(stateUpdated);
    });
    it('Validate Zip code', function () {
        presentationPage.verifyZip(zipCodeUpdated);
    });
    it('Validate Address 1', function () {
        presentationPage.verifyAddress(address1Updated);
    });
    it('Validate Address 2', function () {
        presentationPage.verifyAddress2(address2Updated);
    });
    it('Validate City', function () {
        presentationPage.verifyCity(cityUpdated);
    });
})