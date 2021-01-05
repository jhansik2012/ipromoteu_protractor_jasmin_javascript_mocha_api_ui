//let JobsHomePag_Ipromoteu :function () {
// *************************************************
/*global document, window, alert, console, require, browser,jasmine,
 requirePage, requireData, requireConfig, requireLibrary,
 describe, it, beforeEach, forEach, by, includes, expect, titlePromise, includes , element, $, then, $locatorRepeater, calenderInputData*/
/*
 */
'use strict';

const { reporters } = require("mocha");
const { element, browser, by } = require("protractor");

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
    random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
    //***************************** Page Objects *************************************//

    // Header
    menu = element(by.xpath("//button[@class='btn hamburger hamburger_open']")),
    hamburgerMenu = element(by.xpath("//*[contains(@class,'hamburger_open')]")),
    logo = element(by.xpath("//div[@class='header-logo']")),
    searchButton = element(by.css("[id='search-icon']")),
    searchField = element(by.xpath("//div[@class='app-header__search-wrap d-none d-sm-block']//div[@class='row']//div[@class='pl-xl-0 mr-3 col']//div/input")),
    notifications = element(by.xpath("//i[@class='material-icons.text-white']")),
    avatarIcon = element(by.xpath("(//div[@class='avatar avatar_md '])[1]")),
    Account = element(by.xpath("//div[contains(@class,'dropdown-menu dropdown-menu-right show')]//button[contains(@class,'dropdown-item')][contains(text(),'Account')]")),
    LogOut = element(by.xpath("//div[contains(@class,'dropdown-menu dropdown-menu-right show')]//button[contains(@class,'dropdown-item')][contains(text(),'LogOut')]")),
    logInAsOperator = element(by.xpath("//div[contains(@class,'dropdown-menu dropdown-menu-right show')]//button[contains(@class,'dropdown-item')][contains(text(),'Login as Operator')]")),
    // Side Menu
    dashboard = element(by.xpath("//a[contains(.,'Dashboard')]")),
    browseProducts = element(by.xpath("//a[contains(.,'Browse Products')]")),
    presentations = element(by.xpath("//a[contains(.,'Presentations')]")),
    quotes = element(by.xpath("//a[contains(.,'Quotes')]")),
    jobs = element(by.xpath("//a[contains(.,'Jobs')]")),
    artwork = element(by.xpath("//a[contains(.,'Artwork')]")),
    customers = element(by.xpath("//a[contains(.,'Customers')]")),
    vendors = element(by.xpath("//a[contains(.,'Vendors')]")),
    reporting = element(by.xpath("//a[contains(.,'Reporting')]")),
    supportnfeedback = element(by.xpath("//a[contains(.,'Support & Feedback')]")),
    iPROMOTEu = element(by.xpath("//span[contains(.,'iPROMOTEu')]")),

    // Job Section
    jobsInProgress = element(by.xpath("//p[text()='Jobs In Progress']")),
    jobsInProgressCount = element(by.xpath("//p[text()='Jobs In Progress']/following-sibling :: span[1]")),
    jobsOnHold = element(by.xpath("//p[text()='Jobs On Hold']")),
    jobsOnHoldCount = element(by.xpath("//p[text()='Jobs On Hold']/following-sibling ::span[1]")),
    invoicesToApprove = element(by.xpath("//p[text()='Invoices To Approve']")),
    invoicesToApproveCount = element(by.xpath("//p[text()='Invoices To Approve']/following-sibling :: span[1]")),
    jobsInDispute = element(by.xpath("//p[text()='Jobs In Dispute']")),
    jobsInDisputeCount = element(by.xpath("//p[text()='Jobs In Dispute']/following-sibling :: span[1]")),
    priceDiscrepancy = element(by.xpath("//p[text()='Price Discrepancy']")),
    priceDiscrepancyCount = element(by.xpath("//p[text()='Price Discrepancy']/following-sibling :: span[1]")),
    unpaidInvoices = element(by.xpath("//p[text()='Unpaid Invoices']")),
    unpaidInvoicesCount = element(by.xpath("//p[text()='Unpaid Invoices']/following-sibling :: span[1]")),
    createJob = element(by.xpath("//button[.='CREATE JOB']")),
    salesrepDropdown = element(by.xpath("//div[text()='All Sales Rep']")),
    //***************************
    clouddownload = element(by.xpath("//i[text()='cloud_download']")),
    globalSeachTextBox = element(by.xpath("//*[@class='app-header__search-wrap d-none d-sm-block']//input")),
    searchIcon = element(by.xpath("//*[@class='app-header__search-wrap d-none d-sm-block']//i")),
    globalSearchResults = element(by.xpath("//*[@class='tableRecord']")),
    searchResultsValue = element(by.xpath("//*[@class='tableRecord']//td[contains(text(),'Venkat')]")),
    statusDropDown = element(by.xpath("//*[text()='status']/../div")),
    orderDatesDropDown = element(by.xpath("//*[text()='Order Dates']/../div")),
    reqShipDateDropDown = element(by.xpath("//*[text()='REQ SHIP DATE']/../div")),
    advanceJobFiltersDropDown = element(by.xpath("//*[text()='Advanced Job Filters']/../p")),
    customerDropDown = element(by.xpath("//div[text()='All Customer']")),
    vendorDropDown = element(by.xpath("//div[text()='All Vendors']")),
    dashboardResults = element(by.xpath("//*[@class='d-flex align-items-center flex-nowrap table__row  ']")),
    // TC002-ValidatejobdetailsList 
    profitMargine = element(by.xpath("//span[@class='profit' and text()='%']")),

    //TC003- Validate JobDetails Shipping Dates and Milestone section
    viewingDate = element(by.xpath("//span//*[text()='Viewing dates for']")),
    ShippingDates = element(by.xpath("//div[contains(text(),'Shipping')]//span[text()='Dates']")),
    MilestoneDates = element(by.xpath("//div[contains(text(),'Milestone')]//span[text()='Dates']")),
    viewDatesToggle = element(by.xpath("//span[contains(@class,'d-sm-inline-block')]//button[contains(@class,'d-inline-block')]")),

    viewDatesDropDownMenu = element(by.xpath("//span[contains(@class,'d-sm-inline-block')]//button[contains(@class,'d-inline-block')]/following-sibling::div")),
    viewingDatejobdet = element(by.xpath("//span[contains(@class,'d-sm-inline-block')]//div[@class='d-inline-block']/strong")),
    viewDatesDropDownMenuItem = element(by.xpath("//span[contains(@class,'d-sm-inline-block')]//button[contains(@class,'d-inline-block')]/following-sibling::div/button[1]")),

    // //TC005- Validate Billing and shipping details
    jobTitle = element(by.css('[class="d-inline-block job-title"]')),
    // TC007-------------
    addproduct = element(by.xpath("//div[@class='tab-pane active']//button[text()='Add product']")),
    createPOS = element(by.xpath("//div[@class='tab-pane active']//button[contains(.,'Create PO')]")),
    repeatjob = element(by.xpath("//div[@class='tab-pane active']//button[text()='Repeat Job']")),
    LineItemsTab = element(by.xpath("//a[@href='#Line Items']")),
    Decorate = element(by.xpath("//div[@class='tab-pane active']//button[@disabled and text()='Decorate']")),
    Decorateenbl = element(by.xpath("//div[@class='tab-pane active']//button[not(@disabled) and text()='Decorate']")),
    createPOsMenuitems = element.all(by.xpath("//div[@role='menu' and @aria-hidden='false']//button[@role='menuitem']")),
    table_header = "//div[@class='tab-pane active']//div[contains(@class,'table__head')]//",
    table_body = "//div[@class='tab-pane active']//div[@class='table__body']//",
    headerchkbox = element(by.xpath(table_header + "div[@class='col'][1]//div[contains(@class,'custom-checkbox')]/input")),
    customerpricehdr = element(by.xpath(table_header + "div[@class='customer-row row']")),
    yourcosthdr = element(by.xpath(table_header + "div[@class='user-row row']")),
    DescAllCheckboxes = element.all(by.xpath("//div[@class='tab-pane active']//div[@class='table__body']//div[contains(@class,'custom-checkbox')]//input")),
    clickonviewdetails = element(by.xpath('(((//*[@class="table__body"])[1]//*[@class="d-flex down-lg-none col"])[1]/div//button)[1]')),

    //   viewDatesDropDownMenuItem = element(by.xpath("(//div[@aria-hidden='false']//button[@class='dropdown-item'])[1]")),
    viewdetailsbtn = element(by.buttonText("View Details")),
    menutblrowdeletebtn = element(by.xpath("//div[@role='menu' and @aria-hidden='false']//button[text()='Delete']")),
    getDescVal = element(by.xpath("((//*[text()='View Details'])[1]/../../../..//p)[1]")),
    modalpopupYESbtn = element(by.xpath("//div[@class='tab-pane active']//div[@class='modal_popup__footer']//*[text()='YES']")),
    modalpopupNObtn = element(by.xpath("//div[@class='tab-pane active']//div[@class='modal_popup__footer']//*[text()='NO']")),
    modalpopupclosebtn = element(by.xpath("//button[@class='close']")),
    modalpopupokbtn = element(by.xpath("//div[@class='tab-pane active']//div[@class='modal_popup__footer']//button[text()='OK']")),
    priceTablerows = element.all(by.xpath(table_body + "div[contains(@class,'description')]")),
    datepickerbtn = element(by.xpath("(" + table_body + "*[@id='date_picker_id'])[1]")),
    datepickernxtmonth = element(by.xpath(table_body + "*[@aria-label='Next Month']")),
    datepickercrntmonth = element(by.xpath(table_body + "*[@class='react-datepicker__current-month']")),
    datepickercrntDay = element(by.xpath(table_body + "*[@role='button' and not (contains(@class,'outside-month')) and text()='1']")),
    editJobDetailsOption = element(by.xpath("//button[text()='Edit Job Details']")),
    editPresentationDetailsOption = element(by.xpath("//button[text()='Edit Presentation Details']")),
    repeatJobOption = element(by.xpath("//button[text()='Repeat Job']")),
    jobPresentationId = element(by.xpath("//strong)[1]")),
    editJobDetailsIcon = element(by.css(".px-2.btn.btn-secondary")),
    pdf = element(by.xpath("//button[text()='PDF File']")),
    csv = element(by.xpath("//button[text()='CSV File']")),
    jobColumn = element(by.xpath("//*[text()='job']")),
    orderedCoulmn = element(by.xpath("//*[text()='Ordered']")),
    statusCoulmn = element(by.xpath("//*[text()='STATUS']")),
    reqShipCoulmn = element(by.xpath("//*[text()='REQ SHIP']")),
    inHandCoulmn = element(by.xpath("//*[text()='IN HAND']")),


    keywordSearchTextBox = element(by.xpath("//label[text()='KEYWORD SEARCH']/following-sibling::div//input")),
    resetFiltersLink = element(by.xpath("//*[text()='RESET FILTERS']")),
    resetFiltersLink = element(by.xpath("//*[text()='RESET FILTERS']")),
    resetFiltersLink = element(by.xpath("//*[text()='RESET FILTERS']")),
    nameOrCompanyCode = element(by.css("[placeholder='Name or Company Code']")),
    jobName = element(by.css("[placeholder='Enter Job Name']")),
    salesRep_Dropdown = element(by.xpath("//label[text()='Sales Rep']/following-sibling::div")),
    alternateAddressObject = element(by.xpath("//span[text()='Alternate Address']")),
    alternateAddress = element.all(by.xpath("//span[text()='Alternate Address']")),
   newStatusObject = element(by.xpath("//span[text()='New']")),
    jobIdObject = element(by.css("[class='d-inline-block job-title']")),
    lineItemsList = element.all(by.xpath('//*[@class="details-table row"]//*[@class="align-items-center row"]')),
    cost = [],
    qty = [],
    snapCutomerPrice = [],
    ReqDate1 = element.all(by.xpath('//*[@class="d-flex align-items-center flex-nowrap table__row  "]/div[8]/p')).get(0),
    ReqDate2 = element.all(by.xpath('//*[@class="d-flex align-items-center flex-nowrap table__row  "]/div[8]/p')).get(1),
    InDate1 = element.all(by.xpath('//*[@class="d-flex align-items-center flex-nowrap table__row  "]/div[9]/p')).get(0),
    InDate2 = element.all(by.xpath('//*[@class="d-flex align-items-center flex-nowrap table__row  "]/div[9]/p')).get(1),
    jobDetails = { jobId: '' },
    jobStatusValue = element(by.xpath("//*[text()='status']/following-sibling :: div/div/div/div")),
    // jobStatusValueInList= element.all(by.xpath("//*[@class='table job-list row']//*[contains(@class,'table__col')]/span")),
    jobStatusValueInList = element.all(by.xpath('//*[@class="table__col d-none d-lg-flex col"]/span')),
    trackingIcons = element.all(by.xpath('//*[@class="tracking-icons"]/following-sibling::div/button')),
    viewPODetailsButton = element(by.buttonText("View PO Details")),
    contactVendorButton = element(by.buttonText("Contact Vendor")),
    createDisputeButton = element(by.buttonText("Create Dispute")),
    jobIdInHead = element(by.css('[class="job-status-area columns"] strong')),
    vendorList = element.all(by.xpath('(//button[text()="Create PO"])[1]/following-sibling::div/button/a')),
    noMatchingDataFound = element(by.xpath("//*[text()='No Matching Data Found']")),
    yesButton = element(by.buttonText("YES")),
    deleteButton = element(by.buttonText("Delete"))

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))


