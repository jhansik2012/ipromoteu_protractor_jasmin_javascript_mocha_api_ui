'use strict';
const { ActionSequence } = require("protractor");



//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
  random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
  documentsTab = element(by.linkText('Documents')),
  vendorInvoice = element(by.xpath("//*[text()='Vendor Invoices']")),
  attachments = element(by.xpath("//*[text()='Attachments']")),
  tableRows = element.all(by.xpath('//*[@class="b-bottom-gray table__col col"]/div')),
  addAttachementButton = element(by.buttonText('ADD ATTACHMENT')),
  addtitleHead = element(by.className('modal-title')),
  uploadFileButton = element(by.buttonText('UPLOAD FILE')),
  attachementName = element(by.id('attachinputbox')),
  closeButton = element(by.className("close")),
  editAttachement = element(by.buttonText('EDIT ATTACHMENT')),
  popUpYes = element(by.buttonText('YES')),
  popUpNO = element(by.buttonText('NO')),
  popUpOK = element(by.buttonText('OK')),
  customerQuote = element(by.css('[for="customerQuote"]')),
  attachedFileTitle = element.all(by.xpath("(//*[@class='attachment-table row']//p)[1]")).first(),
  TitleArray = [],
  RowCount=0

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
//1661903AFP  
module.exports = {
  /*Used to save application verification data form dynamic verification*/
  specData: {},
  clickOnDocumentLink: function () {
    actions.jsClick(documentsTab, "documents link")
  },
  verifyDocumentLinkActive: function () {
    let ele = element(by.className('active nav-link'))
    actions.verifyElementDisplayed(ele, true, "Avtive Document tab")
  },
  verifyDocumentTabs: function (colname) {
    let ele = element(by.xpath('//*[text()="' + colname + '"]'))
    actions.verifyElementDisplayed(ele, true, colname)
  },
  verifyDocumentTableCoulmns: function (colname) {
    let ele = element(by.xpath('//*[@class="Documents-doc-table row"]/div/div/div[text()="' + colname + '"]'))
    actions.verifyElementDisplayed(ele, true, colname)
  },
  verifyEmailDocumentAndViewDocumentOptions: function () {
    var elem = element.all(by.xpath('//*[@class="Documents-doc-table row"]//*[@class="user-nav custom-dropdown table-dropdown dropdown"]')).get(0)
    actions.jsClick(elem, "toggle icon")
    Medium_Wait()
    Medium_Wait()
    let emailDoc = element(by.buttonText('Email Document')),
      viewDoc = element(by.buttonText('View Document'))
    actions.verifyElementDisplayed(emailDoc, true, ':Email Document option')
    actions.verifyElementDisplayed(viewDoc, true, ':View Document option')
  },
  clickOnEmailDocument: async ()=> {
    if(RowCount>0){
    var toggleLink = await element.all(by.xpath('//*[@class="Documents-doc-table row"]//*[@class="user-nav custom-dropdown table-dropdown dropdown"]')).get(0),
      emailDoc = element(by.buttonText('Email Document'))
    actions.jsClick(toggleLink, "menu Item")
    Medium_Wait()
    actions.jsClick(emailDoc, "emailDoc")
   }
   else  reporter.appendTest('Click on Email Document', RowCount+': Documents to perform the opereation ', "PASS");
  },
  clickOnViewDocument: async ()=> {
   browser.sleep(8000)
   if(RowCount>0){
    var toggleLink =await element.all(by.xpath('//*[@class="Documents-doc-table row"]//*[@class="user-nav custom-dropdown table-dropdown dropdown"]')).get(0),
      viewDoc = element(by.buttonText('View Document'))
    actions.jsClick(toggleLink, "menu Item")
    Medium_Wait()
    actions.jsClick(viewDoc, "viewDoc")
   }
   else  reporter.appendTest('Click on View Document', RowCount+': Documents to perform the opereation ', "PASS");
  },
  verifyAttachementTableColumn: function (colname) {
    let ele = element(by.xpath('//*[@class="attachment-table row"]/div/div/div[text()="' + colname + '"]'));
    actions.verifyElementDisplayed(ele, true, colname)
  },
  verifyAttachToOptions: function (option) {
    //  let ele=element(by.id(id));
    let ele = element(by.xpath('//label[text()="' + option + '"]'));
    actions.jsVerifyElementDisplayed(ele, true, "Attach to checkbox")
  },
  selectAttachToOption: function (option) {
    let ele = element(by.id(option));
    actions.jsClick(ele, option)
  },
  clickOnAttachmentLink: function () {
    actions.Click(attachments, "attachments")
  },
  clickOnAttachmentToggleMenu: function () {
    let toggleLink = element.all(by.xpath('//*[@class="attachment-table row"]//*[@class="user-nav custom-dropdown table-dropdown dropdown"]')).get(0)
    actions.jsClick(toggleLink, "toggle link")
  },
  editAttachmentTitle: function () {
    let Edit = element(by.xpath('//*[@class="attachment-table row"]//*[text()="Edit"]'))
    actions.jsClick(Edit, "Edit")
    actions.jsClick(customerQuote, "customerQuote checkbox")
  },
  getTitleFromTable: function (i) {
    Medium_Wait()
    Medium_Wait()
    var attachedFileName = ''
    attachedFileTitle.getText().then(function (title) {
      attachedFileName = title;
      TitleArray[i] = title;
    })
  },
  VerifyAttachmentFileName: function (expectedAttchmentName) {
   Medium_Wait()
    var attachedFileName = ''
     attachedFileTitle.getText().then(function (title) {
      attachedFileName = title;
       actions.expectToEqualCustom(title, expectedAttchmentName, 'Attachment File name',"Attchment dispalyed in Repeated Job ","Attachment selected from Parent Job" )
    })
  },
  compareNotToeqaul: function (i, j) {
    actions.expectNotToEqual(TitleArray[i], TitleArray[j], "Prev and Updated values")
  },
  clickOnEditAttachment: function () {
    actions.jsClick(editAttachement, "Edit Attachement button")
    Medium_Wait()
    actions.jsClick(popUpOK, "popUpOK")
  },
  clickOnAttachmentAndNoDelete: function () {
    Medium_Wait()
    var toggleLink = element.all(by.xpath('//*[@class="attachment-table row"]//*[@class="user-nav custom-dropdown table-dropdown dropdown"]')).get(0),
      Delete = element(by.xpath('//*[@class="attachment-table row"]//*[text()="Delete"]'))
    actions.jsClick(toggleLink, "toggle link")
    actions.jsClick(Delete, "Delete")
    actions.jsClick(popUpNO, "popUpNO")
  },
  clickOnAttachmentAndDelete: function () {
    Medium_Wait()
    var toggleLink = element.all(by.xpath('//*[@class="attachment-table row"]//*[@class="user-nav custom-dropdown table-dropdown dropdown"]')).get(0),
      Delete = element(by.xpath('//*[@class="attachment-table row"]//*[text()="Delete"]'))
    actions.jsClick(toggleLink, "toggle link")
    actions.jsClick(Delete, "Delete")
    actions.jsClick(popUpYes, "popUpYes")
  },
  ClickOnPopUpNo: function () {
    actions.waitUntilElementPresent_OffShore(popUpNO, "popUpNO")
    actions.Click(popUpNO, "popUpNO")
  },
  clickOnPopUpYes: function () {
    actions.waitUntilElementPresent_OffShore(popUpYes, "popUpYes")
    actions.Click(popUpYes, "popUpYes")
  },
  clickOnAddAttachment: function () {
    Medium_Wait()
    actions.jsClick(addAttachementButton, "addAttachementButton")
  },

  confirmAddAttachment: function () {
    Medium_Wait()
    var ele = element(by.css('[class="getBtnWidth btn-cta btn btn-primary"]'))
    actions.jsClick(ele, "addAttachementButton")
    Medium_Wait()
    actions.Click(popUpOK, "popUpOK")
  },
  enterAttachmentName: function (attchmentName="test_Attachment") {
    actions.blurText(attachementName,attchmentName , attachementName)
  },
  uploadFile: function (file) {
     Medium_Wait()
        browser.executeScript("arguments[0].scrollIntoView();", uploadFileButton.getWebElement()).then(function () {
            uploadFileButton.sendKeys(file).then(function () {
                reporter.appendTest('Adding Attchment', 'Added Attchment "upload attchment" ', "PASS");
            }, function (err) {
                reporter.appendTest('Adding Attchment', 'Adding Attchment in "upload attchment" ', "FAIL");
                expect(false).toReport(true, "Unable to perform SetText operation on 'upload attchment' because of " + err.message);
            });
        });
  },
  validatePOAndRowCount: function () {
    Medium_Wait()
    let POdrop = element(by.xpath('//*[@class="content-section dates-section bg-gray-100"]//button[@class="d-inline-block pr-2 pr-md-4 btn btn-secondary"]'))
    actions.Click(POdrop, "PO List dropdown")
    element.all(by.xpath('//*[@class="d-none d-sm-inline-block"]//button[contains(@class,"dropdown-item")]')).count().then(poCount => {
      element.all(by.xpath('//*[@class="Documents-doc-table row"]//*[@class="align-items-center row"]')).count().then(rowCount => {
        actions.expectToEqual(poCount, rowCount, "Document count and PO count")
      })
    })
  },
  getRowCount: async()=>{
   RowCount=await  element.all(by.xpath('//*[@class="Documents-doc-table row"]/div/div[2]/div')).count()
  }
}