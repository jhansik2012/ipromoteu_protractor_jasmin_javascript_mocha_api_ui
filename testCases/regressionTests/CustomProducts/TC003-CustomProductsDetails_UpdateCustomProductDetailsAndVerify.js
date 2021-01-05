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
    productCode= "PC021",
    styleCode= "SC021",
    supplierItem= "SI021",
    color= 'Voilet',
    size= 'X',
    price= '7.465',
    cost= '0.409',
    vendor='3ASAFETY',
    fileName= 'ipromoteU.png',
    productImagePath= testDataObjectsPath+fileName;

 describe('Update Custom Products Details-TC03', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase  = "TC003-CustomProductsDetails_UpdateCustomProductDetailsAndVerify";
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
    it('Select any product', function () { 
        customProductsPage.clickOnFirstProduct(1);           
    });  

// Custom Product Details Page   
    it('Verify is Create Custom Products Page', function () { 
        customProductsPage.verifySelectedAndDisplayedProductInProductDetailsPage();           
    });
    it('Select Vendor ', function () {  
        customProductsPage.selectVendorInDetailsPage(vendor)                     
    });
    it('Enter Product Name ', function () {  
        customProductsPage.enterProductName(productName)                     
    });
    it('Enter Description 2', function () {  
        customProductsPage.enterDescription2(description2)                     
    });
    it('Enter Description 3 ', function () {  
        customProductsPage.enterDescription3(description3)                     
    });
    // it('Enter Additional Info to Vendor ', function () {  
    //     customProductsPage.enterVendorAdditionalInfo(infoToVendor)                     
    // });
    it('Enter Product Code ', function () {  
        customProductsPage.enterProductCode(productCode)                     
    });
    it('Enter Supplier Item ', function () {  
        customProductsPage.enterSupplierItem(supplierItem)                     
    });
    it('Enter Style Code', function () {  
        customProductsPage.enterStyleCode(styleCode)                     
    });
    it('Verify Field Values', function () { 
        customProductsPage.verifyVendorAndProductsDetailsPageFieldValues(productName, description2, description3, productCode, supplierItem, styleCode, infoToVendor);           
    });
     it('Enter Color', function () {  
        customProductsPage.enterColor(color)                     
    });
    it('Enter Size', function () {  
        customProductsPage.enterSize(size)                     
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
    it('Click on Update Button', function () { 
        customProductsPage.clickOnUpdateProduct();           
    });


    it('Verify Custom Products Page', function () { 
        customProductsPage.verifyCustomProductsPageIsDisplayed();           
    });
    it('Verify Updated Product Name', function () { 
        customProductsPage.verifyUpdatedProductName(productName);           
    });
    it('Verify Updated Product Details', function () { 
        customProductsPage.verifyUpdatedProductDetails(productName,cost);           
    });

    it('Click on selected Product', function () { 
        customProductsPage.clickOnSelectedProduct(productName);           
    });
    it('Verify Custom Products Page Field Values', function () { 
        customProductsPage.verifyProductDetailsPageFieldValues(productName, description2, description3, color, size, productCode, supplierItem, styleCode, price, cost, infoToVendor, infoToCustomer);           
    });   
});

