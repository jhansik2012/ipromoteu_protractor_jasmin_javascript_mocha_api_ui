const { ActionSequence } = require("protractor");
const actionLibrary = require("../../../../library/actionLibrary");

let ipromoteU_login = requirePage('LoginPage'),
    presentationPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob'),
    jobsHomePage=requirePage('JobsHomePage');


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
    
   presentaionDetailsPageObjects = ['Presentation Name', 'Customer Needs By',
        'Expiration Date', 'Presentation Intro', 'Terms & Conditions']

describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC003-ConvertPresentation-ShowcaseToQuote_ConvertToQuoteFromShowCaseOfNewCustomer";
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

    it('Verify Presentation Header', () => {
        presentationPage.verifyPrentationHeader();
    });

    it('Click on Create Presentation Button', () => {
        presentationPage.clickCreatePresentationButton();
    });

    it('Validate subway map ', function () {
        reporter.appendTest('<b>1. Customer Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Customer Details");
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
    it('Click on Next button', function () {
        presentationPage.clickOnNextButton()
        Medium_Wait()
    });

    it("In Subway, Presentation Details node is active", function () {
        reporter.appendTest('<b>2. Presentation Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("2. Presentation Details");
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
        reporter.appendTest('<b>Selecting "PRoduct Showcase" as a Template Style</b>', '*************', "");
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

    it('Verify Added Products', function () {
        presentationPage.verifyAddedProduct()
    });

    //Convert

    it('Verify Convert To Quote Button', () => {
        presentationPage.verifyConvertToQuoteButton();
    });

    it('Click on Convert To Quote Button', () => {
        presentationPage.clickOnConvertToQuoteButton();
    });

    it("In Subway, Products & Colors", function () {
        reporter.appendTest('<b>1. Products & Colors</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Products & Colors");
    });

    it('Verify Products displayed', () => {
        presentationPage.verifyProductsTable();
    });

    it('Verify Product colors', () => {
        presentationPage.verifyProductColors();
    });

    it('Verify Product sizes', () => {
        presentationPage.verifyProductSizes();
    });

    it('Select Product', () => {
        presentationPage.clickOnProductCheckBox()
    })

    it('Click on Next buton', function () {
        presentationPage.clickOnButton("NEXT")
        Medium_Wait()
    });

    it("In Subway, Quantities & Pricing", function () {
        reporter.appendTest('<b>2. Quantities & Pricing</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("2. Quantities & Pricing");
    });

    it('Add Quantity', () => {
        presentationPage.enterProductQuantity();
    });

    it('Verify Cost and Price autopopulated or not', () => {
        presentationPage.verifyPriceAndCost();
    });

    it('Enter Cost and Price', () => {
        presentationPage.enterCostAndPrice();
    });

    it('click On Previous Button', () => {
        presentationPage.clickOnPrevButton();
    });

    it("In Subway, Products & Colors", function () {
        reporter.appendTest('<b>1. Products & Colors</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Products & Colors");
        reporter.appendTest('<b>Verified<b>', 'Weather the user is able to navigate to the previous page or not', "PASS");
    });

    it('Click on Next buton', function () {
        presentationPage.clickOnButton("NEXT")
        Medium_Wait()
    });

    it('click On Convert Button', () => {
        presentationPage.clickOnConvertButton();
    });

    it('Verify Alert Popup', () => {
        presentationPage.verifyAlertPopup();
    });

    it('Verify Popup Message : "Showcase converted into Quote successfully!"', () => {
        presentationPage.verifyAlertPopupMessage("Showcase converted into Quote successfully!");
    });

    it('Click On Ok Button', () => {
        presentationPage.clickOnOkButton();
    });

    it('Verify Detailed Quote page is displayed', function () {
        reporter.appendTest('<b>Verifying Converted Detailed Quote</b>', '*************', "");
        presentationPage.verifyPrentationQuoteHeader();
    });

    it('Verify Prentation List Header- Detailed Quote', () => {
        Long_Wait()
        presentationPage.verifyShowcaseStatus();
    });
})