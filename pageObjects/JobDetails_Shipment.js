'use strict';
const { ActionSequence } = require("protractor");

 

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
  random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
 shipmentLink=element(by.linkText('Shipments')),
 addShipmentButton=element(by.id('add')),
 addShipmentFromPopUP=element(by.buttonText('ADD  SHIPMENT')),
 addShipmentPopUp=element(by.className('modal-title')),
 vendorPurchaseOrderField=element(by.xpath('(//*[@class="modal-body"]//input)[1]')),
 //
 trackingNumber=element(by.id('description')),
 dateShippedField=element(by.xpath('//*[@class="modal-body"]//*[@class="react-datepicker__input-container"]/input')),
 popUpOk=element(by.buttonText('OK')),
 popUpNO=element(by.buttonText('NO')),
 popUpYES=element(by.buttonText('YES')),
 closeButton=element(by.className('close')),
 view=element(by.xpath('//*[@class="shipments-table row"]//*[text()="View Details"]')),
 Edit=element(by.xpath('//*[@class="shipments-table row"]//*[text()="Edit"]')),
 Delete=element(by.xpath('//*[@class="shipments-table row"]//*[text()="Delete"]')),
 editShipmentButton=element(by.buttonText('EDIT  SHIPMENT')),
 prevCount=null,
 poListInViewingDatesFor= element.all(by.xpath("//span[text()='Viewing dates for']/../following-sibling::div/button")),
 // poListInViewingDatesFor= element.all(by.xpath('//button[contains(@class,"dropdown-item active")]')),


 viewingDatesForDrop= element(by.xpath("(//span[text()='Viewing dates for']/parent::div/following-sibling::button)[1]")),
 selectedPONumberForShiipingDates= element(by.xpath("(//span[text()='Viewing dates for'])[1]/following-sibling::strong")),
 shipmentPONumber='' ,
 date=''
 
// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
 module.exports = {
    /*Used to save application verification data form dynamic verification*/
    specData: {},

    clickOnShipmentTab: function () {
    	actions.jsClick(shipmentLink,"shipmentLink")
    },
    verifyActiveShipmentTab: function(){
        let as=element(by.xpath("//*[@class='active nav-link' and text()='Shipments']"));
        actions.verifyElementDisplayed(as,true,"Active Shipment Tab")
    },
    verifyShipmentTable: function(colName){
        let colEle=element(by.xpath('//*[@class="shipments-table row"]//*[text()="'+colName+'"]'));
        actions.verifyElementDisplayed(colEle,true,colName)
    },
    clickOnToggleMenu: function(){
        Medium_Wait()
        actions.ScrollDown()
       let toggleMenu=element.all(by.xpath('//*[@class="shipments-table row"]//*[@class="d-inline-block pr-2 pr-md-4 btn btn-secondary"]')).get(0);
       actions.jsClick(toggleMenu,"Toggle Menu")
    },
    verifyMenuOptions: function(){
       actions.verifyElementDisplayed(view,true,"View Details Button")
       actions.verifyElementDisplayed(Edit,true,"Edit Button")
       actions.verifyElementDisplayed(Delete,true,"Delete Button")
    },
    verifyShimentDetails:function(){
        let tracking=element(by.xpath("//label[text()='TRACKING']/../following-sibling::div/p")),
      carrier=element(by.xpath("//label[text()='CARRIER']/../following-sibling::div/p"))
     actions.verifyElementDisplayed(tracking,true,"Tracking Details section")    
     actions.verifyElementDisplayed(carrier,true,"Carrier Details section")
    },
    closePOPup: function () {
          actions.Click(closeButton,"")
    },
    clickOnViewDetail: function(){
        actions.jsClick(view,"View Details button")
    },
    clickOnEdit: function(){
        actions.jsClick(Edit,"edit button")
    },
    clickOnDelete: function(){
        actions.jsClick(Delete,"Delete button")
    },
    clickOnAddShipment: function () {
    actions.jsClick(addShipmentButton,"Add Shipment")
    },
    clickOnAddShipmentPopUP: function(){
    	actions.jsClick(addShipmentFromPopUP,"Add Shipment")
    },
    editPOfromDrop: function(PO){
        var poField=element(by.xpath('//*[@class="modal-content"]//*[text()="arrow_drop_down"]/..'))
    	actions.jsClick(poField,"vendorPurchaseOrderField")
    	actions.PressEnter()
    },
    selectPOfromDrop: function () {
        let poDrop=element(by.xpath('//label[text()="vendor purchase order"]/following-sibling::div/div/div'))
        actions.Click(poDrop, "PO Dropdown")
        Short_Wait()
        actions.PressDownArrow()
        actions.PressEnter()
    },
    getPONumber:function(){
        let shipmentPONumberLoc=element(by.xpath("//label[text()='vendor purchase order']/following-sibling::div/div/div/div[1]"))
        shipmentPONumberLoc.getText().then(function(poNumber){
            poNumber= poNumber.split(' ')[0].trim()
            shipmentPONumber=poNumber;
        })
    },
    enterTrackingNumber:function(TNum){
    	actions.blurText(trackingNumber,TNum,trackingNumber)
        let field=element(by.xpath('//*[@class="modal-content"]//*[@class="react-datepicker__input-container"]'))
        actions.jsClick(field,"")
    },
    selectDate:function(){
     var currentDate = new Date(),
        dd = currentDate.getDate()+1,
        mm = currentDate.getMonth() + 1, //as January is 0
        yy = currentDate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        date= mm + '/' + dd + '/' + yy;
    	actions.blurText(dateShippedField,date,"Date Shipped")
        Medium_Wait()
        actions.PressEnter()
    	},
    	verifyAddSuccesfulPopUp: function(){
    		Medium_Wait()
    		let success=element(by.xpath("//*[@class='modal-content']//*[text()='Shipment added successfully.']"))
            actions.verifyElementDisplayed(success,true,"Success message")
    	},
        verifyEditSuccesfulPopUp: function(){
            Medium_Wait()
            let success=element(by.xpath("//*[@class='modal-content']//*[text()='Shipment edited successfully.']"))
            actions.verifyElementDisplayed(success,true,"Success message")
        },
        confirmPopUp: function () {
        actions.Click(popUpOk,"popUpOk")
        } ,   
        clickOnEditShipment: function(){
            actions.jsClick(editShipmentButton,"Edit Shipment Button")
        },
        clikOnPopNo: function(){
            actions.Click(popUpNO,"PopUp-No")
        },
        clikOnPopYes: function(){
            actions.Click(popUpYES,"PopUp-Yes")
        },
        updateRowCount: function(){
          element.all(by.xpath('//*[@class="shipments-table row"]//*[@class="align-items-center row"]')).count().then(count=>{
                prevCount=count;
            })
        },
        verifyByNotDeleting: function(){
          element.all(by.xpath('//*[@class="shipments-table row"]//*[@class="align-items-center row"]')).count().then(count=>{
         actions.expectToEqual(prevCount,count,"Row count")
        })
        },
        verifyByDeleting: function(){       
            Medium_Wait()
            element.all(by.xpath('//*[@class="shipments-table row"]//*[@class="align-items-center row"]')).count().then(count=>{
                actions.expectNotToEqual(prevCount,count,"Row count")
            })
        },
        VerifyAfterAdding: function(){
            let shipentCount=element.all(by.xpath('//div[@class="shipments-table row"]//div[@class="table__col col"]')).count()
            let AddedShipDateElement=element.all(by.xpath('(//div[@class="shipments-table row"]//div[@class="table__col col"])["'+shipentCount+'"]/div/div[1]/p')),
            AddedPOElement=element.all(by.xpath('(//div[@class="shipments-table row"]//div[@class="table__col col"])["'+shipentCount+'"]/div/div[5]/p'))
            actions.GetTextAndCompareToBeEqual(AddedShipDateElement,date,"Shipment date","Displayed date in table","Given date while adding shipment")
            actions.GetTextAndCompareToBeEqual(AddedPOElement,shipmentPONumber,"Shipment PO","Displayed PO in table","Selected PO while adding shipment")
        },

        verifyPolistDisplayed: ()=>{
         element.all(by.xpath("//span[text()='Viewing dates for']/../following-sibling::div/button")).then(poList=>{
            if(poList.length>0){
                poList[0].getText().then(poNumber=>{
                  actions.jsClick(poList[0],"PO Number :"+poNumber)
                    reporter.appendTest('Selecting Po from list to view Shipping details', 'Selected the PO :'+poNumber+' to view Shipping dates ', "PASS");
                     selectedPONumberForShiipingDates.getText().then(selectedPONumber=>{
                       actions.expectToEqualCustom(poNumber, selectedPONumber, "Selected and Displayed PO Number to view Shipping Dates", "Selected PO Number", "Displayed PO Number")
                    })
                })
            }else reporter.appendTest('Verifying Po List to select and View Shipping Details', 'No PO Selcted, because there are no PO(s)', "PASS");
          })
        },

        clickOnViewingDatesForDrop: ()=>{
        actions.jsClick(viewingDatesForDrop,"PO List Dropdown")
            
        }

    }

  