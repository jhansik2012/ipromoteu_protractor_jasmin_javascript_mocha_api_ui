
// *************************************************
/*global document, window, alert, console, require, browser,jasmine,
 requirePage, requireData, requireConfig, requireLibrary,
 describe, it, beforeEach, forEach, by, includes, expect, titlePromise, includes , element, $, then, $locatorRepeater, calenderInputData*/
/*
 */
'use strict';

const { element, by } = require("protractor");
const { assert } = require("chai");
const { reporters } = require("mocha");

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
  random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
  createCustomerButton = element(by.xpath("//button[text()='CREATE CUSTOMER']")),

  CustomersPageHeader = element(by.xpath("//h1[text()='Customers']")),
  firstCustomer = element(by.id('name_s_0')),
  firstBillingCustomer = element(by.id('name_b_0')),
  shippingCustomer = element(by.css('[class="customer-contact-card bg-light-primary"]')),
  shippingCustomerTitle = element(by.xpath("//p[text()='Shipping Customer']")),
  shippingCustomersNames = element.all(by.xpath("//p[text()='Shipping Customer']/../../following-sibling::div//p")),
  shippingCustomersAddresses = element.all(by.xpath("//p[text()='Shipping Customer']/../../following-sibling::div//address")),
  shippingCustomersCodes = element.all(by.xpath("//p[text()='Shipping Customer']/../../following-sibling::div//div/span[2]")),
  billingRadioButton = element(by.xpath('//*[@value="billing"]/..')),
  invoiceDetailsHeader = element(by.xpath("//*[text()='Invoice Details']")),
  invoiceTermDropdown = element(by.xpath('//*[@id="terms"]//div[contains(@class,"singleValue")]')),
  paperBilling = element(by.css('[for="paperBilling"]')),
  newCustomerPaperBillingAndCheckBox = element(by.xpath("//label[@for='create-customer-paper-billing']")),
  noCreditCardCheckBox = element(by.css('[for="noCreditCards"]')),
  newCustomerNoCreditCardAndCheckBox = element(by.css('[for="create-customer-no-credit-cards"]')),
  preferencesHeader = element(by.xpath("//*[text()='PREFERENCES']")),
  sameAsOderingContactCheckBox = element(by.css('[for="create-customer-ordering-checkbox"]')),
  sameAsShipping = element(by.css('[for="same as shipping"]')),
  addNewDetails = element(by.css('[for="add new details"]')),
  useExistingBillingCustomer = element(by.css('[for="use existing billing customer"]')),
  newCustomerTerms = element(by.xpath('//*[text()="terms"]/following-sibling::div//*[@class="select-field__input"]/input')),


  CustomersList = element(by.xpath("//a[text()='Customers']")),
  ContactsList = element(by.xpath("//a[text()='Contacts']")),
  ListTab = element(by.xpath("//a[text()='List']")),
  customerDetailsIcon = element(by.xpath("(//*[text()='more_horiz'])[1]")),
  view_EditCustomerOption = element(by.xpath("//*[text()='View / Edit customer']")),
  view_OpenJobsOption = element(by.xpath("//*[text()='View Open Jobs']")),
  addContactOption = element(by.xpath("//*[text()='Add contact']")),
  Customers_MenuAddcontact1 = element(by.xpath("(//button[text()='Add contact'])[1]")),
  CompanyNameField = element(by.id("companyName")),
  newCustomerCompanyName = element(by.xpath('//*[text()="company name / ship to"]/following-sibling::div//input')),
  newCustomerAddr2 = element(by.xpath('//*[text()="address 2"]/following-sibling::div//input')),
  newCustomerAddr3 = element(by.xpath('//*[text()="address 3"]/following-sibling::div//input')),
  newCustomerCity = element(by.xpath('//*[text()="city"]/following-sibling::div//input')),
  newCustomerPostalCode = element(by.xpath('//*[text()="postal code"]/following-sibling::div//input')),
  newCustomerBillingState = element(by.xpath('//*[text()="state"]/following-sibling::div//*[@class="select-field__input"]/input')),
  taxCode = element(by.xpath("//*[text()='TAX CODE']/following-sibling::div//div[contains(@class,'singleValue')]")),
  taxExemptYash = element(by.id('taxExempt')),
  invoiceTaxExemptYash = element(by.id('taxExemptNumber')),
  locBox = element(by.xpath("//label[text()='Lock Box']/following-sibling::div/..")),
  newCustomerLocBox = element(by.id('create-customer-lock-box-step03')),
  emailInvoiceTo = element(by.id('emailInvoiceTo')),
  ccEmail = element(by.id('ccEmail')),

  verticalMarket = element(by.xpath("//*[text()='Vertical Market']/following-sibling::div//div[contains(@class,'singleValue')]")),
  clasification = element(by.xpath("//*[text()='Classification']/following-sibling::div//div[contains(@class,'singleValue')]")),
  phone = element(by.id('phone')),
  phoneExt = element(by.id('phoneExt')),
  fax = element(by.id('fax')),
  email = element(by.id('email')),
  notes = element(by.id('notes')),
  email1 = element(by.id('email1')),
  phone1 = element(by.id('phone1')),
  fax1 = element(by.id('fax1')),
  notes1 = element(by.id('notes1')),
  Web_url = element(by.id("web")),
  phoneExtention = element(by.id('ext')),
  phoneExtention1 = element(by.id('ext1')),

  phoneEditable = element(by.xpath("//input[not(@disabled)] [@id='phone']")),     // identified phone field is editable
  phoneExtEditable = element(by.xpath("//input[not(@disabled)] [@id='phoneExt']")),  // identified phone ext field is editable
  faxEditable = element(by.xpath("//input[not(@disabled)] [@id='fax']")),            // identified fax field is editable
  emailEditable = element(by.xpath("//input[not(@disabled)] [@id='email']")),        // identified email field is editable
  invoiceDetails = element(by.xpath("//*[text()='INVOICING DETAILS']/following-sibling::address")),
  billingCustomer = element(by.xpath("//*[text()='Billing Customer ']/../../following-sibling::div//div[@class='customer-contact-card bg-light-primary']")),


  //customers_ List
  Customers_ContactTypeShippingRadio = element(by.css("[value='shipping']")),
  Customers_ContactTypeBillingRadio = element(by.css("[value='billing']")),
  KeywordSearchField = element(by.id("customer_search")),
  KeywordSearchMagnifier = element(by.xpath("//input[@id='customer_search']/following-sibling::div/i")),
  MastercustomerSearchField = element(by.id("master_search")),
  MastercustomerSearchMagnifier = element(by.xpath("//input[@id='master_search']/following-sibling::div/i")),
  SalesRepDropdown = element(by.xpath("//div[text()='All Sales Reps']")),
  Customers_DownloadButton = element(by.xpath("//div[@class='drop-holder d-lg-block']/div/button")),
  Customers_DownloadPDF = element(by.xpath("(//button[text()='PDF File'])[1]")),
  Customers_DownloadCSV = element(by.xpath("(//button[text()='CSV File'])[1]")),
  Customers_menuItemString = "(//button[@class='btn-small btn btn-link'])",
  Customers_menuItemButtonFirst = element(by.xpath(Customers_menuItemString + "[1]")),
  BillCodeField = element(by.id("billCode")),
  countryField = element(by.xpath("//*[text()='country']/following-sibling::div/div/div/div[contains(@class,'select')]")),
  cargoInsuranceHeader = element(by.xpath("//*[text()='CARGO INSURANCE']")),
  Customers_MenuViewEditCustomer1 = element(by.xpath("(//button[text()='View / Edit customer'])[1]")),
  Customers_MenuViewOpenJobs1 = element(by.xpath("//*[text()='View Open Jobs']")),
  shippingCustomerName = element(by.css('[class="customer-name"]')),
  shippingCustomerPhone = element(by.xpath("//*[text()='call']/preceding-sibling::span")),
  shippingCustomerMail = element(by.xpath("//*[text()='email']/preceding-sibling::span")),
  shippingCustomerOpenOrderHeader = element(by.xpath("//*[text()='Open Orders']")),
  shippingCustomerReceivablesHeader = element(by.xpath("//*[text()='Receivables']")),
  shippingCustomerOrderVolume = element(by.xpath("//*[text()='LTM Order Volume']")),
  countryListBox = element(by.id('country-new-customer')),

  //New customer
  newCustomerNameOrShipTo = element(by.id('company-name-ship-to')),
  newCustomerShippingAddress = element(by.id('create-customer-shipping-address')),
  newCustomerAddress2 = element(by.id('create-customer-address-2')),
  newCustomerAddress3 = element(by.id('create-customer-address-3')),
  newCustomerCreateCity = element(by.id('create-customer-city')),
  newCustomerState = element(by.xpath("//label[text()='state']/following-sibling::div/div")),
  // newCustomerState = element(by.xpath('//*[@id="create-customer-state"]//div[contains(@class,"select-field__input")]/input')),
  newCustomerZip = element(by.id('zip')),
  newCustomerShipCode = element(by.id('shipCode')),
  newCustomerCountry = element(by.id('create-customer-country')),
  newCarrierMethod = element(by.xpath('//*[text()="carrier/method"]/following-sibling::div//input')),
  newCustomerAccount = element(by.id('newcustomeraccount')),
  newCustomerTaxExempt = element(by.css('[id="create-customer-tax-exempt"] [class="select-field__input"] input')),
  newCustomerTaxExemptYash = element(by.id('customertaxexempt')),
  newCustomerVerticalMarket = element(by.css('[id="create-customer-vertical-market"] [class="select-field__input"] input')),
  newCustomerClassification = element(by.css('[id="create-customer-classification"] [class="select-field__input"] input')),
  newCustomerSalesRep = element(by.css('[id="create-customer-sales-rep"] [class="select-field__input"] input')),
  newCustomerNextButton = element(by.xpath("//button[text()='NEXT']")),
  newCustomerAddToMasterCustomer = element(by.xpath("//*[text()='+Add To Master Customer']")),
  newCustomerAddToMasterCustomerInput = element(by.id('highlights-demo')),
  newCustomerSameAsOrderingContactCheckBox = element(by.xpath("//label[text()='Same As Ordering Contact']/preceding-sibling::input")),
  newCustomerSameAsInvoicingContactCheckBox = element(by.xpath("//label[@for='create-customer-invoicing-checkbox']")),
  newCustomerSameAsInvoicingContactDisabledCheckBox = element(by.xpath("//input[@disabled][@id='create-customer-collections-checkbox']")),
  newCustomerContactNameInvoicingInput = element(by.id('invoicingName')),
  newCustomerContactNameRecievableInput = element(by.id('create-customer-shipping-contact-name-collections')),
  newCustomerContactNameShippingInput = element(by.id('create-customer-shipping-contact-name-shipping')),
  newCustomerWebUrlInvoicingInput = element(by.id('webUrl')),
  newCustomerWebUrl1Input = element(by.id('webUrl1')),
  CompanyNameShipToField = element(by.id("company-name-step03")),
  billingDetailsShippingAddressField = element(by.id("create-customer-shipping-address-step03")),
  address2Field = element(by.id("create-customer-address-2-step03")),
  adress3Field = element(by.id("create-customer-address-3-step03")),
  cityField = element(by.id("create-customer-city-step03")),
  stateField = element(by.xpath("//label[text()='state']/following-sibling::div//div[contains(@class, 'select-field__single-value')]")),
  postalCodeField = element(by.id("create-customer-postal-code-step03")),
  billCodeField = element(by.id("create-customer-bill-code")),
  newCustomerSuccessMsg = element(by.xpath("//div[text()='Shipping Customer Created Successfully']")),
  newBillingAndShippingCustomerSuccessMsg = element(by.xpath("//div[text()='Shipping and Billing Customer Created Successfully']")),
  okButton = element(by.xpath("//button[text()='OK']")),
  exemptStatusExpiresOptionalField = element(by.xpath("//label[text()='Exempt status expires (optional)']/following-sibling::div")),
  searchExistingBillingCustomerTextBox = element(by.id("highlights-demo")),
  addPaymentMethodBankTransferOrCreditCard = element(by.xpath("//div[text()='+Add Payment Method / Bank Transfer or Credit Card']")),
  bankTransferRadioButton = element(by.xpath("//input[@value='true']/following-sibling::label[@for='Bank Transfer']")),
  creditCardRadioButton = element(by.xpath("//label[@for='Credit Card']")),
  makeThisMyDefaultPaymentTypeCheckBox = element(by.xpath("//label[@for='create-customer-make-default-payment']")),
  sameAsBillingAddressAboveCheckBox = element(by.xpath("//label[@for='create-customer-same-billing-address']")),
  city_Field = element(by.id("city")),
  addCreditCardDetailsButton = element(by.xpath("//button[text()='ADD CREDIT CARD DETAILS']")),
  saveCreditCardDetailsButton = element(by.xpath("//button[text()='SAVE CREDIT CARD DETAILS']")),

  //contacts_ List
  Contacts_ContactTypeShippingRadio = element(by.id("contactshipping")),
  Contacts_ContactTypeBillingRadio = element(by.id("contactbilling")),
  NameSearch = element(by.id("contact_search")),
  Contacts_DownloadButton = element(by.xpath("//div[contains(@class,'mt-4 btn-group-md dropdown')]/button")),
  Contacts_DownloadPDF = element(by.xpath("(//button[text()='PDF File'])[2]")),
  Contacts_DownloadCSV = element(by.xpath("(//button[text()='CSV File'])[2]")),
  AddToListButton = element(by.buttonText('ADD TO LIST')),
  contactsListMenuButton = element(by.xpath('(//button[@class="d-inline-block pr-2 pr-md-4 btn btn-secondary"])[1]')),
  contactListMenuItems = element.all(by.xpath("(//*[text()='Toggle Dropdown'])[1]/../following-sibling::div/button")),
  contactsMenuItem_ViewEditContact = element(by.buttonText('View/Edit Contact')),
  contactsMenuItem_AddToList = element(by.buttonText('Add To List')),
  contactsMenuItem_DeleteContact = element(by.buttonText('Delete Contact')),

  //Add to list
  addToList_header = element(by.xpath('//div[@class="modal-content"]/div/h5')),
  currentList = element(by.xpath('//*[@class="select-field__input"]/input')),
  addToList_final = element(by.css('[class="getBtnWidth btn-cta btn btn-primary"]')),
  OkButton_AfterAddToList = element(by.css('[class="btn btn-light btn-lg"]')),
  listNameField = element(by.id("listName")),
  descriptionField = element(by.id("description")),

  //List
  listSearch = element(by.xpath('[placeholder="Name or Keyword(s)"]')),

  Address1Field = element(by.id("addressLine1")),
  Address2Field = element(by.id("addressLine2")),
  Address3Field = element(by.id("addressLine3")),
  ZipField = element(by.id("zipCode")),
  StateDrop = element(by.id("state")),
  cardNumberTextBox = element(by.id("cardNumber")),
  securityCode = element(by.id('secCode')),
  cardHoldersName = element(by.xpath("(//div/input[@required][@id='holderName'])[2]")),
  CountrySearchClickOnly = element(by.xpath("//label[text()='country']/following-sibling::div")),
  Details_addContact = element(by.xpath("//span[text()='+ Add Contact']")),
  Carrier_methodField = element(by.id("react-select-11-inpu")),
  AccountField = element(by.id("carrierAccout")),
  NoCorgoInsurance_chckBox = element(by.css("[for='noCargoInsurance']")),
  CargoInsuranceCostOnly_checkBox = element(by.css('[for="cargoInsuranceCostOnly"]')),

  TaxCodeField = element(by.id("react-select-12-input")),
  TaxCodeMagnifier = element(by.xpath("(//div[@class='select-field__indicators css-1wy0on6'])[5]")),
  TaxExcempt = element(by.id("taxExempt")),
  invoiceTaxExcempt = element(by.xpath("//*[text()='Tax Exempt']/following-sibling::div//div[contains(@class,'singleValue')]")),
  VerticleMarket_Field = element(by.id("react-select-13-input")),
  Classification_Field = element(by.id("react-select-14-input")),
  contactHeader = element(by.xpath("//p[text()='Contacts']")),
  defaultContactDetails = element(by.css("[class='product-details']")),
  addContactButton = element(by.xpath("//*[text()='+ Add Contact']")),
  NewPaymentMethodButton = element(by.xpath("//span[text()='+ New Bank Account']")),
  newCreditCardButton = element(by.xpath("//span[text()='+ New Credit Card']")),
  contactFirstName = element(by.id('firstName')),
  contactWebUrl = element(by.id('web')),
  newCustomerWebUrl = element(by.xpath('//*[text()="web / url"]/../../following-sibling::div//input')),
  makeDefaultInvoiceingContactCheckBox = element(by.css("[name='asDefaultInvoicingContact']")),
  contactSubmitButton = element(by.xpath("//button[text()='Cancel']/../following-sibling::div/button[@type='submit']")),
  paymentMethodSubmitButton = element(by.xpath("(//label[text()='Make this my default payment type']/../../following-sibling::div//button[@type='submit'])[1]")),
  creditCardSubmitButton = element(by.xpath("(//label[text()='Make this my default payment type']/../../following-sibling::div//button[@type='submit'])[2]")),
  shippingMethodHeader = element(by.xpath("//p[text()='Shipping Method']")),
  carrierMethodDropdown = element(by.xpath("//*[@id='carrier']//div[contains(@class,'singleValue')]")),
  Customer_updateButton = element(by.buttonText("Update")),
  CloseButton = element(by.css('[class="close"]')),
  submitButton = element(by.xpath("//button[text()='Submit']")),
  cancelCreditCardEntryButton = element(by.xpath("//div[text()='Cancel Credit Card Entry']")),

  //contact details
  contactsTableBody = element(by.xpath("(//div[@class='table__body'])[1]")),
  headCheckBox = element(by.id("headCheckBox")),
  SalutationField = element(by.id("react-select-15-input")),
  DeleteContactButton = element(by.buttonText("DELETE CONTACT")),
  Contact_UpdateButton = element(by.buttonText("UPDATE")),

  //customers details
  customersList = element.all(by.xpath("//tbody//tr[1]")),
  customerBillingDetailsTitle = element(by.xpath("//p[text()='Customer Billing Details']")),
  noMatchingDataFound = element(by.xpath("//*[text()='No Matching Data Found']"))

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
module.exports = {
  /*Used to save application verification data form dynamic verification*/
  specData: {},
  /*To go to First Page on Customer Page Grid*/
  goToTheFirstPage: function () {
    actions.Click(goToTheFirstPageLink, 'Accounts Page - First Page Button');
    Short_Wait();
  },

  verifyCustomersList: function () {
    Medium_Wait()
    var flag = false
    element.all(by.xpath("//tbody//tr")).count().then(function (size) {
      if (size > 0) {
        flag = true
        actions.expectToEqual(flag, true, "Customers List")
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersRowsCount: function (count) {
    Long_Wait()
    element.all(by.xpath("//tbody//tr")).count().then(function (size) {
      if (size = count) {
        reporter.appendTest('Verify Customers List Count', 'Customers List Count : ' + count, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersNamesList: function (name) {
   let customerNamesList = element.all(by.xpath("//tbody//tr[1]/td[1]/span[1]"))
    element.all(by.xpath("//tbody//tr[1]/td[1]/span[1]")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertTextContains(customerNamesList.get(i), name, name)
        }
        reporter.appendTest('Verify Customers Names List', 'Customers Names : ' + name, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersCodesList: function (code) {
   let customerCodesList = element.all(by.xpath("//tbody//tr[1]/td[2]/span[1]"))
    element.all(by.xpath("//tbody//tr[1]/td[2]/span[1]")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertText(customerCodesList.get(i), code, 'Code')
        }
        reporter.appendTest('Verify Customers Codes List', 'Customers Codes : ' + code, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersMasterCodesList: function (masterCode) {
    var customerMasterCodesList = element.all(by.xpath("//tbody//tr[1]/td[3]/span[1]"))
    element.all(by.xpath("//tbody//tr[1]/td[3]/span[1]")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertText(customerMasterCodesList.get(i), masterCode, "Master Code")
        }
        reporter.appendTest('Verify customers masterCode List', 'Customers masterCode : ' + masterCode, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersPhonesList: function (phone) {
    let customerPhonesList = element.all(by.xpath("//tbody//tr[1]/td[4]//span[1]"))
    element.all(by.xpath("//tbody//tr[1]/td[4]//span[1]")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertText(customerPhonesList.get(i), phone, 'Phone')
        }
        reporter.appendTest('Verify customers phones List', 'Customers phones : ' + phone, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersEmailsList: function (email) {
   let customerEmailsList = element.all(by.xpath("//tbody//tr[1]/td[5]//span"))
    element.all(by.xpath("//tbody//tr[1]/td[5]//span")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertText(customerEmailsList.get(i), email, 'Email')
        }
        reporter.appendTest('Verify customers Email List', 'Customers Emails : ' + email, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersAddressesList: function (address) {
    let customerAddressesList = element.all(by.xpath("//tbody//tr[1]/td[6]/span[1]"))
    element.all(by.xpath("//tbody//tr[1]/td[6]/span[1]")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertText(customerAddressesList.get(i), address, 'Address')
        }
        reporter.appendTest('Verify customers address List', 'Customers address : ' + address, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersCitiesList: function (city) {
    let customerCitiesList = element.all(by.xpath("//tbody//tr[1]/td[7]/span[1]"))
    element.all(by.xpath("//tbody//tr[1]/td[7]/span[1]")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertText(customerCitiesList.get(i), city, 'City')
        }
        reporter.appendTest('Verify Customers City List', 'Customers City : ' + city, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersStsList: function (st) {
    let customerStsList = element.all(by.xpath("//tbody//tr[1]/td[8]/span"))
    element.all(by.xpath("//tbody//tr[1]/td[8]/span")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertText(customerStsList.get(i), st, 'ST')
        }
        reporter.appendTest('Verify Customers ST List', 'Customers ST : ' + st, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersZipsList: function (zip) {
    let customerZipsList = element.all(by.xpath("//tbody//tr[1]/td[9]/p"))
    element.all(by.xpath("//tbody//tr[1]/td[9]/p")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertText(customerZipsList.get(i), zip, 'Zip')
        }
        reporter.appendTest('Verify Customers ZIP List', 'Customers ZIP : ' + zip, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersRepsList: function (rep) {
   let customerRepsList = element.all(by.xpath("//tbody//tr[1][1]/td[10]//div/span[1]"))
    element.all(by.xpath("//tbody//tr[1][1]/td[10]//div/span[1]")).count().then(function (size) {
      if (size > 0) {
        for (var i = 0; i < size; i++) {
          actions.AssertText(customerRepsList.get(i), rep, 'Rep')
        }
        reporter.appendTest('Verify Customers REP List', 'Customers REP : ' + rep, "PASS");
      } else {
        actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
      }
    });
  },

  verifyCustomersPageHeader: function () {
    Medium_Wait()
    actions.VerifyElementPresent(CustomersPageHeader, true, "Customers list Page Header")
  },

  verifyNewCustomersPageHeader: function () {
    Medium_Wait()
    var newCustomersPageHeader = element(by.xpath("//h5[text()='New Customer - '][text()='Shipping Details']"))
    actions.VerifyElementPresent(newCustomersPageHeader, true, "New Customer Page Header")
  },

  verifyCustomerBillingDetailsTitle: function () {
    actions.VerifyElementPresent(customerBillingDetailsTitle, true, "Customer Billing Details Title Page Header")
  },

  verifyCreateCustomerButton: function () {
    actions.VerifyElementPresent(createCustomerButton, true, "Create Customer Button")
  },
  clickOnCreateCustomerButton: function () {
    actions.Click(createCustomerButton, "Create Customer Button")
  },
  verifyCustomersPageTabs: function () {
    actions.verifyElementDisplayed(CustomersList, true, "Customers Tab")
    actions.verifyElementDisplayed(ContactsList, true, "Contacts Tab")
    actions.verifyElementDisplayed(ListTab, true, "List Tab")
  },
  verifyCustomerType: function () {
    Long_Wait()
    var ContactTypeShippingRadio = element(by.xpath("//input[@type='radio']/following-sibling::span[text()='Shipping']")),
      ContactTypeBillingRadio = element(by.xpath("//input[@type='radio']/following-sibling::span[text()='Billing']"))
    actions.verifyElementDisplayed(ContactTypeShippingRadio, true, "Contact Type Shipping");
    actions.verifyElementDisplayed(ContactTypeBillingRadio, true, "Contact Type Billing");
  },
  enterInKeywordSearchField: function (keyword) {
    actions.blurText(KeywordSearchField, keyword, "Search Keyword");
    Short_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
  },
  clickOnKeywordSearchMagnifier: function () {
    Short_Wait()
    actions.Click(KeywordSearchMagnifier, "Keyword Search Magnifier");
  },
  clickOnSalesRepDropdown: function () {
    Short_Wait()
    actions.jsClick(SalesRepDropdown, "Sales Rep Dropdown")
  },
  verifySalesRepDropdownOptionsMenu: function () {
    var salesRepDropDownOptionsMenu = element(by.xpath("//div[contains(@class, 'select-field__menu')]"));
    Short_Wait()
    actions.verifyElementDisplayed(salesRepDropDownOptionsMenu, true, " Sales Rep dropdown Options Menu");
  },
  enterMasterCodeInMasterSearch: function (masterCode) {
    actions.blurText(MastercustomerSearchField, masterCode, 'Master Code');
    Short_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
  },
  clickOnMastercustomerSearchMagnifier: function () {
    Medium_Wait()
    actions.jsClick(MastercustomerSearchMagnifier, "Master customer Search Magnifier");
  },
  verifyTableItems: function (headerName) {
    var locator = element(by.xpath('//th[text()="' + headerName + '"]'))
    actions.VerifyElementPresent(locator, true, headerName);
  },
  clickOnEllipseIconOfFirstCustomerRow: function () {
    actions.jsClick(Customers_menuItemButtonFirst, "Customers menu Item Button");
  },
  verifyCustomerMenuItems: function () {
    actions.VerifyElementPresent(Customers_MenuViewEditCustomer1, true, "View / Edit Customer");
    actions.VerifyElementPresent(Customers_MenuViewOpenJobs1, true, "View Open Jobs");
    actions.VerifyElementPresent(Customers_MenuAddcontact1, true, "Add contact");
  },
  mouseHoverIntoRep: function () {
    var elem = element(by.xpath(('(//div[@class="avatar avatar_sm "])[1]')));
    actions.ScrollIntoViewElement(elem)
    Short_Wait()
    browser.actions().mouseMove(elem);
  },
  verifyDownloadButton: function () {
    actions.VerifyElementPresent(Customers_DownloadButton, true, " Download Button");
  },
  clickOnDownloadButton: function () {
    actions.Click(Customers_DownloadButton, "Customers_DownloadButton")
    Short_Wait()
  },
  verifyDownloadOptions: function () {
    var Customers_DownloadPDF = element(by.xpath("//div[@class='drop-holder d-lg-block']/div/button/following-sibling::div//button[text()='PDF File']")),
      Customers_DownloadCSV = element(by.xpath("//div[@class='drop-holder d-lg-block']/div/button/following-sibling::div//button[text()='CSV File']"))
    actions.VerifyElementPresent(Customers_DownloadPDF, true, " Download PDF Option");
    actions.VerifyElementPresent(Customers_DownloadCSV, true, " Download CSV Option");
  },

  clickOnPDFDownloadButton: function () {
    actions.Click(Customers_DownloadPDF, "Pdf_DownloadButton")
  },

  clickOnCSVDownloadButton: function () {
    actions.Click(Customers_DownloadCSV, "Csv_DownloadButton")
  },

  clickOnViewEditCustomer: function () {
    actions.Click(Customers_MenuViewEditCustomer1, "View Edit Customer");
  },

  clickOnCustomerDetailsIcon: function () {
    actions.Click(customerDetailsIcon, "customerDetailsIcon")
  },
  verifyCustomerDetailsIconList: function () {
    actions.VerifyElementPresent(view_EditCustomerOption, true, "view_EditCustomerOption")
    actions.VerifyElementPresent(view_OpenJobsOption, true, "view_OpenJobsOption")
    actions.VerifyElementPresent(addContactOption, true, "addContactOption")
  },
  clickOnViewEditCustomerDetailsIcon: function () {
    actions.Click(view_EditCustomerOption, "view_EditCustomerOption")
    Long_Wait()
  },

  verifyCustomerTableHeadersDisplayed: function (snaptitles) {

    var header = element(by.xpath("//th/span[text()='" + snaptitles + "']"));
    actions.verifyElementDisplayed(header, true, snaptitles);
  },

  enterCompanyNameShipTo: function (text='Ecospace') {
    actions.blurText(newCustomerNameOrShipTo, text, "Company Name/Ship To")
  },

  enterCompanyShippingAddress: function (text='Electronic city') {
    actions.blurText(newCustomerShippingAddress, text, "Address")
  },

  enterAddress2: function (text='Silver town') {
    actions.blurText(newCustomerAddress2, text, "Address2")
  },

  enterAddress3: function (text='South street') {
    actions.blurText(newCustomerAddress3, text, "Address3")
  },

  enterCompanyCity: function (text='California') {
    actions.blurText(newCustomerCreateCity, text, "city")
  },

  enterCompanyState: function (text='Massachusetts') {
    actions.Click(newCustomerState, "State")
    Expected_Wait(1)
    var newCustomerStateInput = element(by.xpath("(//label[text()='state']/following-sibling::div//input)[1]"))
    actions.blurText(newCustomerStateInput, text, "State")
    // actions.Click(newCustomerState, "State")
    // Short_Wait()
    // actions.PressDownArrow()
    // Expected_Wait(1)
    actions.PressDownArrow()
    actions.PressEnter()
    Short_Wait()
  },

  enterCompanyZip: function (text='34343') {
    actions.blurText(newCustomerZip, text, "Zip")
  },

  enterNewCustomerShippingAddress: function (text='Electronic city') {
    actions.blurText(billingDetailsShippingAddressField, text, "Shipping Address")
  },

  enterNewCustomerShipCode: function (text) {
    actions.blurText(newCustomerShipCode, text, "new Customer Ship Code")
    Short_Wait()
  },

  enterNewCarrierMethod: function (text='FedEx') {
    actions.jsClick(newCarrierMethod, 'new Carrier Method')
    actions.blurText(newCarrierMethod, text, "new Carrier Method")
    Short_Wait()
    actions.PressEnter(newCarrierMethod)
  },

  enterNewCustomerAccount: function (text) {
    actions.blurText(newCustomerAccount, text, "new Customer Account")
  },

  enterNewCustomerTaxExempt: function (text) {
    actions.blurText(newCustomerTaxExempt, text, "new Customer Tax Exempt")
    actions.PressEnter(newCustomerTaxExempt)
  },

  enterNewCustomerTaxExemptYash: function (text) {
    actions.blurText(newCustomerTaxExemptYash, text, "new Customer Tax Exempt Yash")
  },

  enterNewCustomerExemptStatusExpiresOptionalField: function (expireDate) {
    actions.blurText(exemptStatusExpiresOptionalField, expireDate, "new Customer Exempt Status Expires Optional")
  },

  enterNewCustomerVerticalMarket: function (text) {
    actions.blurText(newCustomerVerticalMarket, text, "new Customer Vertical Market")
    actions.PressEnter(newCustomerVerticalMarket)
  },

  enterNewCustomerClassification: function (text) {
    actions.blurText(newCustomerClassification, text, "newCustomerClassification")
    actions.PressEnter(newCustomerClassification)
  },

  enterNewCustomerSalesRep: function (text) {
    actions.blurText(newCustomerSalesRep, text, "newCustomerSalesRep")
    actions.PressEnter(newCustomerClassification)
  },

  enterContactNameOrdering: function (text) {
    actions.blurText(contactFirstName, text, "contact name / ordering")
  },

  // verifyOnSameAsOrderingContactCheckBoxNotEditable: function () {
  //   Short_Wait()
  //   actions.verifyElementDisplayed(newCustomerSameAsOrderingContactCheckBox, true, "Same As Ordering Contact CheckBox")
  // },

  verifyOnSameAsInvoicingContactCheckBoxNotEditable: function () {
    actions.verifyElementDisplayed(newCustomerSameAsInvoicingContactDisabledCheckBox, true, "Same As Ordering Contact CheckBox")
  },

  validateNewCustomerCompanyNameShipTo: function (text) {
    Medium_Wait()
    // CompanyNameShipToField.getAttribute('value').then(function (companyNameShipTo) {
    //   actions.expectToEqual(companyNameShipTo, text, "companyName/ShipTo")
    // })
    actions.GetFieldValueAndCompareToBeEqual(CompanyNameShipToField, text, "CompanyName/ShipTo", "Company Name displayed", "Company Name Expected ")
  },

  enterBillingDetailsCompanyNameShipTo: function (text) {
    actions.blurText(CompanyNameShipToField, text, "companyName/ShipTo")
  },

  validateCompanyNameShipToNotEditable: function () {
    // var CompanyNameShipToFieldNotEditable = element(by.xpath("//input[@disabled] [@id='company-name-step03']"))     // identified companyName field is editable
    // actions.verifyElementDisplayed(CompanyNameShipToFieldNotEditable, true, 'companyName/ShipTo')
    actions.verifyFieldValueIsNotEditable(CompanyNameShipToField, 'companyName/ShipTo', "GreenTech")
  },

  verifyCompanyShippingAddress: function (text) {
    // billingDetailsShippingAddressField.getAttribute('value').then(function (shippingAddress) {
    //   actions.expectToEqual(shippingAddress, text, "Shipping Address")
    // })
     actions.GetFieldValueAndCompareToBeEqual(billingDetailsShippingAddressField, text, "Shipping Address", "Shipping Address displayed", "Shipping Address Expected ")
 },

  validateShippingAddressNotEditable: function () {
    // var ShippingAddressFieldNotEditable = element(by.xpath("//input[@disabled] [@id='create-customer-shipping-address-step03']"))     // identified shipping address field is editable
    // actions.verifyElementDisplayed(ShippingAddressFieldNotEditable, true, 'Shipping Address')
     actions.verifyFieldValueIsNotEditable(billingDetailsShippingAddressField,'Shipping Address', "Eco City")
  },

  verifyNewCustomerAddress2: function (text) {
    // address2Field.getAttribute('value').then(function (Address2) {
    //   actions.expectToEqual(Address2, text, "Address2")
    // })
     actions.GetFieldValueAndCompareToBeEqual(address2Field, text, "Address2", "Address2 displayed", "Address2 Expected ")
  },

  enterNewCustomerAddress2: function (text) {
    actions.blurText(address2Field, text, "Address2")
  },

  validateAddress2NotEditable: function () {
    // var address2FieldNotEditable = element(by.xpath("//input[@disabled] [@id='create-customer-address-2-step03']"))     // identified address2 field is editable
    // actions.verifyElementDisplayed(address2FieldNotEditable, true, 'Address2')
      actions.verifyFieldValueIsNotEditable(address2Field,'Address2', "Silver Town")
  },

  verifyNewCustomerAddress3: function (text) {
    // adress3Field.getAttribute('value').then(function (Address3) {
    //   actions.expectToEqual(Address3, text, "Address3")
    // })
     actions.GetFieldValueAndCompareToBeEqual(adress3Field, text, "Address3", "Address3 displayed", "Address3 Expected ")
  },

  validateAddress3NotEditable: function () {
    // var address3FieldNotEditable = element(by.xpath("//input[@disabled] [@id='create-customer-address-3-step03']"))     // identified address3 field is editable
    // actions.verifyElementDisplayed(address3FieldNotEditable, true, 'Address3')
    actions.verifyFieldValueIsNotEditable(adress3Field,'Address3', "Godwin Street")
  },

  enterNewCustomerAddress3: function (text) {
    actions.blurText(adress3Field, text, "Address3")
  },

  verifyNewCustomerCity: function (text) {
    // cityField.getAttribute('value').then(function (city) {
    //   actions.expectToEqual(city, text, "City")
    // })
     actions.GetFieldValueAndCompareToBeEqual(cityField, text, "City", "City displayed", "City Expected ")
  },

  validateCityNotEditable: function () {
    // var cityFieldNotEditable = element(by.xpath("//input[@disabled] [@id='create-customer-city-step03']"))     // identified city field is editable
    // actions.verifyElementDisplayed(cityFieldNotEditable, true, 'Address3')
    actions.verifyFieldValueIsNotEditable(cityField,'city', "Bangalore")
  },

  enterNewCustomerCity: function (text) {
    actions.blurText(cityField, text, "City")
  },

  verifyNewCustomerCompanyState: function (text) {
    // stateField.getText().then(function (state) {
    //   actions.expectToEqual(state, text, "State")
    // })
    actions.GetTextAndCompareToBeEqual(stateField, text, "State", "State displayed", "State Expected ")
  },

  validateStateNotEditable: function () {
    var stateFieldNotEditable = element(by.xpath("//label[text()='state']/following-sibling::div//div[@disabled][contains(@class, 'select-field__single-value')]"))     // identified state field is editable
    actions.verifyElementDisplayed(stateFieldNotEditable, true, 'State')
  },

  selectNewCustomerState: function () {
    var stateDropDown = element(by.xpath("//label[text()='state']/following-sibling::div"))
    actions.Click(stateDropDown, "State")
    Short_Wait()
    actions.PressDownArrow()
    Expected_Wait(1)
    actions.PressDownArrow()
    actions.PressEnter()
    Short_Wait()
  },

  verifyNewCustomerPostalCode: function (text) {
    // postalCodeField.getAttribute('value').then(function (postalCode) {
    //   actions.expectToEqual(postalCode, text, "Postal Code")
    // })
    actions.GetFieldValueAndCompareToBeEqual(postalCodeField, text, "Postal Code", "Postal Code displayed", "Postal Code Expected ")
  },

  validateCompanyPostalCodeNotEditable: function () {
  //   var postalCodeFieldNotEditable = element(by.xpath("//input[@disabled] [@id='create-customer-postal-code-step03']"))     // identified postalcode field is editable
  //   actions.verifyElementDisplayed(postalCodeFieldNotEditable, true, 'Postal Code')
    actions.verifyFieldValueIsNotEditable(postalCodeField,'postalCode', "90007")
  },

  enterNewCustomerPostalCode: function (text) {
    actions.blurText(postalCodeField, text, "Postal Code")
  },

  verifyNewCustomerBillCode: function (text) {
    // billCodeField.getAttribute('value').then(function (billCode) {
    //   actions.expectToEqual(billCode, text, "Bill Code")
    // })
    actions.GetFieldValueAndCompareToBeEqual(billCodeField, text, "Bill Code", "Bill Code displayed", "Bill Code Expected ")
  },

  validateBillCodeNotEditable: function () {
    // var billCodeFieldNotEditable = element(by.xpath("//input[@disabled] [@id='create-customer-bill-code']"))     // identified bill code field is editable
    // actions.verifyElementDisplayed(billCodeFieldNotEditable, true, 'Bill Code')
    actions.verifyFieldValueIsNotEditable(billCodeField,'Bill Code', "XSDCOM")
  },

  enterNewCustomerBillCode: function (text) {
    billCodeField.blurText(cityField, text, "Bill Code")
  },
  //-------------------------------------------------------------
  verifyContactNameInvoicing: function (text) {
    // newCustomerContactNameInvoicingInput.getAttribute('value').then(function (contactName) {
    //   actions.expectToEqual(contactName, text, "Contact Name Invoicing")
    // })
    actions.GetFieldValueAndCompareToBeEqual(newCustomerContactNameInvoicingInput, text, "Contact Name Invoicing", "Contact Name Invoicing displayed", "Contact Name Invoicing Expected ")
  },
  verifyContactNameAccountsReceivable: function (text) {
    // newCustomerContactNameInvoicingInput.getAttribute('value').then(function (contactName) {
    //   actions.expectToEqual(contactName, text, "Contact Name Invoicing")
    // })
    actions.GetFieldValueAndCompareToBeEqual(newCustomerContactNameRecievableInput, text, "Contact Name Recievable", "Contact Name Recievable displayed", "Contact Name Recievable Expected ")
  },

  verifyContactNameShippingInput: function (text) {
    // newCustomerContactNameShippingInput.getAttribute('value').then(function (contactName) {
    //   actions.expectToEqual(contactName, text, "Contact Name Shipping")
    // })
    actions.GetFieldValueAndCompareToBeEqual(newCustomerContactNameShippingInput, text, "Contact Name Shipping", "Contact Name Shipping displayed", "Contact Name Shipping Expected ")
  },

  verifyEmailData: function (text) {
    // email.getAttribute('value').then(function (mailId) {
    //   actions.expectToEqual(mailId, text, "Email")
    // })
    actions.GetFieldValueAndCompareToBeEqual(email, text, "Email", "Email displayed", "Email Expected ")
  },

  verifyEmail1Data: function (text) {
    // email1.getAttribute('value').then(function (mailId) {
    //   actions.expectToEqual(mailId, text, "Email Shipping")
    // })
    actions.GetFieldValueAndCompareToBeEqual(email1, text,"Email Shipping", "Field Value displayed", "Expected Field Value")
  },

  verifyWebUrlData: function (text) {
    // newCustomerWebUrlInvoicingInput.getAttribute('value').then(function (webUrl) {
    //   actions.expectToEqual(webUrl, text, "Web Url Invoicing")
    // })
    actions.GetFieldValueAndCompareToBeEqual(newCustomerWebUrlInvoicingInput, text,"Web Url Invoicing", "Field Value displayed", "Expected Field Value")
  },

  verifyWebUrl1Data: function (text) {
    // newCustomerWebUrl1Input.getAttribute('value').then(function (webUrl) {
    //   actions.expectToEqual(webUrl, text, "Web Url Shipping")
    // })
    actions.GetFieldValueAndCompareToBeEqual(newCustomerWebUrl1Input, text,"Web Url Invoicing", "Field Value displayed", "Expected Field Value")
  },

  verifyPhoneData: function (text) {
    // phone.getAttribute('value').then(function (phone) {
    //   actions.expectToEqual(phone, text, "Phone")
    // })
    actions.GetFieldValueAndCompareToBeEqual(phone, text,"Phone", "Field Value displayed", "Expected Field Value")
  },

  verifyPhone1Data: function (text) {
    // phone1.getAttribute('value').then(function (phone) {
    //   actions.expectToEqual(phone, text, "Phone Shipping")
    // })
    actions.GetFieldValueAndCompareToBeEqual(phone1, text,"Phone", "Field Value displayed", "Expected Field Value")
  },

  verifyPhoneExtData: function (text) {
    // phoneExtention.getAttribute('value').then(function (phoneExt) {
    //   actions.expectToEqual(phoneExt, text, "Phone Ext")
    // })
    actions.GetFieldValueAndCompareToBeEqual(phoneExtention, text,"Phone Ext", "Field Value displayed", "Expected Field Value")
  },

  verifyPhoneExt1Data: function (text) {
    // phoneExtention1.getAttribute('value').then(function (phoneExt) {
    //   actions.expectToEqual(phoneExt, text, "Phone Ext Shipping")
    // })
    actions.GetFieldValueAndCompareToBeEqual(phoneExtention1, text,"Phone Ext Shipping", "Field Value displayed", "Expected Field Value")
  },

  verifyFaxData: function (text) {
    // fax.getAttribute('value').then(function (fax) {
    //   actions.expectToEqual(fax, text, "Fax")
    // })
    actions.GetFieldValueAndCompareToBeEqual(fax, text,"Fax", "Field Value displayed", "Expected Field Value")
  },

  verifyFax1Data: function (text) {
    // fax1.getAttribute('value').then(function (fax) {
    //   actions.expectToEqual(fax, text, "Fax Shipping")
    // })
    actions.GetFieldValueAndCompareToBeEqual(fax1, text,"Fax Shipping", "Field Value displayed", "Expected Field Value")
  },

  verifyNotesData: function (text) {
    // notes.getAttribute('value').then(function (notes) {
    //   actions.expectToEqual(notes, text, "Notes")
    // })
    actions.GetFieldValueAndCompareToBeEqual(notes, text,"Notes", "Field Value displayed", "Expected Field Value")
  },

  verifyNotes1Data: function (text) {
    // notes1.getAttribute('value').then(function (notes) {
    //   actions.expectToEqual(notes, text, "Notes Shipping")
    // })
    actions.GetFieldValueAndCompareToBeEqual(notes1, text,"Notes Shipping", "Field Value displayed", "Expected Field Value")
  },

  verifyContactNameInvoicingNotEditable: function () {
    var newCustomerContactNameInvoicingNotEditable = element(by.xpath("//input[@id='create-customer-shipping-contact-name-invoicing'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerContactNameInvoicingNotEditable, true, "Contact Name Invoicing field is not editable")
  },

  verifyContactNameAccountsReceivableNotEditable: function () {
    newCustomerContactNameAccountsReceivableNotEditable = element(by.xpath("//input[@id='create-customer-shipping-contact-name-collections'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerContactNameShippingNotEditable, true, "Contact Name / Accounts Receivable field is not editable")
  },

  verifyEmailNotEditable: function (text) {
    newCustomerEmailNotEditable = element(by.xpath("//input[@id='email'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerEmailNotEditable, true, "Email field is not editable")
  },

  verifyEmail1NotEditable: function (text) {
    newCustomerEmailShippingNotEditable = element(by.xpath("//input[@id='email1'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerEmailShippingNotEditable, true, "Email field is not editable")
  },

  verifyWebUrlNotEditable: function (text) {
    newCustomerWebUrlNotEditable = element(by.xpath("//input[@id='webUrl'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerWebUrlNotEditable, true, "webUrl field is not editable")
  },

  verifyWebUrl1NotEditable: function (text) {
    newCustomerWebUrlShippingNotEditable = element(by.xpath("//input[@id='webUrl1'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerWebUrlShippingNotEditable, true, "webUrl field is not editable")
  },

  verifyPhoneNotEditable: function (text) {
    newCustomerPhoneNotEditable = element(by.xpath("//input[@id='phone'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerPhoneNotEditable, true, "Phone field is not editable")
  },

  verifyPhone1NotEditable: function (text) {
    newCustomerPhoneShippingNotEditable = element(by.xpath("//input[@id='phone1'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerPhoneShippingNotEditable, true, "Phone field is not editable")
  },

  verifyPhoneExtNotEditable: function (text) {
    newCustomerPhoneExtNotEditable = element(by.xpath("//input[@id='ext'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerPhoneExtNotEditable, true, "Phone Ext field is not editable")
  },

  verifyPhoneExt1NotEditable: function (text) {
    newCustomerPhoneExtShippingNotEditable = element(by.xpath("//input[@id='ext1'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerPhoneExtShippingNotEditable, true, "Phone Ext field is not editable")
  },

  verifyFaxNotEditable: function (text) {
    newCustomerFaxNotEditable = element(by.xpath("//input[@id='fax1'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerContactNameShippingNotEditable, true, "Fax field is not editable")
  },

  verifyFax1NotEditable: function (text) {
    newCustomerFaxShippingNotEditable = element(by.xpath("//input[@id='fax1'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerFaxShippingNotEditable, true, "Fax field is not editable")
  },

  verifyNotesNotEditable: function (text) {
    var newCustomerNotesNotEditable = element(by.xpath("//input[@id='notes'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerNotesNotEditable, true, "Notes field is not editable")
  },

  verifyNotes1NotEditable: function (text) {
    var newCustomerNotesShippingNotEditable = element(by.xpath("//input[@id='notes1'][@disabled]"))
    actions.verifyElementDisplayed(newCustomerNotesShippingNotEditable, true, "Notes field is not editable")
  },

  //********************************************************** */
  //-------------------------------------------------------------
  clickOnNewCustomerNextButton: function () {
    actions.Click(newCustomerNextButton, "newCustomerNextButton")
  },

  clickNewCustomerAddToMasterCustomer: function () {
    actions.Click(newCustomerAddToMasterCustomer, "newCustomerAddToMasterCustomer")
  },

  enterNewCustomerAddToMasterCustomerInput: function (text) {
    actions.blurText(newCustomerAddToMasterCustomerInput, text, "newCustomerAddToMasterCustomerInput")
  },

  clickOnContactsList: function () {
    actions.Click(ContactsList, "ContactsList")
  },

  verifyContactListTableDisplayed: function () {
    actions.waitUntilElementPresent_OffShore(contactsTableBody, "contacts list table")
    actions.verifyElementDisplayed(contactsTableBody, true, "contacts list table")
  },
  verifyAddToListButton: function () {
    headCheckBox
    //  actions.Click(headCheckBox,"headCheckBox")
    //  Medium_Wait()
    actions.VerifyElementPresent(AddToListButton, true, "Add To List Button")
    actions.VerifyElementEnabled(AddToListButton, false, "Add To List Button")
  },

  verifyContactType: function () {
    actions.jsVerifyElementDisplayed(Contacts_ContactTypeShippingRadio, true, "Shipping Radio")
    actions.jsVerifyElementDisplayed(Contacts_ContactTypeBillingRadio, true, "Billing Radio")
  },
  verifyContactTypeEnabled: function () {
    actions.VerifyElementEnabled(Contacts_ContactTypeShippingRadio, true, "ShippingRadio")
  },

  verifyNameSeachfield: function () {
    actions.EnterText(NameSearch, "David Stolper", NameSearch)
  },

  clickOnFirstCustomer: function () {
    Long_Wait()
    actions.jsClick(firstCustomer, "First Customer")
  },

  getFirstBillingCustomer: function () {
    Medium_Wait()
    return actions.GetText(firstBillingCustomer, "First customer")
  },

  clickOnFirstBillingCustomer: function () {
    actions.jsClick(firstBillingCustomer, "customer")
  },

  verifyTableColums: function (text) {
    var Column = element(by.xpath('(//div[text()="' + text + '"])[1]'))
    Short_Wait()
    actions.verifyElementDisplayed(Column, true, text);
  },

  verifyContactListCheckBox: function () {
    element.all(by.css('[type="checkbox"]')).then(function (checkbox) {
      checkbox.forEach(ele => {
        actions.jsClick(ele, "contacts checkbox")
      });
    });
  },
  clickOnBillingRadio: function () {
    actions.jsClick(Customers_ContactTypeBillingRadio, "Billing Radio")
  },
  clickOnContatsMenu: function () {
    actions.jsClick(contactsListMenuButton, "contacts List Menu Button")
  },
  verifyContactsMenuItems: function () {
    actions.verifyElementDisplayed(contactsMenuItem_ViewEditContact, true, "View/Edit Contact")
    actions.verifyElementDisplayed(contactsMenuItem_AddToList, true, "Add To List")
    actions.verifyElementDisplayed(contactsMenuItem_DeleteContact, true, "Delete Contact")
  },
  clickOnContactsDownloadButton: function () {
    actions.Click(Contacts_DownloadButton, "Download Button")
  },
  clickOnContactsDownloadButtonPDF: function () {
    actions.Click(Contacts_DownloadPDF, "Download PDF")
    //  actions.verifyPDFFileDownload_OffShore()  //method is not working
  },
  clickOnContactsDownloadButtonCSV: function () {
    actions.Click(Contacts_DownloadCSV, "Download CSV")
    //    actions.verifyCSVFileDownload_OffShore()  //method is not working
  },
  clickOnFirstContactCheckBox: function () {
    var ele = element(by.xpath('(//div[@class="custom-checkbox custom-control"])[2]/input'))
    Medium_Wait()
    actions.jsClick(ele, "CheckBox")
  },
  clickOnAddToListButton: function () {
    actions.VerifyElementEnabled(AddToListButton, true, "Add To List Button")
    actions.jsClick(AddToListButton, "Add To List Button")
  },
  verifyAddTolistHeader: function () {
    actions.verifyElementDisplayed(addToList_header, true, "Add To List header")
  },
  verifycusrrentList: function () {
    actions.VerifyElementPresent(currentList, true, "Current List")
  },
  selectOptionfromCusrrentList: function () {
    actions.EnterText(currentList, "Cust_list")
    actions.PressEnter()  // Shipping_Cust_list will be selected
  },
  clickOnAddToListButton_Final: function () {
    actions.jsClick(addToList_final, "add To List")
  },
  ClickOnOkAfterAddToList: function () {
    Medium_Wait()
    actions.jsClick(OkButton_AfterAddToList, "Ok Button")
  },
  enterListName: function () {
    actions.EnterText(listNameField, "QA List", "listName")
  },
  enterdescription: function () {
    actions.EnterText(descriptionField, "QA description", "description")
  },

  getCustomerNameByText: function () {
    Medium_Wait()
    firstCustomer.getText().then(function (text) {
      global.customerName = text;
      reporter.appendTest('Verifying companyName', 'Verified "' + global.customerName + '" is present in customer shipping details screen', "PASS");
    })

  },

  getBillingCustomerNameByText: function () {
    Medium_Wait()
    firstBillingCustomer.getText().then(function (text) {
      global.customerName = text;
      reporter.appendTest('Verifying companyName', 'Verified "' + global.customerName + '" is present in customer shipping details screen', "PASS");
    })

  },
  validateCompanyName: function () {
    Medium_Wait()
    var CompanyNameField = element(by.id("companyName"))
    CompanyNameField.getAttribute('value').then(function (companyName) {
      actions.expectToEqual(companyName, global.customerName, "companyName")
    })
  },

  validateCompanyNameFieldEditable: function () {
    var CompanyNameFieldEditable = element(by.xpath("//input[not(@disabled)] [@id='companyName']"))     // identified companyName field is editable
    actions.verifyElementDisplayed(CompanyNameFieldEditable, true, 'companyName')
  },

  validateMasterCode: function () {
    var MasterCodeField = element(by.id("masterCode"))
  },

  validateShipCode: function (text) {
    Medium_Wait()
    newCustomerShipCode.getAttribute('value').then(function (shipCode) {
      actions.expectToEqual(shipCode.trim(), text.trim(), "Ship Code")
    })
  },

  validateBillCode: function () {
    var BillCodeField = element(by.id("billCode"))
    actions.verifyElementDisplayed(BillCodeField, true, 'bill code')
  },

  validateBillCodeFieldNonEditable: function () {
    var BillCodeFieldNonEditable = element(by.xpath("//input[@disabled] [@id='billCode']"))     // identified BillCode field is editable
    actions.verifyElementDisplayed(BillCodeFieldNonEditable, true, 'BillCode')
  },

  validateAddress: function () {
    var Address1Field = element(by.id("addressLine1"))
    actions.verifyElementDisplayed(Address1Field, true, 'address')
  },

  validateAddressFieldEditable: function () {
    var addressFieldEditable = element(by.xpath("//input[not(@disabled)] [@id='addressLine1']"))     // identified Address field is editable
    actions.verifyElementDisplayed(addressFieldEditable, true, 'Address')
  },

  validateCity: function () {
    actions.verifyElementDisplayed(city_Field, true, 'city')
  },

  validateCityFieldEditable: function () {
    var cityFieldEditable = element(by.xpath("//input[not(@disabled)] [@id='city']"))     // identified City field is editable
    actions.verifyElementDisplayed(cityFieldEditable, true, 'City')
  },

  validateState: function () {
    var StateDrop = element(by.id("state"))
    actions.verifyElementDisplayed(StateDrop, true, 'State')
  },

  validateZip: function () {
    var ZipField = element(by.id("zipCode"))
    actions.verifyElementDisplayed(ZipField, true, 'Zip')
  },

  validateZipFieldEditable: function () {
    var zipFieldEditable = element(by.xpath("//input[not(@disabled)] [@id='zipCode']"))     // identified Zip field is editable
    actions.verifyElementDisplayed(zipFieldEditable, true, 'Zip')
  },

  validateCountry: function () {
    var countryField = element(by.xpath("//*[text()='country']/following-sibling::div/div/div/div[contains(@class,'select')]"))
    actions.verifyElementDisplayed(countryField, true, 'country')
  },

  validateContactsHeader: function () {
    var contactHeader = element(by.xpath("//p[text()='Contacts']"))
    actions.verifyElementDisplayed(contactHeader, true, "Contacts Header")
  },

  validateDefaultShippingContact: function () {
    actions.verifyElementDisplayed(defaultContactDetails, true, "Default contact details")
  },

  validateAddContactButton: function () {
    actions.verifyElementDisplayed(addContactButton, true, "add contact button")
  },

  clickOnAddContactButton: function () {
    actions.jsClick(addContactButton, "add contact button")
  },

  enterFirstName: function (text) {
    actions.blurText(contactFirstName, text, "Contact first name")
  },

  enterPhone: function (text) {
    actions.blurText(phone, text, "Phone")
  },

  enterPhoneExt: function (text) {
    actions.blurText(phoneExtention, text, "Phone extention")
  },

  enterFax: function (text) {
    actions.blurText(fax, text, "Fax")
  },

  enterEmail: function (text) {
    actions.blurText(email, text, "Email")
  },

  enterPhone1: function (text) {
    actions.blurText(phone1, text, "Phone - Shipping")
  },

  enterPhoneExt1: function (text) {
    actions.blurText(phoneExtention1, text, "Phone extention - Shipping")
  },

  enterFax1: function (text) {
    actions.blurText(fax1, text, "Fax - Shipping")
  },

  enterEmail1: function (text) {
    actions.blurText(email1, text, "Email - Shipping")
  },

  enterWebURL: function (text) {
    actions.blurText(contactWebUrl, text, "Web/URL")
  },

  enterNewCustomerWebURL: function (text) {
    actions.blurText(newCustomerWebUrl, text, "Web/URL")
  },

  enterNotes: function (text) {
    actions.blurText(notes, text, "Notes")
  },

  enterNotes1: function (text) {
    actions.blurText(notes1, text, "Notes - Shipping")
  },

  enterNewCustomerWebUrlInvoicing: function (text) {
    actions.blurText(newCustomerWebUrlInvoicingInput, text, "Web/URL")
  },

  enterNewCustomerWebUrl1: function (text) {
    actions.blurText(newCustomerWebUrl1Input, text, "Web/URL - Shipping")
  },

  enterContactNameInvoicing: function (text) {
    actions.blurText(newCustomerContactNameInvoicingInput, text, "Contact Name Invoicing")
  },

  enterContactNameShipping: function (text) {
    actions.blurText(newCustomerContactNameShippingInput, text, "Contact Name Shipping")
  },

  clickOnSameAsOrderingContactCheckBox: function () {
    actions.jsClick(newCustomerSameAsOrderingContactCheckBox, "Same As Ordering Contact CheckBox")
    Short_Wait()
  },

  clickOnSameAsInvoicingContactCheckBox: function () {
    actions.jsClick(newCustomerSameAsInvoicingContactCheckBox, "Same As Invoicing Contact CheckBox")
    Short_Wait()
  },

  verifyMakeDefaultInvoiceingContactCheckBox: function () {
    actions.verifyElementDisplayed(makeDefaultInvoiceingContactCheckBox, true, "verify uncheck makeDefaultInvoiceingContactCheckBox")
  },

  clickOnSubmitButton: function () {
    actions.jsClick(contactSubmitButton, "Contacts submit Button")
  },

  clickOnNewCustomerSubmitButton: function () {
    actions.jsClick(submitButton, "New Customer submit Button")
    Long_Wait()
  },

  verifyNewCustomerSubmitButton: function () {
    actions.verifyElementDisplayed(submitButton, true, "New Customer submit Button")
  },

  verifyNewCustomerSuccessMsg: function () {
    Medium_Wait()
    actions.verifyElementDisplayed(newBillingAndShippingCustomerSuccessMsg, true, "New Customer success message")
  },

  clickOnOkButton: function () {
    actions.jsClick(okButton, "Ok Button")
  },


  clickOnSameAsOderingContactCheckBox: function () {
    actions.jsClick(sameAsOderingContactCheckBox, "sameAsOderingContactCheckBox")
  },

  validateShippingMethodHeader: function () {
    actions.verifyElementDisplayed(shippingMethodHeader, true, "shipping method header")
  },

  validateCargoInsuranceHeader: function () {
    actions.verifyElementDisplayed(cargoInsuranceHeader, true, "cargo INSURANCE header")
  },

  validateCargoInsuranceCostOnly: function () {
    actions.VerifyElementPresent(CargoInsuranceCostOnly_checkBox, true, "cargoInsuranceCostOnly")
  },

  validateNoCorgoInsurance_chckBox: function () {
    actions.VerifyElementPresent(NoCorgoInsurance_chckBox, true, "NoCorgoInsurance_chckBox")
  },

  validateTaxCode: function () {
    actions.verifyElementDisplayed(taxCode, true, 'taxCode')
  },

  validateTaxExemptYash: function () {
    actions.verifyElementDisplayed(taxExemptYash, true, 'tax Exempt #')
  },

  validateInvoiceTaxExemptYash: function () {
    actions.verifyElementDisplayed(invoiceTaxExemptYash, true, 'Invoice tax Exempt #')
  },

  validateInvoiceTaxExempt: function () {
    actions.verifyElementDisplayed(invoiceTaxExcempt, true, 'tax Exempt')
  },

  validateVerticalMarket: function () {
    actions.GetAttribute(verticalMarket, 'innerText', 'vertical market')
  },
  validateClasification: function () {
    actions.GetAttribute(clasification, 'innerText', 'clasification')
    // Medium_Wait()
    // clasification.getAttribute('innerText').then(function (text) {
    //   reporter.appendTest('Verifying clasification ', 'Verified "' + text + '" is present in customer shipping details screen', "PASS");
    // })
  },

  validatePhone: function () {
    phone.getAttribute("value").then(function (val) {
      reporter.appendTest('Get Attribute', 'Value : ' + val, "PASS");
      if (val) {
        actions.verifyNumberFormat(val, true, 'phone')
      }
    }, function (err) {
      reporter.appendTest('Get Attribute', '', "FAIL");
      expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
    });
  },

  validatePhoneFieldEditable: function () {
    actions.verifyElementDisplayed(phoneEditable, true, 'phone')
  },

  validatePhoneExt: function () {
    phoneExt.getAttribute("value").then(function (val) {
      reporter.appendTest('Get Attribute', " Value : " + val, "PASS");
      if (val) {
        actions.verify2DigitNumberFormat(val, true, 'phone Ext')
      }
    }, function (err) {
      reporter.appendTest('Get Attribute', "", "FAIL");
      expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
    });
  },

  validatePhoneExtFieldEditable: function () {
    actions.verifyElementDisplayed(phoneExtEditable, true, 'phone Ext')
  },

  validateFax: function () {
    fax.getAttribute("value").then(function (val) {
      reporter.appendTest('Get Attribute', "Value : " + val, "PASS");
      if (val) {
        actions.verifyNumberFormat(val, true, 'fax')
      }
    }, function (err) {
      reporter.appendTest('Get Attribute', "Attribute name of fax field : 'value'", "FAIL");
      expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
    });
  },

  validateFaxFieldEditable: function () {
    actions.verifyElementDisplayed(faxEditable, true, 'Fax')
  },

  validateEmail: function () {
    email.getAttribute("value").then(function (val) {
      reporter.appendTest('Get Attribute', "Value : " + val, "PASS");
      if (email) {
        actions.verifyEmailFormat(val, true, 'Email')
      }
    }, function (err) {
      reporter.appendTest('Get Attribute', "", "FAIL");
      expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
    });
  },

  validateEmailFieldEditable: function () {
    actions.verifyElementDisplayed(emailEditable, true, 'Email')
  },

  validateBillingCustomer: function () {
    actions.verifyElementDisplayed(billingCustomer, true, 'billing Customer')
  },

  validateShippingCustomerTitle: function () {
    // Medium_Wait()
    actions.verifyElementDisplayed(shippingCustomerTitle, true, 'Shipping Customer Title')
  },

  validateShippingCustomerTitle: function () {
    Medium_Wait()
    actions.verifyElementDisplayed(shippingCustomerTitle, true, 'Shipping Customer Title')
  },

  validateShippingCustomersNames: function () {
    var flag = false
    element.all(by.xpath("//p[text()='Shipping Customer']/../../following-sibling::div//p")).count().then(function (size) {
      if (size > 0) {
        flag = true
        for (var i = 0; i < size; i++) {
          actions.verifyElementDisplayed(shippingCustomersNames.get(i), true, 'Shipping Customer Name')
        }
      }
      actions.expectToEqual(flag, true, "Shipping Customer Name")
    });
  },

  validateShippingCustomersAddresses: function () {
    var flag = false
    element.all(by.xpath("//p[text()='Shipping Customer']/../../following-sibling::div//address")).count().then(function (size) {
      if (size > 0) {
        flag = true
        for (var i = 0; i < size; i++) {
          actions.verifyElementDisplayed(shippingCustomersAddresses.get(i), true, 'Shipping Customer Address')
        }
      }
      actions.expectToEqual(flag, true, "Shipping Customer Address")
    });
  },

  validateShippingCustomersCodes: function () {
    var flag = false
    element.all(by.xpath("//p[text()='Shipping Customer']/../../following-sibling::div//div/span[2]")).count().then(function (size) {
      if (size > 0) {
        flag = true
        for (var i = 0; i < size; i++) {
          actions.verifyElementDisplayed(shippingCustomersCodes.get(i), true, 'Shipping Customer Code')
        }
      }
      actions.expectToEqual(flag, true, "Shipping Customer Code")
    });
  },

  validateInvoicingDetails: function () {
    // Medium_Wait()
    actions.GetAttribute(invoiceDetails, 'value', 'Invoicing Details')
    // invoiceDetails.getAttribute('value').then(function(text){
    //     reporter.appendTest('Verifying Invoicing Details', 'Verified "' + text + '" is present in customer shipping details screen', "PASS");
    // })
  },

  clickOnCustomerBillingRadioButton: function () {
    actions.jsClick(billingRadioButton, "Billing radio button")
  },

  verifyInvoiceDetailsHeader: function () {
    actions.verifyElementDisplayed(invoiceDetailsHeader, true, "Invoice Details Header")
  },

  validateInvoicingTermDropdown: function () {
    actions.GetAttribute(invoiceTermDropdown, 'innerText', 'Invoicing term dropdown')
    Medium_Wait()
    // invoiceTermDropdown.getAttribute('innerText').then(function (text) {
    //   reporter.appendTest('Verifying Invoicing term dropdown', 'Verified "' + text + '" is present in customer Billing details screen', "PASS");
    // })
  },

  validateLocBox: function () {
    actions.verifyElementDisplayed(locBox, true, 'locBox')
  },

  validateEMailInvoiceTo: function () {
    actions.verifyElementDisplayed(emailInvoiceTo, true, 'emailInvoiceTo')
  },

  validateCCEMail: function () {
    actions.verifyElementDisplayed(ccEmail, true, 'ccEmail')
  },

  validateBillingDetailsOptions: function () {
    actions.verifyElementDisplayed(sameAsShipping, true, "same as shipping radio button")
    actions.verifyElementDisplayed(addNewDetails, true, "add new details radio button")
    actions.verifyElementDisplayed(useExistingBillingCustomer, true, "use existing billing customer radio button")
  },

  clickOnsameAsShippingRadioButton: function () {
    actions.jsClick(sameAsShipping, "same as shipping radio button")
  },

  clickOnAddNewDetailsRadioButton: function () {
    actions.jsClick(addNewDetails, "add new details radio button")
    Short_Wait()
  },

  clickOnUseExistingBillingCustomerRadioButton: function () {
    actions.jsClick(useExistingBillingCustomer, "Use Existing Billing Customer radio button")
    Short_Wait()
  },

  selectExistingBillingCustomer: function (text) {
    actions.blurText(searchExistingBillingCustomerTextBox, text, "Search Existing Billing Customer")
    actions.jsClick(searchExistingBillingCustomerTextBox, "Search Existing Billing Customer")
    Medium_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
    Short_Wait()
  },

  enterNewCustomerTerms: function (text) {
    actions.blurText(newCustomerTerms, text, "newCustomerTerms")
    actions.PressEnter(newCustomerTerms)
  },
  verifyNewCustomerInvoicePrefrences: function () {
    Short_Wait()
    actions.verifyElementDisplayed(newCustomerPaperBillingAndCheckBox, true, "paperBilling")
    actions.verifyElementDisplayed(newCustomerNoCreditCardAndCheckBox, true, "noCreditCardCheckBox")
  },
  enterNewCustomerLocBox: function (text) {
    actions.Click(newCustomerLocBox, 'locBox drop down')
    Short_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
    reporter.appendTest('Select LocBox', 'Selected LockBox is : ' + text, '')
  },

  validateNewCustomerLocBox: function (text) {
    var selectedLocBox = element(by.xpath("//div[@id='create-customer-lock-box-step03']//div[contains(@class, 'select-field__single-value')]"))
    selectedLocBox.getText().then(function (lockBox) {
      actions.expectToEqual(lockBox, text, 'Selected Lock Box')
    })
  },

  validateNewCustomerLocBoxName: function (text) {
    var selectedLocBoxName = element(by.xpath("//div[@id='create-customer-lock-box-step03']/../../following-sibling::div//p"))
    selectedLocBoxName.getText().then(function (lockBoxName) {
      actions.expectToEqual(lockBoxName, text, 'Selected Lock Box Name')
    })
  },

  verifyCompanyNameField: function () {
    actions.VerifyElementPresent(CompanyNameField, true, "Company Name Field");
    actions.EnterText(CompanyNameField, "Testing", "EnterText")
  },

  verifyMasterCodeField: function () {
    var MasterCodeField = element(by.id("masterCode"))
    actions.VerifyElementPresent(MasterCodeField, true, "MasterCodeField");
    actions.EnterText(MasterCodeField, "Testing", "EnterText")
  },
  verifyShipCode: function () {
    var shipCode = element(by.id('shipCode'))
    actions.VerifyElementPresent(shipCode, true, "ShipCode");
  },

  verifyAddress1Field: function (address1) {
    actions.VerifyElementPresent(Address1Field, true, "Address Field 1");
    actions.blurText(Address1Field, address1, "Address Field 1")
  },

  verifyAddress2Field: function (address2) {
    actions.VerifyElementPresent(Address2Field, true, "Address Field 2");
    actions.blurText(Address2Field, address2, "Address Field 1")
  },

  verifyAddress3Field: function (address3) {
    actions.VerifyElementPresent(Address3Field, true, "Address Field 3");
    actions.blurText(Address3Field, address3, "Address Field 3")
  },

  verifyCityField: function (city) {
    actions.VerifyElementPresent(city_Field, true, "city_Field");
    actions.blurText(city_Field, city, "city_Field")
  },
  verifyZipField: function (zip) {
    actions.VerifyElementPresent(ZipField, true, "ZipField");
    actions.blurText(ZipField, zip, "ZipField")
  },

  verifystate_field: function (state) {
    actions.VerifyElementPresent(state_field, true, "state_field");
    actions.blurText(state_field, state, "state_field")
  },

  verifyContactsDisplayed: function () {
    actions.VerifyElementPresent(firtCustomerName, true, "firtCustomerName"); //because name is mandotor field in contacts
  },

  verifyShippingCustomerName: function () {
    actions.verifyElementDisplayed(shippingCustomerName, true, "shippingCustomerName")
  },

  verifyCustomerTypeOpenedPopup: function (expectedCustomerType) {
    var customerType = element(by.css('[class="customer-name"]+span'))
    customerType.getText().then(function (text) {
      actions.expectToContain(text, expectedCustomerType, "customer type")
    })
  },

  verifycustomerPhone: function () {
    actions.verifyElementDisplayed(shippingCustomerPhone, true, "shippingCustomerPhone")
  },

  verifycustomerMail: function () {
    actions.verifyElementDisplayed(shippingCustomerMail, true, "shippingCustomerMail")
  },

  verifyopenOrdersValue: function () {
    actions.verifyElementDisplayed(shippingCustomerOpenOrderHeader, true, "shippingCustomerOpenOrderHeader")
  },

  verifyrecieveOrdersValue: function () {
    actions.verifyElementDisplayed(shippingCustomerReceivablesHeader, true, "shippingCustomerReceivablesHeader")
  },

  verifyvolumeOrdersValue: function () {
    actions.verifyElementDisplayed(shippingCustomerOrderVolume, true, "shippingCustomerOrderVolume")
  },

  verifyNewContactCardDisplayed: function (newContactName) {
    Medium_Wait()
    var newContactCard = element(by.xpath("//p[text()='" + newContactName + "']/../.."))
    actions.verifyElementDisplayed(newContactCard, true, "New Contact Card")
  },

  clickOnContactCardDropDownButton: function (newContactName) {
    var newContactCardDropDownButton = element(by.xpath("//p[text()='" + newContactName + "']/following-sibling::div/button"))
    actions.Click(newContactCardDropDownButton, 'New Contact Card dropdown button')
  },

  verifyContactCardDropDownItems: function (newContactName) {
    var makeDefaultInvoicingContactItem = element(by.xpath("//p[text()='" + newContactName + "']/following-sibling::div/button/following-sibling::div/button[text()='Make default Invoicing contact']")),
      makeDefaultCollectionContactItem = element(by.xpath("//p[text()='" + newContactName + "']/following-sibling::div/button/following-sibling::div/button[text()='Make default Collection contact']")),
      removeFromThisCustomerItem = element(by.xpath("//p[text()='" + newContactName + "']/following-sibling::div/button/following-sibling::div/button[text()='Remove from this customer']")),
      viewEditContactItem = element(by.xpath("//p[text()='" + newContactName + "']/following-sibling::div/button/following-sibling::div/button[text()='View / Edit Contact']"))
    actions.verifyElementDisplayed(makeDefaultInvoicingContactItem, true, "make Default Invoicing Contact Item")
    actions.verifyElementDisplayed(makeDefaultCollectionContactItem, true, "make Default Collection Contact Item")
    actions.verifyElementDisplayed(removeFromThisCustomerItem, true, "remove From This Customer Item")
    actions.verifyElementDisplayed(viewEditContactItem, true, "view Edit Contact Item")
  },

  validatePaymentMethodsHeader: function () {
    Medium_Wait()
    var paymentMethodsHeader = element(by.xpath("//p[text()='Payment Methods']")),
      noPaymentMethodsHeader = element(by.xpath("//p[text()='No payment methods have been added']"))
    element.all(by.xpath("//p[text()='Payment Methods']")).count().then(function (size) {
      if (size > 0) {
        actions.verifyElementDisplayed(paymentMethodsHeader, true, "Payment Methods Header")
      } else {
        actions.verifyElementDisplayed(noPaymentMethodsHeader, true, "Payment Methods Header")
      }
    });
  },

  validateNewPaymentMethodButton: function () {
    Medium_Wait()
    actions.verifyElementDisplayed(NewPaymentMethodButton, true, "New Payment Method button")
  },

  clickOnNewPaymentMethodButton: function () {
    actions.jsClick(NewPaymentMethodButton, "New Payment Method button")
  },

  enterNameOnAccount: function (num) {
    var nameOnAccountTextBox = element(by.xpath("//label[text()='Name on account']/following-sibling::div/input[@required]"))
    actions.blurText(nameOnAccountTextBox, num, "Name on Account")
  },

  enterAccountNumber: function (num) {
    var accountNumberTextBox = element(by.xpath("//label[text()='Account number']/following-sibling::div/input[@required]"))
    actions.blurText(accountNumberTextBox, num, "Account number")
  },

  enterConfirmAccount: function (num) {
    var confirmAccountTextBox = element(by.xpath("//label[text()='Confirm account #']/following-sibling::div/input[@required]"))
    actions.blurText(confirmAccountTextBox, num, "Confirm Account")
  },

  enterRoutingNumber: function (num) {
    var routingNumberTextBox = element(by.xpath("//label[text()='Routing number']/following-sibling::div/input[@required]"))
    actions.blurText(routingNumberTextBox, num, "Routing Number")
  },

  enterCheckNumber: function (num) {
    var checkNumberTextBox = element(by.id("checkNumber"))
    actions.blurText(checkNumberTextBox, num, "Check Number")
  },

  clickOnPaymentMethodSubmitButton: function () {
    actions.jsClick(paymentMethodSubmitButton, "Payment Methods submit Button")
  },

  validateCreditCardsHeader: function () {
    Medium_Wait()
    var creditCardsHeader = element(by.xpath("//p[text()='Credit Cards']"))
    actions.verifyElementDisplayed(creditCardsHeader, true, "Credit Cards Header")
  },

  validateNewCreditCardButton: function () {
    actions.verifyElementDisplayed(newCreditCardButton, true, "New Credit Card button")
  },

  clickOnNewCreditCardButton: function () {
    actions.Click(newCreditCardButton, "New Credit Card button")
  },

  clickOnUseCustomerBillingAddress: function () {
    actions.Click(newCreditCardButton, "Use Customer Billing address")
  },

  enterAddress: function (text) {
    var creditCardAddressField = element(by.xpath("(//input[@id='addressLine1'])[2]"))
    actions.blurText(creditCardAddressField, text, "Address")
  },

  enterCreditCardAddress2Field: function (text) {
    var creditCardAddress2Field = element(by.xpath("(//input[@id='addressLine2'])[2]"))
    actions.blurText(creditCardAddress2Field, text, "Address")
  },

  enterAddress2Field: function (text) {
    actions.blurText(Address2Field, text, "Address2")
  },

  enterCity: function (text) {
    actions.blurText(city_Field, text, "City")
  },

  enterCreditCardCity: function (text) {
    var creditCardCity = element(by.xpath("(//input[@id='city'])[2]"))
    actions.blurText(creditCardCity, text, "City")
  },

  selectState: function () {
    var stateDropDown = element(by.xpath("//div[text()='Select a state']/.."))
    actions.Click(stateDropDown, "State")
    Short_Wait()
    actions.PressDownArrow()
    Expected_Wait(1)
    actions.PressDownArrow()
    actions.PressEnter()
    Short_Wait()
  },

  selectCountry: function () {
    actions.Click(countryListBox, "Country")
    Short_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
    Short_Wait()
  },

  enterCardNumber: function (text) {
    Medium_Wait()
    actions.blurText(cardNumberTextBox, text, "Card Number")
  },

  enterCardHoldersName: function (text) {
    // var cardHolder = element(by.xpath("(//input[@id='holderName'])[2]"))
    var cardHolder = element(by.id("holderName"))
    actions.blurText(cardHolder, text, "Card Holders Name")
  },

  enterCreditCardHoldersName: function (text) {
    var cardHolder = element(by.xpath("(//input[@id='holderName'])[2]"))
    actions.blurText(cardHolder, text, "Card Holders Name")
  },

  selectMonth: function () {
    var monthDropDown = element(by.xpath("//label[text()='expiration date']/following-sibling::div"))
    actions.Click(monthDropDown, "Month")
    Short_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
    Medium_Wait()
  },

  selectExpiryMonth: function () {
    var monthDropDown = element(by.xpath("(//div[@id='expiresMonth'])[1]"))
    actions.Click(monthDropDown, "Month")
    Short_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
    Medium_Wait()
  },

  selectYear: function () {
    var yearDropDown = element(by.xpath("(//label[text()='expiration date']/../../following-sibling::div)[1]"))
    actions.Click(yearDropDown, "Year")
    Short_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
    Medium_Wait()
  },

  selectExpiryYear: function () {
    var yearDropDown = element(by.xpath("(//div[@id='expiresMonth'])[2]"))
    actions.Click(yearDropDown, "Year")
    Short_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
    Medium_Wait()
  },

  enterSecurityCode: function (text) {
    actions.blurText(securityCode, text, "Security Code")
  },

  clickOnCreditCardSubmitButton: function () {
    actions.Click(creditCardSubmitButton, "Credit Card submit Button")
  },

  verifyAddedNewBankAccount: function (actName) {
    Long_Wait()
    var addedNewAccountName = element(by.xpath("//th[text()='Name on bank account']/../../following-sibling::tbody//td//span[text()='" + actName + "']"))
    actions.verifyElementDisplayed(addedNewAccountName, true, actName)
  },

  verifyAddedNewCreditCard: function (cardName) {
    Long_Wait()
    var addedNewCreditCardName = element(by.xpath("//th[text()='Name on card']/../../following-sibling::tbody//td//span[text()='" + cardName + " ']"))
    actions.verifyElementDisplayed(addedNewCreditCardName, true, cardName)
  },

  hoverOnRepAvathar: function () {
    var repAvathar = element(by.xpath("(//div[@class='avatar avatar_sm '])[1]"))
    actions.MouseHover(repAvathar, 'Rep Avathar')
  },

  verifytoolTipOfRepAvatharOnHover: function () {
    var repAvatharChars = element(by.xpath("(//div[@class='avatar avatar_sm ']/span)[1]")),
      expToolTip,
      repChars = actions.GetText(repAvatharChars, 'Rep Avathar Characters')
    this.hoverOnRepAvathar()
    var actualTooltip = element(by.xpath("//div[@class='tooltip-inner']")).getText()
    switch (repChars) {
      case 'A11':
        expToolTip = 'A4 Promotions/SQUARE ONE 916-361-3682';
        break;

      case 'AFP':
        expToolTip = 'A4 Promo 916-361-3682';
        break;

      default:
        expToolTip = 'Tooltip is not valid.'
        reporter.appendTest('Rep Tooltip', 'Rep Tooltip is not valid', "FAIL");
    };
    actions.expectToEqual(actualTooltip, expToolTip, "Rep Tooltip")
  },
  verifyDownlodedPdfFileName: function (fileName) {
    actions.verifyPDFFileDownloaded_OffShore(fileName)
  },

  clickOnAddPaymentMethodBankTransferOrCreditCard: function () {
    Short_Wait()
    actions.jsClick(addPaymentMethodBankTransferOrCreditCard, '+Add Payment Method / Bank Transfer or Credit Card')
  },

  verifyBankTransferRadioButtonSelectedByDefault: function () {
    Short_Wait()
    actions.verifyElementDisplayed(bankTransferRadioButton, true, 'Bank Transfer Radio Button is selected by default')
  },

  verifyCreditCardRadioButton: function () {
    Short_Wait()
    actions.verifyElementDisplayed(creditCardRadioButton, true, 'Credit Card Radio Button')
  },

  clickOnCreditCardRadioButton: function () {
    Short_Wait()
    actions.Click(creditCardRadioButton, 'Credit Card Radio Button')
  },

  clickOnMakeThisMyDefaultPaymentTypeCheckBox: function () {
    actions.Click(makeThisMyDefaultPaymentTypeCheckBox, 'Make This My Default Payment Type Checkbox')
  },

  enterBankTransferNameOnAccount: function (num) {
    var nameOnAccountTextBox = element(by.xpath("//label[@for='create-customer-name-on-account']/following-sibling::div/input"))
    actions.blurText(nameOnAccountTextBox, num, "Name on Account")
  },

  enterBankTransferAccountNumber: function (num) {
    var accountNumberTextBox = element(by.xpath("//label[@for='create-customer-account-number']/following-sibling::div/input"))
    actions.blurText(accountNumberTextBox, num, "Account number")
  },

  enterBankTransferConfirmAccount: function (num) {
    var confirmAccountTextBox = element(by.xpath("//label[@for='create-customer-confirm-account-number']/following-sibling::div/input"))
    actions.blurText(confirmAccountTextBox, num, "Confirm Account")
  },

  enterBankTransferRoutingNumber: function (num) {
    var routingNumberTextBox = element(by.xpath("//label[@for='create-customer-routing-number']/following-sibling::div/input"))
    actions.blurText(routingNumberTextBox, num, "Routing Number")
  },

  clickOnSameAsBillingAddressAboveCheckBox: function () {
    Short_Wait()
    actions.Click(sameAsBillingAddressAboveCheckBox, 'Same As Billing Address Above CheckBox')
    Short_Wait()
  },

  verifyCreditCardShippingAddress: function (text) {
    var billingAddress = element(by.id("addressLine1"))
    billingAddress.getAttribute('value').then(function (shippingAddress) {
      actions.expectToEqual(shippingAddress, text, "Shipping Address")
    })
  },

  verifyCreditCardCity: function (text) {
    city_Field.getAttribute('value').then(function (city) {
      actions.expectToEqual(city, text, "City")
    })
  },

  verifyCreditCardCompanyState: function (text) {
    stateField.getText().then(function (state) {
      actions.expectToEqual(state, text, "State")
    })
  },

  verifyCreditCardPostalCode: function (text) {
    postalCodeField.getAttribute('value').then(function (postalCode) {
      actions.expectToEqual(postalCode, text, "Postal Code")
    })
  },

  clickOnaddCreditCardDetailsButton: function () {
    actions.Click(addCreditCardDetailsButton, 'Add Credit Card Details Button')
  },

  clickOnSaveCreditCardDetailsButton: function () {
    actions.Click(saveCreditCardDetailsButton, 'Save Credit Card Details Button')
    Long_Wait()
  },

  clickOnCancelCreditCardEntryButton: function () {
    Short_Wait()
    actions.Click(cancelCreditCardEntryButton, 'Cancel Credit Card Entry Button')
  },

  verifyNewCustomerAddedNewCreditCardAccountNum: function (cardNumber) {
    var addedNewAccountNum = element(by.xpath("//div[text()='NAME ON CARD']/../following-sibling::div//div[text()='" + cardNumber + "']"))
    actions.verifyElementDisplayed(addedNewAccountNum, true, 'Credit card account number')
  },

  verifyNewCustomerAddedNewCreditCardName: function (cardName) {
    Long_Wait()
    Long_Wait()
    var addedNewCreditCardName = element(by.xpath("//div[text()='NAME ON CARD']/../following-sibling::div//div[text()='" + cardName + "']"))
    actions.verifyElementDisplayed(addedNewCreditCardName, true, 'Credit card account name')
  },

  verifyNewCustomerAddedNewCreditCardExpiresDate: function () {

    var addedNewExpiryDate = element(by.xpath("(//div[text()='NAME ON CARD']/../following-sibling::div//div[@class='down-lg-none col-sm-6 col-md-3'])[3]"))
    actions.verifyElementDisplayed(addedNewExpiryDate, true, 'Credit card expiry date')
  },

  clickOnListTab: function () {
    actions.Click(ListTab, 'List Tab')
    Short_Wait()
  }

}; 