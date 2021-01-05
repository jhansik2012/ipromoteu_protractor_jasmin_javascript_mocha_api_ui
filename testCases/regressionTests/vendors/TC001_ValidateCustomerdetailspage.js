let ipromoteU_login = requirePage('LoginPage'),
  jobsHomePage = requirePage('JobsHomePage'),
  customerPage = requirePage('customerPage'),
  vendorsPage = requirePage('vendorsPage')

var testName = 'TC001',
  operatorName = csvProcessor.filterData(testName, 'OperatorName'),
  password = csvProcessor.filterData(testName, 'Password'),
  url = csvProcessor.filterData(testName, 'Url');

describe('Customer Page Item Validation  : ', function () {
  appLogger.Log("************************ Execution Started ***************************");
  appLogger.Log("************************ " + __filename + "***************************");

  beforeEach(function () {
    global.current_TestCase = "TC001-vendors_ValidateCustomerdetailspage";
  });
  it('Navigate iPROMOTEu url', function () {
    ipromoteU_login.navigateToUrl(url);
  });
  it('Login with valid credentials and validate Jobs page', function () {
    ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
  });
  it('Verify vendors button', function () {
    jobsHomePage.verifyvendorsPresent()
  });
  it('Click on Vendors menu from left menu', function () {
    jobsHomePage.clickOnVendorsButton()
  });
  it('Click on any Vendor name', function () { //by rownum
    //  vendorsPage.getVendorDetails(1)
    vendorsPage.selectVendorByRowNum(1)
  });
  it('Validate Vendor Name', function () {
    vendorsPage.verifyVendorName()
  });
  it('Verify vendor status', function () {
    vendorsPage.verifyVendorStatus()
  });
  it('Validate Vendor Type', function () {
    vendorsPage.verifyVendorType()
  });
  it('Validate Vendor phone', function () {
    vendorsPage.verifyVendorPhone()
  });
  it('Validate Vendor Website, User, Pass', function () {
    vendorsPage.verifyWebsite()
    vendorsPage.verifyUserValue()
    vendorsPage.verifyPassValue()
  });
  it('Validate Vendor Order Date values', function () {
    vendorsPage.verifyOrderDays()
  });
  it('Validate Vendor email id', function () {
    vendorsPage.verifyemail()
  });
  it('Validate Vendor Total Jobs', function () {
    vendorsPage.verifyTotalJobs()
  });
  it('Validate Vendor Order Volume', function () {
    vendorsPage.verifyOrderVolume()
  });
  it('Select any options of order Date ', function () {
    vendorsPage.verifyChangeAfterChangeOrderDay()
  });
});