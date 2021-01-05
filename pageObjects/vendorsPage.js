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

  KeywordSearch = element(by.xpath("//label[text()='Keyword Search']/following-sibling::div/div/div/input")),
  keywordSearchMagnifier = element(by.xpath("//label[text()='Keyword Search']/following-sibling::div/div/div/button")),
  TypeDropDown = element(by.xpath("//*[@id='type']//div[contains(@class,'singleValue')]")),
  perferredStatusDropDown = element(by.xpath("//*[@id='preferredStatus']//div[contains(@class,'singleValue')]")),
  vendorsUsedCheckBox = element(by.css('[for="vendorsUsed"]')),
  vendorHead = element(by.xpath("//h1[text()='Vendors']")),

  downloadButton = element(by.xpath("//button[i/text()='cloud_download']")),
  downloadPDF = element(by.xpath("//button[text()='PDF File']")),
  downloadCSV = element(by.xpath("//button[text()='CSV File']")),

  //table
  vendor = '(//*[@class="text-primary font-weight-bold text-break text-capitalize"])',
  status_table_1 = element(by.xpath('(//div[@class="d-none d-md-flex text-capitalize col"])[1]/p')),

  //vendor Details page
  vendorName = element(by.xpath("//div[@class='vendor-modal__header__col col-12']/h2")),
  vendorStatus = element(by.xpath("//div[@class='vendor-modal__header__col col-12']/following-sibling::div//span[contains(@class,'status-badge')]")),
  vendorType = element(by.xpath('//*[@class="d-none d-lg-flex"]/span')),
  vendorPhone = element(by.xpath('(//span[@class="ml-1"]/../span)[1]')),
  vendorWebsite = element(by.id("websiteButton")),
  usertext = element(by.xpath("//p[text()='User:']//following-sibling::p")),
  passtext = element(by.xpath("//p[text()='Pass:']//following-sibling::p")),
  totalJobs = element(by.xpath('//p[text()="Total Jobs"]/following-sibling::span')),
  orderVolume = element(by.xpath("//p[text()='LTM Order Volume']/following-sibling::span")),
  orderDays = element(by.xpath('//*[@class="d-inline-block"]/p')),
  orderDays_Dropdown = element(by.css('[class="d-inline-block pr-2 pr-lg-4 btn btn-secondary"]')),

  mail_head = element(by.xpath("(//span[@class='text-primary']/a)[1]")), // .getAttribute('href')
  mail_ordering = element(by.xpath("//p[text()='Ordering']/following-sibling::p/span/a")),
  mail_artwork = element(by.xpath("//p[text()='Artwork']/following-sibling::p/span/a")),
  mail_customerService = element(by.xpath("//p[text()='Customer Service']/following-sibling::p/span/a")),
  mail_rushService = element(by.xpath("//p[text()='Rush Service']/following-sibling::p/span/a")),


  //vendor details
  companyName = element(by.xpath("//label[text()='Company Name']//following-sibling::p")),
  phone = element(by.xpath("//label[text()='Phone']//following-sibling::p")),
  Ext = element(by.xpath("//label[text()='Ext']//following-sibling::p")),
  Fax = element(by.xpath("//label[text()='Fax']//following-sibling::p")),
  Address = element(by.xpath("//label[text()='Address']//following-sibling::p")),
  City = element(by.xpath("//label[text()='City']//following-sibling::p")),
  State = element(by.xpath("//label[text()='State']//following-sibling::p")),
  Zip = element(by.xpath("//label[text()='Zip']//following-sibling::p")),
  Country = element(by.xpath("//label[text()='Country']//following-sibling::p")),

  //vendor Id's

  vendorCode = element(by.xpath("//label[text()='Vendor Code']/following-sibling::p")),
  ASI = element(by.xpath("//label[text()='ASI']//following-sibling::p")),
  Sage = element(by.xpath("//label[text()='ASI']//following-sibling::p")),

  //Pricing and Notes

  PricingInformation = element(by.xpath("//label[text()='Pricing Information']//following-sibling::p")),
  SamplePolicy = element(by.xpath("//label[text()='Sample Policy']//following-sibling::p")),
  Notes = element(by.xpath("//label[text()='Notes']//following-sibling::p")),

  //contacts

  contacts_section_name = element(by.xpath('(//p[text()="Contacts"])[2]/following-sibling::div/div/div/p')),
  contacts_section_phone = element(by.xpath("((//p[text()='Contacts'])[2]/following-sibling::div/div/div/div/div/div)[1]")),
  contacts_section_fax = element(by.xpath("((//p[text()='Contacts'])[2]/following-sibling::div/div/div/div/div/div)[2]")),
  contacts_section_mail = element(by.xpath("((//p[text()='Contacts'])[2]/following-sibling::div/div/div/div/div/div)[3]/span/a")),  //.getAtrribute('href')
  closeButton = element(by.css('[class="close"]')),

  vendorDetails = { name: '', code: '', email: '', phone: '', status: '', type: '', website: '' }

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
module.exports = {
  /*Used to save application verification data form dynamic verification*/
  specData: {},

  verifyElementPresenceAndPrintTextAsLog: function (element) {
    element.getText().then(function (text) {
      actions.VerifyElementPresent(element, true, text)
    })
  },
  verifyElementDisplayedAndPrintTextAsLog: function (element) {
    element.getText().then(function (text) {
      actions.verifyElementDisplayed(element, true, text)
    })
  },
  waitforElementAndPrintTextAsLog: function (element) {
    element.getText().then(function (text) {
      actions.waitUntilElementPresent_OffShore_added(element, 'wait for' + text + 'is visible', 40000)
    })
  },

  getVendorDetails: function (rownum) {
    var vendorName = element(by.xpath("(//*[@class='text-primary font-weight-bold text-break text-capitalize'])[" + rownum + "]"))
    actions.waitUntilElementPresent_OffShore_added(vendorName, 'wait for vendor name is visible', 40000)
    var vendorCode = element(by.xpath("(//*[@class='text-overflow'])[" + rownum + "]"))
    actions.waitUntilElementPresent_OffShore_added(vendorCode, 'wait for vendorCode is visible', 40000)
    var vendorContact = element(by.xpath("(//*[@class='text-primary font-weight-bold text-capitalize text-overflow'])[" + rownum + "]"))
    actions.waitUntilElementPresent_OffShore_added(vendorContact, 'wait for vendor contact is visible', 40000)
    var vendorEmail = element(by.xpath("(//*[@class='text-primary font-weight-bold d-none d-md-flex text-overflow'])[" + rownum + "]"))
    actions.waitUntilElementPresent_OffShore_added(vendorEmail, 'wait for vendor email is visible', 40000)
    var vendorPhone = element(by.xpath("(//*[@class='font-weight-bold d-none d-md-flex text-overflow'])[" + rownum + "]"))
    actions.waitUntilElementPresent_OffShore_added(vendorPhone, 'wait for vendor phone is visible', 40000)
    var vendorStatus = element(by.xpath("(//*[@class='d-none d-md-flex text-capitalize col'])[" + rownum + "]/p"))
    actions.waitUntilElementPresent_OffShore_added(vendorStatus, 'wait for vendor Status is visible', 40000)
    var website = element(by.xpath("(//*[@class='text-primary font-weight-bold text-overflow'])[" + rownum + "]"))
    actions.waitUntilElementPresent_OffShore_added(website, 'wait for website is visible', 40000)
    //EXT=element(by.xpath("(//*[@class='text-overflow'])["+rownum+"]"))
    rownum += 1 //because index changes for type button ( next index is inceased by +1)
    var vendorType = element(by.xpath("(//*[@class='status-badge d-flex badge text-white justify-content-center text-capitalize'])[" + rownum + "]"))
    actions.waitUntilElementPresent_OffShore_added(vendorType, 'wait for vendor type is visible', 40000)

    Medium_Wait()
    vendorName.getText().then(function (text) {
      vendorDetails.name = text;
    })
    vendorCode.getText().then(function (text) {
      vendorDetails.code = text;
    })
    vendorContact.getText().then(function (text) {
      vendorDetails.contact = text;
    })
    vendorEmail.getText().then(function (text) {
      vendorDetails.email = text
    })
    vendorPhone.getText().then(function (text) {
      vendorDetails.phone = text;
    })
    vendorType.getText().then(function (text) {
      vendorDetails.type = text;
    })
    vendorStatus.getText().then(function (text) {
      vendorDetails.status = text;
    })
    website.getText().then(function (text) {
      vendorDetails.website = text;
    })
  },
  selectVendorByRowNum: function (rownum) {
    Medium_Wait()
    var ele = element(by.xpath("(//*[@class='text-primary font-weight-bold text-break text-capitalize'])[" + rownum + "]"))
    this.waitforElementAndPrintTextAsLog(ele)
    actions.Click(ele, "vendor with rownum :" + rownum + "")
  },
  verifyVendorName: function () {
    /* actions.GetText(vendorName,"vendor name").then(function(name){
     actions.expectToEqual(name,temp_vendorName,"expecting vendor same vendo name")
    });  */
    Long_Wait()
    this.verifyElementPresenceAndPrintTextAsLog(vendorName)
    //  vendorName.getText().then(function(text){
    //     actions.expectToEqual(text,vendorDetails.name,"verifying vendorName")
    // })
  },
  verifyVendorStatus: function () {
    this.verifyElementPresenceAndPrintTextAsLog(vendorStatus)
    // vendorStatus.getText().then(function(text){
    //   actions.expectToEqual(text,vendorDetails.status,"verifying vendor status")
    // })
  },
  verifyVendorType: function () {
    this.verifyElementPresenceAndPrintTextAsLog(vendorType)
    // vendorType.getText().then(function(text){
    //   actions.expectToEqual(text,vendorDetails.type,"verifying vendor type")
    // })
  },
  verifyVendorPhone: function () {
    this.verifyElementPresenceAndPrintTextAsLog(vendorPhone)
    //  vendorPhone.getText().then(function(text){
    //     actions.expectToEqual(text,vendorDetails.phone,"verifying vendor phone")
    //   })
  },
  verifyWebsite: function () {
    this.verifyElementDisplayedAndPrintTextAsLog(vendorWebsite)
  },
  verifyUserValue: function () {
    this.verifyElementPresenceAndPrintTextAsLog(usertext)
  },
  verifyPassValue: function () {
    this.verifyElementPresenceAndPrintTextAsLog(passtext)
  },
  verifyOrderDays: function () {
    this.verifyElementDisplayedAndPrintTextAsLog(orderDays)
    // orderDays.getText().then(function(days){
    // actions.expectToEqual(days,"Last 30 Days","verifying order days")
    // });
  },

  verifyChangeAfterChangeOrderDay: function () {
    var TjobBefore = '',
      OvolBefore = '',
      TjobAfter = '',
      OvolAfter = ''
    //gets present data

    totalJobs.getText().then(function (text) {
      TjobBefore = text;
    });
    Medium_Wait()
    orderVolume.getText().then(function (text) {
      OvolBefore = text;
    });
    Medium_Wait()
    //changes order days
    actions.waitUntilElementPresent_OffShore_added(orderDays_Dropdown, 'Wait for order days dropdown visible', 40000)
    actions.Click(orderDays_Dropdown, "order days dropdown")
    var option = element(by.xpath("//button[text()='Last 12 Months ']"))
    Medium_Wait()
    this.waitforElementAndPrintTextAsLog(option)
    actions.Click(option, "order days dropdown value")
    Medium_Wait()
    Medium_Wait()
    //get changed data
    totalJobs.getText().then(function (text) {
      TjobAfter = text;
      actions.expectNotToEqual(TjobBefore, TjobAfter, "Comparing total job")
    })
    orderVolume.getText().then(function (text) {
      OvolAfter = text;
      actions.expectNotToEqual(OvolBefore, OvolAfter, "Comparing Order volume")
    })

  },
  verifyTotalJobs: function () {
    this.verifyElementPresenceAndPrintTextAsLog(totalJobs)
  },
  verifyOrderVolume: function () {
    this.verifyElementPresenceAndPrintTextAsLog(orderVolume)
    orderVolume.getText().then(function (symbol) {
      actions.expectToContain(symbol, '$', "Expecting $ in ordrer volume")
    });
  },
  verifyemail: function () {
    this.verifyElementDisplayedAndPrintTextAsLog(mail_head)
    // mail_head.getText().then(function (text) {
    //   text = text.split(" ")[1]
    //   console.log(text + "******************")
    //   vendorDetails = (vendorDetails.email).split(";")[1]
    //   console.log(vendorDetails + "******************")
    //   actions.expectToEqual(text.split(" ")[1].trim(), (vendorDetails.email).split(";")[1].trim(), "verifying vendor website")
    // })
  },
  verifyPrimaryEmailDetails: function () {
    Medium_Wait()
    this.verifyElementDisplayedAndPrintTextAsLog(mail_ordering)
    this.verifyElementDisplayedAndPrintTextAsLog(mail_customerService)
    //  this.verifyElementDisplayedAndPrintTextAsLog(mail_artwork)
    // this.verifyElementDisplayedAndPrintTextAsLog(mail_rushService)
  },
  verifyCompanyName: function () {
    this.verifyElementPresenceAndPrintTextAsLog(companyName)
  },
  verifyphone: function () {
    this.verifyElementPresenceAndPrintTextAsLog(phone)
  },
  verifyExt: function () {
    this.verifyElementPresenceAndPrintTextAsLog(Ext)
  },
  verifyFax: function () {
    this.verifyElementPresenceAndPrintTextAsLog(Fax)
  },
  verifyAddress: function () {
    this.verifyElementPresenceAndPrintTextAsLog(Address)
  },
  verifyCity: function () {
    this.verifyElementPresenceAndPrintTextAsLog(City)
  },
  verifyState: function () {
    this.verifyElementPresenceAndPrintTextAsLog(State)
  },
  verifyZip: function () {
    this.verifyElementPresenceAndPrintTextAsLog(Zip)
  },
  verifyCountry: function () {
    this.verifyElementPresenceAndPrintTextAsLog(Country)
  },
  verifyvendorCode: function () {
    Medium_Wait()
    this.verifyElementPresenceAndPrintTextAsLog(vendorCode)
  },
  verifyASI: function () {
    this.verifyElementPresenceAndPrintTextAsLog(ASI)
  },
  verifySage: function () {
    this.verifyElementPresenceAndPrintTextAsLog(Sage)
  },
  verifyPricingInformation: function () {
    actions.VerifyElementPresent(PricingInformation, true, "PricingInformation")
  },
  verifySamplePolicy: function () {
    actions.VerifyElementPresent(SamplePolicy, true, "SamplePolicy")
  },
  verifyNotes: function () {
    actions.VerifyElementPresent(Notes, true, "Notes")
  },
  clickOnClose: function () {
    actions.Click(closeButton, "closeButton")
  },
  clickOnSelectedUser: function () {
    var user = element(by.xpath("//p[text()='A4/Moshay Inc.']"))
    Medium_Wait();
    actions.jsClick(user, "A4/Moshay Inc.")
  },
  verifyVendorHead: function () {
    this.verifyElementDisplayedAndPrintTextAsLog(vendorHead)
  },
  enterIntoKeywordSearchField: function () {
    actions.blurText(KeywordSearch, "iPROMOTEu")
  },
  clickOnKeywordSearchMagnifierAndVerifyResult: function () {
    actions.jsClick(keywordSearchMagnifier, "keyword Search Magnifier")
    Medium_Wait()
    var ele = element(by.xpath("//p[contains(text(),'iPROMOTEu')]"))
    actions.waitUntilElementPresent_OffShore_added(ele, "iPROMOTEu")
    this.verifyElementDisplayedAndPrintTextAsLog(ele)
  },
  clickOnTypeDropDownAndSelectOption: function () {
    Medium_Wait()
    var typeDrpdwn = element(by.xpath("//*[@for='type']/following-sibling::div/div/div/div"))
    actions.Click(typeDrpdwn, "Type Drop Down")
    Medium_Wait()
    actions.PressDownArrow(typeDrpdwn)
    actions.PressDownArrow(typeDrpdwn)
    actions.PressDownArrow(typeDrpdwn)
    actions.PressEnter(typeDrpdwn)
    Medium_Wait()
    TypeDropDown.getText().then(function (expText) {
      element.all(by.xpath('//*[@class="d-none d-md-flex col"]/span')).then(function (elements) {
        elements.forEach(function (element) {
          element.getText().then(text => {
            actions.expectToEqual(text, expText, expText)
          });
        });
      });
    })
  },

  resetType: function () {
    var typeDrpdwn = element(by.xpath("//*[@for='type']/following-sibling::div/div/div/div"))
    actions.Click(typeDrpdwn, "Type Drop Down")
    Medium_Wait()
    actions.PressUpArrow()
    Medium_Wait()
    actions.PressUpArrow()
    Medium_Wait()
    actions.PressUpArrow()
    actions.PressEnter()
    Medium_Wait()
  },

  clickOnpreferredStatusDropDown: function () {
    Medium_Wait()
    var perferredStatusDrpDwn = element(by.xpath("//*[@for='preferredStatus']/following-sibling::div/div/div/div"))
    actions.Click(perferredStatusDrpDwn, "Perferred Status DropDown")
    actions.PressDownArrow(perferredStatusDrpDwn)
    actions.PressDownArrow(perferredStatusDrpDwn)
    actions.PressDownArrow(perferredStatusDrpDwn)
    actions.PressEnter(perferredStatusDrpDwn)
    Medium_Wait()
    perferredStatusDropDown.getText().then(function (expText) {
      element.all(by.xpath('//*[@class="d-none d-md-flex text-capitalize col"]/p')).then(function (elements) {
        elements.forEach(function (element) {
          element.getText().then(text => {
            actions.expectToEqual(text, expText, expText)
          });
        });
      });
    })

  },
  verifyPrefferedStatus: function (status) {
    element.all(by.xpath('//*[@class="d-none d-md-flex text-capitalize col"]/p')).then(function (elements) {
      Medium_Wait()
      elements.forEach(function (element) {
        element.getText().then(function (text) {
          actions.expectToEqual(text, status, status)
        });
      });
    });
  },
  clickOnvendorsUsedCheckBox: function () {
    actions.jsClick(vendorsUsedCheckBox, "vendors I've Used Check Box")
  },
  clickOndownloadButton: function () {
    Medium_Wait()
    actions.jsClick(downloadButton, "download Button")
  },
  clickOndownloadPDF: function () {
    Medium_Wait()
    actions.jsClick(downloadPDF, "download PDF button")
  },

  verifyDownloadedPDF: function () {
    Medium_Wait()
    // actions.verifyPDFFileDownload_OffShore()
  },

  verifyDownloadedCSV: function () {
    Medium_Wait()
    // actions.verifyCSVFileDownload_OffShore() 
  },

  clickOndownloadCSV: function () {
    actions.jsClick(downloadCSV, "download CSV button")
  },
  verifyTableColumns: function (column_name) {
    var ele = element(by.xpath('//*[@class=" table__head align-items-center flex-nowrap bg-sky-blue"]/div/p/span[text()="' + column_name + '"]'))
    Medium_Wait()
    this.verifyElementDisplayedAndPrintTextAsLog(ele)
  }

}; 