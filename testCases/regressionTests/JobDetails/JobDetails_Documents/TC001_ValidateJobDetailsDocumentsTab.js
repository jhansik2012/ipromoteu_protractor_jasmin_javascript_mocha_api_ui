let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    documentsPage = requirePage('JobDetails_DocumentsPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    documentTableColumnList = ['type', 'number', 'name/description', 'total', 'created', 'by', 'sent', 'method'],
    documentTableTabs = ['Documents', 'Vendor Invoices', 'Attachments']

describe('Validate Job Details Documents Tab', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-JobDetails-Documents_ValidateJobDetailsDocumentsTab";
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
    it('Validate Documents table', () => {
        documentTableTabs.forEach(tabName => {
            documentsPage.verifyDocumentTabs(tabName)
        })
    });
    it('Validate Documents table', () => {
        documentTableColumnList.forEach(colname => {
            documentsPage.verifyDocumentTableCoulmns(colname)
        })
    });


    // it('Validates the PO count and documents count',()=>{
    //     documentsPage.validatePOAndRowCount()
    // })

    // it('Verify email doc and view document for each row',function(){
    //     documentsPage.verifyEmailDocumentAndViewDocumentOptions()
    // })   //first action is overlapping next object ,need to look into it.


    it('Get Document count ', () => {
        documentsPage.getRowCount()
    })

    // it('Click on Email Document', () => {
    //     documentsPage.clickOnEmailDocument()
    // });  //depricated
    // it('Click on View Document', () => {
    //     documentsPage.clickOnViewDocument()
    // });  //depricated

})