                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
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
  random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
   //contacts_ List
   Contacts_ContactTypeShippingRadio =element(by.xpath("//*[@class='px-4 mt-3 row']//*[text()='Shipping']")),
   Contacts_ContactTypeBillingRadio =element(by.xpath("//*[@class='tab-pane active']//label[text()='Billing']")),
   NameSearch =element(by.id("contact_search")),   
   AddToListButton =element(by.buttonText('ADD TO LIST')),
   contactsListMenuButton =element(by.xpath("(//*[text()='Toggle Dropdown']/..)[1]")),
   contactListMenuItems =element.all(by.xpath("(//*[text()='Toggle Dropdown'])[1]/../following-sibling::div/button")),
   contactsMenuItem_ViewEditContact =element(by.buttonText('View/Edit Contact')),
   contactsMenuItem_AddToList =element(by.buttonText('Add To List')),
   contactsMenuItem_DeleteContact=element(by.buttonText('Delete Contact')),
    Contacts_ContactTypeShippingRadio=element(by.id("contactshipping")),
   Contacts_ContactTypeBillingRadio=element(by.id("contactbilling")),
      NameSearch=element(by.id("contact_search")),   
   Contacts_DownloadButton=element(by.xpath("//*[@class='tab-pane active']//*[@class='px-2 btn btn-secondary']")),
   Contacts_DownloadPDF=element(by.xpath("//*[@class='tab-pane active']//button[text()='PDF File']")),
   Contacts_DownloadCSV=element(by.xpath("//*[@class='tab-pane active']//button[text()='CSV File']")),
   

  
   
   details_name=element(by.xpath('(//*[@class="modal-title"]/div)[1]')),
   details_phone=element(by.xpath('(//*[@class="info-getPersonalDetail"])[1]')),
   details_email=element(by.xpath('(//*[@class="info-getPersonalDetail"])[2]')),

  //contact details
   SalutationDrop=element(by.xpath('//*[text()="salutation"]/following-sibling::div/div/div')), 
   nameField=element(by.id('name')),
   phoneField=element(by.id('phone')),
   FaxField=element(by.id('fax')),
   WebField=element(by.id("web")),
   Notesfield=element(by.id("notes")),
   emailfield=element(by.id("email")),

   linkedCustomerHeader=element(by.xpath("//p[text()='Linked Customer']")),
   linkedShippingCustTag=element(by.xpath("//span[text()='SHIPPING CUSTOMER']")),
   linkedBillingCustTag=element(by.xpath("//span[text()='BILLING CUSTOMER']")),

   LinkedBillingCustName=element(by.xpath("((//*[text()='BILLING CUSTOMER']/../../../../../div)[1]/div)[1]")),
   LinkedBillingCustAddress=element(by.xpath("((//*[text()='BILLING CUSTOMER']/../../../../../div)[1]/div)[2]")),
   LinkedBillingCityandZipCode=element(by.xpath("((//*[text()='BILLING CUSTOMER']/../../../../../div)[1]/div)[3]")),
   LinkedBillingState=element(by.xpath("((//*[text()='BILLING CUSTOMER']/../../../../../div)[1]/div)[4]")),
   LinkedBillingCustCode=element(by.xpath("//*[text()='BILLING CUSTOMER']/../../../following-sibling::div/span/a/span")),
  
   LinkedShippingCustName=element(by.xpath("((//*[text()='SHIPPING CUSTOMER']/../../../../../div)[1]/div)[1]")),
   LinkedShippingCustAddress=element(by.xpath("((//*[text()='SHIPPING CUSTOMER']/../../../../../div)[1]/div)[2]")),
   LinkedShippingCityandZipCode=element(by.xpath("((//*[text()='SHIPPING CUSTOMER']/../../../../../div)[1]/div)[3]")),
   LinkedShippingState=element(by.xpath("((//*[text()='SHIPPING CUSTOMER']/../../../../../div)[1]/div)[4]")),
   LinkedShippingCustCode=element(by.xpath("//*[text()='SHIPPING CUSTOMER']/../../../following-sibling::div/span/a/span")),
  
   addPhonebutton=element(by.xpath("//button[text()=' + Add Phone  ']")),   
   addFaxbutton=element(by.xpath("//button[text()=' + Add Fax  ']")), 
   addEmailbutton=element(by.xpath("//button[text()=' + Add Email  ']")), 
   addWebbutton=element(by.xpath("//button[text()=' + Add Web  ']")),

   addToList_final=element(by.xpath('//button[@class="getBtnWidth btn-cta btn btn-primary"]')),
   OkButton_AfterAddToList=element(by.buttonText('OK')),
 

   currentList=element(by.xpath('//*[@class="select-field__input"]/input')), 

   Contact_UpdateButton=element(by.buttonText("UPDATE")),
   Contact_deleteButton=element(by.buttonText("DELETE CONTACT")),
   deletePopUp=element(by.xpath("//*[text()='Are you sure you want to delete this contact?']")),
   PopUp_Yes=element(by.buttonText('YES')),
   PopUp_NO=element(by.buttonText('NO')),
   PopUp_OK=element(by.buttonText('OK')),
   closeButton=element(by.className('close')),

   ContactDetails={name:'',phone:'',email:'',customercode:''},
   contactDetailsBefore={email:'',phone:''},

   phone2Field='',
   phone2makedefault='',
   Fax2Field='',
   Fax2makedefault='',
   Email2Field='',
   email2makedefault='',
   Web2Field='',
   web2makedefault='',
   customercode=''
   
// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
 module.exports = { 
  /*Used to save application verification data form dynamic verification*/
  specData: {},
  clickOnMenuItem_ViewEditContact : function () {
    actions.jsClick(contactsMenuItem_ViewEditContact,"ViewEditContact")
  },
  selectContact:function(){
    var contact=element(by.xpath("//*[text()='Margaret Garcia']"))
    actions.Click(contact,"Margaret Garcia")
  },
  getContactDetails:function(rownum){
  Medium_Wait()
  var name=element(by.xpath('//*[@class="pointer-link"]["'+rownum+'"]')),
  phone=element(by.xpath('((//*[@class="table__col col"])["'+rownum+'"]/div/div)[5]/*')),
  email=element(by.xpath('((//*[@class="table__col col"])["'+rownum+'"]/div/div)[4]/*'))
 // customercode=element(by.xpath('((//*[@class="table__col col"])["'+rownum+'"]/div/div)[6]/p'))   
     
      name.getText().then(function(text){
           ContactDetails.name=text;
       });
      phone.getText().then(function(text){
         if(text=='-') ContactDetails.phone=='';
         else ContactDetails.phone=text;    
       });
      email.getText().then(function(text){
         if(text=='-') ContactDetails.email='';
         else ContactDetails.email=text;
       });
  /*    customercode.getText().then(function(text){
           ContactDetails.customercode=text;
       });    */
  },
  getContactName: function(rownum){
      var name=element(by.xpath('//*[@class="pointer-link"]["'+rownum+'"]'))
      actions.waitUntilElementPresent_OffShore_added(name,"name")
      name.getText().then(function(text){
           ContactDetails.name=text;
       });
      element.all(by.xpath('(//div[contains(@class,"contacts-table")]//div[@class="align-items-center row"])["'+rownum+'"]/div[6]/p')).then(cCodes=>{
        cCodes[0].getText().then(cCode=>{
          customercode= cCode;
        })
      })
  },
  verifyContactName:function(){
    details_name.getText().then(text=>{
      actions.expectToEqual(ContactDetails.name,text,"Contact Name")
    }) 
  },
  verifyContactPhone:function(){
    details_phone.getText().then(text=>{
      actions.expectToEqual(ContactDetails.phone,text,"Contact Number")
    })
  },
  verifyContactEmail:function(){
    details_email.getText().then(text=>{
      actions.expectToEqual(ContactDetails.email,text,"Contact Email")
    })
  },
  clickSalutationDropdown:function(){
    Medium_Wait()
    actions.Click(SalutationDrop,"SalutationDrop")
   },
   verifyDropDown:function() {
    var mr=element(by.xpath("//*[text()='Mr.']")),
    miss=element(by.xpath("//*[text()='Miss.']"))
    actions.verifyElementDisplayed(mr,true,"mr")
    actions.verifyElementDisplayed(miss,true,"miss")
  },
  validateNameField: function(){
    actions.blurText(nameField,"testing name",phoneField)
  },
  validatephoneField: function(){
    actions.blurText(phoneField,"987-654-3210",phoneField)
  },
  validateFaxField: function(){
    actions.blurText(FaxField,"987-654-3210",FaxField)
  },
  validateWebField: function(){
    actions.blurText(WebField,"www.cigniti.com",WebField)
  },
  validateNotesfield: function(){
    actions.blurText(Notesfield,"testing notes",Notesfield)
  },
  validateemailfield: function(){
    actions.blurText(emailfield,"abc@xyz.com",emailfield)
  },
  ValidateAddPhone:function(){
  /*  Medium_Wait()
    var ele=element(by.xpath("//label[text()='phone2']"))
    actions.waitUntilElementPresent_OffShore_added(ele,"phone2")
  */Medium_Wait()
    actions.jsClick(addPhonebutton,"addPhonebutton")
    phone2Field=element(by.xpath("//label[text()='phone2']/../../following-sibling::div/input"))
    phone2makedefault=element(by.id('phone2'))
     actions.waitUntilElementPresent_OffShore_added(phone2Field,"phone2")
     actions.waitUntilElementPresent_OffShore_added(phone2makedefault,"phone2 make default")  
  },
  enterPhone2:function(){
     actions.blurText(phone2Field,"000-000-0000")
  },
  makePhone2AsDefault:function(){
     actions.jsClick(phone2makedefault,"phone2makedefault")
  },
  verifyAddPhonebutton: function(){
      actions.jsVerifyElementDisplayed(addPhonebutton,true,"addPhonebutton")
  },
  ValidateAddFax:function(){
    actions.jsClick(addFaxbutton,"addFaxbutton")
    Medium_Wait()
    Fax2Field=element(by.xpath("//label[text()='fax2']/../../following-sibling::div/input"))
    Fax2makedefault=element(by.id('fax2'))
     actions.waitUntilElementPresent_OffShore_added(Fax2Field,"addFaxField")
     actions.waitUntilElementPresent_OffShore_added(Fax2makedefault,"Fax2 make default")  
  },
  enterFax2:function(){
     actions.blurText(Fax2Field,"000-000-0000")
  },
  makeFax2AsDefault:function(){
     actions.jsClick(Fax2makedefault,"Fax2makedefault")
  },
  verifyAddFaxbutton: function(){
      actions.jsVerifyElementDisplayed(addFaxbutton,true,"addFaxbutton")
  },
  ValidateAddEmail:function(){
    actions.jsClick(addEmailbutton,"addEmailbutton")
    Medium_Wait()
    Email2Field=element(by.xpath("//label[text()='email2']/../../following-sibling::div/input"))
    email2makedefault=element(by.id('email2'))
     actions.waitUntilElementPresent_OffShore_added(Email2Field,"addEmailField")
     actions.waitUntilElementPresent_OffShore_added(email2makedefault,"email2 make default")  
  },
  enterEmail2:function(){
     actions.blurText(Email2Field,"abc@xyz.com")
  },
  makeEmail2AsDefault:function(){
     actions.jsClick(email2makedefault,"email2 make default")
  },
  verifyAddEmailbutton: function(){
      actions.jsVerifyElementDisplayed(addEmailbutton,true,"addEmailbutton")
  },
  ValidateAddWeb:function(){
    actions.jsClick(addWebbutton,"addWebbutton")
    Medium_Wait()
    Web2Field=element(by.xpath("//label[text()='web/url2']/../../following-sibling::div/input"))
    web2makedefault=element(by.id('email2'))
     actions.waitUntilElementPresent_OffShore_added(Web2Field,"addWebField")
     actions.waitUntilElementPresent_OffShore_added(web2makedefault,"web2 make default")  
  },
  enterWeb2:function(){
     actions.blurText(Web2Field,"www.cigniti.com")
  },
  makeWebAsDefault:function(){
     actions.jsClick(web2makedefault,"web2 make default")
  },
  verifyAddWebbutton: function(){
      actions.jsVerifyElementDisplayed(addWebbutton,true,"addWebbutton")
  },
  clickOnUpdate:function(){
    actions.jsClick(Contact_UpdateButton,"Contact_UpdateButton")
    Medium_Wait()
    actions.jsClick(PopUp_OK,"PopUp_OK")
    contactDetailsBefore.email=ContactDetails.email;
    contactDetailsBefore.phone=ContactDetails.phone;
    Medium_Wait()  
    Medium_Wait()
  },
  verifyAfterUpdate:function(){
   Medium_Wait()
   actions.expectNotToEqual(contactDetailsBefore.email,"Updated Email")
   actions.expectNotToEqual(contactDetailsBefore.phone,"Updated Phone")
 
  },
    ClickOnPopUpYes:function(){
    actions.Click(PopUp_Yes,"PopUp_Yes")
  },
  verifyLinkedCustomerSection: function(){
    actions.verifyElementDisplayed(linkedCustomerHeader,true,"linkedCustomerHeader")
    actions.verifyElementDisplayed(linkedShippingCustTag,true,"linkedShippingCustTag")
  //not all contacts contain billing customer section
 //actions.verifyElementDisplayed(linkedBillingCustTag,true,"linkedBillingCustTag") //not all contacts have billing customer
  },
  verifyBillingTypeCustomer:function(){
    actions.verifyElementDisplayed(LinkedBillingCustName,true,"LinkedBillingCustName")
    actions.verifyElementDisplayed(LinkedBillingCustAddress,true,"LinkedBillingCustAddress")
    actions.verifyElementDisplayed(LinkedBillingCityandZipCode,true,"LinkedBillingCityandZipCode")
    actions.verifyElementDisplayed(LinkedBillingState,true,"LinkedBillingState")
    actions.verifyElementDisplayed(LinkedBillingCustCode,true,"LinkedBillingCustCode")
  },
  verifyShipingCsustomer:function(){
      actions.verifyElementDisplayed(LinkedShippingCustName,true,"LinkedShippingCustName")
      actions.verifyElementDisplayed(LinkedShippingCustAddress,true,"LinkedShippingCustAddress")
      actions.verifyElementDisplayed(LinkedShippingCityandZipCode,true,"LinkedShippingCityandZipCode")
      actions.verifyElementDisplayed(LinkedShippingState,true,"LinkedShippingState")
      actions.verifyElementDisplayed(LinkedShippingCustCode,true,"LinkedShippingCustCode")  
  },
  ClickOnDeleteMenuItem: function(){
     actions.Click(contactsMenuItem_DeleteContact,"Menu->DeleteContact")
  },
  ClickOnDeleteButtonFromDetailsPage: function(){
    actions.Click(Contact_deleteButton,"delete Button")
  },
  SelectDeleteContactYes:function(){
  actions.verifyElementDisplayed(deletePopUp,true,"deletePopUp")  
  actions.Click(PopUp_Yes,"PopUp_Yes")
  },
  SelectDeleteContactNo:function(){
  actions.verifyElementDisplayed(deletePopUp,true,"deletePopUp")  
  actions.Click(PopUp_NO,"PopUp_NO")
  },
  verifyByNotDeleting:function(){
  actions.verifyElementDisplayed(details_name,true,"details_name")
  actions.Click(closeButton,'closeButton')
  Medium_Wait()
  actions.Click(PopUp_Yes,"PopUp_Yes")
  },
  verifyContacInList: async()=>{
    let name=await ContactDetails.name,
   NameInList=await element(by.xpath('//div[contains(@class,"contacts-table")]//div[@class="align-items-center row"]/div[6]/p[text()="'+customercode+'"]'))
  actions.VerifyElementPresent(NameInList,true,ContactDetails.name)  
  },
  
  EnterNameInNameSearch: function(){
  Long_Wait()
  actions.blurText(NameSearch,ContactDetails.name,"Name Search") 
  },

  verifyByDeleting: function(){
   element.all(by.xpath("//*[text()='No Matching Data Found']")).then(noMatchingCount=>{
    element.all(by.xpath('//div[contains(@class,"contacts-table")]//div[@class="align-items-center row"]/div[6]/p[text()="'+customercode+'"]')).then(customerCodeCount=>{
      if(noMatchingCount==0)
          reporter.appendTest('Verifyin Deleted Customer: '+ContactDetails.name, 'Verifed that customer is deleted and "No Matching Data Found" message is displayed', "PASS");
        else if(customerCodeCount<1)
              reporter.appendTest('Verifyin Deleted Customer: '+ContactDetails.name, 'Verifed that customer is deleted', "PASS");
            else{
              reporter.appendTest('Verifyin Deleted Customer: '+ContactDetails.name, 'Verifed that customer is not deleted', "FAIL");
              expect(false).toReport(true, 'Verifying is Customer: '+ContactDetails.name+' deleted- failed');
          }
    })
  }) 
  },

  verifyContactType:function(){    
  actions.VerifyElementPresent(Contacts_ContactTypeShippingRadio,true,"Shipping Radio")
  actions.VerifyElementPresent(Contacts_ContactTypeBillingRadio,true,"Billing Radio")
  },

  verifyNameSeachfield: function(Name){ 
  actions.blurText(NameSearch,Name,"Name Search")
  actions.PressEnter()
  },

  verifyNameSeacrhResults1: function (Name) {
    Medium_Wait()
    element.all(by.xpath('//a[@class="pointer-link"]')).then(namelist=>{
      let i=0;
       namelist.forEach(elem=>{
        i++;
        elem.getWebElement().getText().then(name=>{
          if (!(name.indexOf(Name) > -1)){
            element(by.xpath('(//*[@class="contacts-table mx-0 row"]//*[@class="table__col col"])["'+i+'"]//*[contains(text(),"@")]')).gettext().then(mail=>{
              if (!(mail.indexOf(Name) > -1)){
                  reporter.appendTest('Verifyin if Element Present', 'Verifying if: '+Name+' Present in displayed element: FAIL', "FAIL");
              }
              else  reporter.appendTest('Verifyin if Element Present', 'Verifying if: '+Name+' Present in: '+email, "PASS");
            })
          }
          else {
              reporter.appendTest('Verifyin if Element Present', 'Verifying if: '+Name+' Present in: '+name, "PASS");
          }
        })
       })
  })  
 },
 verifyNameSeacrhResults: function (Name) {
    Medium_Wait()
   let namelist= element.all(by.xpath('//a[@class="pointer-link"]'))
       for(let i=0;i<namelist.count();i++) 
    {
        namelist.each(elem=>{
          elem.getText().then(name=>{
          if (!(name.indexOf(Name) > -1)){
            let j=i+1;
            element(by.xpath('(//*[@class="contacts-table mx-0 row"]//*[@class="table__col col"])["'+j+'"]//*[contains(text(),"@")]')).gettext().then(mail=>{
              if (!(mail.indexOf(Name) > -1)){
                  reporter.appendTest('Verifyin if Element Present', 'Verifying if: '+Name+' Present in displayed element: FAIL', "FAIL");
              }
              else  reporter.appendTest('Verifyin if Element Present', 'Verifying if: '+Name+' Present in: '+email, "PASS");
            })
          }
          else {
              reporter.appendTest('Verifyin if Element Present', 'Verifying if: '+Name+' Present in: '+name, "PASS");
          }
        })
      })
    } 
 },
    clickOnContactsDownloadButton:function(){
      actions.Click(Contacts_DownloadButton,"Download Button")
  },
   clickOnContactsDownloadButtonPDF:function(){
      actions.Click(Contacts_DownloadPDF,"Download PDF")
    //  actions.verifyPDFFileDownload_OffShore()  //method is not working
  },
   clickOnContactsDownloadButtonCSV:function(){
      actions.jsClick(Contacts_DownloadCSV,"Download CSV")
  //    actions.verifyCSVFileDownload_OffShore()  //method is not working
  },
  selectOptionfromCusrrentList:function(test){
   actions.EnterText(currentList,test)
   actions.PressEnter()  // Shipping_Cust_list will be selected
  },
  clickOnAddToListButton_Final:function(){
   actions.jsClick(addToList_final,"add To List")  
  },
  ClickOnOkAfterAddToList:function(){
    Medium_Wait()
   actions.jsClick(OkButton_AfterAddToList,"Ok Button")  
  },
}  

