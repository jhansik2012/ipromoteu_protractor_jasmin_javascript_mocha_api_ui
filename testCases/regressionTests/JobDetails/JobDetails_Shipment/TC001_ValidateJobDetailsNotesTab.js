let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
shipmentPage=requirePage('JobDetails_Shipment'),
createPOPage = requirePage('CreatePO'),
commonAddProducts = requirePage('common_addProducts')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
product = csvProcessor.filterData(testName, 'Product'),
trackingNumber=1234,
lineItemStatus = 'PO Created',
cost = "6";

describe('Validate Job Details Notes Tab',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-JobDetails-Shipment_ValidateJobDetailsNotesTab";
      });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });    
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Select Status', function () {
        reporter.appendTest('<b>Validate status</b>', '*************', "");
        jobsHomePage.selectStatus("Order In Process");
        Short_Wait()
    });
    it('Click on Job', function () {
        jobsHomePage.clickOnJobIdByUsingRowNumber(1);
    });
    //Shipment vendor exist only if there is any PO created in the product
    it('Store Available Products count to create PO ', function () {
        createPOPage.getLineItemsStatusesCountList(lineItemStatus) 
    });
    it("Add product if  Line item is not available or if for all line items 'PO CREATED'", () => {
         if (global.poNotCreatedstatusCount==0)
          {
            reporter.appendTest('<b>Adding Product</b>', '*************', "");
            commonAddProducts.addProductAndCreatePO(product, cost, 'AFP')
            reporter.appendTest('<b>Added Product</b>', '*************', "");
          }
    })
    it('Validate Shipments tab', () => {
        shipmentPage.clickOnShipmentTab()
    });
    it('Click on Add Shipment button', () => {
        shipmentPage.clickOnAddShipment()
    });
    it('Select PO from PO drop down list', () => {
        shipmentPage.selectPOfromDrop()
    });
    it('Get PO number selected from PO dropdown', () => {
        shipmentPage.getPONumber()
    });
    it('Enter Tracking Number', () => {
        shipmentPage.enterTrackingNumber(trackingNumber)
    });
    it('Select date Shipped', () => {
        shipmentPage.selectDate()
    });
    it('Click on Add Shipment button', () => {
        shipmentPage.clickOnAddShipmentPopUP()
        Short_Wait()
    });
    // it('Verify Succesful Pop Up', () => {
    //     shipmentPage.verifyAddSuccesfulPopUp()
    // });
    //  it('Confirm Pop Up', () => {
    //     shipmentPage.confirmPopUp()
    // });
    it('Verify Added Shipment', () => {
        shipmentPage.VerifyAfterAdding()
    });    
});
   