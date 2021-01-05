const { ActionSequence } = require("protractor");
const actionLibrary = require("../../../../library/actionLibrary");

let ipromoteU_login = requirePage('LoginPage'),
    presentationPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob');

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    product = csvProcessor.filterData(testName, 'Product'),
    masterCode = csvProcessor.filterData(testName, 'MasterCode'),
    minCost = csvProcessor.filterData(testName, 'MinCost'),
    maxCost = csvProcessor.filterData(testName, 'MaxCost'),
    
    alertMsg = "Any changes made will be lost. Do you wish to continue?",
    customerDetailsObjects = ["Search Existing Customers", "Add New Customer"],
    presentaionDetailsPageObjects = ['Presentation Name', 'Customer Needs By',
        'Expiration Date', 'Presentation Intro', 'Terms & Conditions']

describe('Presentation Screen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-CreatePresentation_CreatePresentationShowCaseWithExistingCustomerShowCase";
    });

    it('Navigate iPROMOTEu URL', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Verify Presentation link and click on presentation link', () => {
        presentationPage.clickOnPresentationLink();
    });
    it('Verify Presentation Header', () => {
        presentationPage.verifyPrentationHeader();
    });
    it('Verify Create Presentation Button', () => {
        presentationPage.verifyCreatePresentationButton();
    });
    it('Click on Create Presentation Button', () => {
        presentationPage.clickCreatePresentationButton();
        reporter.appendTest('<b>Creating new Presentation</b>', '*************', "");
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

    it('Enter any existing Company Name or Code', function () {
        presentationPage.enterCustomerCodeOrNameInSearchBox(masterCode);
    });

    it('Click on Next button', function () {
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

    it('click on Template Styles field', function () {
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

    it('Enter presentation name', function () {
        presentationPage.enterPresentationName(presentaionDetailsPageObjects[0]);
    });

    it('Click on Previous button', function () {
        presentationPage.clickOnPreviousButton()
        Medium_Wait()
    });

    it('Validate subway map', function () {
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
        createNewJobPage.ValidateSubwayMap("1. Customer Details");
    });

    it('click on X button', function () {
        presentationPage.clickOnXButton()
    });

    it('click on Yes button', function () {
        presentationPage.clickOnYesButtonInPopup()
    });

    it('Verify Presentation Header', () => {
        presentationPage.verifyPrentationHeader();
        reporter.appendTest('<b>Verifying<b>', 'Weather the user is able to navigate to "Presentaion list" page or not', "PASS");
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

    it("Validate the Selected Customer'", function () {
        presentationPage.verifyCustomersShippingCustomersAddress(masterCode);  //keyword used to search customer
    });

    it('Get the Ordering Contact value(', function () {
        presentationPage.printDisplayedOrderingContactValue();
    });

    it('Click on Next button', function () {
        Medium_Wait()
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

    it('Click on Next button', function () {
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

    it("In Subway, Presentation Details node is active", function () {
        reporter.appendTest('<b>4. Select Products</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("4. Select Products");
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

    it('Verify Presentaion ID', function () {
        presentationPage.VerifyPresentationID(operatorName)
    });

    it('Verify Added PRoducts', function () {
        presentationPage.verifyAddedProduct()
    });

})