let ipromoteU_login = requirePage('LoginPage'),
createNewJobPage=requirePage('CreateNewJob'),
jobsHomePage=requirePage('JobsHomePage'),
addProductPage=requirePage('addProduct')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
sageProduct= 'Sage Products',
keyword="Yoga Mat",
supplier= "Hit Promotional Products",
itemCode= "2570",
category= "Compact Discs",
SPC= "OANNB-NTHJW",
theme= "Children",
color="Red",
keyword2= 'Jacket',
itemName='Sweatshirt',
LowPrice=2,
HighPrice=5;

describe('Add Product', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
       
        global.current_TestCase = "TC001-SAGEProducts_SageProductwithProductName";
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
        addProductPage.clickOnAdvanceSeacrhButton();       
    });

//Quick search
    it('Search For Products', function () { 
    reporter.appendTest('<b>TC001-AddProductSAGE_SageProductQuickSearch</b>','Verifying "Quick Search field"', "");                 
        createNewJobPage.quickSearchSageProducts(keyword);           
    });
    it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    // it('Select Products', function () {          
    //     createNewJobPage.selectItems();           
    // });  //depricated
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyLineItemNameinTitle(keyword);  
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       createNewJobPage.quickSearchSageProducts('');           
    });

//Supplier
    it('Search For Products', function () {          
    reporter.appendTest('<b>TC002-AddProductSAGE_SageProductSearchWithSuplier</b>','Verifying "Supplier search field"', "");                 
        createNewJobPage.SupplierSageProducts(supplier);           
    });
    it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyAllItemSupplier(supplier);  
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       createNewJobPage.SupplierSageProducts('');           
    });

//Item code
    it('Search For Products', function () {          
    reporter.appendTest('<b>TC003-AddProductSAGE_SageProductSearchWithItemCode</b>','Verifying "Item code field"', "");                 
       createNewJobPage.itemCodeSageProducts(itemCode);           
    });
    it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyAllItemItemCode(itemCode);  
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       createNewJobPage.itemCodeSageProducts('');           
    });

//Keyword search  
    it('Search For Products', function () {          
     reporter.appendTest('<b>TC004-AddProductSAGE_SageProductSearchWithKeyword</b>','Verifying "Keyword search field"', "");                 
       createNewJobPage.searchWithKeywordSageProducts(keyword2);           
    });
    it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyLineItemNameinTitle(keyword2);  
    });
    it('Search For Products', function () {          
      reporter.appendTest('Clearing field', '*************', "");        
        createNewJobPage.searchWithKeywordSageProducts('');           
    });

//Category
    it('Search For Products', function () {          
     reporter.appendTest('<b>TC005-AddProductSAGE_SageProductSearchWithCategory</b>','Verifying "Category search field"', "");                 
        createNewJobPage.searchWithCategorySageProducts(category);           
    });
     it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyLineItemNameinTitle(category);  
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       createNewJobPage.searchWithCategorySageProducts('');           
    });

//Theme
    it('Search For Products', function () {          
     reporter.appendTest('<b>TC006-AddProductSAGE_SageProductSearchWithTheme</b>','Verifying "Theme search field"', "");                 
        createNewJobPage.searchWithThemeSageProducts(theme);           
    });
     it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyLineItemNameinTitle(theme);  
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       createNewJobPage.searchWithThemeSageProducts('');           
    });

//Color
    it('Search For Products', function () {          
    reporter.appendTest('<b>TC007-AddProductSAGE_SageProductSearchWithColor</b>','Verifying "Color search field"', "");                 
        addProductPage.searchWithColorSageProducts(color);       
    });
     it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Select First Product', function () {          
        addProductPage.selectFirstProduct();       
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyColor(color);
    });
     it('Click on Close button', function () {          
        addProductPage.clickCloseButton();
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       addProductPage.searchWithColorSageProducts('');           
    });

