let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
customerPage=requirePage('customerPage'),
createNewJobPage=requirePage('CreateNewJob')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

describe('Customer header validations : ', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC006-NewCustomer_ValidateNewCustomerBillingDetailsUseExistingBillingCustomerSection";
      });

    it('Navigate iPROMOTEu url', function () {
    	
        ipromoteU_login.navigateToUrl(url);
    });

    it('Should Login with valid credentials and validate Jobs page', function () { 

        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    }); 

    it('Should Verify customers button on left side menu', function() {
    	jobsHomePage.verifyCustomersInLeftMenu();     	
    });

    it('Should Click on Customers button on side menu', function() {
    	jobsHomePage.clickOnCustomersButton();
    });

    it('Validate New Customer button',function(){
        customerPage.verifyCreateCustomerButton()
    })

    it('Click on New Customer button',function(){
        customerPage.clickOnCreateCustomerButton()
    })

    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("1. Shipping Details");           
    });

    it('Enter Company Name/Ship To ', function () {          
        customerPage.enterCompanyNameShipTo("Sai_Test_Company");           
    });

    it('Enter Address', function () {          
        customerPage.enterCompanyShippingAddress("Sai_Test_Address");           
    });

    it('Enter Address2', function () {          
        customerPage.enterAddress2("Sai_Test_Company2");           
    });

    it('Enter Address3', function () {          
        customerPage.enterAddress3("Sai_Test_Company3");           
    });

    it('Enter City', function () {          
        customerPage.enterCompanyCity("Central");           
    });

    it('Select State', function () {          
        customerPage.enterCompanyState("NY");           
    });

    it('Enter ZIP', function () {          
        customerPage.enterCompanyZip("50084");           
    });

    it('Enter shipe code', function () {          
        // customerPage.enterNewCustomerShipCode("5000282");           
    });

    it('Select Carrier/Method under Additional details', function () {          
        customerPage.enterNewCarrierMethod("FedEx");           
    });

    it('Enter Account #', function () {          
        customerPage.enterNewCustomerAccount("1524585");           
    });

    it('Select Tax Exempt', function () {          
        customerPage.enterNewCustomerTaxExempt("Exempt MN");           
    });

    it('Enter Tax Exempt #', function () {          
        customerPage.enterNewCustomerTaxExemptYash("Test");           
    });

    it('Select Vertical Market', function () {          
        customerPage.enterNewCustomerVerticalMarket("Automotive");           
    });

    it('Select Classification', function () {          
        customerPage.enterNewCustomerClassification("A");           
    });

    it('Select Sales Rep', function () {          
        customerPage.enterNewCustomerSalesRep("Jen Regan");           
    });

    it('Click on + Add To Master Customer button', function () {          
        customerPage.clickNewCustomerAddToMasterCustomer();           
    });

    it('Select Master Customer', function () {          
        customerPage.enterNewCustomerAddToMasterCustomerInput("Master Customer");           
    });

    it('Click On Next Button', function () {          
        customerPage.clickOnNewCustomerNextButton();           
    });

    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("2. Shipping Contacts");           
    });

    it('Enter Contact Name/Ordering Ordering Contact', function () {          
        customerPage.enterContactNameOrdering("Jen Regan");          
    });

    it('Enter Email', function () {          
        customerPage.enterEmail("test@gmail.com");          
    });
    it('Enter Web/Url', function () {          
        customerPage.enterNewCustomerWebURL("www.xyz.com");          
    });
    it('Enter Phone', function () {          
        customerPage.enterPhone("9687595245");          
    });
    it('Enter Phone', function () {          
        customerPage.enterPhoneExt("91");          
    });

    it('Enter fax', function () {          
        customerPage.enterFax("9126525648");          
    });

    it('Enter notes', function () {          
        customerPage.enterNotes("Test");          
    });

    it('Same as ordering contact check box', function () {          
        customerPage.clickOnSameAsOderingContactCheckBox();          
    });

    it('Click On Next Button', function () {          
        customerPage.clickOnNewCustomerNextButton();           
    });

    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("3. Billing Details");           
    });

    it('Validate Same As Shipping,Add New Details,Use Existing Billing Customer radio Buttons', function () {          
        customerPage.clickOnAddNewDetailsRadioButton();           
    });

    it('Enter Company Name/Shipping ', function () {          
        customerPage.enterNewCustomerCompany("TestCompany");          
    });    

    it('Enter Shipping Address', function () {          
        customerPage.enterNewCustomerShippingAddress("Test Address");          
    });

    it('Enter Address 2', function () {          
        customerPage.validateNewCustomerLocBox("Test");          
    });
});