let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage'),
addProductPage=requirePage('addProduct')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
searchKeyword = csvProcessor.filterData(testName, 'searchKeyword'),
masterCode = csvProcessor.filterData(testName, 'MasterCode'),
customProduct= "N95 Face Mask",
product= 'Custom Products';

describe('CreateJob-TC006', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {       
        global.current_TestCase = "TC006-AddCustomProductToJob_AddExistingCustomProductToJobAndVerify";
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
    // it('Search For Products', function () {  
    //   reporter.appendTest('Searching Custome Product', 'Searching with Product Name keyword: '+customProduct, "");                  
    //     createNewJobPage.keywordSearchCustomProducts(customProduct);           
    // });
    // it('Click on Search button', function () {   
    //     createNewJobPage.clickOnSearchCustomProducts();           
    // });  
    it('Click on Add Product button', function () {   
        createNewJobPage.clickOnAddProductProducts();           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Quantities & Pricing");           
    }); 
    it('Enter product quantity', function () {          
        createNewJobPage.enterProductQuantity();           
    }); 
    it('Get selected product', function () {          
        createNewJobPage.storeProductLocal();    
    });
    it('enter Requested Ship Date', function () {          
        createNewJobPage.enterRequestedShipDate();           
    });
    it('Click on add line item', function () {          
        createNewJobPage.clickOnAddLineItemButton();           
    }); 
    it('Verify Product Added custom Product', function () { 
     reporter.appendTest('<b>Verifying added Custom Product to Job </b>', '***************************', "");                  
        createNewJobPage.verifyAddedProductToJob();           
    });

});

