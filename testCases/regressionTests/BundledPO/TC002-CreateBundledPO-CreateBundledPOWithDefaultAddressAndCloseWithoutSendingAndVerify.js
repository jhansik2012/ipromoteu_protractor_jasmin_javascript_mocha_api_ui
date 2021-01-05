var ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    createPOPage=requirePage('CreatePO'),
    createNewJobPage=requirePage('CreateNewJob'),
    bundledPOPage = requirePage('BundledPOPage'),
    createPOPage = requirePage('CreatePO');


var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    vendorName = csvProcessor.filterData(testName, 'VendorName'),
    customerName = csvProcessor.filterData(testName, 'CustomerName');

var poDatesFilter= ['Last 12 Months', 'Last 90 Days  ','Last 60 Days  ', 'Last 30 Days  '],
 poTableColumns= ['po', 'created','vendor', 'sent', 'total', 'status', 'shipped', 'carrier'],
 poStatusOptions= ['PO Sent','In Production', 'Not Sent', 'Complete'],
 lineItemTableColumns= ['job number','Supplier Item code', 'description', 'style code', 'color','size','qty','cost','total cost'],
 previewLineItemTableColumns= ['Supplier Item code','description','style code','color','size','qty','cost','total cost'],
 bundlingOptions= ['Supplier Item Code','Description','Color','Size','Style code',"Add'l Instructions"],
 poNumber= 'B107984XSD',
 voidPO= 'B107977XSD',
 vendorKeyword= 'A4 Promotions and Incentives',
 status='NOT SENT';

 var today = new Date(),
     dd = today.getDate(),
     mm = today.getMonth() + 1, //January is 0!
     yyyy = today.getFullYear(),
     hour = today.getHours(),
    minute = today.getMinutes(),
    dateAndTimeStamp = dd + '' + mm + '' + yyyy + '' + hour + '' + minute,
    companyName= "companyName_"+ dateAndTimeStamp,
    address1= "Silver town",
    address2= "Palace road",
    city= "Wayland",
    zip= '32156',
    state='Georgia';

describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC002-CreateBundledPO-CreateBundledPOWithDefaultAddressAndCloseWithoutSendingAndVerify";
    });
    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");
    });
