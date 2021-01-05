let ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    repeatJobPage = requirePage('RepeatJob'),
    createNewJobPage = requirePage('CreateNewJob'),
    presentaionPage = requirePage('PresentationPage'),
    addProductPage = requirePage('addProduct'),
    commonAddProducts = requirePage('common_addProducts')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    product = "ASI Products",
    num = Math.floor(Math.random() * 101),
    customer= 'TIMOTHYTES',

    lineItemTableColHeaders = ["Description", "Color", "Size", "TOTAL COST"],
    customerPriceHeaders = ["qty", "billed", "price"],
    yourCostHeaders = ["qty", "billed", "Cost"];

var currentDate = new Date(),
    dd = currentDate.getDate(),
    mm = currentDate.getMonth() + 1,//as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateAndTimeStamp = dd + '' + mm + '' + yyyy + '' + hour + '' + minute,
    repJobName= "RepeatJob_"+ dateAndTimeStamp;

describe('Repeat job functionality UI test', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-RepeatJob_repeatJob";
    });

    it('should navigate to the IpromoteU rl', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on any one job for edit ', function () {
        jobsHomePage.clickOnFirstJob();
    });
    it('Click on repeat Job', function () {
        createNewJobPage.storeJobId()
        jobsHomePage.clickOnRepeatJobButton();
    });
    it('Verify the repeat Job header', function () {
        repeatJobPage.verifyRepeatJobHeader();
    });

    it('Verify billing shipping customer options', function () {
        repeatJobPage.clickOnShippingCustomerButton()
        repeatJobPage.verifyBillingShippingCustomerOptions('Shipping Customer');
        repeatJobPage.verifyBillingShippingCustomerOptions('Billing Customer');
    });
    it('Enter new shipping customer', function () {
        repeatJobPage.clickOnBillingShippingCustomerOptions('Shipping Customer');
        createNewJobPage.enterNameOrCompanyCode("VWDEMOSTOR")           //"VWDEMOSTOR"
        Medium_Wait()
    });
    it("Validate ' alert message while trying to update “Shipping Customer” or “Billing Customer” - “Changing the shipping and/or billing customer will affect the contacts and Tax Settings on this job. Please check your order to confirm that these settings are correct' ", function () {
        presentaionPage.verifyAlertPopup()
        presentaionPage.verifyAlertPopupMessage("Changing the shipping and/or billing customer will affect the contacts and Tax Settings on this job. Please check your order to confirm that these settings are correct")
        presentaionPage.clickOnButton('OK')
    });
    it('Enter new billing customer', function () {
        repeatJobPage.clickOnShippingCustomerButton()
        repeatJobPage.clickOnBillingShippingCustomerOptions('Billing Customer');
        createNewJobPage.enterNameOrCompanyCode("VWDEMOSTOR")            //"VWDEMOSTOR"
        Medium_Wait()
    });
    it("Validate 'alert message while trying to update “Shipping Customer” or “Billing Customer” - “Changing the shipping and/or billing customer will affect the contacts and Tax Settings on this job. Please check your order to confirm that these settings are correct' ", function () {
        presentaionPage.verifyAlertPopup()
        presentaionPage.verifyAlertPopupMessage("Changing the shipping and/or billing customer will affect the contacts and Tax Settings on this job. Please check your order to confirm that these settings are correct")
        presentaionPage.clickOnButton('OK')
    });

    it('Enter repeate job name', function () {
        repeatJobPage.enterJobNameField(repJobName);
    });
    it('Click on rush job radio button', function () {
        createNewJobPage.clickOnRushJobRadioButton("Yes");
    });
    it('Click on smaple required radio button', function () {
        jobsHomePage.clickOnSampleRequiredRadioButton("No");
    });
    it('Validate the line item colomn headers', function () {
        lineItemTableColHeaders.forEach((obj) => {
            repeatJobPage.verifyLineItemColHeaders(obj);
        })
    });
    it('Validate the customer price headers', function () {
        customerPriceHeaders.forEach((obj) => {
            repeatJobPage.verifyCustomerPriceHeaders(obj);
        })
    });
    it('Validate the your cost headers', function () {
        yourCostHeaders.forEach((obj) => {
            repeatJobPage.verifyYourCostHeaders(obj);
        })
    });
    // it('Validate the all line items are checked', function () {
    //     repeatJobPage.verifyAllLineItemsCheckBoxesCheckedByDefault()
    // });
    it('Store Adding Products', function () {
        repeatJobPage.storeLineItemDetails() 
    });
    it('Click on REPEAT JOB buton', function () {
        presentaionPage.clickOnButton("REPEAT JOB")
    });
    it('Verify Created repeat job name and Id in job details screen', function () {
 reporter.appendTest('<b>Verifying Repeated Job</b>', '************************', "PASS");
       createNewJobPage.verifyCreatedJobName(repJobName)
       createNewJobPage.verifyRepeatedJobId()
    });
    it('Verify rush job title ', function () {
        jobsHomePage.verifyRushJobTitle();
    });
    it('Verify sample job title ', function () {
        jobsHomePage.verifySampleJobTitle();
    });
    it('verify sales rep title', function () {
        jobsHomePage.verifySalesRepTitle();
    });
    it('Verify Added Products', function () {
       repeatJobPage.verifyLineItemtInRepeatJob()
    });
});