// const { ActionSequence } = require("protractor");

// let ipromoteU_login = requirePage('LoginPage'),
//   jobsHomePage = requirePage('JobsHomePage'),
//   repeatJobPage = requirePage('RepeatJob'),
//   createNewJobPage = requirePage('CreateNewJob'),
//   presentaionPage = requirePage('PresentationPage'),
//   lineItemDetailsPage = requirePage('LineItemDetailsPage'),
 // commonAddProducts = requirePage('common_addProducts')

// var testName = 'TC001',
//   operatorName = csvProcessor.filterData(testName, 'OperatorName'),
//   password = csvProcessor.filterData(testName, 'Password'),
//   url = csvProcessor.filterData(testName, 'Url'),
//   num = Math.floor(Math.random() * 101)

// var currentDate = new Date(),
//     dd = currentDate.getDate(),
//     mm = currentDate.getMonth() + 1,//as January is 0
//     yyyy = currentDate.getFullYear(),
//     hour = currentDate.getHours(),
//     minute = currentDate.getMinutes(),
//     dateAndTimeStamp = dd + '' + mm + '' + yyyy + '' + hour + '' + minute,
//     repJobName= "RepeatJob_"+ dateAndTimeStamp;

// describe('Repeat job functionality :  ', function () {

//   appLogger.Log("************************ Execution Started ***************************");
//   appLogger.Log("************************ " + __filename + "***************************");

//   beforeEach(function () {

//     global.current_TestCase = "TC007-RepeatJob_CopyExistingLineitemAlternateAddressesRepeatJob.js";
//   });
//   it('Navigate iPROMOTEu url', function () {
//     ipromoteU_login.navigateToUrl(url);
//   });
//   it('Login with valid credentials and validate Jobs page', function () {
//     ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
//   });
//   it('Click on any one job for edit ', function () {
//     jobsHomePage.clickOnFirstJob();
//     Medium_Wait()
//   });
   //Add Product
 //    it('Click on add product button ', function () {
 //        addProductPage.clickOnAddProductButton();
 //    });
 //    it('Validate subway map ', function () {
 //        reporter.appendTest('<b>2. Product Source</b>', '*************', "");
 //        createNewJobPage.ValidateSubwayMap("2. Product Source");
 //    });
 //    it('Select Product', function () {
 //        createNewJobPage.clickOnProduct(sageProduct);
 //    });
 //    it('Validate subway map ', function () {
 //        createNewJobPage.ValidateSubwayMap("3. Select Products");
 //    });
 //    it('Search For Products', function () {
 //        createNewJobPage.searchWithKeywordSageProducts(keyword);
 //    });
 //    it('Get product information', function () {
 //        createNewJobPage.getProductInformationSAGELocal()
 //    });
 //    it('Click on order now button', function () {
 //        createNewJobPage.clickOnOrderNowButton();
 //    });
 //    it('Validate subway map ', function () {
 //        createNewJobPage.ValidateSubwayMap("4. Quantities");
 //    });
 //    it('Enter product quantity', function () {
 //        createNewJobPage.enterProductQuantity();
 //    });
 //    it('Get selected product', function () {
 //        lineItemDetailsPage.storeProductLocal();     //stores prouct name in lineItem
 //    });
 //    it('Click on add pricing button', function () {
 //        createNewJobPage.clickOnAddPricingButton();
 //    });
 //    it('Validate subway map ', function () {
 //        createNewJobPage.ValidateSubwayMap("5. Pricing & Dates");
 //    });
 //    it('enter Requested Ship Date', function () {
 //        lineItemDetailsPage.enterRequestedShipDate();
 //    });
 //    it('enter In hand Date', function () {
 //        lineItemDetailsPage.enterInHandDate();
 //    });
 //    it('Click on add line item', function () {
 //        createNewJobPage.clickOnAddLineItemButton();
 //    });
 //    //Select Added Product
 //    it('Store line item details', () => {
 //        lineItemDetailsPage.storeAddedLineItemDetailsFromTable()
 //    });
 //    it('Store stats of line item details', () => {
 //        lineItemDetailsPage.storeStatsOfLineItemFromTable()
 //    });
 //    it('Click Added Product to decorate ', function () {
 //        lineItemDetailsPage.selectAddedProduct()
 //    });
 //    it('Verify Displayed Product Details - Description, Vendor, PO status', () => {
 //        lineItemDetailsPage.verifyDisplayedProductDetails()
 //    });
 //    it('Click on down arrow next to Shipping details section', function () {
 //        lineItemDetailsPage.clickOnShippingDetailsSection();
 //    });
 //    it('Click on alternative shipping address', function () {
 //        lineItemDetailsPage.clickOnAddAlternateAddressButton();
 //    });
 //    it('Enter address details ', function () {
 //        jobsHomePage.enterAlternativeAddressDetails(contactName,address1,address2,city,state,zipCode);
 //    });
 //    it('Click on submit button', function () {
 //        jobsHomePage.clickOnSubmitButton();
 //    });
 //    it('Validate updated shipping address', function () {
 //        createNewJobPage.verifyAlternateShippingAdsressCard(contactName,address1,address2);
 //    });
 // Need to resolve line item details "Update" issue
 // // Need to add Steps 
// })