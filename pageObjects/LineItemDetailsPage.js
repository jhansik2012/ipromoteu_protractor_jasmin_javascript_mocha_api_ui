// *************************************************
/*global document, window, alert, console, require, browser,jasmine,
 requirePage, requireData, requireConfig, requireLibrary,
 describe, it, beforeEach, forEach, by, includes, expect, titlePromise, includes , element, $, then, $locatorRepeater, calenderInputData*/
/*
 */
'use strict';

const { element, browser } = require("protractor");

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
    random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
    //***************************** Page Objects *************************************//

    // locators section
    // TC002-Validate Header section

    modalshow = "//div[@class='modal fade show']",
    table_body = "//div[@class='tab-pane active']//div[@class='table__body']",

    lineitemimg = element(by.xpath(modalshow + "//img[@alt='product']")),
    viewdecorebutton = element(by.xpath(modalshow + "//button[text()='View decoration details']")),
    productdetails = element(by.xpath(modalshow + "//p[text()='Product Details']")),
    pricingdetails = element(by.xpath(modalshow + "//p[text()='Pricing']")),
    shippingdetails = element(by.xpath(modalshow + "//button//*[contains(text(),'Shipping') and contains(text(),'details')]")),
    vendordetails = element(by.xpath(modalshow + "//button//*[contains(text(),'Vendor details')]")),
    Advanceddetails = element(by.xpath(modalshow + "//button//*[contains(text(),'Advanced details')]")),
    vendorNameElement = element(by.xpath("(" + table_body + "//div[@class='table__col col']//div[contains(@class,'col')])[5]//p")),
    // statusElement = element(by.xpath("(" + table_body + "//div[@class='table__col col'])[1]//div[contains(@class,'col')][13]//p//span")),
    decorisSelect = element(by.xpath("(" + table_body + "//div[@class='table__col col'])[1]//i[@class='material-icons text-success']")),
    poNumberElement = element(by.xpath("(" + table_body + "//div[@class='table__col col']//div[contains(@class,'col')])[6]//p")),
    tablebodyel = element(by.xpath(table_body)),
    lineItemCustPrice = element(by.id("customerPrice")),
    lineItemCost = element(by.id("cost")),
    firstLineItemDesc = element.all(by.xpath("(//div[@class='table__col col'])[1]/div/div[2]/p[1]")).get(0),

    // TC004-validatePricingDetails
    customerpricediv = element(by.xpath(modalshow + "//*[contains(@class,'prices')]//*[text()='Customer Price']")),
    yourcostdiv = element(by.xpath(modalshow + "//*[contains(@class,'prices')]//*[text()='Vendor Cost']")),
    custOrdered = element(by.id('customerQty')),
    custshipped = element(by.id('customerBilled')),
    custprice = element(by.id("customerPrice")),
    customerUOM = element(by.id('customerEa')),
    vendOrdered = element(by.id('qty')),
    vendshipped = element(by.id('billed')),
    vendcost = element(by.id("cost")),
    vendea = element(by.id('ea')),
    costOnlyCB = element(by.xpath(modalshow + "//label[text()='Cost only']/preceding-sibling::input")),
    productItemNumberCB = element(by.xpath(modalshow + "//label[text()='Hide product item number']/preceding-sibling::input")),
    quantityCB = element(by.xpath(modalshow + "//label[text()='Hide quantity and unit price']/preceding-sibling::input")),
    productMargin = element(by.id('productMargin')),
    //  originalPoCost= element(by.xpath(modalshow+"//*[@id='originalPoCost']")),
    originalPoCost = element(by.css("#originalPoCost:disabled")),
    hideProductPlusIcon = element(by.xpath("(//*[@class='MuiSvgIcon-root'])[2]")),

    // TC006-validatevendorDetails
    getponumber = element(by.xpath("//*[@class='d-none d-sm-inline-block']//div[@class='d-inline-block']//strong")),
    vendorQuote = element(by.id('quote')),
    vendorAdditionalInfo = element(by.id('additionalInfoVendor')),

    //TC007-validateAdvancedDetails
    customeritemtxt = element(by.id('customerItemNo')),
    customercostcentertxt = element(by.id('customerCostCenter')),
    customerAdditionalInfo = element(by.id('addittionalInfo')),

    // viewdetatilsupdatebutton = element(by.xpath("(//form)[4]//button[text()='Update']")),
    viewdetatilsupdatebutton = element(by.buttonText("Update")),

    //TC008
    closemodalpopupbtn = element(by.css("[class='close']")),
    lineItemsList = element.all(by.xpath('//*[@class="details-table row"]//*[@class="align-items-center row"]')),
    deleteButton = element(by.buttonText("Delete")),
    colorElement = element(by.xpath('((//*[@class="table__body"])[1]//*[@class="down-lg-none col"])[2]/p')),
    sizeElement = element(by.xpath('((//*[@class="table__body"])[1]//*[@class="font-weight-bold col"])[1]/p')),
    customerQty = element(by.xpath('(//*[@class="table__body"])[1]//*[contains(@class,"customer-col-qty")]/p')),
    customerPrice = element(by.xpath('(//*[@class="table__body"])[1]//*[contains(@class,"customer-col-price")]/p')),
    userQty = element(by.xpath('(//*[@class="table__body"])[1]//*[contains(@class,"user-col-qty")]/p')),
    userPrice = element(by.xpath('(//*[@class="table__body"])[1]//*[contains(@class,"user-col-cost")]/p')),
    vendorElement = element(by.xpath('((//*[@class="table__body"])[1]//*[@class="down-lg-none col"])[3]/p')),
    descriptionElement = element(by.xpath('((//*[@class="table__body"])[1]//*[@class="description col"])[1]')),
    statusElement = element(by.xpath('((//*[@class="table__body"])[1]//*[@class="down-lg-none col"])[4]/p/span')),
    poNumberElement = element(by.xpath('((//*[@class="table__body"])[1]//*[@class="font-weight-bold text-primary col"])/p')),
    productTitle = element(by.css('[class="item-title text-secondary"]')),
    vendorNameInDetailsPage = element(by.xpath('//*[text()="Vendor"]/following-sibling::span')),
    statusInDetailsPage = element(by.xpath('//*[text()="Status"]/following-sibling::span//span')),

    productDescriptionField = element(by.id("Description")),
    colorField = element(by.id("color")),
    sizeField = element(by.id("size")),
    productField = element(by.id("product")),
    supplierField = element(by.id("supplierItem")),
    styleCodeField = element(by.id("styleCode")),
    vendorNameInVendorDetiailsSection = element(by.xpath("//label[text()='Vendor']/following-sibling::p")),
    poNumberInVendorDetiailsSection = element(by.xpath("//label[text()='Po']/following-sibling::p")),
    jobIdInDetailsPage = element(by.css('[class="job-status-area columns"] strong')),
    customFacingDescription = element(by.xpath("//a[text()='Customer-Facing Descriptions']")),
    vendorDescription = element(by.xpath("//a[text()='Vendor Descriptions']")),
    descriptionField1 = element(by.id("Description")),
    descriptionField2 = element(by.id("description2")),
    descriptionField3 = element(by.id("description3")),
    reqShipDateFieldInDetailsPage = element(by.css('[name="requestedShipDate"]')),
    inHandDateFieldInDetailsPage = element(by.css('[name="inHandDate"]')),
    reqshipDateField = element(by.id('reqShipDate')),
    inHandDateField = element(by.id("inHandsDate")),
    addAlternateAddressButton = element(by.buttonText("Add Alternate Shipping Address")),
    nameField = element(by.id("name")),
    zipField = element(by.id("zip")),
    stateDrop = element(by.xpath("//div[text()='State - Required']")),
    submitButton = element(by.buttonText("Submit")),
    nameInAddressCard = element(by.css('[class="card-body"] div')),
    productNameCard = element(by.xpath('//h2[@class="product-card__name"]'))

