let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage'),
decorationDetailsPage=requirePage('DecorationDetailsPage'),
createPOPage = requirePage('CreatePO')


var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product'),
searchKeyword = csvProcessor.filterData(testName, 'searchKeyword'),
masterCode = csvProcessor.filterData(testName, 'MasterCode'),
vendorCode= csvProcessor.filterData(testName, 'VendorCode'),
apparelKeyword= "Shirts",
lineItemStatus = 'PO Not Created',
poCreatedStatus= 'PO NOT CREATED',
imprintMethod = "Silksreen",
artworkLocation = "Left Chest",
vendor="Hit Promotional Products"


describe('End2End-Blended PO- Discard', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {       
        global.current_TestCase = "TC002-BlendedPOWithExistingVendor_CreatePOForDecoratedProductAndVerifyByDiscarding";
      });
    
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });   
    it('Click on create job ', function () { 
        reporter.appendTest('<b>Creating a Job</b>', '*************', "");         
        createNewJobPage.clickOnCreateJob();           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("1. Job Details & Contacts");           
    });  
    it('Enter Name or company code', function () {  
        reporter.appendTest('Searching Customer', 'Searcrhing customer with keyword "VWDEMOSTOR" ', ""); 
        createNewJobPage.enterNameOrCompanyCode(masterCode)                     
    });
    it('get Selected Customer', function () { 
        createNewJobPage.getSelectedCustomer();           
    });
    it('Enter job name', function () { 
        createNewJobPage.enterNewJobName(jobName);           
    });
    it('Click on rush job radio button', function () {          
        createNewJobPage.clickOnRushJobRadioButton("Yes");           
    });
    it('Click on smaple required radio button', function () {          
        jobsHomePage.clickOnSampleRequiredRadioButton("Yes");           
    }); 
    it('Click on next button', function () {          
        createNewJobPage.clickOnNextButton();           
    });
    it('Validate subway map ', function () {  
    reporter.appendTest('<b>2. Product Source</b>', '*************', "");        
        createNewJobPage.ValidateSubwayMap("2. Product Source");          
    }); 
    it('Select Product', function () {    
    reporter.appendTest('<b>Selecting Product source </b>', 'Selecting "ASI Products"', "");         
        createNewJobPage.clickOnProduct(product);           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Select Products");           
    }); 
    it('Search For Products by the Supplier', function () { 
     reporter.appendTest('<b>Selecting Products </b>', 'Searching for Produtcs in "Apparels" category- ex: '+apparelKeyword, "");                  
        createNewJobPage.searchSupplier(vendor);           
    });
    it('Click on order now button', function () {   
        createNewJobPage.clickOnOrderNowButton();           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("4. Quantities");           
    }); 
    it('Enter product quantity', function () {          
        createNewJobPage.enterProductQuantity();           
    }); 
    it('Get selected product', function () {          
        decorationDetailsPage.storeProductLocal();     //stores prouct name in lineItem
    });
    it('Click on add pricing button', function () {          
        createNewJobPage.clickOnAddPricingButton();           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("5. Pricing & Dates");           
    }); 
    it('enter Requested Ship Date', function () {          
        createNewJobPage.enterRequestedShipDate();           
    });
    it('enter in hand date', function () {          
        createNewJobPage.enterInHandDate();           
    });
    it('Click on add line item', function () {          
        createNewJobPage.clickOnAddLineItemButton();           
    }); 
    it('verify Job Name Of Created Job', function () { 
    reporter.appendTest('<b>Verifying Created Job </b>', 'Validating job with the data used while creating the job', "");                  
        createNewJobPage.verifyCreatedNewJobNameDetailsPageLocal();           
    });
    it('verify Status Of Created Job', function () { 
        createNewJobPage.statusOfCreatedJobInDetailsPage();           
    });

