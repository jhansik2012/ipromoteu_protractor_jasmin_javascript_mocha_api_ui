let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url');


describe('Validate JobDetails Shipping Dates and Milestone section',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        
        global.current_TestCase = "TC002-JobDetail-ShippingDatesandMilestones_ValidateJobDetailsShippingDatesandMilestonesection";
      });     

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });

    it('Click on job id', function () {
        jobsHomePage.clickOnJobIdByUsingRowNumber(2);
     reporter.appendTest('Milestone section validation is on <b>Hold</b>', 'Functionality is under development', "");
   });

    //validation is pending since functionality is under development

    // it('verify Viewing Date Is Displayed', function () {
    //     jobsHomePage.verifyViewingDateIsDisplayed();
    // });
    // it('verify Shipping Date Is Displayed', function () {
    //     jobsHomePage.verifyShippingDateIsDisplayed();
    // });
    // it('verify Mile Stone Date Is Displayed', function () {
    //     jobsHomePage.verifyMileStoneDateIsDisplayed();
    // });
    // it('Validate PO are displayed for that particular job', function () {
    //     jobsHomePage.clickOnViewingDateDownArrow();
    //  //   jobsHomePage.verifyPosDisplayedwithPerticularJobid();
    // });

    // it('Validate PO number is displayed next to Viewing Date after select', function(){
    //      jobsHomePage.clickOnPOsjobidDropDownValueAndVerify();
    // });

});