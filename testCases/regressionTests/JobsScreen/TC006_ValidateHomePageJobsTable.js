var ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor2.filterData(testName, 'OperatorName'),
password = csvProcessor2.filterData(testName, 'Password'),
url  = csvProcessor2.filterData(testName, 'Url'),
JobListTable=["job", "Sample / Rush","rep", "customer", "STATUS","REQ SHIP","IN HAND","TRACKING"],
TrackingTable=["PO", "created", "VENDOR", "PO STATUS","SHIPPED","METHOD","TRACKING"]

describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () { 
        global.current_TestCase = "TC006-JobsScreen-JobsTable_ValidateHomePageJobsTables";
      });
      
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });

    it('Verify Job list table columns ', function () {  
     reporter.appendTest('<b>Verify Job List Table columns</b>', '*************', "");         
     JobListTable.forEach(column=>{
        jobsHomePage.verifyJobsTableHeaders(column); 
      })          
    });
    
    it('Click on down arrow next to the tracking column', function () {          
        jobsHomePage.clickOnDownArrowNextTotheTrackingColumn();           
    });

     it('Verify tracking table columns ', function () {  
      reporter.appendTest('<b>Verify Tracking Table columns</b>', '*************', "");         
        TrackingTable.forEach(column=>{
        jobsHomePage.verifyJobsSubTableHeaders(column); 
      })          
    });
    
    it('Click on tracking icon and verify Options', function () {          
        jobsHomePage.clickOnElipseIcon();           
    });    

    // it('Verify table header', function () {          
    //     jobsHomePage.verifyJobsTableHeaders("created");           //deprecated  01/09/2020
    // });
    


});

