let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url');

var lineitems= ['POs','Artwork','Finance','Artwork','Shipments','Documents','Reminders','Notes'],
 headerrows= ['Description','Color','Size','VENDOR','PO','status','F/U','qty','billed','price','Decor'];

describe('Validate Line Items section in Job Details',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {               
        global.current_TestCase = "TC004-JobDetails-LineItemssection_ValidateLineItemssectioninJobDetails";
      });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });

    it('Validate line items are displayed ', function () {
        jobsHomePage.clickOnJobIdByUsingRowNumber(2);
    });

    it('Validate All checkboxes should be selected when selecting header checkbox',function(){
        reporter.appendTest('Verifying List Header checkbox', 'If header checkbox selected, then all the products checkbox should be selected automatically ', "");  
        jobsHomePage.verifyDescallCheckboxesAreSelcted();
    });
    it('Verify that decorate button is Enabled',function(){
        reporter.appendTest('Verifying Decorate functionality', 'Decorate button should only be actiive after selecting atleast one product which is not decorated', "");  
        jobsHomePage.verifyDecorateButtonIsEnabled();
    });
    
    it('Click On slide menu',function(){
        reporter.appendTest('Verifying View details and Delete option of Product', 'View details and Delete options should be displayed after clicking on Product menu button', "");  
        jobsHomePage.clickOnslidemenuforviewdetails();
    });

    it('Validate View Details,Delete options are displayed',function(){
        // jobsHomePage.verifyViewdetailsAndDelete(); Functionality removed
    });

   it('Click on Create PO button', function(){
    reporter.appendTest("Verifying Vendor list in Dropdown and Table", 'Vendor Name displayed in Dropdown should also present in table', "");       
        jobsHomePage.clickOnCreatePosbutton();
    });

   it('Validate List Of Vendors are displayed after click on pos dropdown', function(){
        jobsHomePage.verifyVendorListInCreatePOButton();
   });
   
   it('Validate addproduct, createpos, repeatjob and decorate are displayed', function () {
        jobsHomePage.verifyAddproductDisplayed();
        jobsHomePage.verifyCreatePOsDisplayed();
        jobsHomePage.verifyRepeatJobsDisplayed();        
    });

   it("Verify Job details page tabs",()=>{
    reporter.appendTest("Verifying Job details Page Tabs", '*********************', "");       
     lineitems.forEach(text=>{
            jobsHomePage.verifyDetailsTabValuesAreDisplayed(text);
        });
    })

    it('Validate Header Row details are displayed', function(){
    reporter.appendTest("Verifying Product List Table", '*********************', "");       
    headerrows.forEach(text=>{
            jobsHomePage.verifyPriceTableHeaderFieldsAreDisplayed(text);
        });
    });
  
});