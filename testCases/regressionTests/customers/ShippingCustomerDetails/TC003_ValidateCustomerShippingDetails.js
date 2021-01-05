let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        
        global.current_TestCase = "TC003-ShippingCustomerDetails_ValidateCustomerShippingDetails";
      });
    it('Navigate iPROMOTEu url', function () {    	
        ipromoteU_login.navigateToUrl(url);
    });

    it('Should Login with valid credentials and validate Jobs page', function () { 

        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    }); 

    it('Click on Customers button on side menu', function() {
    	 jobsHomePage.clickOnCustomersButton();
    });
    it('Click on first customer', function() {        
        customerPage.clickOnFirstCustomer();
    });

    it('Validate Company Name', function() {     
      customerPage.verifyCompanyNameField()  
    });

    it('validate Master Code', function() {       
       customerPage.verifyMasterCodeField() 
    });

    it('Validate Ship Code', function() {        
       customerPage.verifyShipCode()
    });

    it('Validate Bill Code', function() {        
       customerPage.validateBillCode()
    });

    it('Validate address', function() {        
        customerPage.verifyAddress1Field("777")
        customerPage.verifyAddress2Field("Brockton")
        customerPage.verifyAddress3Field("Avenue")
    });

    it('validate State', function() {        
     customerPage.validateState("Abington")
    });

    it('Validate City', function() {       
       customerPage.verifyCityField("MA") 
    });

    it('Validtae ZIP', function() {        
        customerPage.verifyZipField("2351")
    });

    it('Validate Country', function() {        
        customerPage.validateCountry("Brockton")
    });


});