let ipromoteU_login = requirePage('LoginPage'),
  jobsHomePage = requirePage('JobsHomePage'),
  repeatJobPage = requirePage('RepeatJob'),
  createNewJobPage = requirePage('CreateNewJob'),
  presentaionPage = requirePage('PresentationPage'),
    commonAddProducts = requirePage('common_addProducts')

var testName = 'TC001',
  operatorName = csvProcessor.filterData(testName, 'OperatorName'),
  password = csvProcessor.filterData(testName, 'Password'),
  url = csvProcessor.filterData(testName, 'Url'),
  num = Math.floor(Math.random() * 101);

var currentDate = new Date(),
    dd = currentDate.getDate(),
    mm = currentDate.getMonth() + 1,//as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateAndTimeStamp = dd + '' + mm + '' + yyyy + '' + hour + '' + minute,
    repJobName= "Trash"+ dateAndTimeStamp;

describe('Repeat job functionality :  ', function () {
  appLogger.Log("************************ Execution Started ***************************");
  appLogger.Log("************************ " + __filename + "***************************");

  beforeEach(function () {
    global.current_TestCase = "TC002-RepeatJob_CancelRepeatJob";
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
  it('Click on repeat Job', function () {
    jobsHomePage.clickOnRepeatJobButton();
  });
  it('Enter repeate job name', function () {
    repeatJobPage.enterJobNameField(repJobName);
  });
  it('click on X button', function () {
    presentaionPage.clickOnXButton()
  });
  it('Verify repeat job name in job details screen',function(){
  createNewJobPage.verifyRepeatJobNameNotDisplayed(repJobName)
  });
})