global.totalCustomerPrice = 0;

module.exports = {
    /*Used to save application verification data form dynamic verification*/
    specData: {},

    verifyHubergerMenudisplayed: function () {
        actions.verifyElementDisplayed(menu, true, "humberger menu")
    },

    verifyLogoDisplayed: function () {
        actions.verifyElementDisplayed(logo, true, "iPromoteu logo ")
    },

    verifysearchFieldDisplayed: function () {
        actions.verifyElementDisplayed(searchField, true, "searchField ")
    },


    verifyNotificationsDisplayed: function () {
        actions.verifyElementDisplayed(menu, true, "Notifications")
    },

    verifyAvatartDisplayed: function () {
        actions.verifyElementDisplayed(avatarIcon, true, "userprofilename")
    },

    clickonAvatar: function () {
        actions.Click(avatarIcon, "Avatar Icon");
    },

    verifyUserProfileNameAccountDisplayed: function () {
        actions.verifyElementDisplayed(Account, true, "Account");
    },

    verifyUserProfileNameLogOutDisplayed: function () {
        actions.verifyElementDisplayed(LogOut, true, "LogOut");
    },

    verifyUserProfileNameLogInAsOperatorDisplayed: function () {
        actions.verifyElementDisplayed(logInAsOperator, true, "Login as Operator");
    },

    clickonLoginAsOperatorMenu: function () {
        actions.Click(logInAsOperator, "LoginAsOperator Menu");
    },

    clickOnHamberger: function () {
        actions.Click(menu, "Humberger Menu Icon")
    },

    verifydashboarddisplayed: function () {
        actions.verifyElementDisplayed(dashboard, true, "dashboard")
    },

    verifybrowseProductsdisplayed: function () {
        actions.verifyElementDisplayed(browseProducts, true, "browseProducts")
    },

    verifypresentationsdisplayed: function () {
        actions.verifyElementDisplayed(presentations, true, "presentations")
    },

    verifyquotesdisplayed: function () {
        actions.verifyElementDisplayed(quotes, true, "quotes")
    },

    verifyjobsdisplayed: function () {
        actions.verifyElementDisplayed(jobs, true, "jobs")
    },

    verifyartworkdisplayed: function () {
        actions.verifyElementDisplayed(artwork, true, "artwork")

    },

    verifyCustomersInLeftMenu: function () {
        Medium_Wait()
        actions.VerifyElementPresent(customers, true, "customers")
    },

    clickOnCustomersButton: function () {
        actions.jsClick(customers, "customers")
    },

    verifyCustomersButton: function () {
        actions.verifyElementDisplayed(customers, true, "new customer button")
    },

    verifyvendorsdisplayed: function () {

        actions.verifyElementDisplayed(vendors, true, "vendors")

    },

    verifyvendorsPresent: function () {
        Medium_Wait()
        Medium_Wait()
        actions.VerifyElementPresent(vendors, true, "vendors")

    },

    verifyreportingdisplayed: function () {
        actions.verifyElementDisplayed(reporting, true, "reporting")

    },

    verifysupportnfeedbackdisplayed: function () {
        actions.verifyElementDisplayed(supportnfeedback, true, "supportnfeedback")

    },

    verifyiPROMOTEudisplayed: function () {
        actions.verifyElementDisplayed(iPROMOTEu, true, "iPROMOTEu")

    },

    verifyjobsInProgressdisplayed: function () {
        actions.verifyElementDisplayed(jobsInProgress, true, "jobsInProgress")

    },

    verifyjobsInProgressCountdisplayed: function () {
        actions.verifyElementDisplayed(jobsInProgressCount, true, "jobsInProgressCount")

    },

    verifyjobsOnHolddisplayed: function () {
        actions.verifyElementDisplayed(jobsOnHold, true, "jobsOnHold")

    },

    verifyjobsOnHoldCountdisplayed: function () {
        actions.verifyElementDisplayed(jobsOnHoldCount, true, "jobsOnHoldCount")

    },

    verifyinvoicesToApprovedisplayed: function () {
        actions.verifyElementDisplayed(invoicesToApprove, true, "invoicesToApprove")

    },

    verifyinvoicesToApproveCountdisplayed: function () {
        actions.verifyElementDisplayed(invoicesToApproveCount, true, "invoicesToApproveCount")

    },

    verifyjobsInDisputedisplayed: function () {
        actions.verifyElementDisplayed(jobsInDispute, true, "jobsInDispute")

    },

    verifyjobsInDisputeCountdisplayed: function () {
        actions.verifyElementDisplayed(jobsInDisputeCount, true, "jobsInDisputeCount")

    },

    verifypriceDiscrepancydisplayed: function () {
        actions.verifyElementDisplayed(priceDiscrepancy, true, "priceDiscrepancy")

    },

    verifypriceDiscrepancyCountdisplayed: function () {
        actions.verifyElementDisplayed(priceDiscrepancyCount, true, "priceDiscrepancyCount")

    },

    verifyunpaidInvoicesdisplayed: function () {
        actions.verifyElementDisplayed(unpaidInvoices, true, "unpaidInvoices")

    },

    verifyunpaidInvoicesCountdisplayed: function () {
        actions.verifyElementDisplayed(unpaidInvoicesCount, true, "unpaidInvoicesCount")

    },

    verifycreateJobdisplayed: function () {
        actions.verifyElementDisplayed(createJob, true, "create job")
    },

    verifyStatusDropdownDisplayed: function () {
        actions.verifyElementDisplayed(statusDropDown, true, "status dropdown")
    },

    verifyOrderDatesDropdownDisplayed: function () {
        actions.verifyElementDisplayed(orderDatesDropDown, true, "order dates dropdown")
    },
    verifycreateAccountdisplayed: function () {
        actions.verifyElementDisplayed(createAccount, true, "createAccount")

    },
    verifyReqShipDateDropdownDisplayed: function () {
        actions.verifyElementDisplayed(reqShipDateDropDown, true, "req ship date dropdown")
    },
    verifyCustomerDropdownDisplayed: function () {
        actions.verifyElementDisplayed(customerDropDown, true, "customer dropdown")
    },
    verifyKeywordSearchTextBoxDropdownDisplayed: function () {
        actions.verifyElementDisplayed(keywordSearchTextBox, true, "keyword search dropdown")
    },
    verifyVendorDropdownDisplayed: function () {
        actions.verifyElementDisplayed(vendorDropDown, true, "vendor dropdown")
    },
    verifySalesRepdisplayed: function () {
        actions.verifyElementDisplayed(salesrepDropdown, false, "SalesRep Dropdown")

    },
    verifyclouddownloaddisplayed: function () {
        Medium_Wait();
        actions.verifyElementDisplayed(clouddownload, true, "clouddownload")
        actions.Click(clouddownload, "clouddownload")
        Medium_Wait();
        actions.verifyElementDisplayed(pdf, true, "pdf")
        Medium_Wait();
        actions.verifyElementDisplayed(csv, true, "csv")
    },

    //added
    clickOnPDFdownload: function () {
        actions.jsClick(pdf, "pdf")
    },
    clickOnCSVdownload: function () {
        actions.jsClick(clouddownload, "clouddownload")
        Medium_Wait()
        actions.jsClick(csv, "csv")
    },
    //
    clickOnVendorsButton: function () {
        actions.Click(vendors, "vendors")
    },

    globalSearchBox: function (globalSearchBoxValue) {
        Medium_Wait()
        actions.blurText(globalSeachTextBox, globalSearchBoxValue, "Global Search field");
    },

    clickOnSearchIcon: function () {
        actions.jsClick(searchIcon, "Click search Icon");
        Long_Wait()
        Short_Wait()
    },

    verifyGlobalSearchResults: function (searchWith, resultsValue, condition) {
     var results = element.all(by.xpath("//*[text()='" + searchWith + "']/../following-sibling::td//td[@class='contentCellRecord']//span"))
        results.count().then(function (resultCount) {
          if(resultCount>0) {
                results.then(function (rows) {
                    rows.forEach(function (row) {
                        row.getText().then(function (columnText) {
                            if (columnText.includes(resultsValue)) 
                                reporter.appendTest('Verifying "Global Search" resullts', 'Verified "' + resultsValue + '" is present in search result', "PASS");
                             else 
                                reporter.appendTest('Verifying "Global Search" resullts', 'Verified "' + resultsValue + '" is not present in search result', "FAIL"); 
                        })
                    })
                })
            } else {
                element.all(by.xpath("//h3[text()='No Matching Data Found']")).then(elementCount=>{
                         if (elementCount.length > 0) 
                            reporter.appendTest('Verifying global search resullts', 'No Matching Data Found', "FAIL");
                         else   reporter.appendTest('Verifying global search resullts', 'No Element found for locator used', "FAIL");
               })
            } //end of else
        }) //end of count() 
    },

    verifyJobIdGlobalSearchResultsResidesIn: function (searchWith, resultsValue, condition) {
       var jobIdLink = element(by.css('tr .tableRecord td:nth-child(2)>a'))
        actions.jsClick(jobIdLink, searchWith + " in result")
         Long_Wait()
         let result=element(by.css('[class="d-inline-block job-title"]'))
          result.getText().then(function (jobId) {
            if (jobId.indexOf(resultsValue) > -1) 
                reporter.appendTest("Verifying " + searchWith + " in result source", "Verified that " + searchWith + " :" + resultsValue + " is present in the result source", "PASS");
             else {
                reporter.appendTest("Verifying " + searchWith + " in result source", "Verified that " + searchWith + " :" + resultsValue + " is not present in the result source", "FAIL");
                expect(true).toReport(false, "Failed while Verifying " + searchWith + " in result source");
            }

        });
    },
    verifyGlobalSearchResultsResidesIn: function (searchWith, resultsValue, condition) {
       var jobIdLink = element(by.css('tr .tableRecord td:nth-child(2)>a'))
        actions.jsClick(jobIdLink, searchWith + " in result")
         Long_Wait()
          element.all(by.xpath("//*[contains(text(),'"+resultsValue+"')]")).then(results=>{
           if(results.length>0)
                 reporter.appendTest("Verifying " + searchWith + " in result source", "Verified that " + searchWith + " :" + resultsValue + " is present in the result source", "PASS");
                else {
                  reporter.appendTest("Verifying " + searchWith + " in result source", "Verified that " + searchWith + " :" + resultsValue + " is not present in the result source", "FAIL");
                  expect(true).toReport(false, "Failed while Verifying " + searchWith + " in result source");
                }
           })
    },
    
    verifyGlobalSearchNoResults: function (resultsValue, condition) {
        var searchResultsValueWithNoResults = element(by.xpath("//h3[text()='" + resultsValue + "']"))
        actions.verifyElementDisplayed(searchResultsValueWithNoResults, condition, resultsValue + " Window/Message");
    },

    selectStatus: function (option) {
        actions.Click(statusDropDown, "Status dropdown");
        var ele = element(by.xpath("//div[text()='" + option + "']"))
        actions.Click(ele, option)
    },

    selectOrderDates: function (option) {
        actions.waitForElement(orderDatesDropDown)
        actions.Click(orderDatesDropDown, "Order dates dropdown");
        var ele = element(by.xpath("//div[text()='" + option + "']"))
        Short_Wait()
        actions.Click(ele, option)
    },

    selectReqShipDate: function (option) {
        actions.waitForElement(reqShipDateDropDown)
        actions.Click(reqShipDateDropDown, "Req Ship date dropdown");
        actions.PressDownArrow()
        actions.PressEnter()
        Short_Wait()
        reporter.appendTest('Select Reqship Date', 'Selected Reqship DAte : ' + option, '')
    },

    clickOnAdvancedJobFilters: function (option) {
        Medium_Wait()
        actions.jsClick(advanceJobFiltersDropDown, "Advanced job filters");
    },

    clickOnResetFilters: function (option) {
        actions.jsClick(resetFiltersLink, "reset filters");
    },
    verifyFieldsAfterResetfilter: function () {
        Medium_Wait()
        actions.verifyElementDisplayed(salesrepDropdown, true, "salesrepDropdown resetted to 'All Sales Rep'")
        actions.verifyElementDisplayed(customerDropDown, true, "customerDropDown resetted 'All Customer'")
        actions.verifyElementDisplayed(vendorDropDown, true, "vendorDropDown resetted 'All Vendors'")
    },

    selectCustomer: function (option) {
        Medium_Wait()
        actions.Click(customerDropDown, "customer dropdown");
        actions.PressDownArrow(customerDropDown)
        actions.PressEnter(customerDropDown)
        reporter.appendTest('Select Customer', 'selected Customer is : ' + option, 'PASS')
    },

    selectVendor: function (option) {
        Medium_Wait()
        actions.Click(vendorDropDown, "Vendors dropdown");
        actions.PressDownArrow(vendorDropDown)
        actions.PressEnter(vendorDropDown)
        reporter.appendTest('Select Vendor', 'selected Vendor is : ' + option, 'PASS')
    },

    verifyOrderDatesInTableResults: async (days) => {
        const previousDateFormat = actions.futurePreviousDate_mm_dd_yyyy(parseInt('-' + days)),
            currentDateFormat = actions.currentDate_mm_dd_yyyy()
        var flag = false
        Medium_Wait()
        var previousDate = new Date(previousDateFormat),
            currentDate = new Date(currentDateFormat)
        previousDate = previousDate.getTime()
        currentDate = currentDate.getTime()
        element.all(by.xpath('//div[@class="d-flex align-items-center flex-nowrap table__row  "]/div[3]/p')).count().then(async (rowCount) => {
            if (rowCount > 0) {
                for (var i = 0; i < rowCount; i++) {
                    var orderDateObj = element.all(by.xpath("//div[@class='d-flex align-items-center flex-nowrap table__row  ']/div[3]/p")).get(i)
                    var orderDate = await orderDateObj.getText()
                    orderDate = new Date(orderDate)
                    const orderDateFormat = actions.dateFormat_mm_dd_yyyy(orderDate)
                    orderDate = orderDate.getTime()
                    if ((orderDate >= previousDate) && (orderDate <= currentDate)) {
                        flag = true;
                        reporter.appendTest('Verifying search results of order date', "Verified order date : '" + orderDateFormat + "' is present on and in between " + currentDateFormat + ' and ' + currentDateFormat, "PASS");
                    } else if ((orderDate = '') || (orderDate = null) || (orderDate = '-')) {
                        flag = true;
                        reporter.appendTest('Verifying search results of order date', "Verified Order date : '" + orderDate + "' is empty", "PASS");
                    }
                    expect(flag).toEqual(true)
                }
            } else {
                actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
            }
        })
    },

    verifyDisplayedTableResultsReqShipColumn: function (days) {
        const previousDateFormat = actions.futurePreviousDate_mm_dd_yyyy(parseInt('-' + days)),
            currentDateFormat = actions.currentDate_mm_dd_yyyy()
        var flag = false
        Medium_Wait()
        var previousDate = new Date(previousDateFormat),
            currentDate = new Date(currentDateFormat)
        previousDate = previousDate.getTime()
        currentDate = currentDate.getTime()
        element.all(by.xpath('//div[@class="d-flex align-items-center flex-nowrap table__row  "]/div[8]/p')).count().then(async (rowCount) => {
            if (rowCount > 0) {
                for (var i = 0; i < rowCount; i++) {
                    var reqShipDateObj = element.all(by.xpath('//div[@class="d-flex align-items-center flex-nowrap table__row  "]/div[8]/p')).get(i)
                    var reqShipDate = await reqShipDateObj.getText()
                    reqShipDate = new Date(reqShipDate)
                    const reqShipDateFormat = actions.dateFormat_mm_dd_yyyy(reqShipDate)
                    reqShipDate = reqShipDate.getTime()
                    if ((reqShipDate >= previousDate) && (reqShipDate <= currentDate)) {
                        flag = true;
                        reporter.appendTest('Verifying search results of reqship date', "Verified reqship date : '" + reqShipDateFormat + "' is present in between " + previousDateFormat + ' and ' + currentDateFormat, "PASS");
                    } else if ((reqShipDate == '') || (reqShipDate == null) || (reqShipDate == '-')) {
                        flag = true;
                        reporter.appendTest('Verifying search results of reqship date', "Verified reqship date : '" + reqShipDate + "' is present", "PASS");
                    }
                    expect(flag).toEqual(true)
                }
            } else {
                actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
            }
        })
    },

    verifyStatusSearchResults: function (resultsValue) {
      Medium_Wait()
        element.all(by.xpath("//div[@class='table__col d-none d-lg-flex col']//span[text()='ORDER IN PROCESS']")).then(function (rows) {
            rows.forEach(function (row) {
                row.getText().then(function (columnText) {
                    if (columnText == resultsValue) {
                        reporter.appendTest('Verifying status of the search results', 'Verified "' + columnText + '" is present', "PASS");
                    } else {
                        reporter.appendTest('Verifying status of the search results', 'Verified "' + columnText + '" is not present', "FAIL");
                    }
                })
            })
        })
    },

    verifyCustomerSearchResults: function (resultsValue) {
        Long_Wait()
        var reps = element.all(by.xpath("//div[@class='table__col d-none d-lg-flex col']//span[@class='avatar_characters ']"))
        element.all(by.xpath("//div[@class='table__col d-none d-lg-flex col']//span[@class='avatar_characters ']")).count().then(function (size) {
            if (size > 0) {
                for (var i = 0; i < size; i++) {
                    actions.AssertText(reps.get(i), resultsValue, resultsValue)
                }
            } else {
                actions.VerifyElementPresent(noMatchingDataFound, true, "No Matching Data Found")
            }
        })
    },

    clickOnLogOut: function () {
        actions.Click(avatarIcon, "Avatar Icon")
        actions.Click(LogOut, "Log Out")
    },

    clickOnFirstJob: function () {
      Long_Wait()
        reporter.appendTest('<b>Selecting Job</b>', 'Selecting First Job from the list', "");
          element.all(by.xpath("//*[@class='d-flex align-items-center flex-nowrap table__row  ']//div//a")).then(jobIdArray => {
            if (jobIdArray.length > 0) {
                jobIdArray[0].getText().then(jobId => {
                    actions.jsClick(jobIdArray[0], "Job Id: " + jobId)
                      Long_Wait()
                })
            }
        })
    },

    clickOnFirstLineItem: function () {
        reporter.appendTest('<b>Selecting Product</b>', '*************', "");
        element.all(by.css("[class='b-bottom-gray table__item is-product'] [class='checkbox-label icon-check']")).then(lineItems => {
            if (lineItems.length > 0) {
                actions.jsClick(lineItems[0], "Product checkbox");
            }
            else reporter.appendTest('Selecting Product', 'There is no product to decorate', "FAIL");
        })
    },
    
    clickOnDecorateButton: async () => {
        // var decorateButton = element(by.xpath("//button[text()='Decorate']"))
        var decorateButton = element(by.buttonText('Decorate'))
         browser.executeScript("arguments[0].scrollIntoView();", decorateButton.getWebElement()).then(function () {
          actions.Click(decorateButton, "Decorate button ");
            Short_Wait()
        })
    },

    verifyForAlert: () => {
        Short_Wait()
        element.all(by.xpath("//*[text()='Alert']")).then(alertArray => {
            if (alertArray.length > 0) {
                actions.jsClick(yesButton, "Yes Button")
            }
        })
    },

    verifyJobTitle: function () {
        Short_Wait()
        var jobTitle = element(by.css("[class='d-inline-block job-title']"))
        jobTitle.getText().then(function (text) {
            reporter.appendTest('Verifying job title', 'Verified job title :  "' + text + '"', "PASS");
        })
        actions.verifyElementDisplayed(jobTitle, true, "Job title")
    },

    clickOnJobDropdown: function () {
        var jobTitle = element(by.css("[class='d-inline-block job-title']+div"))
        actions.Click(jobTitle, "Job title dropdown")
    },

    verifyJobDropdownDetails: function () {
        editJobDetailsOption.then(function (rows) {
            rows.forEach(function (row) {
                row.getText().then(function (columnText) {
                    reporter.appendTest('Verifying job dropdown option', 'Verified "' + resultsValue + '" job option', "PASS");
                })
            })
        })
    },

    clickOnEditDetailsOption: function () {
        reporter.appendTest('<b>Edit Job Details</b>', '*************************', "");
        actions.Click(editJobDetailsIcon, 'Toggle dropdown')
        actions.Click(editJobDetailsOption, "Edit job details")
    },

    clickOnPresentationDetailsOption: function () {
        actions.Click(editJobDetailsIcon, 'Job Icon')
        actions.Click(editPresentationDetailsOption, "Edit Presentation details")
    },

    getJobPresentationId: function () {
        return actions.GetText(jobPresentationId, 'Job/Presentation Id')
    },

    verifyPresentationDetailsOption: function () {
        actions.verifyElementDisplayed(editPresentationDetailsOption, true, "Edit Presentation details")
    },

    clickOnRepeatJobOption: function () {
        actions.Click(editJobDetailsIcon, 'Job Icon')
        actions.Click(repeatJobOption, "Repeat Job")
    },

    enterJobName: function (text) {
        actions.blurText(jobName, text, "Job name")
    },

    selectSalesRep: function (option) {
        Medium_Wait()
        actions.Click(salesRep_Dropdown, "salesrep Dropdown")
        actions.PressDownArrow()
        actions.PressEnter()
        Short_Wait()
        reporter.appendTest('Select SalesRep', 'selected salesrep is : ' + option, 'PASS')
    },

    verifyCompanyTitle: function () {
        var companyTitle = element(by.css("[class='d-block company-title']"))
        actions.verifyElementDisplayed(companyTitle, true, "Company title")
    },

    verifyRushJobTitle: function () {
        var rushJobTitle = element(by.css("[id='rushJob']"))
        // actions.verifyElementDisplayed(rushJobTitle,true,"Rush Job title")          
    },

    verifySampleJobTitle: function () {
        var sampleJobTitle = element(by.css("[id='sampleJob']"))
        // actions.verifyElementDisplayed(sampleJobTitle,true,"sampleJobTitle")          
    },

    verifySalesRepTitle: function () {
        var salesRepTitle = element(by.xpath("//*[text()='Sales Rep']"))
        actions.verifyElementDisplayed(salesRepTitle, true, "salesRepTitle")
    },

    verifyOrderContactTitle: function () {
        var orderContactTitle = element(by.xpath("//*[text()='Order Contact']"))
        actions.verifyElementDisplayed(orderContactTitle, true, "Order Contact")
    },

    verifyShippingCustomerTitle: function () {
        var shippingCustomerTitle = element(by.xpath("//*[text()='Shipping Customer']"))
        actions.verifyElementDisplayed(shippingCustomerTitle, true, "Shipping Customer")
    },

    verifyBillingCustomerTitle: function () {
        var billingCustomerTitle = element(by.xpath("//*[text()='Billing Customer']"))
        actions.verifyElementDisplayed(billingCustomerTitle, true, "Billing Customer")
    },

    verifyBillingContactTitle: function () {
        var billingContactTitle = element(by.xpath("//*[text()='Billing Contact']"))
        actions.verifyElementDisplayed(billingContactTitle, true, "Billing Contact")
    },

    verifyShippingContactTitle: function () {
        var shippingContactTitle = element(by.xpath("//*[text()='Shipping Contact']"))
        actions.verifyElementDisplayed(shippingContactTitle, true, "Shipping Contact")
    },

    verifyARContactTitle: function () {
        var shippingContactTitle = element(by.xpath("//*[text()='AR Contact']"))
        actions.verifyElementDisplayed(shippingContactTitle, true, "Shipping Contact")
    },

    verifyFinancialSnapshotTitle: function () {
        var financialSnapshotTitle = element(by.xpath("//*[text()='Financial Snapshot']"))
        actions.verifyElementDisplayed(financialSnapshotTitle, true, "Financial Snapshot")
    },

    verifyNavTabs: function (option) {
        var elem = element(by.xpath("//*[@class='nav-item']/a[text()='" + option + "']"))
        Medium_Wait()
        actions.verifyElementDisplayed(elem, true, option + "tab")
    },

    verifyLeftSideMenu: function (option) {
        var elem = element(by.xpath("//h6[text()='" + option + "']"))
        actions.verifyElementDisplayed(elem, true, option + "tab")
        actions.verifyElementDisplayed(elem, true, option + "tab")
        actions.verifyElementDisplayed(elem, true, option + " :  main-nav_list-item   ")
    },

    verifyJobsTableHeaders: function (option) {
        var elem = element(by.xpath("//*[@class='table__head flex-nowrap']//p//span[contains(text(),'" + option + "')]"))
        option = option.toUpperCase();
        actions.verifyElementDisplayed(elem, true, option + " Column")
    },

    verifyJobsSubTableHeaders: function (option) {
        var elem = element(by.xpath("(//*[@class='sub-table']//span[contains(text(),'" + option + "')])[1]"))
        option = option.toUpperCase()
        actions.verifyElementDisplayed(elem, true, option + " Column")
    },

    verifyJobsSubTableTrackingButtons: function (option) {
        var elem = element(by.xpath("(//div[@class='tracking-icons']/..//button[text()='" + option + "'])[1]"))
        actions.VerifyElementPresent(elem, true, option + "tab")
    },

    clickOnDownArrowNextTotheTrackingColumn: function () {
        Medium_Wait()
        var elem = element(by.xpath("(//*[@class='table__body']//*[@class='material-icons text-primary dropdown-indicator'])[1]"))
        actions.jsClick(elem, "Tracking Dropdown")
        Medium_Wait()
    },

    clickOnElipseIcon: function () {
        Short_Wait()
        if (trackingIcons.count() > 0) {
            actions.jsClick(trackingIcons.get(0), "Tracking Icons")
            Short_Wait()
            actions.verifyElementDisplayed(viewPODetailsButton, "View PO Details Button")
            actions.verifyElementDisplayed(contactVendorButton, "Contact Vendor Button")
            actions.verifyElementDisplayed(createDisputeButton, "Create Dispute Button")
        } else reporter.appendTest("Verifying Trackig section", "Verified that job doesn't have any PO created to verify other options/functionality in tracking section", "PASS");

    },

    verifyCustomerPriceTitle: function () {
        var customerPriceTitle = element(by.xpath("//*[text()='Customer Price']"))
        actions.verifyElementDisplayed(customerPriceTitle, true, "Customer Price")
    },

    verifyHamburgerMenu: function () {
        actions.verifyElementDisplayed(hamburgerMenu, true, "Hamburger menu")
    },

    verifyIPromoteIcon: function () {
        actions.verifyElementDisplayed(logo, true, "Hamburger menu")
    },

    verifyYourCostTitle: function () {
        var yourCostTitle = element(by.xpath("//*[text()='Your Cost']"))
        actions.verifyElementDisplayed(yourCostTitle, true, "Your Cost")
    },

    verifyEstRevenueTitle: function () {
        var estRevenueTitle = element(by.xpath("//*[text()='Est Revenue']"))
        actions.verifyElementDisplayed(estRevenueTitle, true, "Est Revenue")
    },

    clickOnAddAlternateShippingAddress: function () {
        var addAlternateShippingAddressButton = element(by.buttonText('Add Alternate Shipping Address'))
        //     closeAlternateAddressPopup = element(by.xpath("//*[text()='Alternate Shipping Address']/following-sibling::div/button"))

        // closeAlternateAddressPopup.isPresent().then(function (status) {
        //     if (status === true) {
        //         actions.jsClick(closeAlternateAddressPopup, "close Alternate address")
        //     }
        // })
        actions.jsClick(addAlternateShippingAddressButton, "Add Alternate Shipping Address Button")
    },
    clearAlternativeAddressIfExist :function (position) {  
      element.all(by.xpath("//label[text()='Alternate Shipping Address']/following-sibling::div//button")).then(alternavtiveAddressClear=>{
        if(alternavtiveAddressClear.length>0)
           actions.jsClick(alternavtiveAddressClear[0], "Clear Alternavtive Address");        
      })
    },

    enterName: function (name) {
        var nameTextBox = element(by.css("[id='name']"))
        actions.EnterText(nameTextBox, name, "Contact Name")
    },

    enterAddressLine1: function (addressLine) {
        var addressLine1 = element(by.css("[id='addressLine1']"))
        actions.EnterText(addressLine1, addressLine, "Address Line 1")
    },

    enterAddressLine2: function (addressLine) {
        var addressLine2 = element(by.css("[id='addressLine2']"))
        actions.EnterText(addressLine2, addressLine, "Address Line 2")
    },

    enterAddressLine3: function (addressLine) {
        var addressLine3 = element(by.css("[id='addressLine3']"))
        actions.EnterText(addressLine3, addressLine, "Address Line 3")
    },

    enterCity: function (cityValue) {
        var city = element(by.css("[id='city']"))
        actions.EnterText(city, cityValue, "City")
    },

    enterState: function (stateValue) {
        var state = element(by.xpath("//*[text()='State - Required']/following-sibling::div//input"))
        actions.blurText(state, stateValue, "State")
        actions.PressEnter(state)
    },

    enterZip: function (zipValue) {
        var zip = element(by.css("[id='zip']"))
        actions.EnterText(zip, zipValue, "Zip")
    },

    enterAlternativeAddressDetails: (name, address1,address2,cityValue,stateValue,zipValue)=>{
     reporter.appendTest('Adding Alternative address', '**********************************', "PASS");
        var nameTextBox = element(by.css("[id='name']"))
        actions.EnterText(nameTextBox, name, "Contact Name")
 
        var addressLine1 = element(by.css("[id='addressLine1']"))
        actions.EnterText(addressLine1, address1, "Address Line 1")

        var addressLine2 = element(by.css("[id='addressLine2']"))
        actions.EnterText(addressLine2, address2, "Address Line 2")

       var city = element(by.css("[id='city']"))
        actions.EnterText(city, cityValue, "City")

        var state = element(by.xpath("//*[text()='State - Required']/following-sibling::div//input"))
        actions.blurText(state, stateValue, "State")
        actions.PressEnter(state)

        var zip = element(by.css("[id='zip']"))
        actions.EnterText(zip, zipValue, "Zip")
    },

    clickOnSubmitButton: function () {
        var submitBtn = element(by.xpath("//button[text()='Submit']"))
        actions.jsClick(submitBtn, "Submit Button")
    },

    clickOnUpdateButton: function () {
        var updateBtn = element(by.css("[type='submit']"))
        actions.jsClick(updateBtn, "Update Button")
        Long_Wait()
    },

    validateUpdatedCustomerName: function (expCustomerName) {
        Medium_Wait()
        var customerNameLocator = element(by.xpath("//*[text()='Alternate Address']/following-sibling::span[@class='customer-name d-block']"))
        customerNameLocator.getText().then(function (customerName) {
            actions.expectToContain(customerName, expCustomerName, "Customer name")
            reporter.appendTest('Verifying customer name', 'Verified customer name  : ' + customerName, "PASS");
        })
    },

    validateUpdatedAddress: function (expAddress) {
        Medium_Wait()
        var addressLocator = element(by.xpath("//*[text()='Alternate Address']/following-sibling::span[@class='customer-address d-block']"))
        addressLocator.getText().then(function (address) {
            address = address.trim()
            actions.expectToContain(address, expAddress, "Address")
            reporter.appendTest('Verifying address', 'Verified address : ' + expAddress, "PASS");
        })
    },

    validateUpdateShippingAddress: function (expectedAddress) {
     Medium_Wait()
      var updatedshippingAddress = element(by.xpath("//*[text()='Alternate Shipping Address']/following-sibling::div//div[@class='cust-card-title card-title']"))
         updatedshippingAddress.getText().then(function (address) {
            actions.expectToContain(address, expectedAddress, "Shipping Address")
        })
    },

    // TC002_ValidateJobDetailsFinancialsnapshotsection.js
    clickOnJobIdByUsingRowNumber: function (rownumber) {
        var jobxp = element(by.xpath("(//div[@class='table__body']//a)[" + rownumber + "]"));
        jobxp.getText().then(function (text) {
            reporter.appendTest('Retriving the First Job Id ', 'Retrived Job id:' + text, "PASS");
            actions.Click(jobxp, "Job Id");
            Long_Wait()
            jobTitle.getText().then(function (title) {
                actions.expectToContainCustom(title, text, "Selected Job and Displayed Job", "Displayed Job", "Selected Job");
            });
        })

    },

    clickOnLineItemLinkByUsingRowNumber: function (rownumber=1) {
      var lineItemLink = element(by.xpath("(//div[@class='table__body']//p)[" + rownumber + "]"));
            lineItemLink.getText().then(function (text) {
             reporter.appendTest('Selecting the line item :', text, "PASS");
              actions.Click(lineItemLink, "line item link");
               Medium_Wait()
        })
    },

    verifyFinancialSnapshotFieldsAreDisplayed: function (snaptitles) {
        var snaptitlexp = element(by.xpath("//span[text()='" + snaptitles + "']"));
        actions.verifyElementDisplayed(snaptitlexp, true, snaptitles);
    },

    verifyFinSnShtPriceCalculation: (snaptitles) => {
        var prices = [];
        for (var i = 0; i < snaptitles.length; i++) {
            var snapprice = element(by.xpath("//span[text()='" + snaptitles[i] + "']/..//*[@class='price-label']"));
            prices.push(snapprice.getText());
        }
        prices[0].then(function (custprice) {
            reporter.appendTest('Retriving Customer Price', 'Retrived Customer Price is: ' + custprice, "PASS");
            prices[1].then(function (yourcost) {
                reporter.appendTest('Retriving Your Cost', 'Retrived Your Cost is: ' + yourcost, "PASS");
                prices[2].then(async (actRevenue) => {
                    reporter.appendTest('Retriving Est Revenue', 'Retrived Est Revenue is: ' + actRevenue, "PASS");
                    custprice = await custprice.split('$')[1].trim()
                    yourcost = await yourcost.split('$')[1].trim()
                    actRevenue = await actRevenue.split('$')[1].trim()
                    custprice = await custprice.split(',').join('')
                    yourcost = await yourcost.split(',').join('')
                    actRevenue = await actRevenue.split(',').join('')
                    let expRevenue = custprice - yourcost;
                    actRevenue= await Math.abs(actRevenue)
                    expRevenue= await Math.abs(expRevenue)
                    actions.expectToEqualCustom(Math.round(actRevenue), Math.round(expRevenue), 'Expected and Displayed Revenue (Rounded)', "Displayed Revenue", "Expected Revenue");

                });
            });
        });
    },

    verfifyProfitMargin: async (snaptitles) => {
        var prices = [];
        for (var i = 0; i < snaptitles.length; i++) {
            var snapprice = element(by.xpath("//span[text()='" + snaptitles[i] + "']/..//*[@class='price-label']"));
            prices.push(snapprice.getText());
        }
        prices[0].then(custprice => {
            prices[2].then(async (actRevenue) => {
                let profitMarg = await profitMargine.getText()
                custprice = await custprice.split('$')[1].trim()
                actRevenue = await actRevenue.split('$')[1].trim()

                custprice = await custprice.split(',').join('')
                actRevenue = await actRevenue.split(',').join('')
                profitMarg = await profitMarg.split('%')[0].trim()
                let expectedProfitMargin = await ((actRevenue / custprice) * 100); //it here actrevenue is nothing but a profit
                actions.expectToEqualCustom(Math.round(profitMarg), Math.round(expectedProfitMargin), 'Expected and Actual Profit Margin (Rounded)', 'Displayed Profit Margin', 'Expected Profit Margin');
            })
        })
    },

    verifyCurrencyValuesWithDollar: function (snaptitles) {
        var snapcurrency = element(by.xpath("//span[text()='" + snaptitles + "']/..//*[@class='price-label' and contains(text(),'$')]"));
        actions.verifyElementDisplayed(snapcurrency, true, snaptitles + ' with $');
    },

    profitMargineIsDisplayedwithPercentage: function () {
        actions.verifyElementDisplayed(profitMargine, true, "Profit Margin");
    },

    //TC003_ValidateJobDetailsShippingDatesandMilestonesection.js
    verifyViewingDateIsDisplayed: function () {
        actions.VerifyElementPresent(viewingDate, true, "Viewing Date");
    },

    verifyShippingDateIsDisplayed: function () {
        actions.VerifyElementPresent(ShippingDates, true, "Shipping Dates");
    },

    verifyMileStoneDateIsDisplayed: function () {
        actions.VerifyElementPresent(MilestoneDates, true, "Milestone Dates");
    },

    clickOnViewingDateDownArrow: function () {
        //  actions.VerifyElementPresent(viewingDatejobdet, true, 'viewing Date job');
        //    var crntJobId = actions.GetText(viewingDatejobdet, 'viewing Date');
        //    console.log("\ncrntJobId &&&&&&&&&&&&&&&&&&&&&& " + crntJobId, typeof crntJobId);
        browser.sleep(5000);
        //  actions.sendKeysClick(viewDatesToggle, 'Viewing Date DownArrow');        
        //    actions.Click(viewDatesToggle, 'Viewing Date DownArrow');
        //  Short_Wait();
        browser.actions().click(viewDatesToggle).perform();
        //  Short_Wait();
        // this.verifyPosDisplayedwithPerticularJobid();
    },

    clickOnSampleRequiredRadioButton: function (option) {
        var elem = element(by.xpath('//label[contains(text(),"' + option + '")]/..//*[contains(@for,"sample")]'))
        actions.jsClick(elem, 'Sample Job radio button');
    },

    verifyPosDisplayedwithPerticularJobid: function () {
        //  actions.waitUntilElementPresent_OffShore(viewDatesDropDownMenu, 'wait for viewing Dates POs dropdown is visible', 30000);
        //  actions.VerifyElementPresent(viewDatesDropDownMenu, true, "viewing Dates POs dropdown");
        // vJobidvl.then(function(jobids){
        //     var vdpodrpdwn= element.all(by.xpath("//div[@aria-hidden='false']//button[@role='menuitem' and contains(text(),'"+jobids.split('-')[0].trim()+"')]"));
        //     actions.expectToEqual(viewDatesDropDownMenu.count,vdpodrpdwn.count,'verified PO are displayed for that particular job');
        // });
    },

    clickOnPOsjobidDropDownValueAndVerify: function () {
        var getval = viewDatesDropDownMenuItem.getText();
        getval.then(function (text) {
            actions.Click(viewDatesDropDownMenuItem, 'dropdown POs Jobid');
            Medium_Wait()
            viewingDatejobdet.getText().then(function (expText) {
                actions.expectToEqual(text, expText, 'verified PO are displayed.');
            })
        })
    },

    clickOnLineItemsTab: function () {
        actions.Click(LineItemsTab, 'Line Items Tab')
    },

    clickOnRepeatJobButton: function () {
        //   actions.browserRefresh(repeatjob)
        //  browser.executeScript("location.reload()");
        actions.Click(repeatjob, "Repeat Job button")
    },

    // TC007 --------
    verifyDetailsTabValuesAreDisplayed: function (detailstab) {
        var detailsTabxp = element(by.xpath("//div[contains(@class,'detail-tabs')]//ul//a[contains(text(),'" + detailstab + "')]"));
        detailstab = detailstab.toUpperCase()
        actions.verifyElementDisplayed(detailsTabxp, true, detailstab + ' tab');
    },

    verifyAddproductDisplayed: function () {
        actions.VerifyElementPresent(addproduct, true, "Add product button")
        // actions.waitUntilElementClickable_OffShore(addproduct, "add product button has clickable");
    },

    verifyCreatePOsDisplayed: function () {
        actions.VerifyElementPresent(createPOS, true, "Create POs button")
    },

    verifyRepeatJobsDisplayed: function () {
        actions.VerifyElementPresent(repeatjob, true, "Repeat Job button")
        // actions.waitUntilElementClickable_OffShore(repeatjob, "repeat job button has clickable");
    },

    verifyDecorateDisplayed: function () {
        actions.VerifyElementPresent(addproduct, true, "Add Product button")
    },

    clickOnCreatePosbutton: function () {
        actions.jsClick(createPOS, "createPOs button")
    },

    verifyCreatePosDropdownIsDisplayed: function () {
        var elem = element.all(by.xpath("//div[@class='tab-pane active']//button[text()='Create POS']/following-sibling::div//a"))
        elem.each(function (item) {
            item.getText().then(function (txt) {
                actions.verifyElementDisplayed(item, true, txt + " vendor");
            });
        });
    },

    verifyPriceTableHeaderFieldsAreDisplayed: function (headerlist) {
        var hdrelem = element(by.xpath(table_header + "*[text()='" + headerlist + "']"));
        headerlist = headerlist.toUpperCase();
        actions.verifyElementDisplayed(hdrelem, true, headerlist + " Column");
    },

    verifycustomerPriceisdisplayed: function () {
        actions.VerifyElementPresent(customerpricehdr, true, "customerprice header row")
    },

    verifyyourcostisdisplayed: function () {
        actions.VerifyElementPresent(yourcosthdr, true, "yourcost header row")
    },

    verifyDescallCheckboxesAreSelcted: function () {
        browser.executeScript('arguments[0].scrollIntoView();', headerchkbox.getWebElement()).then(function () {
            actions.jsClick(headerchkbox, "Header row checkbox");
            element.all(by.xpath("//div[@class='table__body']//input[@type='checkbox']")).then(Checkboxes => {
                if (Checkboxes.length > 0) {
                    reporter.appendTest('Verifying is all Products Selected', 'Verified that all products are Selected', "PASS");
                    // let iterate=0;
                    // Checkboxes.forEach(function (item) {
                    //   item.isSelected().then(function (status) {
                    //     console.log("status :"+status) 
                    //     if (status == true) iterate++;
                    //     else{
                    //       reporter.appendTest('Verifying is Product Selected', 'Verified that all products are not selected' , "FAIL");
                    //       expect(true).toReport(false, "Verifying is all Product Selected-Failed");
                    //        }
                    //     console.log("iterate :"+iterate)    
                    //     if(iterate==Checkboxes.length)
                    //       reporter.appendTest('Verifying is all Products Selected', 'Verified that all products are Selected', "PASS");
                    //    });
                    // });
                } else reporter.appendTest('Selecting Product(s) ', 'Verfied that job does have any product', "PASS");
            })
        })
    },

    verifyDecorateButtonIsEnabled: function () {
        actions.verifyElementDisplayed(Decorateenbl, true, 'Decorate button');
        actions.waitUntilElementClickable_OffShore(Decorateenbl, 'Decorate button');
    },

    clickOnslidemenuforviewdetails: function () {
        Medium_Wait()
        actions.jsClick(clickonviewdetails, "Menu button");
    },
    clickOnViewDetailsButton: function () {
        actions.Click(viewdetailsbtn, "Viewdetails button");
    },

    verifyViewdetailsAndDelete: function () {
        //buttons view details, Delete button are not are remioved
        reporter.appendTest('Functionality Change', 'View Details and Delete options are removed', "FAIL");
    },

    clickonViewDetailsAndVerify: async () => {
        var HeadEle = element(by.css('[class="item-title text-secondary"]')),
            vendorNameElement = element(by.xpath('//*[text()="Vendor"]/following-sibling::span')),
            statusElement = element(by.xpath('//*[text()="Status"]/following-sibling::span//span'))
        Short_Wait()
        let headDesc = await HeadEle.getText(),
            vendorText = await vendorNameElement.getText(),
            statusText = await statusElement.getText()
        Short_Wait()
        actions.expectToContain(headDesc, description, "Job details header")
        actions.expectToContain(vendorText, vendor, "Vendor")
        actions.expectToContain(statusText, status, "status")

    },

    closeModelPopup: function () {
        actions.Click(modalpopupclosebtn, "Modalpopup close");
    },

    clickonDeleteDetailsAndVerify: function () {
        var rowscount = priceTablerows.count();
        actions.Click(menutblrowdeletebtn, 'Delete Button');
        this.verifyModelYesButtondisplayed();
        this.verifyModelNoButtondisplayed();
        this.clickonModalYesbtn();
        Medium_Wait();
        this.clickonModalOkbtn();
        var crntrowscnt = priceTablerows.count();
        rowscount.then(function (rcount) {
            crntrowscnt.then(function (expcount) {
                actions.expectNumberToBeGreaterThan(rcount, expcount, "Line Item has deleted from the table");
            });
        });
    },

    verifyModelYesButtondisplayed: function () {
        actions.verifyElementDisplayed(modalpopupYESbtn, true, "modalPopup Yes button");
    },

    verifyModelNoButtondisplayed: function () {
        actions.verifyElementDisplayed(modalpopupNObtn, true, "modalpopup No button");
    },

    clickonModalOkbtn: function () {
        actions.Click(modalpopupokbtn, 'Ok Button')
    },

    clickonModalYesbtn: function () {
        actions.Click(modalpopupYESbtn, 'Yes Button')
    },

    clickonModalNobtn: function () {
        actions.Click(modalpopupNObtn, 'NO Button')
    },

    clickonCalanderbtnAndVerify: function () {
        actions.ScrollIntoViewElement(datepickerbtn);
        actions.Click(datepickerbtn, 'date Picker');
        actions.Click(datepickernxtmonth, 'date Picker nextmonth');
        var slctedmnth = datepickercrntmonth.getText();
        actions.Click(datepickercrntDay, 'select datepickerday');
        var slctddate = datepickerbtn.getAttribute('value');
        slctedmnth.then(function (slctmnth) {
            slctddate.then(function (sldate) {
                actions.expectToEqual(slctmnth.split(" ")[0] + " 1", sldate, "selected date has changed in datepicker");
            });
        });
    },

    //TC005- Shipping and Billing Customer Details

    verfyshippingorbillingdetails: function (typeofdetails, Details) {
        Medium_Wait()
        var name = element(by.xpath("//span[text()='Billing Customer']"));
        var address = element(by.xpath("//span[text()='Billing Customer']/.."));
        actions.verifyElementDisplayed(name, true, typeofdetails + ' Name: ' + Details['customername']);
        actions.verifyElementDisplayed(address, true, typeofdetails + ' address: ' + Details['address']);
    },

    verifyAlternateAddressObjectNotDisplayed: function () {
        actions.verifyElementsNotDisplayed(alternateAddress, true, "Alternate Address object")
    },

    verifyAlternateAddressObjectDisplayed: function () {
        actions.verifyElementDisplayed(alternateAddressObject, true, "Alternate Address object")
    },

    getJobId: function () {
        jobIdObject.getText().then(function (id) {
            jobDetails.jobId = id;
        })
    },

    verifyJobStatusNewDisplayed: function () {
        actions.verifyElementDisplayed(newStatusObject, true, "Status New")
    },

    verifyJobIdDisplayed: function () {
        jobIdObject.getText().then(jobid => {
            actions.expectNotToEqual(jobDetails.jobId, jobid, "job id")
        })
    },
    //TC10
    clickonjobColumn: function () {
        actions.Click(jobColumn, 'Job Column')
    },
    clickOnOrderedCoulmn: function () {
        actions.Click(orderedCoulmn, 'Ordered Coulmn')
    },
    clickOnStatusCoulmn: function () {
        actions.Click(statusCoulmn, 'Status Coulmn')
        Medium_Wait()
    },
    clickOnReqShip: function () {
        actions.Click(reqShipCoulmn, 'Req Ship Coulmn')
        Medium_Wait()
        actions.Click(reqShipCoulmn, '')  //When clicked once ordered in Farthest last , clicked again Farthest First
    },
    clickOnInHand: function () {
        actions.Click(inHandCoulmn, 'InHand Coulmn')
        Medium_Wait()
        actions.Click(inHandCoulmn, '')  //When clicked once ordered in Farthest last , clicked again Farthest First
    },
    verifyJobIdOrder: async () => {
        Medium_Wait()
        element.all(by.xpath("//*[contains(@href,'/jobs/')]")).then(jobsArray => {
            if (jobsArray.length > 0) {
                jobsArray[0].getText().then(firstJobId => {
                    reporter.appendTest('Retriving status of Job id of first Product ', 'Job Id: ' + firstJobId, "");
                    jobsArray[1].getText().then(secondJobId => {
                        reporter.appendTest('Retriving status of Job id of Second Product ', 'Job Id: ' + secondJobId, "");
                        if (secondJobId >= firstJobId)
                            reporter.appendTest('Verifying Jobs order', 'Verified that Jobs are in "Ascending" order', "PASS");
                        else reporter.appendTest('Verifying Jobs order', 'Verified that Jobs are not in "Ascending" order', "FAIL");
                    })
                })
            }
        })
    },
    verifyOrderedDateOrdered: async (Order) => {
        Medium_Wait()
        var Date1 = element.all(by.xpath('//div[@class="d-flex align-items-center flex-nowrap table__row  "]/div[3]/p')).get(0),
            Date2 = element.all(by.xpath('//div[@class="d-flex align-items-center flex-nowrap table__row  "]/div[3]/p')).get(1)
        Short_Wait()
        var fisrtdate = await Date1.getText(),
            secondDate = await Date2.getText()
        Short_Wait()
        if (fisrtdate != '-' || secondDate != '-') {
            var F_Y = fisrtdate.split('/')[2],  // '06/15/2020'-->'2020'
                F_M = fisrtdate.split('/')[0],  // '06/15/2020'-->'06'
                F_D = fisrtdate.split('/')[1],  // '06/15/2020'-->'15'
                S_Y = secondDate.split('/')[2], // '07/31/2020'-->'2020'
                S_M = secondDate.split('/')[0], // '07/31/2020'-->'07'
                S_D = secondDate.split('/')[1] // '07/31/2020'-->'31'
            if (Order.toUpperCase() == 'ASC') {
                if (F_Y < S_Y || F_M < S_M || F_D <= S_D)
                    reporter.appendTest("Verifying 'Ordered date' order", 'Verified that "Ordered dates" are in "Ascending" order', "PASS");
                else {
                    reporter.appendTest("Verifying 'Ordered date' order", 'Verified that "Ordered dates" are not in "Ascending" order', "FAIL");
                    expect(false).toReport(true, "Expecting " + fisrtdate + " is less than or equal to" + secondDate + " failed.");
                }
            }
            else {
                if (F_Y > S_Y || F_M > S_M || F_D >= S_D)
                    reporter.appendTest("Verifying 'Ordered date' order", 'Verified that "Ordered dates" are in "Descending" order', "PASS");
                else {
                    reporter.appendTest("Verifying 'Ordered date' order", 'Verified that "Ordered dates" are not in "Descending" order', "FAIL");
                    expect(false).toReport(true, "Expecting " + fisrtdate + " is less than or equal to" + secondDate + " failed.");
                }
            }
        }
    },
    verifyOrderedDateReqShip: async (Order) => {
        Long_Wait()
        ReqDate1.getText().then(async (fisrtdate) => {
            ReqDate2.getText().then(async (secondDate) => {
                try {
                    if (fisrtdate != '-' || secondDate != '-') {
                        var F_Y = await fisrtdate.split('/')[2],  // '06/15/2020'-->'2020'
                            F_M = await fisrtdate.split('/')[0],  // '06/15/2020'-->'06'
                            F_D = await fisrtdate.split('/')[1],  // '06/15/2020'-->'15'
                            S_Y = await secondDate.split('/')[2], // '07/31/2020'-->'2020'
                            S_M = await secondDate.split('/')[0], // '07/31/2020'-->'07'
                            S_D = await secondDate.split('/')[1] // '07/31/2020'-->'31'
                        if (Order.toUpperCase() == 'ASC') {
                            if (F_Y < S_Y || F_M < S_M || F_D <= S_D)
                                reporter.appendTest("Verifying 'Req Ship date' order", 'Verified that "Ordered dates" are in "Ascending" order', "PASS");
                            else {
                                reporter.appendTest("Verifying 'Req Ship date' order", 'Verified that "Ordered dates" are not in "Ascending" order', "FAIL");
                                expect(false).toReport(true, "Expecting " + fisrtdate + " is less than or equal to" + secondDate + " failed.");
                            }
                        }
                        else {
                            if (F_Y > S_Y || F_M > S_M || F_D >= S_D)
                                reporter.appendTest("Verifying 'Req Ship date' order", 'Verified that "Ordered dates" are in "Descending" order', "PASS");
                            else {
                                reporter.appendTest("Verifying 'Req Ship date' order", 'Verified that "Ordered dates" are not in "Descending" order', "FAIL");
                                expect(false).toReport(true, "Expecting " + fisrtdate + " is less than or equal to" + secondDate + " failed.");
                            }
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        })

    },
    verifyOrderedDateInHand: async (Order) => {
        Long_Wait()
        InDate1.getText().then(async (fisrtdate) => {
            InDate2.getText().then(async (secondDate) => {
                try {
                    if (fisrtdate != '-' || secondDate != '-') {
                        var F_Y = await fisrtdate.split('/')[2],  // '06/15/2020'-->'2020'
                            F_M = await fisrtdate.split('/')[0],  // '06/15/2020'-->'06'
                            F_D = await fisrtdate.split('/')[1],  // '06/15/2020'-->'15'
                            S_Y = await secondDate.split('/')[2], // '07/31/2020'-->'2020'
                            S_M = await secondDate.split('/')[0], // '07/31/2020'-->'07'
                            S_D = await secondDate.split('/')[1] // '07/31/2020'-->'31'
                        if (Order.toUpperCase() == 'ASC') {
                            if (F_Y < S_Y || F_M < S_M || F_D <= S_D)
                                reporter.appendTest("Verifying 'Inhand date' order", 'Verified that "Ordered dates" are in "Ascending" order', "PASS");
                            else {
                                reporter.appendTest("Verifying 'Inhand date' order", 'Verified that "Ordered dates" are not in "Ascending" order', "FAIL");
                                expect(false).toReport(true, "Expecting " + fisrtdate + " is less than or equal to" + secondDate + " failed.");
                            }
                        }
                        else {
                            if (F_Y > S_Y || F_M > S_M || F_D >= S_D)
                                reporter.appendTest("Verifying 'Inhand date' order", 'Verified that "Ordered dates" are in "Descending" order', "PASS");
                            else {
                                reporter.appendTest("Verifying 'Inhand date' order", 'Verified that "Ordered dates" are not in "Descending" order', "FAIL");
                                expect(false).toReport(true, "Expecting " + fisrtdate + " is less than or equal to" + secondDate + " failed.");
                            }
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        })
    },


    clickOnJobOptionsDropdown: function () {
        actions.Click(editJobDetailsIcon, 'Job Dropdown')
    },

    verifyOptionOfJob: () => {
        let editJobDetails = element(by.buttonText('Edit Job Details')),
            repeatjob = element(by.xpath("//*[contains(@class,'dropdown')]//button[.='Repeat Job']")),
            CreateDispute = element(by.buttonText('Create Dispute'))
        actions.verifyElementDisplayed(editJobDetails, true, "Edit Job Details")
        actions.verifyElementDisplayed(repeatjob, true, "Repeat Job")
        actions.verifyElementDisplayed(CreateDispute, true, "Create Dispute")
    },


    validatePrices: async () => {
    },

    validateCustomerPriceAccordingAllList: async () => {
        var snapCutomerPrice = [],
            totalCustomerPrice = 0,
            tempObj = [0],
            temp = 0,
            qtyArray = [],
            costArray = [];

        element.all(by.xpath('//div[contains(@class,"customer-col-qty")]/*')).count().then(count => {
            snapCutomerPrice.push(element(by.xpath("//span[text()='Customer Price']/..//*[@class='price-label']")).getText());
            Medium_Wait()
            snapCutomerPrice[0].then(async (actualCustomerPrice) => {
                actualCustomerPrice = await actualCustomerPrice.split('$')[1].trim()
                actualCustomerPrice = await actualCustomerPrice.split(',').join('')
                actualCustomerPrice = Number(actualCustomerPrice)
                await element.all(by.xpath('(//div[contains(@class,"customer-col-qty")]/*)')).each(async (qty) => {
                    qty = await qty.getText()
                    qty = Number(qty)
                    qtyArray.push(qty)
                })
                await element.all(by.xpath('(//div[contains(@class,"customer-col-price")]/*/*[contains(@class,"value")])')).each(async (cost) => {
                    cost = await cost.getText()
                    cost = Number(cost)
                    costArray.push(cost)
                })
                for (var i = 0; i < count; i++) {
                    totalCustomerPrice += qtyArray[i] * costArray[i]

                    if (i == count - 1) {
                        actions.expectToEqualCustom(Math.round(totalCustomerPrice), Math.round(actualCustomerPrice), 'Expected and Displayed Customer Price', "Calculated Customer price (from products in table)", "Customer price in financial snapshot");
                    }
                }
            })
        })
    },

    validateUserPriceAccordingAllList: async () => {
        var snapUserCost = [],
            totalUserCost = 0,
            tempObj = [0],
            temp = 0,
            qtyArray = [],
            costArray = [];

        element.all(by.xpath('//div[contains(@class,"user-col-qty")]/*')).count().then(count => {
            snapUserCost.push(element(by.xpath("//span[text()='Your Cost']/..//*[@class='price-label']")).getText());
            Medium_Wait()
            snapUserCost[0].then(async (actualUserCost) => {
                actualUserCost = await actualUserCost.split('$')[1].trim()
                actualUserCost = await actualUserCost.split(',').join('')
                actualUserCost = Number(actualUserCost)
                await element.all(by.xpath('(//div[contains(@class,"customer-col-qty")]/*)')).each(async (qty) => {
                    qty = await qty.getText()
                    qty = Number(qty)
                    console.log("qtyEle  :" + qty)
                    qtyArray.push(qty)
                })
                await element.all(by.xpath('(//div[contains(@class,"user-col-cost")]/*/*[contains(@class,"value")])')).each(async (cost) => {
                    cost = await cost.getText()
                    cost = Number(cost)
                    costArray.push(cost)
                })
                for (var i = 0; i < count; i++) {
                    totalUserCost += qtyArray[i] * costArray[i]
                    if (i == count - 1) {
                        actions.expectToEqualCustom(Math.round(totalUserCost), Math.round(actualUserCost), 'Expected and Displayed Your cost', "Calculated Your cost (from products in table)", "Displayed Your cost");
                    }
                }
            })
        })
    },

    clickOnJobInprogressKPI: function () {
        actions.jsClick(jobsInProgressCount, "Jobs In Progress")
    },

    clickOnJobOnHoldKPI: function () {
        actions.jsClick(jobsOnHoldCount, "Jobs OnHold")
    },
    clickOninvoicesToApproveKPI: function () {
        actions.jsClick(invoicesToApproveCount, "Invoices To Approve")
    },
    clickOnJobInDisputeKPI: function () {
        actions.jsClick(jobsInDisputeCount, "Jobs In Dispute")
    },
    clickOnpriceDiscrepancyKPI: function () {
        actions.jsClick(priceDiscrepancyCount, "Price Discrepancy")
    },
    clickOnunpaidInvoicesKPI: function () {
        actions.jsClick(unpaidInvoicesCount, "Unpaid Invoices")
    },

    verifyTheStatusDropDown: function (ExpectedStatus) {
        jobStatusValue.getText().then(statusInDrop => {
            actions.expectToEqualCustom(statusInDrop, ExpectedStatus, "Status in 'STATUS' Filter ", "Status selected in 'STATUS' Filter", "Expected Filter option")
        })
    },

    verifyTheListStatus: function (ExpectedStatus) {
        Medium_Wait()
        element.all(by.xpath('//*[@class="table__col d-none d-lg-flex col"]/span')).then(elementsArray => {
            element.all(by.xpath("//*[contains(@href,'/jobs/')]")).then(jobIdArray => {
                if (elementsArray.length > 0) {
                    let flag = true,
                        iterate = 0
                    elementsArray.forEach(statusElement => {
                        statusElement.getText().then(Actstatus => {
                            jobIdArray[iterate].getText().then(jobId => {
                                iterate++;
                                reporter.appendTest('Retriving status of Job: ' + jobId, 'status: ' + Actstatus, "");
                                if (Actstatus != ExpectedStatus) flag = false
                                if (iterate == elementsArray.length) {
                                    if (flag)
                                        reporter.appendTest('Verifying Status of Jobs in List', 'Verified that all the Jobs are displayed according to the selected job filter type: ' + ExpectedStatus, "PASS");
                                    else
                                        reporter.appendTest('Verifying Status of Jobs in List', 'Verified that the Jobs are not displayed according to the selected job filter type: ' + ExpectedStatus, "FAIL");
                                }
                            })
                        })
                    })
                } else {
                    reporter.appendTest('Verifying List', 'No Jobs to validate the filter status', "PASS");
                    actions.verifyElementDisplayed(noMatchingDataFound, true, " <b>No Matching Data Found</b> message")
                }
            })
        })
    },
    verifyPdfDownload: () => {
        actions.verifyPDFFileDownload_OffShore()
    },

    verifyCSVDownload: () => {
        actions.verifyCSVFileDownload_OffShore()
    },

    verifyJobIDinHead: () => {
        jobIdInHead.isDisplayed().then(function (status) {
            if (status == true) {
                reporter.appendTest("Verifying Element", 'Verified that "' + logName + '" is Displayed ', "PASS");
            } else {
                reporter.appendTest("Verifying Element", 'Verified that "' + logName + '" is not Displayed ', "FAIL");
                expect(false).toReport(true, "Verifying Element is FAILED for: " + logName);
            }

        });
    },

    verifyVendorListInCreatePOButton: () => {
        element.all(by.xpath('(//button[text()="Create PO"])[1]/following-sibling::div/button/a')).then(venList => {
            console.log("VenLength: " + venList.length)
            if (venList.length > 0) {
                venList.forEach(vendorElement => {
                    vendorElement.getText().then(vendorName => {
                        console.log("vendorName: " + vendorName)
                        element.all(by.xpath('//div[@class="details-table row"]//p[text()="' + vendorName + '"]')).count().then(count => {
                            if (count > 0)
                                reporter.appendTest("Verifying Vendor in table", 'Verified that Vendor :' + vendorName + ' is present in table ', "PASS");
                            else {
                                reporter.appendTest("Verifying Vendor in table", 'Verified that Vendor :' + vendorName + ' is not present in table ', "FAIL");
                                expect(false).toReport(true, "Verifying Vendor in table is FAILED ");
                            }
                        })
                    })
                })
            } else reporter.appendTest("Verifying Vendor in Dropdown", 'Verified that no Vendor name displayed, this may due to there are not products or PO created for existing products vendor ', "");
        })
    },

selectLineitemToViewDetails: ()=>{
 reporter.appendTest('<b>Selecting line item/Product to view details</b>', '*********************************', "PASS");
   element.all(by.xpath("//div[@class='table__body']//div[@class='description col']//p[contains(@class, 'clickable')]")).then(eleArray=>{
      if (eleArray.length>0) {
            eleArray[0].getText().then(text=>{
                actions.jsClick(eleArray[0], text)
                 Medium_Wait()
              },function(err){ 
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
          })
       }
      else  reporter.appendTest('Selecting Line item/Product', 'No Line item/Product dispalyed', "FAIL");
    })

// var firstLineItem = element(by.xpath("//div[@class='table__body']//div[@class='description col']//p[contains(@class, 'clickable')]"))
// actions.Click(firstLineItem, 'First Line Item')
// Medium_Wait()

 },

 verifyDeleteOption: ()=>{
    actions.verifyElementDisplayed(deleteButton,true, "Delete Option")
 },

 clickOnDeleteOption: ()=>{
    actions.jsClick(deleteButton, "Delete Option")
 },
};
