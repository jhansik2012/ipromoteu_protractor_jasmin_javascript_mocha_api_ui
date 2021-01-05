// let CreateNewJob_Ipromoteu = function(){
'use strict';

const { element } = require("protractor");

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
    random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
    //***************************** Page Objects *************************************//

    createJobButton = element(by.xpath("//button[text()='CREATE JOB']")),
    nextButton = element(by.xpath("//*[text()='Next']")),
    previousButton = element(by.xpath('//*[@class="btn-cta text-uppercase btn-secondary btn btn-primary"][text()="Previous"]')),
    createJobHeader = element(by.xpath("//h5[contains(text(),'Create New Job')]")),
    subwayHighlightText = element(by.xpath("//button[@class='stepper__head stepper__head--active']//span[@class='stepper__head__title']")),
    closebutton = element(by.xpath("//button[@class='close']")),
    companyCode = element(by.xpath("//input[@placeholder='Name or Company Code']")),
    selectCustomer = element(by.xpath("//div[@class='input-group']/div/button")),
    shippingCustomerMenu = element(by.xpath("//button[contains(text(),'Shipping Customer')]")),
    billingCustomerMenu = element(by.xpath("//button[contains(text(),'Shipping Customer')]")),
    nameOrCompanyCodeSearchIcon = element(by.css("[class='MuiSvgIcon-root']")),
    nameOrCompanyCode = element(by.css("[placeholder='Name or Company Code']")),
    jobName = element(by.id("jobname")),
    saveAndExistLink = element(by.xpath("//*[text()='Save and Exit']")),
    closeEditPopup = element(by.css('[class="close"]')),
    createdJobName = element(by.css('[class="d-block company-description"]')),
    createdJobId = element(by.css('[class="d-inline-block job-title"]')),
    pricing = element.all(by.xpath('//*[@class="table"]//*[contains(@class," input-number-wrap full-width1")]/input')), //get(1),(3)...
    cost = element.all(by.css('[class="table"] [class="is-filled input-number-wrap full-width1"] input')),
    addLineItemButton = element(by.xpath("//button[text()='Add Line Item']")),
    lineItemsPresentInTheTable = element.all(by.css('[class="tab-pane active"] [class="text-primary font-weight-bold text-break clickable"]')),
    selectButton = element(by.xpath("//button[text()='SELECT']")),
    minCostObject = element(by.xpath("//th[text()='Min Cost']/../following::tbody//td[4]//input")),
    maxCostObject = element(by.xpath("//th[text()='Max Cost']/../following::tbody//td[4]//input")),
    rushAndSampleJobColumn = element.all(by.xpath("//span[text()='Sample / Rush']/../../../../following-sibling::div/div/div[*]/div[1]/div[2]/p")).get(0), //getting status of first job
    backToJobList = element(by.xpath("//span[text()='Back to Jobs List']/parent::a")),
    customerDetails = element(by.xpath("(//button[text()='Shipping Customer'])[1]")),
    shippingCustomer = element(by.xpath("(//button[text()='Shipping Customer'])[2]")),
    billingCustomer = element(by.buttonText("Billing Customer")),
    shippingCustomerDetails = element.all(by.xpath("//label[text()='SHIPPING CUSTOMER']/../following-sibling::div/div/*")),
    billingCustomerDetails = element.all(by.xpath("//label[text()='BILLING CUSTOMER']/../following-sibling::div/div/*")),
    orderingContact = element(by.xpath("//label[text()='ORDERING CONTACT']/following-sibling::div/div/div/div[1]")),
    shippingContact = element(by.xpath("//label[text()='SHIPPING CONTACT']/following-sibling::div/div/div/div[1]")),
    invoicingContact = element(by.xpath("//label[text()='INVOICING CONTACT']/following-sibling::div/div/div/div[1]")),
    arContact = element(by.xpath("//label[text()='AR CONTACT']/following-sibling::div/div/div/div[1]")),
    defaultPlaceHolder = element.all(by.xpath("//label[contains(text(),'CONTACT')]/following-sibling::div//div[text()='Select...']")),
    salesRepField = element(by.xpath("(//label[text()='Sales Rep'])[2]/following-sibling::div//input")),
    defaultSalesRepPlaceHolder = element(by.xpath("//label[text()='Sales Rep'])[2]/following-sibling::div//div[text()='Select...'](//label[text()='Sales Rep'])[2]/following-sibling::div//div[text()='Select...']")),
    salesRepValue = element(by.xpath("(//label[text()='Sales Rep'])[2]/following-sibling::div/div/div/div[1]")),
    jobIdInDetailsPage = element(by.css('[class="job-status-area columns"] strong')),
    statusInDetailsPage = element.all(by.xpath('//div[@class="job-status-area columns"]/span')),
    keywordSearchCustomProducts = element(by.xpath("//label[text()='keyword search']/following-sibling::div//input")),
    searchButton = element(by.buttonText("SEARCH")),
    addProductButton = element(by.buttonText("ADD PRODUCT")),
    shippingCustomerCloseCard = element(by.xpath("//label[text()='SHIPPING CUSTOMER']/following-sibling::div/button")),
    billingCustomerCloseCard = element(by.xpath("//label[text()='BILLING CUSTOMER']/following-sibling::div/button")),
    alternativeCustomerCloseCard = element.all(by.xpath("//label[text()='Alternate Shipping Address']/following-sibling::div/button")),
    shippingCustomerNameCard = element.all(by.xpath("//label[text()='SHIPPING CUSTOMER']/following-sibling::div/div/div")),
    billingCustomerNameCard = element.all(by.xpath("//label[text()='BILLING CUSTOMER']/following-sibling::div/div/div")),
    billingCustomerButton = element(by.buttonText('Billing Customer')),
    okButton = element(by.buttonText("OK")),
    jobNameInEditPage = element(by.css('[placeholder="Enter Job Name"]')),
    productNameCard= element(by.xpath('//h2[@class="product-card__name"]')),
    productNameInTable= element(by.xpath("//div[@class='table__body']//p[contains(@class, 'clickable')]")),
   
     productNameSAGE='',
     productCodeSAGE='',
     productVendorNameSAGE='',

     productNameASI='',
     productCodeASI='',
     productVendorNameASI='',
     productColorsASI='',
     productSizesASI='',
     lineItem='',
     jobId='',
     givenJobName='',
     selectedShippingCustomer= '',
     selectedBillingCustomer= ''


global.productName = ''
global.customerName = ''
global.jobName = ''
global.salesRep = ''
global.JobId = ''
global.shippingCustomer = ''
global.billingCustomer = ''
global.arContact = ''
global.orderingContact = ''
global.shippingContact = ''
global.invoicingContact = ''


// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))

