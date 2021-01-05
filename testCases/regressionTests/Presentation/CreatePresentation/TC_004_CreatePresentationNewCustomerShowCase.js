const { ActionSequence } = require("protractor");
const actionLibrary = require("../../../../library/actionLibrary");

let ipromoteU_login = requirePage('LoginPage'),
    presentationPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob'),
    jobsHomePage = requirePage('JobsHomePage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    product = csvProcessor.filterData(testName, 'Product'),
    masterCode = csvProcessor.filterData(testName, 'MasterCode'),
    email = csvProcessor.filterData(testName, 'Email'),
    contactName= csvProcessor.filterData(testName, 'ContactName'),
    companyName = csvProcessor.filterData(testName, 'CompanyName'),
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

    alertMsg = "Any changes made will be lost. Do you wish to continue?",
    customerDetailsObjects = ["Search Existing Customers", "Add New Customer"],
    presentaionDetailsPageObjects = ['Presentation Name', 'Customer Needs By',
        'Expiration Date', 'Presentation Intro', 'Terms & Conditions']

describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC004-CreatePresentation_CreatePresentationShowCaseWithNewCustomer";
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
    it('Verify Create Presentation Button', () => {
        presentationPage.verifyCreatePresentationButton();
    });
    it('Click on Create Presentation Button', () => {
        presentationPage.clickCreatePresentationButton();
    });
    it('Validate subway map ', function () {
        reporter.appendTest('<b>1. Customer Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Customer Details");
        customerDetailsObjects.forEach((obj) => {
            presentationPage.verifyObjectDisplayed(obj, ' Option');
        })
        presentationPage.verifyObjectDisplayed("Next", " Button");
        presentationPage.verifyCustomerCodeOrNameSearchBox();
        presentationPage.verifySearchExistingCustomersRadioButtonIsChecked();

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
    it('Enter State', function () {
        presentationPage.enterState(state)
    });
    it('Enter Zip code', function () {
        presentationPage.enterZipCreatePage(zipCode);
    });
    it('Enter email', function () {
        presentationPage.enterEmailCreatePage(email);
    });
    it('Click on Next buton', function () {
        presentationPage.clickOnNextButton()
        Medium_Wait()
    });
    it("In Subway, Presentation Details node is active", function () {
        reporter.appendTest('<b>2. Presentation Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("2. Presentation Details");
        presentationPage.verifyObjectDisplayed("Product Showcase", ' Option');
        presentationPage.verifyObjectDisplayed("Detailed Quote", ' Option');
        presentationPage.verifyObjectDisplayed("Default Template Styles", " Dropdown");
    });

    it('click on Template Styles arrow icon', function () {
        presentationPage.clickOnTempleStyleArrowIcon();
    });

    it('Validate the Template Styles dropdown options container is displayed', function () {
        presentationPage.verifytemplateStylesDropOptions();
    });


    it('Validate the Presentation Details section is displayed', () => {
        presentaionDetailsPageObjects.forEach((obj) => {
            presentationPage.verifyObjectDisplayed(obj, ' field');
        })
        presentationPage.verifyObjectDisplayed('Previous', " Button");
        presentationPage.verifyObjectDisplayed('Next', " Button");
    });

    it('Enter presentation Name', function () {
        presentationPage.enterPresentationName(presentaionDetailsPageObjects[0]);
    });

    it('Click on Previous buton', function () {
        presentationPage.clickOnPreviousButton()
        Medium_Wait()
    });

    it('Validate subway map', function () {
        reporter.appendTest('<b>1. Customer Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Customer Details");
    });

    it('click on X button', function () {
        presentationPage.clickOnXButton()
    });

    it("Verify Alert pop up is displayed with text saying 'Any changes made will be lost.Do you wish to continue?' ", function () {
        presentationPage.verifyAlertPopup()
        presentationPage.verifyAlertPopupMessage(alertMsg)
        presentationPage.verifyYesButtonInPopup()
        presentationPage.verifyNoButtonInPopup()
    });
    it('click on No button', function () {
        presentationPage.clickOnNoButtonInPopup()
    });

    it('Validate subway map ', function () {
        reporter.appendTest('<b>1. Customer Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Customer Details");
    });
    it('click on X button', function () {
        presentationPage.clickOnXButton()
    });
    it('click on Yes button', function () {
        presentationPage.clickOnYesButtonInPopup()
    });
    it('Verify Prentation Header', () => {
        presentationPage.verifyPrentationHeader();
    });
    it('Click on Create Presentation Button', () => {
        reporter.appendTest('<b>Verifying<b>', 'Weather the user is able to navigate to "Presentaion list" page or not', "PASS");
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
        presentationPage.enterState(state)
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
        Medium_Wait()
    });

    it('Enter presentation name', function () {
        presentationPage.enterPresentationName(presentaionDetailsPageObjects[0]);
    });
    it('Enter presentation Date', function () {
        presentationPage.selectPresentationDate(presentaionDetailsPageObjects[1]);
    });
    it('Enter Expiration Date', function () {
        presentationPage.selectExpirationDate(presentaionDetailsPageObjects[2]);
    });
    it('Verify Presentation Intro and T & C field allow alphanumeric, special characters and spaces.', function () {
        presentationPage.verifyPresentationIntroFieldAllowAlphanumaricAndSpecialChar();
        presentationPage.verifyTermsAndConditionsFieldAllowAlphanumaricAndSpecialChar();
    });

    it('Click on Next buton', function () {
        reporter.appendTest('<b>Selecting "Product Showcase" as a Template Style</b>', '*************', "");
        presentationPage.clickOnNextButton()
        Medium_Wait()
    });
    it("In Subway, Presentation Details node is active", function () {
        reporter.appendTest('<b>3. Product Source</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("3. Product Source");
    });
    it('Click on ASI Products button', function () {
        createNewJobPage.clickOnProduct(product);
    });

    it('Click on Select button', function () {
        createNewJobPage.clickOnSelectButton();
    });

    it("Verify 'Set Pricing page' is displayed with Min,Max cost of selected product and are editable", function () {
        createNewJobPage.verifyMinCostField();
        createNewJobPage.verifyMaxCostField()
    });

    it('Enter Min, Max Price values', function () {
        createNewJobPage.enterMinCost(minCost);
        createNewJobPage.enterMaxCost(maxCost);
    });

    it('Click on add line item', function () {
        createNewJobPage.clickOnAddLineItemButton();
    });

    it('Verify Product showcase page is displayed', function () {
        reporter.appendTest('<b>4. Verifying Created Presentation</b>', '*************', "");
        presentationPage.verifyProductShowcaseHeader();
    });

    it('Verify Added Product', function () {
        presentationPage.verifyAddedProduct()
    });

    it('Verify Presentation ID', function () {
        presentationPage.VerifyPresentationID(operatorName)
    });

})