let ipromoteU_login = requirePage('LoginPage'),
    decorationDetailsPage = requirePage('DecorationDetailsPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    createNewJobPage = requirePage('CreateNewJob'),
    addProductPage = requirePage('addProduct')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    product = csvProcessor.filterData(testName, 'Product'),
    masterCode = csvProcessor.filterData(testName, 'MasterCode'),
    vendorCode = csvProcessor.filterData(testName, 'VendorCode'),
    decorationTableColHeaders = ['Cost Only', 'Product', 'Description', 'QTY', 'Price', 'Cost', 'Req ship', 'In hand'],
    keyword='Blazer',
    source= 'Custom Products',
    sageProduct= 'Sage Products',
    imprintMethod = "Etched",
    artworkLocation = "Right Sleeve",
    artWorkCustomer= 'XSD',
    color= "Red",
    size= "XS";

describe('Decoration Details page validations', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-AddDecoration_AddDecorationAndVerify";
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
    // it('Store selected Line item', function () { 
    //     decorationDetailsPage.getSelectingLineItem();           
    // });  //Using directly from existing data(Product name stored while selecting)
    it('Click on decorate button', function () {
        jobsHomePage.clickOnDecorateButton();
    });
    // it('Verify Override Alert', function () {          
    //     decorationDetailsPage.verifyOverrideAlertMessageAndClickYesButtonToContinue("Some of the selected line items already have a decoration.");;           
    // });
    it('Verify displayed line item ', function () {
        decorationDetailsPage.verifySelectedProductToDecorate();
    });
   
    it('Verify decoration details page', function () {
        createNewJobPage.ValidateSubwayMap("1. Imprint Method");
        decorationDetailsPage.verifyAllItemsAreDisplayedLeftSide();
    });
    it('Verify Elements Diabled', function () {
        decorationDetailsPage.verifyElementIsDisabled();
    });
    //vendor

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
    it('Verify Artwork library', function () {
        decorationDetailsPage.selectCustomer(artWorkCustomer);
    });
    it('select Products In Library', function () {
        decorationDetailsPage.selectProductsInLibrary();
    });
    it('verify Preview Image', function () {
        decorationDetailsPage.verifyPreviewImage();
    });
    it('Click on Imprint dropdown ', function () {
        reporter.appendTest('Adding another Imprint And Artwork ', '<b>User should be able to add another Imprint and Artwork combinations</b>', "");
        decorationDetailsPage.selectImprint(imprintMethod, 0);
    });
    it('Click on Location dropdown ', function () {
        decorationDetailsPage.selectLocation(artworkLocation, 0);
    });
    it('Enter color ', function () {
        decorationDetailsPage.enterColor(color, 0);
    });
    it('Enter size ', function () {
        decorationDetailsPage.enterSize(size, 0);
    });
    it('Enter instructions ', function () {
        decorationDetailsPage.enterInstructions("Testing Instructions field", 0);
    });
    it('Click on Add Location button ', function () {
        decorationDetailsPage.clickOnAddLocationButton();
    });
    it('Verify Imprint header', function () {
        decorationDetailsPage.verifyImprintHeaderDescription(imprintMethod, 0);
    });
    it('Verify Location header', function () {
        decorationDetailsPage.verifyLocationHeaderDescription(artworkLocation, 0);
    });
    //Verifying Save decoration
    it('Click on save decoration button', function () {
        decorationDetailsPage.clickOnSaveDecorationButton()
    });
    it('Enter decoration name', function () {
        decorationDetailsPage.enterDecorationName("Test_Name")
    });
    it('Enter decoration description', function () {
        decorationDetailsPage.enterDecorationDescription("TestAutomation_DecorationDescription")
    });
    it('Click on save submit decaration button', function () {
        decorationDetailsPage.clickOnDecorationSaveButton()
    });
    it('Verify decoration save successfully message', function () {
        decorationDetailsPage.verifyDecorationSavedSuccessMessage()
    });
    it('Click on Select A Saved Decoration button', function () {
        decorationDetailsPage.clickOnSelectASavedDecorationButton()
    });
    it('Verify Saved Decoration', function () {
        decorationDetailsPage.verifySavedDecoration()
    });

    //Decoration and Pricing details
    it('Click on next button', function () {
        createNewJobPage.clickOnNextButton();
    });
    it('Enter Vendor Name/Code', function () {
        createNewJobPage.ValidateSubwayMap("3. Decorator & Pricing Details");
        decorationDetailsPage.clickOnPreviousButton();
    });
    it('Validate selected Vendor Name/Code', function () {
        decorationDetailsPage.verifySelectedVendor(vendorCode)
    });
    it('Click on next button', function () {
        createNewJobPage.clickOnNextButton();
    });
    // it('Validate  Select Your Decorator, Add Dates & Pricing sections', function () {
    //     decorationDetailsPage.verifyDecoratorPricingDetailsHeader() //Depricated
    // });
    it('Enter Decoration Notes', function () {
        decorationDetailsPage.enterDecorationNotes("Decoration_Notes")
    });
    it('Click on Calendar icon next to Requested Ship date', function () {
        decorationDetailsPage.enterRequestedShipDate()
    });
    it('Verify Send proofs to disabled', function () {
        decorationDetailsPage.verifySendProofsDisabled()
    });
    it('Select Proof required as Yes', function () {
        decorationDetailsPage.selectProofRequiredYes()
    });
    it('Select Proof required as Yes', function () {
        decorationDetailsPage.verifyErrorMessageForInvalidMail()
    });
    it('Enter send Proofs To', function () {
        decorationDetailsPage.enterSendProofsTO("xyz@abc.com, abc@xyz.com")
    });
    it('Verify Send proofs to value', function () {
        decorationDetailsPage.verifySendProofsField("xyz@abc.com, abc@xyz.com")
    });
    it('Validate Table with decoration items', function () {
        reporter.appendTest('Verifing Pricing details table', '***********************', "");
        decorationTableColHeaders.forEach(options => {
            decorationDetailsPage.verifyDecorationTableTabs(options)
        })
    });
    it('Select on Check box in each line Item', function () {
        decorationDetailsPage.clickOnCheckBoxLineItem()
    });
    it('Enter Description, Quantity, Price and Cost for each product', function () {
        // decorationDetailsPage.enterPriceAndCost() //cost value is automatically updating
    });
    it('Validate the label under the table', function () {
        // decorationDetailsPage.validateLabelUnderDecorationTable('*Selected line items will not appear on customer invoice(s)')
    });
    it('Click on + icon to add another row', function () {
        decorationDetailsPage.clickOnAddSymbol()
    });
    it('Click on X icon on top left corner ', function () {
        decorationDetailsPage.closeDecorationPopup()
    });
    it('Verify Alert', function () {
        decorationDetailsPage.verifyCloseAlertMessage("Any changes made will be lost.Do you wish to continue?")
    });
    it('Click on No button in Pop up', function () {
        decorationDetailsPage.clickOnNoButtonInPopup()
    });
    it('Click on Yes', function () {
        // decorationDetailsPage.clickOnYesPopup() // need to write new test case
    });
    it('Verify submit and previous buttons', function () {
        decorationDetailsPage.validateSubmitAndPrevousButtons()
    });
    it('Click on Previous',function(){
        decorationDetailsPage.clickOnPreviousButton()
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("2. Artwork & Placement");           
    });
    it('Verify Previously selected vendor',function(){
        decorationDetailsPage.verifySelectedVendor()
    });
    it('Click on Next',function(){
        decorationDetailsPage.clickOnNextButton()
    });
    it('Verify Previously selected Reqship date',function(){
        decorationDetailsPage.verifySelectedReqShipDate()
    });
    
//optional
    it('Click on Calendar icon next to Requested Ship date', function () {
        decorationDetailsPage.enterRequestedShipDate()
    }); 
    it('Click on Submit button', function () {
        decorationDetailsPage.clickOnSubmitButton()
    });
    //Verify
    it('Verify Decoration status', function () {
        decorationDetailsPage.verifyDecorationStatus()
    });
    it('Verify Decoration line item', function () {
        decorationDetailsPage.verifyDecoratatedLineItem(imprintMethod)
    });
    it('Verify Decoration Vendor', function () {
        decorationDetailsPage.verifyDecoratatedLineItemVendor(imprintMethod)
    });
    // it('Verify Decoration Color', function () {
    //     decorationDetailsPage.verifyDecoratatedLineItemColor(imprintMethod, color)
    // });
    // it('Verify Decoration Size', function () {
    //     decorationDetailsPage.verifyDecoratatedLineItemSize(imprintMethod, size)
    // }); //depricated

});

