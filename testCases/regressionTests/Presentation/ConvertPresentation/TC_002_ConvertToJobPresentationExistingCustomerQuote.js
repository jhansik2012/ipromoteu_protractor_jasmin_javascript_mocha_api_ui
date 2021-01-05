const { ActionSequence } = require("protractor");
const actionLibrary = require("../../../../library/actionLibrary");

let ipromoteU_login = requirePage('LoginPage'),
    presentationPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob'),
    jobsHomePage=requirePage('JobsHomePage');


var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    companyName = csvProcessor.filterData(testName, 'CompanyName'),
    product = csvProcessor.filterData(testName, 'Product'),
    sampleRequired = csvProcessor.filterData(testName, 'SampleRequired'),
    rushJob = csvProcessor.filterData(testName, 'RushJob'),

    jobName = "Test_Automation_",
    reviewTableColHeaders= ['Product','Color','Size','qty','Cost','Price'],
    presentaionDetailsPageObjects = ['Presentation Name', 'Customer Needs By',
        'Expiration Date', 'Presentation Intro', 'Terms & Conditions']

describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC002-ConvertPresentation-QuoteToJob_ConvertToJobFromQuoteOfExistingCustomerJob";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on presentation link', () => {
        presentationPage.clickOnPresentationLink();
    });

    it('Click on Create Presentation Button', () => {
        presentationPage.clickCreatePresentationButton();
    });

    it('Validate subway map ', function () {
        reporter.appendTest('<b>1. Customer Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Customer Details");
    });

    it('Enter any existing Company Name or Code', function () {
        presentationPage.enterCustomerCodeOrNameInSearchBox(companyName);
    });

    it('Get the Customer or Company code value', function () {
        presentationPage.getCustomerFieldValue();
    });

    it("Validate the Selected Customer'", function () {
        presentationPage.verifyCustomersShippingCustomersAddress(companyName);  //keyword used to search customer
    });

    it('Get the Ordering Contact value(', function () {
        presentationPage.printDisplayedOrderingContactValue();
    });
  
    it('Click on Next button', function () {
        presentationPage.clickOnNextButton()
        Medium_Wait()
    });

    it("In Subway, Presentation Details node is active", function () {
        reporter.appendTest('<b>2. Presentation Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("2. Presentation Details");
    });

     it('Select "Detailed Quote"', function () {
        presentationPage.clickOnDetailedQuote();
    });

    it('Enter presentation name', function () {
        presentationPage.enterPresentationName(presentaionDetailsPageObjects[0]);
    });

    it('Enter presentation Date', function () {
        presentationPage.selectPresentationDate(presentaionDetailsPageObjects[1]);
    });

    it('Enter Expiration Date', function () {
        presentationPage.selectExpirationDate(presentaionDetailsPageObjects[2]);
    });

    it('Verify Presentation Intro and T & C field allow alphanumeric, special characters and spaces.', function () {
       presentationPage.verifyPresentationIntroFieldAllowAlphanumaricAndSpecialChar();
       presentationPage.verifyTermsAndConditionsFieldAllowAlphanumaricAndSpecialChar();
    });

    it('Click on Next button', function () {
      reporter.appendTest('<b>Selecting "Detailed Quote" as a Template Style</b>', '*************', "");
        presentationPage.clickOnNextButton()
        Medium_Wait()
    });

    it("In Subway, Presentation Details node is active", function () {
        reporter.appendTest('<b>3. Product Source</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("3. Product Source");
    });

    it('Click on ASI Products button', function () {
        createNewJobPage.clickOnProduct(product);
    });

    it('Click on Select button', function () {
        createNewJobPage.clickOnSelectButton();
    });
    
    it('Enter product quantity', function () {          
        createNewJobPage.enterProductQuantity();           
    }); 

    it('Click on add pricing button', function () {          
        createNewJobPage.clickOnAddPricingButton();           
    }); 

    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("6. Price");           
    }); 

    it('Click on add line item', function () {
        createNewJobPage.clickOnAddLineItemButton();
    });

    it('Verify Product showcase page is displayed', function () {
        reporter.appendTest('<b>4. Verifying Created Presentation</b>', '*************', "");        
        presentationPage.verifyPrentationQuoteHeader(); 
    });

    it('Verify Presentaion ID', function () {
        presentationPage.VerifyPresentationID(operatorName)
    });

    it('Verify Added Products', function () {
        presentationPage.verifyAddedProduct()
    });

//Convert
    
    it('Get Producs details', () => {
    	presentationPage.retrieveProduct()
    });

    it('Click on Convert To Job Button', () => {
        presentationPage.clickOnConvertToJobHomeButton();
    });

    it("In Subway Customer & Job Details", function () {
        reporter.appendTest('<b>1. Customer & Job Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Customer & Job Details");
    }); 

    it('get Selected Customer', function () { 
        createNewJobPage.getSelectedCustomer();           
    });

    it('verify Shipping Customer Details', function () { 
        createNewJobPage.verifyShippingCustomerDetails();           
    });

    it('verify Billing Customer Detais', function () { 
        createNewJobPage.verifyBillingCustomerDetais();           
    });
    it('verify Auto Populated Contacts', function () { 
        createNewJobPage.verifyAutoPopulatedContacts();           
    });

    it('validate Ordering Contact', function () { 
        createNewJobPage.validateOrderingContac();           
    });

    it('validate Shipping Contact', function () { 
        createNewJobPage.validateShippingContact();           
    });

    it('validate Invoicing Contact', function () { 
        createNewJobPage.validateInvoicingContact();           
    });
    
    it('validate arContact', function () { 
        createNewJobPage.validatearContact();           
    });

    it('Enter job name', function () { 
        createNewJobPage.enterJobName(jobName);           
    });

    it('Click on rush job radio button', function () {          
        createNewJobPage.clickOnRushJobRadioButton(rushJob);           
    });
    
    it('Click on smaple required radio button', function () {          
        jobsHomePage.clickOnSampleRequiredRadioButton(sampleRequired);           
    });

    it('Click on Convert To Job Button', () => {
        presentationPage.clickOnConvertToJobSubButton();
    });

     it('Verify Alert', () => {
        presentationPage.verifyQuoteConvertedToJobSuccesfullyAlert("Quote converted into job successfully!");
    });

    it('Click on Continue Button in Pop up', () => {
        presentationPage.clickOnContinueButtonInPopUp();
    });

    it("In Subway Review Line Items", function () {
        reporter.appendTest('<b>2. Review Line Items</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("2. Review Line Items");
    }); 
    
    it('Verify Retrived products', () => {
        presentationPage.VerifyRetrivedProduct();
    });

    it('Validate Table with decoration items',function(){
    reporter.appendTest('Verifing Pricing details table', '***********************', "");         
        reviewTableColHeaders.forEach(options=>{
            presentationPage.verifyReviewTableTabs(options)
        })        
    });

    it('Click on Update line item Button', () => {
        presentationPage.clickOnUpdateLineItemButton();
    });

    it('verify Job Name Of Created Job', function () { 
    reporter.appendTest('Verifing Converted Job', '***********************', "");         
        createNewJobPage.verifyCreatedNewJobNameDetailsPage();           
    });

    it('verify Status Of Created Job', function () { 
        createNewJobPage.statusOfCreatedJobInDetailsPage();           
    });

    it('verify Customer Name', function () { 
        createNewJobPage.verifyCustomerNameOfCreatedJob();           
    });

     it('verify Shipping Customer', function () { 
        createNewJobPage.verifyShippingCustomerInDetailsPage();           
    });

    it('verify BillingCustomer', function () { 
        createNewJobPage.verifyBillingCustomerInDetailsPage();           
    });
   
    it('verify Order Contact', function () { 
        createNewJobPage.verifyOrderContactInDetailsPage();           
    });
    
    // it('verify AR Contact', function () { 
    //     createNewJobPage.verifyARContactInDetailsPage();           
    // });

    it('verify Shipping Contact', function () { 
        createNewJobPage.verifyShippingContactInDetailsPage();           
    });

    // it('verify Invoicing Contact', function () { 
    //     createNewJobPage.verifyInvoicingContactInDetailsPage();           
    // }); //depricated
 
    it('Verify Produtcs', function () { 
        presentationPage.VerifyRetrivedProductInJobDetails();           
    });
})