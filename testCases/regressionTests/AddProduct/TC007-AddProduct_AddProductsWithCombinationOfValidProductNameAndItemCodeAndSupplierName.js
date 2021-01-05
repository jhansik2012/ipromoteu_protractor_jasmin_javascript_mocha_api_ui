let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage'),
addProductPage=requirePage('addProduct')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product  = csvProcessor.filterData(testName, 'Product');

describe('Add Product', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
       
        global.current_TestCase = "TC007-AddProduct_AddProductsWithCombinationOfValidProductNameAndItemCodeAndSupplierName";
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

    it('Search For Products', function () {          
        createNewJobPage.searchProducts("Shirts");           
    });
    it('Search For Products', function () {          
        createNewJobPage.searchSupplier("Hanes Ecosmart® Jersey Sport Shirt");           
    });
     it('Search For Products', function () {          
        createNewJobPage.searchItemCode("054X");           
    });
    // it('Select Products', function () {          
    //     createNewJobPage.selectItems();   //Functionality not present     
    // });

     it('Store product information',function(){
        createNewJobPage.getProductInformationASI()
    })
    
    it('Click on order now button', function () {          
        createNewJobPage.clickOnOrderNowButton();           
    });
    
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("4. Quantities");           
    });

    it('Validate product name ', function () {          
        createNewJobPage.verifyProductInformationProductNameASI();           
    });

    it('Validate product code', function () {          
        createNewJobPage.verifyProductInformationCodeASI();           
    });

    it('Validate product vendor code', function () {          
        createNewJobPage.verifyProductInformationVendorNameASI();           
    }); 

    it('Enter product quantity', function () {          
        createNewJobPage.enterProductQuantity();           
    }); 

    it('Click on add pricing button', function () {          
        createNewJobPage.clickOnAddPricingButton();           
    }); 

    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("5. Pricing & Dates");           
    }); 

    it('Validate product name ', function () {          
        createNewJobPage.verifyProductInformationProductNameASI();           
    });

    it('Validate product code', function () {          
        createNewJobPage.verifyProductInformationCodeASI();           
    });

    it('Enter enterRequestedShipDate',function(){
        createNewJobPage.enterRequestedShipDate()
    })

    it('Enter in hand date', function () {          
        createNewJobPage.enterInHandDate();           
    });
    it('Enter product cost',function(){
        // createNewJobPage.enterProductCost("6")
    });
    it('Enter product price',function(){
        createNewJobPage.enterProductPricing()
    })

    it('Verify Do Not show customer option check boxes',function(){
        createNewJobPage.verifyDoNotShowCustomersOptionCheckBoxeItemNumbers()
    })

    it('Verify Do Not show customer option check boxes',function(){
        createNewJobPage.verifyDoNotShowCustomersOptionCheckBoxeQuantitiePricing()
    })

    it('Verify Do Not show customer option check boxes',function(){
        createNewJobPage.verifyDoNotShowCustomersOptionCheckBoxeSetupCostsExtraFees()
    })

    it('Click on add line item', function () {          
        createNewJobPage.clickOnAddLineItemButton();           
    }); 

});

