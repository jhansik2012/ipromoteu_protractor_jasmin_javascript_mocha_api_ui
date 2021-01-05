var ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    createPOPage=requirePage('CreatePO'),
    createNewJobPage=requirePage('CreateNewJob'),
    bundledPOPage = requirePage('BundledPOPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    vendorName = csvProcessor.filterData(testName, 'VendorName'),
    customerName = csvProcessor.filterData(testName, 'CustomerName');

var poDatesFilter= ['Last 12 Months', 'Last 90 Days  ','Last 60 Days  ', 'Last 30 Days  '],
 poTableColumns= ['po', 'created','vendor', 'sent', 'total', 'status', 'shipped', 'carrier'],
 poStatusOptions= ['PO Sent','In Production', 'Not Sent', 'Complete'],
 lineItemTableColumns= ['job number','Supplier Item code', 'description', 'style code', 'color','size','qty','cost','total cost'],
 previewLineItemTableColumns= ['Supplier Item code','description','style code','color','size','qty','cost','total cost'],
 bundlingOptions= ['Supplier Item Code','Description','Color','Size','Style code',"Add'l Instructions"],
 poNumber= 'B107984XSD',
 voidPO= 'B107977XSD',
 status='SENT',
 vendorKeyword= 'A4 Promotions and Incentives',
 fileName= 'ipromoteU.png',
 file= testDataObjectsPath+fileName;

 var today = new Date(),
     dd = today.getDate(),
     mm = today.getMonth() + 1, //January is 0!
     yyyy = today.getFullYear(),
     hour = today.getHours(),
    minute = today.getMinutes(),
    dateAndTimeStamp = dd + '' + mm + '' + yyyy + '' + hour + '' + minute,
    companyName= "companyName_"+ dateAndTimeStamp,
    address1= "address1_"+dateAndTimeStamp,
    address2= "address2"+dateAndTimeStamp,
    city= "city_"+dateAndTimeStamp,
    zip= '32156',
    state='Georgia';

describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC005-CreateBundledPO-CreateBundledPOUSingFulfillmentListThenSendPOAndVerify";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
//Bundled PO Page
    it('Click on Bundled PO Link', function () { 
        bundledPOPage.clickOnBundledPOLink();           
    });
    it('Verify Bundled PO Page and Click on Create Bundled PO', function () { 
        bundledPOPage.verifyBundledPOPageIsDisplayed();           
        bundledPOPage.clickOnCreateBundledPOLink();           
    });
    it('Verify Vendor details page, Enter vendor name and Verify page elements', function () { 
        createNewJobPage.ValidateSubwayMap("1. Vendor Details");
        bundledPOPage.enterVendorName(vendorKeyword);           
    });
    it('Click Next', function () {            
       bundledPOPage.clickOnNextButton() 
    }) 
    it('Verify Line item list table', function () { 
       createNewJobPage.ValidateSubwayMap("2. Line Items Selection");
       bundledPOPage.verifyLineItemsToBePresent()
       reporter.appendTest('Verifying by selecting any line items', "********************" , "PASS")
       bundledPOPage.selectLineItemCheckbox(1)
    });
    it('Click Next', function () {            
       bundledPOPage.clickOnNextButton() 
    })  
    it('Verify Review Page', function () { 
       createNewJobPage.ValidateSubwayMap("3. Review Bundling");
       reporter.appendTest('As All line item(s) are selected in "Line items selection" page ', 'All Line item(s) should be selected/displayed in "Review bundling" page', "********************" , "PASS")
       bundledPOPage.verifyLineItemsToBePresent()
    });
    it('Click Next', function () {            
       bundledPOPage.clickOnNextButton() 
    }) 
    it('Use other Address', function () { 
       createNewJobPage.ValidateSubwayMap("4. Shipping Details");
       bundledPOPage.useFullfillmentListRadio()
    });
    it('Upload list', function () { 
       bundledPOPage.uploadList(file)        
    });
    it('Update Shipping Address', function () { 
       bundledPOPage.clickOnNextButton2()        
    });
    it('Verify PO settings Page', function () {          
       createNewJobPage.ValidateSubwayMap("5. PO Settings")
       bundledPOPage.cratePOButton()
       Short_Wait()
    });
    it('Verify po created or not', function () {          
        createPOPage.ismodelPopupDisplayed();           
        createPOPage.storeCreatedPoNumberLocal();     
    });
    it('Click on continue', function () {            
        bundledPOPage.clickOnButton('CONTINUE');           
    }) 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("6. Send PO");           
        createPOPage.veifySendPOPageElements();           
        createPOPage.validateCreatedPONumberInSubjectAndMessageBodyLocal();           
    });
    it('Click on Send and Close', function () {            
        createPOPage.clickOnsendAndCloseButtton();           
    }) 

    // it('Verify that the PO is not created', function () {
    //   bundledPOPage.verifyBundledPOPageIsDisplayed();           
    //    createPOPage.verifyBundledPOStatus(status)
    // }); //Temporarily not using "Send PO" feature
});


