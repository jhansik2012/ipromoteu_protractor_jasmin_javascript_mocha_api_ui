let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob'),
addProductPage=requirePage('addProduct'),
customProductsPage=requirePage('CustomProductsPage');

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
masterCode = csvProcessor.filterData(testName, 'MasterCode'),
product= 'Custom Products';

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

describe('CreateCustomProduct_VerifyProduct_AddProductToJob', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase  = "TC002-E2E_CreateCustomProduct_VerifyProduct_AddProductToJob";
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

//Product Details Page
    it('Select any product', function () { 
        customProductsPage.clickOnSelectedProduct(productName);           
    });
    it('Verify Custom Product details Page', function () { 
        customProductsPage.verifyDisplayedProductInProductDetailsPage(productName);           
    });
    it('Verify Uploaded Preview Image ', function () {  
        customProductsPage.verifyPreviewImage()                     
    });
    it('Verify Field Values', function () { 
        customProductsPage.verifyProductDetailsPageFieldValues(productName, description2, description3, color, size, productCode, supplierItem, styleCode, price, cost, infoToVendor, infoToCustomer)
    });
    it('Click on Close Button', function () { 
        customProductsPage.clickOnCloseProductDetails();           
    });
    it('Click on Jobs Link ', function () {          
        customProductsPage.clickOnJobsLink();
        Medium_Wait()           
    });
    it('Click on any one job for edit ', function () {          
        jobsHomePage.clickOnFirstJob();           
    });
    it('Click on add product button ', function () {          
        addProductPage.clickOnAddProductButton();           
    });
    it('Validate subway map ', function () {  
    reporter.appendTest('<b>2. Product Source</b>', '*************', "");        
        createNewJobPage.ValidateSubwayMap("2. Product Source");          
    }); 
    it('Select Product', function () {    
      reporter.appendTest('Selecting Product source', 'Selecting <b>Custom Products</b>', "");         
        createNewJobPage.clickOnProduct(product);           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("2. Select Product");           
    }); 
    it('Search For Products', function () {  
      reporter.appendTest('Searching Custome Product', 'Searching with Product Name keyword: '+productName, "");                  
        createNewJobPage.keywordSearchCustomProducts(productName);           
    });
    it('Click on Search button', function () {   
        createNewJobPage.clickOnSearchCustomProducts();           
    });  
    it('Click on Add Product button', function () {   
        createNewJobPage.clickOnAddProductProducts();           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Quantities & Pricing");           
    }); 
    it('Enter product quantity', function () {          
        createNewJobPage.enterProductQuantity();           
    }); 
    it('enter Requested Ship Date', function () {          
        createNewJobPage.enterRequestedShipDate();           
    });
    it('Click on add line item', function () {          
        createNewJobPage.clickOnAddLineItemButton();           
    }); 
    it('Verify Product Added custom Product', function () { 
     reporter.appendTest('<b>Verifying added Custom Product to Job </b>', '***************************', "");                  
        createNewJobPage.verifyAddedProductToJob(productName);           
    });

});

