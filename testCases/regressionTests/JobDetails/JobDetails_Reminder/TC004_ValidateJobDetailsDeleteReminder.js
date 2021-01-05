
let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
reminderPage=requirePage('JobDetails_ReminderPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url');


describe('Validate Job Details Delete Reminder',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC004-JobDetails-Reminder_ValidateJobDetailsDeleteReminder";
      });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });    
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Validate Financial snapshot section', function () {
        jobsHomePage.clickOnJobIdByUsingRowNumber(1);
    });
    it('should Validate Reminders tab', () => {
        reminderPage.clickOnReminder()
    });
    it('should Click on ellipse at the end of every row, click Delete option', () => {
        reminderPage.ClickOnElipseDelete()
    });
    it('should verify update', () => {
        reminderPage.VerifyRowCount()
    });

})
