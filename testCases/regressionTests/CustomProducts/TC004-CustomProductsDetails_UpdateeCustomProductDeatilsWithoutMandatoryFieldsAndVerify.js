let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob'),
customProductsPage=requirePage('CustomProductsPage');


var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
emptyValue= '',
productName='Cust_Product',
vendor='AFP';

 describe('Update Custom Products Details-TC03', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase  = "TC004-CustomProductsDetails_UpdateeCustomProductDeatilsWithoutMandatoryFieldsAndVerify";
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
    
    it('Verify update button enabled', function () { 
        customProductsPage.verifyUpdateButtonIsEnabled();           
    });
    it('Clear product name field', function () {  
        customProductsPage.enterProductName(emptyValue)                     
    });
    it('Verify update button is Disabled', function () { 
        customProductsPage.verifyUpdateButtonIsDisabled();           
    }); 
    it('Enter product name ', function () {  
        customProductsPage.enterProductName(productName)                     
    });
    it('Verify update button is enabled', function () { 
        customProductsPage.verifyUpdateButtonIsEnabled();           
    });

    it('Clear Vendor field ', function () {  
        customProductsPage.enterVendorName(emptyValue)                     
    });
    it('Verify update button is Disabled', function () { 
        customProductsPage.verifyUpdateButtonIsDisabled();           
    }); 
    it('Select Vendor ', function () {  
        customProductsPage.selectVendor(vendor)                     
    });
    it('Verify update button is enabled', function () { 
        customProductsPage.verifyUpdateButtonIsEnabled();           
    });

});

