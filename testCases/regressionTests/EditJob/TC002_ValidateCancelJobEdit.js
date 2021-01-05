let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
createNewJobPage=requirePage('CreateNewJob')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url')

var currentDate = new Date(),
    dd = currentDate.getDate(),
    mm = currentDate.getMonth() + 1, //as January is 0
    yyyy = currentDate.getFullYear(),
    hour = currentDate.getHours(),
    minute = currentDate.getMinutes(),
    dateAndTimeStamp = dd + mm + yyyy + hour + minute,
    jobName= "Trash_"+dateAndTimeStamp;

describe('EditJob-TC04', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-EditJobCloseWithoutSavingUpdates_ValidateTheDetailsAfterClosingWithoutSavingTheUpates";
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

    it('Click on edit job details option', function () {
        jobsHomePage.clickOnEditDetailsOption();           
    });
    
    it('Get job name',function(){
        createNewJobPage.getPresentJobName()
    });
    
    it('Enter job name',function(){
        createNewJobPage.updateJobName(jobName)
    });
     
    it('Click on X mark on Create Job window/Back button', function () {  
    reporter.appendTest('Closing Page', '<b>Closing Job without saving</b>', ""); 
        createNewJobPage.clickOnCloseEditJobPopup();           
    });

    it('verify Created JobId', function () { 
    reporter.appendTest('Verifying the Job Tried to update', '<b>Job should not be updated</b>', ""); 
        createNewJobPage.verifyUpdatedJobInDetailedPage(false, jobName);           
    });

});