let vendorName = '',
    status = '',
    description = '',
    ponumberText = '',
    color = '',
    size = '',
    poNumber = '',
    customerItem = '',
    customerCostCenter = '',
    addittionalInfo = '',
    myQuote = '',
    cQty = '',
    cPrice = '',
    uQty = '',
    uPrice = '',
    description1 = '',
    description2 = '',
    description3 = '',
    reqShipDate = '',
    inHandDate = '',
    nameText = '',
    lineItem = '',
    zipCode = ''

// TC002-Validate Header section

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
module.exports = {
    /*Used to save application verification data form dynamic verification*/
    specData: {},

    clickOnFirstLineItemDesc: () => {
        actions.jsClick(firstLineItemDesc, 'First Line Item')
        Long_Wait()
    },

    verifyLineItemCount: () => {
        console.log(lineItemsList.count())
        if (lineItemsList.count() > 0) {
            this.clickOnAddProductButton()
            this.clickOnProduct('ASI Products');
            this.searchProducts("Shirts");
            this.clickOnOrderNowButton();
            this.enterProductQuantity();
            this.clickOnAddPricingButton();
            this.enterRequestedShipDate()
            this.enterProductPricing()
            this.clickOnAddLineItemButton();
        }
    },

    GetelementText: function (locator) {
        Medium_Wait()
        Medium_Wait()
        actions.verifyElementDisplayed(locator, true, "GetElementText");
        return locator.getText().then(function (text) {
            reporter.appendTest('get element text', 'Verified ' + text, "PASS");
        });
    },
    getvendorName: function () {
        return this.GetelementText(vendorNameElement);
    },
    getstatus: function () {
        return this.GetelementText(statusElement);
    },
    getDecorisselect: function () {
        Medium_Wait()
        return decorisSelect.isPresent().then(function (status) {
        });
    },
    Verifiedmodalheaders: function (Name, value) {
        Medium_Wait()
        Medium_Wait()
        var hdrxp = element(by.xpath(modalshow + "//span[text()='" + Name + "']/..//span[text()='" + value + "']"));
        actions.VerifyElementPresent(hdrxp, true, Name);
    },
    Verifiedmodal_headers: function (Name, value) {
        Medium_Wait()
        Medium_Wait()
        var hdrxp = element.all(by.xpath("//p[text()='" + value + "']")).get(1);
        actions.VerifyElementPresent(hdrxp, true, Name);
    },
    verifymodalheadersStatus: function (Name, value) {
        Medium_Wait()
        var ele = element(by.xpath(modalshow + "//span[text()='" + Name + "']/..//span//p//span[text()='" + value + "']"));
        actions.VerifyElementPresent(ele, true, Name);
    },
    VerifyLineItemImageIsDisplayed: function () {
        Medium_Wait()
        Medium_Wait()
        actions.VerifyElementPresent(lineitemimg, true, "Line Item Image");
    },
    verifyviewdecorateIsDisplayed: function () {
        actions.VerifyElementPresent(viewdecorebutton, true, "view decore button");
    },

    verifyProductDetailsIsDisplayed: function () {
        actions.VerifyElementPresent(productdetails, true, "product details");

    },
    verifyPriceDetailsIsDisplayed: function () {
        actions.VerifyElementPresent(pricingdetails, true, "pricing Details");
    },
    verifyVendorDetailsIsDisplayed: function () {
        actions.verifyElementDisplayed(vendordetails, true, "vendor Details");
    },
    verifyShippingDetailsIsDisplayed: function () {
        actions.verifyElementDisplayed(shippingdetails, true, "shipping Details");
    },
    verifyAdvancedDetailsIsDisplayed: function () {
        Medium_Wait()
        actions.verifyElementDisplayed(Advanceddetails, true, "Advanced Details");
    },
    // TC003-------
    verifyProductDetailsTextboxesAreDisabled: function (item) {
        Medium_Wait()
        var txtbox = element(by.xpath("//div[@class='modal fade show']//input[@disabled and @id='" + item + "']"));
        actions.verifyElementDisplayed(txtbox, true, item + " is not editable");
    },
    // TC004-----
    verifytextboxisnumberic: function (elem, logname) {
      actions.blurText(elem, "abCdeFGH", logname)
        elem.getAttribute('value').then(value => {
          if(value.length < 1) {
             reporter.appendTest('Verifying field: ' + logname, "Verfied that field does'nt allow Alphabets", "PASS");
                actions.blurText(elem, "@#$%^&*", logname)
                   elem.getAttribute('value').then(value => {
                     if (value.length < 1) {
                       reporter.appendTest('Verifying field: ' + logname, "Verfied that field does'nt allow Special characters", "PASS");
                         actions.blurText(elem, "12345", logname)
                           elem.getAttribute('value').then(value => {
                             if (value.length > 0)
                                reporter.appendTest('Verifying field: ' + logname, "Verfied that field allows Numbers", "PASS");
                             else reporter.appendTest('Verifying field: ' + logname, "Verfied that field <b>does'nt allow Numbers</b>", "FAIL");
                        })
                    } else reporter.appendTest('Verifying field: ' + logname, "Verfied that field  <b>allows Special character</b>", "FAIL");
                })
            } else reporter.appendTest('Verifying field: ' + logname, "Verfied that field <b>allows Alphabet</b>", "FAIL");
        })
    },
    verifytextboxAllownumericAndSpecialchar: function (elem, logName) {
        Medium_Wait()
        try {
            actions.blurText(elem, 'abCdeFGH', logName);
            elem.getAttribute('value').then(alphaval => {

                actions.blurText(elem, '@#$%^&*', logName);
                elem.getAttribute('value').then(special => {

                    actions.blurText(elem, '1234', logName);
                    elem.getAttribute('value').then(numeric => {

                        if (alphaval.length > 0 && special.length > 0 && numeric.length > 0) {
                            reporter.appendTest('Verifying Field: ' + logName, 'Textbox allows Alphanumeric and special characters', "PASS");
                        }
                        else {
                            reporter.appendTest('Verifying Field: ' + logName, 'Textbox allows Alphanumeric and special characters', "FAIL");
                        }
                    });
                })
            })
        } catch (error) {
            reporter.appendTest('Error', error, "FAIL");
        }

    },
    verifytextboxisAbletoenter: function (elem, valueToEnter='12345', logName) {
        try {
            actions.blurText(elem, valueToEnter, logName)
             elem.getAttribute('value').then(function (alpha) {
                if (alpha === valueToEnter)
                    reporter.appendTest('Verifying ' + logName, 'Verified that field: ' + logName + ' is <b>Editable</b>', "PASS");
                else
                    reporter.appendTest('Verifying ' + logName, 'Verified that field: ' + logName + ' is <b>Not Editable</b>', "FAIL");
            });
         } catch (error) {
            reporter.appendTest('Error', error, "FAIL");
        } //end of catch()
    },
    verifyProfitMarginField: function (valueToEnter,) {
        try {
            actions.blurText(productMargin, "54321", "Profit margin")
            productMargin.getAttribute('value').then(function (alpha) {
                if (alpha !== valueToEnter)
                    reporter.appendTest('Verifying Profit margin field', 'Verified that field: Profit margin field is <b>Not Modifiable</b>', "PASS");
                else
                    reporter.appendTest('Verifying Profit margin field', 'Verified that field: Profit margin field is <b>Modifiable</b>', "FAIL");
            });
        } catch (error) {
            reporter.appendTest('Error', error, "FAIL");
        } //end of catch()
    },
    verifytextboxisReadable: function (elem, input, logName) {
        Medium_Wait()
        try {
            actions.blurText(elem, input, logName)
            elem.getAttribute('value').then(function (val) {
                if (val != input) {
                    reporter.appendTest('Textbox is only readable', 'Verified successfully ' + logName, "PASS");
                }
                else {
                    reporter.appendTest('Textbox is not readable', 'Verified Failed ' + logName, "FAIL");
                }
            });
        } catch (error) {
            reporter.appendTest('Error', error, "FAIL");
        }
    },

    verifyProfitMarginFieldValue: function (valueToEnter,) {
        reporter.appendTest('<b>Verifying Profit margin</b>', 'Calculated Profit margin value should be populated after Price and cost are entered', "PASS");
        try {
            custprice.getAttribute('value').then(function (customerPrice) {
                reporter.appendTest('Customer Price: ', customerPrice, "");
                vendcost.getAttribute('value').then(function (userCost) {
                    reporter.appendTest('User cost: ', userCost, "");
                    productMargin.getAttribute('value').then(async function (profitMargin) {
                        let profit = await customerPrice - userCost,
                            expectedProfitMargin = await (profit / customerPrice) * 100
                        profitMargin = await Math.ceil(profitMargin)
                        expectedProfitMargin = await Math.ceil(expectedProfitMargin)
                        Short_Wait()
                        // reporter.appendTest('Calculated Profit (customer price- your cost):', profit, "");
                        //  reporter.appendTest('Displayed Profit margin:', profitMargin, "");
                        //     reporter.appendTest('Calculated Profit margin (Profit/customer price):', expectedProfitMargin, "");
                        if (profitMargin == expectedProfitMargin)
                            reporter.appendTest('Verifying Profit margin value', 'Verified that Actual/Displayed Profit margin: ' + profitMargin + ' is same as Calculated Profit margin(Profit/customer price): ' + expectedProfitMargin, "PASS");
                        else {
                            reporter.appendTest('Verifying Profit margin value', 'Verified that Actual/Displayed Profit margin: ' + profitMargin + ' is not same as Calculated Profit margin(Profit/customer price): ' + expectedProfitMargin, "FAIL");
                            expect(false).toReport(true, 'Verified that Actual/Displayed Profit margin: ' + profitMargin + ' is not same as Calculated Profit margin(Profit/customer price): ' + expectedProfitMargin);
                        }
                    })
                })
            });
        } catch (error) {
            reporter.appendTest('Error', error, "FAIL");
            expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        } //end of catch()
    },
    clickOnSelectedProduct: function () {
        Long_Wait()
        reporter.appendTest('<b>Selecting Added Product: </b>', lineItem, "");
        if (lineItem != '') {
            let product = element(by.xpath('//p[contains(text(),"' + lineItem + '")]'))
            actions.Click(product, lineItem);
        } else reporter.appendTest('Selecting Added Product', 'Failed: Product name variable is empty', "FAIL");

    },

    verifyPricingSectionIsDisplayed: function () {
        actions.verifyElementDisplayed(customerpricediv, true, "Customer Price");
        actions.verifyElementDisplayed(yourcostdiv, true, "Vendor Price");
    },
    verifyCustomerShippedValueIsAbleToEnterWithonlyNumbers: function () {
        this.verifytextboxisAbletoenter(custshipped, '50', 'Customer Shipped');
        this.verifytextboxisnumberic(custshipped, 'Customer shipped');
    },
    verifyCustomerOrderedValueIsAbleToEnterWithonlyNumbers: function () {
        this.verifytextboxisnumberic(custOrdered, 'customer ordered');
    },
    verifyCustomerPriceValueIsAbleToEnterWithonlyNumbers: function () {
        this.verifytextboxisnumberic(custprice, 'customer Price');
    },
    verifyCustomerPriceValue: function (value) {
        var customerPrice = actions.GetAttribute(custprice, value, 'Price')
        actions.expectToEqual(customerPrice, value, 'Customer price')
    },
    verifyLineItemCustomerPriceValue: function (value) {
        actions.GetFieldValueAndCompareToBeEqual(lineItemCustPrice, value, "Customer Price", "Displayed Customer price", "Expected Customer price")
    },
    verifyLineItemCostValue: function (value) {
        actions.GetFieldValueAndCompareToBeEqual(lineItemCost, value, "Vendor Cost", "Displayed Vendor Cost", "Expected Vendor Cost")
    },
    verifyVendorCostValue: function (value) {
        var vendorCost = actions.GetAttribute(vendcost, value, 'Cost')
        actions.expectToEqual(vendorCost, value, 'Vendor cost')
    },
    verifyCustomerUOMisEditable: function (customerPrice = '5', customerQuantity = '25') {
        cPrice = customerPrice;
        cQty = customerQuantity;
        this.verifytextboxisAbletoenter(custOrdered, customerQuantity, 'Customer Ordered');
        this.verifytextboxisAbletoenter(custprice, cPrice, 'Customer Price');
        this.verifytextboxisAbletoenter(customerUOM, '123@Mail', 'Customer UOM');
    },
    verifyVendorShippedValueIsAbleToEnterWithonlyNumbers: function () {
        this.verifytextboxisAbletoenter(vendshipped, '50', 'vendor Shipped');
        this.verifytextboxisnumberic(vendshipped, 'vendor shipped');
    },
    verifyVendorOrderedValueIsAbleToEnterWithonlyNumbers: function () {
        this.verifytextboxisnumberic(vendOrdered, 'vendor ordered');
    },
    verifyVendorCostValueIsAbleToEnterWithonlyNumbers: function () {
        this.verifytextboxisnumberic(vendcost, 'customer Price');
    },
    verifyVendorUOMValueIsEditable: function (userPrice = '2.5', userQuantity = '25') {
        uPrice = userPrice;
        uQty = userQuantity;
        this.verifytextboxisAbletoenter(vendOrdered, userQuantity, 'vendor Ordered');
        this.verifytextboxisAbletoenter(vendcost, userPrice, 'Vendor Cost');
        this.verifytextboxisAbletoenter(vendea, '123@EA', 'Vendor UOM');
    },
    verifyCostonlyCBiseditable: function () {
        actions.VerifyElementPresent(costOnlyCB, true, "CostOnly checkbox");
        //  this.verifyCheckboxIsEditable(costOnlyCB,'CostOnly checkbox');
    },
    verifyHideProductItemNumberCBIsEditable: function () {
        actions.VerifyElementPresent(productItemNumberCB, true, "hide product item checkbox");
        //  this.verifyCheckboxIsEditable(itemNumberCB,'hide product item checkbox');
    },
    verifyHideQuantityCBiseditable: function () {
        actions.VerifyElementPresent(quantityCB, true, "Hide quantity checkbox");
        //    this.verifyCheckboxIsEditable(quantityCB,'Hide quantity checkbox');
    },
    verifyCheckboxIsEditable: async (elem, logname) => {
        var status = await actions.getCheckBoxStatus(elem, logname);
        actions.Click(elem, logname);
        Short_Wait()
        var status1 = await actions.getCheckBoxStatus(elem, logname);
        actions.expectNotToEqual(status, status1, logname + ' is editable');
        Medium_Wait()
    },
    verifyProductMariginIsAbleToEnter: function () {
        this.verifytextboxisAbletoenter(productMargin, 'cig123!@#', 'Product Margin');
    },
    verifyOriginalPoCostIsOnlyReadable: function () {
        actions.VerifyFieldDisabled(originalPoCost, true, 'Original Po Cost')
    },
    // TC006----
    verifyVendorDetails: function (name, value, po = null) {
        vendorNameInVendorDetiailsSection.getText().then(displayedVendor => {
            actions.expectToEqualCustom(displayedVendor, vendorName, 'Vendor', "Vendor name displayed in Vendor details section", "Vendor name displayed in Product List table");
            poNumberInVendorDetiailsSection.getText().then(displayedPoNumber => {
                actions.expectToContainCustom(displayedPoNumber, poNumber, 'PO Number', "PO Number displayed in Vendor details section", "PO Number displayed in Product List table");
            })
        })
    },
    verifyVendorDetailSection: async () => {
        if (typeof po != undefined && po != null) {
            var poNumberElement = element(by.xpath("//label[text()='Po']/following-sibling::p"))
            Short_Wait()
            let poNumber = await poNumberElement.getText()
            actions.expectToEqual(poNumber, ponumberText, "PO Number Validation")
        }
    },
    enterVendorQuoteIsEdiTable: function (value) {
        myQuote = value;
        // actions.blurText(vendorQuote, '', 'Quote'); 
        // Short_Wait()
        actions.blurText(vendorQuote, myQuote, 'Quote');
        // this.verifytextboxisAbletoenter(vendorQuote, 'My Quote', 'Quote');
    },
    verifyDescriptionFieldsIsEditable: function (Desc1 = 'Desc1_', Desc2 = 'Desc2_', Desc3 = 'Desc3_') {
        description1 = Desc1;
        description2 = Desc2;
        description3 = Desc3;
        // actions.blurText(descriptionField1, '', 'Description 1'); 
        // actions.blurText(descriptionField2, '', 'Description 2'); 
        // actions.blurText(descriptionField3, '', 'Description 3'); 
        // Short_Wait()
        actions.blurText(descriptionField1, description1, 'Description 1');
        actions.blurText(descriptionField2, description2, 'Description 2');
        actions.blurText(descriptionField3, description3, 'Description 3');
    },
    enterAdditionalInfoiseditable: function (value) {
        addittionalInfo = value;
        // actions.blurText(vendorAdditionalInfo, '', 'Additional Info');      
        // Medium_Wait()
        actions.blurText(vendorAdditionalInfo, addittionalInfo, 'Additional Info');
        //   this.verifytextboxisAbletoenter(vendorAdditionalInfo, 'My Additional info', 'Additional Info');
    },
    getPONumbertext: function () {
        Medium_Wait()
        return this.GetelementText(poNumberElement);
    },
    clickOnVendorDetailsSection: function () {
        Medium_Wait()
        actions.waitUntilElementClickable_OffShore(vendordetails, "vendor details tab");
        actions.jsClick(vendordetails, 'Vendor details Drop');
    },
    // TC007-AdvanceDetailSection
    clickOnAdvancedDetailsSection: function () {
        actions.Click(Advanceddetails, 'Advanced details Drop');
    },
    enterCustomerItemNumberField: function (value) {
        customerItem = value;
        // actions.blurText(customeritemtxt, '', 'Customer item'); 
        // Short_Wait()
        actions.blurText(customeritemtxt, customerItem, 'Customer item');
        // this.verifytextboxisAbletoenter(customeritemtxt, value , 'Customer item');
    },
    enterCustomerCostCenter: function (value) {
        customerCostCenter = value;
        // actions.blurText(customercostcentertxt, '', 'Customer cost center'); 
        // Short_Wait()
        actions.blurText(customercostcentertxt, customerCostCenter, 'Customer cost center');
        // this.verifytextboxisAbletoenter(customercostcentertxt, value , 'Customer cost center');
    },
    enterAdditionalInfo: function (value) {
        addittionalInfo = value;
        // actions.blurText(customerAdditio ');   
        // Short_Wait()       
        actions.blurText(customerAdditionalInfo, addittionalInfo, 'Additional info');
        // this.verifytextboxisAbletoenter(customerAdditionalInfo, value, 'Additional Info');
    },
    clickOnModalPopupUpdateButton: function () {
        // browser.switchTo().frame(element(by.tagName('//form')).getWebElement());
        // Medium_Wait()
        actions.Click(viewdetatilsupdatebutton, 'Update button');
      //  actions.ClickWithOutScrollingToElement(viewdetatilsupdatebutton, 'Update button');
        browser.refresh()
        Long_Wait()
        // var EC = protractor.ExpectedConditions
        //  browser.wait(EC.elementToBeClickable(viewdetatilsupdatebutton), 10000).then(() => {
        //    browser.executeScript("arguments[0].click();", viewdetatilsupdatebutton.getWebElement()).then(function () {
        //          reporter.appendTest('Performing Click', 'Performed click on Update button', "PASS");
        //      }, function (err) {
        //          reporter.appendTest('Performing Click', 'Performing click on Update button', "FAIL");
        //          expect(false).toReport(true, "Unable to perform Click operation on 'Update button' because of " + err.message);
        //      });
        //  }).catch(err => {
        //      reporter.appendTest('Unable to click Button', 'Unable to click Button: "Update button" Button', "FAIL");
        //      expect(false).toReport(true, "Unable to click Button because of " + err.message);
        //  })
    },
    VerifyjobdetailsPageIsdisplayed: function () {
        actions.verifyElementDisplayed(tablebodyel, 'job details table');
    },
    // TC008-------------
    updateValueinPricedetailspage: function () {
        Medium_Wait()
        custOrdered.getAttribute('value').then(function (price) {
            Medium_Wait()
            actions.blurText(custOrdered, parseInt(price) - 1, "price")
            custOrdered.getAttribute('value').then(function (alpha) {
                if (alpha === price)
                    reporter.appendTest('Textbox is able to enter', 'Verified successfully ' + price, "PASS");
                else reporter.appendTest('Textbox is not able to enter', 'Verified Failed ' + price, "FAIL");
            });
            actions.jsClick(closemodalpopupbtn, 'ViewDetails Close button');
            actions.waitUntilElementPresent_OffShore(tablebodyel, 'job details table', 20000);
            var tblqty = element(by.xpath("(" + table_body + "//div[contains(@class,'customer-col-qty')]//*[text()='" + price + "'])[1]"));
            actions.verifyElementDisplayed(tblqty, true, 'customer ordered qty');
        });
    },
    getPONumberFromDetailsPageIfExist: async () => {
        element.all(by.xpath('(//*[@class="details-table row"]//*[@class="table__body"])[1]//*[@class="down-lg-none col"][4]/p/span')).then(poElementsArray => {
            poElementsArray[0].getText().then(poText => {
                if (poStatus == 'PO Created')
                    ponumberText = poText
            }) //end of getText
        }) //end of all
    },
    getStatusFromTable: async () => {
        statusElement.getText().then(statusText => {
            status = statusText;
        })
    },
    getDescFromTable: async () => {
        descriptionElement.getText().then(descriptionText => {
            description = descriptionText;
        })
    },
    getVendorNameFromTable: async () => {
        vendorElement.getText().then(vendorNameText => {
            vendorName = vendorNameText;
        })
    },
    getSizeFromTable: async () => {
        sizeElement.getText().then(sizeText => {
            size = sizeText;
        })
    },
    getColorFromTable: async () => {
        colorElement.getText().then(colorText => {
            color = colorText;
        })
    },
    getColorFromTable: async () => {
        poNumberElement.getText().then(poNumberText => {
            poNumber = poNumberText;
        })
    },
    storeProductLocal: () => {
        productNameCard.getText().then(productName => {
            lineItem = productName;
            reporter.appendTest('Retrieving Product', 'Selected Product: ' + lineItem, "PASS");
        })
    },
    storeLineItemDetailsFromTable: async () => {
        statusElement.getText().then(statusText => {
            status = statusText;
            reporter.appendTest('Line item status:', status, "");
        })
        descriptionElement.getText().then(descriptionText => {
            description = descriptionText;
            reporter.appendTest('Line item description:', description, "");
        })
        vendorElement.getText().then(vendorNameText => {
            vendorName = vendorNameText;
            reporter.appendTest('Line item vendorName:', vendorName, "");
        })
        sizeElement.getText().then(sizeText => {
            size = sizeText;
            reporter.appendTest('Line item size:', size, "");
        })
        colorElement.getText().then(colorText => {
            color = colorText;
            reporter.appendTest('Line item color:', color, "");
        })
    },
    storeAddedLineItemDetailsFromTable: async () => {
     element(by.xpath('//div[@class="details-table row"]//p[contains(text(),"' + lineItem + '")]')).getText().then(descriptionText => {
        description = descriptionText;
            reporter.appendTest('Line item description:', description, "");
        })
       element(by.xpath('//div[@class="details-table row"]//p[contains(text(),"' + lineItem + '")]/../following-sibling::div[11]/p/span')).getText().then(statusText => {
         status = statusText;
             reporter.appendTest('Line item status:', status, "");
         })
         element.all(by.xpath('//div[@class="details-table row"]//p[contains(text(),"' + lineItem + '")]/../following-sibling::div/p')).then(columnElementsArray => {
            columnElementsArray[2].getText().then(vendorNameText => {
                vendorName = vendorNameText;
                  reporter.appendTest('Line item vendorName:', vendorName, "");
            })
            columnElementsArray[1].getText().then(sizeText => {
                size = sizeText;
                  reporter.appendTest('Line item size:', size, "");
            })
            columnElementsArray[0].getText().then(colorText => {
                color = colorText;
                 reporter.appendTest('Line item color:', color, "");
            })
            columnElementsArray[3].getText().then(poText => {
                poNumber = poText;
                 reporter.appendTest('Line item poNumber:', poNumber, "");
            })
        })
    },
    selectAddedProduct: ()=>{
     element.all(by.xpath('//div[@class="details-table row"]//p[contains(text(),"' + lineItem + '")]')).then(lineItemList => {
            actions.Click(lineItemList[0],lineItem)
        })
    },

    storeStatsFromTable: async () => {
        customerQty.getText().then(qty => {
            cQty = qty;
        })
        customerPrice.getText().then(price => {
            cPrice = price;
        })
        userQty.getText().then(qty => {
            uQty = qty;
        })
        userPrice.getText().then(price => {
            uPrice = price;
        })
    },
    storeStatsOfLineItemFromTable: async () => {
        element.all(by.xpath('//p[contains(text(),"' + lineItem + '")]/../following-sibling::div[contains(@class,"col-qty")]/p')).then(columnElementsArray => {
            try {
                columnElementsArray[0].getText().then(qty => {
                    cQty = qty;
                })
                columnElementsArray[1].getText().then(qty => {
                    uQty = qty;
                })
            } catch (error) {
                expect(false).toReport(true, "Unable to perform GetText operation because of " + error.message);
            }
        })
        element.all(by.xpath('//p[contains(text(),"' + lineItem + '")]/../following-sibling::div/p/span[contains(@class,"currency-value")]')).then(columnElementsArray => {
            try {
                columnElementsArray[0].getText().then(price => {
                    cPrice = price;
                })
                columnElementsArray[1].getText().then(price => {
                    uPrice = price;
                })
            } catch (error) {
                expect(false).toReport(true, "Unable to perform GetText operation because of " + error.message);
            }
        })
    },



    verifyDisplayedProductDetails: async () => {
        Medium_Wait()
        reporter.appendTest('Verifying <b>Product details Header</b>', '***************************', "");
        productTitle.getText().then(title => {
            actions.expectToEqualCustom(title, description, "Product Description", "Products description in details page", "Products description in Products list Table")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
        vendorNameInDetailsPage.getText().then(vendor => {
            actions.expectToEqualCustom(vendor, vendorName, "Vendor", "Vendor name displayed in details page", "Vendor name displayed in Products list Table")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
        statusInDetailsPage.getText().then(poStatus => {
            actions.expectToEqualCustom(poStatus, status, "PO status", "PO status displayed in details page", "PO status displayed in Products list Table")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
    },
    verifyExpectedButton: function (buttonName) {
        var button = element(by.xpath("//button[text()='" + buttonName + "']"))
        actions.verifyElementDisplayed(button, true, buttonName + ' button')
    },

    clickOnExpectedButton: function (buttonName) {
        var button = element(by.xpath("//button[text()='" + buttonName + "']"))
        actions.Click(button, buttonName + ' button')
    },

    verifyEditProductDetailsButton: function () {
        this.verifyExpectedButton('Edit Product Details')
    },

    verifyHideProductButton: function () {
        this.verifyExpectedButton('Hide Product')
    },

    clickOnHideProductButton: function () {
        this.clickOnExpectedButton('Hide Product')
        Medium_Wait()
    },

    verifyDeleteProductButton: function () {
        this.verifyExpectedButton('Delete Product')
    },

    verifyAddTitleButton: function () {
        this.verifyExpectedButton('Add Title')
    },

    verifyHideProductPlusIcon: function () {
        actions.verifyElementDisplayed(hideProductPlusIcon, true, 'Hide product + Icon')
    },

    clickOnHideProductPlusIcon: function () {
        actions.Click(hideProductPlusIcon, 'Hide product + Icon')
        Medium_Wait()
    },

    verifyDeleteOption: () => {
        actions.verifyElementDisplayed(deleteButton, true, "Delete Option")
    },
    clickOnDeleteOption: () => {
        actions.jsClick(deleteButton, "Delete Option")
    },
    verifyProductDetailsFieldsValue: async () => {
        reporter.appendTest('Verifying <b>Product details section values</b>', '***************************', "");
        productDescriptionField.getAttribute('value').then(descriptionValue => {
            actions.expectToEqualCustom(descriptionValue, description, "Product Description", "Products description in Products details section", "Products description in Products list Table")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        })
        colorField.getAttribute('value').then(colorValue => {
            actions.expectToEqualCustom(colorValue, color, "Product color", "Product color displayed in Products details section", "Product color displayed in Products list Table")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        })
        sizeField.getAttribute('value').then(sizeValue => {
            actions.expectToEqualCustom(sizeValue, size, "Product size", "Product size displayed in Products details section", "Product size displayed in Products list Table")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        })
    },

    verifyProductDetailsFieldsDisabled: async () => {
        reporter.appendTest('Verifying <b>Product details section Fields</b>', 'All fields should be disabled/Not edistable unless its Custom product', "");
        actions.VerifyFieldDisabled(productDescriptionField, true, "Product Description Field")
        actions.VerifyFieldDisabled(colorField, true, "Color Field")
        actions.VerifyFieldDisabled(sizeField, true, "Size Field")
        actions.VerifyFieldDisabled(productField, true, "Product Field")
        actions.VerifyFieldDisabled(supplierField, true, "Supplier Field")
        actions.VerifyFieldDisabled(styleCodeField, true, "Style Code Field")
    },
    verifyProductDetailsFieldsEnabled: async () => {
        reporter.appendTest('Verifying <b>Product details section Fields</b>', 'All fields should be disabled/Not edistable unless its Custom product', "");
        actions.VerifyElementEnabled(productDescriptionField, true, "Product Description Field")
        actions.VerifyElementEnabled(colorField, true, "Color Field")
        actions.VerifyElementEnabled(sizeField, true, "Size Field")
        actions.VerifyElementEnabled(productField, true, "Product Field")
        actions.VerifyElementEnabled(supplierField, true, "Supplier Field")
        actions.VerifyElementEnabled(styleCodeField, true, "Style Code Field")
    },
    selectAnUpdatedProduct: async () => {
        // browser.navigate().refresh();
        Long_Wait() //Page is not getting automatically refresehd in automation, but manually gets refreshed automaticcally
        reporter.appendTest('<b>Verifying Updated Product</b>', '*****************', "");
         element.all(by.xpath('//div[@class="description col"]//p[text()="' + description + '"]')).then(selectedProduct => {
            actions.jsClick(selectedProduct[0], description)
        })
    },
    verifyUpdateAdvancedDetials: async () => {
        customeritemtxt.getAttribute('value').then(value => {
            actions.expectToEqualCustom(customerItem, value, "Customer Item", "Updated value", "Displayed value")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        })
        customercostcentertxt.getAttribute('value').then(value => {
            actions.expectToEqualCustom(customerCostCenter, value, "Customer Cost Center", "Updated value", "Displayed value")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        })
        customerAdditionalInfo.getAttribute('value').then(value => {
            actions.expectToEqualCustom(addittionalInfo, value, "Addittional Info", "Updated value", "Displayed value")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        })
    },
    verifyUpdateVendorDetials: async () => {
        vendorQuote.getAttribute('value').then(vendor => {
            actions.expectToEqualCustom(myQuote, vendor, "Vendor Quote", "Updated value", "Displayed value")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        })
        vendorAdditionalInfo.getAttribute('value').then(vendorAdditionalInfo => {
            actions.expectToEqualCustom(addittionalInfo, vendorAdditionalInfo, "Additional Inforamtion", "Updated value", "Displayed value")
        }, function (err) {
            expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        })
    },

    verifyUpdateDecriptionFields: async () => {
        actions.GetFieldValueAndCompareToBeEqual(descriptionField1, description1, 'Description 1', 'Displayed value', 'Updated value')
        actions.GetFieldValueAndCompareToBeEqual(descriptionField2, description2, 'Description 2', 'Displayed value', 'Updated value')
        actions.GetFieldValueAndCompareToBeEqual(descriptionField3, description3, 'Description 3', 'Displayed value', 'Updated value')
        // descriptionField1.getAttribute('value').then(Desc1 => {
        //      actions.expectToEqualCustom( description1,Desc1, "Description 1", "Updated value", "Displayed value")
        //    }, function (err) {
        //      expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        //  })
        // descriptionField2.getAttribute('value').then(Desc2 => {
        //      actions.expectToEqualCustom(description2, Desc2, "Description 1", "Updated value", "Displayed value")
        //    }, function (err) {
        //      expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        //  })
        // descriptionField3.getAttribute('value').then(Desc3 => {
        //      actions.expectToEqualCustom(description3, Desc3, "Description 1", "Updated value", "Displayed value")
        //    }, function (err) {
        //      expect(false).toReport(true, "Unable to perform getAttribute operation because of " + err.message);
        //  })
    },
    clickOnCustomDescription: function () {
        actions.Click(customFacingDescription, 'Custom Facing Description')
    },
    clickOnShippingDetailsSection: function () {
        actions.Click(shippingdetails, 'Shipping details Drop');
    },
    enterRequestedShipDate: () => {
        var currentDate = new Date();
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1; //as January is 0
        var yyyy = currentDate.getFullYear();
        if (dd < 10) dd = '0' + dd
        if (mm < 10) mm = '0' + mm
        reqShipDate = mm + '' + dd + '' + yyyy
        actions.blurText(reqshipDateField, reqShipDate, "Requested ship date")
        reqShipDate = mm + '/' + dd + '/' + yyyy //storing in this format to validate in other fields where date reflects
    },
    enterInHandDate: () => {
        var tommorow = new Date(86400000 + +new Date())
        // here 86400000 is used to convert millisecods to current date
        //gets the date of tommowrow, because we have to select future date for Inhand date 
        var dd = tommorow.getDate();
        var mm = tommorow.getMonth() + 1; //as January is 0
        var yyyy = tommorow.getFullYear();
        if (dd < 10) dd = '0' + dd
        if (mm < 10) mm = '0' + mm
        inHandDate = mm + '' + dd + '' + yyyy
        actions.blurText(inHandDateField, inHandDate, "Inhand date")
        inHandDate = mm + '/' + dd + '/' + yyyy  //storing in this format to validate in other fields where date reflects
    },
    verifyDateFields: async () => {
        actions.GetFieldValueAndCompareToBeEqual(reqShipDateFieldInDetailsPage, reqShipDate, 'ReqShip date', 'Date Displayed in line item details page', 'Date given while Adding the product')
        actions.GetFieldValueAndCompareToBeEqual(inHandDateFieldInDetailsPage, inHandDate, 'Inhand date', 'Date Displayed in line item details page', 'Date given while Adding the product')
    },
    clickOnAddAlternateAddressButton: function () {
        actions.Click(addAlternateAddressButton, 'Add Alternate Address Button');
    },
    clearAlternativeAddressIfExist :function (position) {  
      element.all(by.xpath('//div[@class="cust-card border-card clickable-card card"]/button')).then(altAddClear=>{
        if(altAddClear.length>0)
           actions.jsClick(altAddClear[0], "Clear Alternative Address");        
      })
    },
    selectStateDrop: function (stateText = 'California') {
        actions.Click(stateDrop, 'Sate Drop');
        Short_Wait()
        let state = element(by.xpath("//div[text()='" + stateText + "']"))
        actions.Click(state, stateText);
    },
    clickOnSubmitButton: function () {
        actions.Click(submitButton, 'Submit Button');
    },
    enterAlternateAddressName: function (name = "Jonathon") {
        nameText = name;
        actions.blurText(nameField, nameText, "Alternative address name");
    },
    enterZipCode: function (zip = "32820") {
        zipCode = zip;
        actions.blurText(zipField, zipCode, "Zip Code");
    },
    verifyUpdatedAddressCard: function () {
        nameInAddressCard.getText().then(name => {
            reporter.appendTest('<b>Verifying Alternative Address card</b>', 'Verified that Alternative Address card is displayed', "");
            actions.expectToEqualCustom(name, nameText.toUpperCase(), "Name in Alternative Address", 'Displayed value', 'Updated value')
        })
    },
    verifyUpdatedAddressCardNotToBePresent: function () {
        reporter.appendTest('<b>Verifying Alternative Address card</b>', 'Updated Address card should not be displayed saved', "");
        element.all(by.css('[class="card-body"] div')).then(nameCardArray => {
            if (nameCardArray.length < 1)
                reporter.appendTest("Verifying Element", 'Verified that "Alternative Address Card" is not Displayed ', "PASS");
            else {
                reporter.appendTest("Verifying Element", 'Verified that "Alternative Address Card" is Displayed ', "FAIL");
                expect(true).toReport(false, "Verifying Element is FAILED for: Alternative Address Card");
            }
        })
    },

    validateUpdatedStatsOfLineItem: async () => {
        Long_Wait()
        // browser.switchTo().defaultContent()
        reporter.appendTest('<b>Verifying Updated line item</b>', '**************************', "");
        element.all(by.xpath('//p[contains(text(),"' + lineItem + '")]/../following-sibling::div[contains(@class,"col-qty")]/p')).then(columnElementsArray => {
            actions.GetTextAndCompareToBeEqual(columnElementsArray[0], cQty, "Customer Qty", 'Displayed value', 'Updated value')
            actions.GetTextAndCompareToBeEqual(columnElementsArray[1], uQty, "User Qty", 'Displayed value', 'Updated value')
        })
        element.all(by.xpath('//p[contains(text(),"' + lineItem + '")]/../following-sibling::div/p/span[contains(@class,"currency-value")]')).then(columnElementsArray => {
            actions.GetTextAndCompareToBeEqual(columnElementsArray[0], cPrice, "Customer Price", 'Displayed value', 'Updated value')
            actions.GetTextAndCompareToBeEqual(columnElementsArray[1], uPrice, "User Price", 'Displayed value', 'Updated value')
        })
    },
    clickOnCloseButton: function () {
        actions.jsClick(closemodalpopupbtn, 'Close button');
    },


};

