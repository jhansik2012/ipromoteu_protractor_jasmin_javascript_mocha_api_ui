// const { ActionSequence } = require("protractor");
// const actionLibrary = require("../../../../library/actionLibrary");

// let ipromoteU_login = requirePage('LoginPage'),
//     presentaionPage = requirePage('PresentationPage'),
//     createNewJobPage = requirePage('CreateNewJob');

// var testName = 'TC001',
//     operatorName = csvProcessor.filterData(testName, 'OperatorName'),
//     password = csvProcessor.filterData(testName, 'Password'),
//     url = csvProcessor.filterData(testName, 'Url'),
//     product = "ASI Products",

//     customerDetailsObjects = ["Search Existing Customers", "Add New Customer", "Next"],
//     presentaionDetailsPageObjects = ['Presentation Details', 'Presentation Name', 'Customer Needs By',
//         'Expiration Date', 'Presentation Intro', 'Terms & Conditions', 'Previous', 'Next']



// describe('Presentation Screeen Validation', function () {
//     appLogger.Log("************************ Execution Started ***************************");
//     appLogger.Log("************************ " + __filename + "***************************");
//     beforeEach(function () {

//         global.current_TestCase = "TC003-Presentation_AddProductsFromASIToPresentation.js";
//     });

//     it('Navigate iPROMOTEu url', function () {
//         ipromoteU_login.navigateToUrl(url);
//     });
//     it('Login with valid credentials and validate Jobs page', function () {
//         ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
//     });
//     it('Verify Presentaion link and click on presentation link', () => {
//         presentaionPage.clickOnPresentationLink();
//     });
//     it('Verify Prentation Header', () => {
//         presentaionPage.verifyPrentationHeader();
//     });
//     it('Verify Create Presentation Button', () => {
//         presentaionPage.verifyCreatePresentationButton();
//     });
//     it('Click on Create Presentation Button', () => {
//         presentaionPage.clickCreatePresentationButton();
//     });
//     it('Validate subway map ', function () {
//         reporter.appendTest('<b>1. Customer Details</b>', '*************', "");
//         createNewJobPage.ValidateSubwayMap("1. Customer Details");
//     });
//     it('Validate the customer details page displayed', function () {
//         customerDetailsObjects.forEach((obj) => {
//             presentaionPage.verifyObjectDisplayed(obj);
//         })
//         presentaionPage.verifyCustomerCodeOrNameSearchBox();
//         presentaionPage.verifySearchExistingCustomersRadioButtonIsChecked();
//     });
//     it('Enter any existing Company Name or Code', function () {
//         presentaionPage.enterCustomerCodeOrNameInSearchBox("VWDEMOSTOR-5827");
//     });   
//     it("Validate the Selected Customer's shipping Customer Address and Shipping contacts list is displayed with dropdown", function () {
//         presentaionPage.verifyCustomersShippingCustomersAddress();
//         presentaionPage.verifyTextBoxDisplayed('ORDERING CONTACT');
//     });
//     it('Click on Next buton', function () {
//         presentaionPage.clickOnNextButton()
//         Medium_Wait()
//     });
//     it("In Subway, Presentation Details node is active", function () {
//         reporter.appendTest('<b>2. Presentation Details</b>', '*************', "");
//         createNewJobPage.ValidateSubwayMap("2. Presentation Details");
//     });
//     it('Validate the Template Style section is displayed', function () {
//         presentaionPage.verifyObjectDisplayed("Template Style");
//     });
//     it('Validate the Product Showcase is displayed', function () {
//         presentaionPage.verifyObjectDisplayed("Product Showcase");
//         presentaionPage.verifyObjectDisplayed("Simplified product display for your customers to quickly review and easily make choices");
//     });
//     it('Validate the Detailed Quote is displayed', function () {
//         presentaionPage.verifyObjectDisplayed("Detailed Quote");
//         presentaionPage.verifyObjectDisplayed("When you know the specifies of colors, sizes, and pricing. Includes an optional customer approval process");
//     });
//     it('Validate the Template Styles is displayed', function () {
//         presentaionPage.verifyObjectDisplayed("Default Template Styles");
//     });
//     it('click on Template Styles field', function () {
//         presentaionPage.clickOnTempleStyleArrowIcon();
//     });
//     it('Validate the Template Styles dropdown options container is displayed', function () {
//         presentaionPage.verifytemplateStylesDropOptions();
//     });
//     it('Validate the Presentation Details section is displayed', () => {
//         presentaionDetailsPageObjects.forEach((obj) => {
//             presentaionPage.verifyObjectDisplayed(obj);
//         })
//     });
//     it('Enter presentation name', function () {
//         presentaionPage.enterPresentationName(presentaionDetailsPageObjects[1]);
//     });
//     it('Select Presentation Date', function () {
//         presentaionPage.selectPresentationDate(presentaionDetailsPageObjects[2]);
//     });
//     it('Select Expiration Date', function () {
//         presentaionPage.selectExpirationDate(presentaionDetailsPageObjects[3]);
//     });
//     // it('Verify Presentation Intro field allow alphanumaric, special charachers and spaces.', function () {
//     //     presentaionPage.verifyPresentationIntroFieldAllowAlphanumaricAndSpecialChar();
//     // });
//     // it('Verify Terms & Conditions field allow alphanumaric, special charachers and spaces.', function () {
//     //     presentaionPage.verifyTermsAndConditionsFieldAllowAlphanumaricAndSpecialChar();
//     // });
//     it('Click on Previous buton', function () {
//         presentaionPage.clickOnPreviousButton()
//         Medium_Wait()
//     });
//     it('Validate subway map', function () {
//         reporter.appendTest('<b>1. Customer Details</b>', '*************', "");
//         createNewJobPage.ValidateSubwayMap("1. Customer Details");
//     });
//     // it('Validate all the information entered in the screen is displayed.', function () {
//     //     //this functionality is not working
//     // });

