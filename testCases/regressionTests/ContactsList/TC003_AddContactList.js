let ipromoteU_login = requirePage('LoginPage'),
   jobsHomePage = requirePage('JobsHomePage'),
   customerPage = requirePage('customerPage'),
   contactDetailsPage = requirePage('contactDetailsPage')

var testName = 'TC001',
   operatorName = csvProcessor.filterData(testName, 'OperatorName'),
   password = csvProcessor.filterData(testName, 'Password'),
   url = csvProcessor.filterData(testName, 'Url'),
   text = 'Test'


describe('Contact List- TC03', function () {
   appLogger.Log("************************ Execution Started ***************************");
   appLogger.Log("************************ " + __filename + "***************************");
   beforeEach(function () {
      global.current_TestCase = "TC003-ContactsList_AddContactList";
   });

   it('Navigate iPROMOTEu url', function () {
      ipromoteU_login.navigateToUrl(url);
   });
   it('Should Login with valid credentials and validate Jobs page', function () {
      ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
   });
   it('Should Click on Customers button on side menu', function () {
      jobsHomePage.clickOnCustomersButton();
   });
   it('should Click on Contacts tab', function () {
      customerPage.clickOnContactsList();
   });
   it('should Click on any Check box against Contact table tow', function () {
      customerPage.clickOnFirstContactCheckBox()
   });
   it('should Click on Add To List button', function () {
      customerPage.clickOnAddToListButton()
   });
   it('should Validate Add To list Header', function () {
      customerPage.verifyAddTolistHeader()
   });
   it('should Validate Current List ', function () {
      customerPage.verifycusrrentList()
   });
   it('should Click on Current List and select any contact list', function () {
      contactDetailsPage.selectOptionfromCusrrentList(text)
   });
   it('should Click on Add Contacts button', function () {
      contactDetailsPage.clickOnAddToListButton_Final()
   });
   it('should Click on OK button', function () {
      contactDetailsPage.ClickOnOkAfterAddToList()
   });
   it('should Enter List Name in Add To List modal', function () {
      // This steps are used to open add to list screen again
      customerPage.clickOnFirstContactCheckBox()
      customerPage.clickOnAddToListButton()
      //
      customerPage.enterListName()
   });
   it('should Enter Description in Add To List modal', function () {
      customerPage.enterdescription()
   });
   it('should Click on Add Contacts button', function () {
      customerPage.clickOnAddToListButton_Final()
   });
   it('should Click on OK button', function () {
      customerPage.ClickOnOkAfterAddToList()
   });

});