let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    presentaionPage = requirePage('PresentationPage'),
    addProductPage = requirePage('addProduct'),
    lineItemsPage = requirePage('LineItemDetailsPage'),
    createNewJobPage = requirePage('CreateNewJob')

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

        global.current_TestCase = "TC004-PresentationDetails_ProductShowcaseDetailedQuoteValidateEllipseOptionsOfLineItem";
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
    it('Select Showcase type', () => {
        presentaionPage.selectShowcaseType();
    });
    it('Click on any Presentation from the list', () => {
        presentaionPage.clickOnFirstJob();
    });
    //-------------------------------------------------------
    it('Click on add product button ', function () {
        addProductPage.clickAddProductButton();
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
    //-------------------------------------------------------
    it('Click on Ellipse of any line Item', function () {
        addProductPage.clickOnElipse()
    })
    it('Click on Hide Product', function () {
        lineItemsPage.clickOnHideProductButton()
    })
    it('Validate + icon is displayed', function () {
        lineItemsPage.verifyHideProductPlusIcon()
    })
    it('Click on + icon is displayed', function () {
        lineItemsPage.clickOnHideProductPlusIcon()
    })
    it('Validate Elipse icon is displayed', function () {
        addProductPage.verifyElipseIsDisplayed()
    })
})