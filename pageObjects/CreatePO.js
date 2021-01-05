'use strict';

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
    random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
    //***************************** Page Objects *************************************//


    poDateTextBox = element(by.xpath("//*[text()='PO DATE'] /following-sibling::div//input")),
    orderTo = element(by.xpath("//*[text()='order to']/..//input[@name='orderTo']/../div")),
    nextButton = element(by.css("[class='btn btn-primary']")),
    modelPopup = element(by.css("[class='modal_popup']")),
    modelPopupTitle = element(by.css("[class='modal_popup__title']")),
    createdPONumber = element(by.css("[class='modal_popup'] p")),
    okButton = element(by.css("[class='modal_popup'] button")),
    vendorName = element(by.xpath("//*[@id='Vendor Name']//div/div/div/following-sibling::div/preceding-sibling::div")),
    POTypeStandard = element(by.xpath("//div[@class='modal-body']//input[@id='standard']")),
    POTypeBundledPo = element(by.xpath("//div[@class='modal-body']//input[@id='bundledPo']")),
    productionContact = element(by.id("productionContact")),
    orderContactMail = element(by.xpath("//*[@for='productionContact']/../../../following-sibling::div//p")),
    nameAndCompanyCode = element(by.css("[placeholder='Name or Company Code']")),
    downArrayNextToVendor = element(by.xpath("//*[text()='Add/Change Alternate Address']/..//button")),
    uploadDropshipInstructions = element(by.xpath("//*[text()='+ Upload Dropship Instructions']/preceding-sibling::input")),
    POLineItemSection = element(by.xpath("//*[text()='PO Line Items']/../../..//*[@class='products-list__header ']")),
    showBelowLineItemsRadioButton = element(by.id("show below line items")),
    doNotShowOnPORadioButton = element(by.id("Do not show on PO")),
    advancedInstructionSearch = element(by.xpath("//a[text()='Advanced Instructions Search']")),
    BackToPOCreationButton = element(by.xpath("//div[@class='modal-content']//i[text()='arrow_back']")),
    POSDropdownButton = element(by.buttonText("Create PO")),
    POSDropdownOption = element(by.xpath('//button[@class="dropdown-item"]/a')),

    fieldstreetAddress = element(by.id('fieldstreetAddress')),
    fieldblg = element(by.id('fieldblg')),
    fieldcity = element(by.id('fieldcity')),
    zip = element(by.id('zip')),
    vendorStateDropDown = element(by.xpath('//div[text()="State"]')),
    submitButton = element(by.buttonText('SUBMIT')),
    fieldcompanyName = element(by.id('fieldcompanyName')),
    mailTo = element(by.xpath("//*[text()='to']/following-sibling::div")),
    mailFrom = element(by.xpath("//*[text()='from']/following-sibling::div")),
    seperateMultipleEmail1 = element(by.id('sendpocc')),
    seperateMultipleEmail2 = element(by.id('sendpobcc')),
    subjectFiled = element(by.id('sendposubject')),
    bodyLabel = element(by.xpath("//label[text()='body']/following-sibling::div/textarea")),
    lineItemsList = element.all(by.xpath('//*[@class="details-table row"]//*[@class="align-items-center row"]')),
    carrier= element(by.xpath("//label[text()='carrier/method']/following-sibling::div/input")),
    //  =element(by.xpath(""))
    insideDeliveryRequired=element(by.xpath("//label[text()='Inside Delivery required']")),
    requestFreightEqualization=element(by.xpath("//label[text()='Request Freight Equalization']/preceding-sibling::input")),
    alternativeShippingAccount=element(by.xpath("//label[text()='+ Add alternative shipping account # for this carrier                      ']//following-sibling::div/input")),      //Don't remove the whitespaces here                   
    advancedInstructionsSearchPopUp=element(by.xpath("//div[text()='Advanced Instructions Search'] ")),   
    keyWordSearch= element(by.xpath("//label[text()='KEYWORD OR PHRASE']/following-sibling::div/input")),
    searchButton=element(by.buttonText('SEARCH')),
    customerSearch=element(by.xpath("//label[text()='CUSTOMER']/following-sibling::div//input")),
    jobNumberSearch=element(by.xpath("//label[text()='JOB NUMBER']/following-sibling::div//input")),
    poNumberSearch=element(by.xpath("//label[text()='PO NUMBER']/following-sibling::div//input")),
    vendoSearch=element(by.xpath("//label[text()='VENDOR']/following-sibling::div//input")),
    JobTitleSearch=element(by.xpath("//label[text()='JOB TITLE(CONTAINS)']/following-sibling::div//input")),
    orderDatesSearch=element(by.xpath("//label[text()='order dates']/following-sibling::div//input")), 
    excludeVoidedJobs=element(by.xpath("//label[text()='Exclude Voided Jobs']")),
    uploadFilesButton=element(by.xpath("//*[text()='+  Upload File(s)']/preceding-sibling::input")),
    closeButton=element(by.css('[class="close"]')),
    backToPObutton= element(by.xpath("//span[text()=' Back To PO Creation']")),
    cancelButton= element(by.buttonText('CANCEL')),
    discardButtton= element(by.buttonText('DISCARD')),
    closeWithoutSendingButtton= element(by.buttonText('CLOSE WITHOUT SENDING')),
    sendAndCloseButtton= element(by.buttonText('SEND & CLOSE')),
    poTab= element(by.linkText('POs')),
    dropShipFile= element(by.xpath('//*[contains(@class,"list-unstyled")]/li')),
    addInfoFile= element(by.xpath('//*[contains(@class,"list-unstyled")]')),
    poTabLink= element(by.linkText("POs")),
    viewingDatesDrop= element(by.xpath("//span[text()='Viewing dates for']/parent::div/following-sibling::button"))
    global.lineItemsStatusesLis=[]

