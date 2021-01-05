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
bundledPOLink= element(by.xpath('//ul[@class="main-nav_list"]//h6[text()="Bundled POs"]')),
bundledPOPage= element(by.xpath("//h1[text()='Bundled POs']")),
keywordSearchField= element(by.id("KEYWORD SEARCH")),
poDatesFilter= element(by.xpath("//label[text()='PO Dates']/following-sibling::div/div/div[2]")),
statusFilter= element(by.xpath("//label[text()='status']/following-sibling::div/div/div[2]")),
voidPOLabel= element(by.css('[for="displayVoid"]')),
createBundledPO= element(by.buttonText("CREATE BUNDLED PO")),
viewPOButton= element(by.buttonText("View PO")),
sendPOButton= element(by.buttonText("Send PO")),
voidPOButton= element(by.buttonText("Void PO")),

sendPOPageHeader= element(by.xpath('//h5[@class="modal-title"] [text()="Send PO"]')),
sendPOSubject= element(by.id("sendposubject")),
yesImSureButton= element(by.buttonText("YES, I'M SURE.")),
okButton= element(by.buttonText("OK")),
noMatchingDataFound= element(by.xpath("//h3[text()='No Matching Data Found']")), 
customDateFromField = element(by.xpath("(//div[@class='date_modal']//input)[1]")),
customDateToField = element(by.xpath("(//div[@class='date_modal']//input)[2]")),
submitButton= element(by.buttonText("Submit")),
lastPage= element(by.css('[aria-label="Go to last page"]')),
jobIdInDetailsPage = element(by.css('[class="job-status-area columns"] strong')),
vendorSearchField= element(by.xpath("//label[text()='VENDOR NAME']/following-sibling::div//input")),
vendorContactElement= element(by.xpath("//label[text()='Vendor Contact']/following-sibling::div/div/div/div")),
poDateField= element(by.css('[placeholder="MM/DD/YYYY"]')),
productionContact= element(by.id("productionContact")),
nextButton= element(by.buttonText("Next")),
NEXTButton= element(by.buttonText("NEXT")),
previousButton= element(by.buttonText("PREVIOUS")),
lineItemCheckBox= element(by.xpath('//input[@id="mainCheckBox-LineItems"]/..')),
bundlingOptionDropButton= element(by.buttonText("Bundling Options")),
useDefaultAdress= element(by.id("Use Default")),
selectAnotherSavedAdress= element(by.id("Use Alternate address")),
addAnotherSavedAdress= element(by.id("Add another Saved Address")),
useFulfillmentList= element(by.id("Use Fulfillment List")),
addDefaultShippingAddress= element(by.xpath("//div[text()='+ Add default Shipping Address']")),
editDefaultShippingAddress= element(by.xpath("//div[text()='+ Edit default Shipping Address']")),

fieldcompanyName= element(by.id("fieldcompanyName")),
fieldstreetAddressField= element(by.id("fieldstreetAddress")),
fieldcity= element(by.id("fieldcity")),
fieldAddress= element(by.id("fieldblg")),
fieldZip= element(by.id("zip")),

updateButton= element(by.xpath("//button[contains(text(),'UPDATE')]")),
addressupdateButton= element(by.buttonText('UPDATE')),
createPOButton= element(by.buttonText("Create PO")),
closeButton= element(by.className("close")),
yesButton= element(by.buttonText("YES")),
noButton= element(by.buttonText("NO")),

stateDrop= element(by.id("edit-customer-state")),
previousInstructionSearch= element(by.linkText("Search previous instructions")),
customerField= element(by.xpath("//label[text()='CUSTOMER']/following-sibling::div//input")),
searchButton= element(by.buttonText('SEARCH')),
createPOButton= element(by.buttonText('Create PO')),
noResultsReturned= element(by.xpath("//li[text()='No result found ']")),
contactDetailsElement= element(by.xpath('(//div[@class="profit"])[1]/p[1]')),

useDefaultAddressRadio= element(by.id("Use Alternate address")),
useOtherSavedAddressRadio= element(by.id("Use Alternate address")),
addOtherSavedAddressRadio= element(by.id("Add another Saved Address")),
useFullfillmentListRadio= element(by.id("Use Fulfillment List")),
editSavedAddress= element(by.xpath("//span[text()='+ Edit saved address']")),
uloadlistField= element(by.xpath("//button[text()=' UPLOAD LIST ']/preceding-sibling::input")),
generalListField= element(by.xpath("//button[text()='GENERATE LIST']/preceding-sibling::input"));


