const { ActionSequence } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    presentaionPage = requirePage('PresentationPage'),
    addProductPage = requirePage('addProduct'),
    lineItemsPage = requirePage('LineItemDetailsPage'),
    createNewJobPage = requirePage('CreateNewJob')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url')

colmnList = ['product', 'code', 'vendor', 'price']


describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC001-PresentationDetails_CreatePresentationDetailsShowCase";
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
    // it('Validate the header ', function () {        
    //     presentaionPage.verifyPrentationQuoteHeader();
    // });
    it('Validate the Presentation id', function () {
        jobsHomePage.verifyJobTitle();
    });
    it('Edit Presentation details option is displayed', function () {
        jobsHomePage.clickOnJobDropdown();
    });
    it('Validate Customer need By value', function () {
        presentaionPage.validateCustomerNeedByValue()
    });
    it("Validate Expires On value", function () {
        presentaionPage.validateCustomerExpireOn();
    });
    it('Validate Customer Name', function () {
        jobsHomePage.verifyCompanyTitle()
    });
    it("Validate the Presentation Name", function () {
        presentaionPage.validatePresentationName();
    });
    it('Validate Contact details', function () {
        presentaionPage.validatePresentationDetails();
    });
    it('Validate Company Details', function () {
        presentaionPage.validateCompanyDetails();
    });
    // it('Validate Financial snapshot', function () {
    //     //Validate Financial snapshot is not availabel in manual steps
    // });
    it('Validate add product button ', function () {
        addProductPage.verifyAddProductButton();
    });
    it('Validate Add Title button', function () {
        addProductPage.verifyAddTitleButton();
    });
    it('Verify Convert To Quote Button', () => {
        presentaionPage.verifyConvertToQuoteButton();
    });
    it('Click on Convert To Quote Button', () => {
        presentaionPage.clickOnConvertToQuoteButton();
    });
    it("In Subway, Products & Colors", function () {
        reporter.appendTest('<b>1. Products & Colors</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Products & Colors");
    });
    it('click on X button', function () {
        presentaionPage.clickOnXButton()
    });
    it('click on Yes button', function () {
        presentaionPage.clickOnYesButtonInPopup()
    });
    it('Click on Preview button', function () {
        addProductPage.clickOnPreviewButton();
    });
    it('Click on Exit Presentation Preview button', function () {
        presentaionPage.clickOnExitPresentation()
    })
    it('Validate Style setting dropdown', function () {
        addProductPage.verifyDefaultTemplateDropdown()
    })
    it('Click on Add Title button', function () {
        addProductPage.clickOnAddTitle();
    });
    it('Verify Table Columns', () => {
        colmnList.forEach((col) => {
            addProductPage.verifyTableColumns(col);
        })
    })
    it('Click on Ellipse of any line Item', function () {
        addProductPage.clickOnElipse()
    })
    it('Validate the Edit Product Details,Hide Product,Delete Product,Add Title options are displayed', function () {
        lineItemsPage.verifyEditProductDetailsButton()
        lineItemsPage.verifyHideProductButton()
        lineItemsPage.verifyDeleteProductButton()
        lineItemsPage.verifyAddTitleButton()
    })
})