let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
lineitemdetails= requirePage('LineItemDetailsPage'),
createNewJobPage=requirePage('CreateNewJob'),
addProductPage=requirePage('addProduct')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
masterCode = csvProcessor.filterData(testName, 'MasterCode'),
url  = csvProcessor.filterData(testName, 'Url'),
keyword='Blazer',
sageProduct= 'Sage Products';
var currentDate = new Date(),
    dd = currentDate.getDate(),
    mm = currentDate.getMonth() + 1,//as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateAndTimeStamp = dd+''+mm+''+yyyy+''+hour+''+minute;

describe('Validate Line Item Details page',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase  = "TC003-LineItemDetails-ASI_UpdateLineItemDetilsAndValidateByClosing";
      });
    
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });

    it('Click on any one job for edit ', function () {
        jobsHomePage.clickOnFirstJob();
        //   lineitemdetails.clickOnFirstLineItemDesc()
    });
//Add Product
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
        createNewJobPage.searchWithKeywordSageProducts(keyword);           
    });
    it('Click on order now button', function () {          
        createNewJobPage.clickOnOrderNowButton();           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("4. Quantities");           
    }); 
    it('Enter product quantity', function () {          
        createNewJobPage.enterProductQuantity();           
    }); 
    it('Get selected product', function () {          
        lineitemdetails.storeProductLocal();     //stores prouct name in lineItem
    });
    it('Click on add pricing button', function () {          
        createNewJobPage.clickOnAddPricingButton();           
    }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("5. Pricing & Dates");           
    }); 
    it('enter Requested Ship Date', function () {          
        lineitemdetails.enterRequestedShipDate();           
    });
    it('Click on add line item', function () {          
        createNewJobPage.clickOnAddLineItemButton();           
    }); 

    //Select Added Product   
    it('Store line item details', ()=>{
        lineitemdetails.storeAddedLineItemDetailsFromTable()
    }); 
    it('Click Added Product to decorate ', function () {
        lineitemdetails.selectAddedProduct();
    });
    
    //shipping
    it('Click on down arrow next to Shipping details section',function(){
        lineitemdetails.clickOnShippingDetailsSection();
    });
    it('Clear Alternative Address If Exist',function(){
        lineitemdetails.clearAlternativeAddressIfExist();
    });
    it('Click on alternative shipping address', function(){
        lineitemdetails.clickOnAddAlternateAddressButton();
    });
    it('Enter name', function(){
        lineitemdetails.enterAlternateAddressName();
    });
    it('Select Sate', function(){
        lineitemdetails.selectStateDrop();
    });
    it('Select zipCode', function(){
        lineitemdetails.enterZipCode();
    });
    it('Click on submit button', function(){
        lineitemdetails.clickOnSubmitButton();
    });
    it('Verify Updated Address Card', function(){
        lineitemdetails.verifyUpdatedAddressCard();
    }); 
//update
    it('Click on Close button', function(){
        lineitemdetails.clickOnCloseButton();
    });

//Script issue- Application is not getting refreshed automatically after clicking submit button, but happening manually.
//Need to Uncomment following validation only after the above resolved.

// // Validate Line item details page 
//    it('Select updated product', function(){
//        lineitemdetails.selectAddedProduct();
//     });
// // verify updated Shipping customer details
//     it('Click on down arrow next to Shipping details section',function(){
//         lineitemdetails.clickOnShippingDetailsSection();
//     });
//     it('Verify Updated Address Card', function(){
//         lineitemdetails.verifyUpdatedAddressCardNotToBePresent();
//     });

});