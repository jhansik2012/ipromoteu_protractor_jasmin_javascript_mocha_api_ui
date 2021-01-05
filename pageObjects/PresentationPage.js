'use strict';

const { access } = require("fs");
const { element, by } = require("protractor");
let lineItemDetailsPage = requirePage('LineItemDetailsPage')


//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
  random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
  PresentaionLink = element(by.xpath('//*[text()="Presentations"]')),
  PresentaionHeader = element(by.xpath("//h1[text()='Presentations']")),
  createPresentaion = element(by.xpath("//button[text()='CREATE PRESENTATION']")),
  QuotesSent = element(by.xpath("//*[text()='Quotes Sent']/following-sibling::span")),
  ingApproval = element(by.xpath("//*[text()='Awaiting Approval']/following-sibling::span")),
  QuotesAccepted = element(by.xpath("//*[text()='Quotes Accepted']/following-sibling::span")),
  typeDropdown = element(by.id("type")),
  creationDateDrop = element(by.xpath("//*[text()='CREATION DATE']/following-sibling::div/div/div/div")),
  salesRep = element(by.xpath("//*[text()='All Sales Rep']")),
  toggleDropDown = element.all(by.xpath("//*[@class='table row']//*[text()='Toggle Dropdown']/..")).get(0),
  presentationList = element.all(by.xpath('//*[@class="table row"]//*[@class="col-12"]/a')),
  searchKeyword = element(by.id('KEYWORD SEARCH')),
  customerNameOrCodeSearchBoxObject = element(by.xpath("//input[@placeholder='Customer Name or Code']/..")),
  customerNameOrCodeSearchTextBox = element(by.xpath("//input[@placeholder='Customer Name or Code']")),
  ExistedCustomerRadioButton = element(by.xpath("//input[@name='customerType' and @checked]/..")),
  customesNamesAutopopulatedListBox = element(by.xpath("//div[@role='prsentations']")),
  shippingCustomersAddress = element(by.xpath("//address")),
  customerTag = element(by.xpath("//address/following-sibling::div/span[1]")),
  customerCode = element(by.xpath('//address/following-sibling::div/span[2]')),
  shippingCustomersName = element(by.xpath("//address/preceding-sibling::p")),
  templateStyleArrowIcon = element(by.xpath("//label[@for='templateStyles']/following-sibling::div//i[text()='arrow_drop_down']")),
  templateStylesDropOptions = element(by.xpath("//label[@for='templateStyles']/following-sibling::div//i[text()='arrow_drop_down']/../../following-sibling::div")),
  addCustomerNameRadioButton = element(by.xpath("//span[text()='Add New Customer']/preceding-sibling::input")),
  companyNameTextBox = element(by.id("company_name")),
  companyNameEditBox = element(by.id("companyName")),
  Address1TextBox = element(by.id("address_line_1")),
  Address1EditBox = element(by.id("address")),
  ContactNameTextBox = element(by.id("contact_name")),
  zipTextBoxNewCust = element(by.id("zip")),
  ContactNameEditBox = element(by.id("contactName")),
  disabledContactNameEditBox = element(by.id("normalcontactName")),
  address2TextBox = element(by.id("address_line_2")),
  address2EditBox = element(by.id("address2")),
  cityTextBox = element(by.id("city")),
  emailTextBox = element(by.xpath("//label[contains(text(),'email')]/following-sibling::div/input")),
  emailEditBox = element(by.id("email")),
  stateObject = element(by.id("state")),
  stateFieldValue = element(by.xpath('//div[@id="state"]/div/div/div[1]')),
  zipTextBox = element(by.id("zipCode")),
  zipEditBox = element(by.id("zipCode")),
  countryReadableTextBox = element(by.xpath("//div[text()='UNITED STATES OF AMERICA']/..")),
  phoneTextBox = element(by.xpath("//label[contains(text(),'phone')]/following-sibling::div/input")),
  phoneExtTextBox = element(by.id("ext")),
  phoneExtEditBox = element(by.id("ext")),
  normalPhoneTextBox = element(by.id("normalphone")),
  faxTextBox = element(by.id("fax")),
  crossButton = element(by.css('.close')),
  alertPopup = element(by.xpath("//div[text()='Alert']/../..")),
  yesButton = element(by.xpath("//button[text()='YES']")),
  noButton = element(by.xpath("//button[text()='NO']")),
  productShowcaseHeader = element(by.xpath("//p[text()='Product Showcase']")),
  presentationQuoteHeader = element(by.xpath("//p[text()='Detailed Quote']")),
  customerNeedBy = element(by.xpath("//span[text()='Customer Need By']/following-sibling::span")),
  expiresOn = element(by.xpath("//span[text()='Expires On']/following-sibling::span")),
  presentationContact = element(by.xpath("//span[text()='Contact']/following-sibling::span")),
  presentationCompany = element(by.xpath("//span[text()='Company']/following-sibling::span")),
  presentationName = element(by.css("[class='d-block company-title']+span")),
  presentationAddress1 = element(by.xpath("//span[text()='Company']/following-sibling::span[2]")),
  presentationPhone = element(by.xpath("//span[text()='Expires On']/../following-sibling::div/span[2]")),
  presentationEmail = element(by.xpath("//span[text()='Expires On']/../following-sibling::div/span[1]")),

  presentationNameEditBox = element(by.id("presentationName")),
  customerNeedsByDateEditBox = element(by.xpath("//div//label[text()='CUSTOMER NEEDS BY']/../../following-sibling::div//input[@id='date_picker_id']")),
  exipirationDateEditBox = element(by.xpath("//div//label[text()='EXPIRATION DATE']/../../following-sibling::div//input[@id='date_picker_id']")),
  presentationIntroTextArea = element(by.xpath("//label[text()='presentation intro']/following-sibling::div//textarea")),
  presentationTermsCondTextArea = element(by.xpath("//label[text()='terms & conditions']/following-sibling::div//textarea")),
  updateButton = element(by.xpath("//button[text()='UPDATE']")),
  okButton = element(by.xpath("//button[text()='OK']")),
  editPresentationHeader = element(by.xpath("//div//h5")),
  requiredText = element(by.css(".invalid-feedback")),
  contactNameRequiredText = element(by.xpath("//input[@id='contactName']/../following-sibling::div[@class='invalid-feedback']")),
  emailRequiredText = element(by.xpath("//input[@id='email']/../following-sibling::div[@class='invalid-feedback']")),
  phoneRequiredText = element(by.xpath("//input[@id='phone']/../following-sibling::div[@class='invalid-feedback']")),
  sendToCustomer = element(by.xpath("//*[text()='SEND TO CUSTOMER']")),
  previewProduct = element(by.xpath("(//p[text()='COLORS']/../..//p[contains(@style,'weight')])[1]")),
  previewProductDesc = element(by.xpath("(//p[text()='COLORS']/../..//p)[2]")),
  previewProductColors = element(by.xpath("//p[text()='COLORS']")),
  affiliateRightPannelImage = element(by.xpath("//img[@alt='logo']")),
  presentationContactNumber = element(by.xpath("//img[@alt='logo']/../../following-sibling::div//p[contains(text(),'9')]")),
  presentationNameInPreviewPage = element(by.css('[class="comments-box"] p[class="presentation-label"]')),
  closePreviewPopup = element(by.css('[class="close"] span')),
  acceptToClose = element(by.xpath("//button[text()='YES']")),
  rejectToClose = element(by.xpath("//button[text()='NO']")),
  presentationDate = element.all(by.css('[class="details-box"] p')).get(1),
  presentationCustomer = element.all(by.css('[class="details-box"] p')).get(2),
  presentationId = element.all(by.css('[class="details-box"] p')).get(3),
  presentationPdf = element.all(by.css('[class="details-box"] p')).get(4),
  presentationOverview = element.all(by.css('[class="details-box"] p')).get(5),
  presentationCommentsBox = element(by.css('[placeholder="Comments"]')),
  presentationCommentName = element(by.css('[placeholder="Name"]')),
  presentationAddCommentButton = element(by.css('[class="add-comment-btn btn btn-secondary"]')),
  presenetationTotalAmount = element.all(by.css('[class="content-section financial-snapshot-section bg-gray bg-foam finance-Backgroound"] p')).get(0),
  presenetationName = element.all(by.css('[class="content-section financial-snapshot-section bg-gray bg-foam finance-Backgroound"] p')).get(0),
  presenetationTermsAndConditions = element(by.css('[for="imprintmethods"]')),
  presentationMainComments = element(by.id("comments")),
  presentationAcceptQuoteButton = element(by.xpath("//button[text()='ACCEPT QUOTE']")),
  convertToQuoteButton = element(by.xpath("//button[text()='CONVERT TO QUOTE']")),
  favouriteObject = element(by.xpath("//i[text()='favorite']/../..")),
  heartShapeObject = element(by.xpath("//i[text()='favorite']")),
  favouritesCount = element(by.xpath("//i[text()='favorite']/following-sibling::span")),
  favouritesItemsList = element.all(by.css(".product-item")),
  firstHeartShape = element(by.xpath("(//article//i[text()='favorite'])[1]")),
  productsTable = element(by.css(".quote-product-table-step1")),
  productTitle = element(by.xpath("//div[@placeholder='Title']")),
  productColorsList = element.all(by.xpath("//div[@class='quote-product-table-step1']//tbody//td[4]//input/../..")),
  productColorsCheckBoxes = element.all(by.xpath("//div[@class='quote-product-table-step1']//tbody//td[4]//input")),
  productList = element.all(by.xpath("//div[@class='quote-product-table-step1']//tbody//td[1]//div")).get(0),
  productSizesList = element.all(by.xpath("//div[@class='quote-product-table-step1']//tbody//td[5]//input/../..")),
  productSizesCheckBoxes = element.all(by.xpath("//div[@class='quote-product-table-step1']//tbody//td[5]//input")),
  emailTextBoxCreatePage = element(by.xpath("//label[contains(text(),'Email')]/following-sibling::div/input")),
  zipTextBoxCreatePage = element(by.id("zip")),
  phoneTextBoxCreatePage = element(by.id("phone")),
  phoneEditBox = element(by.id("phone")), 
  phoneExtTextBoxCreatePage = element(by.id("phone_ext")),
  previousButton = element(by.buttonText('PREVIOUS')),
  convertButton = element(by.buttonText('CONVERT')),
  firstCost = element.all(by.xpath('(//tbody//td[6]//input)')).get(0),
  fisrtPrice = element.all(by.xpath('(//tbody//td[7]//input)')).get(0),
  orderingContactlabel = element(by.xpath('//label[text()="ORDERING CONTACT"]/following-sibling::div')),
  orderingContactValue = element(by.xpath('//label[text()="ORDERING CONTACT"]/following-sibling::div/div/div/div[1]')),
  presentationNumber = element(by.css('[class="d-inline-block job-title"]')),
  detailedQuoteOption = element(by.xpath("//*[text()='Detailed Quote']")),
  // customerCodeOrCompanyField= element(by.xpath("//*[text()='Search Existing Customers']/../../../following-sibling::div[1]//input")),
  customerCodeOrCompanyField = element(by.xpath("//*[text()='Search Existing Customers']/../../../following-sibling::div[1]//input")),
  presentationDetails = { phone: '', email: '', companyName: '', contactName: '' },
  backToPresentation = element(by.xpath("//span[text()='Back to Presentations List']")),
  convertToJobHomeButton = element(by.buttonText('CONVERT TO JOB')),
  convertToJobSubButton = element(by.buttonText('Convert To Job')),
  continueButton = element(by.buttonText('Continue')),
  productArray = [],
  updateLinItemButton = element(by.buttonText('Update Line Items')),
  nextButton = element(by.buttonText('Next')),
  NEXTButton = element(by.buttonText('NEXT')),
  salesRepDrop = element(by.xpath('//label[text()="Sales Rep "]/following-sibling::div')),
  stateDrop = element(by.xpath('//label[text()="state"]/following-sibling::div')),

  sameAsShippingDrop = element(by.id('same as shipping')),
  addNewDetailsDrop = element(by.id('add new details')),
  useExistingBillingCiutomerDrop = element(by.id('use existing billing customer')),
  addChargesSuccessMsg = element(by.xpath("//div[text()='Charges added successfully']")),

  customerNeedsBy = element(by.id('target_date')),
  expireDate = element(by.id('expire_date')),
  introField = element(by.id('intro')),
  termsField = element(by.id('terms')),
  presenetationNameField= element(by.id('preso_name')),
  customerNeedsByDateFieldInEditPage=  element(by.xpath("//label[text()='CUSTOMER NEEDS BY']/../../following-sibling::div//input")),
  expireDateFieldInEditPage=  element(by.xpath("//label[text()='EXPIRATION DATE']/../../following-sibling::div//input")),
  introFieldInEditPage=  element(by.xpath("//label[text()='presentation intro']/following-sibling::div//textarea")),
  termsFieldInEditPage=  element(by.xpath("//label[text()='terms & conditions']/following-sibling::div//textarea")),

  editExistingCustomer=  element(by.xpath("//span[text()='+ Edit existing customer details']")),
  companyNameHeader=  element(by.css('[class="customer-info"] div')),

  companyNameExistCust='',
  conatactNameExistCust='',
  emailExistCust='',
  phoneExistCust='',
  cityExistCust='',
  stateExistCust='',
  phoneExtExistCust='',
  address1ExistCust='',
  address2ExistCust='',
  zipExistCust=''

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
module.exports = {
  /*Used to save application verification data form dynamic verification*/
  specData: {},

  clickOnFirstJob: function () {
    Medium_Wait()
    var firstJob = element.all(by.xpath("//*[@class='d-flex align-items-center flex-nowrap table__row  ']//div//a")).get(0)
    actions.Click(firstJob, "select first job");
    Long_Wait()
    Medium_Wait()
  },
  clickOnPresentationLink: function () {
    actions.Click(PresentaionLink, "Presentation Link")
    Long_Wait()
  },
  verifyPrentationQuoteHeader: function () {
    actions.verifyElementDisplayed(presentationQuoteHeader, true, "Detailed Quote header")
  },
  verifyShowcaseStatus: () => {
    Long_Wait()
    presentationQuoteHeader.isDisplayed().then(function (status) {
      if (status == true) {
        reporter.appendTest("<b>Verifying status<b>", 'Verified that Presentation is converted from "Showcase" to "Quote" successfully', "PASS");
      } else {
        reporter.appendTest("Verifying Element", 'Verified that Presentation is converted from "Showcase" to "Quote" successfully', "FAIL");
        expect(true).toReport(false, "Verifying Element is FAILED for Conversion");
      }
    })
  },
  verifyPrentationHeader: function () {
    actions.verifyElementDisplayed(PresentaionHeader, true, "Presentation Header")
  },
  verifyProductShowcaseHeader: function () {
    actions.verifyElementDisplayed(productShowcaseHeader, true, "Product Showcase Header")
  },
  verifyBackToPreetnationHeader: function () {
    actions.verifyElementDisplayed(backToPresentation, true, " 'Back to presentation list' Link")
  },
  verifyEditPrentationHeader: function () {
    actions.verifyElementDisplayed(editPresentationHeader, true, "Edit Presentation Header")
  },
  verifyCreatePresentationButton: function () {
    actions.verifyElementDisplayed(createPresentaion, true, "Create Presentation button")
  },
  clickCreatePresentationButton: function () {
    reporter.appendTest('<b>Creating new Presentation</b>', '*************', "");
    actions.jsClick(createPresentaion, "Create Presentation button")
    Medium_Wait()
  },
  verifyQuotesStatusSection: function () {
    actions.verifyElementDisplayed(QuotesSent, true, "Quotes Sent")
    actions.verifyElementDisplayed(ingApproval, true, "ing Approval count")
    actions.verifyElementDisplayed(QuotesAccepted, true, "Quotes Accepted Count")
  },
  verifyTableColumns: function (col) {
    var tableColumn = element(by.xpath('//div[@class="table__head flex-nowrap"]//span[text()="' + col + '"]'))
    actions.verifyElementDisplayed(tableColumn, true, col)
  },
  verifykeywordSearch: function () {
    actions.verifyElementDisplayed(keywordSearch, true, "Keyword Search")
  },
  verifyTypeFilter: function () {
    actions.verifyElementDisplayed(typeDropdown, true, "Type Filter")
  },
  verifyDefaultType: function (defaultType = 'Any') {
    var dType = element(by.xpath("//label[text()='type']/following-sibling::div//div[text()='" + defaultType + "']"))
    actions.verifyElementDisplayed(dType, true, defaultType)
  },

  verifyDefaultCreationDate: function (defaultDate = 'Last 12 Months') {
    var dDate = element(by.xpath("//label[text()='CREATION DATE']/following-sibling::div//div[text()='" + defaultDate + "']"))
    actions.verifyElementDisplayed(dDate, true, defaultDate)
  },
  veifyDefaultSalesRep: function (defaultSalesRep = 'All Sales Rep') {
    var dRep = element(by.xpath("//label[text()='Sales Rep']/following-sibling::div//div[text()='" + defaultSalesRep + "']"))
    actions.verifyElementDisplayed(dRep, true, defaultSalesRep)
  },
  clickOntypeFilter: function () {
    actions.Click(typeDropdown, "Type Dropdown")
  },
  clikOnCreatedDateFilter: function () {
    actions.Click(creationDateDrop, "Creation Date Dropdown")
  },
  verifyTypeDropOptions: function (option) {
    var opt = element(by.xpath("//label[text()='type']/following-sibling::div//*[text()='" + option + "']"))
    actions.verifyElementDisplayed(opt, true, option)
  },
  verifyCreationDateOptions: function (option) {
    var opt = element(by.xpath("//label[text()='CREATION DATE']/following-sibling::div//*[text()='" + option + "']"))
    actions.verifyElementDisplayed(opt, true, option)
  },

  clickOnDetailedQuote: () => {
    reporter.appendTest('<b>Selecting "Detailed Quote" as a Template Style</b>', '*************', "");
    actions.jsClick(detailedQuoteOption, "Detailed Quote")
  },

  clickOnelipseDrop: function () {
    actions.jsClick(toggleDropDown, "Toggle DropDown")
  },

  clickOnViewDetails: function () {
    var view = element(by.buttonText('View Details'))
    actions.jsClick(view, 'View details')
  },

  clickOnPreviewPresentation: function () {
    var preview = element(by.buttonText('PREVIEW'))
    actions.Click(preview, 'PREVIEW')
    Long_Wait()
  },

  validatePresentationPreviewRightPannel: function () {
    Medium_Wait()
    actions.verifyElementDisplayed(affiliateRightPannelImage, true, "affiliateRightPannelImage")
  },

  validateContactPhoneDetails: function () {
    actions.verifyElementDisplayed(presentationContactNumber, true, "presentationContactNumber")
  },

  validateTotalAmount: function () {
    presenetationTotalAmount.getAttribute('value').then(function (amount) {
      reporter.appendTest('Validate Total Amount ', 'Validated Total Amount:' + amount, "PASS");
    })
    actions.verifyElementDisplayed(presenetationTotalAmount, true, "presenetationTotalAmount")
  },

  validatePresentatonName: function () {
    presenetationName.getAttribute('value').then(function (name) {
      reporter.appendTest('Validate pesentation Name is displayed', 'Validated pesentation Name:' + name, "PASS");
    })
    actions.verifyElementDisplayed(presenetationName, true, "presenetationName")
  },

  enterPresentationComments: function () {
    actions.blurText(presentationMainComments, "presentationComments")
  },

  validateTermsAndConditions: function () {
    presenetationTermsAndConditions.getAttribute('value').then(function (terms) {
      reporter.appendTest('Validate Terms and Conditions ', 'Validated Terms and Conditions:' + terms, "PASS");
    })
    actions.verifyElementDisplayed(presenetationTermsAndConditions, true, "presenetationTermsAndConditions")
  },

  clickOnAcceptCheckBox: function () {
    actions.jsClick(presenetationTermsAndConditions, "presenetationTermsAndConditions")
  },

  clickOnAcceptQuoteButton: function () {
    actions.jsClick(presenetationTermsAndConditions, "presenetationTermsAndConditions")
  },

  validateProductDisplay: function () {
    actions.verifyElementDisplayed(previewProduct, true, "previewProduct")
  },

  validateProductDescDisplay: function () {
    actions.verifyElementDisplayed(previewProductDesc, true, "preview Product Description")
  },

  validateCommentsSection: function () {
    actions.verifyElementDisplayed(presentationCommentsBox, true, "presentationCommentsBox")
  },
  enterComments: function (text) {
    actions.blurText(presentationCommentsBox, text, "presentationCommentsBox")
  },
  enterCommentName: function (text) {
    actions.blurText(presentationCommentName, text, "presentationCommentName")
  },
  validateProductColorsDisplay: function () {
    actions.verifyElementDisplayed(previewProductColors, true, "preview Product Colors")
  },
  clickOnAddCommentButton: function () {
    actions.jsClick(presentationAddCommentButton, "presentationAddCommentButton")
  },
  validatePricing: function () {
    var pricingInfo = element(by.xpath("//p[text()='PRICING']"))
    actions.verifyElementDisplayed(pricingInfo, true, "pricingInfo")
  },

  validatePrice: function () {
    var price = element(by.xpath("//th[text()='PRICE']"))
    actions.verifyElementDisplayed(price, true, "price")
  },

  validateCharges: function () {
    var pricingInfo = element(by.xpath("//*[text()='PRICING']"))
    actions.verifyElementDisplayed(pricingInfo, true, "pricingInfo")
  },
  clickOnArrowButton: async () => {
    var arrowButton = await element.all(by.css('polyline'))
    Short_Wait()
    if (arrowButton.count() > 1) {
      actions.jsClick(arrowButton.get(1), "arrowButton")
    }
  },
  clickOnSendToCustomer: function () {
    actions.jsClick(sendToCustomer, 'sendToCustomer')
  },
  validatePresentationNameInPreviewPage: function () {
    actions.verifyElementDisplayed(presentationNameInPreviewPage, true, "presentationNameInPreviewPage")
    actions.jsClick(closePreviewPopup, "closePreviewPopup")
    actions.jsClick(acceptToClose, "acceptToClose")
  },
  validatePresentationDate: function () {
    presentationDate.getAttribute('value').then(function (date) {
      reporter.appendTest('Validate Presentation Date', 'Validated presentation date: ' + date, "PASS");
    })
    actions.verifyElementDisplayed(presentationDate, true, "presentationDate")
  },
  validatePresentationShippingCustomer: function () {
    presentationCustomer.getAttribute('value').then(function (customer) {
      reporter.appendTest('Validate Shipping Customer Name', 'Validated Shipping Customer Name:  ' + customer, "PASS");
    })
    actions.verifyElementDisplayed(presentationCustomer, true, "presentationCustomer")
  },
  valiatePresentationId: function () {
    presentationId.getAttribute('value').then(function (id) {
      reporter.appendTest('Validate Presentation Id ', 'Validated Presentation Id :  ' + id, "PASS");
    })
    actions.verifyElementDisplayed(presentationId, true, "presentationId")
  },
  valiatePresentationPDFDownload: function () {
    presentationPdf.getAttribute('value').then(function (pdf) {
      reporter.appendTest('Validate Download PDF ', 'Validated Download PDF :' + pdf, "PASS");
    })
    actions.verifyElementDisplayed(presentationPdf, true, "presentationPdf")
  },
  clickOnDownloadPdf: function () {
    actions.Click(presentationPdf, "presentationPdf")
  },
  validateDownloadedPdf: function () {
    Medium_Wait()
    actions.verifyPDFFileDownload_OffShore()
  },
  valiatePresentationOverview: function () {
    presentationOverview.getAttribute('value').then(function (overview) {
      reporter.appendTest('Validate Overview', 'Validated Overview:  "' + overview, "PASS");
    })
    actions.verifyElementDisplayed(presentationOverview, true, "presentationOverview")
  },
  clickOnExitPresentation: function () {
    Medium_Wait()
    var previewExit = element(by.css('[class="modal-title"] p'))
    actions.jsClick(previewExit, 'Preview Exit')
  },
  clickOnCopyPresentation: function () {
    var copy = element(by.buttonText('Copy Presentation'))
    actions.jsClick(copy, 'Copy Presentation')
  },
  clickOnArchive: function () {
    var Archive = element(by.buttonText('Archive'))
    actions.jsClick(Archive, 'Archive')
  },

  verifyListAfterTypeFilter: function (type, upType) {
    //    actions.Click(typeDropdown,"Type Dropdown")
    Medium_Wait()
    var ele = element(by.xpath('//*[text()="' + type + '"]'))
    actions.Click(ele, type) // with .toUpperCase() its not working
    var typeBadge = element.all(by.xpath('//*[@class="table row"]//span[text()="' + upType + '"]')).get(1) //since the list is large validating only first result
    actions.verifyElementDisplayed(typeBadge, true, "")
  },

  selectShowcaseType: function () {
    var ele = element(by.xpath("//div[text()='Showcase']"))
    actions.Click(ele, 'ShowCase')
  },

  selecQuoteType: function () {
    var ele = element(by.xpath("//*[text()='Quote']"))
    actions.Click(ele, 'Quote')
  },

  validateKPI: function (kpi) {
    var ele = element(by.xpath('//p[text()="' + kpi + '"]'))
    actions.verifyElementDisplayed(ele, true, "KPI header")
  },

  clickOntypeFilter: function () {
    actions.Click(typeDropdown, "Type Dropdown")
  },

  selectTypeDropOptions: function (option) {
    var opt = element(by.xpath("//label[text()='type']/following-sibling::div//*[text()='" + option + "']"))
    actions.verifyElementDisplayed(opt, true, option)
  },

  enterSearchKeyword: function (keyword) {
    actions.blurText(searchKeyword, keyword, "key word")
  },

  enterSalesRepDropOption: function (option) {
    var opt = element(by.xpath("//label[text()='Sales Rep']/following-sibling::div//*[text()='" + option + "']"))
    actions.verifyElementDisplayed(opt, true, option)
  },

  clickOnElipseIcon: function () {
    var elem = element(by.xpath("(//span[text()='Toggle Dropdown']/..)[1]"))
    actions.jsClick(elem, "icon")
  },

  verifyToggleDropOption: function (option) {
    var opt = element(by.xpath("(//span[text()='Toggle Dropdown']/../following-sibling::div//a[text()='" + option + "'])[1]"))
    actions.verifyElementDisplayed(opt, true, option)
  },

  clickOnToggleDropOption: function (option) {
    var elem = element(by.xpath("(//span[text()='Toggle Dropdown']/../following-sibling::div//a[text()='" + option + "'])[1]"))
    actions.jsClick(elem, "View Details option")
  },

  verifyObjectDisplayed: function (option, type = '') {
    var ele = element(by.xpath('//*[text()="' + option + '"]'))
    actions.verifyElementDisplayed(ele, true, option + type)
  },

  verifyTextBoxDisplayed: function (option) {
    actions.verifyElementDisplayed(orderingContact, true, option)
  },

  printDisplayedOrderingContactValue: () => {
    actions.GetElementText(orderingContactValue, "Ordering Contact")
  },

  verifyRequiredText: function () {
    actions.verifyElementDisplayed(requiredText, true, "<b>Required</b>")
  },
  verifyContactNameRequiredText: function () {
    actions.verifyElementDisplayed(contactNameRequiredText, true, "<b>Required</b>")
  },
  verifyEmailRequiredText: function () {
    actions.verifyElementDisplayed(emailRequiredText, true, "<b>Required</b>")
  },
  verifyPhoneRequiredText: function () {
    actions.verifyElementDisplayed(phoneRequiredText, true, "<b>Required</b>")
  },
  verifyCustomerCodeOrNameSearchBox: function () {
    actions.verifyElementDisplayed(customerNameOrCodeSearchBoxObject, true, 'Customer Name or Code search box')
  },

  verifySearchExistingCustomersRadioButtonIsChecked: function () {
    actions.verifyElementDisplayed(ExistedCustomerRadioButton, true, 'Existed customer is checked by default.')
  },

  clickOnNewCustomersRadioButton: function () {
    actions.jsClick(addCustomerNameRadioButton, 'New customer option')
  },

  enterCustomerCodeOrNameInSearchBox: function (codeOrName) {
    reporter.appendTest('<b>Selecting Existing Customer</b>', '*************', "");
    actions.blurText(customerNameOrCodeSearchTextBox, codeOrName, 'Customer Name or Code search box')
    Long_Wait()
    actions.PressDownArrow()
    actions.PressEnter()
    Long_Wait()
  },

  getCustomerFieldValue: (element, field) => {
    actions.GetFieldValue(customerCodeOrCompanyField, "Customer name or Code")
  },

  verifyCustomersAutopopultedListBox: function () {
    actions.verifyElementDisplayed(customesNamesAutopopulatedListBox, true, 'Customer Name or Code auto populated list box')
  },

  verifyCustomersShippingCustomersAddress: function () {
    this.printDispalyedCustomerTag()
    this.verifyCustomerName()
  },

  printDispalyedCustomerTag: () => {
    actions.GetElementText(customerTag, "Customer type")
  },

  //This verifies weather the dispalyed shipping customer Name and customer name present in the Search field
  verifyCustomerName: () => {
    shippingCustomersName.getText().then(function (customerNameInBox) {
      customerCodeOrCompanyField.getAttribute('value').then(function (customerNameInField) {
        customerNameInField = customerNameInField.split('--')[1].trim()
        customerNameInBox = customerNameInBox.trim();
        actions.expectToContainCustom(customerNameInField, customerNameInBox, "Customer Name in details section ", 'Selected Customer name', 'Displayed Customer name')
      }, function (err) {
        reporter.appendTest('Verifying ', 'Verifying "Customer Name" failed', "FAIL");
        expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
      })
    }, function (err) {
      reporter.appendTest('Verifying ', 'Verifying "Customer Name" failed', "FAIL");
      expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
    })
  },
  validateCustomerNeedByValue: function () {
    Medium_Wait()
    actions.verifyElementDisplayed(customerNeedBy, true, "Customer need By")
    customerNeedBy.getText().then(function (text) {
      reporter.appendTest('Validate Customer need By value', 'Customer Need By date is displayed, if not entered it will be empty :  "' + text + '"', "PASS");
    })
  },

  validateCustomerExpireOn: function () {
    Medium_Wait()
    actions.verifyElementDisplayed(expiresOn, true, "Drug Name")
    expiresOn.getText().then(function (text) {
      reporter.appendTest('Validate expiresOn value', 'Customer expiresOn date is displayed, if not entered it displayed as empty :  "' + text + '"', "PASS");
    })
  },

  validatePresentationName: function () {
    Medium_Wait()
    actions.verifyElementDisplayed(presentationName, true, "Presentation Name")
    presentationName.getText().then(function (text) {
      reporter.appendTest('Validate the Presentation Name', 'Presentation name is displayed :  "' + text + '"', "PASS");
    })
  },
  validatePresentationDetails: function () {
    Medium_Wait()
    actions.verifyElementDisplayed(presentationContact, true, "presentationContact")
    presentationContact.getText().then(function (text) {
      reporter.appendTest('Validate Contact details', 'Contact Name, Email and Phone no details are displayed: "' + text + '"', "PASS");
    })
  },
  validateCompanyDetails: function () {
    Medium_Wait()
    actions.verifyElementDisplayed(presentationCompany, true, "presentationCompany")
    presentationCompany.getText().then(function (text) {
      reporter.appendTest('Validate company details', 'company details are displayed: "' + text + '"', "PASS");
    })
  },

  clickOnNextButton: function () {
    var ele = element(by.xpath("//*[text()='Next']"))
    actions.jsClick(ele, 'Next Button')
    Medium_Wait()
  },

  clickOnPreviousButton: function () {
    var ele = element(by.xpath("//*[text()='Previous']"))
    actions.jsClick(ele, 'Previous Button')
    reporter.appendTest('<b>Verifying<b>', 'Weather the user is able to navigate to previous tab or not', "PASS");
  },

  clickOnTempleStyleArrowIcon() {
    templateStyleArrowIcon.click()
  },

  verifytemplateStylesDropOptions: function () {
    actions.verifyElementDisplayed(templateStylesDropOptions, true, "Template Styles dropdown options")
    templateStyleArrowIcon.click()
  },

  enterPresentationName: function (option) {
    var ele = element(by.xpath('//label[text()="' + option + '"]/following-sibling::div/input'))
    var currentDate = new Date(),
      dd = currentDate.getDate() + 2,
      mm = currentDate.getMonth() + 1, //as January is 0
      yyyy = currentDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }
    var date = mm + '/' + dd + '/' + yyyy;
    option = option + '-' + date;

    actions.blurText(ele, option, "Presentation Name")
  },
  enterNewPresentationName: function (presenetationName) {
    actions.blurText(presenetationNameField, presenetationName, "Presentation Name")
  },

  updatePresentationName: function (presentationName) {
    // let date= new Date() 
    // global.presentationName= presentationName+ (date.toLocaleTimeString()).split(' ')[0]
    global.presentationName = presentationName
    actions.blurText(presentationNameEditBox, presentationName, "Update presentation name")
  },
  updateNewPresentationName: function (presentationName) {
    actions.blurText(presentationNameEditBox, presentationName, "Presentation Name Field")
  },
  selectPresentationDate: function (option) {
    var currentDate = new Date(),
      dd = currentDate.getDate() + 2,
      mm = currentDate.getMonth() + 1, //as January is 0
      yyyy = currentDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    var date = mm + '/' + dd + '/' + yyyy
    var ele = element(by.xpath('//label[text()="' + option + '"]/following-sibling::div//input'))
    actions.blurText(ele, date, option)
  },

  selectCustomerNeedsByDate: function (date) {
    actions.blurText(customerNeedsBy, date, "Customer Needs By")
  },
  selectExpireDate: function (date) {
    actions.blurText(expireDate, date, "Expire Date")
  },

  selectExpirationDate: function (option) {
    var currentDate = new Date(),
      dd = currentDate.getDate() + 10,
      mm = currentDate.getMonth() + 1, //as January is 0
      yyyy = currentDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }
    var date = mm + '/' + dd + '/' + yyyy
    var ele = element(by.xpath('//label[text()="' + option + '"]/following-sibling::div//input'))
    actions.blurText(ele, date, option)
  },

  updatePresentationDate: function (option) {
    var currentDate = new Date(),
      dd = currentDate.getDate() + 3,
      mm = currentDate.getMonth() + 1, //as January is 0
      yyyy = currentDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }
    var date = mm + '/' + dd + '/' + yyyy,
      ele = element(by.xpath('//label[text()="CUSTOMER NEEDS BY"]/../../following-sibling::div//input'))
    actions.blurText(ele, date, option)
    actions.PressEnter()
  },

  updateExpirationDate: function (option) {
    var currentDate = new Date(),
      dd = currentDate.getDate() + 11,
      mm = currentDate.getMonth() + 1, //as January is 0
      yyyy = currentDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }
    var date = mm + '/' + dd + '/' + yyyy,
      ele = element(by.xpath('//label[text()="EXPIRATION DATE"]/../../following-sibling::div//input'))
    actions.blurText(ele, date, option)
    actions.PressEnter()
  },

  verifyPresentationIntroFieldAllowAlphanumaricAndSpecialChar: function () {
    var ele = element(by.xpath("//label[text()='Presentation Intro']/following-sibling::div/textarea"))
    lineItemDetailsPage.verifytextboxAllownumericAndSpecialchar(ele, "Presentation intro")
  },

  updatePresentationIntroField: function (intro) {
    actions.blurText(presentationIntroTextArea, intro, "Update presentation intro")
  },

  updatePresentationTermsAndConditionsField: function (intro) {
    actions.blurText(presentationTermsCondTextArea, intro, "Update presentation Termsand condition")
  },

  verifyTermsAndConditionsFieldAllowAlphanumaricAndSpecialChar: function () {
    var ele = element(by.xpath("//label[text()='Terms & Conditions']/following-sibling::div/textarea"))
    lineItemDetailsPage.verifytextboxAllownumericAndSpecialchar(ele, "Terms & Conditions")
  },

  enterCompanyName: function (companyName) {
    actions.blurText(companyNameTextBox, companyName, 'Company Name')
  },

  enterAddress: function (address1) {
    actions.blurText(Address1TextBox, address1, 'Address')
  },

  enterContactName: function (contactName) {
    actions.blurText(ContactNameTextBox, contactName, 'Contact Name')
  },

  enterZipCode: function (zip) {
    actions.blurText(zipTextBox, zip, 'Zip')
  },
  enterZipCodeNewCustomer: function (zip) {
    actions.blurText(zipTextBoxNewCust, zip, 'Zip')
  },

  enterAddress2: function (address2) {
    actions.blurText(address2TextBox, address2, 'Address 2')
  },

  entercity: function (city) {
    actions.blurText(cityTextBox, city, 'City')
  },

  enterEmail: function (email) {
    global.email = email
    actions.blurText(emailTextBox, email, 'Email')
  },

  enterEmailCreatePage: function (email) {
    global.email = email
    actions.blurText(emailTextBoxCreatePage, email, 'Email')
  },

  enterPhone: function (phone) {
    global.phone = phone
    actions.blurText(phoneTextBox, phone, 'phone')
  },

  enterPhoneCreatePage: function (phone) {
    global.phone = phone
    actions.blurText(phoneTextBoxCreatePage, phone, 'phone')
  },

  enterPhoneExt: function (phoneExt) {
    actions.blurText(phoneExtTextBox, phoneExt, 'phone ext')
  },

  enterPhoneExtCreatePage: function (phoneExt) {
    actions.blurText(phoneExtTextBoxCreatePage, phoneExt, 'phone ext')
  },
  

  enterFax: function (fax) {
    actions.blurText(faxTextBox, fax, 'Fax')
  },

  enterZip: function (zip) {
    actions.blurText(zipTextBox, zip, 'Zip')
  },

  enterZipCreatePage: function (zip) {
    actions.blurText(zipTextBoxCreatePage, zip, 'Zip')
  },

  enterState: function (state= 'Alaska') {
    actions.Click(stateObject, 'State dropdown')
    Short_Wait()
    let statElement= element(by.xpath("//div[text()='"+state+"']"))
    actions.Click(statElement, state)
  },

  clickOnXButton: function () {
    actions.jsClick(crossButton, 'Close(X) button')
  },
  updateCompanyName: function (companyName) {
    actions.blurText(companyNameEditBox, companyName, 'Company Name')
  },
  updateAddress: function (address1) {
    actions.blurText(Address1EditBox, address1, 'Address')
  },
  updateContactName: function (contactName) {
    actions.blurText(ContactNameEditBox, contactName, 'Contact Name')
  },
  updateAddress2: function (address2) {
    actions.blurText(address2EditBox, address2, 'Address 2')
  },
  updateEmail: function (email) {
    actions.blurText(emailTextBox, email, 'Email')
  },
  updateState: function (state= 'Alaska') {
    actions.Click(stateObject, 'State dropdown')
    Short_Wait()
    let statElement= element(by.xpath("//div[text()='"+state+"']"))
    actions.Click(statElement, state)
  },
  updateZip: function (zip) {
    actions.blurText(zipEditBox, zip, 'Zip')
  },
  updatePhoneExt: function (phoneExt) {
    actions.blurText(phoneExtEditBox, phoneExt, 'phone ext')
  },
  updatecity: function (city) {
    actions.blurText(cityTextBox, city, 'City')
  },
  updatePhone: function (phone) {
    actions.blurText(phoneEditBox, phone, 'Phone')
  },

  clickOnUpdateButton: function () {
    actions.jsClick(updateButton, 'Update button')
    Long_Wait()
  },
  clickOnOkButton: function () {
    actions.jsClick(okButton, 'OK button')
    Long_Wait()
  },
  verifyAlertPopup: function () {
    actions.verifyElementDisplayed(alertPopup, true, 'Alert Popup')
  },

  verifyAlertPopupMessage: function (ExpMessage) {
    element(by.css('.modal_popup__body')).getText().then(popUpMsg => {
      actions.expectToEqualCustom(popUpMsg, ExpMessage, "Alert Pop Up message", "Displayed Alert message", "Expected Alert message")
    }, function (error) {
      reporter.appendTest('Verifying Pop Up', 'Failed while Verifying Displayed message is same as Expected message', "FAIL");
    })
  },

  verifyYesButtonInPopup: function () {
    actions.verifyElementDisplayed(yesButton, true, 'Yes button in Alert popup')
  },

  verifyNoButtonInPopup: function () {
    actions.verifyElementDisplayed(noButton, true, 'No button in Alert popup')
  },

  clickOnYesButtonInPopup: function () {
    actions.jsClick(yesButton, 'Yes button in Alert popup')
  },

  clickOnNoButtonInPopup: function () {
    actions.jsClick(noButton, 'No button in Alert popup')
  },

  getContactCompanyDetails: function () {
    ContactNameEditBox.getAttribute('value').then(function (text) {
      presentationDetails.contactName = text;
    });
    companyNameEditBox.getAttribute('value').then(function (text) {
      presentationDetails.companyName = text;
    });
    emailTextBox.getAttribute('value').then(function (text) {
      presentationDetails.email = text;
    });
    phoneTextBox.getAttribute('value').then(function (text) {
      presentationDetails.phone = text;
    });
  },

  getContactName: function () {
    ContactNameEditBox.getAttribute('value').then(function (text) {
      presentationDetails.contactName = text;
    });
  },

  getCompanyName: function () {
    companyNameEditBox.getAttribute('value').then(function (text) {
      presentationDetails.companyName = text;
    });
  },

  getEmail: function () {
    emailTextBox.getAttribute('value').then(function (text) {
      presentationDetails.email = text;
    });
  },

  getPhone: function () {
    phoneTextBox.getAttribute('value').then(function (text) {
      presentationDetails.phone = text;
    });
  },

  verifyContactName: function (contactName) {
    actions.GetFieldValueAndCompareToBeEqual(ContactNameEditBox,contactName, "Contact Name", "Contact Name Displayed", "Contact Name given while creating presentation")
  },
  verifyCompanyName: function (companyName) {
    actions.GetFieldValueAndCompareToBeEqual(companyNameEditBox,companyName, "Company Name", "Company Name Displayed", "Company Name given while creating presentation")
  },
  verifyPhone: function (phone) {
    actions.GetFieldValueAndCompareToBeEqual(phoneEditBox,phone, "Phone Number", "Phone Number Displayed", "Phone Number given while creating presentation")
  },
  verifyEmail: function (email) {
    actions.GetFieldValueAndCompareToBeEqual(emailEditBox,email, "Email", "Email Displayed", "Email given while creating presentation")
  },
  verifyState: function (state) {
    actions.GetTextAndCompareToBeEqual(stateFieldValue,state, "State", "State Displayed", "State given while creating presentation")
  },
  verifyZip: function (zip) {
    actions.GetFieldValueAndCompareToBeEqual(zipEditBox,zip, "Zip", "Zip Displayed", "Zip given while creating presentation")
  },
  verifyPhoneExt: function (phoneExt) {
    actions.GetFieldValueAndCompareToBeEqual(phoneExtEditBox,phoneExt, "Phone Ext", "Phone Ext Displayed", "Phone Ext given while creating presentation")
  },
  verifyAddress: function (address1) {
    actions.GetFieldValueAndCompareToBeEqual(Address1EditBox,address1, "Address1", "Address1 Displayed", "Address1 given while creating presentation")
  },
  verifyAddress2: function (address2) {
    actions.GetFieldValueAndCompareToBeEqual(address2EditBox,address2, "Address2", "Address2 Displayed", "Address2 given while creating presentation")
  },
  verifyCity: function (city) {
    actions.GetFieldValueAndCompareToBeEqual(cityTextBox,city, "City", "City Displayed", "City given while creating presentation")
  },

  clickOnButton: function (name) {
    var ele = element(by.xpath("//*[text()='" + name + "']"))
     actions.jsClick(ele, name + " button")
     Long_Wait()
  },
  verifyConvertToQuoteButton: function () {
    actions.verifyElementDisplayed(convertToQuoteButton, true, 'Convert to quote button')
  },
  clickOnConvertToQuoteButton: function () {
    reporter.appendTest('<b>Converting Showcase to Quote</b>', '*************', "");
    actions.jsClick(convertToQuoteButton, 'Convert to quote button')
  },
  verifyProductsTable: function () {
    actions.verifyElementDisplayed(productsTable, true, 'Products table')
  },

  verifyProductTitle: function () {
    actions.verifyElementDisplayed(productTitle, true, 'Product Title')
  },

  verifyProductColors: function () {
    productColorsList.count().then(function (size) {
      if (size > 0)
        reporter.appendTest('Verifying Color options</b>', 'Verified color options for products', "");
    });
  },

  verifyProductSizes: function () {
    productSizesList.count().then(function (size) {
      if (size > 0)
        reporter.appendTest('Verifying Size options</b>', 'Verified Size options for products', "");
    });
  },

  verifyProductColorsCheckBoxes: function () {
    var flag = false
    productColorsCheckBoxes.count().then(function (size) {
      if (size > 0)
        flag = true
      actions.expectToEqual(flag, true, "product colors")
    });
  },

  clickOnProductCheckBox: function () {
    actions.jsClick(productList, 'Product checkbox')
  },

  clickOnProductColorsCheckBox: function () {
    actions.jsClick(productColorsCheckBoxes.get(0), 'Colors checkbox')
  },

  clickOnProductSizeCheckBox: function () {
    actions.jsClick(productSizesList.get(0), 'Size checkbox')
  },

  verifyProductSizesCheckBoxes: function () {
    var flag = false
    productSizesCheckBoxes.count().then(function (size) {
      if (size > 0)
        flag = true
      actions.expectToEqual(flag, true, "product sizes")
    })
  },

  clickOnProductSizeCheckBox: function () {
    actions.jsClick(productSizesCheckBoxes.get(o), 'Size checkbox')
  },

  verifyFavouriteBar: function () {
    actions.verifyElementDisplayed(favouriteObject, true, "Favourite Bar")
  },

  clickOnFavouriteBar: function () {
    actions.Click(favouriteObject, "Favourite Bar")
  },

  verifyFavouriteHeartShape: function () {
    actions.verifyElementDisplayed(heartShapeObject, true, "Favourite Heart shape")
  },

  verifyFavouritesCount: function () {
    actions.verifyElementDisplayed(favouritesCount, true, "Favourite Count")
  },

  verifyFavouriteProductsList: function () {
    var favouritesProductsListCount = favouritesItemsList.count()
    if (favouritesProductsListCount > 0) {
      reporter.appendTest('Verify favourite products list displayed', 'Favourite Products list: ' + favouritesProductsListCount, "PASS");
    } else {
      reporter.appendTest('Verify favourite products list is not displayed', 'Favourite Products list: ' + favouritesProductsListCount, "FAIL");
    }
  },

  clickOnHeartShapeAndVerifyColorFavouritesCountIncreaseWith1: function (color) {
    var count_before_select = actions.GetText(favouritesCount, "Favourite Count")
    var heartShapColor_before_select = actions.GetElementColor(firstHeartShape, 'First Heart shape color')
    actions.jsClick(firstHeartShape, 'First Heart shape')
    Long_Wait()
    var count_after_select = actions.GetText(favouritesCount, "Favourite Count")
    actions.expectToEqual(count_before_select + 1, count_after_select, 'favouritesCount increased with 1')
    if (!(heartShapColor_before_select == color)) {
      var heartShapColor_after_select = actions.GetElementColor(firstHeartShape, 'First Heart shape color')
      actions.expectToEqual(color, heartShapColor, 'Heart shape color')
    }
  },

  clickOnSelectedHeartShapeAndVerifyFavouritesCountDecreaseWith1: function (color) {
    var favouritesProductsListCount = favouritesItemsList.count()
    if (favouritesProductsListCount = 0) {
      actions.jsClick(firstHeartShape, 'First Heart shape')
      Long_Wait()
    }
    var count_before_unselect = actions.GetText(favouritesCount, "Favourite Count")
    this.clickOnFavouriteBar()
    var heartShapColor_before_unSelect = actions.GetElementColor(firstHeartShape, 'First Heart shape color')
    actions.jsClick(firstHeartShape, 'First Heart shape')
    Long_Wait()
    var count_after_unSelect = actions.GetText(favouritesCount, "Favourite Count")
    actions.expectToEqual(count_before_unselect - 1, count_after_unSelect, 'favouritesCount decreased with 1')
    if (!(heartShapColor_before_unSelect == color)) {
      var heartShapColor_after_unSelect = actions.GetElementColor(firstHeartShape, 'First Heart shape color')
      actions.expectToEqual(color, heartShapColor_after_unSelect, 'Heart shape color')
    }
  },

  verifyUpdatedPresentaionDetails: (updatedPresentationName) => {
    presentationName.getText().then((dispalyedPresoName) => {
      actions.expectToEqualCustom(dispalyedPresoName,updatedPresentationName , 'Presentation name', "Displayed Presentation name", "Updated Presentation name")
    })
    // presentationCompany.getText().then(company=>{
    // actions.expectToEqual(company, global.companyName, 'Updated company name')  
    // })
    presentationEmail.getText().then(Email => {
      actions.expectToEqual(Email, global.email, 'Updated Email')
    })
    presentationPhone.getText().then(Phone => {
      actions.expectToEqual(Phone, global.phone, 'Updated Phone')
    })
    // presentationAddress1.getText().then(Address1=>{
    // actions.expectToEqual(Address1, global.address1, 'Updated address')  
    // })
    // presentationContact.getText().then(Contact=>{
    // actions.expectToEqual(Contact, global.presentationName, 'Verifying updated Contact name')  
    // })
  },

  enterProductQuantity: function () {
    Medium_Wait()
    var selectOneProduct = element.all(by.css("[class=' input-number-wrap '] input")).get(0)
    actions.blurText(selectOneProduct, "1000", "Product Quantity")

  },
  verifyPriceAndCost: function () {
    let flag = true;
    firstCost.getAttribute('value').then(cost => {
      if (cost.length > 0)
        reporter.appendTest('Verifying Cost ', 'Verified that the Cost: ' + cost + ' Auto populated for Quatity : 1000  Cost', "PASS");
      else
        reporter.appendTest('Verifying Cost', 'Verified that the Cost field is not Auto populated', "FAIL");

      fisrtPrice.getAttribute('value').then(price => {
        if (price.length > 0)
          reporter.appendTest('Verifying Price ', 'Verified that the price: ' + price + ' Auto populated for Quatity : 1000 ', "PASS");
        else
          reporter.appendTest('Verifying Price ', 'Verified that the Price field is not Auto populated', "FAIL");
      })
    })
  },

  enterCostAndPrice: () => {
    actions.blurText(firstCost, "2.5", "Cost")
    actions.blurText(fisrtPrice, "4.5", "Price")
  },

  clickOnPrevButton: function () {
    actions.jsClick(previousButton, "PREVIOUS")
  },

  clickOnConvertButton: function () {
    actions.jsClick(convertButton, "CONVERT")
    Long_Wait()
  },

  // VerifyPresentationID: function () {
  //   actions.GetElementText(presentationNumber, "Presentation Id ")
  // },

  //Validates the presentaion Id where Id should start with 'P' and End with "AFP" or other username
  VerifyPresentationID: function (username) {
    reporter.appendTest('Verifying  Presentation Id format', 'Verifying that the Presentaion Id should start with letter "P" and End with the username', "");
    presentationNumber.getText().then(function (presentaionId) {
      if (username.length > 0 && presentaionId.length > 0) {
        presentaionId = presentaionId.trim()
        username = username.trim()
        let endLetters = presentaionId.substr(presentaionId.length - username.length, presentaionId.length)
        if (presentaionId[0] == 'P' && endLetters == username) {
          reporter.appendTest('Verified Presentation Id : <b>' + presentaionId + '</b>', 'Verifyied that the Presentaion Id starts with letter "P" and Ends with the username' + username, "PASS");
        }
        else {
          reporter.appendTest('Verified Presentation Id : <b>' + presentaionId + '</b>', 'Verifyied that the Presentaion Id is not according to the expected format', "FAIL");
          expect(false).toReport(true, "Presentaion Id Format validation Failed");
        }
      } else {
        reporter.appendTest('Verified Presentation Id format', 'Presentaion Id or Username parameter is empty', "FAIL");
        expect(false).toReport(true, "Presentaion Id or Username parameter is empty");
      }
    }, function (err) {
      reporter.appendTest('Verifying Presentation Id format', 'Failed while getting text of: " Presentation Id"', "FAIL");
      expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
    })
  },

  verifyAddedProduct: () => {
    let products = element.all(by.xpath('//div[@class="table__col col"]/div/div[2]/p'))
    products.count().then(async count => {
      if (count > 0) {
        products = await products.get(0);
        products.getText().then(productName => {
          reporter.appendTest('Verifying Added Product', 'Product Added Succesfully: ' + productName, "PASS");
        })
      } else reporter.appendTest('Verifying Added Product', 'Product is not added Succesfully: ', "FAIL");
    })
  },

  clickOnConvertToJobHomeButton: function () {
    reporter.appendTest('<b>Converting Quote into Job</b>', '*************', "");
    actions.jsClick(convertToJobHomeButton, "Convert to Job Button")
    Long_Wait()
  },

  clickOnConvertToJobSubButton: function () {
    actions.jsClick(convertToJobSubButton, "Convert to Job Button")
    Long_Wait()
  },

  // verifyAlertProductAndContinue: () => {
  //   Medium_Wait()
  //   element.all(by.css('[class="modal_popup__body"]')).then(eleArray => {
  //     if (eleArray.length > 0) {
  //       eleArray[0].getText().then(text => {
  //         reporter.appendTest('Verifying Alert', 'Verified that ALert is displayed ', "PASS");
  //         actions.expectToEqualCustom("Quote converted into job successfully!", text, "Alert message", "Expected Alert message", "Displayed Alert message")
  //         actions.jsClick(continueButton, "Continue")
  //         Long_Wait()
  //       }, function (err) {
  //         expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
  //       })
  //     }
  //     else reporter.appendTest('Verifying Alert', 'No Alert dispalyed', "FAIL");
  //   })

  // },

  verifyQuoteConvertedToJobSuccesfullyAlert: (expecedMessage) => {
    element.all(by.css('[class="modal_popup__body"]')).then(eleArray => {
      if (eleArray.length > 0) {
        eleArray[0].getText().then(dispayedAlertMessage => {
          reporter.appendTest('Verifying Alert', 'Verified that ALert is displayed ', "PASS");
          actions.expectToEqualCustom(expecedMessage, dispayedAlertMessage, "Alert message", "Expected Alert message", "Displayed Alert message")
        }, function (err) {
          expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
      }
      else reporter.appendTest('Verifying Alert', 'No Alert dispalyed', "FAIL");
    })
  },

  clickOnContinueButtonInPopUp: () => {
    actions.jsClick(continueButton, "Continue")
  },

  verifyReviewTableTabs: function (colname) {
    let ele = element(by.xpath('//*[@class="table"]//*[text()="' + colname + '"]'))
    actions.verifyElementDisplayed(ele, true, colname + ' column')
  },

  retrieveProduct: () => {
    element.all(by.xpath('//div[@class="align-items-center row"]/div[2]/p')).then(productList => {
      if (productList.length > 0) {
        reporter.appendTest('Retrieving Products in the Preentation', '*******************', "PASS");
         productList.forEach(product => {
          product.getText().then(productName => {
            reporter.appendTest('Retrieved Product Name: ', productName, "");
            productArray.push(productName)
          }, function (err) {
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
          })
        })
      }
      else reporter.appendTest('Retrieving Product', 'No Product dispalyed', "FAIL");
    })
  },

  VerifyRetrivedProductInJobDetails: () => {
    reporter.appendTest('<b>Verifying Products dispayed in Job</b>', 'Products dispalyed in Presentaion details and Job Deatils should be same', "PASS");
    let index = 0;
    element.all(by.xpath("//div[@class='table__body']//div[@class='description col']//p[contains(@class, 'clickable')]")).then(productList => {
      if (productList.length > 0) {
        productList.forEach(product => {
          product.getText().then(productName => {
            actions.expectToContainCustom(productName, productArray[index], "Product Name", "Products dispalyed in Job details Page", "Products dispalyed in Presentaion details Page")
            index++
          }, function (err) {
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
          })
        })
      }
      else reporter.appendTest('Verifying Product dispalyed in table', 'No Products dispalyed', "FAIL");
    })
  },

  VerifyRetrivedProduct: () => {
    reporter.appendTest('<b>Verifying Products dispayed in the Preview table</b>', 'Products dispalyed in Presentaion details and Preview table should be same', "PASS");
    let index = 0;
    element.all(by.xpath('//tbody/tr/td[1]')).then(productList => {
      if (productList.length > 0) {
        productList.forEach(product => {
          product.getText().then(productName => {
            actions.expectToEqualCustom(productArray[index], productName, "Product Name", "Products dispalyed in Presentaion details", "Products dispalyed in Preview table")
            index++
          }, function (err) {
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
          })
        })
      }
      else reporter.appendTest('Verifying Product dispalyed in table', 'No Products dispalyed', "FAIL");
    })
  },

  clickOnUpdateLineItemButton: function () {
    actions.jsClick(updateLinItemButton, "Update Line item Button")
    Long_Wait()
    Medium_Wait()
  },

  selectLineitemToViewDetails: () => {
    reporter.appendTest('<b>Selecting line item/Product to view details</b>', '*********************************', "PASS");
    element.all(by.xpath("//div[@class='table__body']//div[@class='description col']//p[contains(@class, 'clickable')]")).then(productList => {
      if (productList.length > 0) {
        productList[0].getText().then(text => {
          actions.Click(productList[0], text)
        }, function (err) {
          expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
      }
      else reporter.appendTest('Selecting Line item/Product', 'No Line item/Product dispalyed', "FAIL");
    })
  },

  clickOnNextButton: function () {
    actions.jsClick(nextButton, "Next Button")
    Long_Wait()
  },

  clickOnNEXTButton: function () {
    actions.jsClick(NEXTButton, "Next Button")
    Medium_Wait()
  },

  selectSalesRep: function () {
    reporter.appendTest('Selecting Sales rep from Dropdown', '****************************', "PASS");
    actions.Click(salesRepDrop, "Sales Rep Dropdown")
    Short_Wait()
    actions.PressDownArrow()
    Short_Wait()
    actions.PressEnter()
    Long_Wait()
    element.all(by.xpath('//label[text()="Sales Rep "]/following-sibling::div/div/div/div[1]')).then(salesRepList => {
      if (salesRepList.length > 0) {
        salesRepList[0].getText().then(salesRep => {
          reporter.appendTest('Selected Sales Rep: ', salesRep, "PASS");
        }, function (err) {
          expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
      }
    })
  },

  selectState: function () {
    reporter.appendTest('Selecting State from Dropdown', '****************************', "PASS");
    actions.Click(stateDrop, "State Dropdown")
    Short_Wait()
    actions.PressDownArrow()
    Short_Wait()
    actions.PressEnter()
    Long_Wait()
    element.all(by.xpath('//label[text()="state"]/following-sibling::div/div/div/div[1]')).then(eleArray => {
      if (eleArray.length > 0) {
        eleArray[0].getText().then(text => {
          reporter.appendTest('Selected State: ', text, "PASS");
        }, function (err) {
          expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
        })
      }
    })
  },

  verifyCusotmerDetailsOptions: function () {
    reporter.appendTest('Verifying different customer details options', '****************************', "");
    actions.verifyElementDisplayed(sameAsShippingDrop, true, "Same As Shipping ")
    actions.verifyElementDisplayed(addNewDetailsDrop, true, "Add New Details")
    actions.verifyElementDisplayed(useExistingBillingCiutomerDrop, true, "Use Existing Billing Customer")
  },

  verifyAddChargesSuccessMsg: function () {
    actions.verifyElementDisplayed(addChargesSuccessMsg, true, 'Charges added successfully')
  },

  validatePresentationNameDisplayed: function (expectedPresoName) {
  actions.GetFieldValueAndCompareToBeEqual(presentationNameEditBox,expectedPresoName, "Presentation Name", "Presentation Name Displayed", "Presentation Name given while creating presentation")
  },
  validatePresentationNameDisplayedToNotUpdated: function (expectedPresoName) {
  actions.GetFieldValueAndCompareNotToBeEqual(presentationNameEditBox,expectedPresoName, "Presentation Name", "Presentation Name Displayed", "Presentation Name given while updating presentation")
  },
  validatePresentationIntroDisplayed: function (expectedPresoIntro) {
  actions.GetTextAndCompareToBeEqual(introFieldInEditPage,expectedPresoIntro, "Presentation Intro", "Presentation Intro Displayed", "Presentation Intro given while creating presentation")
  },
  validatePresentationTermsDisplayed: function (expectedPresoTerms) {
  actions.GetTextAndCompareToBeEqual(termsFieldInEditPage,expectedPresoTerms, "Presentation Terms", "Presentation Terms Displayed", "Presentation Terms given while creating presentation")
  },

  validateCustomerNeedsByDateDisplayed: function (expectedValue) {
   customerNeedsByDateFieldInEditPage.getAttribute('value').then(function (dispalyedDate) {
      dispalyedDate= dispalyedDate.split('/').join('');
          if (dispalyedDate == expectedValue) {
             reporter.appendTest('Verifying Customer Needs By Date', 'Verified that <b>Customer Needs By Date Displayed</b>: "' + dispalyedDate + '" is same as <b>Customer Needs By Date given while creating presentation</b>: "' + expectedValue +'" ', "PASS");
            } else {
            reporter.appendTest('Verifying Customer Needs By Date','Verified that <b>Customer Needs By Date Displayed</b>: "' + dispalyedDate + '" is not same as <b>Customer Needs By Date given while creating presentation</b>: "' + expectedValue +'" ', "FAIL");
            expect(false).toReport(true, 'Expecting Customer Needs By Date -->"' + dispalyedDate + '" to same as "' + expectedValue + '" failed.');
            }
          }, function (err) {
            reporter.appendTest('Verifying Customer Needs By Date', 'Failed while getting value of: "Customer Needs By Date', "FAIL");
            expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        })
  },
  validateExpireDateDisplayed: function (expectedValue) {
   expireDateFieldInEditPage.getAttribute('value').then(function (dispalyedDate) {
      dispalyedDate= dispalyedDate.split('/').join('');
          if (dispalyedDate == expectedValue) {
             reporter.appendTest('Verifying Expire Date', 'Verified that <b>Expire Date Displayed</b>: "' + dispalyedDate + '" is same as <b>Expire Date given while creating presentation</b>: "' + expectedValue +'" ', "PASS");
            } else {
            reporter.appendTest('Verifying Expire Date','Verified that <b>Expire Date Displayed</b>: "' + dispalyedDate + '" is not same as <b>Expire Date given while creating presentation</b>: "' + expectedValue +'" ', "FAIL");
            expect(false).toReport(true, 'Expecting Expire Date -->"' + dispalyedDate + '" to same as "' + expectedValue + '" failed.');
            }
          }, function (err) {
            reporter.appendTest('Verifying Expire Date', 'Failed while getting value of: "Expire Date', "FAIL");
            expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        })
  },
  validateFieldIsNotModifiable: function (elem,logname,valueToEnter='2') {
     elem.getAttribute('value').then(function (firstValue) {
       reporter.appendTest(logname+' Field value before update: ', firstValue, "PASS");        
          actions.blurText(elem, valueToEnter, logname)
             elem.getAttribute('value').then(function (secondValue) {
               reporter.appendTest(logname+' Field value after update: ', secondValue, "PASS");        
                if (firstValue === secondValue)
                 reporter.appendTest('Verifying field: '+logname, 'Verified that '+logname+' field is not Modifiable/Editable', "PASS");
                else {
                  reporter.appendTest('Verifying field: '+logname,'Verified that '+logname+' field is Modifiable/Editable', "FAIL");
                  expect(false).toReport(true, 'Expecting field '+logname+' to be not Modifiable- failed.');
                  }//end of else
                }, function (err) {
                 reporter.appendTest('Verifying '+logname, 'Failed while getting value of: '+logname, "FAIL");
                 expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
               }) //end of second GetAttribute chain            
         }, function (err) {
          reporter.appendTest('Verifying '+logname, 'Failed while getting value of: '+logname, "FAIL");
          expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        }) //end of first GetAttribute chain
   },
  validateFieldIsModifiable: function (elem,logname,valueToEnter='2') {
     elem.getAttribute('value').then(function (firstValue) {
       reporter.appendTest(logname+' Field value before update: ', firstValue, "PASS");        
          actions.blurText(elem, valueToEnter, logname)
             elem.getAttribute('value').then(function (secondValue) {
               reporter.appendTest(logname+' Field value after update: ', secondValue, "PASS");        
                if (firstValue !== secondValue)
                 reporter.appendTest('Verifying field: '+logname, 'Verified that '+logname+' field is Modifiable/Editable', "PASS");
                else {
                  reporter.appendTest('Verifying field: '+logname,'Verified that '+logname+' field is Not Modifiable/Editable', "FAIL");
                  expect(false).toReport(true, 'Expecting field '+logname+' to be Modifiable- failed.');
                  }//end of else
                }, function (err) {
                 reporter.appendTest('Verifying '+logname, 'Failed while getting value of: '+logname, "FAIL");
                 expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
               }) //end of second GetAttribute chain            
         }, function (err) {
          reporter.appendTest('Verifying '+logname, 'Failed while getting value of: '+logname, "FAIL");
          expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        }) //end of first GetAttribute chain
   },
  enterIntro: function (intro) {
    actions.blurText(introField,intro, "Intro")
  },
  enterTerms: function (terms) {
    actions.blurText(termsField,terms, "Terms")
  },

  verifyContactNameField: function () {
    actions.VerifyFieldDisabled(disabledContactNameEditBox,true, "Contact Name")
  },

//not modifiable
 verifyCompanyNameFieldIsNotModifiable: function (companyName='StayFit') {
    this.validateFieldIsNotModifiable(companyNameEditBox,"Company Name",companyName)
  },
  verifyAddress1FieldIsNotModifiable: function (address1='South street') {
    this.validateFieldIsNotModifiable(Address1EditBox,"Address 1",address1)
  },
  verifyAddress2FieldIsNotModifiable: function (address2='Yellow street'){
    this.validateFieldIsNotModifiable(address2EditBox,"Address 2",address2)
  },
  verifyEmailFieldIsNotModifiable: function (email="abc@xyz.com") {
    this.validateFieldIsNotModifiable(emailTextBox,"Email",email)
  },
  verifyCityFieldIsNotModifiable: function (city='kansas') {
    this.validateFieldIsNotModifiable(cityTextBox,"City",city)
  },
  verifyZipFieldIsNotModifiable: function (zip='23456') {
    this.validateFieldIsNotModifiable(zipEditBox,"Zip",zip)
  },
  verifyPhoneFieldIsNotModifiable: function (phone="222-111-0000") {
    this.validateFieldIsNotModifiable(phoneTextBox,"Phone",phone)
  },
  verifyPhoneExtFieldIsNotModifiable: function (ext='0091') {
    this.validateFieldIsNotModifiable(phoneExtEditBox,"PhoneExt",ext)
  },
//

//modifiable
  verifyContactNameFieldIsModifiable: function (contactName='Stevan') {
    this.validateFieldIsModifiable(ContactNameEditBox,"Contact Name",contactName)
  },
  verifyCompanyNameFieldIsModifiable: function (companyName='StayFit') {
    this.validateFieldIsModifiable(companyNameEditBox,"Company Name",companyName)
  },
  verifyAddress1FieldIsModifiable: function (address1='South street') {
    this.validateFieldIsModifiable(Address1EditBox,"Address 1",address1)
  },
  verifyAddress2FieldIsModifiable: function (address2='Yellow street'){
    this.validateFieldIsModifiable(address2EditBox,"Address 2",address2)
  },
  verifyEmailFieldIsModifiable: function (email="abc@xyz.com") {
    this.validateFieldIsModifiable(emailTextBox,"Email",email)
  },
  verifyCityFieldIsModifiable: function (city='kansas') {
    this.validateFieldIsModifiable(cityTextBox,"City",city)
  },
  verifyZipFieldIsModifiable: function (zip='23456') {
    this.validateFieldIsModifiable(zipEditBox,"Zip",zip)
  },
  verifyPhoneFieldIsModifiable: function (phone="222-111-0000") {
    this.validateFieldIsModifiable(phoneTextBox,"Phone",phone)
  },
  verifyPhoneExtFieldIsModifiable: function (ext='0091') {
    this.validateFieldIsModifiable(phoneExtEditBox,"PhoneExt",ext)
  },
//
  verifyUpdatedPresentaionDetails: (updatedPresentationName) => {
    presentationName.getText().then((dispalyedPresoName) => {
      actions.expectToEqualCustom(dispalyedPresoName,updatedPresentationName , 'Presentation name', "Displayed Presentation name", "Updated Presentation name")
    })
    // presentationCompany.getText().then(company=>{
    // actions.expectToEqual(company, global.companyName, 'Updated company name')  
    // })
    presentationEmail.getText().then(Email => {
      actions.expectToEqual(Email, global.email, 'Updated Email')
    })
    presentationPhone.getText().then(Phone => {
      actions.expectToEqual(Phone, global.phone, 'Updated Phone')
    })
    // presentationAddress1.getText().then(Address1=>{
    // actions.expectToEqual(Address1, global.address1, 'Updated address')  
    // })
    // presentationContact.getText().then(Contact=>{
    // actions.expectToEqual(Contact, global.presentationName, 'Verifying updated Contact name')  
    // })
  },
  verifyUpdatedPresentationName: (updatedPresentationName) => {
    presentationName.getText().then((dispalyedPresoName) => {
      actions.expectToEqualCustom(dispalyedPresoName,updatedPresentationName , 'Presentation name', "Displayed Presentation name", "Updated Presentation name")
    })
  },
  clickOneditExistingCustomerLink: function () {
    actions.Click(editExistingCustomer, "Edit Existing Customer Link")
  },
  verifyeditExistingCustomerLink: function () {
    actions.verifyElementDisplayed(editExistingCustomer, true, "Edit Existing Customer Link")
  },
  validateCompanyNameHeader: function () {
    actions.verifyElementDisplayed(editExistingCustomer, true, "Edit Existing Customer Link")
  },
  validateCompanyNameHeader: function () {
    actions.GetTextAndCompareToBeEqual(companyNameHeader,companyNameExistCust, "Company Name", "Company Name displayed in Edit Existing Customer Page", "Company Name displayed in Edit Presentation Page")
  },
  storeExistingCustomerDetails: function(){
   try{
    companyNameEditBox.getAttribute('value').then(function (value) {
      companyNameExistCust=value;
    });
    Address1EditBox.getAttribute('value').then(function (value) {
      address1ExistCust=value;
    })
    disabledContactNameEditBox.getAttribute('value').then(function (value) {
      conatactNameExistCust=value;
    })
    address2EditBox.getAttribute('value').then(function (value) {
      address2ExistCust=value;
    })
    emailTextBox.getAttribute('value').then(function (value) {
      emailExistCust=value;
    })
    zipEditBox.getAttribute('value').then(function (value) {
      zipExistCust=value;
    })
    cityTextBox.getAttribute('value').then(function (value) {
      cityExistCust=value;
    })
    normalPhoneTextBox.getAttribute('value').then(function (value) {
      phoneExistCust=value;
    })
    stateFieldValue.getAttribute('value').then(function (value) {
      stateExistCust=value;
    })
    phoneExtEditBox.getAttribute('value').then(function (value) {
      phoneExtExistCust=value;
    })
   } catch(err){
      reporter.appendTest('Getting Field Value', 'Failed while getting field value', "FAIL");
      expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
    }
  },
}

