var ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor2.filterData(testName, 'OperatorName'),
password = csvProcessor2.filterData(testName, 'Password'),
url  = csvProcessor2.filterData(testName, 'Url'),
statusDrop=['Order In Process','On Hold','Drafted','In Dispute','Price Discrepancy','Invoiced','All Open','New','Drafted','Paid in Full','Pending Vendor Invoice' ],
statusList=['ORDER IN PROCESS','ON HOLD']
describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-JobsScreen-KPI-Validations_ValidateHomePageJOBStatusSection";
      });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Verify Hamburger menu', function () { 
        reporter.appendTest('<b>Verifying JOB KPI Section</b>', '*************', "");          
    });


    it('Verify Jobs In-Progress', function () {  
    reporter.appendTest('<b>Job in Progress</b>', '*************', "");                  
        // jobsHomePage.verifyjobsInProgressCountdisplayed();           
    });

    it('Click on Job in Progress KPI', function () {          
        jobsHomePage.clickOnJobInprogressKPI();           
    });
     
    it('Verify Filter Dropdown', function () {          
        jobsHomePage.verifyTheStatusDropDown(statusDrop[0]);           
    });

    it('Verify Jobs Status in list', function () {          
        jobsHomePage.verifyTheListStatus(statusList[0]);           
    });


    it('Verify Invoices To Approved', function () { 
        reporter.appendTest('<b>Invoices To Approved</b>', '*************', "");                           
        // jobsHomePage.verifyinvoicesToApproveCountdisplayed();           
    });

    it('Click on Job On Hold KPI', function () {          
        jobsHomePage.clickOninvoicesToApproveKPI();           
    });

    it('Verify Filter Dropdown', function () {          
        jobsHomePage.verifyTheStatusDropDown(statusDrop[2]);           
    });


    it('Verify Jobs In Disputed', function () { 
        reporter.appendTest('<b>Jobs In Disputed</b>', '*************', "");                           
        // jobsHomePage.verifyjobsInDisputeCountdisplayed();           
    });

    it('Click on Job On Hold KPI', function () {          
        jobsHomePage.clickOnJobInDisputeKPI();           
    });

    it('Verify Filter Dropdown', function () {          
        jobsHomePage.verifyTheStatusDropDown(statusDrop[3]);           
    });


    it('Verify Price Discrepancy', function () { 
        reporter.appendTest('<b>Price Discrepancy/b>', '*************', "");                           
        // jobsHomePage.verifypriceDiscrepancyCountdisplayed();           
    });

    it('Click on Job On Hold KPI', function () {          
        jobsHomePage.clickOnpriceDiscrepancyKPI();           
    });

    it('Verify Filter Dropdown', function () {          
        jobsHomePage.verifyTheStatusDropDown(statusDrop[4]);           
    });


    it('Verify Unpaid Invoiced', function () { 
        reporter.appendTest('<b>Unpaid Invoicesd</b>', '*************', "");                           
        // jobsHomePage.verifyunpaidInvoicesCountdisplayed();           
    });

    it('Click on Job On Hold KPI', function () {          
        jobsHomePage.clickOnunpaidInvoicesKPI();           
    });

    it('Verify Filter Dropdown', function () {          
        jobsHomePage.verifyTheStatusDropDown(statusDrop[5]);           
    });

    it('Verify Jobs On Hold', function () { 
        reporter.appendTest('<b>Jobs On Hold</b>', '*************', "");                           
        // jobsHomePage.verifyjobsOnHoldCountdisplayed();           
    });

    it('Click on Job On Hold KPI', function () {          
        jobsHomePage.clickOnJobOnHoldKPI();           
    });
     
    it('Verify Filter Dropdown', function () {          
        jobsHomePage.verifyTheStatusDropDown(statusDrop[1]);           
    });

    it('Verify Filter Dropdown', function () {          
        jobsHomePage.verifyTheListStatus(statusList[1]);           
    });
   

    
});

