// const { ActionSequence } = require("protractor");

// let ipromoteU_login = requirePage('LoginPage'),
//     jobsHomePage = requirePage('JobsHomePage'),
//     presentaionPage = requirePage('PresentationPage'),
//     addProductPage = requirePage('addProduct'),
//     lineItemsPage = requirePage('LineItemDetailsPage'),
//     createNewJobPage = requirePage('CreateNewJob')

// var testName = 'TC001',
//     operatorName = csvProcessor.filterData(testName, 'OperatorName'),
//     password = csvProcessor.filterData(testName, 'Password'),
//     url = csvProcessor.filterData(testName, 'Url')
    
// describe('Presentation Screeen Validation', function () {
//     appLogger.Log("************************ Execution Started ***************************");
//     appLogger.Log("************************ " + __filename + "***************************");
//     beforeEach(function () {

//         global.current_TestCase = "TC008-PresentationDetails_ValidateQuoteProductFinancialSnapShot";
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
//     it('Click on type filter', () => {
//         presentaionPage.clickOntypeFilter();
//     });
//     it('Select Quote type', () => {
//         presentaionPage.selecQuoteType();
//     });
//     it('Click on any Presentation from the list', () => {
//         presentaionPage.clickOnFirstJob();
//     });
//     //-------------------------------------------------------
   
// })