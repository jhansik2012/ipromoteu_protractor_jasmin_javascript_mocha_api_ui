let  ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
today = new Date(),
pdfTimeStamp = today.getMonth() + 1 + '-' + today.getDate() + '-' + today.getFullYear() + '_' + today.getHours() + '.' + today.getMinutes() + '.' + today.getSeconds() + ( today.getHours() < 12 ? ' AM' : ' PM' );
const pdfFileName = pdfTimeStamp,
csvFileName = 'Customer_Shipping_'

describe('Customer Download Validation : ', function () {

    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-customerList-PDFandCSVDownload_PDFandCSVDownloadsValidation";
      });

    it('Navigate iPROMOTEu url', function () {    	
        ipromoteU_login.navigateToUrl(url);
    });

    it('Should Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    }); 

    it('Should Click on Customers button on side menu', function() {
    	 jobsHomePage.clickOnCustomersButton();
    });

    it('should Verify Download Option', function() {
        customerPage.verifyDownloadButton();        
    });

    it('Click on Download button', function() {
        customerPage.clickOnDownloadButton();        
    });

    it('should Verify Download Option', function() {
        customerPage.verifyDownloadOptions();
    });

    // it('Click on PDF file button', function() {
    //     customerPage.clickOnPDFDownloadButton();        
    // });

    it('Verify downloaded PDF file presence', function() {
       // customerPage.verifyDownlodedPdfFileName(pdfFileName);    
       reporter.appendTest('<b>PDF file validation in Downlods Folder</b>', '<b>Downloaded PDF file validation is on Hold because the downloading time is not as expected.</b>', "");         
    });

    // it('Click on Download button', function() {
    //     Short_Wait()
    //     customerPage.clickOnDownloadButton();        
    // });

    // it('Click on CSV file button', function() {
    //     Medium_Wait()
    //     customerPage.clickOnCSVDownloadButton();   
    // });

    it('Verify downloaded CSV file presence', function() {
        reporter.appendTest('<b>CSV file validation in Downlods Folder</b>', '<b>Downloaded CSV file validation is on Hold because the downloading time is not as expected.</b>', "");         
    });
});