// /*********************************Decoration***********************************/
   //Select Added Product
    it('Click Added Product to decorate ', function () {
        decorationDetailsPage.selectAddedProductCheckBox();
    });   
    it('Click on decorate button', function () {          
        jobsHomePage.clickOnDecorateButton();           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("1. Imprint Method");           
    });   
    it('Click on Imprint dropdown ', function () {  
    reporter.appendTest('Adding Imprint And Artwork ', 'User should be able to select any Imprint and Artwork combinations', "");            
        decorationDetailsPage.selectImprint(imprintMethod, 0);           
    }); 
    it('Click on Location dropdown ', function () {          
        decorationDetailsPage.selectLocation(artworkLocation, 0);           
    }); 
  //Decoration and Pricing details
    it('Click on next button', function () {          
        createNewJobPage.clickOnNextButton();           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Decorator & Pricing Details");           
    });
    it('Enter Vendor Name/Code',function(){
        decorationDetailsPage.enterVendorName(vendor)
    });
    it('Retrieve Vendor Name/Code',function(){
        decorationDetailsPage.retrieveVendorName()
    });
    it('Click on Calendar icon next to Requested Ship date',function(){
        decorationDetailsPage.enterRequestedShipDate()
    });
//Submit   
    it('Click on Submit button',function(){
        decorationDetailsPage.clickOnSubmitButton()
    });
//Verify Decoration
    it('Verify Decoration status',function(){
        decorationDetailsPage.verifyDecorationStatus()
    });
    it('Verify Decoration line item',function(){
        decorationDetailsPage.verifyDecoratatedLineItem(imprintMethod)
     });
    it('Verify Decoration Vendor',function(){
        decorationDetailsPage.verifyDecoratatedLineItemVendor()
    });

/*********************************Creaate a Blended PO************************************************/

    it('Click on Create PO button ', function () { 
        reporter.appendTest('<b>Create PO</b>', '*************', "");         
        createPOPage.clickOnCreatePOS();           
    }); 
    it('select create po option from dropdown ', function () {          
        createPOPage.selectCreatePOSOptionFromDropdown();           
    }); 
    it('Verifying "Vendor Details" ', function () {
        reporter.appendTest('<b>Vendor Details</b>', 'Verifying "Vendor Details" page', "");
        createNewJobPage.ValidateSubwayMap("1. Vendor Details");
    });
    it('Get Selected Vendor ', function () {
        createPOPage.getSelectedVendorLocal()
    });
    it('Verifying selected  and Displayed vendor ', function () {
        createPOPage.verifySelectedAndDisplayedVendor();
    });
    it('Enter PO DATE', function () {          
        createPOPage.enterPODate();           
    });
    it('Click on next button', function () {          
        createPOPage.clickOnNextButton("Next Button");           
    });
    it('Select vendor and enter any Vendor name', function () {  
        createPOPage.enterVendorName(vendor);           
    });
    it('Click on next button', function () {          
        createPOPage.clickOnNextButton("Next Button");           
    });
    it('Click on Create PO button', function () {          
        createPOPage.clickOnNextButton("Create PO Button");           
    });
    it('Verify po created or not', function () {          
        createPOPage.ismodelPopupDisplayed();           
    });
    it('Get created po number',  ()=> {          
        createPOPage.storeCreatedPoNumberLocal();   
    });
    it('Click on ok button', function () {          
        createPOPage.clickOnOkButton();           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("4. Send PO");           
    });
    it('Validate Send PO Page Elements ', function () {          
        createPOPage.veifySendPOPageElements();           
    });
    it('validate Created PO Number in Subject and Message Body ', function () {          
        createPOPage.validateCreatedPONumberInSubjectAndMessageBodyLocal();           
    });
    it('Click on Discard button', function () {          
        createPOPage.clickOndiscardButtton();           
    });
    it('Verify that the PO is created', function () {
        //'PO CREATED', 'PO NOT CREATED'
        createPOPage.VerifyPOStatusLocal(poCreatedStatus)
    });
});
       