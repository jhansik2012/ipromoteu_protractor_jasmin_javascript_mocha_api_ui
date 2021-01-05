let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob'),
customProductsPage=requirePage('CustomProductsPage');

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
masterCode = csvProcessor.filterData(testName, 'MasterCode');

var currentDate = new Date(),
    dd = currentDate.getDate(),
    mm = currentDate.getMonth() + 1,//as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateAndTimeStamp = dd + '' + mm + '' + yyyy + '' + hour + '' + minute,
    productName= "ProductName_"+ dateAndTimeStamp,
    description2= "Description2_"+dateAndTimeStamp,
    description3= "Description3_"+dateAndTimeStamp,
    infoToVendor= "Info to Vendor_"+dateAndTimeStamp,
    infoToCustomer= "Info to Customer"+dateAndTimeStamp,
    productCode= "PC001",
    styleCode= "SC031",
    supplierItem= "SI001",
    color= 'Red',
    size= 'M',
    price= '1.465',
    cost= '0.989',
    vendor='AFP',
    fileName= 'ipromoteU.png',
    productImagePath= testDataObjectsPath+fileName;

describe('Create Custom Products-TC05', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase  = "TC005-CreateCustomProducts_CreateCustomProductAndVerify";
      });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });

 //Custom Products
    it('Click on Custom Products Link', function () { 
        customProductsPage.clickOnCustomProductsLink();           
    });
    it('Verify Custom Products Page', function () { 
        customProductsPage.verifyCustomProductsPageIsDisplayed();           
    }); 
    it('Click on CreateNew', function () { 
        customProductsPage.clickOnCreateNewButton();           
    });  

//Vendor & Product Details Page   
    it('Verify Create Custom Products Page', function () { 
        customProductsPage.verifyCreateCustomProductsPageIsDisplayed();           
    }); 
    it('Verifying "Vendor & Product Details" ', function () {
        reporter.appendTest('<b>Vendor & Product Details</b>', 'Verifying "Vendor & Product Details" page', "");
        createNewJobPage.ValidateSubwayMap("1. Vendor & Product Details");
    });
    it('Verify Next Button Disabled', function () { 
        customProductsPage.verifyNextButtonIsDisabled();           
    }); 
    it('Select Vendor ', function () {  
        customProductsPage.selectVendor(vendor)                     
    });
    it('Verify Next Button Disabled', function () { 
        customProductsPage.verifyNextButtonIsDisabled();           
    });
    it('Enter Product Name ', function () {  
        customProductsPage.enterProductName(productName)                     
    });
    it('Verify Next Button Enabled', function () { 
        customProductsPage.verifyNextButtonIsEnabled();           
    });
    it('Enter Description 2', function () {  
        customProductsPage.enterDescription2(description2)                     
    });
    it('Enter Description 3 ', function () {  
        customProductsPage.enterDescription3(description3)                     
    });
    it('Enter Additional Info to Vendor ', function () {  
        customProductsPage.enterVendorAdditionalInfo(infoToVendor)                     
    });
    it('Enter Product Code ', function () {  
        customProductsPage.enterProductCode(productCode)                     
    });
    it('Enter Supplier Item ', function () {  
        customProductsPage.enterSupplierItem(supplierItem)                     
    });
    it('Enter Style Code', function () {  
        customProductsPage.enterStyleCode(styleCode)                     
    });
    it('Click on Next Button', function () { 
        customProductsPage.clickOnNextButton();           
    });
    it('Click on Previous Button', function () { 
     reporter.appendTest('<b>Verifying Previous tab</b>', 'All the data entered in fields of the previous page should be saved and displayed when navigated back', "");
        customProductsPage.clickOnPreviousButton();           
    });
    it('Verify Field Values', function () { 
        customProductsPage.verifyVendorAndProductsDetailsPageFieldValues(productName, description2, description3, productCode, supplierItem, styleCode, infoToVendor);           
    });
    it('Click on Next Button', function () { 
        customProductsPage.clickOnNextButton();           
    });

 // "Color, Size & Pricing Page   
    it('Verifying "Color, Size & Pricing" ', function () {
        reporter.appendTest('<b>Color, Size & Pricing</b>', 'Verifying "Color, Size & Pricing" page', "");
        createNewJobPage.ValidateSubwayMap("2. Color, Size & Pricing");
    });
    it('Verify Next Button Enabled', function () { 
        customProductsPage.verifyNextButtonIsEnabled();           
    });
    it('Enter Color', function () {  
        customProductsPage.enterColor(color)                     
    });
    it('Enter Size', function () {  
        customProductsPage.enterSize(size)                     
    });
    it('Verify Cost and Price Fields', function () { 
        customProductsPage.verifyCostFieldIsNumeric();           
        customProductsPage.verifyPriceFieldIsNumeric();           
    }); 
    it('Enter Cost', function () {  
        customProductsPage.enterCost(cost)                     
    });
    it('Enter Price', function () {  
        customProductsPage.enterPrice(price)                     
    });
    it('Enter Additional Info to Customer ', function () {  
        customProductsPage.enterCustomerAdditionalInfo(infoToCustomer)                     
    });
    it('Click on Next Button', function () { 
        customProductsPage.clickOnNextButton();           
    });
    it('Click on Previous Button', function () { 
     reporter.appendTest('<b>Verifying Previous tab</b>', 'All the data entered in fields of the previous page should be saved and displayed when navigated back', "");
        customProductsPage.clickOnPreviousButton();           
    });
    it('Click on Next Button', function () { 
        customProductsPage.clickOnNextButton();           
    });


// Product Images Page
    it('Verifying "Product Images" ', function () {
        reporter.appendTest('<b>Product Images</b>', 'Verifying "Product Images" page', "");
        createNewJobPage.ValidateSubwayMap("3. Product Images");
    });
    it('Upload Product Image ', function () {  
        customProductsPage.uploadProductImage(productImagePath)                     
    });
    it('Verify Uploaded FileName ', function () {  
        customProductsPage.verifyUploadedFileName(fileName)                     
    });
    it('Verify Uploaded PreviewImage ', function () {  
        customProductsPage.verifyPreviewImage()                     
    });
    it('Click on Submit Button', function () { 
        customProductsPage.clickOnSubmitButton();           
    });

// Cutom Products List Page
    it('Verify Custom Products Page', function () { 
        customProductsPage.verifyCustomProductsPageIsDisplayed();           
    }); 
    it('Verify Created Product Name', function () { 
        customProductsPage.verifyCreatedProductName(productName);           
    });
    it('Verify Created Product Details', function () { 
        customProductsPage.verifyCreatedProductDetails(productName,cost);           
    });
 
});

