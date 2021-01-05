const { logging } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    customerPage = requirePage('customerPage'),
    createNewJobPage = requirePage('CreateNewJob')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    shippingAddress = csvProcessor.filterData(testName, 'Address1'),
    address2 = csvProcessor.filterData(testName, 'Address2'),
    address3 = csvProcessor.filterData(testName, 'Address3'),
    city = csvProcessor.filterData(testName, 'City'),
    st = csvProcessor.filterData(testName, 'ST'),
    zip = csvProcessor.filterData(testName, 'ZipCode'),
    rep = csvProcessor.filterData(testName, 'Rep'),
    email = csvProcessor.filterData(testName, 'Email'),
    phone = csvProcessor.filterData(testName, 'PhoneNo'),
    phoneExtention = csvProcessor.filterData(testName, 'PhoneExt'),
    webUrl = csvProcessor.filterData(testName, 'WebUrl'),
    notes = csvProcessor.filterData(testName, 'Notes'),
    fax = csvProcessor.filterData(testName, 'Fax'),
    salesRep = csvProcessor.filterData(testName, 'SalesRep'),
    contactNameOrderingContact = csvProcessor.filterData(testName, 'SalesRep'),
    companyNameShipTo = actions.strRandom(3),
    state = csvProcessor.filterData(testName, 'State'),
    shipCode = companyNameShipTo + '0' + operatorName,
    lockBox = '15251-0896 : Pittsburgh PA',
    lockBoxName = 'Pasadena, CA',
    accountYash = '1524585',
    taxExempt = 'Exempt MN',
    verticalMarket = 'Automotive',
    classification = 'A',
    masterCode = shipCode,
    num = Math.floor(Math.random() * 101)
