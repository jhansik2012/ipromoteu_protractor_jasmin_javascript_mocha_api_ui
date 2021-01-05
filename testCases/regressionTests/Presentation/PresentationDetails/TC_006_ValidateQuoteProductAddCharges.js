const { ActionSequence } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    presentaionPage = requirePage('PresentationPage'),
    addProductPage = requirePage('addProduct')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    min = 100000,
    max = 999999,
    num = Math.floor(Math.random() * max + min),
    desc = 'Charges'
const code = num,
    qty = Math.floor(Math.random() * 11),
    cost = '1001.99',
    price = '1501.99',
    profit = price - cost,
    margin = (profit / price) * 100
    
describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC006-PresentationDetails_validateQuoteProductAddCharge";
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
    //-------------------------------------------------------
    it('Click on add charges button ', function () {
        addProductPage.getProductsCount()
        Short_Wait()
        addProductPage.clickOnAddChargesButton();
    });
    it('Enter code value', function () {
        addProductPage.enterAddChargesCode(code)
    });
    it('Enter description value', function () {
        addProductPage.enterAddChargesDesc(desc)
    });
    it('Enter Quantity value', function () {
        addProductPage.enterAddChargesQty(qty)
    });
    it('Enter Cost value', function () {
        addProductPage.enterAddChargesCost(cost)
    });
    it('Enter Price value', function () {
        addProductPage.enterAddChargesPrice(price)
    });
    it('Validate Margin value', function () {
        addProductPage.verifyAddChargesMargin(margin.toFixed(2))
    });

    it('click on X button', function () {
        presentaionPage.clickOnXButton()
    });
    it("Verify Alert pop up is displayed with text saying 'Any changes made will be lost.Do you wish to continue?' ", function () {
        presentaionPage.verifyAlertPopup()
        presentaionPage.verifyAlertPopupMessage("Any changes made will be lost. Do you wish to continue ?")
        presentaionPage.verifyYesButtonInPopup()
        presentaionPage.verifyNoButtonInPopup()
    });
    it('click on Yes button', function () {
        presentaionPage.clickOnYesButtonInPopup()
    });

    it('Verify Add Charges is not added', function () {
    addProductPage.validateProductsCount()
    });

    //-------------------------------------------------------
     it('Click on add charges button ', function () {
        addProductPage.clickOnAddChargesButton();
    });
    it('Enter code value', function () {
        addProductPage.enterAddChargesCode(code)
    });
    it('Enter description value', function () {
        addProductPage.enterAddChargesDesc(desc)
    });
    it('Enter Quantity value', function () {
        addProductPage.enterAddChargesQty(qty)
    });
    it('Enter Cost value', function () {
        addProductPage.enterAddChargesCost(cost)
    });
    it('Enter Price value', function () {
        addProductPage.enterAddChargesPrice(price)
    });
    it('Validate Margin value', function () {  
        addProductPage.verifyAddChargesMargin(margin.toFixed(2))
    });
    it('Click on add charges button in pupop', function () {
        addProductPage.clickOnPopupAddChargesButton();
    });    
    it('Verify Add Charges Success Message', function () {
        presentaionPage.verifyAddChargesSuccessMsg()
    });
    it('Click On Ok Button', () => {
        presentaionPage.clickOnOkButton();
    });
    it('Verify Added Charges code in products list', function () {
        addProductPage.verifyAddedCodeFromList(code) //Need to change vaerification only to added line item
    });
    // it('“Add Charges” amount at the end of all the products is displayed', function () {
    //     //functionality is not available
    // });
})