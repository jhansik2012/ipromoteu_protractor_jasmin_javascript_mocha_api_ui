let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
contactDetailsPage=requirePage('contactDetailsPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')


describe('Contact List- TC02 ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-ContactsList_ValidateDownloadOnContactsPage";
      });      

    it('Navigate iPROMOTEu url', function () {    	
        ipromoteU_login.navigateToUrl(url);
    });
    it('Should Login with valid credentials and validate Jobs page', function () { 

        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });      
    it('Should Verify customers button on left side menu', function() {
    	jobsHomePage.verifyCustomersInLeftMenu();     	
    });
    it('Should Click on Customers button on side menu', function() {
    	 jobsHomePage.clickOnCustomersButton();
         Medium_Wait()
         customerPage.verifyCustomersPageHeader(); 
    });
    it('should Click on Contacts tab', function() {
        customerPage.clickOnContactsList();
        Medium_Wait()
        customerPage.verifyContactListTableDisplayed()
     }); 

    it('should Click on Download button', function() {
          contactDetailsPage.clickOnContactsDownloadButton()
        }); 

    it('should Click on Download PDF', function() {
          contactDetailsPage.clickOnContactsDownloadButtonPDF()
        });
    it('should Click on Download button', function() {
          contactDetailsPage.clickOnContactsDownloadButton()
        }); 

    it('should Click on Download .CSV', function() {
         contactDetailsPage.clickOnContactsDownloadButtonCSV()
      });

});  