// var= element(by.xpath("")),
// var= element(by.css("")),
// var= element(by.className("")),
// var= element(by.id("")),
// var= element(by.linkText("")),
// var= element(by.buttonText("")),
// var= element.all(by.xpath("")),

let poNumber='',
    vendor='',
    vendorSelected='',
    today= '',
    contactdetails='',
    futureDate='';

 module.exports = {
  /*Used to save application verification data form dynamic verification*/
  specData: {},
   
   clickOnBundledPOLink : function () {
    actions.jsClick(bundledPOLink, "Bundled PO link");
   },
   clickOnCreateBundledPOLink : function () {
    actions.jsClick(createBundledPO, "Create Bundled PO");
   },
   verifyBundledPOPageIsDisplayed : function () {
    actions.verifyElementDisplayed(bundledPOPage,true, "Bundled PO Page");
   },
   verifyKeywordSearchFieldIsDisplayed : function () {
    actions.verifyElementDisplayed(keywordSearchField,true, "Keyword Search Field");
   },
   searchUsingKeyword : function (value) {
    keywordSearchField.clear()
    actions.EnterText(keywordSearchField, value, "Keyword Search Field");
   },
   searchSelectedPO : function () {
    actions.blurText(keywordSearchField, poNumber, "Keyword Search Field");
   },
   verifyKeywordSearchResults: function (expectedValue) {
     let poNumberElement=element(by.css('[class="bundled_PO_table__col col"] p'))
          actions.GetTextAndExpectToContain(poNumberElement,expectedValue, "PO number search results", "PO Number displayed","Searched keyword")
    },
   verifyStatusOfSearchResults: function (expectedStatus) {
    element.all(by.css('[class="bundled_PO_table__col  d-none d-lg-flex col"] span')).then(function (statusArray) {
     element.all(by.css('[class="bundled_PO_table__col col"] div p')).then(function (poNumberArray) {
      let i=0;
       rows.forEach(function (row) {
        row.getText().then(function (columnText) {
          poNumberArray[i].getText().then(function (poNumber) {
           actions.GetTextAndCompareToBeEqual(expectedStatus,columnText, "Status of "+poNumber, "Status filter selected","Status of lineItem dispalyed")
            i++
           })
         })
        })
       })
     })
    },
    storePONumberAndVendor: function (index=1) {
     let poNumberElement= element(by.xpath('(//div[@class="bundled_PO_table__col col"]/div/p)["'+index+'"]'))
          poNumberElement.getText().then(function (poNum) {
           poNumber= poNum;
             reporter.appendTest('PO Number of selected lineItem: ', poNumber , "PASS");
           })
     let vendorElement= element(by.xpath('(//div[@class="bundled_PO_table__col align-items-center col"]/div/p)["'+index+'"]'))
          vendorElement.getText().then(function (vendorText) {
           vendor= vendorText;
             reporter.appendTest('Vendor of selected lineItem: ', vendor , "PASS");
           })     
    },
   selectPODates: function (option) {
    actions.Click(poDatesFilter, "PO date dropdown");
    var ele = element(by.xpath("//div[contains(text(),'" + option + "')]"))
    Short_Wait()
    actions.Click(ele, option)
   },
   clickOnStatusDrop: function () {
    actions.Click(statusFilter, "Status filter dropdown");
   },
   clickOnLastPage: function () {
    actions.Click(lastPage, "<b>Last page</b>");
   },
   verifyStatusOptionFromDrop: function (option) {
    let ele= element(by.xpath("//div[text()='"+option+"']"))
     actions.verifyElementDisplayed(ele, true, option)
   },
   selectCustomPODate: function (daysDiff) {
    let fromDate= actions.futurePreviousDate_mm_dd_yyyy(parseInt('-' + daysDiff)),
    toDate= actions.currentDate_mm_dd_yyyy()
    actions.blurText(customDateFromField,fromDate,"Custom date: From")
    actions.blurText(customDateToField,toDate,"Custom date: To")
    actions.Click(submitButton, "Submit button")
   },

   verifyLineItemPODateFilterCondition: async (days) => {
    reporter.appendTest('Verifying Search results', "Displayed line item PO dates should be in between the filtered/Selected date range." , "PASS");
     var previousDateFormat = actions.futurePreviousDate_mm_dd_yyyy(parseInt('-' + days)),
      currentDateFormat = actions.currentDate_mm_dd_yyyy()
        var flag = false
        var previousDate = new Date(previousDateFormat),
            currentDate = new Date(currentDateFormat)
            previousDate = previousDate.getTime()
            currentDate = currentDate.getTime()
              element.all(by.css('[class="bundled_PO_table__col  col"]')).count().then(async (rowCount) => {
                element.all(by.css('[class="bundled_PO_table__col col"] p')).then(async (poNumbers) => {
                 let index=0,
                 poNumber='';
                 if (rowCount > 0) {
                  for (var i = 0; i < rowCount; i++) {
                    var orderDateObj = element.all(by.css('[class="bundled_PO_table__col  col"] p')).get(i)
                    var orderDate = await orderDateObj.getText()
                    orderDate = new Date(orderDate)
                    const orderDateFormat = actions.dateFormat_mm_dd_yyyy(orderDate)
                    orderDate = orderDate.getTime()
                    poNumber=await poNumbers[index].getText()
                     if ((orderDate >= previousDate) && (orderDate <= currentDate)) {
                         flag = true;
                         reporter.appendTest('Verifying PO date of: '+poNumber, "Verified PO date : '" + orderDateFormat + "' is present in between '"+previousDateFormat+"' and '" + currentDateFormat+"' " , "PASS");
                       } else if ((orderDate == '') || (orderDate == null) || (orderDate == '-')) {
                         flag = false;
                         reporter.appendTest('Verifying PO date of: '+poNumber, "Verified PO date : '" + orderDateFormat + "' is not present in between '"+previousDateFormat+"' and '" + currentDateFormat+"' " , "FAIL");
                         expect(true).toReport(false, "Verified PO date : '" + orderDateFormat + "' is not present in between '"+previousDateFormat+"' and '" + currentDateFormat+"' ");
                      }
                    index++;
                    }
                } else actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
             })
         })
    },
   clickOnShowVoidPO : function () {
    actions.Click(voidPOLabel, "Show void PO checkbox");
   },
   verifyBundledPOListTable: function (column) {
    let columnElement= element(by.xpath('//div[@class="bundled_PO_table__head flex-nowrap"]//span[text()="'+column+'"]'))
     actions.verifyElementDisplayed(columnElement, true, column)
   },
   clickOnMenuItem: function (index=1) {
    var button = element(by.xpath('(//div[@class="bundled_PO_table__col d-lg-flex col"]/div/button)["'+index+'"]'))
    actions.jsClick(button, "PO Menu button");
   },
   clickOnSelectedLineItemMenuItem: function () {
    var button = element(by.xpath('//div[@class="bundled_PO_table__col col"]/div/p[text()="'+poNumber+'"]/../../following-sibling::div[@class="bundled_PO_table__col d-lg-flex col"]/div/button'))
    actions.jsClick(button, "PO Menu button");
   },
   clickOnSendPOButton: function (index=1) {
    actions.jsClick(sendPOButton, "Send PO");
   },
    clickOnVoidPOButton: function (index=1) {
    actions.jsClick(voidPOButton, "Void PO");
   },
  verifyMenuOptions: function () {
    Medium_Wait()
     actions.verifyElementDisplayed(viewPOButton, true, "View PO")
     actions.verifyElementDisplayed(sendPOButton, true, "Send PO")
     actions.verifyElementDisplayed(voidPOButton, true, "Void PO")
   },
  verifyNoMatchingDataFound: function () {
     let ele= element(by.xpath("//h3[text()='No Matching Data Found']"))
     actions.verifyElementDisplayed(ele, true, "No Matching Data Found")
   },
   verifySendPOPage: function () {
     actions.verifyElementDisplayed(sendPOPageHeader, true, "Send PO Page")
   },
   validatePONumberInSubject: function () {
     actions.GetFieldValueAndCompareToBeContain(sendPOSubject, poNumber, "PO Number in subject","Subject dispalyed","PO Number of Selected line item")
   },
   verifyPODiscardedSuccessfully:()=>{
    element.all(by.xpath('//div[@class="bundled_PO_table__col col"]/div/p[text()="'+poNumber+'"]')).then(function (poElement) {
      if(poElement.length<1) 
         reporter.appendTest('Verifying discarded line item', "Verified that line item with PO number: "+poNumber+" is not displayed and <b>Discarded</b> successfully" , "PASS");
          else {
            reporter.appendTest('Verifying discarded line item', "Verified that line item with PO number: "+poNumber+" is displayed and <b>Not Discarded</b> successfully" , "FAIL");
            expect(true).toReport(false, "Verified that line item with PO number: "+poNumber+" is displayed and <b>Not Discarded</b> successfully");
          }
      })
   },
   verifyPONotRemoved:()=>{
    element.all(by.xpath('//div[@class="bundled_PO_table__col col"]/div/p[text()="'+poNumber+'"]')).then(function (poElement) {
      if(poElement.length>0) 
         reporter.appendTest('Verifying discarded line item', "Verified that line item with PO number: "+poNumber+" is displayed" , "PASS");
          else {
            reporter.appendTest('Verifying discarded line item', "Verified that line item with PO number: "+poNumber+" is Not displayed" , "FAIL");
            expect(true).toReport(false, "Verified that line item with PO number: "+poNumber+" is displayed and <b>Not Discarded</b> successfully");
          }
      })
    },
    verifyVoidAlertAndItsBody: (Message)=>{   
    let alert= element(by.xpath("//div[@class='title'] [text()='Void PO']"))
     actions.verifyElementDisplayed(alert, true, "Alert")
     let alertBody= element(by.xpath('(//div[@class="d-flex justify-content-center text-confirm col"])[1]'))
      actions.GetTextAndCompareToBeEqual(alertBody,Message,"Alert message", "Displayed message", "Expected message")
      let alertPONumberBody= element(by.css('[class="d-flex justify-content-center text-poNum col"]'))
        actions.GetTextAndExpectToContain(alertPONumberBody, poNumber, "PO Number in alert subject","Alert Subject displayed","PO Number of selected line item")   
        let alertVendorBody= element(by.xpath('(//div[@class="d-flex justify-content-center text-confirm col"])[2]'))
         actions.GetTextAndExpectToContain(alertVendorBody, vendor, "Vendor in alert subject","Vendor in Alert Subject displayed","Vendor of selected line item")     
    },
    verifySuccessfullAlertAndItsBody: (Message)=>{   
    let alert= element(by.css('[class="modal_popup__title"]'))
      actions.GetTextAndCompareToBeEqual(alert,Message,"Alert message", "Displayed message", "Expected message")
      let alertBody= element(by.css('[class="modal_popup__body"] p'))
        actions.GetTextAndExpectToContain(alertBody, poNumber, "PO Number in alert subject","Alert Subject displayed","PO Number of selected line item")   
    },
    verifyVoidedAlertAndItsBody: (Message)=>{   
    let alert= element(by.xpath('//div[@class="modal_popup__body"]/div[1]'))
      actions.GetTextAndCompareToBeEqual(alert,Message,"Alert message", "Displayed message", "Expected message")
      let alertBody= element(by.xpath('//div[@class="modal_popup__body"]/div[2]'))
        actions.GetTextAndExpectToContain(alertBody, poNumber, "PO Number in alert subject","Alert Subject displayed","PO Number of selected line item")   
    },
   clickOnYesImSure: function () {
    actions.jsClick(yesImSureButton, "Yes I'm Sure");
   },
   clickOnOK: function () {
    actions.jsClick(okButton, "OK");
   },
   clickOnYes: function () {
    actions.jsClick(yesButton, "YES");
   },
   clickOnNo: function () {
    actions.jsClick(noButton, "NO");
   },
   verifyStatusOfVoidedPO: function (expectedStatus) {
    let statusElement=element(by.xpath('//div[@class="bundled_PO_table__col col"]/div/p[text()="'+poNumber+'"]/../../following-sibling::div[@class="bundled_PO_table__col  d-none d-lg-flex col"]/span'))
         statusElement.getText().then(function (status) {
           actions.GetTextAndCompareToBeEqual(status,expectedStatus, "Status of "+poNumber,"Status of lineItem dispalyed", "Status Expected")
          })
    },
    clickOnListDropDown: function (index=1) {
    var button = element(by.xpath('(//div[@class="bundled_PO_table__col d-none d-flex col"]/button)["'+index+'"]'))
    actions.jsClick(button, "Job List Dropdown");
   },
    verifyBundledPOLinkedJobListTable: function (column) {
    let columnElement= element(by.xpath('//div[@class="b-bottom-gray bundled_PO_table__item bg-foam"]//div[@class="sub-table"]//span[text()="'+column+'"]'))
     actions.verifyElementDisplayed(columnElement, true, column)
   },
   selectListedJobUnderPOAndClickOntheJobLinkAndVerifyJobDetailsPage: function (index=0) {
    let firstJob= element(by.xpath('//div[@class="b-bottom-gray bundled_PO_table__item bg-foam"]//div[@class="sub-table"]//a'))
         reporter.appendTest('Verifying the Linked jobs under PO', "Verified that Linked Jobs under PO is/are displayed", "PASS");
          firstJob.getText().then(jobId=>{
            reporter.appendTest('Verifying JobLink: ', jobId, "PASS");
              actions.jsClick(firstJob, jobId)
               Long_Wait()
                reporter.appendTest('Verifying navigated page', "Selected Job details page should be displayed", "PASS");
                 actions.GetTextAndExpectToContain(jobIdInDetailsPage,jobId,"Job details page","Displayed Job","Selected Job") 
     })
   },
   enterVendorName: function (valueToEnter) {
    actions.EnterText(vendorSearchField,valueToEnter, "Vendor search keyword")  
     Long_Wait()
      actions.PressDownArrow()
       actions.PressEnter()  
   },
   printVendorDetailsPageElementsValue: function (vendorKeyword) {
     vendorSearchField.getAttribute('value').then(function (vendor) {
         vendorSelected= vendor;
         actions.expectNotToEqualCustom(vendor,vendorKeyword, "Vendor name", "Displayed vendor name", "Keyword used to search vendor")
       })
     actions.GetElementTextAndPrint(vendorContactElement, "Vendor Contact")
     actions.GetFieldValueAndPrint(productionContact, "Production Contact")
   },
   verifyPreviousDataSelectedInVendorDetailsPage: function () {
     actions.GetTextAndCompareToBeEqual(contactDetailsElement, contactdetails,"Contact Name", "Displayed value", "Expected value")  
     // actions.GetFieldValueAndCompareToBeEqual(poDateField,futureDate,"PO Date", "Displayed PO Date in 'vendor details' page", "Previously selected PO Date before navigating to 'Line item' page")
     actions.GetFieldValueAndCompareToBeEqual(vendorSearchField,vendorSelected, "Vendor","Displayed vendor in 'vendor details' page", "Previously selected vendor before navigating to 'Line item' page")
   },
   verifyPODateDisplayedAndAddFutureDate: (days=5)=>{
    today= actions.currentDate_mm_dd_yyyy();
    futureDate= actions.futurePreviousDate_mm_dd_yyyy(days);
    actions.GetFieldValueAndCompareToBeEqual(poDateField,today, "PO date","Displayed PO date", "Present date")
    actions.blurText(poDateField,futureDate,"PO date")
    Short_Wait()
    actions.GetFieldValueAndCompareToBeEqual(poDateField,futureDate, "PO date","Displayed PO date", "Entered date")
   },
   clickOnNextButton : function () {
    actions.jsClick(NEXTButton, "NEXT");
   },
   clickOnNextButton2 : function () {
    actions.Click(nextButton, "Next");
   },
   clickOnPreviousButton : function () {
    actions.jsClick(previousButton, "Previous");
   },
   clickOnButton: (buttonText)=>{
    var button= element(by.buttonText(buttonText))
    actions.jsClick(button, buttonText)
   },
   verifyLineItemListTable: function (column) {
    let columnElement= element(by.xpath('//table[@class="bundledPO-summary-table table"]//th[text()="'+column+'"]'))
     actions.verifyElementDisplayed(columnElement, true, column)
   },
   verifyPreviewLineItemListTable: function (column) {
    let columnElement= element(by.xpath('//table[@class="bundledPO-viewLineItems-table table"]//th[text()="'+column+'"]'))
     actions.verifyElementDisplayed(columnElement, true, column)
   },
   clickOnLineItemCheckbox: ()=>{
    actions.Click(lineItemCheckBox, "Line item Check-box")
   },
  selectLineItemCheckbox: (index)=>{
    let lineItem= element(by.xpath("(//tbody/tr/td/div/input)['"+index+"']"))
     actions.jsClick(lineItem, "Line item")
   },
   verifyLineItemsToBePresent: ()=>{ // true
    element.all(by.xpath('//tbody/tr')).count().then(count=>{
      let lineItemCount= count-1; //takes count of head row also
       if(lineItemCount>0)
         reporter.appendTest('Verifying line item count', "Verified that <b>"+lineItemCount+"</b> line item(s) displayed" , "PASS");
          else {
           reporter.appendTest('Verifying line item count', "Verified that <b>No line item(s)</b> displayed" , "FAIL");
            expect(true).toReport(false, "Verified that <b>No line item(s)</b>displayed" );
        }
     })
   },

    storeContactDetails: ()=>{ // true
      contactDetailsElement.getText().then(text=>{
          contactdetails= text;
          reporter.appendTest('Contact name displayed: ', contactdetails , "PASS");
        })     
   },

   verifyLineItemsNotToBePresent: ()=>{ // true
    element.all(by.xpath('//tbody/tr')).count().then(count=>{
       if(count<2)
         reporter.appendTest('Verifying line item count', "Verified that <b>No line item(s)</b> selected/displayed" , "PASS");
          else {
           reporter.appendTest('Verifying line item count', "Verified that <b>'"+count+"': line item(s)</b>displayed" , "FAIL");
            expect(true).toReport(false, "Verified that <b>'"+count+"' line item(s)</b>displayed" );
          }
     })
   },

   clickOnbundlingOptions : function () {
    actions.jsClick(bundlingOptionDropButton, "Bundling option button");
   },
   verifyBundlingOptions: (option)=>{
    let ele= element(by.xpath('//label[@class="custom-control-label"] [text()="'+option+'"]'))
    actions.VerifyElementPresent(ele, true, option)
   },

   //Shipping Details
   verifyShippingAddressOptions: function () {
     actions.verifyElementDisplayed(useDefaultAdress, true, "Use Default Adress")
     actions.verifyElementDisplayed(selectAnotherSavedAdress, true, "Select Another Saved Adress")
     actions.verifyElementDisplayed(addAnotherSavedAdress, true, "Add Another Saved Adress")
     actions.verifyElementDisplayed(useFulfillmentList, true, "Use Fulfillment List")
   },
   updateDefaultShippingAddress : function (companyName, add1, add2,city, zip, state ) {
    actions.Click(editDefaultShippingAddress, "Edit Default Shipping Address");
      actions.blurText(fieldcompanyName,companyName, "Company Name")  
      actions.blurText(fieldstreetAddressField,add1, "Street Address")  
      actions.blurText(fieldcity,city, "City")  
      actions.blurText(fieldAddress,add2, "Address 2")  
      actions.blurText(fieldZip,zip, "zip")
      actions.Click(stateDrop, "State")
      Short_Wait()
      let stateElement= element(by.xpath("//div[contains(text(),'"+state+"')]"))  
       actions.Click(stateElement, state)
   },
  
   addDefaultShippingAddress : function (companyName, add1, add2,city, zip, state ) {
      actions.blurText(fieldcompanyName,companyName, "Company Name")  
      actions.blurText(fieldstreetAddressField,add1, "Street Address")  
      actions.blurText(fieldcity,city, "City")  
      actions.blurText(fieldAddress,add2, "Address 2")  
      actions.blurText(fieldZip,zip, "zip")
      let stateDrop= element(by.xpath("//label[text()='state']/following-sibling::div"))
      actions.Click(stateDrop, "State")
      Short_Wait()
      let stateElement= element(by.xpath("//div[contains(text(),'"+state+"')]"))  
       actions.Click(stateElement, state)
   },
   verifyDefaultShippingAddress : function (companyName ) {
   let company = element(by.xpath("//label[text()='DEFAULT SHIPPING ADDRESS']/following-sibling::div/div/div/div"))
   actions.GetTextAndCompareNotToBeEqual(company,companyName,"Company name","Displayed company name", "Updated value before closing without saving")
   },
   verifyUpdatedShippingAddress : function (companyName ) {
   let company = element(by.xpath("//label[contains(text(),'SHIPPING ADDRESS')]/following-sibling::div/div/div/div"))
   actions.GetTextAndCompareToBeEqual(company,companyName,"Company name","Displayed company name", "Updated value")
   },
   clickOnAddDefaultShippingAddressIfNotPresent : function (companyName, add1, add2,city, zip, state ) {
    element.all(by.xpath("//div[text()='+ Add default Shipping Address']")).count().then(count=>{
      if(count>0) 
        actions.Click(addDefaultShippingAddress, "Add Default Shipping Address");
      else actions.Click(editDefaultShippingAddress, "Edit Default Shipping Address");
    })
   },
   clickOnUpdateButton : function () {
    actions.jsClick(updateButton, "Update Button");
   },
   clickOnUpdateButton2 : function () {
    actions.Click(addressupdateButton, "Update Button");
   },
   verifyAlertAndItsBody: (Message)=>{ //  
    let alert= element(by.className("modal_popup__content"))
     actions.verifyElementDisplayed(alert, true, "Alert")
     let alertBody= element(by.className('modal_popup__body'))
      actions.GetTextAndCompareToBeEqual(alertBody,Message,"Alert message", "Displayed message", "Expected message")
    }, // clickOnOK
    verifyCreatePOButtonDisabled : function () {
    actions.VerifyFieldDisabled(createPOButton, true,"Create PO");
   },
   clickOnCloseButton : function () {
    actions.jsClick(closeButton, "Close Button");
   },
   clickOnPreviousInstructionSearchLink: function () {
    actions.jsClick(previousInstructionSearch, "Previous Instruction Search")
    },
    searchUsingCustomerInIntruction: (Keyword)=>{
    actions.EnterText(customerField,Keyword, "Customer Search")
    Short_Wait()
    actions.Click(searchButton,"Search Button")
    },
   verifyInstructionResultsDisplayed : function (companyName, add1, add2,city, zip, state ) {
    element.all(by.xpath("//*[@class='products-list__item']")).count().then(count=>{
      if(count>0)  reporter.appendTest('Verifying Instruction list', "Verified that <b>"+count+"</b> instruction(s) is/are displayed" , "PASS");
      else actions.VerifyElementPresent(noResultsReturned, true, "No results returned message")
    })
   },
   cratePOButton : function () {
    actions.jsClick(createPOButton, "Create PO Button");
   },
   useDefaultAddressRadio : function () {
    actions.jsClick(useDefaultAddressRadio, "useDefaultAddressRadio");
   },
   useOtherSavedAddressRadio : function () {
    actions.jsClick(useOtherSavedAddressRadio, "useOtherSavedAddressRadio");
   },
   addOtherSavedAddressRadio : function () {
    actions.jsClick(addOtherSavedAddressRadio, "addOtherSavedAddressRadio");
   },
   useFullfillmentListRadio : function () {
    actions.jsClick(useFullfillmentListRadio, "useFullfillmentListRadio");
   },
   selectSavedAddress: function (index=1) {
    var address = element(by.xpath('(//div[@class="getScrollField col"]/form//input[@name="customRadio"])["'+index+'"]'))
     actions.jsClick(address, "Saved address");
   },
   editSavedAddress: (companyName)=>{
    actions.Click(editSavedAddress, "Edit saved address")
     Short_Wait();
      actions.blurText(fieldcompanyName,companyName, "Company Name") 
       actions.Click(updateButton, "Update button")  
    },
   uploadList: (file)=>{
    actions.uploadFile(uloadlistField,file, "Upload list")
    },
   verifyPOLink: (index=1)=>{
    browser.getWindowHandle().then(parentWindowId =>{
      let poNumber=  element(by.xpath('(//div[@class="bundled_PO_table__col col"]//p)["'+index+'"]'))
       actions.jsClick(poNumber, "PO");
        Medium_Wait()
          browser.getWindowHandle().then(childWindowId =>{
            if(parentWindowId != childWindowId) reporter.appendTest('Verifying PO link', "Verified that the new window opened with PO details" , "PASS");
            else {
            reporter.appendTest('Verifying PO link', "Verified that the new window is not opened with PO details" , "FAIL");
            expect(true).toReport(false,  "Verified that the new window is not opened with PO details");
            }
          // let pdf= element(by.xpath('//pdf-viewer[@id="viewer"]'))
          // actions.VerifyElementPresent(pdf, true ,"Pdf viewer")
         })
      })
    },


      
};

