let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    documentsPage = requirePage('JobDetails_DocumentsPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    // attachmentTableColumns=['file type/name','uploaded','by','attach to'],
    attachmentTableColumns = ['file type/name', 'attach to'],                     // As per the application changes
    attachToInputList1 = ['customerQuote', 'customeracknowledgement', 'purchaseorder'],
    attachToInputList2 = ['invoice', 'packingSlip', 'misc document'],
    prevtitle = null,
    latestTitle = null,
    productImagePath= testDataObjectsPath+'ipromoteU.png';


describe('JobDetails Attachment', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        browser.ignoreSynchronization = true;
        global.current_TestCase = "TC002-JobDetails-Documents_Attachment";
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
    it('Validate Documents table to be Active', () => {
        documentsPage.verifyDocumentLinkActive()
    });
    it('Click on Attachments tab', () => {
        documentsPage.clickOnAttachmentLink()
    });
    it('Validate attachments table', () => {
        attachmentTableColumns.forEach(col => {
            documentsPage.verifyAttachementTableColumn(col)
        });
    });
    it('Click on Add Attachment button', () => {
        documentsPage.clickOnAddAttachment()
    });
    it('Enter Name', () => {
        documentsPage.enterAttachmentName()
    });
    it('Click on Upload File', () => {
        documentsPage.uploadFile(productImagePath)
    });
    it('Select attach to options', () => {
        attachToInputList1.forEach(option => {
            documentsPage.selectAttachToOption(option)
        })
    });
    it('Click on Add Attachment button', () => {
        documentsPage.confirmAddAttachment()
    });

    // it('Gets the Title', function () {
    //     documentsPage.getTitleFromTable(1)
    // });  //We can't edit attachment

    // it('Click on ellipse at the end of any row ', () => {
    //     documentsPage.clickOnAttachmentToggleMenu()
    // });
    // it('Click on edit button, Update the value ', () => {
    //     documentsPage.editAttachmentTitle()
    // });
    // it('click On Edit Attachment ', function () {
    //     documentsPage.clickOnEditAttachment()
    // });
    // it('Gets the Title', () => {
    //     documentsPage.getTitleFromTable(2)
    // });
    // it('verifies updated values', () => {
    //     documentsPage.compareNotToeqaul(1, 2)
    // });
    it('Click on Delete option and Validate by not deleting', () => {
        documentsPage.clickOnAttachmentAndNoDelete()
    })
    it('Click on Delete option and Validate by deleting', () => {
        documentsPage.clickOnAttachmentAndDelete()
    });
})