//Item Name
   it('Search For Products', function () {          
    reporter.appendTest('<b>TC008-AddProductSAGE_SageProductSearchWithItemName</b>','Verifying "Item name search field"', "");                 
        addProductPage.searchWithItemNameSageProducts(itemName);          
    });
   it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyLineItemNameinTitle(itemName);  
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       addProductPage.searchWithItemNameSageProducts('');           
    });

//SPC
    it('Search For Products', function () {          
     reporter.appendTest('<b>TC009-AddProductSAGE_SageProductSearchWithSPC</b>','Verifying "SPC search field"', "");                 
        addProductPage.searchWithSPCSageProducts(SPC);     //Some sample SPC    
    });
    it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Select First Product', function () {          
        addProductPage.selectFirstProduct();       
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyGivenSPC(SPC);  
    });
    it('Click on Close button', function () {          
        addProductPage.clickCloseButton();
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       addProductPage.searchWithSPCSageProducts('');           
    });

//Price range Low

    it('Search from low price range', function () {          
     reporter.appendTest('<b>TC010-AddProductSAGE_SageProductSearchWithPriceRangeLow</b>','Verifying "Low Price search field"', "");                 
        addProductPage.selectLowPriceRange(LowPrice);     //Some sample SPC    
    });
    it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Verify with given price range', function () {          
        addProductPage.verifyGivenPriceLowRange(LowPrice);  
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       addProductPage.selectLowPriceRange('');           
    });


//Price range Low

    it('Search from low price range', function () {          
     reporter.appendTest('<b>TC011-AddProductSAGE_SageProductSearchWithPriceRangeHigh</b>','Verifying "High Price search field"', "");                 
        addProductPage.selectHighPriceRange(HighPrice);     //Some sample SPC    
    });
    it('click on Search button', function () {          
        addProductPage.clickOnSearchButton();  
    });
    it('Verify with given price range', function () {          
        addProductPage.verifyGivenPriceLowRange(HighPrice);  
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing field', '*************', "");        
       addProductPage.selectHighPriceRange('');           
    });

//Verified
    it('Select Verified filter', function () {          
    reporter.appendTest('<b>TC012-AddProductSAGE_SageProductSearchWithVerified</b>','Verifying "Verified filter"', "");                 
        addProductPage.clickOnVerifiedFilter();        
    });
    it('Click on Seacrh Button', function () {          
        addProductPage.clickOnSearchButton();       
    });
    it('Select First Product', function () {          
        addProductPage.selectFirstProduct();       
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyVerifiedTag();  
    });
    it('Click on Close button', function () {          
        addProductPage.clickCloseButton();
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing Selected filter', '*************', "");        
       addProductPage.clickOnVerifiedFilter();           
    });

//Env Friendly
    it('Select Verified filter', function () {          
    reporter.appendTest('<b>TC013-AddProductSAGE_SageProductSearchWithEnvironmentalFriendly</b>','Verifying "Env Friendly filter"', "");                 
        addProductPage.clickOnenvFriendlyCheckBox();        
    });
    it('Click on Seacrh Button', function () {          
        addProductPage.clickOnSearchButton();       
    });
    it('Select First Product', function () {          
        addProductPage.selectFirstProduct();       
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyEnvFriendlyTag();  
    });
    it('Click on Close button', function () {          
        addProductPage.clickCloseButton();
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing Selected filter', '*************', "");        
       addProductPage.clickOnenvFriendlyCheckBox();           
    });

