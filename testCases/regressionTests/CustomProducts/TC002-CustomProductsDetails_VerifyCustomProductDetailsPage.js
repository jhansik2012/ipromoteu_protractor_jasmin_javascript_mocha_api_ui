let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob'),
customProductsPage=requirePage('CustomProductsPage');


var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
masterCode = csvProcessor.filterData(testName, 'MasterCode');

var fileName= 'ipromoteU.png',
    productImagePath= testDataObjectsPath+fileName;

 describe('Custom Products Details-TC02', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase  = "TC002-CustomProductsDetails_VerifyCustomProductDetailsPage";
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
    it('Verify is Custom Products Page field values are Editable', function () { 
        customProductsPage.verifyCustomProductsFieldsAreEditable();           
    });
    it('Verify Cost and Price Fields', function () { 
        customProductsPage.verifyCostFieldIsNumeric();           
        customProductsPage.verifyPriceFieldIsNumeric();           
    }); 

    //Upload Preview Image if not there and Verify
    it('clear Product Image If Exist', function () { 
        customProductsPage.clearProductImageIfExist();           
    });
    it('Upload Product Image ', function () {  
        customProductsPage.uploadProductImage(productImagePath)                     
    });
    it('Verify Uploaded File Name ', function () {  
        customProductsPage.verifyUploadedFileName(fileName)                     
    });
    it('Verify Uploaded Preview Image ', function () {  
        customProductsPage.verifyPreviewImage()                     
    });

});

