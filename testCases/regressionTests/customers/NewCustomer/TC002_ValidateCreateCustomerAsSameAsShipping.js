const { logging } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    customerPage = requirePage('customerPage'),
    createNewJobPage = requirePage('CreateNewJob')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    companyNameShipTo = actions.strRandom(3),
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
    shipCode = companyNameShipTo + '0' + operatorName,
    lockBox = '15251-0896 : Pittsburgh PA',
    lockBoxName = 'Pasadena, CA',
    accountYash = '1524585',
    taxExempt = 'Exempt MN',
    verticalMarket = 'Automotive',
    classification = 'A',
    masterCode = shipCode,
    state = csvProcessor.filterData(testName, 'State'),    
    num = Math.floor(Math.random() * 101)
const taxEXemptYash = num,
    exemptStatusExpiresDate = actions.futurePreviousDate_mm_dd_yyyy(parseInt(5))

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-NewCustomer-SameAsShippingSection_ValidateNewCustomerBillingDetailsSameAsShippingSection";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Should Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Should Verify customers button on left side menu', function () {
        jobsHomePage.verifyCustomersInLeftMenu();
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
        customerPage.enterCompanyState(state);
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
    it('Enter Contact Name/Ordering Contact', function () {
        reporter.appendTest('<b>Validate Ordering Contacts</b>', '*************', "");
        customerPage.enterContactNameOrdering(contactNameOrderingContact);
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
    it('Same as ordering contact checkbox', function () {
        customerPage.clickOnSameAsOrderingContactCheckBox();
    });
    it('Validate Contact Name Shipping is autompoulated from Ordering Contacts', function () {
        reporter.appendTest('<b>Validate Shipping Contacts</b>', '*************', "");
        customerPage.verifyContactNameShippingInput(contactNameOrderingContact);
    });
    it('Validate Email is autompopulated from Ordering Contacts', function () {
        customerPage.verifyEmail1Data(email);
    });
    it('Validate Web Url is autompoulated from Ordering Contacts', function () {
        customerPage.verifyWebUrl1Data(webUrl);
    });
    it('Validate Phone is autompoulated from Ordering Contacts', function () {
        customerPage.verifyPhone1Data(phone);
    });
    it('Validate Phone Extention is autompoulated from Ordering Contacts', function () {
        customerPage.verifyPhoneExt1Data(phoneExtention);
    });
    it('Validate Fax is autompoulated from Ordering Contacts', function () {
        customerPage.verifyFax1Data(fax);
    });
    it('Validate Notes is autompoulated from Ordering Contacts', function () {
        customerPage.verifyNotes1Data(notes);
    });
    
    it('Click On Same As Ordering Contact checkbox to uncheck the checkbox', function () {
        customerPage.clickOnSameAsOrderingContactCheckBox();
    });
    it('Validate Contact Name Shippiing field is cleared', function () {
        reporter.appendTest('<b>Validate the Shipping Contact fields</b>', 'fields should be cleared after un-checking "Same As Ordering Contact" checkbox', "");
        customerPage.verifyContactNameShippingInput('');
    });

    it('Validate Email field is cleared', function () {
        customerPage.verifyEmail1Data('');
    });
    it('Validate Web Url field is cleared', function () {
        customerPage.verifyWebUrl1Data('');
    });
    it('Validate Phone field is cleared', function () {
        customerPage.verifyPhone1Data('');
    });
    it('Validate Phone Extention field is cleared', function () {
        customerPage.verifyPhoneExt1Data(''); 
    });
    it('Validate Fax field is cleared', function () {
        customerPage.verifyFax1Data('');
    });
    it('Validate Notes field is cleared', function () {
        customerPage.verifyNotes1Data('');
    });
    it('Validate Contact Name Shippinging is editable', function () {
        customerPage.enterContactNameShipping(contactNameOrderingContact)
        customerPage.verifyContactNameShippingInput(contactNameOrderingContact);
    });
    it('Validate Email is editable', function () {
        customerPage.enterEmail(email);
        customerPage.verifyEmail1Data(email);
    });
    it('Validate Web Url is editable', function () {
        customerPage.enterNewCustomerWebUrl1(webUrl);
        customerPage.verifyWebUrl1Data(webUrl);
    });
    it('Validate Phone is editable', function () {
        customerPage.enterPhone1(phone);
        customerPage.verifyPhone1Data(phone);
    });
    it('Validate Phone Extention is editable', function () {
        customerPage.enterPhoneExt1(phoneExtention);
        customerPage.verifyPhoneExt1Data(phoneExtention);
    });
    it('Validate Fax is editable', function () {
        customerPage.enterFax1(fax);
        customerPage.verifyFax1Data(fax);
    });
    it('Validate Notes is editable', function () {
        customerPage.enterNotes1(notes);
        customerPage.verifyNotes1Data(notes);
    });
    it('Click On Next Button', function () {
        customerPage.clickOnNewCustomerNextButton();
    });
    it("Validate the hilighted 'Billing Details' in subway map", function () {
        reporter.appendTest('<b>Validate Billing Details Screen</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("3. Billing Details");
    });
    it('Validate Same As Shipping,Add New Details,Use Existing Billing Customer radio Buttons', function () {
        customerPage.validateBillingDetailsOptions();
    });
    it('Click on Same As Shipping radio button', function () {
        customerPage.clickOnsameAsShippingRadioButton();
    });
    it('Validate Company Name/Ship To is autompoulated from Shipping details screen', function () {
        reporter.appendTest('<b>Validate Same As Shipping Details </b>', '*************', "");
        customerPage.validateNewCustomerCompanyNameShipTo(companyNameShipTo);
    });
    it('Validate Company Name/Ship To is not editable', function () {
        customerPage.validateCompanyNameShipToNotEditable();
    });
    it('Validate Shipping Address is autompoulated from Shipping details screen', function () {
        customerPage.verifyCompanyShippingAddress(shippingAddress);
    });
    it('Validate Shipping Address is not editable', function () {
        customerPage.validateShippingAddressNotEditable();
    });
    it('Validate Address2 is autompoulated from Shipping details screen', function () {
        customerPage.verifyNewCustomerAddress2(address2);
    });
    it('Validate Address2 is not editable', function () {
        customerPage.validateAddress2NotEditable();
    });
    it('Validate Address3 is autompoulated from Shipping details screen', function () {
        customerPage.verifyNewCustomerAddress3(address3);
    });
    it('Validate Address3 is not editable', function () {
        customerPage.validateAddress3NotEditable();
    });
    it('Validate City is autompoulated from Shipping details screen', function () {
        customerPage.verifyNewCustomerCity(city);
    });
    it('Validate City is not editable', function () {
        customerPage.validateCityNotEditable();
    });
    it('Select State is autompoulated from Shipping details screen', function () {
        customerPage.verifyNewCustomerCompanyState(state);
    });
    it('Validate State is not editable', function () {
        // customerPage.validateStateNotEditable();
    });
    it('Validate Postal Code is autompoulated from Shipping details screen', function () {
        customerPage.verifyNewCustomerPostalCode(zip);
    });
    it('Validate Postal Code is not editable', function () {
        customerPage.validateCompanyPostalCodeNotEditable();
    });
    it('verify shipe code is autompoulated from Shipping details screen', function () {
        customerPage.verifyNewCustomerBillCode(shipCode);
    });
    it('Validate shipe code is not editable', function () {
        customerPage.validateBillCodeNotEditable();
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
    // it(' Enter Exempt Status Expires date', function () {
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
    it('Validate Contact Name Invoicing is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyContactNameInvoicing(contactNameOrderingContact);
    });
    it('Validate Email is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyEmailData(email);
    });
    it('Validate Web Url is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyWebUrlData(webUrl);
    });
    it('Validate Phone is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyPhoneData(phone);
    });
    it('Validate Phone Extention is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyPhoneExtData(phoneExtention);
    });
    it('Validate Fax is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyFaxData(fax);
    });
    it('Validate Notes is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyNotesData(notes);
    });
    it('Click On Same As Ordering Contact checkbox to uncheck the checkbox', function () {
        customerPage.clickOnSameAsOrderingContactCheckBox();
    });
    it('Validate Contact Name Invoicing field is cleared', function () {
        reporter.appendTest('<b>Validate the Ordering Contact fields should be cleared after uncheck the Same As Ordering Contact checkbox</b>', '*************', "");
        customerPage.verifyContactNameInvoicing('');
    });
    it('Validate Email field is cleared', function () {
        customerPage.verifyEmailData('');
    });
    it('Validate Web Url field is cleared', function () {
        customerPage.verifyWebUrlData('');
    });
    it('Validate Phone field is cleared', function () {
        customerPage.verifyPhoneData('');
    });
    it('Validate Phone Extention field is cleared', function () {
        customerPage.verifyPhoneExtData('');
    });
    it('Validate Fax field is cleared', function () {
        customerPage.verifyFaxData('');
    });
    it('Validate Notes field is cleared', function () {
        customerPage.verifyNotesData('');
    });
    it('Validate Contact Name Invoicing is editable', function () {
        customerPage.enterContactNameInvoicing(contactNameOrderingContact)
        customerPage.verifyContactNameInvoicing(contactNameOrderingContact);
    });
    it('Validate Email is editable', function () {
        customerPage.enterEmail(email);
        customerPage.verifyEmailData(email);
    });
    it('Validate Web Url is editable', function () {
        customerPage.enterNewCustomerWebUrlInvoicing(webUrl);
        customerPage.verifyWebUrlData(webUrl);
    });
    it('Validate Phone is editable', function () {
        customerPage.enterPhone(phone);
        customerPage.verifyPhoneData(phone);
    });
    it('Validate Phone Extention is editable', function () {
        customerPage.enterPhoneExt(phoneExtention);
        customerPage.verifyPhoneExtData(phoneExtention);
    });
    it('Validate Fax is editable', function () {
        customerPage.enterFax(fax);
        customerPage.verifyFaxData(fax);
    });
    it('Validate Notes is editable', function () {
        customerPage.enterNotes(notes);
        customerPage.verifyNotesData(notes);
    });
    it('Click On Same As Ordering Contact checkbox  to select the checkbox', function () {
        reporter.appendTest('<b>Validate Account Receivable Contacts</b>', '*************', "");
        Short_Wait()
        customerPage.clickOnSameAsInvoicingContactCheckBox();
    });
    it('Validate Contact Name Invoicing is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyContactNameInvoicing(contactNameOrderingContact);
    });
    it('Validate Email is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyEmailData(email);
    });
    it('Validate Web Url is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyWebUrlData(webUrl);
    });
    it('Validate Phone is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyPhoneData(phone);
    });
    it('Validate Phone Extention is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyPhoneExtData(phoneExtention);
    });
    it('Validate Fax is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyFaxData(fax);
    });
    it('Validate Notes is autompoulated from Shipping Contacts screen', function () {
        customerPage.verifyNotesData(notes);
    });
    it('Click On Same As Ordering Contact checkbox to uncheck the checkbox', function () {
        Short_Wait()
        customerPage.clickOnSameAsOrderingContactCheckBox();
    });
    it('Validate Contact Name Invoicing field is cleared', function () {
        reporter.appendTest('<b>Validate the Invoicing Contact fields should be cleared after uncheck the Same As Ordering Contact checkbox</b>', '*************', "");
        customerPage.verifyContactNameInvoicing('');
    });
    it('Validate Email field is cleared', function () {
        customerPage.verifyEmailData('');
    });
    it('Validate Web Url field is cleared', function () {
        customerPage.verifyWebUrlData('');
    });
    it('Validate Phone field is cleared', function () {
        customerPage.verifyPhoneData('');
    });
    it('Validate Phone Extention field is cleared', function () {
        customerPage.verifyPhoneExtData('');
    });
    it('Validate Fax field is cleared', function () {
        customerPage.verifyFaxData('');
    });
    it('Validate Notes field is cleared', function () {
        customerPage.verifyNotesData('');
    });
    it('Validate Contact Name Invoicing is editable', function () {
        customerPage.enterContactNameInvoicing(contactNameOrderingContact)
        customerPage.verifyContactNameInvoicing(contactNameOrderingContact);
    });
    it('Validate Email is editable', function () {
        customerPage.enterEmail(email);
        customerPage.verifyEmailData(email);
    });
    it('Validate Web Url is editable', function () {
        customerPage.enterNewCustomerWebUrlInvoicing(webUrl);
        customerPage.verifyWebUrlData(webUrl);
    });
    it('Validate Phone is editable', function () {
        customerPage.enterPhone(phone);
        customerPage.verifyPhoneData(phone);
    });
    it('Validate Phone Extention is editable', function () {
        customerPage.enterPhoneExt(phoneExtention);
        customerPage.verifyPhoneExtData(phoneExtention);
    });
    it('Validate Fax is editable', function () {
        customerPage.enterFax(fax);
        customerPage.verifyFaxData(fax);
    });
    it('Validate Notes is editable', function () {
        customerPage.enterNotes(notes);
        customerPage.verifyNotesData(notes);
    });
    it('Click on New Customer Submit button', function () {
        customerPage.clickOnNewCustomerSubmitButton()
    });
    it('Validate success message', function () {
        customerPage.verifyNewCustomerSuccessMsg();
    });
    it('Click on OK button', function () {
        customerPage.clickOnOkButton()
        Long_Wait()
    });
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
        // customerPage.verifyCustomersMasterCodesList(masterCode);
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