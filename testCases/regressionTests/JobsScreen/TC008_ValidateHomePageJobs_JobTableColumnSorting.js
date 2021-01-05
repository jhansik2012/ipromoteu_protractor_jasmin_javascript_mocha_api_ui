var ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
Request = require("request");

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url');


describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
       global.current_TestCase = "TC009-JobsScreenJobTableColumnSorting_JobTableColumnSortingValidation";
      });
   
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });

    it('Select Status', function () {          
        jobsHomePage.selectStatus("Order In Process");           
    });  

    it('Click on Job Column', function () {
     reporter.appendTest('Verifying JOB column Sorting functionality', '************' , "");
        jobsHomePage.clickonjobColumn();           
    });  

    it('Verify the list in which JobId should be in ascending order', function () {          
     reporter.appendTest('Verifying Jobs order', 'Jobs should be in Ascending order' , "");    
        jobsHomePage.verifyJobIdOrder();         
    });  

    
    it('Click On "Odered Date" column', function () {  
     reporter.appendTest('Verifying "Ordered date" column Sorting functionality', '************' , "");        
        jobsHomePage.clickOnOrderedCoulmn();           
    });  
    it('Verify the list in which dates arranged in order-First ordered First', function () {          
     reporter.appendTest('Verifying Ordered dates order', 'Ordered dates should be in "Ascending" order' , "");    
        jobsHomePage.verifyOrderedDateOrdered('ASC');           
    });


    it('Click On "Odered Date" column', function () {          
        jobsHomePage.clickOnOrderedCoulmn();           
    });  
    it('Verify the list in which dates arranged in order-Latest ordered First', function () {          
     reporter.appendTest('Verifying Ordered dates order', 'Ordered dates should be in "Descending" order' , "");       
      jobsHomePage.verifyOrderedDateOrdered('DSC');            
   
    });   

    // it('Click on Status Column', function () {          
    //     jobsHomePage.clickOnStatusCoulmn();            // Functionality has a bug
    // });  


    it('Cick on "Req Ship Date" column twice', function () {   
     reporter.appendTest('Verifying "Req Ship date" column Sorting functionality', '************' , "");               
        jobsHomePage.clickOnReqShip();     //Req ship validate for double click descending      
    });   
    it('Verify the list in which dates arranged in order-Farthest "Req Ship Date" first', function () {          
     reporter.appendTest('Verifying Req Ship dates order', 'Req Ship dates should be in "Descending" order' , "");       
        jobsHomePage.verifyOrderedDateReqShip('DSC');           
    });  

    it('Cick on "InHand Date" column twice', function () {  
     reporter.appendTest('Verifying "InHand date" column Sorting functionality', '************' , "");                
        jobsHomePage.clickOnInHand();     //in-hand validate for double click descending        
    });        
    it('Verify the list in which dates arranged in order-Farthest "Inhand date" first', function () {          
     reporter.appendTest('Verifying InHand dates order', 'InHand dates should be in "Descending" order' , "");           
        jobsHomePage.verifyOrderedDateInHand('DSC');            
    });    

    //need to compare all rows and print all values
});

