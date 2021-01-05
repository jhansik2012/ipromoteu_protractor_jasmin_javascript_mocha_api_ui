// let CreateNewJob_Ipromoteu = function(){
'use strict';

const { element, by } = require("protractor");

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
    random = new Random(Random.engines.mt19937().autoSeed()),
 genericData = requireData('genericData'),
    //***************************** Page Objects *************************************//

    repeatJobHeader = element(by.xpath("//h5[text()='Repeat Job']")),
    updateShippingBillingCustomerText = element(by.css(".mt-4")),
    shippingCustomerButton = element(by.css(".input-group-prepend")),
    jobNameObject = element(by.css('[placeholder="Enter Job Name"]')),
    alternateAddressXButton = element(by.xpath("//label[text()='Alternate Shipping Address']/following-sibling::div/button")),
    lineItemDescriptionCheckBox = element(by.xpath("//div[@class='details-repeat-table mx-0 row']//div[@class='col'][contains(text(),'Description')]//input")),
    doNotCopyPricesAndCostsCB= element(by.xpath("//label[text()='Do Not copy prices and costs']")),
    copyPreviousAlternateShippingAddressCB= element(by.xpath("//label[text()='Copy Previous Alternate Shipping Address']")),
    copyExistingLineItemAlternateAddressesCB= element(by.xpath("//label[text()='Copy existing Line item Alternate Addresses']")),
    copyJobFileAttachmentsCB= element(by.xpath("//label[text()='Copy Job File Attachments']")),
    copyLineItemFileAttachmentsCB= element(by.xpath("//label[text()='Copy Line Item File Attachments']")),
    descArray=[]

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
module.exports = {

    verifyRepeatJobHeader: function () {
        actions.VerifyElementPresent(repeatJobHeader, true, "Repeat Job header")
    },

    verifyUpdateShippingBillingCustomerText: function () {
        actions.VerifyElementPresent(updateShippingBillingCustomerText, true, "Repeat Job header")
    },

    clickOnShippingCustomerButton: function () {
        actions.Click(shippingCustomerButton, "Shipping customer button")
    },

    verifyBillingShippingCustomerOptions: function (option) {
        var ele = element(by.xpath("//button/following-sibling::div/button[text()='" + option + "']"))
        actions.VerifyElementPresent(ele, true, option)
    },

    clickOnBillingShippingCustomerOptions: function (option) {
        var ele = element(by.xpath("//button/following-sibling::div/button[text()='" + option + "']"))
        actions.jsClick(ele, option)
    },

    verifyLineItemColHeaders: function (option) {
        var ele = element(by.xpath("//div[@class='details-repeat-table mx-0 row']//div[text()='" + option + "']"))
        actions.VerifyElementPresent(ele, true, option)
    },

    verifyCustomerPriceHeaders: function (option) {
        var ele = element(by.xpath('//div[@class="details-repeat-table mx-0 row"]//div[@class="customer-row row"]//div[text()="' + option + '"]'))
        actions.VerifyElementPresent(ele, true, option)
    },

    verifyYourCostHeaders: function (option) {
        var ele = element(by.xpath('//div[@class="details-repeat-table mx-0 row"]//div[@class="user-row row"]//div[text()="' + option + '"]'))
        actions.VerifyElementPresent(ele, true, option)
    },
    verifyAllLineItemsCheckBoxesCheckedByDefault: function () {
        var ele = element(by.xpath('//div[@class="details-repeat-table mx-0 row"]//div[@class="table__body"]//input[contains(@id, "_repeatjob")]'))
        actions.VerifyElementPresent(ele, true, "all line items are checked")
    },

    enterJobNameField: function (name) {
        actions.blurText(jobNameObject, name, "Job Name")
    },

    clickOnAlternateAddressXButton: function(){
        actions.jsClick(alternateAddressXButton, 'Alternate address X button')
    },

    clickOnLineItemDescriptionCheckBox: function(){
        actions.jsClick(lineItemDescriptionCheckBox, 'LineItem description checkbox')
    },

    selectDoNotCopyPricesAndCostsCheckBox: function(){
        actions.jsClick(doNotCopyPricesAndCostsCB, "do Not Copy Prices And Costs check box")
    },

    selectCopyPreviousAlternateShippingAddressCheckBox: function(){
        actions.jsClick(copyPreviousAlternateShippingAddressCB, "Copy Previous Alternate Shipping Address check box")
    },

    selectCopyExistingLineItemAlternateAddressesCheckBox: function(){
        actions.jsClick(copyExistingLineItemAlternateAddressesCB, "Copy Existing Line Item AlternateAddresses check box")
    },

    selectcopyJobFileAttachmentsCheckBox: function(){
        actions.jsClick(copyJobFileAttachmentsCB, "Copy Job File Attachments check box")
    },

    selectCopyLineItemFileAttachmentsCheckBox: function(){
        actions.jsClick(copyLineItemFileAttachmentsCB, "Copy Line Item File Attachments check box")
    },
    storeLineItemsCount:  ()=>{
     element.all(by.xpath('//div[@class="details-table row"]//div[@class="table__col col"]')).then(function(products){
       global.lineItemCount= products.length;
     })
    },
    storeLineItemDetails: ()=>{
    let i=0;
    try{
    element.all(by.xpath('//div[@class="modal-content"]//div[@class="table__body"]//div[@class="description col"]/child::p[1]')).then(function(products){
     element.all(by.css('[class="modal-content"] [class="table__body"] input[type="checkbox"]')).then(function(inputBoxes){
        inputBoxes.forEach(inputBoxStatus=>{
          inputBoxStatus.isSelected().then(status=>{
            if(status){
              products[i].getText().then(desc=>{
                descArray.push(desc)
                 })
                }//end of if
               i++;
             }) //end of isSelected
           }) //end of forEach
        }) //all 1
     }) //all 2
    }catch(err){}
    },
  verifyLineItemtInRepeatJob:  ()=>{
     element.all(by.xpath('//div[@class="table__body"]//div[@class="description col"]/child::p[1]')).then(function(products){
       let i=0;
        products.forEach(product=>{
            product.getText().then(desc=>{
               actions.expectToEqualCustom(desc, descArray[i], "Product: "+i,'Product displayed in repeated job', 'Product selected from the parent job')
                i++;
             })
           })
       })
    },
  verifyLineItemsCount: (ExpectedCount)=>{
    element.all(by.xpath('//div[@class="details-table row"]//div[@class="table__col col"]')).then(function(products){
      actions.expectToEqualCustom(ExpectedCount, products.length, "Products","No. Products displayed in repeated job", 'No. Products  selected from the parent job')
     })
    },

};