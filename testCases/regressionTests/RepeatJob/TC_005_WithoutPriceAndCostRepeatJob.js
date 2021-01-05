const { ActionSequence } = require("protractor");

let ipromoteU_login = requirePage('LoginPage'),
  jobsHomePage = requirePage('JobsHomePage'),
  repeatJobPage = requirePage('RepeatJob'),
  createNewJobPage = requirePage('CreateNewJob'),
  presentaionPage = requirePage('PresentationPage'),
  lineItemDetailsPage = requirePage('LineItemDetailsPage'),
  addProductPage = requirePage('addProduct'),
  commonAddProducts = requirePage('common_addProducts')

var testName = 'TC001',
  operatorName = csvProcessor.filterData(testName, 'OperatorName'),
  password = csvProcessor.filterData(testName, 'Password'),
  url = csvProcessor.filterData(testName, 'Url'),
  num = Math.floor(Math.random() * 101),
  product = csvProcessor.filterData(testName, 'Product'),
  cost = "6";
 
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

    global.current_TestCase = "TC005-RepeatJob_WithoutPriceAndCostRepeatJob.js";
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
  it('Enter repeat job name', function () {
    repeatJobPage.enterJobNameField(repJobName);
  });
  it("Click on 'Do Not copy prices and costs'  checkbox", function () {
    repeatJobPage.selectDoNotCopyPricesAndCostsCheckBox();
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
  it('Click on any line item from the line items list page', function () {
    jobsHomePage.clickOnLineItemLinkByUsingRowNumber(1);
  });
  it('Verify empty customer Price in line item page', function () {
 reporter.appendTest('<b>Verifying Price and Cost of Products in Repeated Job</b>', 'Since Price and Cost are not copied from parent job, for all products added they should be "0.00" ', "PASS");
    lineItemDetailsPage.verifyLineItemCustomerPriceValue('0.00')
  });
  it('Verify empty vendor cost in line item page', function () {
    lineItemDetailsPage.verifyLineItemCostValue('0.00')
  });
})