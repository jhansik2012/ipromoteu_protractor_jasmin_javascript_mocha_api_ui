
let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    reminderPage = requirePage('JobDetails_ReminderPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    catFilter = "In-App"


describe('Validate JobDetails Reminders Tab', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-JobDetails-Reminder_ValidateJobDetailsRemindersTab";
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
    it('Validate Reminders tab', () => {
        reminderPage.clickOnReminder()
    });
    it('Verify reminder tab opned', function () {
        reminderPage.verifyReminderTab()
    });
    it('Validate Filter By Category', () => {
        reminderPage.verifyFilterByDropDown()
    });
    it('Validate Display options', () => {
        reminderPage.VerifyDisplayOptions()
    });
    it('Validate Add Reminder button', () => {
        reminderPage.VerifyAddReminderButton()
    });
    it('Validate Reminder table', () => {
        reminderPage.verifyAddReminderPage()
    });
    it('Click on Up/Down arrow in Date&time column Header', () => {
        reminderPage.enterReminderDate(0)
    });
    it('Close remider popup', function () {
        reminderPage.closeReminderPopup()
    });

    it('Select any Value from Category dropdown', () => {
        reminderPage.SelectCatFilter(catFilter)
    });
    it('Verify reminders are displayed based on selected value, Validate method column values with filter keyword', function () {
        reminderPage.VerifyResultAfterCatFilter(catFilter)
    });

});

