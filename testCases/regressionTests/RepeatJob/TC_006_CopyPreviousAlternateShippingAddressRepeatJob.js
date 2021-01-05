const { ActionSequence } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
  jobsHomePage = requirePage('JobsHomePage'),
  repeatJobPage = requirePage('RepeatJob'),
  createNewJobPage = requirePage('CreateNewJob'),
  presentaionPage = requirePage('PresentationPage'),
  lineItemDetailsPage = requirePage('LineItemDetailsPage'),
  commonAddProducts = requirePage('common_addProducts')

var testName = 'TC001',
  operatorName = csvProcessor.filterData(testName, 'OperatorName'),
  password = csvProcessor.filterData(testName, 'Password'),
  url = csvProcessor.filterData(testName, 'Url'),
  contactName= csvProcessor.filterData(testName, 'ContactName'),
  zipCode = csvProcessor.filterData(testName, 'ZipCode'),
  address1 = csvProcessor.filterData(testName, 'Address1'),
  address2 = csvProcessor.filterData(testName, 'Address2'),
  city = csvProcessor.filterData(testName, 'City'),
  state = csvProcessor.filterData(testName, 'State');

var currentDate = new Date(),
    dd = currentDate.getDate(),
    mm = currentDate.getMonth() + 1,//as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateAndTimeStamp = dd + '' + mm + '' + yyyy + '' + hour + '' + minute,
    repJobName= "RepeatJob_"+ dateAndTimeStamp;

describe('Repeat job functionality :  ', function () {
  appLogger.Log("************************ Execution Started ***************************");
  appLogger.Log("************************ " + __filename + "***************************");

  beforeEach(function () {
    global.current_TestCase = "TC006-RepeatJob_CopyPreviousAlternateShippingAddressRepeatJob.js";
   });
    it('Navigate iPROMOTEu url', function () {
      ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
      ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
    it('Click on any one job for edit ', function () {
      jobsHomePage.clickOnFirstJob();
    });
    //RepeatJob with adding Alternative address
    it('Click on repeat Job', function () {
      createNewJobPage.storeJobId()
      jobsHomePage.clickOnRepeatJobButton();
    });
    it('Click on Add Alternate Shipping Address', function () {
     reporter.appendTest('Adding Alternative address', '************************', "PASS");
        jobsHomePage.clickOnAddAlternateShippingAddress();
    });
    it('Enter Address details ', function () {
        jobsHomePage.enterAlternativeAddressDetails(contactName,address1,address2,city,state,zipCode);
    });
    it('Click on submit button', function () {
        jobsHomePage.clickOnSubmitButton();
    });
    it('Validate updated shipping address', function () {
        createNewJobPage.verifyAlternateShippingAdsressCard(contactName,address1,address2);
    });
    it("Click on 'Copy Previous Alternate Shipping Address'  checkbox", function () {
        repeatJobPage.selectCopyPreviousAlternateShippingAddressCheckBox();
    });
    it('Enter repeate job name', function () {
        repeatJobPage.enterJobNameField(repJobName);
    });
    it('Click on REPEAT JOB buton', function () {
        presentaionPage.clickOnButton("REPEAT JOB")
    });
    
    //verify in job details page
    it('Verify Created repeat job name and Id in job details screen', function () {
 reporter.appendTest('<b>Verifying Repeated Job</b>', '************************', "PASS");
      createNewJobPage.verifyCreatedJobName(repJobName)
      createNewJobPage.verifyRepeatedJobId()
     });
    it('Verify the alternate address is not displayed in job details screen', function () {
      jobsHomePage.verifyAlternateAddressObjectDisplayed()
    });  

    //verify in details page    
    it('Click on edit job details option', function () {
        jobsHomePage.clickOnEditDetailsOption();
    });
    it('Verify Alternate Shipping Adsress Card Present', function () {
        createNewJobPage.verifyAlternateShippingAdsressCardPresent(true);
    }); 
})