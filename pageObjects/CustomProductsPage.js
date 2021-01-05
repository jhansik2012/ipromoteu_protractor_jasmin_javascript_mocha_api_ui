// *************************************************
/*global document, window, alert, console, require, browser,jasmine,
 requirePage, requireData, requireConfig, requireLibrary,
 describe, it, beforeEach, forEach, by, includes, expect, titlePromise, includes , element, $, then, $locatorRepeater, calenderInputData*/
/*
 */
'use strict';

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
    random = new Random(Random.engines.mt19937().autoSeed()),
    lineitemdetails = requirePage('LineItemDetailsPage')
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
//Main Page
customProductsLink= element(by.xpath('//ul[@class="main-nav_list"]//h6[text()="Custom Products"]')),
jobsLink= element(by.xpath('//ul[@class="main-nav_list"]//h6[text()="Jobs"]')),
customProductsPage= element(by.xpath("//h1[text()='Custom Products']")),
keywordSearchField= element(by.id("keyword")),
supplierSearchField= element(by.id("vendor")),
createNewButton= element(by.buttonText("CREATE NEW")),

//Create Page
createCustomProductsPage= element(by.xpath("//div[@class='modal-content']//h5[text()='Create Custom Product']")),
vendorSearchField= element(by.id("vendorSeach")),
productNameField= element(by.id("productName")),
description2Field= element(by.id("description2")),
description3Field= element(by.id("description3")),
vendorAdditionalInfoField= element(by.id("vendorAdditionalInfo")),
productCodeField= element(by.id("productCode")),
supplierItemField= element(by.id("supplierItem")),
styleCodeField= element(by.id("styleCode")),
nextButton= element(by.buttonText("NEXT")),

colorField= element(by.id("color")),
sizeField= element(by.id("size")),
priceField= element(by.id("price")),
costField= element(by.id("cost")),
priceUomField = element(by.id("priceUom")),
costUomField = element(by.id("costUom")),
customerAdditionalInfoField = element(by.id("customerAdditionalInfo")),
fileUploadSection = element(by.xpath('//input[@class="file-input"]')),
uploadedFileName = element(by.css('[class="list-unstyled files-list"] li')),
previousButton = element(by.buttonText("PREVIOUS")),
submitButton = element(by.buttonText("SUBMIT")),

//ProductDetails
productNameHeader = element(by.css('[class="title"]')),
previewImageElement = element(by.className("preview-img")),
updateButton = element(by.buttonText("UPDATE")),
closeButton= element(by.className('close')),

selectedVendor= '' ,
selectedProduct= '' ;