//Recyclable
    it('Select Verified filter', function () {          
     reporter.appendTest('<b>TC014-AddProductSAGE_SageProductSearchWithRecyclable</b>','Verifying "Recyclable filter"', "");                 
        addProductPage.clickOnRecyclable();        
    });
    it('Click on Seacrh Button', function () {          
        addProductPage.clickOnSearchButton();       
    });
    it('Select First Product', function () {          
        addProductPage.selectFirstProduct();       
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyRecyclableTag();  
    });
    it('Click on Close button', function () {          
        addProductPage.clickCloseButton();
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing Selected filter', '*************', "");        
       addProductPage.clickOnRecyclable();           
    });

   // New Product //validation point is not known
    it('Select Verified filter', function () {          
        reporter.appendTest('<b>TC015-AddProductSAGE_SageProductSearchWithNewProduct</b>', 'Verifying "Verified filter" ',"");        
         reporter.appendTest('Verification point is not known', '*************', "");                 
        // addProductPage.clickOnNewProduct();        
    });
    // it('Click on Search Button', function () {          
    //     addProductPage.clickOnSearchButton();       
    // });
    // it('Select First Product', function () {          
    //     addProductPage.selectFirstProduct();       
    // });
    // //validation point/section is not known 
    // // it('Select First Product', function () {          
    // //     addProductPage.selectFirstProduct();       
    // // });
    // it('Click on Close button', function () {          
    //     addProductPage.clickCloseButton();
    // });
    // it('Search For Products', function () {          
    //  reporter.appendTest('Clearing Selected filter', '*************', "");        
    //    addProductPage.clickOnVerifiedFilter();           
    // });

// //Union Group //validation point is not known
    it('Select Verified filter', function () {          
        reporter.appendTest('<b>TC016-AddProductSAGE_SageProductSearchWithUnionGroup</b>', 'Verifying "Union group filter" ',"");        
         reporter.appendTest('Verification point is not known', '*************', "");                 
        // addProductPage.clickOnunionShopCheckBox();        
    });
//     it('Click on Search Button', function () {          
//         addProductPage.clickOnSearchButton();       
//     });
//     it('Select First Product', function () {          
//         addProductPage.selectFirstProduct();       
//     });
//     it('Verify with given filter keyword', function () {          
//         addProductPage.verifyVerifiedTag();  
//     });
//     it('Click on Close button', function () {          
//         addProductPage.clickCloseButton();
//     });
//     it('Search For Products', function () {          
//      reporter.appendTest('Clearing Selected filter', '*************', "");        
//        addProductPage.clickOnVerifiedFilter();           
//     });

// //All Audience  //validation point is not known
    it('Select Verified filter', function () {          
     reporter.appendTest('<b>TC017-AddProductSAGE_SageProductSearchWithAllAudience</b>', 'Verifying "All audience filter"',"");        
         reporter.appendTest('Verification point is not known', '*************', "");                 
          // addProductPage.clickOnAllAudiencesCheckBox();        
     });
//     it('Click on Search Button', function () {          
//         addProductPage.clickOnSearchButton();       
//     });
//     it('Select First Product', function () {          
//         addProductPage.selectFirstProduct();       
//     });
//     it('Verify with given filter keyword', function () {          
//         addProductPage.verifyVerifiedTag();  
//     });
//     it('Click on Close button', function () {          
//         addProductPage.clickCloseButton();
//     });
//     it('Search For Products', function () {          
//      reporter.appendTest('Clearing Selected filter', '*************', "");        
//        addProductPage.clickOnVerifiedFilter();           
//     });

//Production days
    it('Select Verified filter', function () {          
    reporter.appendTest('<b>TC018-AddProductSAGE_SageProductSearchWithProductionDays</b>','Verifying "Verified filter"', "");                 
        addProductPage.enterProductionDays(10);        
    });
    it('Click on Search Button', function () {          
        addProductPage.clickOnSearchButton();       
    });
    it('Select First Product', function () {          
        addProductPage.selectFirstProduct();       
    });
    it('Verify with given filter keyword', function () {          
        addProductPage.verifyProductionDays(10);  
    });
    it('Click on Close button', function () {          
        addProductPage.clickCloseButton();
    });
    it('Search For Products', function () {          
     reporter.appendTest('Clearing Selected filter', '*************', "");        
       addProductPage.enterProductionDays('');           
    });

