let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage'),
addProductPage=requirePage('addProduct')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product');

describe('AddProductSource-TC04', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
       
        global.current_TestCase = "TC004-AddProductSource_FilterWithSuppliers";
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
        createNewJobPage.clickOnProduct(product);           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Select Products");           
    }); 

    it('Click on Categories filter', function () {          
        createNewJobPage.clickOnSuppliers();           
    });
    it('Click on +More link', function () {          
        createNewJobPage.clickOnMoreLink();           
    });
    it('Select one or more categories',function(){
        createNewJobPage.clickOnSuppliers()
    })
    it('Click on -Less link', function () {          
        createNewJobPage.clickOnLessLink()        
    });
    it('Remove the selected categories',function(){
        createNewJobPage.removeSelectedProducts(); 
    })



});

