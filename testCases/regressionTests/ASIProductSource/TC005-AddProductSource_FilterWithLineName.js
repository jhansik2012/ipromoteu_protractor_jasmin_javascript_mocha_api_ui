let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage'),
addProductPage=requirePage('addProduct')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product');

describe('AddProductSource-TC05', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
       
        global.current_TestCase = "TC005-AddProductSource_FilterWithLineName";
      });
    
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
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

    it('Click on line name filter', function () {          
        createNewJobPage.clickOnLineName();           
    });
    it('Click on +More link', function () {          
        createNewJobPage.clickOnMoreLink();           
    });
    it('Select one or more line name',function(){
        createNewJobPage.clickOnLineName()
    })
    it('Click on -Less link', function () {          
        createNewJobPage.clickOnLessLink()        
    });
    it('Remove the selected categories',function(){
        createNewJobPage.removeSelectedProducts(); 
    })

});

