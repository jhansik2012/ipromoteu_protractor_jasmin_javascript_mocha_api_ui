const { ActionSequence } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
  jobsHomePage = requirePage('JobsHomePage'),
  repeatJobPage = requirePage('RepeatJob'),
  createNewJobPage = requirePage('CreateNewJob'),
  presentaionPage = requirePage('PresentationPage'),
  commonAddProducts = requirePage('common_addProducts');

var testName = 'TC001',
  operatorName = csvProcessor.filterData(testName, 'OperatorName'),
  password = csvProcessor.filterData(testName, 'Password'),
  url = csvProcessor.filterData(testName, 'Url'),
  num = Math.floor(Math.random() * 101),
  product = csvProcessor.filterData(testName, 'Product'),
  cost = "6",
  expectedNumberOfProducts=0;
  
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

    global.current_TestCase = "TC004-RepeatJob_WithoutLineItemRepeatJob.js";
  });
  it('Navigate iPROMOTEu url', function () {
    ipromoteU_login.navigateToUrl(url);
  });
  it('Login with valid credentials and validate Jobs page', function () {
    ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
  });
  it('Click on any one job for edit ', function () {
    jobsHomePage.clickOnFirstJob();
    Medium_Wait()
  });
  it('Store Available Products count ', function () {
     repeatJobPage.storeLineItemsCount() 
  });
  it("Add product if  Line item is not available", () => {
    if (global.lineItemCount==0)
      {
        reporter.appendTest('<b>Adding Product</b>', '*************', "");
        commonAddProducts.addProduct(product, cost)
        reporter.appendTest('<b>Added Product</b>', '*************', "");
      }
  });
  it('Click on repeat Job', function () {
    createNewJobPage.storeJobId()
    jobsHomePage.clickOnRepeatJobButton();
  });
  it('Enter repeate job name', function () {
    repeatJobPage.enterJobNameField(repJobName);
  });
  it('Click on line item description checkbox to uncheck all items.', function () {
    repeatJobPage.clickOnLineItemDescriptionCheckBox();
  });
  it('Click on REPEAT JOB buton', function () {
    presentaionPage.clickOnButton("REPEAT JOB")
    Medium_Wait()
  });
  it('Verify Created repeat job name and Id in job details screen', function () {
 reporter.appendTest('<b>Verifying Repeated Job</b>', '************************', "PASS");
       createNewJobPage.verifyCreatedJobName(repJobName)
       createNewJobPage.verifyRepeatedJobId()
  });
  it('Verify jobId, and job status NEW in job details screen', function () {
    createNewJobPage.statusOfCreatedJobInDetailsPage('NEW')
  });
  it('Verify Available Products count ', function () {
     repeatJobPage.verifyLineItemsCount(expectedNumberOfProducts) 
  });

  //verify no products should be added
  //need to add condition to check line item count

})