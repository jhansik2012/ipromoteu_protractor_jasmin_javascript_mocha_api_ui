const { ActionSequence } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    presentaionPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob'),
    addProductPage = requirePage('addProduct')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    product = csvProcessor.filterData(testName, 'Product'),
    minCost = csvProcessor.filterData(testName, 'MinCost'),
    maxCost = csvProcessor.filterData(testName, 'MaxCost')

describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC003-PresentationDetails_ProductShowcaseDetailedQuoteAddProduct";
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
    it('Verify Prentation Header', () => {
        presentaionPage.verifyPrentationHeader();
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

    it('Click on add product button ', function () {
        addProductPage.clickAddProductButton();
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
        Long_Wait()
        reporter.appendTest('<b>4. Verifying Added Product</b>', '*************', "");
        presentaionPage.VerifyPresentationID(operatorName)
        presentaionPage.verifyAddedProduct()
    });

})