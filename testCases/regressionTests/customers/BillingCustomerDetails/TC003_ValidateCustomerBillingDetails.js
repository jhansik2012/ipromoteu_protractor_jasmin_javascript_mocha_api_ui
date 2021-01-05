let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
lineitemdetails= requirePage('LineItemDetailsPage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url');

describe('Validate Vendor Details section',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC003-BillingCustomerDetails_ValidateCustomerBillingDetails";
      });

    var customer="";
    
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

    it('Get Billing ustomer Name ',  ()=>{
         customerPage.getBillingCustomerNameByText();    
    });

    it('Click On First Billing Customere ',  ()=>{
        customerPage.clickOnFirstBillingCustomer();      
    });

    it('Validate Company Name ',  ()=>{
         customerPage.validateCompanyName();
    });

    it('Validate the Company Name is editable',function(){
        customerPage.validateCompanyNameFieldEditable();
    });

   //Field not available in the application
    // it('validate Master Code', function() {
    //     masterCode= customerPage.validateMasterCode();
    // });

    // it('Validate Ship Code',function(){
    //     customerPage.validateShipCode();
    // });

    it('Validate Bill Code',function(){
        customerPage.validateBillCode();
    });

    it('Validate the Bill Code is non editable',function(){
        customerPage.validateBillCodeFieldNonEditable();
    });

    it('Validate address', function(){
        customerPage.validateAddress();
    });

    it('Validate the address is editable',function(){
        customerPage.validateAddressFieldEditable();
    });

    it('validate City', function(){
        customerPage.validateCity();
    });

    it('Validate the City is editable',function(){
        customerPage.validateCityFieldEditable();
    });

    it('validate State', function(){
        customerPage.validateState();
    });
   
    it('Validtae ZIP', function(){
        customerPage.validateZip();
    });

    it('Validate the ZIP is editable',function(){
        customerPage.validateZipFieldEditable();
    });

    it('Validtae Country', function(){
        customerPage.validateCountry();
    });
});