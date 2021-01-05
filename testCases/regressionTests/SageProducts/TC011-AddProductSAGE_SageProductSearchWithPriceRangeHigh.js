let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage'),
addProductPage=requirePage('addProduct')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
sageProduct= 'Sage Products',
LowPrice=2,
HighPrice=3,
quickSeacrhKey='Books';


xdescribe('Add Product', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () { 
        global.current_TestCase = "TC011-SAGEProducts_SageProductSearchWithPriceRangeHigh"
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
        createNewJobPage.clickOnProduct(sageProduct);           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Select Products");           
    }); 
    it('Search For Products', function () {          
        createNewJobPage.searchWithCategorySageProducts(quickSeacrhKey);           
    });
    it('Click on Advance filter', function () {          
        addProductPage.clickOnAdvanceSeacrhButton();       
    });
    it('Search from low price range', function () {          
        addProductPage.selectHighPriceRange(HighPrice);     //Some sample SPC    
    });
    it('Verify with given price range', function () {          
        addProductPage.verifyGivenPriceHighRange(HighPrice);  
    });
});

