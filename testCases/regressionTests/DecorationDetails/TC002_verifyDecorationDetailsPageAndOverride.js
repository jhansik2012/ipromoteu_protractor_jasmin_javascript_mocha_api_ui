let ipromoteU_login = requirePage('LoginPage'),
decorationDetailsPage=requirePage('DecorationDetailsPage'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob'),
addProductPage=requirePage('addProduct'),
bundledPOPage = requirePage('BundledPOPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product'),
masterCode = csvProcessor.filterData(testName, 'MasterCode'),
vendorCode  = csvProcessor.filterData(testName, 'VendorCode'),
decorationTableColHeaders=['Cost Only','Product','Description','QTY','Price','Cost','Req ship','In hand'],
keyword='Blazer',
sageProduct= 'Sage Products',
source= 'Custom Products',
imprintMethod2=  "Heat Transfer",
artworkLocation2= "Left Sleeve",
imprintMethod1= "Embossed",
artworkLocation1= "Custom Back",
artWorkCustomer= 'XSD - Xebra Store Demo',
color= "Blue",
size= "M";

describe('Decoration Details page validations', function () {
    appLogger.Log("************************ Execution Started ***************************");
     appLogger.Log("************************ " + __filename + "***************************");
     beforeEach(function () {
        global.current_TestCase = "TC002-DecorationDetailsPageAndOverride_verifyDecorationDetailsPageAndOverride";
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
    it('Enter Vendor Name/Code', function () {
        decorationDetailsPage.enterVendorName(vendorCode)
    });
    it('Retrieve Vendor Name/Code', function () {
        decorationDetailsPage.retrieveVendorName()
    });  
//Verifying Atrwork Library
    it('Click on Select from library to upload image ', function () {          
        decorationDetailsPage.clickOnLibraryUploadImage();           
    });
    it('Verify Artwork library', function () {          
        decorationDetailsPage.verifyLibraryPage();           
    });
    it('Select from Artwork library', function () {          
        decorationDetailsPage.selectCustomer(artWorkCustomer);         
    });
    it('verify Products In Library', function () {          
        decorationDetailsPage.selectProductsInLibrary();         
    });
    it('verify Preview Image', function () {          
        decorationDetailsPage.verifyPreviewImage();         
    });
//111111
    it('Click on Imprint dropdown ', function () {  
    reporter.appendTest('Adding Imprint And Artwork ', 'User should be able to select any Imprint and Artwork combinations', "");            
        decorationDetailsPage.selectImprint(imprintMethod1, 0);           
    }); 
    it('Click on Location dropdown ', function () {          
        decorationDetailsPage.selectLocation(artworkLocation1, 0);           
    }); 
    it('Enter color ', function () {          
        decorationDetailsPage.enterColor(color,0);           
    });
    it('Enter size ', function () {          
        decorationDetailsPage.enterSize(size,0);           
    });
    it('Enter instructions ', function () {          
        decorationDetailsPage.enterInstructions("Testing Instructions field",0);           
    });
    it('Click on Add Location button ', function () {          
        decorationDetailsPage.clickOnAddLocationButton();           
    });
//Decoration and Pricing details
    it('Click on next button', function () {          
        createNewJobPage.clickOnNextButton();           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Decorator & Pricing Details");           
    });
    // it('Validate  Select Your Decorator, Add Dates & Pricing sections',function(){
    //     decorationDetailsPage.verifyDecoratorPricingDetailsHeader()
    // });  //Depricated
    it('Enter Decoration Notes',function(){
        decorationDetailsPage.enterDecorationNotes("Decoration_Notes")
    });
    it('Click on Calendar icon next to Requested Ship date',function(){
        decorationDetailsPage.enterRequestedShipDate()
    });
    it('Select Proof required as Yes',function(){
        decorationDetailsPage.selectProofRequiredYes()
    });
    it('Enter send Proofs To',function(){
        decorationDetailsPage.enterSendProofsTO("xyz@abc.com, abc@xyz.com")
    });
//Submit   
    it('Click on Submit button',function(){
        decorationDetailsPage.clickOnSubmitButton()
    });
//Verify Decoration
    it('Verify Decoration line item',function(){
        decorationDetailsPage.verifyDecorationStatus()
        decorationDetailsPage.verifyDecoratatedLineItem(imprintMethod1)
        decorationDetailsPage.verifyDecoratatedLineItemVendor(imprintMethod1)
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
        decorationDetailsPage.verifySelectedVendorinDetailsPage(vendorCode)
    });
    it('Verify Imprint and Artwork', function () {          
        decorationDetailsPage.verifyImprintInViewDetails(imprintMethod1, 0);           
        decorationDetailsPage.verifyArtworkLocationInViewDetails(artworkLocation1, 0);           
    });
    it('Verify Notes and Proof', function () {          
        decorationDetailsPage.verifyNotesInViewDetails();           
        decorationDetailsPage.verifyProofsInViewDetails();           
    });
    //Verifying Atrwork Library
    it('Clear Artwork Image If Exist', function () {          
        decorationDetailsPage.clearArtworkImageIfExist();           
    });
    it('Click on Select from library to upload image ', function () {          
        decorationDetailsPage.clickOnLibraryUploadImage();           
    });
    it('Verify Artwork library Page', function () {          
        decorationDetailsPage.verifyLibraryPage();           
    });
    it('Select from Artwork library', function () {          
        decorationDetailsPage.selectCustomer(artWorkCustomer);         
    });
    it('verify Products In Library', function () {          
        decorationDetailsPage.selectProductsInLibrary();         
    });
    it('verify Preview Image', function () {          
        decorationDetailsPage.verifyPreviewImage();         
    });
//Override
    it('Select Imprint dropdown ', function () {  
    reporter.appendTest('Updating Decoration', '************************************', "");
        decorationDetailsPage.selectImprintInViewDetails(imprintMethod2,0);           
    }); 
    it('Select Location dropdown ', function () {          
        decorationDetailsPage.selectArtworkLocationInViewDetails(artworkLocation2, 0);           
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
    it('Verify Decoration line item',function(){
    reporter.appendTest('<b>Verifying Updated details</b>', 'Verifying decoration line item', "");
        decorationDetailsPage.verifyDecoratatedLineItem(imprintMethod2)
    });
    it('Select decorated line item ',function(){
    reporter.appendTest('<b>Verifying Updated details</b>', 'Verifying in decoration details page' ,"");
        decorationDetailsPage.selectDecoratedLineProduct()
    });
    it('Click on Decoration details button',function(){
        decorationDetailsPage.clickOnviewDecorationDetailsButton()
    });
    it('Verify Imprint and Artwork Location', function () {          
        decorationDetailsPage.verifyImprintInViewDetails(imprintMethod2, 0);           
        decorationDetailsPage.verifyArtworkLocationInViewDetails(artworkLocation2, 0);           
    });
});