module.exports = {
    /*Used to save application verification data form dynamic verification*/
    specData: {},

    clickOnCreateJob: function () {
        actions.jsClick(createJobButton, "Create job button");
    },

    ValidateSubwayMap: function (nodeName) {
        Long_Wait()
        subwayHighlightText.getText().then(function (address) {
            if (address.indexOf(nodeName) > -1) {
                reporter.appendTest("Verifying Subway Map", 'Verifying is "' + nodeName + '" Highlighted', "PASS");
            } else {
                reporter.appendTest("Verifying Subway Map", 'Verifying is "' + nodeName + '" Highlighted', "FAIL");
                expect(false).toReport(true, 'Verifying is "' + nodeName + '" Highlighted failed.');
            }
        })
    },

    clickOnNextButton: function () {
        actions.jsClick(nextButton, "Next button");
        Medium_Wait()
        // element.all(by.xpath("//*[text()='Alert']")).count().then( alert =>{
        //     if(alert>0){
        //         let OkButton= element(by.buttonText('OK'))
        //         actions.jsClick(OkButton, "OK")
        //         this.enterNameOrCompanyCode("B")                     
        //     }
        // })
    },

    verifyNextButtonEnabled: function () {
        actions.VerifyElementPresent(nextButton, true, "NEXT button enabled")
    },
    verifyPreviousButtonEnabled: function () {
        actions.VerifyElementPresent(previousButton, true, "Previous button enabled")
    },
    clickOnProduct: function (option) {
        Medium_Wait()
        var elem = element(by.css("[alt='" + option + "']"))
        actions.jsClick(elem, option);
        Long_Wait()
        Medium_Wait()
    },

    verifyProductInformation: (option, name) => {
        var elem = element(by.xpath("//*[text()='" + option + "']"))
        actions.VerifyElementPresent(elem, true, option);
        reporter.appendTest('Verifying product information' + name, 'Verified product ' + name + ':' + option, "PASS");
    },
    verifyProductInformationProductName: () => {
        var elem = element(by.xpath("//*[text()='" + productName + "']"))
        actions.VerifyElementPresent(elem, true, productName);
        reporter.appendTest('Verifying product information: Product Name', 'Verified product Product name :' + productName, "PASS");
    },
    verifyProductInformationCode: () => {
        var elem = element(by.xpath("//*[text()='" + productCode + "']"))
        actions.VerifyElementPresent(elem, true, productCode);
        reporter.appendTest('Verifying product information: Product Code', 'Verified product Product Code' + productCode, "PASS");
    },
    verifyProductInformationVendorName: () => {
        var elem = element(by.xpath("//*[text()='" + productVendorName + "']"))
        actions.VerifyElementPresent(elem, true, productVendorName);
        reporter.appendTest('Verifying product information:  Product vendor name', 'Verified product Product vendor name :' + productVendorName, "PASS");
    },

    verifyProductInformationProductNameASI: () => {
        var elem = element(by.xpath("//*[text()='" + productNameASI + "']"))
        actions.VerifyElementPresent(elem, true, productNameASI);
        reporter.appendTest('Verifying product information: Product Name', 'Verified product Product name :' + productNameASI, "PASS");
    },
    verifyProductInformationCodeASI: () => {
        var elem = element(by.xpath("//*[text()='" + productCodeASI + "']"))
        actions.VerifyElementPresent(elem, true, productCodeASI);
        reporter.appendTest('Verifying product information: Product Code', 'Verified product Product Code' + productCodeASI, "PASS");
    },
    verifyProductInformationVendorNameASI: () => {
        var elem = element(by.xpath("//*[text()='" + productVendorNameASI + "']"))
        actions.VerifyElementPresent(elem, true, productVendorNameASI);
        reporter.appendTest('Verifying product information:  Product vendor name', 'Verified product Product vendor name :' + productVendorNameASI, "PASS");
    },

    verifyProductInformationProductNameSAGE: () => {
        var elem = element(by.xpath("//*[text()='" + productNameSAGE + "']"))
        actions.VerifyElementPresent(elem, true, productNameSAGE);
        reporter.appendTest('Verifying product information: Product Name', 'Verified product Product name :' + productNameSAGE, "PASS");
    },
    verifyProductInformationCodeSAGE: () => {
        var elem = element(by.xpath("//*[text()='" + productCodeSAGE + "']"))
        actions.VerifyElementPresent(elem, true, productCodeSAGE);
        reporter.appendTest('Verifying product information: Product Code', 'Verified product Product Code' + productCodeSAGE, "PASS");
    },
    verifyProductInformationVendorNameSAGE: () => {
        var elem = element(by.xpath("//*[text()='" + productVendorNameSAGE + "']"))
        actions.VerifyElementPresent(elem, true, productVendorNameSAGE);
        reporter.appendTest('Verifying product information:  Product vendor name', 'Verified product Product vendor name :' + productVendorNameSAGE, "PASS");
    },
    verifyProductColors: function (colors, name) {
        reporter.appendTest('Verifying product information' + name, 'Verified product ' + name + ':' + colors, "PASS");
        // var colours[]=
    },
    verifyProductSizes: function (size, name) {
        reporter.appendTest('Verifying product information' + name, 'Verified product ' + name + ':' + size, "PASS");
        // var colours[]=
    },

    verifyProductHeader: function () {
        var header = element(by.css('[class="modal-title"]'))
        actions.VerifyElementPresent(header, true, "product header")
        header.getText().then(function (Header) {
            reporter.appendTest('Verifying product header' + Header, 'Verified product header :' + Header, "PASS");
        })

    },

    searchProducts: function (productName) {
        Medium_Wait()
        var serachTextBox = element(by.css('[placeholder="Product name, type or keyword"]'))
        actions.blurText(serachTextBox, productName, "Product Name")
        var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
        actions.jsClick(serachProduct, "Search Button");
        Long_Wait()
    },
    quickSearchSageProducts: function (productName) {
        Medium_Wait()
        var serachTextBox = element(by.css('[placeholder="Quick Search"]'))
        actions.blurText(serachTextBox, productName, "Product Name")
        // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
        // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
        // actions.jsClick(serachProduct, "Search product");
        Medium_Wait()
    },
    SupplierSageProducts: function (productName) {
        Medium_Wait()
        var serachTextBox = element(by.css('[placeholder="Choose Supplier"]'))
        actions.blurText(serachTextBox, productName, "Product Name")
        // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
        // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
        // actions.jsClick(serachProduct, "Search product");
        Medium_Wait()
    },
    itemCodeSageProducts: function (productName) {
        Medium_Wait()
        var serachTextBox = element(by.css('[placeholder="Item code"]'))
        actions.blurText(serachTextBox, productName, "Item Code")
        // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
        // actions.VerifyElementPresent(serachProduct, true, "Search Textbox")
        // actions.jsClick(serachProduct, "Search product");
        Medium_Wait()
    },
    searchWithKeywordSageProducts: function (productName) {
        Medium_Wait()
        var serachTextBox = element(by.css('[placeholder="Keyword"]'))
        actions.blurText(serachTextBox, productName, "Product Name")
        // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
        // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
        // actions.jsClick(serachProduct, "Search product");
        Medium_Wait()
    },
    searchWithCategorySageProducts: function (productName) {
        Medium_Wait()
        var serachTextBox = element(by.css('[placeholder="Choose Category"]'))
        actions.blurText(serachTextBox, productName, "Product Name")
        // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
        // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
        // actions.jsClick(serachProduct, "Search product");
        Medium_Wait()
    },
    searchWithThemeSageProducts: function (productName) {
        Medium_Wait()
        var serachTextBox = element(by.css('[placeholder="Choose Theme"]'))
        actions.blurText(serachTextBox, productName, "Product Name")
        // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
        // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
        // actions.jsClick(serachProduct, "Search product");
        Medium_Wait()
    },
    searchWithin: function (productName) {
        Medium_Wait()
        var serachTextBox = element(by.css('[name="keywordSearch"]'))
        actions.blurText(serachTextBox, productName, "Product Name")
        var serachProduct = element(by.css('[type="submit"]'))
        actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
        actions.jsClick(serachProduct, "Search product");
        Medium_Wait()
    },
    removeSelectedProducts: function () {
        var clearAllButton = element(by.xpath("//*[text()='Clear All']"))
        actions.jsClick(clearAllButton, "Clear All Button")
        Medium_Wait()
    },

    searchSupplier: function (supplierName) {
        Medium_Wait()
        var serachTextBox = element(by.css('[placeholder="Choose Supplier"]'))
        actions.blurText(serachTextBox, supplierName, "Supplier")
        var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
        actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
        actions.jsClick(serachProduct, "Search product");
        Medium_Wait()
    },
    searchItemCode: function (itemCode) {
        Medium_Wait()
        var serachTextBox = element(by.css('[placeholder="Item code"]'))
        actions.blurText(serachTextBox, itemCode, "itemCode")
        var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
        actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
        actions.jsClick(serachProduct, "Search product");
        Medium_Wait()
    },

    selectItems: function () {
        browser.sleep(20000)
        var selectOneProduct = element.all(by.css("[class='results-content-wrap'] [type='checkbox']")).get(0)
        actions.jsClick(selectOneProduct, "select one product");
        Medium_Wait()
    },

    verifyProductCount: function () {
        Medium_Wait()
        element.all(by.css("[class='results-content-wrap'] [type='checkbox']")).count().then(function (count) {
            if (count > 0) {
                reporter.appendTest('Verifying records ', 'Verified records count is:' + count, "FAIL");
            } else {
                reporter.appendTest('Verifying records ', 'Verified records count is:' + count, "PASS");
            }
        })

    },

    getProductInformationSAGELocal: () => {
        Medium_Wait()
        var productNameObject = element.all(by.css('[class="product-item__name clickable"]')).get(0),
            productCodeObject = element.all(by.xpath('//*[@class="product-item__text"]//strong[@class="product-item__title"][1]')).get(0),
            productVendorNameObject = element.all(by.xpath('//*[@class="product-item__text"]//strong[@class="product-item__title"][2]')).get(0)

        productNameObject.getText().then(function (productN) {
            productNameSAGE = productN;
        })
        productCodeObject.getText().then(function (productC) {
            productCodeSAGE = productC;
        })
        productVendorNameObject.getText().then(function (productV) {
            productVendorNameSAGE = productV;
        })
    },
    getProductInformationSAGE: () => {
        Medium_Wait()
        var productNameObject = element.all(by.css('[class="product-item__name clickable"]')).get(0),
            productCodeObject = element.all(by.xpath('//*[@class="product-item__text"]//strong[@class="product-item__title"][1]')).get(0),
            productVendorNameObject = element.all(by.xpath('//*[@class="product-item__text"]//strong[@class="product-item__title"][2]')).get(0)
        productNameObject.getText().then(function (productN) {
            global.productName = productN;
        })
        productCodeObject.getText().then(function (productC) {
            global.productCode = productC;
        })
        productVendorNameObject.getText().then(function (productV) {
            global.productVendorName = productV;
        })

    },
    storeProductNameASI: (index=0) => {
        Medium_Wait()
        var productNameObject = element.all(by.css('[class="product-item__name clickable"]')).get(index)
         productNameObject.getText().then(function (productN) {
            lineItem = productN;
        })
    },
    verifySelectedProductToDecorate: ()=>{
    Long_Wait()
    reporter.appendTest('<b>Verifying selected product and displyad product</b>', 'Selected and Displayed product to decorate on "Products to decorate" section should be same', "");
    element.all(by.xpath('//li[@class="products-list__item"]//p')).then(productArray=>{
     if (productArray.length>0) {
         productArray[0].getText().then(productName=>{
            reporter.appendTest('Retrieving Displayed Product', 'Displayed Product to decorate: '+productName, "PASS");
            // actions.expectToContainCustom(lineItem, productName," Decorating Product" , "Selecting product to decorate", "Displayed product in decoration page")
            actions.expectToContainCustom(lineItem, productName," Decorating Product" , "Selected product to decorate", "Displayed product in decoration page")
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
         })
       }
        else  reporter.appendTest('Retrieving Product', 'Retrieving Displayed Product- Failed', "FAIL");
    })
   },
     selectAddedProductCheckBox: function(){
      // let lineItem= global.productName;
       reporter.appendTest('<b>Selecting Added Product: </b>', lineItem, "");
        if(lineItem!=''){
        let product=element(by.xpath('//p[contains(text(),"'+lineItem+'")]/../preceding-sibling::div/div/label'))
              actions.jsClick(product, lineItem);
          }else  reporter.appendTest('Selecting Added Product', 'Failed: Product name is empty', "FAIL");

     },
    clickOnSelectedProduct: function(){
     reporter.appendTest('<b>Selecting Added Product: </b>', lineItem, "");
        if(lineItem!=''){
        let product=element(by.xpath('//p[contains(text(),"'+lineItem+'")]'))
              actions.jsClick(product, lineItem);
          }else  reporter.appendTest('Selecting Added Product', 'Failed: Product name variable is empty', "FAIL");

    },
    getProductInformationASI: () => {
        Medium_Wait()
        var productNameObject = element.all(by.css('[class="product-item__name clickable"]')).get(0),
            productCodeObject = element.all(by.xpath('//*[@class="product-item__text"]//strong[@class="product-item__title"]')).get(0),
            productVendorNameObject = element.all(by.xpath('//*[@class="product-item__text"]//strong[@class="product-item__title"]')).get(1)

        productNameObject.getText().then(function (productN) {
            productNameASI = productN;
        })
        productCodeObject.getText().then(function (productC) {
            productCodeASI = productC;
        })
        productVendorNameObject.getText().then(function (productV) {
            productVendorNameASI = productV;
        })

    },
    verifyProductName: function (product_Name) {
        var productNameObject = element.all(by.css('[class="product-item__name clickable"]')).get(0)
        productNameObject.getText().then(function (productN) {
            productName = productN;
            if (product_Name === productName) {
                reporter.appendTest('Verifying product name', 'Displayed the products results list which are contained the removed product name from selection', "FAIL");
            } else {
                reporter.appendTest('Verifying product name', 'Shold not isplay the products results list which are contained the removed product name from selection', "PASS");
            }
        })
    },
    clickOnSelectButton: function () {
        Long_Wait()
        actions.jsClick(selectButton, "select button")
    },
    clickOnCategories: function () {
        var categoriesDropdown = element(by.xpath("//button[text()=' Categories']"))
        actions.jsClick(categoriesDropdown, "categoriesDropdown")
    },
    clickOnPrices: function () {
        var priesDropdown = element(by.xpath("//button[text()=' Prices']"))
        actions.jsClick(priesDropdown, "priesDropdown")
    },

    clickOnSuppliers: function () {
        var suppliersDropdown = element(by.xpath("//button[text()=' Suppliers']"))
        actions.jsClick(suppliersDropdown, " Suppliers")
    },

    clickOnLineName: function () {
        var lineNameDropdown = element(by.xpath("//button[text()='Linename']"))
        actions.jsClick(lineNameDropdown, " Linename")
    },

    clickOnColor: function () {
        var colorsDropdown = element(by.xpath("//button[text()=' Colors']"))
        actions.jsClick(colorsDropdown, " Colors")
    },

    clickOnMaterials: function () {
        var materialsDropdown = element(by.xpath("//button[text()=' Materials']"))
        actions.jsClick(materialsDropdown, " Materials")
    },

    clickOnSizes: function () {
        var sizesDropdown = element(by.xpath("//button[text()=' Sizes']"))
        actions.jsClick(sizesDropdown, " Sizes")
    },

    clickOnImprintingMethods: function () {
        var imprintingMethodsDropdown = element(by.xpath("//button[text()=' Imprinting Methods']"))
        actions.jsClick(imprintingMethodsDropdown, " Imprinting Methods")
    },

    selectSortingOrder: function (option) {
        var sortDropdown = element(by.xpath('//label[text()="Sort:"]/following-sibling::div/div/div')),
            option = element(by.xpath('//*[text()="' + option + '"]'))
        actions.Click(sortDropdown, "sortDropdown")
        Medium_Wait()
        actions.jsClick(option, "sortDropdown option ")
    },

    validateProductSort: function () {
        // browser.sleep(15000)
        // var elems = element.all(by.xpath("//*[text()='Cost']/following-sibling::span"))
        // Short_Wait()
        // elems.forEach(function (elem) {
        //     elem.getText().then(function (text) {
        //         text = text.split(' ')[0].trim()
        //         reporter.appendTest('Verifying product sorting order', 'Verified sorting order: cost ' + text, "FAIL"); // Wantedly failing this logic because sorting order not yet implemented 
        //     })
        // })

        reporter.appendTest('Verifying product sorting order', 'Verified sorting order: cost ', "FAIL"); // Wantedly failing this logic because sorting order not yet implemented 
        expect(false).toReport(true, "Functionality still not developed ");

    },

    clickOnMoreLink: function () {
        var morelink = element(by.xpath("//*[text()='+ More']"))
        actions.jsClick(morelink, "morelink")
    },

    clickOnLessLink: function () {
        var lesslink = element(by.xpath("//*[text()='- Less']"))
        actions.jsClick(lesslink, "lesslink")
    },

    selectOneCategory: function () {
        var bags = element(by.xpath("//*[text()='BAGS']"))
        actions.jsClick(bags, "Bags")
    },

    getProductColor: function () {
        var color = element.all(by.css('[class="product-details__options-list"] li')).get(0)
        color.getText().then(function (colors) {
            global.productColors = colors;
        })
    },

    getProductSizes: function () {
        var size = element.all(by.css('[class="product-details__options-list"] li')).get(1)
        size.getText().then(function (sizes) {
            global.productSizes = sizes;
        })
    },

    getProductColorAndSizeASI: function () {
        var color = element.all(by.css('[class="product-details__options-list"] li')).get(0)
         color.getText().then(function (colors) {
            productColorsASI = colors;
        })
        var size = element.all(by.css('[class="product-details__options-list"] li')).get(1)
         size.getText().then(function (sizes) {
            productSizesASI = sizes;
        })
    },

    clickOnOrderNowButton: function (index=0) {
        Long_Wait()
        var orderNowButton = element.all(by.xpath("//button[text()='ORDER NOW']")).get(index)
        actions.jsClick(orderNowButton, "order now button");
    },

    enterProductQuantity: function () {
        Medium_Wait()
        var selectOneProduct = element.all(by.css("[class=' input-number-wrap '] input")).get(0)
        actions.blurText(selectOneProduct, "1000", "Product Quantity")

    },

    enterFirstProductQuantity: function (quantity) {
        Medium_Wait()
        var selectOneProduct = element.all(by.css("[class=' input-number-wrap '] input")).get(0)
        // selectOneProduct.forEach(function (items) {
        actions.blurText(selectOneProduct, quantity, "Product Quantity")
        // })
    },

    verifyMinCostField: function () {
        actions.VerifyElementPresent(minCostObject, true, "Min Cost")
    },

    verifyMaxCostField: function () {
        actions.VerifyElementPresent(maxCostObject, true, "Max Cost")
    },

    enterMinCost: function (minCost) {
        actions.blurText(minCostObject, minCost, "Min Cost")
    },

    enterMaxCost: function (maxCost) {
        actions.blurText(maxCostObject, maxCost, "Max Cost")
    },

    clickOnAddPricingButton: function () {
        Medium_Wait()
        var addPricingButton = element(by.xpath("//button[text()='ADD PRICING']"))
        actions.jsClick(addPricingButton, "add pricing button");
    },

    enterRequestedShipDate: () => {
        var currentDate = new Date();
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1; //as January is 0
        var yyyy = currentDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var ReqShipDate = mm + '' + dd + '' + yyyy,
         ReqshipDateField = element(by.id('reqShipDate'))
          actions.blurText(ReqshipDateField, ReqShipDate, "Requested ship date")
    },

    enterInHandDate: () => {
        var tommorow = new Date(86400000 + +new Date())
        // here 86400000 is used to convert millisecods to current date
        //gets the date of tommowrow, because we have to select future date for Inhand date 
        var dd = tommorow.getDate();
        var mm = tommorow.getMonth() + 1; //as January is 0
        var yyyy = tommorow.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        var inHandDate = mm + '' + dd + '' + yyyy,
        InhandDateField = element(by.xpath("//label[text()='In Hands Date']/following-sibling::div//input"))
        actions.blurText(InhandDateField, inHandDate, "Inhand date")
    },

    clickOnAddLineItemButton: function () {
        actions.jsClick(addLineItemButton, "add line item button")
        Long_Wait()
        Medium_Wait()
    },

    verifyDoNotShowCustomersOptionCheckBoxeItemNumbers: function () {
        var option = element(by.xpath('//label[text()="Item Numbers"]')),
            checkboxEnable = element(by.xpath('//label[text()="Item Numbers"]/../input[@checked]'))
        actions.jsClick(option, "Item Numbers")
        // // actions.VerifyElementPresent(checkboxEnable,true,"check box")
        // Medium_Wait()
        // actions.jsClick(option, "Item Numbers")
        // // actions.VerifyElementPresent(checkboxEnable,false,"unchecked")
    },
    verifyDoNotShowCustomersOptionCheckBoxeQuantitiePricing: function (option) {
        var option = element(by.xpath('//label[text()="Quantities & Pricing"]')),
            checkboxEnable = element(by.xpath('//label[text()="Quantities & Pricing"]/../input[@checked]'))
        actions.jsClick(option, "Quantities & Pricing")
        // Medium_Wait()
        // // actions.VerifyElementPresent(checkboxEnable,true,"check box")
        // Medium_Wait()
        // actions.jsClick(option, "Quantities & Pricing")
        // // actions.VerifyElementPresent(checkboxEnable,false,"unchecked")
    },
    verifyDoNotShowCustomersOptionCheckBoxeSetupCostsExtraFees: function (option) {
        // functionality removed
        // var option = element(by.xpath('//label[text()="Setup Costs & Extra Fees"]')),
        //     checkboxEnable = element(by.xpath('//label[text()="Setup Costs & Extra Fees"]/../input[@checked]'))
        // actions.jsClick(option, "Setup Costs & Extra Fees")
        // Medium_Wait()
        // // actions.VerifyElementPresent(checkboxEnable,true,"check box")
        // Medium_Wait()
        // actions.jsClick(option, "Setup Costs & Extra Fees")
        // // actions.VerifyElementPresent(checkboxEnable,false,"unchecked")
    },

    enterNameOrCompanyCode: function (text) {
        actions.blurText(nameOrCompanyCode, text, 'Name or Company Code');
        Long_Wait()
        actions.PressDownArrow(nameOrCompanyCode)
        Short_Wait()
        actions.PressEnter(nameOrCompanyCode)
        browser.sleep(20000)
    },

    enterJobName: function (text) {
        var currentDate = new Date();
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1; //as January is 0
        var yyyy = currentDate.getFullYear();
        var hour = currentDate.getHours();
        var minute = currentDate.getMinutes();
        // var date = mm + '' + dd + '' + yyyy
        // text = text + currentDate.toLocaleDateString()+'_'+ d.toLocaleTimeString()
        Short_Wait()
        text = text + '_' + dd + mm + yyyy + hour + minute
        Short_Wait()
        global.jobName = text;
        actions.blurText(jobName, text, 'Job name');
    },

    enterNewJobName: function (jobNameText) {
         givenJobName= jobNameText
        actions.blurText(jobName, jobNameText, 'Job name');
    },

    updateJobName: (job) => {
        // global.jobName = text;
        actions.blurText(jobNameInEditPage, job, 'Job name');
    },
    verifyShippingCustomerIsDisplayed: function () {
        var elem = element(by.xpath("//h6[text()='" + option + "']"))
        actions.VerifyElementPresent(elem, true, option)
    },
    clickOnRushJobRadioButton: function (option) {
        var elem = element(by.xpath('//label[contains(text(),"' + option + '")]/..//*[contains(@for,"rushjob")]'))
        actions.jsClick(elem, 'Rush Job radio button');
    },
    clickOnSaveAndExitButton: function () {
        actions.jsClick(saveAndExistLink, 'Need to stop for some reason ? Save and Exit button');
        browser.sleep(20000)
    },

    clickOnCloseEditJobPopup: function () {
        actions.jsClick(closeEditPopup, "Close Button")
        browser.sleep(20000)
    },
    clickOnCloseButton: function () {
        actions.jsClick(closeEditPopup, "Close Button")
    },
    verifyCreatedJobName: function (expectedJobName) {
      Medium_Wait()
      actions.GetTextAndCompareToBeEqual(createdJobName, expectedJobName, "Job Name", "Job Name displayed in present job details page","Job name given in repeat job page")
        // createdJobName.getText().then(function (jobText) {
        //    actions.expectNotToEqualCustom(jobText, expectedJobName, "Job Name", "Job Name displayed in present job details page","Job name given in repeat job page")
        // })
    },
    verifyRepeatedJobId: function () {
        actions.GetTextAndCompareNotToBeEqual(createdJobId, jobId, "Job Id", "Repeated Job Id","Parent Job Id")
        // createdJobId.getText().then(function (jobId) {
        //    actions.expectNotToEqualCustom(jobId, expectedJobName, "Job Id", "Repeated Job Id","Parent Job Id")
        // })
    },
    storeJobId: function () {
      createdJobId.getText().then(function (id) {
           jobId= id;
        })
    },

    verifyRepeatJobNameNotDisplayed: function (expectedJobName) {
     Long_Wait()
        createdJobName.getText().then(function (jobText) {
            actions.expectNotToEqualCustom(jobText, expectedJobName, "Job Name", "Job Name displayed in present job details page","Job name given in repeat job page")
        })
    },

    enterProductCost: function (costValue) {
        var elem = element.all(by.css('[class="table"] [class=" input-number-wrap full-width"] input'))
        actions.blurText(elem.get(0), costValue, "Entered Pricing" + costValue)
        Medium_Wait()
    },

    enterProductPricing: function () {
        cost.get(0).getAttribute('value').then(function (costValue) {
            var pricingValue = costValue + 12;
            actions.ClearText(pricing.get(1), 'price');
            actions.blurText(pricing.get(1), pricingValue, "Entered Pricing" + pricingValue)
        })
        Medium_Wait()
    },

    verifyCreatedLineItems: function (expectedJobName) {
        Medium_Wait()
        lineItemsPresentInTheTable.each(function (item) {
            item.getText().then(function (txt) {
                reporter.appendTest('Verifying Created line item', 'Verified created line item  :' + txt, "PASS");
            });
        });
        Medium_Wait()
    },

    verifyErrorMessage: () => {
        Medium_Wait()
        let errorMessage = element(by.xpath("//p[.='No Result Returned!']"))
        actions.VerifyElementPresent(errorMessage, true, "No Result Returned!")
    },

    verifyRushAndSampleJob: (expeectedOption) => {  //"Rush", "Sample" or "Both"
        rushAndSampleJobColumn.getText().then(actualOption => {
            actions.expectToEqualCustom(expeectedOption, actualOption, "Selected And Displayed Option for a job", "selected job Option", "Displayed job Option")
        })
    },

    clickOnbackToJobListButton: function () {
        actions.jsClick(backToJobList, 'Back to Job List');
        Medium_Wait()
    },


    clickOncustomerDetailsDropdown: () => {
        actions.jsClick(customerDetails, " Customer Details DropDown")
    },

    verifyNextToCustomer_VendorAndAddNewOptions: function (expectedValue) {
        actions.verifyElementDisplayed(shippingCustomer, true, "Shipping Customer Option")
        actions.verifyElementDisplayed(billingCustomer, true, "Billing Customer Option")
    },

    getSelectedCustomer: async () => {
        nameOrCompanyCode.getAttribute('value').then(function (value) {
            global.customerName = value.split('--')[1].trim();
            reporter.appendTest('Selecting customer', 'Selected "Customer" is: ' + value, "PASS");
        }, function (err) {
            reporter.appendTest('Selecting customer', 'Selecting "Customer" failed', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
    },

    verifyShippingCustomerDetails: (index = 0) => {
        element.all(by.xpath("//label[text()='SHIPPING CUSTOMER']/../following-sibling::div/div/*")).then(shippingCustomer => {
            if (shippingCustomer.length > 0) {
                shippingCustomer[index].getText().then(shippingCustomerName => {
                   selectedShippingCustomer = shippingCustomerName;
                    reporter.appendTest('Retrieving Shipping Customer', 'Displayed Shipping Customer: ' + shippingCustomerName, "PASS");
                })    // actions.GetElementText(shippingCustomer[0], "Shipping Customer")
            } else reporter.appendTest('Selecting customer', 'Selecting "Customer" failed', "FAIL");
        })
    },

    verifyBillingCustomerDetais: (index = 0) => {
        element.all(by.xpath("//label[text()='BILLING CUSTOMER']/../following-sibling::div/div/*")).then(billingCustomer => {
            if (billingCustomer.length > 0) {
                billingCustomer[index].getText().then(billingCustomerName => {
                    selectedBillingCustomer = billingCustomerName;
                    reporter.appendTest('Retrieving Billing Customer', 'Displayed Billing Customer: ' + billingCustomerName, "PASS");
                })
                // actions.GetElementText(billingCustomer[0], "Billing Customer")
            } else reporter.appendTest('Selecting customer', 'Selecting "Customer" failed', "FAIL");
        })
    },

    validateShippingCustomer: () => {
        nameOrCompanyCode.getAttribute('value').then(function (shippinCustomerNameSelected) {
            shippinCustomerNameSelected = shippinCustomerNameSelected.split('--')[1].trim()
            element.all(by.xpath("//label[text()='SHIPPING CUSTOMER']/../following-sibling::div/div/*")).then(shippingCustomer => {
                if (shippingCustomer.length > 0) {
                    shippingCustomer[0].getText().then(shippingCustomerNameDisplayed => {
                        actions.expectToEqualCustom(shippinCustomerNameSelected, shippingCustomerNameDisplayed, " Selected Shipping Customer Name selected in field and Shipping customer name displayed in 'Shipping Customer Section' ", "Name in Field", "Name displayed in details Section")
                    })
                }
            })
        })
    },

    validateBillingCustomer: () => {
        nameOrCompanyCode.getAttribute('value').then(function (billingCustomerNameSelected) {
            billingCustomerNameSelected = billingCustomerNameSelected.split('--')[1].trim();
            element.all(by.xpath("//label[text()='BILLING CUSTOMER']/../following-sibling::div/div/*")).then(billingCustomer => {
                if (billingCustomer.length > 0) {
                    billingCustomer[0].getText().then(billingCustomerNameDisplayed => {
                        actions.expectToEqualCustom(billingCustomerNameSelected, billingCustomerNameDisplayed, " Selected Billing Customer Name selected in field and Billing customer name displayed in 'Billing Customer Section' ", "Name in Field", "Name displayed in details Section")
                    })
                }
            })
        })
    },


    validateOrderingContac: async () => {
        orderingContact.getText().then(function (orderingContactName) {
            reporter.appendTest('Verifying Ordering Contact', 'Displayed "Ordering Contact" is: ' + orderingContactName, "PASS");
            global.orderingContact = orderingContactName;
        }, function (err) {
            reporter.appendTest('Verifying Ordering Contact', 'Failed while getting text of: Ordering Contact', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
    },
    validateShippingContact: () => {
        shippingContact.getText().then(function (ShippingContactName) {
            reporter.appendTest('Verifying Shipping Contact', 'Displayed "Shipping Contact" is: ' + ShippingContactName, "PASS");
            global.shippingContact = ShippingContactName;
        }, function (err) {
            reporter.appendTest('Verifying Shipping Contact', 'Failed while getting text of: Shipping Contact', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
    },

    validateInvoicingContact: () => {
        invoicingContact.getText().then(function (invoicingContactName) {
            reporter.appendTest('Verifying Invoicing Contact', 'Displayed "Invoicing Contact" is: ' + invoicingContactName, "PASS");
            global.invoicingContact = invoicingContactName;
        }, function (err) {
            reporter.appendTest('Verifying Invoicing Contact', 'Failed while getting text of: Invoicing Contact', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
    },
    validatearContact: () => {
        arContact.getText().then(function (ARContactName) {
            reporter.appendTest('Verifying AR Contact', 'Displayed "AR Contact" is: ' + ARContactName, "PASS");
            global.arContact = ARContactName;
        }, function (err) {
            reporter.appendTest('Verifying AR Contact', 'Failed while getting text of: AR Contact', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
    },

    verifyAutoPopulatedContacts: () => {
        try {
            element.all(by.xpath("//label[contains(text(),'CONTACT')]/following-sibling::div//div[text()='Select...']")).count().then(count => {
                if (count > 0) {
                    reporter.appendTest('Verifying Contacts', 'Verified that all contacts are not auto populated', "FAIL");
                    expect(false).toReport(true, 'Verifying Contacts auto populated falied');
                }
            })
        } catch (error) {
            reporter.appendTest('Verifying Contacts', 'Verified that all contacts are auto populated', "PASS");
            console.log("Error message: " + error)
        }
    },

    verifyAutoPopulatedSalesRep: () => {
        // element.all(by.xpath("///label[text()='Sales Rep'])[2]/following-sibling::div//div[text()='Select...'](//label[text()='Sales Rep'])[2]/following-sibling::div//div[text()='Select...']")).count().then(count=>{
        //      if(count>0){
        //      reporter.appendTest('Verifying Sales rep', 'Verified that Sales rep is not auto populated', "FAIL");
        //      expect(false).toReport(true, 'Verifying Sales rep auto populated falied');
        //     }else  {
        //      reporter.appendTest('Verifying Sales rep', 'Verified that sales rep is not auto populated', "PASS");
        salesRepValue.getText().then(function (text) {
            reporter.appendTest('Verifying salesRep', 'Displayed "salesRep" is: ' + text, "PASS");
            global.salesRep = text;
        }, function (err) {
            reporter.appendTest('Verifying salesRep', 'Failed while getting text of Sales rep', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
        // }
        // })
    },

    verifyElementdisabled: () => {
        actions.VerifyFieldDisabled(nextButton, true, "Next Button")
        actions.VerifyFieldDisabled(saveAndExistLink, true, "Save and Exit Button")
        actions.VerifyFieldDisabled(salesRepField, true, "Sales Rep")
    },

    verifyCreatedJobId: () => {
        element.all(by.xpath("//*[contains(@href,'/jobs/')]")).then(jobsArray => {
            if (jobsArray.length > 0) {
                jobsArray[0].getText().then(firstJobId => {
                    reporter.appendTest('Retrieving Created Job Id', 'Created Job Id: ' + firstJobId, "PASS");
                })
            }
        })
    },

    verifySalesRepInList: () => {
        element.all(by.xpath('//*[@class="avatar avatar_sm "]/span')).then(repArray => {
            if (repArray.length > 0) {
                repArray[0].getText().then(firstSalesRep => {
                    let salesRep = global.salesRep;
                    salesRep = salesRep.split(':')[0].trim();
                    actions.expectToEqualCustom(salesRep, firstSalesRep, "Sales Rep", "Sales rep selected to create Job", "SalesRep displayed for created Job")

                })
            }
        })
    },

    verifyStatusOfCreatedJob: () => {
        element.all(by.xpath('//*[@class="table__col d-none d-lg-flex col"]/span')).then(statusArray => {
            if (statusArray.length > 0) {
                statusArray[0].getText().then(status => {
                    actions.expectToEqualCustom("NEW", status, "Status of created job", "Expected status", "Actual status of created job")
                })
            }
        })
    },

    storeProduct: () => {
        element.all(by.xpath('//h2[@class="product-card__name"]')).then(productArray => {
            if (productArray.length > 0) {
                productArray[0].getText().then(productName => {
                    global.productName = productName;
                    reporter.appendTest('Retrieving Product', 'Selected Product: ' + productName, "PASS");
                })
            }
            else reporter.appendTest('Retrieving Product', 'Selecting Product- Failed', "FAIL");
        })
    },
    storeProductLocal: () => {
        productNameCard.getText().then(productName => {
            lineItem = productName;
             reporter.appendTest('Retrieving Product', 'Selected Product: ' + lineItem, "PASS");
        })
    },

    verifyShippingCustomerInDetailsPage: () => {
        var shippingCustomerNameInJobPage = element(by.xpath("//span[text()='Shipping Customer']/following-sibling::span"))
        shippingCustomerNameInJobPage.getText().then(shippingCustomerName => {
            actions.expectToEqualCustom(selectedShippingCustomer, shippingCustomerName, "Shipping Customer", "Shipping Customer selected to create Job", "Shipping Customer displayed for created Job")
        })
    },

    verifyBillingCustomerInDetailsPage: () => {
        var billingCustomerNameInJobPage = element(by.xpath("//span[text()='Billing Customer']/following-sibling::span"))
        billingCustomerNameInJobPage.getText().then(CustomerName => {
            actions.expectToEqualCustom(selectedBillingCustomer, CustomerName, "Billing Customer", "Billing Customer selected to create Job", "Billing Customer displayed for created Job")
        })
    },

    verifyOrderContactInDetailsPage: () => {
        var orderingInJobPage = element(by.xpath("//span[text()='Order Contact']/following-sibling::span"))
        orderingInJobPage.getText().then(ContactName => {
            actions.expectToEqualCustom(global.orderingContact, ContactName, "Order Contact", "Order Contact selected to create Job", "Order Contact displayed for created Job")
        })
    },

    verifyARContactInDetailsPage: () => {
        var ARInJobPage = element(by.xpath("//span[text()='AR Contact']/following-sibling::span"))
        ARInJobPage.getText().then(ContactName => {
            actions.expectToEqualCustom(global.arContact, ContactName, "AR Contact", "AR Contact selected to create Job", "AR Contact displayed for created Job")
        })
    },

    verifyShippingContactInDetailsPage: () => {
        var ShippingJobPage = element(by.xpath("//span[text()='Shipping Contact']/following-sibling::span"))
        ShippingJobPage.getText().then(ContactName => {
            actions.expectToEqualCustom(global.shippingContact, ContactName, "Shipping Contact", "Shipping Contact selected to create Job", "Shipping Contact displayed for created Job")
        })
    },

    verifyInvoicingContactInDetailsPage: () => {
        var InvoicingJobPage = element(by.xpath("//span[text()='Invoicing Contact']/following-sibling::span"))
        InvoicingJobPage.getText().then(ContactName => {
            actions.expectToEqualCustom(global.invoicingContact, ContactName, "Invoicing Contact", "Invoicing Contact selected to create Job", "Invoicing Contact displayed for created Job")
        })
    },

    verifySalesRepInDetailsPage: () => {
        var salesRepJobPage = element(by.xpath("//span[text()='Sales Rep']/following-sibling::span"))
        salesRepJobPage.getText().then(salesRep => {
            actions.expectToContainCustom(global.salesRep, salesRep, "SalesRep", "SalesRep selected to create Job", "SalesRep displayed for created Job")
        })
    },

    // getJobIdFromDetailsPage: ()=>{
    //     actions.GetElementText(jobIdInDetailsPage, "Job Id") 
    // },

    verifyFormatOfCreatedJobIdFromDetailsPage: (username) => {
        reporter.appendTest('Verifying  Job Id format', 'Verifying that the Job Id should End with the username', "");
        jobIdInDetailsPage.getText().then(function (jobId) {
            if (username.length > 0 && jobId.length > 0) {
                jobId = jobId.trim()
                username = username.trim()
                let endLetters = jobId.substr(jobId.length - username.length, jobId.length)  //(start, length)
                if (endLetters == username)
                    reporter.appendTest('Verified Job Id : <b>' + jobId + '</b>', 'Verifyied that the Job Id ends with the Username:<b> ' + username + '</b>', "PASS");
                else {
                    reporter.appendTest('Verified Job Id : <b>' + jobId + '</b>', 'Verifyied that the Job Id is not according to the expected format', "FAIL");
                    expect(false).toReport(true, "Job Id Format validation Failed");
                }
            } else {
                reporter.appendTest('Verified Job Id format', 'Job Id or Username parameter is empty', "FAIL");
                expect(false).toReport(true, "Job Id or Username parameter is empty");
            }
        }, function (err) {
            reporter.appendTest('Verifying Job Id format', 'Failed while getting text of: " Job Id"', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
    },

    statusOfCreatedJobInDetailsPage: (expectedStatus="NEW") => {
        element.all(by.xpath('//div[@class="job-status-area columns"]/span')).then(statusArray => {
            if (statusArray.length > 0) {
                statusArray[0].getText().then(status => {
                    actions.expectToEqualCustom(expectedStatus, status, "Status of created job", "Expected status", "Actual status of created job")
                })
            }
        })
    },

    verifyCustomerNameOfCreatedJob: () => {
        element.all(by.xpath('//div[@class="job-company-area columns"]/strong')).then(nameArray => {
            if (nameArray.length > 0) {
                nameArray[0].getText().then(name => {
                    actions.expectToEqualCustom(global.customerName, name, "Customer Name", "Selected Customer Name while creating job", "Displayed Customer Name of created job")
                })
            }
        })
    },

    verifyProductsCreatedJob: () => {
        element.all(by.xpath("//div[@class='table__body']//p[contains(@class, 'clickable')]")).then(productArray => {
            if (productArray.length > 0) {
                productArray[0].getText().then(productname => {
                    if (global.productName != '')
                        actions.expectToContainCustom(productname, global.productName, "Added Product", "Displayed Product of created job", "Selected Product while creating job")
                })
            }
        })
    },
    verifyProductsCreatedJobLocal: () => {
      actions.GetTextAndCompareToBeEqual(productNameInTable, lineItem, "Added Product", "Displayed Product in the created job", "Selected Product while creating job")
    },
    verifyAddedProductToJob: (productName) => {
     productName= (productName ? productName : lineItem)
      element.all(by.xpath("//div[@class='details-table row']//div[@class='table__body']//p[contains(@class, 'clickable')]")).then(productArray => {
        let lastElementIndex= productArray.length - 1; 
            productArray[lastElementIndex].getText().then(text => {
             actions.expectToContainCustom(text, productName, "Added Product", "Displayed Description of Product(New) in the job", "Added Product to the job")
             })
          })
     },

    verifyCreatedNewJobNameDetailsPage: function () {
        createdJobName.getText().then(function (jobText) {
            reporter.appendTest('Verifying Created Job name', 'Job name displayed: ' + jobText, "PASS");
            actions.expectToEqualCustom(jobText, global.jobName, "Created Job Name", "Displayed Name for Created Job", "Name given while Creating Job")
        })
    },
     verifyUpdatedJobNameDetailsPage: function (expectedJobName) {
        createdJobName.getText().then(function (jobText) {
            reporter.appendTest('Verifying Created Job name', 'Job name displayed: ' + jobText, "PASS");
            actions.expectToEqualCustom(jobText, expectedJobName, "Updated Job Name", "Displayed Name for Created Job", "Name given while Updating Job")
        })
    },
     verifyCreatedNewJobNameDetailsPageLocal: function () {
        // createdJobName.getText().then(function (jobText) {
        //     reporter.appendTest('Verifying Created Job name', 'Job name displayed: ' + jobText, "PASS");
        //     actions.expectToEqualCustom(jobText, global.jobName, "Created Job Name", "Displayed Name for Created Job", "Name given while Creating Job")
        // })
      actions.GetTextAndCompareToBeEqual(createdJobName, givenJobName, "Added Product", "Displayed Job name in the created job", "Given Job name while creating job")
    },

    verifyCreatedNewJobNameListPage: function (expectedResult) {
        element.all(by.xpath("//*[@class='table__col d-none d-lg-flex col']/p[text()='" + global.jobName + "']")).then(jobArray => {
            if (jobArray.length > 0) {
                if (expectedResult == true)
                    reporter.appendTest('Verifying Created Job name', 'Verified that New Job created and Job Name displayed: ' + global.jobName, "PASS");
                else {
                    reporter.appendTest('Verifying Job name', 'Verified that New Job Name is not displayed ', "FAIL");
                    expect(false).toReport(true, "Verified Job name is not displayed");
                }
            }
            else {
                if (expectedResult == false)
                    reporter.appendTest('Verifying the Job tried to create', 'Verified that Job:' + global.jobName + ' is not created ', "PASS");
                else {
                    reporter.appendTest('Verifying the Job tried to create', 'Verified that Job:' + global.jobName + ' is created ', "FAIL");
                    expect(false).toReport(true, "Verified Job name is displayed");
                }
            }
        })
    },
    keywordSearchCustomProducts: (keyword) => {
        actions.blurText(keywordSearchCustomProducts, keyword, "Keyword Search")
    },
    clickOnSearchCustomProducts: () => {
        actions.jsClick(searchButton, "Search Button")
    },
    clickOnAddProductProducts: () => {
      Medium_Wait()
       actions.jsClick(addProductButton, "Add Product Button")
        console.log("Add Product debugg point")
    },
    verifyUpdatedJobInDetailedPage: function (expectedResult, expectedJobNamejobName) {
      element.all(by.xpath("//span[text()='" + expectedJobNamejobName+ "']")).then(jobArray => {
        if (jobArray.length > 0) {
            if (expectedResult == true)
                reporter.appendTest('Verifying Job name', 'Verified that Job Name is updated to : ' + expectedJobNamejobName, "PASS");
                else {
                    reporter.appendTest('Verifying Job name', 'Verified that that Job Name is not updated to :' + expectedJobNamejobName, "FAIL");
                    expect(false).toReport(true, "Verified Job name is not updated");
                } //
            } //
        else {
            if (expectedResult == false)
                reporter.appendTest('Verifying Job name', 'Verified that that Job Name is not updated to : ' + expectedJobNamejobName, "PASS");
                else {
                    reporter.appendTest('Verifying Job name', 'Verified that Job Name is updated to : ' + expectedJobNamejobName, "FAIL");
                    expect(false).toReport(true, "Verified Job name is updated");
                }
            }
        })
    },

    verifyAlternateShippingAdsressCard: (name, Address1, Address2, Address3, City, State, Zip) => {
        element.all(by.xpath('//label[text()="Alternate Shipping Address"]/following-sibling::div/div[@class="card-body"]/*')).then(cardElemenrArray => {
            if (cardElemenrArray.length > 0) {
                reporter.appendTest('Verifying Alternate Shipping Address Card', 'Verified that Alternate Shipping Address Card is displayed', "PASS");
                reporter.appendTest('Verifying Alternate Shipping Address Card Details', 'Address Card should contain the address details added', "");

                cardElemenrArray[0].getText().then(nameDisplayed => {
                    actions.expectToEqualCustom(nameDisplayed, name.toUpperCase(), "Contact Name", "Displayed Contact Name", "Contact Name used while Adding")
                })

                cardElemenrArray[1].getText().then(address1Displayed => {
                    actions.expectToEqualCustom(address1Displayed, Address1, "Address1", "Displayed Address1", "Address1 used while Adding")
                })

                cardElemenrArray[2].getText().then(address2Displayed => {
                    actions.expectToEqualCustom(address2Displayed, Address2, "Address2", "Displayed Address2", "Address2 used while Adding")
                })

            }
            else {
                reporter.appendTest('Verifying Alternate Shipping Address Card', 'Verified that Alternate Shipping Address Card is not displayed', "FAIL");
                expect(false).toReport(true, 'Verified that Alternate Shipping Address Card is not displayed');
            }
        })
    },

    verifyAlternateShippingAdsressCardPresent: (requiredSatus=true) => {
       let addressCard= element(by.xpath('//label[text()="Alternate Shipping Address"]/following-sibling::div/div[@class="card-body"]'))
        actions.VerifyElementPresent(addressCard,requiredSatus,"Alternative Address Card")   
    },

    verifyAlternateShippingAdsressDetails: (Name, Address1, Address2, Address3, City, Zip, State) => {
        Long_Wait()
        element.all(by.xpath("//span[text()='Alternate Address']/following-sibling::span")).then(alternateAddressElemenrArray => {
            if (alternateAddressElemenrArray.length > 0) {
                reporter.appendTest('Verifying Alternate Shipping Address', 'Verified that Alternate Shipping Address is displayed', "PASS");
                reporter.appendTest('Verifying Alternate Shipping Address Details', 'Verifying Address details with the data used while adding', "");

                alternateAddressElemenrArray[0].getText().then(nameDisplayed => {
                    actions.expectToEqualCustom(nameDisplayed, Name, "Contact Name", "Displayed Contact Name", "Contact Name used while Adding")
                })

                alternateAddressElemenrArray[1].getText().then(addressDisplayed => {
                    actions.expectToContainCustom(addressDisplayed, Address1, "Address1", "Displayed Address details", "Address1 used while Adding")
                    actions.expectToContainCustom(addressDisplayed, Address2, "Address2", "Displayed Address details", "Address2 used while Adding")
                    actions.expectToContainCustom(addressDisplayed, Address3, "Address3", "Displayed Address details", "Address3 used while Adding")
                    // actions.expectToContainCustom(addressDisplayed, City, "City", "Displayed Address details", "City used while Adding")
                    actions.expectToContainCustom(addressDisplayed, Zip, "Zip", "Displayed Address details", "Zip used while Adding")
                })

            }
            else {
                reporter.appendTest('Verifying Alternate Shipping Address ', 'Verified that Alternate Shipping Address is not displayed', "FAIL");
                expect(false).toReport(true, 'Verified that Alternate Shipping Address is not displayed');
            }
        })
    },

    verifyShippingCustomerCard: () => {
        element.all(by.xpath("//label[text()='SHIPPING CUSTOMER']/following-sibling::div/div/div")).then(customerArray => {
            if (customerArray.length > 0) {
                customerArray[0].getText().then(customerName => {
                    selectedShippingCustomer = customerName;
                    reporter.appendTest('Verifying Shipping Customer Card', 'Verified Shipping Customer Card is displayed: ' + customerName, "PASS");
                })
            }
            else reporter.appendTest('Verifying Shipping Customer Card', 'Verified Shipping Customer Card is not displayed', "FAIL");
        })
    },

    verifyBillingCustomerCard: () => {
        element.all(by.xpath("//label[text()='BILLING CUSTOMER']/following-sibling::div/div/div")).then(customerArray => {
            if (customerArray.length > 0) {
                customerArray[0].getText().then(customerName => {
                    selectedBillingCustomer = customerName;
                    reporter.appendTest('Verifying Billing Customer Card', 'Verified Billing Customer Card is displayed: ' + customerName, "PASS");
                })
            }
            else reporter.appendTest('Verifying Billing Customer Card', 'Verified Billing Customer Card is not displayed', "FAIL");
        })
    },

    closeShippingCardAndVerify: () => {
        actions.jsClick(shippingCustomerCloseCard, "Close- Shipping customer ")
        Short_Wait()
        element.all(by.xpath("//label[text()='SHIPPING CUSTOMER']/following-sibling::div/div/div")).then(customerArray => {
            if (customerArray.length < 1) {
                reporter.appendTest('Verifying Shipping Customer Card', 'Verified Shipping Customer Card is not displayed: ', "PASS");
            }
            else reporter.appendTest('Verifying Shipping Customer Card', 'Verified Shipping Customer Card is displayed', "FAIL");
        })
    },

    closeBillingCardAndVerify: () => {
        actions.jsClick(billingCustomerCloseCard, "Close- Billing customer ")
        Short_Wait()
        element.all(by.xpath("//label[text()='BILLING CUSTOMER']/following-sibling::div/div/div")).then(customerArray => {
            if (customerArray.length < 1) {
                reporter.appendTest('Verifying Billing Customer Card', 'Verified Billing Customer Card is not displayed: ', "PASS");
            }
            else reporter.appendTest('Verifying Billing Customer Card', 'Verified Billing Customer Card is displayed', "FAIL");
        })
    },

    verifyAlertAndItsContent: () => {
        element.all(by.xpath('//div[@class="modal_popup"]/div/div')).then(alertArray => {
            if (alertArray.length > 0) {
                reporter.appendTest('Verifying is Alert present', 'Verified Alert is displayed', "PASS");
                alertArray[1].getText().then(text => {
                    reporter.appendTest('Verifying Alert message', 'Verified alert message displayed: ' + text, "");
                })
            }
            else reporter.appendTest('Verifying  Alert', 'Verified Alert is not displayed', "FAIL");
        })

    },

    closePopUpWithOk: () => {
        actions.jsClick(okButton, "Ok Button")
    },

    verifyUpdatedShippingCustomerInDetailsPage: () => {
        var shippingCustomerNameInJobPage = element(by.xpath("//span[text()='Shipping Customer']/following-sibling::span"))
        shippingCustomerNameInJobPage.getText().then(shippingCustomerName => {
            actions.expectToEqualCustom(selectedShippingCustomer, shippingCustomerName.toUpperCase(), "Shipping Customer", "Updated Shipping Customer name", "Displayed Shipping Customer name in details page")
        })
    },

    verifyUpdatedSBillingCustomerInDetailsPage: () => {
        var billingCustomerNameInJobPage = element(by.xpath("//span[text()='Billing Customer']/following-sibling::span"))
        billingCustomerNameInJobPage.getText().then(CustomerName => {
            actions.expectToEqualCustom(selectedBillingCustomer, CustomerName.toUpperCase(), "Billing Customer", "Updated Billing Customer name", "Displayed Billing Customer name in details page")
        })
    },

    clickOnBillingCustomer: () => {
        actions.jsClick(billingCustomerButton, "Billing Customer Button")
    },


    verifyIsAlternativeAddress: () => {
        element.all(by.xpath("//label[text()='Alternate Shipping Address']/following-sibling::div/button")).then(eleArray => {
            if (eleArray.length > 0) {
                reporter.appendTest('Verifying is Alternate Shipping Address present', 'Verified Alternate Shipping Address is present', "");
                actions.jsClick(eleArray[0], "Close- Alternate Shipping Address")
            }
            else reporter.appendTest('Verifying is Alternate Shipping Address present', 'Verified Alternate Shipping Address is not present', "");
        })

    },

    getPresentJobName: () => {
        reporter.appendTest('<b>Verifying current Job name</b>', '*********************', "");
        actions.GetFieldValue(jobNameInEditPage, "Job Name")
    },











    //    functionName: ()=>{ }


};