// var= element(by.xpath("")),
// var= element(by.css("")),
// var= element(by.className("")),
// var= element(by.id("")),
// var= element(by.linkText("")),
// var= element(by.buttonText("")),
// var= element.all(by.xpath("")),
 module.exports = {
  /*Used to save application verification data form dynamic verification*/
  specData: {},
   
   clickOnCustomProductsLink : function () {
    actions.jsClick(customProductsLink, "Customer Products Link");
   },
    clickOnJobsLink : function () {
    actions.jsClick(jobsLink, "Jobs Link");
   },
   clickOnCreateNewButton : function () {
    actions.jsClick(createNewButton, "Create New Button");
   },
   verifyCreateNewButtonIsDisplayed : function () {
    actions.verifyElementDisplayed(createNewButton,true, "Create New button");
   },
   verifyKeywordSearchFieldIsDisplayed : function () {
    actions.verifyElementDisplayed(keywordSearchField,true, "Keyword Search Field");
   },
   verifySupplierSearchFieldIsDisplayed : function () {
    actions.verifyElementDisplayed(supplierSearchField,true, "Supplier Search Field");
   },

   searchUsingKeyword : function (value) {
    actions.blurText(keywordSearchField, value, "Keyword Seacrh Field");
   },

   // '1. Vendor & Product Details'
   verifyCreateCustomProductsPageIsDisplayed : function () {
    actions.verifyElementDisplayed(createCustomProductsPage,true, "Create Custom Product Page");
   },
   verifyCustomProductsPageIsDisplayed : function () {
    actions.verifyElementDisplayed(customProductsPage,true, "Custom Product Page");
   },
   selectVendor :  (vendorName)=> {
    reporter.appendTest('Searching Vendor', 'Searching Vendor with name: '+vendorName, "PASS");  
     actions.blurText(vendorSearchField, vendorName, "Vendor Search field")
      Long_Wait()
       actions.PressDownArrow()
        Short_Wait()
         actions.PressEnter()
          Short_Wait()
           vendorSearchField.getAttribute('value').then(function (vendoText) {
            reporter.appendTest('Verifying Vendor', 'Selected "Vendor" is: '+vendoText, "PASS");
             selectedVendor = vendoText;
           }, function (err) {
            reporter.appendTest('Verifying Vendor', 'Verifying "Vendor" failed', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
    },
   selectVendorInDetailsPage:  (vendorName)=> {
    reporter.appendTest('Searching Vendor', 'Searching Vendor with name: '+vendorName, "PASS");  
      actions.blurText(vendorSearchField, vendorName, "Vendor Search field")
        let vendorOption= element(by.xpath("//label[@for='vendorSearch']/following-sibling::div//*[contains(text(),'"+vendorName+"')]"))  
          actions.Click(vendorOption,vendorName)
           Short_Wait()
             vendorSearchField.getAttribute('value').then(function (vendoText) {
              reporter.appendTest('Verifying Vendor', 'Selected "Vendor" is: '+vendoText, "PASS");
                selectedVendor = vendoText;
              }, function (err) {
                reporter.appendTest('Verifying Vendor', 'Verifying "Vendor" failed', "FAIL");
                expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
            })         
    },
   clickOnNextButton : function () {
    actions.jsClick(nextButton, "Next Button");
   },
   verifyNextButtonIsDisabled : function () {
    actions.VerifyFieldDisabled(nextButton,true, "Next Button");
   },
   verifyUpdateButtonIsDisabled : function () {
    actions.VerifyFieldDisabled(updateButton,true, "Update Button");
   },
   verifyUpdateButtonIsEnabled : function () {
    actions.VerifyFieldEnabled(updateButton,true, "Update Button");
   },
   verifyNextButtonIsEnabled : function () {
    actions.VerifyFieldEnabled(nextButton,true, "Next Button");
   },
   clickOnSubmitButton : function () {
    actions.jsClick(submitButton, "Submit Button");
   },
   clickOnPreviousButton : function () {
    actions.jsClick(previousButton, "Previous Button");
   },

// '2. Color, Size & Pricing'
   enterProductName : function (value) {
    actions.blurText(productNameField, value, "Product Name");
   },
   enterVendorName : function (value) {
    actions.blurText(vendorSearchField, value, "Vendor Name");
   },
   enterDescription2 : function (value) {
    actions.blurText(description2Field, value, "Description 2");
   },
   enterDescription3 : function (value) {
    actions.blurText(description3Field, value, "Description 3");
   },
   enterVendorAdditionalInfo : function (value) {
    actions.blurText(vendorAdditionalInfoField, value, "Additional Info for Vendor");
   },
   enterProductCode : function (value) {
    actions.blurText(productCodeField, value, "Product Code");
   },
   enterSupplierItem : function (value) {
    actions.blurText(supplierItemField, value, "Supplier Item");
   },
   enterStyleCode : function (value) {
    actions.blurText(styleCodeField, value, "Style Code");
   },

   verifyVendorAndProductsDetailsPageFieldValues: (productName, description2, description3, productCode, supplierItem, styleCode, vendorInfo)=>{
    actions.GetFieldValueAndCompareToBeEqual(productNameField, productName, "Product Name", "Displayed Field value", "Expected(given) Value")
    actions.GetFieldValueAndCompareToBeEqual(description2Field, description2, "Description 2", "Displayed Field value", "Expected(given) Value")
    actions.GetFieldValueAndCompareToBeEqual(description3Field, description3, "Description 3", "Displayed Field value", "Expected(given) Value")
    actions.GetFieldValueAndCompareToBeEqual(vendorAdditionalInfoField, vendorInfo, "Info to vendor", "Displayed Field value ", "Expected(given) Value")
    actions.GetFieldValueAndCompareToBeEqual(productCodeField, productCode, "Product", "Displayed Field value", "Expected(given) Value")
    actions.GetFieldValueAndCompareToBeEqual(supplierItemField, supplierItem, "Supplier Item", "Displayed Field value", "Expected(given) Value")
    actions.GetFieldValueAndCompareToBeEqual(styleCodeField, styleCode, "Style Code", "Displayed Field value", "Expected(given) Value")
    actions.GetFieldValueAndCompareToBeEqual(vendorSearchField, selectedVendor, "Vendor", "Displayed Field value", "Expected(given) Value")    
  },

//  '3. Product Images'
   verifyCostFieldIsNumeric : function () {
     lineitemdetails.verifytextboxisnumberic(costField, "Cost Field")
   },
   verifyPriceFieldIsNumeric : function () {
     lineitemdetails.verifytextboxisnumberic(priceField, "Price Field")
   },
   enterColor : function (value) {
    actions.blurText(colorField, value, "Color");
   },
   enterSize : function (value) {
    actions.blurText(sizeField, value, "Size");
   },
   enterCost : function (value) {
    actions.blurText(costField, value, "Cost");
   },
   enterPrice : function (value) {
    actions.blurText(priceField, value, "Price");
   },
   enterCustomerAdditionalInfo : function (value) {
    actions.blurText(customerAdditionalInfoField, value, "Additional Info for Customer");
   },

   uploadProductImage : function (path) {
    actions.uploadFile(fileUploadSection, path, "Product Image");
    Medium_Wait()
   },
   verifyUploadedFileName: function (fileName) {
    actions.GetTextAndCompareToBeEqual(uploadedFileName, fileName, "Product Image file name", "Product image displayed", "Product image name uploaded");
   },
   verifyPreviewImage : function () {
    actions.verifyElementDisplayed(previewImageElement,true, "Preview Image");
   },

//Verify Created Custom Products
  searchProductUsingProductName:  (productName)=> {
    reporter.appendTest('Searching Created Product', '**************************************', "PASS");  
      actions.blurText(keywordSearchField, productName, "Keyword Search field")
       Medium_Wait()
        element.all(by.css('[class="product-item__name clickable"]')).then(productNameElement=>{
          if(productNameElement.length>0){
             productNameElement.forEach(nameElement=>{
               actions.GetTextAndCompareToBeEqual(nameElement, productName, "Product Name", "Displayed Product", "Searched/Created Product Name")
              })
             } else{
             reporter.appendTest('Searching Product', 'Created Product: '+productName+' is not displayed', "FAIL");
             expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
            }
        })
    },
  //Verify Created Custom Products
  searchProductUsingKeywordAndVerifyList:  (keyword)=> {
    reporter.appendTest('Searching Product using Product Name: ', keyword, "PASS");  
      actions.blurText(keywordSearchField, keyword, "Keyword Search field")
        Long_Wait()
         element.all(by.css('[class="product-item__name clickable"]')).then(productNameElement=>{
          reporter.appendTest('Verifying Products List', '**************************************', "PASS");  
           if(productNameElement.length>0){
             productNameElement.forEach(nameElement=>{
               actions.GetTextAndExpectToContain(nameElement, keyword, "Product Name", "Displayed Product name", "Searched Product Name")
              })
             }
          else reporter.appendTest('Verifying Products List', 'No Products matching Product Name: '+ keyword+' displayed', "PASS"); 
        })
    },
   enterKeyword: (keyword)=>{
      actions.blurText(keywordSearchField, keyword, "Keyword Search field")
   },
  searchProductUsingSupplierAndVerifyList:  (supplier)=> {
   reporter.appendTest('Searching Product using supplier: ', supplier, "PASS");  
    actions.blurText(supplierSearchField, supplier, "Supplier Search field")
      Long_Wait()
       actions.PressDownArrow()
         actions.PressEnter()
          Long_Wait()
           element.all(by.xpath('//*[@class="product-item__name clickable"]/following-sibling::div[2]/div[1]/div[1]')).then(supplierElement=>{
            reporter.appendTest('Verifying Products List', '**************************************', "PASS");  
             if(supplierElement.length>0){
               supplierElement.forEach(nameElement=>{
                actions.GetTextAndExpectToContain(nameElement, supplier, "Name of Products displayed", "Displayed Product supplier", "Searched product supplier")
              })
             }
          else reporter.appendTest('Verifying Products List', 'No Products matching supplier: '+ supplier+' displayed', "PASS"); 
        })
    },

   searchProductUsingDescriptionAndVerifyList:  (Description)=> {
     reporter.appendTest('Searching Product using description: ', Description, "PASS");  
      actions.blurText(keywordSearchField, Description, "keyword Search field")
        Long_Wait()
         element.all(by.xpath('//*[@class="product-item__name clickable"]/following-sibling::div[1]')).then(descriptionElement=>{
          reporter.appendTest('Verifying Products List', '**************************************', "PASS");  
           if(descriptionElement.length>0){
               descriptionElement.forEach(nameElement=>{
                actions.GetTextAndExpectToContain(nameElement, Description, "Desctiption of Products displayed", "Displayed Product description", "Searched description Keyword")
              })
             }
          else reporter.appendTest('Verifying Products List', 'No Products matching Description: '+ Description+' displayed', "PASS"); 
        })
    },

  searchProductUsingProductCodeAndVerifyList:  (productCode)=> {
    reporter.appendTest('Searching Product using productCode: ', productCode, "PASS");  
      actions.blurText(keywordSearchField, productCode, "keyword Search field")
        Long_Wait()
         element.all(by.xpath('//*[@class="product-item__name clickable"]/following-sibling::div[2]/div[1]/div[2]')).then(productCodeElement=>{
          reporter.appendTest('Verifying Products List', '**************************************', "PASS");  
           if(productCodeElement.length>0){
               productCodeElement.forEach(nameElement=>{
                actions.GetTextAndExpectToContain(nameElement, productCode, "Code of Products displayed", "Displayed Product code", "Searched product code")
              })
             }
          else reporter.appendTest('Verifying Products List', 'No Products matching productCode: '+ productCode+' displayed', "PASS"); 
        })
    },
  
  verifyCreatedProductName: (productName)=>{
     let productElement= element(by.xpath('(//h2[@class="product-item__name clickable"])[1]'))
      actions.GetTextAndExpectToContain(productElement, productName, "Product Name", "Displayed Product name", "Name given while creating Custom product")
  },

  verifyCreatedProductDetails: (productName,cost)=>{
     let costElement= element(by.xpath('//h2[@class="product-item__name clickable"] [text()="'+productName+'"] /../following-sibling::div//span[2]'))
      actions.GetTextAndExpectToContain(costElement, cost, "Product Cost", "Displayed Product Cost", "Cost given while creating Custom product")
    let vendorElement= element(by.xpath('//h2[@class="product-item__name clickable"] [text()="'+productName+'"]/following-sibling::div[2]/div[1]/div[@class="product-item__title"][1]'))
       actions.GetTextAndExpectToContain(vendorElement,selectedVendor,"Vendor","Displayed Vendor", "Vendor selected while creating Custom product")
  },

  verifyUpdatedProductName: (productName)=>{
     let productElement= element(by.xpath('(//h2[@class="product-item__name clickable"])[1]'))
      actions.GetTextAndExpectToContain(productElement, productName, "Product Name", "Displayed Product Name", "Product Name given while updating the Custom product")
  },

  verifyUpdatedProductDetails: (productName,cost)=>{
     let costElement= element(by.xpath('//h2[@class="product-item__name clickable"] [text()="'+productName+'"] /../following-sibling::div//span[2]'))
      actions.GetTextAndExpectToContain(costElement, cost, "Product Cost", "Displayed Product Cost", "Cost given while Updated the Custom product")
    // let vendorElement= element(by.xpath('//h2[@class="product-item__name clickable"] [text()="'+productName+'"]/following-sibling::div[2]/div[1]/div[@class="product-item__title"][1]'))
    //    actions.GetTextAndCompareToBeEqual(vendorElement, selectedVendor, "Vendor", "Displayed Vendor", "Vendor selected while Updated the Custom product")
  },

  clickOnSelectedProduct: (productName)=>{
   productName= (productName? productName: selectedProduct )
    let createdProductElement= element(by.xpath('//h2[@class="product-item__name clickable"] [text()="'+productName+'"]'))
      actions.Click(createdProductElement,productName) 
  },

  clickOnFirstProduct: (index=1)=>{
    let createdProductElement= element(by.xpath('(//h2[@class="product-item__name clickable"])["'+index+'"]'))
       createdProductElement.getText().then(name=>{
         selectedProduct= name;
          actions.Click(createdProductElement,"First Product displayed") 
           Medium_Wait()
      })
  },
  verifySelectedAndDisplayedProductInProductDetailsPage: ()=>{
    actions.GetTextAndCompareToBeEqual(productNameHeader, selectedProduct, "Product Name", "Product Name displayed in header","Selected Product from custom products list page")
  },
  verifyDisplayedProductInProductDetailsPage: (productName)=>{
    actions.GetTextAndCompareToBeEqual(productNameHeader,productName , "Product Name", "Product Name displayed in header","Selected Product from custom products list page")
  },
 
  verifyProductDetailsPageFieldValues: (productName, description2, description3, color, size, productCode, supplierItem, styleCode, price, cost, vendorInfo, customerInfo)=>{
    actions.GetFieldValueAndCompareToBeEqual(productNameField, productName, "Product Name", "Displayed Product Name", "Name given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(description2Field, description2, "Description 2", "Displayed Description 2", "Description 2 given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(description3Field, description3, "Description 3", "Displayed Description 3", "Description 3 given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(vendorAdditionalInfoField, vendorInfo, "Info to vendor", "Displayed value", "Value given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(productCodeField, productCode, "Product", "Displayed value", "Value given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(supplierItemField, supplierItem, "Supplier Item", "Displayed value", "Value given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(styleCodeField, styleCode, "Style Code", "Displayed value", "Value given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(colorField, color, "color", "Displayed value", "Value given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(sizeField, size, "size", "Displayed value", "Value given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(priceField, price, "price", "Displayed value", "Value given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(costField, cost, "cost", "Displayed value", "Value given while creating/updating Custom product")
    actions.GetFieldValueAndCompareToBeEqual(customerAdditionalInfoField, customerInfo, "Info to customer", "Displayed value", "Value given while creating/updating Custom product")
    // actions.GetFieldValueAndCompareToBeEqual(vendorSearchField, selectedVendor, "Vendor", "Displayed value", "Value given while creating/updating Custom product")    
   },
  verifyCustomProductsFieldsAreEditable: ()=>{
     actions.verifyTextBoxIsEditable(productNameField, "PN002","Product Name" )
     actions.verifyTextBoxIsEditable(description2Field, "DESC002", "Description 2")
     actions.verifyTextBoxIsEditable(description3Field, "DESC003", "Description 3" )
     actions.verifyTextBoxIsEditable(vendorAdditionalInfoField, "Info to vendor-002", "Info to vendor")
     actions.verifyTextBoxIsEditable(productCodeField, "PC002", "Product Code")
     actions.verifyTextBoxIsEditable(supplierItemField, "SI002", "Supplier Item")
     actions.verifyTextBoxIsEditable(styleCodeField, "SC002", "Style Code" )
     actions.verifyTextBoxIsEditable(colorField, "Green", "color")
     actions.verifyTextBoxIsEditable(sizeField, "XLLL", "size" )
     actions.verifyTextBoxIsEditable(priceField, "6.789", "price")
     actions.verifyTextBoxIsEditable(costField, "0.0901", "cost" )
     actions.verifyTextBoxIsEditable(vendorSearchField, "XSD", "Vendor")
     actions.verifyTextBoxIsEditable(customerAdditionalInfoField, "Info to Customer-002", "Info to customer")
   },

  //  verifyTextBoxIsEditable:  (elem, valueToEnter='12345', logName) =>{
  //       try {
  //           actions.blurText(elem, valueToEnter, logName)
  //             elem.getAttribute('value').then(function (alpha) {
  //               if (alpha === valueToEnter)
  //                   reporter.appendTest('Verifying ' + logName, 'Verified that field: ' + logName + ' is <b>Editable</b>', "PASS");
  //               else
  //                   reporter.appendTest('Verifying ' + logName, 'Verified that field: ' + logName + ' is <b>Not Editable</b>', "FAIL");
  //           });
  //       } catch (error) {
  //           reporter.appendTest('Error', error, "FAIL");
  //     } //end of catch()
  //  },
  clickOnUpdateProduct: ()=>{
    actions.Click(updateButton,"Update Button") 
  },

  clickOnCloseProductDetails: ()=>{
    actions.Click(closeButton,"Close Button") 
  },

  clearProductImageIfExist :function () {  
    element.all(by.xpath("//button[text()='clear']")).then(artworkClear=>{
        if(artworkClear.length>0)
           actions.jsClick(artworkClear[0], "Clear Product Image");        
      })
    },
};

