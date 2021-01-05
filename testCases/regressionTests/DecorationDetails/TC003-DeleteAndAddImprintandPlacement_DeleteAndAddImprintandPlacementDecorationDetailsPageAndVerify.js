let ipromoteU_login = requirePage('LoginPage'),
decorationDetailsPage=requirePage('DecorationDetailsPage'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob'),
bundledPOPage = requirePage('BundledPOPage'),
addProductPage=requirePage('addProduct')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
masterCode = csvProcessor.filterData(testName, 'MasterCode'),
vendorCode  = csvProcessor.filterData(testName, 'VendorCode'),
decorationTableColHeaders=['Cost Only','Product','Description','QTY','Price','Cost','Req ship','In hand'],
product= 'Custom Products',
keyword='Blazer',
sageProduct= 'Sage Products',
imprintMethod1= "Hot Stamped",
artworkLocation1= "Back Yoke",
source= 'Custom Products',
imprintMethod2= "Sublimation",
artworkLocation2= "Back",
imprintMethod3= "Foil Stamped",
artworkLocation3= "Custom Front",
artWorkCustomer= 'SHAL - Shalom Boston',
decoCombinations= 2;

   describe('Decoration Details page validations', function () {
    appLogger.Log("************************ Execution Started ***************************");
     appLogger.Log("************************ " + __filename + "***************************");
       beforeEach(function () {
        global.current_TestCase = "TC003-DeleteAndAddImprintandPlacement_DeleteAndAddImprintandPlacementDecorationDetailsPageAndVerifye";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on any one job for edit ', function () {
        jobsHomePage.clickOnFirstJob();
    });
    //Add New Product
    it('Click on add product button ', function () {
        addProductPage.clickOnAddProductButton();
    });
    it('Validate subway map ', function () {
        reporter.appendTest('<b>2. Product Source</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("2. Product Source");
    });
    it('Select Product', function () {    
     reporter.appendTest('Selecting Product source', 'Selecting <b>Custom Products</b>', "");         
        createNewJobPage.clickOnProduct(source);           
     }); 
    it('Click on Add Product button', function () {   
        createNewJobPage.ValidateSubwayMap("2. Select Product");           
        createNewJobPage.clickOnAddProductProducts();           
    });
    it('Enter product quantity', function () {
        createNewJobPage.ValidateSubwayMap("3. Quantities & Pricing");           
        createNewJobPage.enterProductQuantity();           
    });
    it('Get selected product', function () {          
        decorationDetailsPage.storeProductLocal();     //stores prouct name in lineItem
    });
    it('enter Requested Ship Date', function () {          
        decorationDetailsPage.enterRequestedShipDate();           
    });
    it('Click on add line item', function () {          
        createNewJobPage.clickOnAddLineItemButton();           
    }); 
    //Select Added Product
    it('Click Added Product to decorate ', function () {
        decorationDetailsPage.selectAddedProductCheckBox();
    });   
    it('Click on decorate button', function () {          
        jobsHomePage.clickOnDecorateButton();           
    });
    it('Verify displayed line item ', function () {          
        decorationDetailsPage.verifySelectedProductToDecorate();           
    });   
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("1. Imprint Method");           
    });   
    it('Enter Vendor Name/Code',function(){
        decorationDetailsPage.enterVendorName(vendorCode)
    });
    it('Retrieve Vendor Name/Code',function(){
        decorationDetailsPage.retrieveVendorName()
    });
    it('Click on Imprint dropdown ', function () {  
    reporter.appendTest('Adding Imprint And Artwork ', 'User should be able to select any Imprint and Artwork location combinations', "");            
        decorationDetailsPage.selectImprint(imprintMethod1, 0);           
    }); 
    it('Click on Location dropdown ', function () {          
        decorationDetailsPage.selectLocation(artworkLocation1, 0);           
    }); 
    it('Click on Add Location button ', function () {          
        decorationDetailsPage.clickOnAddLocationButton();           
    });
    it('Click on Imprint dropdown ', function () {  
    reporter.appendTest('Adding Another Imprint And Artwork ', 'User should be able to select any Imprint and Artwork location combinations', "");            
        decorationDetailsPage.selectImprint(imprintMethod2, 1);           
    }); 
    it('Click on Location dropdown ', function () {          
        decorationDetailsPage.selectLocation(artworkLocation2, 1);           
    }); 
    it('Click on Add Location button ', function () {          
        decorationDetailsPage.clickOnAddLocationButton();           
    });
//Decoration and Pricing details
    it('Click on next button', function () {          
        createNewJobPage.clickOnNextButton();           
    });
    it('Click on Calendar icon next to Requested Ship date',function(){
        decorationDetailsPage.enterRequestedShipDate()
    });
//Submit   
    it('Click on Submit button',function(){
        decorationDetailsPage.clickOnSubmitButton()
    });
//Verify Decoration
    it('Verify Decoration status and Decoration line item',function(){
        decorationDetailsPage.verifyDecorationStatus()
        decorationDetailsPage.verifyDecoratatedLineItem(imprintMethod1)
        decorationDetailsPage.verifyDecoratatedLineItem(imprintMethod2)
        decorationDetailsPage.verifyDecoratatedLineItemVendor(imprintMethod1)
        decorationDetailsPage.verifyDecoratatedLineItemVendor(imprintMethod2)
    });
//View details
    it('Select decorated line item ',function(){
        decorationDetailsPage.selectDecoratedLineProduct()
    });
    it('Click on Decoration details button',function(){
    reporter.appendTest('<b>Verifying Decoration details</b>', 'Data used to decorate and data dispalyed in Decoration details Page should be same for the decorated line item', "");        
        decorationDetailsPage.clickOnviewDecorationDetailsButton()
    });
    it('Verify selected product', function () {          
        decorationDetailsPage.verifySelectedProductToViewDetails();           
    });
    it('Verify Imprint, Artwork Location and Delete options', function () {          
        decorationDetailsPage.verifyImprintInViewDetails(imprintMethod1, 0);           
        decorationDetailsPage.verifyArtworkLocationInViewDetails(artworkLocation1, 0);           
        decorationDetailsPage.verifyImprintInViewDetails(imprintMethod2, 1);           
        decorationDetailsPage.verifyArtworkLocationInViewDetails(artworkLocation2, 1);           
        decorationDetailsPage.verifyDeleteImprintAndArtworkLocationOptionDisplayedForEachOption(decoCombinations);           
    });
//Delete any Artwork and location combo
    it('Delete any option', function () {          
        decorationDetailsPage.deleteThisArtworkAndPlacement(imprintMethod1, 1);           
    });
    it('Verify Imprint not present', function () {          
        decorationDetailsPage.verifyImprintInViewDetailsNotDispalyed(imprintMethod1);           
    });
    it('Click on Update button',function(){
        decorationDetailsPage.updateOptions()  
    });
    // it('Click on Update button',function(){
    //     decorationDetailsPage.clickOnUpdateButton()
    // });
    it('Verify Decoration line item',function(){
       reporter.appendTest('<b>Verifying Updated Decoration</b>', 'Verifying decoration line item', "");
        decorationDetailsPage.verifyImprintInJobListPageNotDispalyed(imprintMethod1)
    });
    it('Select decorated line item ',function(){
       reporter.appendTest('<b>Verifying Updated details</b>', 'Verifying in decoration details page' ,"");
        decorationDetailsPage.selectDecoratedLineProduct()
    });
    it('Click on Decoration details button',function(){
        decorationDetailsPage.clickOnviewDecorationDetailsButton()
    });
    it('Verify Imprint not present', function () {          
        decorationDetailsPage.verifyImprintInViewDetailsNotDispalyed(imprintMethod1);           
    });

//  Add Another Artwork and Imprint combo
    it('Add Another Artwork and Imprint combo', function () {          
        decorationDetailsPage.addArtworkAndPlacement();           
    });
    it('Select Imprint dropdown ', function () {  
    reporter.appendTest('Updating Decoration', '************************************', "");
        decorationDetailsPage.selectImprintInViewDetails(imprintMethod3, 1);           
    });
    it('Select Location dropdown ', function () {          
        decorationDetailsPage.selectArtworkLocationInViewDetails(artworkLocation3, 1);           
    });
    it('Click on Edit Related Charges  button',function(){
        decorationDetailsPage.clickOnEditRelatedCharges()  
    });
    it('Varify Edit Related chaeges Page', function () {          
        decorationDetailsPage.verifyEditRelatedChargesHeader();           
    }); 
    it('Click on Submit button',function(){
        decorationDetailsPage.clickOnSubmitButton()
    });
    it('Verify Alert', function () { 
        bundledPOPage.verifySuccessfullAlertAndItsBody('Decoration Updated Successfully!');           
    });
    it('Click on Ok button',function(){
        bundledPOPage.clickOnOK();         
         Medium_Wait()
    });
    // it('Click on Update button',function(){
    //     decorationDetailsPage.clickOnUpdateButton()
    // });

    it('Verify Decoration line item',function(){
    reporter.appendTest('<b>Verifying Updated details</b>', 'Verifying decoration line item', "");
        decorationDetailsPage.verifyDecoratatedLineItem(imprintMethod3)
    });
    it('Select decorated line item ',function(){
    reporter.appendTest('<b>Verifying Updated details</b>', 'Verifying in decoration details page' ,"");
        decorationDetailsPage.selectDecoratedLineProduct()
    });
    it('Click on Decoration details button',function(){
        decorationDetailsPage.clickOnviewDecorationDetailsButton()
    });
    it('Verify Imprint', function () {          
        decorationDetailsPage.verifyImprintInViewDetails(imprintMethod3, 1);           
    });
    it('Verify Artwork Location', function () {          
        decorationDetailsPage.verifyArtworkLocationInViewDetails(artworkLocation3, 1);           
    });
});

