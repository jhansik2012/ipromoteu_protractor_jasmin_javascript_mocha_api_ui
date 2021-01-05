const { ActionSequence } = require("protractor");
const actionLibrary = require("../../../../library/actionLibrary");

let ipromoteU_login = requirePage('LoginPage'),
    presentationPage = requirePage('PresentationPage'),
    createNewJobPage = requirePage('CreateNewJob'),
    customerPage=requirePage('customerPage'),
    jobsHomePage=requirePage('JobsHomePage');

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    product = csvProcessor.filterData(testName, 'Product'),
    masterCode = csvProcessor.filterData(testName, 'MasterCode'),
    email = csvProcessor.filterData(testName, 'Email'),
    companyName = csvProcessor.filterData(testName, 'CompanyName'),
    contactName= csvProcessor.filterData(testName, 'ContactName'),
    sampleRequired = csvProcessor.filterData(testName, 'SampleRequired'),
    rushJob = csvProcessor.filterData(testName, 'RushJob'),
    minCost = csvProcessor.filterData(testName, 'MinCost'),
    maxCost = csvProcessor.filterData(testName, 'MaxCost'),
    zipCode = csvProcessor.filterData(testName, 'ZipCode'),
    phoneNo = csvProcessor.filterData(testName, 'PhoneNo'),
    phoneExt = csvProcessor.filterData(testName, 'PhoneExt'),
    address1 = csvProcessor.filterData(testName, 'Address1'),
    address2 = csvProcessor.filterData(testName, 'Address2'),
    city = csvProcessor.filterData(testName, 'City'),
    fax = csvProcessor.filterData(testName, 'Fax'),
    state = csvProcessor.filterData(testName, 'State'),

    jobName = "Test_Automation_",

    reviewTableColHeaders= ['Product','Color','Size','qty','Cost','Price'],
    presentaionDetailsPageObjects = ['Presentation Name', 'Customer Needs By',
        'Expiration Date', 'Presentation Intro', 'Terms & Conditions']

describe('Presentation Screeen Validation', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {

        global.current_TestCase = "TC004-ConvertPresentation-QuoteToJob_ConvertToJobFromQuoteOfNewCustomerJob";
    });

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Verify Presentaion link and click on presentation link', () => {
        presentationPage.clickOnPresentationLink();
    });
    it('Verify Presentation Header', () => {
        presentationPage.verifyPrentationHeader();
    });   
    it('Click on Create Presentation Button', () => {
        presentationPage.clickCreatePresentationButton();
    });
    it('Validate subway map ', function () {
        reporter.appendTest('<b>1. Customer Details</b>', '*************', "");
        createNewJobPage.ValidateSubwayMap("1. Customer Details");
    });
    it('Click on Add New Customer radio button', function () {
        presentationPage.clickOnNewCustomersRadioButton();
    });
    it('Enter Company Name', function () {
        presentationPage.enterCompanyName(companyName);
    });
    it('Enter Contact name', function () {
        presentationPage.enterContactName(contactName);
    });
    it('Enter email', function () {
        presentationPage.enterEmailCreatePage(email);
    });
    it('Enter State', function () {
        presentationPage.enterState(state)
    });
    it('Enter Zip code', function () {
        presentationPage.enterZipCreatePage(zipCode);
    });
    it('Enter phone number', function () {
        presentationPage.enterPhoneCreatePage(phoneNo);
    });
    it('Enter phone ext', function () {
        presentationPage.enterPhoneExtCreatePage(phoneExt);
    });
    it('Enter Fax', function () {
        presentationPage.enterFax(fax);
    });
    it('Enter Shipping Address', function () {
        presentationPage.enterAddress(address1);
    });
    it('Enter Address 2', function () {
        presentationPage.enterAddress2(address2);
    });
    it('Enter City', function () {
        jobsHomePage.enterCity(city);
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
    it('Enter job name', function () { 
        createNewJobPage.enterJobName(jobName);           
    });
    it('Select Sales rep', function () { 
        presentationPage.selectSalesRep();           
    });
    it('Click on rush job radio button', function () {          
        createNewJobPage.clickOnRushJobRadioButton(rushJob);           
    });
    
    it('Click on smaple required radio button', function () {          
        jobsHomePage.clickOnSampleRequiredRadioButton(sampleRequired);           
    });
    
    it('enter Requested Ship Date', function () {          
        createNewJobPage.enterRequestedShipDate();           
    });

    it('Click on Next button', function () {
        presentationPage.clickOnNextButton()
    });


    it("In Subway Customer & Job Details", function () {
        createNewJobPage.ValidateSubwayMap("1. Customer & Job Details");
    }); 

    it('Select State', function () { 
        presentationPage.selectState(state);           
    });

    it('Click on Next button', function () {
        presentationPage.clickOnNEXTButton()
    });

    it("In Subway Customer & Job Details", function () {
        createNewJobPage.ValidateSubwayMap("1. Customer & Job Details");
    }); 

    it('Click on Next button', function () {
        presentationPage.clickOnNEXTButton()
    });

    it("In Subway Customer & Job Details", function () {
        createNewJobPage.ValidateSubwayMap("1. Customer & Job Details");
    });

    // it('Verify Customer details', function () {
    //     presentationPage.verifyCusotmerDetailsOptions()
    // });
    it('Click on Next button', function () {
        presentationPage.clickOnNEXTButton()
    });
    it('Same as ordering contact checkbox', function () {
        customerPage.clickOnSameAsOrderingContactCheckBox();
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
        createNewJobPage.verifyCreatedNewJobNameDetailsPage();           
    });

    it('verify Status Of Created Job', function () { 
        createNewJobPage.statusOfCreatedJobInDetailsPage();           
    });

    it('Verify Products', function () { 
        presentationPage.VerifyRetrivedProductInJobDetails();           
    });

})