 //Need to get functionality details 

// const { ActionSequence, browser } = require("protractor");

// let ipromoteU_login = requirePage('LoginPage'),
//   jobsHomePage = requirePage('JobsHomePage'),
//   repeatJobPage = requirePage('RepeatJob'),
//   createNewJobPage = requirePage('CreateNewJob'),
//   presentaionPage = requirePage('PresentationPage'),
//   documentsPage = requirePage('JobDetails_DocumentsPage'),
    // commonAddProducts = requirePage('common_addProducts')


// var testName = 'TC001',
//   operatorName = csvProcessor.filterData(testName, 'OperatorName'),
//   password = csvProcessor.filterData(testName, 'Password'),
//   url = csvProcessor.filterData(testName, 'Url'),
//   num = Math.floor(Math.random() * 101),

//   attachToInputList1 = ['customerQuote', 'customeracknowledgement', 'purchaseorder']

// var currentDate = new Date(),
//     dd = currentDate.getDate(),
//     mm = currentDate.getMonth() + 1,//as January is 0
//     yyyy = currentDate.getFullYear(),
//     hour = currentDate.getHours(),
//     minute = currentDate.getMinutes(),
//     dateAndTimeStamp = dd + '' + mm + '' + yyyy + '' + hour + '' + minute,
//     repJobName= "RepeatJob_"+ dateAndTimeStamp;

// describe('Repeat job functionality :  ', function () {

//   appLogger.Log("************************ Execution Started ***************************");
//   appLogger.Log("************************ " + __filename + "***************************");

//   beforeEach(function () {

//     global.current_TestCase = "TC009-RepeatJob_CopyLineItemFileAttachmentsRepeatJob.js";
//   });
//   it('Navigate iPROMOTEu url', function () {
//     ipromoteU_login.navigateToUrl(url);

//     //browser.navigate().refresh(true)
//     // documentsPage.timedRefresh(5)
//   });
//   it('Login with valid credentials and validate Jobs page', function () {
//     ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
//   });
//   it('Click on any one job for edit ', function () {
//     jobsHomePage.clickOnFirstJob();
//     Medium_Wait()
//   });
//   it('Validate Documents tab', () => {
//     documentsPage.clickOnDocumentLink()
//   });
//   it('Click on Attachments tab', () => {
//     documentsPage.clickOnAttachmentLink()
//     Medium_Wait()
//   });
//   it('Click on Add Attachment button', () => {
//     documentsPage.clickOnAddAttachment()
//   });
//   it('Enter Name', () => {
//     documentsPage.enterAttachmentName()
//   });
//   it('Click on Upload File', () => {
//     documentsPage.uploadFile(testDataPath + 'TC1TestData.csv')
//   });
//   it('Select attach to options', () => {
//     attachToInputList1.forEach(option => {
//       documentsPage.selectAttachToOption(option)
//     })
//   });
//   it('Click on Add Attachment button', () => {
//     documentsPage.confirmAddAttachment()
//   });
//   it('Gets the Title', function () {
//     documentsPage.getTitleFromTable(1)
//   });
//   it('Click on repeat Job', function () {
//     jobsHomePage.clickOnLineItemsTab()
//     jobsHomePage.clickOnRepeatJobButton();
//   });
//   it('Enter repeate job name', function () {
//     repeatJobPage.enterJobNameField(repJobName);
//   });
//   it("Click on 'Copy Previous Alternate Shipping Address'  checkbox", function () {
//     repeatJobPage.selectCopyLineItemFileAttachmentsCheckBox();
//   });
//   it('Click on REPEAT JOB buton', function () {
//     presentaionPage.clickOnButton("REPEAT JOB")
//     Medium_Wait()
//   });
//   it('Verify Created repeat job name in job details screen', function () {
//     createNewJobPage.verifyCreatedJobName(repJobName)
//   });
//   it('Validate Documents tab', function () {
//     documentsPage.clickOnDocumentLink()
//   });
//   it('Click on Attachments tab', function () {
//     documentsPage.clickOnAttachmentLink()
//     Medium_Wait()
//   });
//   it('Verify the Attached file Title', function () {
//     documentsPage.VerifyAttachmentFileName(1)
//   });
// })