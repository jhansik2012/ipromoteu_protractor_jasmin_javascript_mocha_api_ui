let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor2.filterData(testName, 'OperatorName'),
password = csvProcessor2.filterData(testName, 'Password'),
url  = csvProcessor2.filterData(testName, 'Url');

describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () { 
        global.current_TestCase = "TC008-JobsScreen-Downloads_ValidateHomePageDownloads";
      });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Click on Cloud Download image and PDF File, CSV File options are displayed', function () { 
        reporter.appendTest('<b>Verifying Download options- PDF & CSV/b>', '*************', "");         
        jobsHomePage.verifyclouddownloaddisplayed();           
    }); 
    it('should click on pdf download', function() {     
          jobsHomePage.clickOnPDFdownload()
    });  

    it('Verify downloaded PDF file presence', function() {
         // jobsHomePage.verifyPdfDownload()
         reporter.appendTest('<b>PDF file validation in Downlods Folder</b>', '<b>Downloaded PDF file validation is on Hold because the downloading time is not as expected.</b>', "");         
    });
 
    it('should click in CSV download', function() {     
        jobsHomePage.clickOnCSVdownload()  
    });

    it('Verify downloaded CSV file presence', function() {
         // jobsHomePage.verifyCSVDownload()
         reporter.appendTest('<b>CSV file validation in Downlods Folder</b>', '<b>Downloaded CSV file validation is on Hold because the downloading time is not as expected.</b>', "");         
    });

});

