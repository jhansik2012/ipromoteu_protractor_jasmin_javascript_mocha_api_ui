const { ActionSequence } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    presentaionPage = requirePage('PresentationPage'),
    addProductPage = requirePage('addProduct')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    product = csvProcessor.filterData(testName, 'Product'),
    num = Math.floor(Math.random() * 101)
const title = 'Title' + num,
    updatedTitle = 'Updated' + title


describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC002-PresentationDetails_ProductShowcaseORDetailedQuoteAddTitle";
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
    it('Click on Add Title button', function () {
        addProductPage.clickOnAddTitle();
    });
    it('Enter title name', function () {
        addProductPage.enterTitleName(title);
    });
    it('Click on right symbol', function () {
        addProductPage.clickOnRightSymbol()
    })
    it('Validate New title name', function () {
        addProductPage.verifyTitleNamePresent(title);
    });
    it('Click on any title', function () {
        addProductPage.clickOnElipse()
    })
    it('Click on edit title', function () {
        addProductPage.clickOnEditTitle()
    })
    it('Enter title name', function () {
        addProductPage.enterTitleName(updatedTitle);
    });
    it('Click on right symbol', function () {
        addProductPage.clickOnRightSymbol()
    })
    it('Validate Edited title name', function () {
        addProductPage.verifyTitleNamePresent(updatedTitle);
    });
    it('Click on any elipse', function () {
        addProductPage.clickOnElipse()
    })
    it('Click on delete title', function () {
        addProductPage.clickOnDeleteTitle()
    })
    it('Click on No', function () {
        addProductPage.clickOnRejectPopup()
    })
    it('Click on any elipse', function () {
        addProductPage.clickOnElipse()
    })
    it('Click on delete title', function () {
        addProductPage.clickOnDeleteTitle()
    })
    it('Click on Yes', function () {
        addProductPage.clickOnAcceptPopup()
    })
    it('Validate Deleted title name is not present', function () {
        addProductPage.verifyTitleNameNotPresent(title);
    });
})