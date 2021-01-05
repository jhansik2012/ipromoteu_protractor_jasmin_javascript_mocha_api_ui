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
        global.current_TestCase = "TC002-JobDetails-Shipment_ValidateJobDetailsNotesTab";
      });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });    
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
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
    });
    it('Validate Shipments tab', () => {
        shipmentPage.clickOnShipmentTab()
    });
    it('Validate Active Tab', () => {
        shipmentPage.verifyActiveShipmentTab()
    });
    it('Validate Shipment list table', () => {
        shimentTableColumn.forEach(col=>{
         shipmentPage.verifyShipmentTable(col)
        })
    });
    it('Click on ellipse of any shipment', () => {
        shipmentPage.clickOnToggleMenu()
    });
    it('Verify View Details, Edit and Delete option', () => {
        shipmentPage.verifyMenuOptions()
    });
    it('Click on View Details option', () => {
        shipmentPage.clickOnViewDetail()
    });
    it('Verify Shimpment Details', () => {
        shipmentPage.verifyShimentDetails()
    });
    it('Close Pop up', () => {
        shipmentPage.closePOPup()
    }); 
    it('Click on ellipse of any shipment', () => {
        shipmentPage.clickOnToggleMenu()
    });   
    it('Click on Edit option', () => {
        shipmentPage.clickOnEdit()
    });
    it('Select any PO number from dropdown', () => {
        shipmentPage.selectPOfromDrop();
    });
    it('Enter Tracking number', () => {
        shipmentPage.enterTrackingNumber(trackingNumber)
    });
    it('Select Date Shipped', () => {
        shipmentPage.selectDate();
    });
    it('Click on Update Shipment', () => {
        shipmentPage.clickOnEditShipment();
    });
    it('Verify pop up', () => {
        shipmentPage.verifyEditSuccesfulPopUp()
    });
    it('Confirm pop up', () => {
        shipmentPage.confirmPopUp()
    });    
    it('Click on ellipse of any shipment', () => {
        shipmentPage.clickOnToggleMenu()
    });
    it('Get rowcount', () => {
        shipmentPage.updateRowCount()
    });
    it('Click on Delete option', () => {
        shipmentPage.clickOnDelete()
    });
    it('Click on No', () => {
        shipmentPage.clikOnPopNo()
    });
    it('Verify List, Row count should remain same', () => {
        shipmentPage.verifyByNotDeleting()
    });
    it('Get rowcount', () => {
         shipmentPage.updateRowCount()
    });
    it('Click on ellipse of any shipment', () => {
        shipmentPage.clickOnToggleMenu()
    });
    it('Click on Delete option', () => {
        shipmentPage.clickOnDelete()
    });
    it('Click on Yes', () => {
        shipmentPage.clikOnPopYes()
    });
    it('Verify List, Row count should not remain same', () => {
        shipmentPage.verifyByDeleting()
    });
})