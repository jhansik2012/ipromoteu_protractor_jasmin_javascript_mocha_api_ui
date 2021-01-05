let ipromoteU_login = requirePage('LoginPage'),
    presentaionPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob'),
    jobsHomePage=requirePage('JobsHomePage');

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url')

describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC004-Presentation_PresentationProductShowcasePreviewCommentsSection";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on presentation link', () => {
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
    it('Verify Product showcase page is displayed', function () {
        presentaionPage.verifyProductShowcaseHeader();
    });
    it('Click on Preview button',function(){
        presentaionPage.clickOnPreviewPresentation()
    })
    it('Validate Products displayed ',function(){
        presentaionPage.validateProductDisplay()
    })
    it('Validate Comments section',function(){
        presentaionPage.validateCommentsSection()
    })
    it('Enter Comments',function(){
       presentaionPage.enterComments("Automation_Test_Comment")
    })
    it('Enter Name',function(){
       presentaionPage.enterCommentName("Automation_Test_Comment_Name")
    })
    it('Click on Add Comments button',function(){
      presentaionPage.clickOnAddCommentButton()
    })
        
    
    
})