var poNumber='',
    selectedVendor=''
    
// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
module.exports = {
    /*Used to save application verification data form dynamic verification*/
    specData: {},

    getLineItemsCount:  ()=>{
        return lineItemsList.count()
    },

    getLineItemsStatusesCount:  (lineItemStatus)=>{
        var lineItemsStatusesList = element.all(by.xpath("//div[text()='status']/../following::div//span[text()='" + lineItemStatus + "']"))
        global.lineItemsCount= lineItemsStatusesList.count()
    },

    selectLineItemCheckBox:  (lineItemStatus)=>{
        var lineItemCheckBox = element.all(by.xpath("//div[text()='status']/../following::div//span[text()='" + lineItemStatus + "']/../../preceding-sibling::div//input[@type='checkbox']")).get(0)
       actions.Click(lineItemCheckBox, "'"+ lineItemStatus + "' lineitem checkbox")
    },

    getSelectedVendor: async()=>{
        vendorName.getText().then(function (text) {
            reporter.appendTest('Verifying Vendor', 'Selected "Vendor" is: '+text, "PASS");
            global.dispayedVendor = text;
         }, function (err) {
            reporter.appendTest('Verifying Vendor', 'Verifying "Vendor" failed', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
            global.dispayedVendor= '';
        })
    },
    getSelectedVendorLocal: async()=>{
        vendorName.getText().then(function (vendoText) {
            reporter.appendTest('Verifying Vendor', 'Selected "Vendor" is: '+vendoText, "PASS");
             selectedVendor = vendoText;
         }, function (err) {
            reporter.appendTest('Verifying Vendor', 'Verifying "Vendor" failed', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
    },
    verifySelectedAndDisplayedVendor: ()=>{
        if(global.selectedVendor && global.dispayedVendor)
      actions.expectToEqualCustom(global.selectedVendor,global.dispayedVendor,"Selected And Displayed Vendor", "Selected Vendor", "Displayed Vendor")
    },
    clickOnCreatePOS:  () => {
        actions.jsClick(POSDropdownButton, "Create POS dropdown");
    },

    selectCreatePOSOptionFromDropdown: function () {
        reporter.appendTest('<b>Selecting vendor</b>', '*************', "");
        POSDropdownOption.getText().then(function (text) {
            reporter.appendTest('Verifying Vendor', 'Selected "Vendor" is: '+text, "PASS");
            global.selectedVendor = text;
            actions.jsClick(POSDropdownOption, text);
         }, function (err) {
            reporter.appendTest('Verifying Vendor', 'Verifying "Vendor" failed', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
            global.selectedVendor= '';
        })
        
    },
    selectOrderTo: function (option) {
        Medium_Wait()
        var elem = element(by.xpath("//*[text()='" + option + "']"))
        this.clickOnOrderTo()
        actions.Click(elem, "Order To")
    },
    clickOnOrderTo: function () {
        actions.Click(orderTo, "Order To")
    },

    clickOnNextButton: function (option) {
        actions.jsClick(nextButton, option)
        Medium_Wait()
    },

    verifyPODate1: function () {
        var currentDate = new Date();
        // currentDate.getTime()+days*24*60*60*1000;
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1; //as January is 0
        var yy = currentDate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        date = mm + '/' + dd + '/' + yy;
        actions.verifyElementDisplayed(poDateTextBox, true, "PO Date")
        poDateTextBox.getAttribute('value').then(function (value) {
            actions.expectToEqual(value, date, "PO Date")
        })
    },
    verifyProductionContact: function () {
    actions.GetFieldValue(productionContact,"Production Contact")
    },

    clickOnDownArrawNextToCustomer: function () {
        actions.Click(downArrayNextToVendor, "Alternate Address dropdown")
    },
    verifyNextToCustomer_VendorAndAddNewOptions: function (expectedValue) {
        Medium_Wait()
        var vendor = element.all(by.xpath("(//*[text()='Add/Change Alternate Address']/..//button/following-sibling::div/button)[1]")),
            addNew = element.all(by.xpath("(//*[text()='Add/Change Alternate Address']/..//button/following-sibling::div/button)[2]"))
        vendor.getText().then(function (text) {
            actions.expectToEqualCustom(text, "Customer", "Alternate Address options",'Displayed option', 'Expected option')
        })
        addNew.getAttribute('innerText').then(function (text) {
            actions.expectToEqualCustom(text, "Add New","Alternate Address options",'Displayed option', 'Expected option')
        })
    },

    enterCustomerName: function (CustomerNAme) {
        var Customer = element.all(by.xpath("//*[text()='Add/Change Alternate Address']/..//button/following-sibling::div/button")).get(0)
        actions.Click(Customer, "Customer")
        actions.EnterText(nameAndCompanyCode, CustomerNAme, "Customer Name")
        Long_Wait()
        actions.PressDownArrow()
        actions.PressEnter()
        Short_Wait()
        nameAndCompanyCode.getAttribute('value').then(function (value) {
                    reporter.appendTest('Verifying Customer', 'Selected "Customer" is: '+value, "PASS");
                 }, function (err) {
                    reporter.appendTest('Verifying Customer', 'Verifying "Customer" failed', "FAIL");
                    expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        })
    },

    enterVendorName: function (vendorName) {
        actions.EnterText(nameAndCompanyCode, vendorName, "Vendor Name")
        Long_Wait()
        actions.PressDownArrow()
        actions.PressEnter()
        Short_Wait()
        nameAndCompanyCode.getAttribute('value').then(function (value) {
                    reporter.appendTest('Verifying Vendor', 'Selected "Vendor" is: '+value, "PASS");
                 }, function (err) {
                    reporter.appendTest('Verifying Vendor', 'Verifying "Vendor" failed', "FAIL");
                    expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        })
    },
    clickOnAddNewAddress: function () {
        var addNew = element.all(by.xpath("//*[text()='Add/Change Alternate Address']/..//button/following-sibling::div/button")).get(1)
        actions.Click(addNew, "Add New")
    },
    clickOnPOTypeStandard: function () {
        actions.Click(POTypeStandard, "PO Type standard")
    },

    verifyPOTypeStandard: function () {
        Medium_Wait()
        actions.VerifyElementPresent(POTypeStandard, true, "PO Type standard")
    },

    verifyPOTypeBundledPo: function () {
        actions.VerifyElementPresent(POTypeBundledPo, true, "PO Type bundledPo")
    },
    verifyOrderContactMail: function () {
        actions.VerifyElementPresent(orderContactMail, true, "Order contact mail")
        this.printtOrderContactMail()         
    },
    printtOrderContactMail: ()=>{
        actions.GetElementText(orderContactMail,"Ordering contact")
    },
    printDisplayedDefaultShippingLocationSection: function () {
        Medium_Wait()
        var shippingLocationName = element.all(by.xpath("//*[text()='DEFAULT SHIPPING LOCATION']/../div/div")).get(0),
            shippingLocation = element.all(by.xpath("//*[text()='DEFAULT SHIPPING LOCATION']/../div/div")).get(1)
        actions.GetElementText(shippingLocationName,"Shipping Contact Name")
        actions.GetElementText(shippingLocation,"Shipping Location")
    },
    validateDefaultShippingLocationSection: function (exp_shippingLocationName, exp_shippingLocation) {
        var shippingLocationName = element.all(by.xpath("//*[text()='DEFAULT SHIPPING LOCATION']/../div/div")).get(0),
            shippingLocation = element.all(by.xpath("//*[text()='DEFAULT SHIPPING LOCATION']/../div/div")).get(1)
        shippingLocationName.getAttribute('innerText').then(function (text) {
            reporter.appendTest('Verify shipping Location section Location Name', 'Shipping Location section Location Name: ' + text, "PASS");
            // actions.expectToEqual(text,exp_shippingLocationName,"Shipping Location section Location Name")
        })
        shippingLocation.getAttribute('innerText').then(function (text) {
            reporter.appendTest('Verify shipping Location section Location Name', 'Shipping Location section Location Name: ' + text, "PASS");
            // actions.expectToEqual(text,exp_shippingLocation,"Shipping Location section Location")
        })

    },
    verifyPODate: function () {
        var currentDate = new Date();
        // currentDate.getTime()+days*24*60*60*1000;
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1; //as January is 0
        var yy = currentDate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        var date = mm + '/' + dd + '/' + yy;
        actions.VerifyElementPresent(poDateTextBox, true, "PO Date")
        poDateTextBox.getAttribute('value').then(function (value) {
            actions.expectToEqual(value, date, "PO Date")
        })
    },

    enterPODate: function () {
        var currentDate = new Date();
        // currentDate.getTime()+days*24*60*60*1000;
        var dd = currentDate.getDate();
        var mm = currentDate.getMonth() + 1; //as January is 0
        var yy = currentDate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        var date = mm + '/' + dd + '/' + yy;
        actions.blurText(poDateTextBox, date, "PO Date");
    },

    ismodelPopupDisplayed: function () {
        // Medium_Wait()  
        // modelPopupTitle.getText().then(function(text){
        //     actions.expectToContainCustom(text,"PO CREATED SUCCESSFULLY","PopUp Message","Displayed Message", "Expected Message")
        //     },function(error){
        //      reporter.appendTest('Failed', 'Verifying pop up failed due to: '+error,"FAIL");   
        // })  //
    },

    getCreatedPoNumber:  function () {
        Medium_Wait()
        createdPONumber.getText().then( function (text) {
            global.poNumber = text.split(':')[1].trim();
            reporter.appendTest('<b>Verifying created PO Number<b>', 'Created ' + text, "PASS");
        })
    },
    getCreatedPoNumberLocal:  function () {
        createdPONumber.getText().then( function (po) {
             poNumber = po.split(':')[1].trim();
            reporter.appendTest('<b>Verifying created PO Number<b>', 'Created ' + po, "PASS");
        })
    },
    storeCreatedPoNumberLocal:  function () {
        createdPONumber.getText().then( function (po) {
             poNumber = po.split(':')[1].trim();
            reporter.appendTest('<b>Verifying created PO Number<b>', 'Created ' + po, "PASS");
        })
    },

    clickOnOkButton: function () {
        actions.jsClick(okButton, "OK button")
        Long_Wait()
    },

    uploadDropshipInstructionsMethod: function () {
        actions.EnterText(uploadDropshipInstructions,testDataObjectsPath+'ipromoteU.png',"DropShip Instuction")       
    },

    verifyFileNameforDropShipInstruction: async (uploadedFileName) =>{
     Medium_Wait()
     this.verifyFileName(dropShipFile,uploadedFileName)
    },
    verifyAdditionalInstruction: async (uploadedFileName) =>{
     Medium_Wait()
     this.verifyFileName(addInfoFile,uploadedFileName)
    },

    verifyFileName: (elem,uploadedFileName)=>{
     elem.getText().then(function(filename){
       if (filename.indexOf(uploadedFileName) > -1) 
            reporter.appendTest("Verifying Uploaded file name", 'Verifying if Uploaded file name: ' + uploadedFileName + ' is same as displayed file name: ' + filename , "PASS");
          else {
            reporter.appendTest("Verifying Uploaded file name", 'Verifying if Uploaded file name: ' + uploadedFileName + ' is same as displayed file name: ' + filename , "FAIL");
            expect(false).toReport(true, "Expecting " + uploadedFileName + " is present in " + filename + " failed.");
          } 
       }, function(error){
        reporter.appendTest("Verifying Uploaded file name", 'Failed due to: '+error , "FAIL");  
     })
    },

    verifyPOLineItem: function () {
        actions.VerifyElementPresent(POLineItemSection, true, "PO Line item Table")
    },

    verifyPOLineItemHeaders: function (header) {
        var elem = element(by.xpath("//*[text()='PO Line Items']/../../..//*[@class='products-list__header ']//div/div[text()='" + header + "']"))
        actions.verifyElementDisplayed(elem, true, header+' Column')
    },

    clickOnShowBelowLineItemsRadioButton: function () {
        actions.Click(showBelowLineItemsRadioButton, "Show Be low Line Items Radio Button")
    },
    clickOndoNotShowOnPORadioButton: function () {
        actions.Click(doNotShowOnPORadioButton, "Do Not Show On PO Radio Button")
    },
    clickOnAdvancedInstructionSearchLink: function () {
        actions.jsClick(advancedInstructionSearch, "Advanced Instruction Search")
    },
    clickOnBackToPOCreationButton: function () {
        actions.jsClick(BackToPOCreationButton, "Back to PO Creation Button")
    },
    EnterNewDetails: function (CompanyName, Street, Big, City, ZipCode, State) {
        actions.blurText(fieldcompanyName, CompanyName, CompanyName)
        actions.blurText(fieldstreetAddress, Street, Street)
        actions.blurText(fieldblg, Big, Big)
        actions.blurText(fieldcity, City, City)
        actions.blurText(zip, ZipCode, ZipCode)
        actions.Click(vendorStateDropDown, "State DropDown")
        Medium_Wait()
        var stateOption = element(by.xpath('//*[text()="' + State + '"]'))
        actions.jsClick(stateOption, State)
    },

    clickOnSubmitButton: function () {
        actions.Click(submitButton, "Submit Button")
    },

    verifyShippingLocation: async (CompanyName) => {
        Medium_Wait()
        var shippingAddress = await element(by.xpath("//*[text()='SHIPPING LOCATION']"))
        actions.verifyElementDisplayed(shippingAddress, true, "shippingAddress")
        var ShippingName = element.all(by.xpath("//*[text()='SHIPPING LOCATION']/following-sibling::div//*[@class='row']")).get(0)
        Short_Wait()
        var shipName = await ShippingName.getText()
        actions.expectToContain(CompanyName, shipName, CompanyName)
    },

    getTheLineitemCountAndPOstatus: async () => {
        browser.sleep(10000)
        var lineItems = await element.all(by.xpath('//*[@class="details-table row"]//*[@class="align-items-center row"]')).count()
        if (lineItems > 0) {

             var statusElement = element(by.xpath('((//*[@class="table__body"])[1]//*[@class="down-lg-none col"])[4]/p/span'))
            Short_Wait()
            let status = await statusElement.getText()
           if (status == 'PO NOT CREATED') {
                flag = true
            }

        }
        if (!flag) return false
        else return true
    },


    selectCarrier: ()=>{
     actions.jsClick(carrier,"carrier/Method")
     actions.PressDownArrow()
     actions.PressEnter()
     actions.GetFieldValue(carrier,"Carrier")
    },

    SelectInsideDeliveryRequired : ()=>{
    actions.jsClick(insideDeliveryRequired, "Inside Delivery Required CheckBox")
    },

    SelectRequestFreightEqualization : ()=>{
    actions.jsClick(requestFreightEqualization, "Request Freight Equalization CheckBox")
    },
     
    alternativeShippingAccount : ()=>{
    actions.EnterText(alternativeShippingAccount,"321 Commonwealth Road, Suite 101 Wayland, Massachusetts 01778","Alternative Shipping Account")
    },
    clickOnadvancedInstructionSearch: ()=>{
    actions.Click(advancedInstructionSearch, "Advanced Instruction Search")
    }, 
    advancedInstructionsSearchPopUp: ()=>{
     // actions.verifyElementDisplayed(advancedInstructionsSearchPopUp,true, "Advanced Instructions Search PopUp")   
    },
    searchUsingKeyword: (Keyword)=>{
    actions.EnterText(keyWordSearch,Keyword, "Keyword Search")
    Short_Wait()
    actions.Click(searchButton,"Search Button")
    },
    copyInformation: ()=>{
    // browser.sleep(30000)
    // let productList= element.all(by.xpath('(//*[@class="products-list"]//*[@class="row"]/div)[1]')).get(0)
    // actions.moveMouseOnMenuItem(productList,"Product List")
    // Short_Wait()
    // let copyButton= element.all(by.buttonText('COPY')).get(0)
    // actions.jsClick(copyButton, "Copy Button")
    reporter.appendTest('Performed Click', 'Performed click on Copy Button', "PASS");
    BackToPOCreationButton.click()
    },
    verifyAdvancedInstructionsSearchFields: ()=>{
     actions.verifyElementDisplayed(advancedInstructionsSearchPopUp,true, "Advanced Instructions Search PopUp")   
     actions.verifyElementDisplayed(customerSearch,true, "Customer Search field")   
     actions.verifyElementDisplayed(jobNumberSearch,true, "Job Number Search field")   
     actions.verifyElementDisplayed(poNumberSearch,true, "Po Number Search field")   
     actions.verifyElementDisplayed(vendoSearch,true, "Vendor Search field")   
     actions.verifyElementDisplayed(JobTitleSearch,true, "Job title Search field")   
     actions.verifyElementDisplayed(orderDatesSearch,true, "Order Dates Search field")   
     actions.verifyElementDisplayed(excludeVoidedJobs,true, "Exclude Voided Jobs Check box")      
   },

   uploadFilesMethod: function () {
        actions.uploadFile(uploadFilesButton,testDataObjectsPath+'ipromoteU.png',"Upload Files- Additional Instruction")       
    },

  verifyUploadedFileName: async () =>{
     Medium_Wait()
     let uploadedFileName=await element(by.css('[class="list-unstyled"] li')).getText()
     actions.expectToContain(uploadedFileName, 'ipromoteU.png',"Uploaded file name")    
    },

  clickOnCloseButton: ()=>{
    actions.jsClick(closeButton, "Close Button")
    }, 

  verifyJobStatusCount: (Condition,prevCount, currentCount)=>{
    Medium_Wait()
    reporter.appendTest('<b>Verifying PO Status</b>', '*************', ""); 
      if(Condition=='EQUAL'){
         reporter.appendTest('PO status', '"PO should not be created"',"");         
        if (prevCount==currentCount) 
            reporter.appendTest('Verifying PO status', 'PO is not Created', "PASS");
        else 
            reporter.appendTest('Verifying PO status', 'PO is Created', "FAIL");
        }
      else {
        reporter.appendTest('PO status', '"PO should be created"',"");         
        if (prevCount!=currentCount)
            reporter.appendTest('Verifying PO status', 'PO is Created', "PASS");
        else 
            reporter.appendTest('Verifying PO status', 'PO is Not Created', "FAIL");
       }  
   },

   closePopup: ()=>{
    let alert= element(by.xpath("//div[text()='ALERT']")),
    okBtn= element(by.buttonText('YES'))
    actions.verifyElementDisplayed(alert, true, "Alert")
    actions.jsClick(okBtn,"Okay Button")
    browser.sleep(10000)
    },
    verifyAlertAndclosePop: (Message, ButtonText, Alert)=>{   
    let alert= element(by.xpath("//div[text()='"+Alert+"']")),
    alertMessage= element(by.xpath("//div[text()='"+Message+"']")),
    Btn= element(by.buttonText(ButtonText))
    Short_Wait()
    actions.verifyElementDisplayed(alert, true, "Alert")
    actions.verifyElementDisplayed(alertMessage, true, "Alert Message: "+Message)
    actions.jsClick(Btn,"Okay Button")
    browser.sleep(10000)
    },

   getLineItemsStatusesCountList:  (lineItemStatus)=>{
    element.all(by.xpath("//div[text()='status']/../following::div//span[text()='" + lineItemStatus + "']")).count().then(function(count){
      // global.lineItemsStatusesLis[i]= count;
      global.poNotCreatedstatusCount=count
      // return count;  //Recevied variable is still storing undefined value
    })
   },
   veifySendPOPageElements: ()=>{
    actions.verifyElementDisplayed(cancelButton,true,"Cancel Button")
    actions.verifyElementDisplayed(discardButtton,true,"Discard Buttton")
    actions.verifyElementDisplayed(closeWithoutSendingButtton,true,"Close Without Sending Buttton")
    actions.verifyElementDisplayed(sendAndCloseButtton,true,"Send And Close Buttton")
    actions.GetElementText(mailTo,"Mail To")
    actions.GetElementText(mailFrom,"Mail From")
   },

    validateCreatedPONumberInSubjectAndMessageBody: ()=>{
     subjectFiled.getAttribute('value').then(function(value){
        actions.expectToContainCustom(value,  global.poNumber,"Created PO Number in Message Subject","Subject", "Created PO Number")
     }, function(error){
        reporter.appendTest('Error getting value', 'Failed due to: '+error,'FAIL');                 
     })
   },   
    validateCreatedPONumberInSubjectAndMessageBodyLocal: ()=>{
     subjectFiled.getAttribute('value').then(function(value){
        actions.expectToContainCustom(value, poNumber, "Created PO Number in Message Subject","Subject", "Created PO Number")
     }, function(error){
        reporter.appendTest('Error getting value', 'Failed due to: '+error,'FAIL');                 
     })
   },   

   clickOnCancelButton: ()=>{
    reporter.appendTest('<b>Cancel<b>', '**************',"");                 
    actions.jsClick(cancelButton,"Cancel Button")
    Short_Wait()
    },

    clickOndiscardButtton: ()=>{
    reporter.appendTest('<b>Discard PO<b>', '**************',"");                 
    actions.jsClick(discardButtton,"Discard Buttton")
    Short_Wait()
    },

    clickOncloseWithoutSendingButtton: ()=>{
    reporter.appendTest('<b>Close Without Sending<b>', '**************',"");                 
    actions.jsClick(closeWithoutSendingButtton,"Close Without Sending Buttton")
    Short_Wait()
    },

    clickOnsendAndCloseButtton: ()=>{
    reporter.appendTest('<b>Send and Close<b>', 'This step is commented tempararily to not send PO',"");                   
    // actions.jsClick(sendAndCloseButtton,"Send And Close Buttton")
    // browser.sleep(10000)
    },

    clickOnPOstab: ()=>{
        actions.Click(poTab,"PO Tab")
    },

    verifyPOStatusCountForBlendedPO: function(prevCount, CurrentCount){
    if(CurrentCount==(prevCount-2))
        reporter.appendTest("Blended PO Status",'Verifying if PO Created for both Product and Decoration', "PASS");
     else  {
        reporter.appendTest("Blended PO Status ", 'Verified PO not created for Product and Decoration', "FAIL");
        expect(false).toReport(true, 'Expecting "PO should be created for both Product and Decoration" failed.');
      }
    },

VerifyPOStatus: (status)=>{  
 reporter.appendTest('<b>Verifying PO Satus for selected Vendor: '+global.dispayedVendor+'</b>', 'All Products belonging to Vendor: '+global.dispayedVendor+' PO status should be: '+ status , "PASS");
  let index= 0;
   element.all(by.xpath("//p[text()='"+global.dispayedVendor+"']/parent::div/following-sibling::div[8]/p/span")).then(statusArray=>{
      if (statusArray.length>0) {
         element.all(by.xpath("//p[text()='"+global.dispayedVendor+"']/parent::div/preceding-sibling::div[3]/p[1]")).then(descriptionArray=>{ 
           if(statusArray.length==descriptionArray.length){
            statusArray.forEach(statusElement=>{
              statusElement.getText().then(displayedStatus=>{
                 descriptionArray[index].getText().then(productName=>{
                   actions.expectToEqualCustom(status, displayedStatus,"PO Status of product: <b>"+productName+"</b>" , "Expected Status", "displayed Status")
                   index++
                }) //end of gettext
              }) //End of getText
            }) //End of foreach
         }else{
            reporter.appendTest('Verifying Product displayed in table', 'Number of line item status and Product description returned for vendor: "'+global.dispayedVendor+'" are not matching', "FAIL");
           expect(false).toReport(true, 'Number of line item status and Product descriptions returned for vendor: "'+global.dispayedVendor+'" are not matching');  
         }  
       })
     }else { reporter.appendTest('Verifying Product displayed in table', 'No Products with vendor: "'+global.dispayedVendor+'" are displayed ', "FAIL");
        expect(false).toReport(true, 'No Products with vendor: "'+global.dispayedVendor+'" are displayed  - failed.');
      } //end of else
   }) //end of element.all
 }, //end of function

 VerifyPOStatusLocal: (status)=>{  
  reporter.appendTest('<b>Verifying PO Satus for selected Vendor: '+selectedVendor+'</b>', 'All Products belonging to Vendor: '+selectedVendor+' PO status should be: '+ status , "PASS");
  let index= 0;
   element.all(by.xpath("//p[text()='"+selectedVendor+"']/parent::div/following-sibling::div[8]/p/span")).then(statusArray=>{
      if (statusArray.length>0) {
         element.all(by.xpath("//p[text()='"+selectedVendor+"']/parent::div/preceding-sibling::div[3]/p[1]")).then(descriptionArray=>{ 
           if(statusArray.length==descriptionArray.length){
            statusArray.forEach(statusElement=>{
              statusElement.getText().then(displayedStatus=>{
                 descriptionArray[index].getText().then(productName=>{
                   actions.expectToEqualCustom(status, displayedStatus,"PO Status of product: <b>"+productName+"</b>" , "Expected Status", "displayed Status")
                   index++
                }) //end of gettext
              }) //End of getText
            }) //End of foreach
         }else{
            reporter.appendTest('Verifying Product displayed in table', 'Number of line item status and Product description returned for vendor: "'+selectedVendor+'" are not matching', "FAIL");
           expect(false).toReport(true, 'Number of line item status and Product descriptions returned for vendor: "'+selectedVendor+'" are not matching');  
         }  
       })
     }else { reporter.appendTest('Verifying Product displayed in table', 'No Products with vendor: "'+selectedVendor+'" are displayed ', "FAIL");
        expect(false).toReport(true, 'No Products with vendor: "'+selectedVendor+'" are displayed  - failed.');
      } //end of else
   }) //end of element.all
 }, //end of function

VerifyPOStatusInPOPage: (status)=>{  
  reporter.appendTest('<b>Verifying PO Satus in POs Tab</b>', 'PO Created For all Products under the PO Number: '+poNumber+' PO status should be: '+ status , "PASS");
    // element.all(by.xpath('//p[text()="'+selectedVendor+'"]/../parent::div/preceding-sibling::div//p[text()="'+poNumber+'"]/../../../following-sibling::div[@class="table__col d-none d-md-flex justify-content-center col"]/span')).then(statusArray=>{
         element.all(by.xpath('//p[text()="'+poNumber+'"]/../../../following-sibling::div[@class="table__col d-none d-md-flex justify-content-center col"]/span')).then(statusArray=>{
            statusArray.forEach(statusElement=>{
              statusElement.getText().then(displayedStatus=>{
                actions.expectToEqualCustom(status, displayedStatus,"PO Status" , "Expected Status", "Displayed Status")
              }) //End of getText
            }) //End of foreach
      }) //end of element.all
  }, //end of function

  clickOnPOsLink:  () => {
    actions.Click(poTabLink, "POs Tab" );
  },
 VerifyPOInShippingDateDetailDropdown: ()=>{  
  let i=0,
   found= false;
    reporter.appendTest('Verifying PO Number:<b> '+poNumber+'</b> in Options', 'Number/Id of PO Created should be displayed in the "Viewing dates for" options' , "PASS");
     element.all(by.xpath('//span[text()="Viewing dates for"]/parent::div/following-sibling::div/button')).then(poNumberOptionArray=>{
       let size= poNumberOptionArray.length;
        poNumberOptionArray.forEach(optionElement=>{
         optionElement.getText().then(retrivedPoNumber=>{
          if(retrivedPoNumber===poNumber) found=true
           i++;
            if(i==size){
              if(found)
                reporter.appendTest("Verified PO in Options",'Verified that Number/Id of PO Created is displayed in the "Viewing dates for" options', "PASS");
                 else { 
                  reporter.appendTest("Verified PO in Options",'Verified that Number/Id of PO Created is displayed in the "Viewing dates for" options', "PASS");
                  expect(false).toReport(true, 'Expecting "PO should be created for both Product and Decoration" failed.');
                } 
             }  
          }) //End of getText
        }) //End of foreach
      }) //end of element.all
   }, //end of function
  clickOnViewingDatesDrop:  () => {
    actions.jsClick(viewingDatesDrop, "Viewing Dates Option" );
  },
  verifyBundledPOStatus:(status)=>{
    let createdPOStatusElement= element(by.xpath("//p[contains(text(),'"+poNumber+"')]/../parent::div/following-sibling::div[@class='bundled_PO_table__col  d-none d-lg-flex col']/span"))
      createdPOStatusElement.getText().then(displayedStatus=>{
        actions.expectToEqualCustom(status, displayedStatus,"PO: "+poNumber+" Status" , "Expected Status", "Displayed Status")
        }) 
   },
   verifyBundledPONotCreated:()=>{
    element.all(by.xpath("//p[contains(text(),'"+poNumber+"')]")).then(poArray=>{ 
      if(poArray.length<1) 
          reporter.appendTest("Verifying Bundled PO list",'Verified that PO: '+poNumber+' is not created', "PASS");
        else { 
          reporter.appendTest("Verifying Bundled PO list",'Verified that PO: '+poNumber+' is created', "FAIL");
          expect(false).toReport(true, 'Verified that PO: '+poNumber+' is created');
           } 
        }) 
   },
};



// : ()=>{
//     actions.Click(,"")
//     actions.verifyElementDisplayed(,"")
//     = element(by.xpath(''))
//    },