//     it('click on X button', function () {
//         presentaionPage.clickOnXButton()
//     });
//     it("Verify Alert pop up is displayed with text saying 'Any changes made will be lost.Do you wish to continue?' ", function () {
//         presentaionPage.verifyAlertPopup()
//         presentaionPage.verifyAlertPopupMessage("Any changes made will be lost.Do you wish to continue?")
//         presentaionPage.verifyYesButtonInPopup()
//         presentaionPage.verifyNoButtonInPopup()
//     });
//     it('click on No button', function () {
//         presentaionPage.clickOnNoButtonInPopup()
//     });
//     it('Validate subway map ', function () {
//         reporter.appendTest('<b>1. Customer Details</b>', '*************', "");
//         createNewJobPage.ValidateSubwayMap("1. Customer Details");
//     });
//     it('click on X button', function () {
//         presentaionPage.clickOnXButton()
//     });
//     it('click on Yes button', function () {
//         presentaionPage.clickOnYesButtonInPopup()
//     });
//     it('Verify Prentation Header', () => {
//         presentaionPage.verifyPrentationHeader();
//     });   
//     it('Click on Create Presentation Button', () => {
//         presentaionPage.clickCreatePresentationButton();
//     });
//     it('Enter any existing Company Name or Code', function () {
//         presentaionPage.enterCustomerCodeOrNameInSearchBox("VWDEMOSTOR-5827");
//     });  
//     it('Click on Next buton', function () {
//         presentaionPage.clickOnNextButton()
//         Medium_Wait()
//     });
//     it('Enter presentation name', function () {
//         presentaionPage.enterPresentationName(presentaionDetailsPageObjects[1]);
//     });
//     it('Click on Next buton', function () {
//         presentaionPage.clickOnNextButton()
//         Medium_Wait()
//     });
//     it("In Subway, Presentation Details node is active", function () {
//         reporter.appendTest('<b>3. Product Source</b>', '*************', "");
//         createNewJobPage.ValidateSubwayMap("3. Product Source");
//     });
//     it('Click on ASI Products button', function () {
//         createNewJobPage.clickOnProduct(product);
//     });
//     it('Select Products', function () {
//         Medium_Wait()
//         createNewJobPage.selectItems();
//     });
//     it('Click on Select button', function () {
//         createNewJobPage.clickOnSelectButton();
//     });
//     it("Verify 'Set Pricing page' is displayed with Min,Max cost of selected product and are editable", function () {
//         createNewJobPage.verifyMinCostField();
//         createNewJobPage.verifyMaxCostField()
//     });
//     it('Enter Min, Max Price values', function () {
//         createNewJobPage.enterMinCost('100.50');
//         createNewJobPage.enterMaxCost('1000');
//     });
//     it('Click on add line item', function () {
//         createNewJobPage.clickOnAddLineItemButton();
//     });
//     // it('Verify Presentation of type Product showcase is created and Presentation details page is displayed', function () {
//     //     presentaionPage.verifyProductShowcaseHeader();
//     // });
 
// })