//Bundled PO Page
    it('Click on Bundled PO Link', function () { 
        bundledPOPage.clickOnBundledPOLink();           
    });
    it('Verify Bundled PO Page and Click on Create Bundled PO', function () { 
        bundledPOPage.verifyBundledPOPageIsDisplayed();           
        bundledPOPage.clickOnCreateBundledPOLink();           
    }); 
    it('Verify Vendor details page, Enter vendor name and Verify page elements', function () { 
        createNewJobPage.ValidateSubwayMap("1. Vendor Details");
        bundledPOPage.enterVendorName(vendorKeyword); 
        Medium_Wait()          
    });
    it('Verify Vendor details page, Enter vendor name and Verify page elements', function () { 
        bundledPOPage.storeContactDetails();           
    });
    it('Click on Next button', function () { 
        bundledPOPage.clickOnNextButton();           
    });
    it('Click on previous page', function () { 
        createNewJobPage.ValidateSubwayMap("2. Line Items Selection");
        bundledPOPage.clickOnPreviousButton();           
    });
    it('Verify Vendor details page', function () { 
        createNewJobPage.ValidateSubwayMap("1. Vendor Details");
        bundledPOPage.verifyPreviousDataSelectedInVendorDetailsPage();
    });
    it('Click on Next button', function () { 
        bundledPOPage.clickOnNextButton();           
    });
    it('Verify Line item list table', function () { 
       createNewJobPage.ValidateSubwayMap("2. Line Items Selection");
        lineItemTableColumns.forEach(column=>{
          bundledPOPage.verifyLineItemListTable(column); 
        })
      bundledPOPage.verifyLineItemsToBePresent()
       reporter.appendTest('Verifying by not selecting any line items', "********************" , "PASS")
    }); 
    it('Click on Next button', function () { 
        bundledPOPage.clickOnNextButton();           
    });
    it('Verify Review Page', function () { 
       createNewJobPage.ValidateSubwayMap("3. Review Bundling");
        previewLineItemTableColumns.forEach(column=>{
          bundledPOPage.verifyPreviewLineItemListTable(column); 
        })
       reporter.appendTest('As No line items selected in "Line items selection" page ', 'No items should be selected/displayed in "Review bundling" page', "********************" , "PASS")
       bundledPOPage.verifyLineItemsNotToBePresent()
    });
    it('Click on Next button', function () { 
        bundledPOPage.clickOnNextButton();           
    });
    it('Verify Shipping Details Page', function () { 
       createNewJobPage.ValidateSubwayMap("4. Shipping Details");
       bundledPOPage.updateDefaultShippingAddress(companyName, address1, address2,city,zip,state) 
    });
    it('Update', function () { 
       bundledPOPage.clickOnUpdateButton2()
    })  
    it('Click Next', function () {            
       bundledPOPage.clickOnNextButton2()
       Short_Wait()
   })  
    it('Verify No line item alert', function () { 
       bundledPOPage.verifyAlertAndItsBody('No lineitems selected or present to create BundledPO')          
    });
    it('Verify No line item alert', function () { 
       bundledPOPage.clickOnOK()
       Short_Wait() 
    });
    it('Verify No line item alert', function () { 
       createNewJobPage.ValidateSubwayMap("5. PO Settings");
       bundledPOPage.verifyCreatePOButtonDisabled()        
    });
    it('Verify Close alert and Verify by closing', function () { 
       bundledPOPage.clickOnCloseButton()
    });
    it('Verify Close alert and Verify by closing', function () { 
       bundledPOPage.verifyAlertAndItsBody('Any changes made will be lost. Do you wish to continue ?')          
    });
    it('Click No', function () {            
       bundledPOPage.clickOnNo() 
    })  
    it('Verify Close alert and Verify by closing', function () { 
       createNewJobPage.ValidateSubwayMap("5. PO Settings");
       bundledPOPage.clickOnCloseButton()
    });
    it('Click Yes', function () {            
       bundledPOPage.clickOnYes() 
    })  
    it('Verify Bundled PO Page and Click on Create Bundled PO', function () { 
        bundledPOPage.verifyBundledPOPageIsDisplayed();           
        bundledPOPage.clickOnCreateBundledPOLink();           
    });
    it('Verify Vendor details page, Enter vendor name and Verify page elements', function () { 
        createNewJobPage.ValidateSubwayMap("1. Vendor Details");
        bundledPOPage.enterVendorName(vendorKeyword);           
        bundledPOPage.printVendorDetailsPageElementsValue(vendorKeyword);
        bundledPOPage.verifyPODateDisplayedAndAddFutureDate(5);        
     });
    it('Click Next', function () {            
       bundledPOPage.clickOnNextButton() 
     })  
    it('Verify Line item list table', function () { 
       createNewJobPage.ValidateSubwayMap("2. Line Items Selection");
       bundledPOPage.verifyLineItemsToBePresent()
       reporter.appendTest('Verifying by selecting line item(s)', "********************" , "PASS")
       bundledPOPage.selectLineItemCheckbox(1)
    }); 
     it('Click Next', function () {            
       bundledPOPage.clickOnNextButton() 
     })  
    it('Verify Review Page', function () { 
       createNewJobPage.ValidateSubwayMap("3. Review Bundling");
       reporter.appendTest('As line item(s) are selected in "Line items selection" page ', 'All Line item(s) should be selected/displayed in "Review bundling" page', "********************" , "PASS")
       bundledPOPage.verifyLineItemsToBePresent()
       bundledPOPage.clickOnbundlingOptions()
       
    });
    it('Verify Review Page', function () { 
        bundlingOptions.forEach(option=>{
          bundledPOPage.verifyBundlingOptions(option); 
        })
    });
    it('Click Next', function () {            
       bundledPOPage.clickOnNextButton() 
    })  
    it('Verify Shipping Details Page', function () { 
       createNewJobPage.ValidateSubwayMap("4. Shipping Details");
       bundledPOPage.verifyDefaultShippingAddress(companyName) 
    });
    it('Verify Shipping Details Page', function () { 
       bundledPOPage.updateDefaultShippingAddress(companyName, address1, address2,city,zip,state) 
    });
    it('Update', function () { 
       bundledPOPage.clickOnUpdateButton2()
    })  
    it('Click Next', function () {            
       bundledPOPage.clickOnNextButton2() 
    })  
    it('Verify PO settings Page', function () {          
       createNewJobPage.ValidateSubwayMap("5. PO Settings");
        bundledPOPage.clickOnPreviousInstructionSearchLink();           
    });
    it('Advanced Instructions Search PopUp', function () {          
        createPOPage.verifyAdvancedInstructionsSearchFields();           
        bundledPOPage.searchUsingCustomerInIntruction("WAYLANDBMW -- Wayland BMW");           
        Short_Wait()
    });
    it('Verify and Copy Information', function () {
        bundledPOPage.verifyInstructionResultsDisplayed()    
        createPOPage.copyInformation();           
    });
     it('Verify PO settings Page', function () {          
       createNewJobPage.ValidateSubwayMap("5. PO Settings")
       bundledPOPage.cratePOButton()
       Short_Wait()
    });
    it('Verify po created or not', function () {          
        createPOPage.ismodelPopupDisplayed();           
        createPOPage.storeCreatedPoNumberLocal();     
    });
    it('Click Next', function () {            
        bundledPOPage.clickOnButton('CONTINUE');           
    }) 
    it('Validate subway map ', function () {          
        createNewJobPage.ValidateSubwayMap("6. Send PO");           
        createPOPage.veifySendPOPageElements();           
        createPOPage.validateCreatedPONumberInSubjectAndMessageBodyLocal();           
    });
    it('Click on close without sending button', function () {          
        createPOPage.clickOncloseWithoutSendingButtton();           
    });
    it('Verify that the PO is created', function () {
      bundledPOPage.verifyBundledPOPageIsDisplayed();           
       createPOPage.verifyBundledPOStatus(status)
    });

    it('Verify Bundled PO Page and Click on Create Bundled PO', function () { 
        bundledPOPage.clickOnCreateBundledPOLink();           
    });
    it('Verify Vendor details page, Enter vendor name and Verify page elements', function () { 
        createNewJobPage.ValidateSubwayMap("1. Vendor Details");
        bundledPOPage.enterVendorName(vendorKeyword);           
    });
     it('Click Next', function () {            
       bundledPOPage.clickOnNextButton() 
     })  
    it('Verify Line item list table', function () { 
       createNewJobPage.ValidateSubwayMap("2. Line Items Selection");
       bundledPOPage.clickOnNextButton()
    }); 
    it('Verify Review Page', function () { 
       createNewJobPage.ValidateSubwayMap("3. Review Bundling");
       bundledPOPage.clickOnNextButton()        
    });
    it('Verify Shipping Details Page', function () { 
       createNewJobPage.ValidateSubwayMap("4. Shipping Details");
       bundledPOPage.verifyUpdatedShippingAddress(companyName) 
    });

});


