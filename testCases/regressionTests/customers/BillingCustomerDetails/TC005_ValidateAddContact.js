let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
lineitemdetails= requirePage('LineItemDetailsPage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
email = csvProcessor.filterData(testName, 'Email'),
phoneNo = csvProcessor.filterData(testName, 'PhoneNo'),
fax = csvProcessor.filterData(testName, 'Fax'),
webUrl = csvProcessor.filterData(testName, 'WebUrl'),
notes = csvProcessor.filterData(testName, 'Notes'),

num = Math.floor(Math.random() * 101);
const name = 'Contact'+num;

describe('Validate Vendor Details section',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC005-BillingCustomerDetails_ValidateAddContact";
      });
    
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });

    it('Should Verify customers button on left side menu', function() {
        jobsHomePage.verifyCustomersInLeftMenu();      
    });

    it('Should Click on Customers button on side menu', function() {
         jobsHomePage.clickOnCustomersButton();
    });

    it('Click on Billing radio button', function() {
         customerPage.clickOnCustomerBillingRadioButton();
    });

    it('Validate vendor name in Line Item details page ', function (){
        customerPage.getBillingCustomerNameByText();    
        customerPage.clickOnFirstBillingCustomer();      
        customerPage.validateCompanyName();
    });

    it('Validate Contacts header is displayed ',function(){
        customerPage.validateContactsHeader();
    });

    it('Validate Add Contact button ',function(){
        customerPage.validateAddContactButton();
    });

    it('Click on Add Contact button',function(){
        customerPage.clickOnAddContactButton();
    });

    it('Enter First Name',function(){
        customerPage.enterFirstName(name);
    });
    it('Enter Phone',function(){
        customerPage.enterPhone(phoneNo);
    });

    it('Enter fax ',function(){
        customerPage.enterFax(fax);
    });

    it('Enter Email',function(){
        customerPage.enterEmail(email);
    });

    it('Enter Web/Url ',function(){
        customerPage.enterWebURL(webUrl);
    });

    it('Enter Notes',function(){
        customerPage.enterNotes(notes);
    });

    it('Click on Submit button',function(){
        customerPage.clickOnSubmitButton();
    });

    it('Verify newly created Contact dropDown button',function(){
        customerPage.verifyNewContactCardDisplayed(name)
    });

    it('Click on newly created Contact dropDown button',function(){
        customerPage.clickOnContactCardDropDownButton(name)
    });

    it('Verify newly created Contact dropDown items',function(){
        customerPage.verifyContactCardDropDownItems(name)
    });
});