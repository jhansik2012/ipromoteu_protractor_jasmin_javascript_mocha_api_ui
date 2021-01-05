// let ipromoteU_login = requirePage('LoginPage'),
//     presentaionPage = requirePage('PresentationPage'),
//     createNewJobPage = requirePage('CreateNewJob');

// var testName = 'TC001',
//     operatorName = csvProcessor.filterData(testName, 'OperatorName'),
//     password = csvProcessor.filterData(testName, 'Password'),
//     url = csvProcessor.filterData(testName, 'Url')

// describe('Presentation Screeen Validation', function () {
//     appLogger.Log("************************ Execution Started ***************************");
//     appLogger.Log("************************ " + __filename + "***************************");
//     beforeEach(function () {

//         global.current_TestCase = "TC007-Presentation_PresentationDetailedQuotePreviewAcceptQuote";
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
//     it('Click on any Presentation from the list', () => {
//         presentaionPage.clickOnFirstJob();
//     });
//     it('Verify Product showcase page is displayed', function () {
//         presentaionPage.verifyProductShowcaseHeader();
//     });
//     it('Click on Preview button',function(){
//         presentaionPage.clickOnPreviewPresentation()
//     })
//     it('Validate Products displayed ',function(){
//         presentaionPage.validateProductDisplay()
//     })
//     it('Validate Total Amount',function(){
//         presentaionPage.validateTotalAmount()
//     })
//     // only for presentation which is quoted
    
//     it('Validate Terms and Conditions',function(){
//         presentaionPage.validateTermsAndConditions()
//     }) //Feature not present
//     it('Validate pesentation Name is displayed',function(){
//         presentaionPage.validatePresentatonName()
//     })
//     it('Enter Comments',function(){
//         presentaionPage.enterPresentationComments("Automation_Test_Comment")
//     })
//     it('Validate Contact Name and accept check box',function(){
//        presentaionPage.clickOnAcceptCheckBox()
//     }) 
//     it('Click on Accept Quote button',function(){
//        presentaionPage.clickOnAcceptQuoteButton()
//     }) 
        
    
    
// })