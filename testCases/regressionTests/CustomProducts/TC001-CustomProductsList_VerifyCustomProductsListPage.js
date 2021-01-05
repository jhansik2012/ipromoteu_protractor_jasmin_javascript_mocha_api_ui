let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob'),
customProductsPage=requirePage('CustomProductsPage');


var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
masterCode = csvProcessor.filterData(testName, 'MasterCode');

var productNameKeyword= 'N95 Face Mask',
    descriptionKeyword= 'PP melt-blown filter media',
    productCodeKeyword= 'PROC123',
    vendorKeyword= 'A4 Promotions';

 describe('Custom Products List-TC01', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase  = "TC001-CustomProductsList_VerifyCustomProductsListPage";
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
    it('Verify Custom New Button', function () { 
        customProductsPage.verifyCreateNewButtonIsDisplayed();           
    });  
    it('Verify Keyword Search Field', function () { 
        customProductsPage.verifyKeywordSearchFieldIsDisplayed();           
    });
    it('Verify Supplier Search Field', function () { 
        customProductsPage.verifySupplierSearchFieldIsDisplayed();           
    });
    
    it('Search Product Using Product Name and Verify displayed list', function () { 
        customProductsPage.searchProductUsingKeywordAndVerifyList(productNameKeyword);           
    });
    it('Search Product Using Description and Verify displayed list', function () { 
        customProductsPage.searchProductUsingDescriptionAndVerifyList(descriptionKeyword);           
    });
    it('Search Product Using ProductCode and Verify displayed list', function () { 
        customProductsPage.searchProductUsingProductCodeAndVerifyList(productCodeKeyword);           
    });
    it('Clear Keyword', function () { 
        customProductsPage.enterKeyword('');           
    });
    it('Search Product Using Supplier and Verify displayed list', function () { 
        customProductsPage.searchProductUsingSupplierAndVerifyList(vendorKeyword);           
    });

});

