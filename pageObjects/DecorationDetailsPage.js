
'use strict';

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
  random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
 	decorationDetailsPagetitle = element(by.css('[class="modal-dialog decorate-modal"]')),
    decorationDetailsPageTitle = element(by.css('[class="modal-dialog decorate-modal"]')),
    productToDecorateList = element(by.css('[class="products-list__item"]')),
    imprintMethod=element.all(by.id('imprintMethod')),
    location=element.all(by.id('location')),
    color=element.all(by.id('color')),
    size=element.all(by.id('size')),
    instructions=element.all(by.id('instructions')),
    selectFromLibrary=element.all(by.xpath('//*[text()="Select from library"]/preceding-sibling::input')),
    addLocationButton=element(by.buttonText("+ Add Location")),
    firstLocationHeader=element(by.css('[class="placement-details location-row"] span')),
    saveDecorationButton=element(by.buttonText('+ Save Decoration')),
    decorationNameField=element(by.id('decorationName')),
    decorationDescription=element(by.id('description')),
    decorationSaveButton=element(by.css('[type="submit"]')),
    decSaveSuccessMessage=element(by.xpath('//div[contains(@class,"text-success")]')),
    decorationPricingDetailsHeader=element(by.xpath("//*[text()='Select Your Decorator, Add Dates & Pricing']")),
    vendor=element(by.name('vendor')),
    decorationNotes=element(by.name('decorationNotes')),
    requestDate=element(by.id('reqShipDate')),
    inHandDate=element(by.id('inHandDate')),
    proofRequiredNo=element(by.css('[for="proofRequired_no"]')),
    proofRequiredYes=element(by.css('[for="proofRequired_yes"]')),
    sendProofsTo=element(by.id('sendProofsTo')),
    price=element.all(by.name('price')),
    cost=element.all(by.name('cost')),
    productCode=element.all(by.name('code')),
    lineItemCheckBox=element.all(by.css('[name="dontShowInCustomerInvoice"]+label')).get(0),
    labelUnderTheTable=element(by.css('[class="pricing-details-table__invoice-text"]')),
    addSymbol=element(by.xpath('//*[text()="add"]')),
    closePopup=element(by.css('[class="close"] span')),
    popupNo=element(by.xpath('//*[text()="NO"]')),
    popupYes=element(by.xpath('//*[text()="YES"]')),
    reqshipDateField = element(by.id('reqShipDate')),
    inHandDateField = element(by.id("inHandsDate")),
    submitButton=element(by.buttonText("Submit")),
    previousButton=element(by.xpath("//*[text()='Previous']")),    
    selectFromComputeButton=element(by.buttonText("Select from Computer")),
    selectFromLibraryButton=element(by.buttonText("Select from library")),
    selectFromComputeButtonObject=element(by.buttonText("Select from Computer")),
    selectFromLibraryButtonObject=element(by.buttonText("Select from library")),
    prevButton=element(by.buttonText("Previous")),
    nextButton=element(by.buttonText("Next")),
    artWorkPage= element(by.xpath("//h5[text()='Artwork Library']")),
    customerName=element(by.xpath("//label[text()='CUSTOMER']/following-sibling::div//input")),
    salesRep=element(by.xpath("//label[text()='SALES REP']/following-sibling::div//input")),
    keywordSearch=element(by.xpath("//label[text()='KEYWORD SEARCH']/following-sibling::div//input")),
    fileType=element(by.xpath("//label[text()='FILE TYPE']/following-sibling::div//input")),
    datesAdded=element(by.xpath("(//label[text()='DATES ADDED']/following-sibling::div//input)[2]")),
    selectASavedDecoratin=element(by.xpath("//span[text()='Select A Saved Decoration']/parent::button")),
    sendProofsTextArea=element(by.id("sendProofsTo")),
    invalidEmailError=element(by.xpath("//div[text()='Please enter valid emails']")),
    viewDecorationDetailsButton=element(by.buttonText("View decoration details")),
    updateButton=element.all(by.buttonText("Update")),
    closeAlertBody=element(by.css('[class="modal_popup__body"] p')),
    editRelatedChargesButton= element(by.buttonText("Edit Related Charges")),

   
    lineItem='',
    imprintMethodText='',
    artworkLocation='',
    decorationVendor='',
    decorationColor='',
    decorationSize='',
    decorationNotesText='',
    decorationSendProof='',
    reqShipDate='',
    inHandDate='',

    imprintMethodTextUpdated='',
    artworkLocationUpdated='',
    decorationVendorUpdated='',
    decorationColorUpdated='',
    decorationSizeUpdated='',

    decorationNameText='',
    decorationDescriptionText=''


// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
 module.exports = {
  /*Used to save application verification data form dynamic verification*/
  specData: {},


   verifyDecorationDetailsPage :function () {
        actions.verifyElementDisplayed(decorationDetailsPageTitle,true,"Decoration details page title");
    },

   verifyAllItemsAreDisplayedLeftSide :function () {
        actions.verifyElementDisplayed(decorationDetailsPageTitle,true,"All line items are displayed to decorate on left hand side");
    },
   clickOnImprintMethod :function (position) {
        actions.Click(imprintMethod.get(position),"imprintMethod");
        Medium_Wait()
        actions.PressDownArrow() 
        Medium_Wait()
        actions.PressDownArrow()
        actions.PressEnter()
    },   
   clickOnLocationDropdoown :function (position) {
        actions.Click(location.get(position),"location");
        Medium_Wait()
        actions.PressDownArrow() 
        Medium_Wait()
        actions.PressDownArrow()
        actions.PressEnter()
    },
  
   enterColor :function (colorName,position) {   
        decorationColor= colorName     
        actions.blurText(color.get(position), colorName, "Color");        
    },
   enterSize :function (sizeValue,position) { 
        decorationSize=  sizeValue      
        actions.blurText(size.get(position), sizeValue, "Size");        
    },
   enterInstructions :function (instructionsValue,position) {        
        actions.blurText(instructions.get(position), instructionsValue, "Instructions");        
    },

    selectFromLibraryUploadImage :function (position) {  
       browser.executeScript("arguments[0].scrollIntoView();", (selectFromLibrary.get(position)).getWebElement()).then(function () {
            (selectFromLibrary.get(position)).sendKeys(testDataObjectsPath+'ipromoteU.png').then(function () {
                reporter.appendTest('Uploading Image', 'Uploaded "ipromoteU.png" in the Field "Upload from library"', "PASS");
            }, function (err) {
                reporter.appendTest('Uploading Image', 'Uploading file in failed', "FAIL");
                expect(false).toReport(true, "Unable to  perform operation due to: "+ err.message);
            });
        });
    },

    clearArtworkImageIfExist :function (position) {  
      element.all(by.xpath("//button[text()='clear']")).then(artworkClear=>{
        if(artworkClear.length>0)
           actions.jsClick(artworkClear[0], "Clear Artwork Image");        
      })
    },

    clickOnLibraryUploadImage :function (position) {  
     reporter.appendTest("<b>Selecting Image from Artwork Library</b>", '**********************', "");      
        actions.jsClick(selectFromLibraryButton, "Select from library");        
    },

    clickOnAddLocationButton:function(){
     reporter.appendTest('<b>Saving Imprint and Artwork</b>', '********************', "");             
      actions.jsClick(addLocationButton,"Add location")
    },

    clickOnSaveDecorationButton:function(){
      actions.jsClick(saveDecorationButton,"save decoration button")
    },

    enterDecorationName: (text)=>{
        var currentDate = new Date(),
         dd = currentDate.getDate(),
         mm = currentDate.getMonth() + 1,//as January is 0
         yyyy = currentDate.getFullYear(),
         hour = currentDate.getHours(),
         minute = currentDate.getMinutes()
        Short_Wait()
        text = text +'-'+ dd+mm+yyyy+hour+minute
        Medium_Wait()
        decorationNameText= text;
        actions.blurText(decorationNameField, decorationNameText, 'Decoration Name');
     },

    enterDecorationDescription:(text)=>{
        var currentDate = new Date(),
         dd = currentDate.getDate(),
         mm = currentDate.getMonth() + 1,//as January is 0
         yyyy = currentDate.getFullYear(),
         hour = currentDate.getHours(),
         minute = currentDate.getMinutes()
        Short_Wait()
        text = text +'_'+ dd+mm+yyyy+hour+minute
        Medium_Wait()
        decorationDescriptionText= text;  
        actions.blurText(decorationDescription,decorationDescriptionText,'Decoration Description')
    },

    clickOnDecorationSaveButton:function(){
      actions.jsClick(decorationSaveButton,'decorationSaveButton')
    },

    firstAddedLocationHeader:function(){
      firstLocationHeader.getText().then(function(text){
        reporter.appendTest('Verify first added location header', 'first added location header: ' + text, "PASS");
      })
    },

    verifyDecorationSavedSuccessMessage:function(){
     Medium_Wait() 
     element.all(by.xpath('//div[contains(@class,"text-success")]')).then(productArray=>{
      if (productArray.length>0) {
         productArray[0].getText().then(text=>{
           reporter.appendTest('Verifying Success message', 'Verified that success message dispalyed:<b>'+text+'</b>' , "PASS");
          },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
         })
        }
        else  reporter.appendTest('Verifying Success message', 'No Success message dispalyed', "FAIL");
     })
    },

    verifyDecoratorPricingDetailsHeader:function(){
        actions.VerifyElementPresent(decorationPricingDetailsHeader,true,"Select Your Decorator, Add Dates & Pricing header")
    },

    enterVendorName:function(vendorName){
       actions.blurText(vendor,vendorName,"vendorName")
       Medium_Wait()
       actions.PressDownArrow()
       actions.PressEnter()    
   },

   retrieveVendorName:function(vendorName){
   vendor.getAttribute('value').then(function (value) {
      decorationVendor= value;
      reporter.appendTest('Retrieving Vendor', 'Selected "Vendor" is: '+value, "PASS");
      }, function (err) {
          reporter.appendTest('Retrieving Vendor', 'Retrieving "Vendor" failed', "FAIL");
          expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        })
   },
  verifySelectedVendor:function(){
   reporter.appendTest('verifying selected value', 'Same value Selected before navigating to previous page should be displayed', "");
    actions.GetFieldValueAndCompareToBeEqual(vendor,decorationVendor,"Vendor","Displayed vendor", "Selected Vendor before navigating to next page")
  },
  verifySelectedVendorinDetailsPage:function(){
   reporter.appendTest('verifying vendor ', 'Selected and displayed vendor in details page', "");
    let expectedValue= decorationVendor.split(':')[1].trim()
    actions.GetFieldValueAndCompareToBeContain(vendor,expectedValue,"Vendor","Displayed vendor", "Selected Vendor")
  },
  verifySelectedReqShipDate:function(){
   reporter.appendTest('verifying selected value', 'Same value Selected before navigating to previous page should be displayed', "");
    actions.GetFieldValueAndCompareToBeEqual(reqshipDateField,reqShipDate,"Req ship date","Displayed date", "Selected date before navigating to previous page")
  },
  enterDecorationNotes:function(notes){
       var currentDate = new Date(),
         dd = currentDate.getDate(),
         mm = currentDate.getMonth() + 1,//as January is 0
         yyyy = currentDate.getFullYear(),
         hour = currentDate.getHours(),
         minute = currentDate.getMinutes()
        Short_Wait()
        notes = notes +'_'+ dd+mm+yyyy+hour+minute
        Medium_Wait()
        decorationNotesText= notes;
        actions.blurText(decorationNotes,notes,"Decoration Notes")
    },

    // enterRequestDate:function(){
    //     var currentDate = new Date(),
    //         dd = currentDate.getDate()+1,
    //         mm = currentDate.getMonth() + 1, //as January is 0
    //         yyyy = currentDate.getFullYear();

    //     if (dd < 10) {
    //         dd = '0' + dd
    //     }

    //     if (mm < 10) {
    //         mm = '0' + mm
    //     }
    //     var date=mm+''+dd+''+yyyy
    //     actions.blurText(requestDate,date,"Request date")
    // },
    // enterInHandDate:function(){
    //     var currentDate = new Date(),
    //         dd = currentDate.getDate()+3,
    //         mm = currentDate.getMonth() + 1, //as January is 0
    //         yyyy = currentDate.getFullYear();

    //     if (dd < 10) {
    //         dd = '0' + dd
    //     }

    //     if (mm < 10) {
    //         mm = '0' + mm
    //     }
    //   var date=mm+''+dd+''+yyyy
    //   actions.blurText(inHandDate,date,"In hand date")
    // },
    selectProofRequiredNo:function(){
      actions.jsClick(proofRequiredNo,"Proof Required- No")
    },
    selectProofRequiredYes:function(){
      actions.jsClick(proofRequiredYes,"Proof Required- Yes")
    },
    enterSendProofsTO:function(sendTo){
    reporter.appendTest('Verifying TextArea', ' "Send Proofs To" Field should accept multiple mails seperated with comma. when Send Poofs option is selected to <b>Yes</b>', "");        
    actions.blurText(sendProofsTo,sendTo,"Send Proofs To")
    decorationSendProof= sendTo;
    },

    verifyDecorationTableTabs:function(colname){
        let ele=element(by.xpath('//*[@class="pricing-product-table"]//*[text()="'+colname+'"]'))
        actions.verifyElementDisplayed(ele,true,colname+' column')
     },

    clickOnCheckBoxLineItem:function(){
      actions.jsClick(lineItemCheckBox,"Cost Only")
    },

    verifyErrorMessageForInvalidMail: ()=>{
    reporter.appendTest('Verifying <b>Send Proofs To</b> TextArea', '***********************', "");        
    reporter.appendTest('Verifying TextArea', ' "Send Proofs To" Field should accept mail(s) only if they are in <b>abc@xyz.com</b> format, and should throw <b>Error message</b> if wrong fromat mail(s) entered inside the field', "");        
    actions.blurText(sendProofsTo,"service@ipromoteu","Send Proofs To")
    Short_Wait()
    actions.jsClick(submitButton,"submit button")
    Medium_Wait()
    actions.verifyElementDisplayed(invalidEmailError, true, "Invalid Mail Error Message")
    },

    enterPriceAndCost:function(){
      var costValue=3,
          priceValue=3+1;
      actions.blurText(cost,costValue,"cost")
      actions.blurText(price,priceValue,"price")
    },

    validateLabelUnderDecorationTable:function(expectedLabel){
      labelUnderTheTable.getText().then(function(label){
        actions.expectToContain(label,expectedLabel,"Label")
      })
    },
  clickOnAddSymbol:function(){
   reporter.appendTest('Verifying <b>Add New Row</b>', 'New Row should be added below thwe existing one after clicking on the <b>+</b> symbol', "");        
    element.all(by.xpath("//div[contains(@class,'new-row table__item')]")).then(lineArrayBefore=>{
      actions.jsClick(addSymbol,"Add symbol")
       Short_Wait()
        element.all(by.xpath("//div[contains(@class,'new-row table__item')]")).then(lineArrayAfter=>{
           if(lineArrayAfter.length>0 && lineArrayBefore.length>0)
               actions.expectNotToEqualCustom(lineArrayAfter.length, lineArrayBefore.length, "Price Details Row", "After adding new row", "Before adding new row")
           else  reporter.appendTest('Verifying <b>Add New Row</b>', 'No line item present', "FAIL");        
         })
      })
    },

  closeDecorationPopup:function(){
   reporter.appendTest('Verifying <b>Alert</b>', 'Confirmation Alert should be dispalyed when trying to <b>close</b> the page', "");        
      actions.jsClick(closePopup,"Close Page('X')")
    },

    // clickOnNoPopup:function(){
    //  element.all(by.css('[class="modal_popup__body"] p')).then(alert=>{
    //        if(alert.length>0){
    //              actions.GetElementText(alert[0],"Alert message")
    //               actions.jsClick(popupNo,"Close- No")
    //          }  
    //        else  reporter.appendTest('Verifying Alert message', 'No Alert present', "FAIL");        
    //      })
    // },

    verifyCloseAlertMessage:function(expectedMessage){
        closeAlertBody.getText().then(alertMessage=>{
              actions.expectToEqualCustom(alertMessage, expectedMessage,"Alert message", "Displayed message", "Expected message")  //alert[0] accesses element wehere it contains alert message 
          })   
    },

    clickOnNoButtonInPopup:function(){
       actions.jsClick(popupNo,"Close- No")  //Close the pop up by clicking "No" button
    },

    // verifyOverrideAlertAndclickOnYesPopup:function(){
    // Medium_Wait()
    //  element.all(by.css('[class="modal_popup__body"] p')).then(alert=>{
    //        if(alert.length>0){
    //         reporter.appendTest('Overriding the existing decoration', 'Alert should be displayed', "");
    //              actions.GetElementText(alert[1],"Alert message")
    //               actions.jsClick(popupYes,"Yes")
    //          }  
    //        else  reporter.appendTest('Verifying Alert message', 'No Alert present', "");        
    //      })
    // },

 //verify Override AlertMessage If Present And Click Yes Button To Close pop up and Continue
  verifyOverrideAlertMessageAndClickYesButtonToContinue:function(expectedMessage){
    reporter.appendTest('Overriding the existing decoration', 'Alert should be displayed', "");
     element.all(by.css('[class="modal_popup__body"] p')).then(alertBody=>{
           if(alertBody.length>0){
                alertBody[0].getText().then(alertMessage=>{
                      actions.expectToEqualCustom(alertMessage, expectedMessage,"Overide Alert message", "Displayed message", "Expected message")  //alert[0] accesses element wehere it contains alert message 
                       actions.jsClick(popupYes,"Yes")  //Close the pop up by clicking "Yes" button
                 })
             }  
           else  reporter.appendTest('Verifying Override Alert message', 'No Prior decoration present', "");  //Alert will only show up if there is already a decoration exit        
         })
    },

    clickOnYesButtonInPopup:function(){
        actions.jsClick(popupYes,"Yes")  //Close the pop up by clicking "Yes" button
    },

    validateSubmitAndPrevousButtons:function(){
      actions.verifyElementDisplayed(previousButton,true,'Previous Button')
      actions.verifyElementDisplayed(submitButton,true,"Submit Button")
      // reporter.appendTest('Defect- Steps commented temporaryly to carry further validation', '<b>Previously Selected</b> Vendor, ReqShip date and Inhand date getting removed after navigating <b>back</b> from the prev page', "FAIL");
    },

    clickOnPreviousButton:function(){
      reporter.appendTest('Verifying Previous page navigation', 'User should be able to navigate to previous page after clicking on "Previous Button"', "");        
        actions.jsClick(previousButton,"Previous Button")
    },

    clickOnNextButton:function(){
      actions.jsClick(nextButton,"next button")
    },
    verifySuccessfullAlertAndItsBody: (Message)=>{   
    let alert= element(by.css('[class="modal_popup__title"]'))
      actions.GetTextAndCompareToBeEqual(alert,Message,"Alert message", "Displayed message", "Expected message")
      let alertBody= element(by.css('[class="modal_popup__body"] p'))
        actions.GetTextAndExpectToContain(alertBody, poNumber, "PO Number in alert subject","Alert Subject displayed","PO Number of selected line item")   
    },
    clickOnSubmitButton:function(){
    actions.jsClick(submitButton,"submit button")
    Medium_Wait()
    },
    // enterRequestedShipDate: function(){
    //     var currentDate = new Date();
    //     var dd = currentDate.getDate()+1;
    //     var mm = currentDate.getMonth() + 1; //as January is 0
    //     var yyyy = currentDate.getFullYear();

    //     if (dd < 10) {
    //         dd = '0' + dd
    //     }

    //     if (mm < 10) {
    //         mm = '0' + mm
    //     }
    //     var date=mm+''+dd+''+yyyy;
    //     var requestedShipDate=element(by.id('reqShipDate'))
    //     actions.blurText(requestedShipDate,date,"Requested Ship date")
    //     actions.PressEnter(requestedShipDate)
    // },

    // enterInHandDateInDecoration :function(){
    //   var tommorow = new Date(86400000 + +new Date())
    //       // here 86400000 is used to convert millisecods to current date
    //       //gets the date of tommowrow, because we have to select future date for Inhand date 
    //   var dd = tommorow.getDate(),
    //       mm = tommorow.getMonth() + 1, //as January is 0
    //       yyyy = tommorow.getFullYear();
    //     if (dd < 10) dd = '0' + dd
    //     if (mm < 10) mm = '0' + mm
    //   var inHandDate = mm + '' + dd + '' + yyyy ,
    //       inHandDateField = element(by.id("inHandDate"))
    //     actions.blurText(inHandDateField,inHandDate,"InHand date")
    //     actions.PressEnter()
    // },

   getSelectingLineItem: ()=>{
    element.all(by.xpath('//div[@class="description col"]/p')).then(productArray=>{
      if (productArray.length>0) {
            productArray[0].getText().then(productName=>{
             lineItem= productName
              reporter.appendTest('Retrieving Decorating Product', 'Selected Product to decorate: '+productName, "PASS");
           },function(err){ 
              expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
           })
         }
        else  reporter.appendTest('Retrieving Decorating Product', 'Retrieving Selected Product- Failed', "FAIL");
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

   verifyDecorationPageElements: ()=>{
    actions.verifyElementDisplayed(selectFromComputeButton,true,  "Select From Computer")
    actions.verifyElementDisplayed(selectFromLibraryButton,true,  "Select From Library")
    actions.verifyElementDisplayed(selectFromComputeButton,true,  "Select From Library")
   },

   selectImprint: (imprint,index=0)=>{
   reporter.appendTest('<b>Selecting Imprint method</b>', 'Selecting Imprint method : '+imprint, "");         
    actions.Click(imprintMethod.get(index),"Imprint Method Dropdown");
    Short_Wait()
    let imprintLocator= element(by.xpath("//*[text()='"+imprint+"']"))
    actions.jsClick(imprintLocator, imprint)
    imprintMethodText= imprint;
   },
   createImprint: (imprint,index=0)=>{
   reporter.appendTest('<b>Creating Imprint method</b>', 'Creating Imprint method : '+imprint, "");         
    actions.Click(imprintMethod.get(index),"Imprint Method Dropdown");
    Short_Wait()
    let imprintField= element(by.xpath('//div[@id="imprintMethod"]/div/div//input'))
    actions.blurText(imprintField, imprint,imprint)
    imprintMethodText= imprint;
    Short_Wait()
    let createOption= element(by.xpath("//div[@id='imprintMethod']//*[contains(text(),'Create')]"))
    actions.Click(createOption,"Create "+imprint);
   },


   selectLocation: (locations,index=0)=>{
  reporter.appendTest('<b>Selecting Artwork Placement</b>', 'Selecting Artwork location on: '+locations, "");             
    actions.Click(location.get(index),"Artwork Placement/Location Dropdown");
    Short_Wait()
    let locationLocator= element(by.xpath("//*[text()='"+locations+"']"))
    actions.jsClick(locationLocator, locations)
    artworkLocation= locations;
   },
 
   // verifyProductsInLibrary: ()=>{
   // Long_Wait()
   //  element.all(by.xpath('//figure[@class="fixedFigure"]/..')).then(productArray=>{
   //   if (productArray.length>0) {
   //      reporter.appendTest('Selecting image', 'Selecting image from a library', "");        
   //       actions.Click(productArray[0],"Image from Library")
   //     }
   //      else  reporter.appendTest('Selecting image', 'No image present in library', "");
   //  })
   // },
  selectProductsInLibrary: ()=>{
   Medium_Wait()
    let artworkImage=element(by.xpath('(//figure[@class="fixedFigure"]/..)[1]'))
        reporter.appendTest('Selecting image', 'Selecting image from a library', "");        
        actions.Click(artworkImage,"Image from Library")
   },

   verifyLibraryPage: ()=>{
   reporter.appendTest('Verifying Artwork library page', '********************', "");        
    actions.verifyElementDisplayed(artWorkPage,true, "Art Work Label")
    actions.verifyElementDisplayed(customerName,true, "Customer Search field")
    actions.verifyElementDisplayed(keywordSearch,true, "Keyword Search field")
    actions.verifyElementDisplayed(fileType,true, "File type Search field")
   },

   selectCustomer: (customer)=>{
   reporter.appendTest("<b>Searching for images related to customer: </b>", customer, "");      
    actions.blurText(customerName, customer, "Customer Name")
    Medium_Wait()
    actions.PressEnter()
    Long_Wait()
   },

   verifyComputerAndLibraryOprionNotDisplayed: ()=>{
    actions.verifyElementsNotDisplayed(selectFromComputeButtonObject,true,  "Select From Computer")
    actions.verifyElementsNotDisplayed(selectFromLibraryButtonObject,true,  "Select From Library")
   },

   verifyElementIsDisabled: ()=>{
    actions.VerifyFieldDisabled(nextButton,true, "Next button")
    actions.VerifyFieldDisabled(addLocationButton,true, "Add location button")
    actions.VerifyFieldDisabled(saveDecorationButton,true, "Save decoration button")
   },

   verfiyNextIsEnabled: ()=>{
    actions.VerifyFieldEnabled(nextButton,true, "Next button")
    actions.VerifyFieldEnabled(prevButton,true, "Previous button")
    actions.VerifyFieldEnabled(addLocationButton,true, "Add location button")
    actions.VerifyFieldEnabled(saveDecorationButton,true, "Save decoration button")
   },

   verifyImprintHeaderDescription: (imprint,index=0)=>{
    element.all(by.xpath('//span[text()="1. Imprint Method"]/span/div')).then(productArray=>{
     if (productArray.length>0) {
        reporter.appendTest('<b>Verifying Imprint Header description</b>', 'Imprint Header should describe the imprint method selected', "");        
        productArray[index].getText().then(productName=>{
            actions.expectToEqualCustom(imprint, productName,"Subway Header description" , "Selected imprint method ", "Displayed Imprint Header description") 
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
         })
       }
        else  reporter.appendTest('Verifying Imprint Header description', 'No Imprint Header description present', "FAIL");
    })
   },

   verifyLocationHeaderDescription: (location,index=0)=>{
    element.all(by.xpath('//span[text()="2. Artwork & Placement"] /span/div')).then(productArray=>{
     if (productArray.length>0) {
      reporter.appendTest('<b>Verifying Artwork Placement/Location Header description</b>', 'Location Header should describe the Artwork Placement/Location selected', "");        
        productArray[index].getText().then(productName=>{
            actions.expectToEqualCustom(location, productName,"Subway Header description" , "Selected Location  ", "Displayed Location Header description") 
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
         })
       }
        else  reporter.appendTest('Verifying Artwork Placement/Location Header description', 'No Location Header description present', "FAIL");
    })
   },

   verifyPreviewImage: ()=>{
    Long_Wait()
     Medium_Wait()
     element.all(by.xpath('//div[@class="preview-img"]')).then(productArray=>{
     if (productArray.length>0) {
        reporter.appendTest('<b>Verifying Preview of selected image from library</b>', 'Verified Image preview is displayed', "PASS");        
       }
        else  reporter.appendTest('Verifying Preview of selected image from libraryn', 'Verified Image preview is not displayed', "FAIL");
    })
   },

   clickOnSelectASavedDecorationButton:function(){
   reporter.appendTest('<b>Verifying the Saved Decoration</b>', 'Added decoration should be saved and displayed under "Saved Decorations"', "PASS");           
      actions.jsClick(selectASavedDecoratin,"Select a Saved Decoration")
    },

   verifySavedDecoration: ()=>{
    element.all(by.xpath('//p[text()="'+ decorationNameText+'"]')).then(decoName=>{
          element.all(by.xpath('//p[text()="'+ decorationDescriptionText+'"]')).then(decoDesc=>{
            if (decoName.length>0)
                  reporter.appendTest('Verifying Added Decoration Name', 'Verified Added Decoration Name: '+decorationNameText+' is Saved/Displayed ', "PASS");        
            else  reporter.appendTest('Verifying Added Decoration Name', 'Verified Added Decoration Name is Not Saved/Displayed', "FAIL"); 
           if (decoDesc.length>0)
                reporter.appendTest('Verifying Added Decoration Description', 'Verified Added Decoration Description: '+decorationNameText+' is Saved/Displayed', "PASS");        
            else  reporter.appendTest('Verifying Added Decoration Description', 'Verified Added Decoration Description is Not Saved/Displayed', "FAIL"); 
      })
    })
   },

   verifySendProofsDisabled: ()=>{
    actions.VerifyFieldDisabled(sendProofsTextArea ,true,  " 'Send Proofs To' Text Area")
   },
   
   verifySendProofsField: (mails)=>{
       sendProofsTextArea.getText().then(text=>{
            actions.expectToEqualCustom(text, mails,"'Send Proof to' text area" , "Text filled in the field", "Text Entered in the field") 
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
         })   

    },

  verifyDecorationStatus: ()=>{  //global.productName or lineItem
  // let keyword= lineItem.split(' ')[0]  //getting x" or x' in the string
  // let keyword= (global.productName).split(' ')[0]  //getting x" or x' in the string
   reporter.appendTest('Verifying <b>Decoratated</b> product status', 'Decoration status for decorated product should be: done', "");        
     element.all(by.xpath('//p[contains(text(),"'+lineItem+'")]/../following-sibling::div[@class="text-center col"]/p/p')).then(decoStatus=>{
          if (decoStatus.length>0)
                reporter.appendTest('Verifying Decoration status for selected product: '+lineItem, 'Verified Decoration status for: '+lineItem+' is : <b>done</b>', "PASS");        
          else  reporter.appendTest('Verifying Decoration status for selected product: '+lineItem, 'Verified Decoration for selected product is not created ', "FAIL"); 
        })
    },

   verifyDecoratatedLineItemVendor: (imprint)=>{
    imprint= (imprint? imprint: imprintMethodText)
     reporter.appendTest('Verifying <b>Decoratation</b>', 'Decoration line item should contain Vendor, Color, Size and other details of the decoration', "");        
      element.all(by.xpath('//p[contains(text(),"'+imprint+'")]')).then(decoLineItem=>{
          if (decoLineItem.length>0){
              //vendor
                // reporter.appendTest('Verifying Decoratation <b>Vendor</b>', 'Selected and dispalyed vendor of decoration should be same', "");        
                   element.all(by.xpath('//p[contains(text(),"'+imprint+'")]/../following-sibling::div[@class="down-lg-none col"][2]/p')).then(decoDetails=>{
                      if (decoDetails.length>0){
                           decoDetails[0].getText().then(text=>{
                             actions.expectToContainCustom(decorationVendor,text, "Decoration Vendor" ,"Selected Vendor while decorating", "Displayed Vendor name of decoration") 
                          },function(err){ 
                               expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
                              })
                         }else  reporter.appendTest('Verifying Decoratated line item <b>Vendor</b>', 'No vendor dispalyed for decoration' , "FAIL");        
                     })
              }
          else  reporter.appendTest('Verifying Decoration line item', 'Verified Decoration line item is not displayed', "FAIL"); 
        })
    },
    verifyDecoratatedLineItemColor: (imprint, color)=>{
    imprint= (imprint? imprint: imprintMethodText)
     color= (color? color: decorationColor)
     element.all(by.xpath('//p[contains(text(),"'+imprint+'")]')).then(decoLineItem=>{
          if (decoLineItem.length>0){
              //Color
                   element.all(by.xpath('//p[contains(text(),"'+imprint+'")]/../following-sibling::div[@class="down-lg-none col"][1]/p')).then(decoDetails=>{
                      if (decoDetails.length>0){
                           decoDetails[0].getText().then(text=>{
                             actions.expectToEqualCustom(text, color,"Decoration Color" , "Displayed Color for decoration", "Selected Color while decorating") 
                          },function(err){ 
                               expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
                              })
                         }else  reporter.appendTest('Verifying Decoratated line item <b>Color</b>', 'No Color dispalyed for decoration' , "FAIL");        
                     })
              }
        })
    },
    verifyDecoratatedLineItemSize: (imprint, size)=>{
    imprint= (imprint? imprint: imprintMethodText)
     size= (size? size: decorationSize)
       element.all(by.xpath('//p[contains(text(),"'+imprint+'")]')).then(decoLineItem=>{
          if (decoLineItem.length>0){
                //Size
                   element.all(by.xpath('//p[contains(text(),"'+imprint+'")]/../following-sibling::div[@class="font-weight-bold col"][1]/p')).then(decoDetails=>{
                      if (decoDetails.length>0){
                           decoDetails[0].getText().then(text=>{
                             actions.expectToEqualCustom(text, size,"Decoration Size" , "Displayed Size of decoration", "Selected Size while decorating") 
                          },function(err){ 
                               expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
                              })
                         }else  reporter.appendTest('Verifying Decoratated line item <b>Size</b>', 'No Size dispalyed for decoration', "FAIL");        
                     })

              }
        })
    },
   
   clickOnviewDecorationDetailsButton:function(){
      actions.jsClick(viewDecorationDetailsButton,"View Decoration Details Button")
      browser.sleep(20000)
    },

   verifySelectedProductToViewDetails: ()=>{
    Long_Wait()
    reporter.appendTest('<b>Verifying selected product and displyad product</b>', 'Selected and Displayed product on "Decoration details" page should be same', "");
     element.all(by.xpath('//li[@class="products-list__item"]//p')).then(productArray=>{
      if (productArray.length>0) {
         productArray[0].getText().then(productName=>{
            reporter.appendTest('Retrieving Displayed Product', 'Displayed Product in decoration details page is: '+productName, "PASS");
            actions.expectToContainCustom(lineItem, productName,"Decorated Product" , "Selected product to view decoration details", "Displayed product in decoration details page")
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
         })
       }
        else  reporter.appendTest('Retrieving Product', 'Retrieving Displayed Product- Failed', "FAIL");
    })
   },

   verifyImprintInViewDetailsNotDispalyed: (imprint)=>{
      element.all(by.xpath('//label[text()="Imprint Method"]/following-sibling::div/div/div/div[text()="'+imprint+'"]')).then(imprintArray=>{
         if (imprintArray.length<1) 
             reporter.appendTest('Verifying deleted imprint and artwork combo:'+imprint, 'Verified that imprint and artwork combo is deleted and not displayed in Decoration details page', "");
           else{ reporter.appendTest('Verifying deleted imprint and artwork combo:'+imprint, 'Verified that imprint and artwork combo is not deleted and displayed in Decoration details page', "FAIL");
            expect(false).toReport(true, 'Verified that imprint and artwork combo is not deleted');
        }
     })
   },
   verifyImprintInJobListPageNotDispalyed: (imprint)=>{
      element.all(by.xpath('//div[@class="details-table row"]//p[text()="'+imprint+'"]')).then(imprintArray=>{
         if (imprintArray.length<1) 
             reporter.appendTest('Verifying deleted imprint and artwork combo:'+imprint, 'Verified that imprint and artwork combo is deleted and not displayed in Job list page table', "");
           else{ reporter.appendTest('Verifying deleted imprint and artwork combo:'+imprint, 'Verified that imprint and artwork combo is not deleted and displayed in Job list page table', "FAIL");
            expect(false).toReport(true, 'Verified that imprint and artwork combo is not deleted');
         }
     })
   },

   verifyImprintInViewDetails: (imprint, index=1)=>{
     imprint= (imprint? imprint: imprintMethodText)
       element.all(by.xpath('(//label[text()="Imprint Method"]/following-sibling::div/div/div/div[1])')).then(imprintArray=>{
            imprintArray[index].getText().then(imprintText=>{
              actions.expectToEqualCustom(imprint, imprintText,"Imprint method" , "Selected Imprint method while decorating", "Displayed Imprint method in decoration details page")
           },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
     })
   },
   verifyArtworkLocationInViewDetails: (location, index=0)=>{
    location= (location? location: artworkLocation)
      element.all(by.xpath('//label[text()="Location"]/following-sibling::div/div/div/div[1]')).then(artworkLocationElement=>{
        artworkLocationElement[index].getText().then(locationText=>{
          actions.expectToEqualCustom(location, locationText,"Artwork Location" , "Selected Artwork Location while decorating", "Displayed Artwork Location in decoration details page")
          },function(err){ 
          expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message); 
         })
      })
   },
   verifyColorInViewDetails: ()=>{
      color.getAttribute('value').then(value=>{
            actions.expectToContainCustom(decorationColor, value,"Decoration Color" , "Selected Color while decorating", "Displayed Color in decoration details page")
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetAtrribute operation because of " + err.message);
         })
    },
   verifySizeInViewDetails: ()=>{
     size.getAttribute('value').then(value=>{
            actions.expectToContainCustom(decorationSize, value,"Decoration Size" , "Selected Size while decorating", "Displayed Size in decoration details page")
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetAtrribute operation because of " + err.message);
     })

    },
   verifyNotesInViewDetails: ()=>{
     sendProofsTo.getText().then(text=>{
            actions.expectToContainCustom(decorationSendProof, text,"Send proofs To" , "Selected mails while decorating", "Displayed mails in decoration details page")
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
     })

    },

     verifyProofsInViewDetails: ()=>{
     decorationNotes.getText().then(text=>{
            actions.expectToContainCustom(decorationNotesText, text,"Decoration Notes" , "Given Decoration notes while decorating", "Displayed Decoration notes in decoration details page")
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
     })
    },

    selectImprintInViewDetails: (imprint,index=0)=>{
     element.all(by.xpath('(//div[contains(@id,"imprintMethod")])')).then(imprintArray=>{
      actions.Click(imprintArray[index], "Imprint method")
        Short_Wait()
          let imprintLocator= element(by.xpath("//div[contains(@id,'imprintMethod')]//*[text()='"+imprint+"']"))
            actions.Click(imprintLocator, imprint)            
              imprintMethodTextUpdated= imprint;
      })
   },
   selectArtworkLocationInViewDetails: (location,index=0)=>{
     element.all(by.xpath('(//div[contains(@id,"location")])')).then(artworkArray=>{
      actions.Click(artworkArray[index], "ArtWork Location")
        Short_Wait()
          let locationLocator= element(by.xpath("//div[contains(@id,'location')]//*[text()='"+location+"']"))
            actions.Click(locationLocator, location)
             artworkLocationUpdated= location;
      })
    },

    updateOptions:function(){
      let decorationUpdate= element(by.xpath("//div[@class='product-details']/following-sibling::div//button[text()='Update']"))
      actions.Click(decorationUpdate,"Decoration Update Button")
      Medium_Wait()
    },
    clickOnEditRelatedCharges:function(){
      actions.Click(editRelatedChargesButton,"Edit Related Charges Button")
      Short_Wait()
    },
    verifyEditRelatedChargesHeader:function(){
      let editRelatedChargesHeader= element(by.xpath("//div[@class='modal-content']//h5[text()='DECORATE PRODUCTS – EDIT RELATED CHARGES']"))
      actions.verifyElementDisplayed(editRelatedChargesHeader,true,"Related Charges Pop up")
    },


    clickOnUpdateButton:function(){
      let decorationPageOptions= element(by.xpath("//div[@class='product-details']//button[text()='Update']"))
      actions.Click(decorationPageOptions,"Update Button")
      Medium_Wait()
    },

    verifyDecoratatedLineItem: (imprint)=>{
     element.all(by.xpath('//div[@class="details-table row"]//p[contains(text(),"'+imprint+'")]')).then(decoLineItem=>{
          if (decoLineItem.length>0)
                reporter.appendTest('Verifying Decoratated line item', 'Verified that decorated line item created with imprint: '+imprint, "PASS");        
             else {
              reporter.appendTest('Verifying Decoratated line item', 'Verified that decorated line item is not created with imprint: '+imprint, "FAIL");        
            expect(false).toReport(true, 'Verified that decorated line item is not created with imprint: '+imprint);
          }
      })
     },

    verifyUpdatedImprintInViewDetails: ()=>{
     element.all(by.xpath('//label[text()="Imprint Method"]/following-sibling::div/div/div/div[1]')).then(productArray=>{
      if (productArray.length>0) {
         productArray[0].getText().then(productName=>{
            reporter.appendTest('Retrieving Imprint method dispayed', 'Displayed Imprint method in decoration details page is: '+productName, "");
            actions.expectToEqualCustom(imprintMethodTextUpdated, productName,"Imprint method" , "Selected Imprint method while updating decoration", "Displayed Imprint method in decoration details page")
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
         })
       } else { reporter.appendTest('Retrieving Imprint method', 'Retrieving Displayed Imprint method- Failed', "FAIL");
              expect(false).toReport(true, 'Retrieving Displayed Imprint method- Failed');
           }
        })
   },

   verifyUpdatedArtworkLocationInViewDetails: ()=>{
     element.all(by.xpath('//label[text()="Location"]/following-sibling::div/div/div/div[1]')).then(productArray=>{
      if (productArray.length>0) {
         productArray[0].getText().then(productName=>{
            reporter.appendTest('Retrieving Artwork Location dispayed', 'Displayed Artwork Location dispayed in decoration details page is: '+productName, "");
            actions.expectToEqualCustom(artworkLocationUpdated, productName,"Artwork Location" , "Selected Artwork Location while updating", "Displayed Artwork Location in decoration details page")
         },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
         })
       }
        else { reporter.appendTest('Retrieving Artwork Location', 'Retrieving Displayed Artwork Location- Failed', "FAIL");
              expect(false).toReport(true, 'Retrieving Displayed Artwork Location- Failed');
          }
      })
   },

   storeProductLocal: () => {
      let productNameCard = element(by.xpath('//h2[@class="product-card__name"]'))
            productNameCard.getText().then(productName => {
              lineItem = productName;
                reporter.appendTest('Retrieving Product', 'Selected Product: ' + lineItem, "PASS");
        })
    },
   enterRequestedShipDate: () => {
     var currentDate = new Date(),
         dd = currentDate.getDate(),
         mm = currentDate.getMonth() + 1, //as January is 0
         yyyy = currentDate.getFullYear();
         if (dd < 10) dd = '0' + dd
         if (mm < 10) mm = '0' + mm
          reqShipDate = mm + '' + dd + '' + yyyy;
          let reqshipDateField = element(by.id('reqShipDate'))
          actions.blurText(reqshipDateField, reqShipDate, "Requested ship date")
        // reqShipDate = mm + '/' + dd + '/' + yyyy //storing in this format to validate in other fields where date reflects
    },
    enterInHandDate: () => {
      var tommorow = new Date(86400000 + +new Date())
          // here 86400000 is used to convert millisecods to current date
          //gets the date of tommowrow, because we have to select future date for Inhand date 
      var dd = tommorow.getDate(),
          mm = tommorow.getMonth() + 1, //as January is 0
          yyyy = tommorow.getFullYear();
        if (dd < 10) dd = '0' + dd
        if (mm < 10) mm = '0' + mm
          inHandDate = mm + '' + dd + '' + yyyy ;
         let inHandDateField = element(by.id("inHandsDate"))
          actions.blurText(inHandDateField, inHandDate, "Inhand date")
          // inHandDate = mm + '/' + dd + '/' + yyyy  //storing in this format to validate in other fields where date reflects
    },
    selectAddedProductCheckBox: function(){
      if(lineItem!=''){
        reporter.appendTest('<b>Selecting Added Product: </b>', lineItem, "");
          element.all(by.xpath('//p[contains(text(),"'+lineItem+'")]/../preceding-sibling::div/div/label')).then(productArray=>{
                let product= productArray.slice(-1)[0] //returns last element of the array, returns undefined if array is empty
                 actions.jsClick(product, lineItem);
             })
          }else  {
            reporter.appendTest('Selecting Added Product', 'Failed: Product name variable is empty', "FAIL");
            expect(false).toReport(true, "Unable to perform operation because product name variable is empty ");
           }
     },
     selectProductCheckBox: function(index=1){
        reporter.appendTest('<b>Selecting Added Product: </b>', lineItem, "");
          let checkBox=element(by.xpath('(//p/../preceding-sibling::div/div/label)[1]'))
              actions.jsClick(checkBox, "lineItem Check Box");    
     },
    selectDecoratedLineProduct: ()=>{
     if(lineItem!=''){
      reporter.appendTest('<b>Selecting Decorated Product: </b>', lineItem, "");
         element.all(by.xpath('//div[@class="details-table row"]//p[contains(text(),"'+lineItem+'")]')).then(productArray=>{
              let product= productArray.slice(-1)[0] //returns last element of the array, returns undefined if array is empty
                actions.Click(product, lineItem)
                  Medium_Wait()
           })
        } else  {
            reporter.appendTest('Selecting Decorated Product', 'Failed: Product name variable is empty', "FAIL");
            expect(false).toReport(true, "Unable to perform operation because product name variable is empty ");
           }
    },
   deleteThisArtworkAndPlacement: (imprint, index)=>{
    reporter.appendTest('Delete this Artwork & Placement: ',imprint , "");     
    let deleteArtAndLocButton= element(by.xpath("(//button[text()='- Delete this Artwork & Placement'])['"+index+"']"))
      actions.jsClick(deleteArtAndLocButton, "Delete this Artwork & Placement")
     },
  verifyDeleteImprintAndArtworkLocationOptionDisplayedForEachOption: (expectedCount)=>{
    reporter.appendTest('Verify delete Imprint and Artwork location button displayed for each Option for each decoration option','**************************' , "");     
     element.all(by.buttonText('- Delete this Artwork & Placement')).then(buttonCount=>{
      if(buttonCount.length==expectedCount)
            reporter.appendTest('Verifying Delete this Artwork & Placement button', 'Verified delete Imprint and Artwork location button is displayed for each decoration option', "PASS")
       else {
            reporter.appendTest('Verifying Delete this Artwork & Placement button', 'Verified delete Imprint and Artwork location button is not displayed for each decoration option', "FAIL");
            expect(false).toReport(true, 'Verified delete Imprint and Artwork location button is not displayed for each decoration option');
           }
      })
     },

    addArtworkAndPlacement: ()=>{
    reporter.appendTest('Add Artwork & Placement in Decoration details page','************************' , "");
     let addArtAndLocButton= element(by.buttonText("+ Add another Artwork and Placement section"))
      actions.jsClick(addArtAndLocButton, "Add Artwork & Placement")
     },

};





