let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    presentaionPage = requirePage('PresentationPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    TypeOptions = ['Quote', 'Showcase'],
    CreatedDateOptions = ['Last 12 Months', 'Last 90 Days', 'Last 60 Days', 'Last 30 Days']


describe('Presentation Screen Filter Section Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC002-Presentation_Presentation Screen Filter Section Validation";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Verify Presentaion link and click on presentation link', () => {
        presentaionPage.clickOnPresentationLink();
    });
    it('Verify Prentation Header', () => {
        presentaionPage.verifyPrentationHeader();
    });

    it('verify Type Filter', () => {
        presentaionPage.verifyTypeFilter();
    });
    it('Click on type filter', () => {
        presentaionPage.clickOntypeFilter();
    });
    it('verify Type Drop-down Options', () => {
        TypeOptions.forEach((option) => {
            presentaionPage.verifyTypeDropOptions(option);
        })
    });
    it('Click on type filter', () => {
        presentaionPage.clickOntypeFilter();
    });
    it('Click on Created date filter', () => {
        presentaionPage.clikOnCreatedDateFilter();
    });
    it('verify Created Date Options', () => {
        CreatedDateOptions.forEach((option) => {
            presentaionPage.verifyCreationDateOptions(option);
        })
    });

    it('Click on type filter', () => {
        presentaionPage.clickOntypeFilter();
    });
    it('verify Type Drop-down feature-\'Showcase\' ', () => {
        presentaionPage.verifyListAfterTypeFilter('Showcase', 'SHOWCASE');
    });
    it('Click on type filter', () => {
        presentaionPage.clickOntypeFilter();
    });
    it('verify Type Drop-down feature-\'Quote\' ', () => {
        presentaionPage.verifyListAfterTypeFilter('Quote', 'QUOTE');
    });

})