//Sort Low to high
    it('Click on Sort Drop Down', function () {          
     reporter.appendTest('<b>TC019-AddProductSAGE_SageProductSearchWithSort_Price_LowToHigh</b>','Verifying "Sort Low to High filter"', "");                 
        addProductPage.clickOSortDropDown();           
    });
    it('Select Sort- Price Sorting in Lowest to Highest', function () {          
        addProductPage.selectPriceLowToHigh();           
    });
    it('Verify Displayed List ', function () {          
        addProductPage.verifySortPriceLowtoHigh();           
    });

//Sort high to Low
    it('Click on Sort Drop Down', function () {          
    reporter.appendTest('<b>TC020-AddProductSAGE_SageProductSearchWithSort_Price_Hihesttolowest</b>','Verifying "Sort High to low filter"', "");                 
        addProductPage.clickOSortDropDown();           
    });
    it('Select Sort- Price Sorting in Lowest to Highest', function () {          
        addProductPage.selectPriceHighToLow();           
    });
    it('Verify Displayed List ', function () {          
        addProductPage.verifySortPriceHightoLow();           
    });

// //Sort on criteria  //Validation point is unkown
    it('Click on Sort Drop Down', function () {          
      reporter.appendTest('<b>TC</b>', 'Verifying "Sort High to low filter"',"");        
        reporter.appendTest('Verification point is not known', '*************', "");                 
   // addProductPage.clickOSortDropDown();           
    });
//     it('Select Sort- Price Sorting in Lowest to Highest', function () {          
//         addProductPage.selectBestMatchBasedOnCriteria();           
//     });
//     it('Verify Displayed List ', function () {          
//         addProductPage.verifySortPriceHightoLow();           
//     });

// //Sort on preference //Validation point is unkown
    it('Click on Sort Drop Down', function () {          
       reporter.appendTest('<b>TC021-AddProductSAGE_SageProductSearchWithSort_BestMatchBasedCriteria</b>', 'Verifying "Sort on preference"',"");        
         reporter.appendTest('Verification point is not known', '*************', "");                 
      // addProductPage.clickOSortDropDown();           
    });
//     it('Select Sort- Price Sorting in Lowest to Highest', function () {          
//         addProductPage.selectPreferenceGroup();           
//     });
//     it('Verify Displayed List ', function () {          
//         addProductPage.verifySortPriceHightoLow();           
//     });

// //Sort on Popularity //Validation point is unkown
    it('Click on Sort Drop Down', function () {          
        reporter.appendTest('<b>TC022-AddProductSAGE_SageProductSearchWithSort_IntermsOfPopularity</b>', 'Verifying "Sort on Popularity"',"");        
         reporter.appendTest('Verification point is not known', '*************', "");                 
              // addProductPage.clickOSortDropDown();           
    });
//     it('Select Sort- Price Sorting in Lowest to Highest', function () {          
//         addProductPage.selectPopularity();           
//     });
//     it('Verify Displayed List ', function () {          
//         addProductPage.verifySortPriceHightoLow();           
//     });


    it('Get product information',function(){
     reporter.appendTest('<b>Adding SAGE Product into Job</b>','**********************', "");                 
       createNewJobPage.getProductInformationSAGELocal()
    })
    it('Click on order now button', function () {          
        createNewJobPage.clickOnOrderNowButton();           
    });
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("4. Quantities");           
    });
    it('Validate product name ', function () {          
        createNewJobPage.verifyProductInformationProductNameSAGE();           
    });
    it('Validate product code', function () {          
        createNewJobPage.verifyProductInformationCodeSAGE();           
    });
    it('Validate product vendor code', function () {          
        createNewJobPage.verifyProductInformationVendorNameSAGE();           
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
        createNewJobPage.verifyProductInformationProductNameSAGE();           
    });
    it('Validate product code', function () {          
        createNewJobPage.verifyProductInformationCodeSAGE();           
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