const taxEXemptYash = num,
    exemptStatusExpiresDate = actions.futurePreviousDate_mm_dd_yyyy(5)

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-NewCustomer-AddNewDetails_ValidateCreateCustomerAddNewDetails";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Should Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Should Click on Customers button on side menu', function () {
        jobsHomePage.clickOnCustomersButton();
    });
    it('Click on Create Customer button', function () {
        customerPage.clickOnCreateCustomerButton()
    })
    it("Validate the hilighted 'Shipping Details' in subway map", function () {
        reporter.appendTest('<b>Validate Shipping Details Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Shipping Details");
    });
    it('Enter Company Name/Ship To ', function () {
        customerPage.enterCompanyNameShipTo(companyNameShipTo);
    });
    it('Enter Address', function () {
        customerPage.enterCompanyShippingAddress(shippingAddress);
    });
    it('Enter Address2', function () {
        customerPage.enterAddress2(address2);
    });
    it('Enter Address3', function () {
        customerPage.enterAddress3(address3);
    });
    it('Enter City', function () {
        customerPage.enterCompanyCity(city);
    });
    it('Select State', function () {
        customerPage.enterCompanyState();
    });
    it('Enter ZIP', function () {
        customerPage.enterCompanyZip(zip);
    });
    it('Select Carrier/Method under Additional details', function () {
        customerPage.enterNewCarrierMethod("FedEx");
    });
    it('Enter Account #', function () {
        customerPage.enterNewCustomerAccount(accountYash);
    });
    it('Select Tax Exempt', function () {
        customerPage.enterNewCustomerTaxExempt(taxExempt);
    });
    it('Select Vertical Market', function () {
        customerPage.enterNewCustomerVerticalMarket(verticalMarket);
    });
    it('Select Classification', function () {
        customerPage.enterNewCustomerClassification(classification);
    });
    it('Select Sales Rep', function () {
        customerPage.enterNewCustomerSalesRep(salesRep);
    });
    it('Validate shipe code', function () {
        customerPage.validateShipCode(shipCode);
    });
    it('Click on + Add To Master Customer button', function () {
        customerPage.clickNewCustomerAddToMasterCustomer();
    });
    it('Select Master Customer', function () {
        customerPage.enterNewCustomerAddToMasterCustomerInput(masterCode);
    });
    it('Click On Next Button', function () {
        customerPage.clickOnNewCustomerNextButton();
    });
    it("Validate the hilighted 'Shipping Contacts' in subway map", function () {
        reporter.appendTest('<b>Validate Shipping Contacts Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("2. Shipping Contacts");
    });
    it('Enter Email', function () {
        customerPage.enterEmail(email);
    });
    it('Enter Web/Url', function () {
        customerPage.enterNewCustomerWebURL(webUrl);
    });
    it('Enter Phone', function () {
        customerPage.enterPhone(phone);
    });
    it('Enter Phone Extention', function () {
        customerPage.enterPhoneExt(phoneExtention);
    });
    it('Enter fax', function () {
        customerPage.enterFax(fax);
    });
    it('Enter notes', function () {
        customerPage.enterNotes(notes);
    });
    it('Click on Same as ordering contact checkbox to select the checkbox', function () {
        customerPage.clickOnSameAsOrderingContactCheckBox();
    });
    it('Click On Next Button', function () {
        customerPage.clickOnNewCustomerNextButton();
    });
    it("Validate the hilighted 'Billing Details' in subway map", function () {
        reporter.appendTest('<b>Validate Billing Details Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("3. Billing Details");
    });
    it('Click on Add New Details radio button', function () {
        customerPage.clickOnAddNewDetailsRadioButton();
    });
    it('Validate Company Name/Ship To field is cleared', function () {
        reporter.appendTest('<b>Validate Same As Shipping Details </b>', '*************', "");
        customerPage.validateNewCustomerCompanyNameShipTo('');
    });
    it('Enter Company Name/Ship To', function () {
        customerPage.enterBillingDetailsCompanyNameShipTo(companyNameShipTo);
    });
    it('Enter Shipping Address', function () {
        customerPage.enterNewCustomerShippingAddress(shippingAddress);
    });
    it('Enter Address2', function () {
        customerPage.enterNewCustomerAddress2(address2);
    });
    it('Enter Address3', function () {
        customerPage.enterNewCustomerAddress3(address3);
    });
    it('Enter City', function () {
        customerPage.enterNewCustomerCity(city);
    });
    it('Enter State', function () {
        customerPage.selectNewCustomerState(state);
    });
    it('Enter Postal Code', function () {
        customerPage.enterNewCustomerPostalCode(zip);
    });
    it('Validate shipe code', function () {
        customerPage.verifyNewCustomerBillCode(shipCode);
    });
    it('Select Term under Invoice Details', function () {
        customerPage.enterNewCustomerTerms("Net 30");
    });
    it('Paper Billing, No Credit Crads check boxes are displayed and clickable', function () {
        customerPage.verifyNewCustomerInvoicePrefrences();
    });
    it('Enter Lock box', function () {
        customerPage.enterNewCustomerLocBox(lockBox);
    });
    // it('Verify selected Lock box', function () {
    //     customerPage.validateNewCustomerLocBox(lockBox);
    // });
    // it('Verify selected Lock box name', function () {
    //     customerPage.validateNewCustomerLocBoxName(lockBoxName);
    // });
    it('Select Tax Exempt', function () {
        customerPage.enterNewCustomerTaxExempt(taxExempt);
    });
    it('Enter Tax Exempt #', function () {
        customerPage.enterNewCustomerTaxExemptYash(taxEXemptYash);
    });
    // it('Enter Exempt Status Expires date', function () {
    //     customerPage.enterNewCustomerExemptStatusExpiresOptionalField(exemptStatusExpiresDate);
    // });
    it('Click On Next Button', function () {
        customerPage.clickOnNewCustomerNextButton();
    });
    it("Validate the hilighted 'Billing Contacts' in subway map", function () {
        reporter.appendTest('<b>Validate Billing Contacts Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("4. Billing Contacts");
    });
    it('Click On Same As Ordering Contact checkbox to select the checkbox', function () {
        reporter.appendTest('<b>Validate Invoicing Contacts</b>', '*************', "");
        Short_Wait()
        customerPage.clickOnSameAsOrderingContactCheckBox();
    });
    it('Click On Same As Ordering Contact checkbox  to select the checkbox', function () {
        reporter.appendTest('<b>Validate Account Receivable Contacts</b>', '*************', "");
        Short_Wait()
        customerPage.clickOnSameAsInvoicingContactCheckBox();
    });
    it('Click on New Customer Submit button', function () {
        customerPage.clickOnNewCustomerSubmitButton()
    })
    it('Validate success message', function () {
        customerPage.verifyNewCustomerSuccessMsg();
    });
    it('Click on OK button', function () {
        customerPage.clickOnOkButton()
        Long_Wait()
    })
    it('should Enter Text in Keyword Search', function () {
        customerPage.enterInKeywordSearchField(companyNameShipTo);
    });
    it('should Click on keyword serch button', function () {
        customerPage.clickOnKeywordSearchMagnifier();
        Long_Wait()
    });
    it('Verify the created shipping customer names in Customers list page', function () {
        reporter.appendTest('<b>Validate Created Customer Details</b>', '*************', "");
        customerPage.verifyCustomersNamesList(companyNameShipTo);
    });
    it('Verify the created shipping customer Code in Customers list page', function () {
        customerPage.verifyCustomersCodesList(shipCode);
    });
    it('Verify the created shipping customer Phone in Customers list page', function () {
        customerPage.verifyCustomersMasterCodesList(masterCode);
    });
    it('Verify the created shipping customer Phone in Customers list page', function () {
        customerPage.verifyCustomersPhonesList(phone);
    });
    it('Verify the created shipping customer Email in Customers list page', function () {
        customerPage.verifyCustomersEmailsList(email);
    });
    it('Verify the created shipping customer Address in Customers list page', function () {
        var addressInCustomerList = shippingAddress + ', ' + address2 + ', ' + address3
        customerPage.verifyCustomersAddressesList(addressInCustomerList);
    });
    it('Verify the created shipping customer City in Customers list page', function () {
        customerPage.verifyCustomersCitiesList(city);
    });
    it('Verify the created shipping customer ST in Customers list page', function () {
        customerPage.verifyCustomersStsList(st);
    });
    it('Verify the created shipping customer Zip in Customers list page', function () {
        customerPage.verifyCustomersZipsList(zip);
    });
    it('Verify the created shipping customer Rep in Customers list page', function () {
        customerPage.verifyCustomersRepsList(rep);
    });
});