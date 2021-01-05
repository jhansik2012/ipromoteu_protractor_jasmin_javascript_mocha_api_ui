let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    documentsPage = requirePage('JobDetails_DocumentsPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    attachToLabelList = ['Customer Quote', 'Customer Acknowledgement', 'Purchase Order', 'Packing Slip', 'Misc Document'],
    attachToInputList1 = ['customerQuote', 'customeracknowledgement', 'purchaseorder'],
    attachToInputList2 = ['invoice', 'packingSlip', 'misc document']

describe('Validate Job Details New Attachments', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-JobDetails-Documents_Validate-Job-Details-New-Attachments";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on first job', function () {
        jobsHomePage.clickOnJobIdByUsingRowNumber(1);
    });
    it('Validate Documents tab', () => {
        documentsPage.clickOnDocumentLink()
    });
    it('Click on Attachment Link', () => {
        documentsPage.clickOnAttachmentLink()
    });
    it('Click on Add Attachment button', () => {
        documentsPage.clickOnAddAttachment()
    });
    it('Enter Name', () => {
        documentsPage.enterAttachmentName()
    });
    it('Click on Upload File', () => {
        documentsPage.uploadFile(testDataPath + 'uploadFile')
    });
    it('Validate Attach To options', () => {
        attachToLabelList.forEach(options => {
            documentsPage.verifyAttachToOptions(options)
        })
    });
    it('Select any Attach To option', () => {
        attachToInputList2.forEach(option => {
            documentsPage.selectAttachToOption(option)
        })
    });
    it('Click on Add Attachment button', () => {
        documentsPage.clickOnAddAttachment()
        //valiidation need to be added
    });
})