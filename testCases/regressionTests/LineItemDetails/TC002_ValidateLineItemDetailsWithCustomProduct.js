let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
lineitemdetails= requirePage('LineItemDetailsPage'),
createNewJobPage=requirePage('CreateNewJob'),
addProductPage=requirePage('addProduct')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
masterCode = csvProcessor.filterData(testName, 'MasterCode'),
quickKeyword= 'N95',
sageProduct= 'Sage Products',
customProduct= "N95 Face Mask",
source= 'Custom Products';
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
        global.current_TestCase  = "TC002-LineItemDetails_ValidateProductDetailsInLineItemDetails";
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
    reporter.appendTest('Selecting Product source', 'Selecting <b>Custom Products</b>', "");         
        createNewJobPage.clickOnProduct(source);           
     }); 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("2. Select Product");           
     }); 
    // it('Search For Products', function () {  
    //  reporter.appendTest('Searching Custome Product', 'Searching with Product Name keyword: "Poster" ', "");                  
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
        lineitemdetails.storeProductLocal();     //stores prouct name in lineItem variable
    });
    it('enter Requested Ship Date', function () {          
        lineitemdetails.enterRequestedShipDate();           
    });
    it('enter In hand Date', function () {          
        lineitemdetails.enterInHandDate();           
    });
    it('Click on add line item', function () {          
        createNewJobPage.clickOnAddLineItemButton();           
    }); 

    //Select Added Product
    it('Store line item details', ()=>{
        lineitemdetails.storeAddedLineItemDetailsFromTable()
    });
    it('Store stats of line item details', ()=>{
        lineitemdetails.storeStatsOfLineItemFromTable()
    });
    it('Click Added Product to decorate ', function () {
        lineitemdetails.selectAddedProduct();
    });
    it('Verify Displayed Product Details - Description, Vendor, PO status', ()=>{
        lineitemdetails.verifyDisplayedProductDetails()
    });
    it('Verify view decoration button', ()=>{
        lineitemdetails.verifyviewdecorateIsDisplayed()
    }); 
    it('Verify Product Details section - Description, Vendor, color, size', ()=>{
        lineitemdetails.verifyProductDetailsFieldsValue()
    });
    it('validate Fields', function(){
        // lineitemdetails.verifyProductDetailsFieldsEnabled(); //clarification required on fuctionality
    });

    //update custom desc section
    it('Click on Custom Description tab',function(){
        // lineitemdetails.clickOnCustomDescription(); clarification needed on expected behaviour of fields
    });
    it('Validate Quote Value is able to edit', function(){
        // lineitemdetails.verifyDescriptionFieldsIsEditable("Desc1_"+dateAndTimeStamp, "Desc2_"+dateAndTimeStamp, "Desc3_"+dateAndTimeStamp);
    });

    //shipping
    it('Click on down arrow next to Shipping details section',function(){
        lineitemdetails.clickOnShippingDetailsSection();
    });
    it('Validate Shipping information is displayed', function(){
        lineitemdetails.verifyDateFields();
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
    
    //vendor
    it('Click on down arrow next to Vendor details section',function(){
        lineitemdetails.clickOnVendorDetailsSection();
    });
    it('Validate Vendor information is displayed', function(){
        lineitemdetails.verifyVendorDetails();
    });
    it('Validate Quote Value is able to edit', function(){
        lineitemdetails.enterVendorQuoteIsEdiTable("Quote_"+dateAndTimeStamp);
    });
    it('validate User is able to enter Additional Info For Customer', function(){
        lineitemdetails.enterAdditionalInfoiseditable("AdditionalInfo_"+dateAndTimeStamp);
    });

    // advanced details section
    it('Click on down arrow next to Advanced details section',function(){
        lineitemdetails.clickOnAdvancedDetailsSection();
    });
    it('Validate User is able to enter Customer Item Number', function(){
        lineitemdetails.enterCustomerItemNumberField("Customer Item_"+dateAndTimeStamp);
    });
    it('Validate User is able to enter Customer Cost Center', function(){
        lineitemdetails.enterCustomerCostCenter('Massachussets,USA_'+dateAndTimeStamp);
    });
    it('validate User is able to enter Additional Info for customer',function(){
        lineitemdetails.enterAdditionalInfo('Contact: service@IpromoteU.com_'+dateAndTimeStamp);
    });

    //Customer stats field
    it('validate User is able to enter customer Shipped  value and only numbers', function(){
     reporter.appendTest('<b>Verifying Customer Stat fields</b>', "*******************************", "PASS");
        lineitemdetails.verifyCustomerShippedValueIsAbleToEnterWithonlyNumbers();
    });
    it('validate User is able to enter customer Ordered value and only numbers', function(){
        lineitemdetails.verifyCustomerOrderedValueIsAbleToEnterWithonlyNumbers();
    });
    it('Validate User is able to enter customer Price value and only numbers and special characters', function(){
        lineitemdetails.verifyCustomerPriceValueIsAbleToEnterWithonlyNumbers();
    });
    it('Validate User is able to enter customer UOM value', function(){
        lineitemdetails.verifyCustomerUOMisEditable();
    }); 

   //vendor stat
    it('validate User is able to enter Vendor Shipped  value and only numbers', function(){
     reporter.appendTest('<b>Verifying Vendor Stat fields</b>', "*******************************", "PASS");
        lineitemdetails.verifyVendorShippedValueIsAbleToEnterWithonlyNumbers();
    });
    it('validate User is able to enter Vendor Ordered value and only numbers', function(){
        lineitemdetails.verifyVendorOrderedValueIsAbleToEnterWithonlyNumbers();
    });
    it('Validate User is able to enter Vendor Cost value and only numbers and special characters', function(){
        lineitemdetails.verifyVendorCostValueIsAbleToEnterWithonlyNumbers();
    });
    it('Validate User is able to enter Vendor UOM value', function(){
        lineitemdetails.verifyVendorUOMValueIsEditable();
    });
    it('Validate User is not able to alter Product margin', function(){
        lineitemdetails.verifyProfitMarginField();
    });
    it('Validate User is able to enter Original PO cost', function(){
        lineitemdetails.verifyOriginalPoCostIsOnlyReadable();
    });
    it('Validate Profit margin value', function(){
        lineitemdetails.verifyProfitMarginFieldValue();
    });  

//update
    it('Click on update button', function(){
        lineitemdetails.clickOnModalPopupUpdateButton();
    });

//Script issue- Application is not getting refreshed automatically after clicking submit button, but happening manually.
//Need to Uncomment following validation only after the above resolved.

//validate line item 
    // it('validate Updated Stats Of LineItem', function(){
    //     lineitemdetails.validateUpdatedStatsOfLineItem();
    // });
//Validate Financial snapshot 
    // it('Validate Customer Price calculation', function(){
    //  reporter.appendTest('Verifying <b>Customer Price</b> calculation', 'Customer Price in financial snapshot should be equal to the product of "Qty" and "Price" under Customer price column of all the line items in a job  ', "");
    //     jobsHomePage.validateCustomerPriceAccordingAllList();
    // });
    // it('Validate User Cost calculation', function(){
    //  reporter.appendTest('Verifying <b>Your cost</b> calculation', 'Your Cost in financial snapshot should be equal to the product of "Qty" and "Price" under Your cost column of all the line items in a job  ', "");
    //    jobsHomePage.validateUserPriceAccordingAllList();
    // }); 
//validate custom description
   

//Validate Line item details page 
   // it('Select updated product', function(){
   //     lineitemdetails.selectAddedProduct();
   //  });
//verify updated custom description details  
    // it('Click on Custom Description tab',function(){
    //     // lineitemdetails.clickOnCustomDescription();
    // });
    // it('Validate updated custom description details', function(){
    //     // lineitemdetails.verifyUpdateDecriptionFields();
    // });
//verify updated Shipping customer details
    // it('Click on down arrow next to Shipping details section',function(){
    //     lineitemdetails.clickOnShippingDetailsSection();
    // });
    // it('Verify Updated Address Card', function(){
    //     lineitemdetails.verifyUpdatedAddressCard();
    // });
//verify updated vendor details
    // it('Click on down arrow next to Vendor details section',function(){
    //     lineitemdetails.clickOnVendorDetailsSection();
    // });
    // it('Validate updated product', function(){
    //      lineitemdetails.verifyUpdateVendorDetials();
    // }); 
//verify updated Advanced details 
    // it('Click on down arrow next to Advanced details section',function(){
    //     lineitemdetails.clickOnAdvancedDetailsSection();
    // });
    // it('Verify updated details', function(){
    //     lineitemdetails.verifyUpdateAdvancedDetials();
    // });

});