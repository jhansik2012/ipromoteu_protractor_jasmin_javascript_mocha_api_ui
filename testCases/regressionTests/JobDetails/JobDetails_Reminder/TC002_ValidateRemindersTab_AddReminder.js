
let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    reminderPage = requirePage('JobDetails_ReminderPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    title = "Title-Present",
    desc = "Desc-Present",
    titleUpcoming = "Title-Upcoming",
    descUpcoming = "Desc-Upcoming",
    titlePast = "Title-Past",
    descPast = "Desc-Past"

describe('Validate JobDetails Reminders Tab', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-JobDetails-Reminder_ValidateRemindersTab-AddReminder";
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
    it('get the row count fro validation', function () {
        reminderPage.getRowCount();
    });
    //--------------------------Present Date Reminder---------------------------------------//
    it('Click on Add Reminder button', () => {
        reminderPage.ClickOnAddReminder()
    });
    it('Enter Reminder Name', () => {
        reminderPage.enterReminderTitle(title)
    });
    it('Enter Remind Me On', () => {
        reminderPage.enterReminderDate(0)
    });
    it('Enter At value', () => {
        reminderPage.enterReminderTime(1100)  //11:00
    });
    it('Enter Comments', () => {
        reminderPage.enterReminderDesc(desc)
    });
    it('Select Remind Method', () => {
        reminderPage.verifyAndSelectRemindMemethod()
    });
    it('Click on Add Reminder ', () => {
        reminderPage.clickOnAddReminderInPage()
    });
    it('Validate Updated reminder', function () {
        reminderPage.validateUpdate()
    });
    //----------------------Upcoming date Reminder------------------------------------------------//
    it('Click on Add Reminder button', () => {
        reminderPage.ClickOnAddReminder()
    });
    it('Enter Reminder Name', () => {
        reminderPage.enterReminderTitle(titleUpcoming)
    });
    it('Enter Remind Me On', () => {
        reminderPage.enterReminderDate(2)
    });
    it('Enter At value', () => {
        reminderPage.enterReminderTime(1100)  //11:00
    });
    it('Enter Comments', () => {
        reminderPage.enterReminderDesc(descUpcoming)
    });
    it('Select Remind Method', () => {
        reminderPage.verifyAndSelectRemindMemethod()
    });
    it('Click on Add Reminder ', () => {
        reminderPage.clickOnAddReminderInPage()
    });
    it('Validate Updated reminder', function () {
        reminderPage.validateUpdate()
    });
    //----------------------Past Date Reminder----------------------------------------------------//
    it('Click on Add Reminder button', () => {
        reminderPage.ClickOnAddReminder()
    });
    it('Enter Reminder Name', () => {
        reminderPage.enterReminderTitle(titlePast)
    });
    it('Enter Remind Me On', () => {
        reminderPage.enterReminderDate(-2)
    });
    it('Enter At value', () => {
        reminderPage.enterReminderTime(1100)  //11:00
    });
    it('Enter Comments', () => {
        reminderPage.enterReminderDesc(descPast)
    });
    it('Select Remind Method', () => {
        reminderPage.verifyAndSelectRemindMemethod()
    });
    it('Click on Add Reminder ', () => {
        reminderPage.clickOnAddReminderInPage()
    });
    it('Validate Updated reminder', function () {
        reminderPage.validateUpdate()
    });
    //Filter Validation
    it('Select any Value from Category dropdown', () => {
        reminderPage.SelectCatFilter("In-App")
    });
    it('Verify reminders are displayed based on selected value, Validate method column values with filter keyword', function () {
        reminderPage.VerifyResultAfterCatFilter("In-App")
    });
})