var ipromoteU_login = requirePage('LoginPage'),
    jobsHomePage = requirePage('JobsHomePage'),
    createPOPage=requirePage('CreatePO'),
    bundledPOPage = requirePage('BundledPOPage')

var testName = 'TC001',
    operatorName = csvProcessor.filterData(testName, 'OperatorName'),
    password = csvProcessor.filterData(testName, 'Password'),
    url = csvProcessor.filterData(testName, 'Url'),
    vendorName = csvProcessor.filterData(testName, 'VendorName'),
    customerName = csvProcessor.filterData(testName, 'CustomerName');

var poDatesFilter= ['Last 12 Months', 'Last 90 Days  ','Last 60 Days  ', 'Last 30 Days  '],
 poTableColumns= ['po', 'created','vendor', 'sent', 'total', 'status', 'shipped', 'carrier'],
 poStatusOptions= ['PO Sent','In Production', 'Not Sent', 'Complete'],
 poLinkedJobTableColumns = ['JobNumber','Customer', 'Job Name', 'JOB STATUS', 'REQ SHIP', 'IN HAND'],
 poNumber= 'B107984XSD',
 voidPO= 'B107977XSD';

describe('Job Screen', function () {
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        global.current_TestCase = "TC001-BundledPOList-Filter-verifyBundledPOListPageFeatures";
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
    it('Verify Bundled PO Page', function () { 
        bundledPOPage.verifyBundledPOPageIsDisplayed();           
    }); 

// PO dates
    it('Verify displayed results with filter condition', function () {
     reporter.appendTest('PO dates filter', "Default filter is '12 months', and verifying the list based on the same condition" , "PASS");    
        bundledPOPage.verifyLineItemPODateFilterCondition(365);           
    });
    
    it('Select PO date filter', function () { 
        bundledPOPage.selectPODates('Custom Date Range');
    });
    it('Select PO date filter', function () { 
        bundledPOPage.selectCustomPODate(1);
        Short_Wait()           
    });
    it('Verify displayed results with filter condition', function () { 
        bundledPOPage.verifyLineItemPODateFilterCondition(1);           
    });    

    it('Select PO date filter', function () { 
        bundledPOPage.selectPODates('Last 90 Days  ');
        Short_Wait()           
    });
    it('Verify displayed results with filter condition', function () { 
        bundledPOPage.verifyLineItemPODateFilterCondition(90);           
    });
    it('Click on last Page', function () { 
        bundledPOPage.clickOnLastPage();           
    });
    it('Verify displayed results with filter condition', function () { 
        Short_Wait()           
        bundledPOPage.verifyLineItemPODateFilterCondition(90);           
    });

    it('Select PO date filter', function () { 
        bundledPOPage.selectPODates('Last 60 Days  ');           
        Short_Wait()           
    });
    it('Verify displayed results with filter condition', function () { 
        bundledPOPage.verifyLineItemPODateFilterCondition(60);           
    });

    it('Select PO date filter', function () { 
        bundledPOPage.selectPODates('Last 30 Days  ');           
        Short_Wait()           
    });
    it('Verify displayed results with filter condition', function () { 
        bundledPOPage.verifyLineItemPODateFilterCondition(30);           
    });
    it('Select PO date filter', function () { 
        bundledPOPage.selectPODates('Last 12 Months');           
        Short_Wait()           
    });
    it('Verify displayed results with filter condition', function () { 
        bundledPOPage.verifyLineItemPODateFilterCondition(365);           
    });

//menu
    it('Verify Menu Options', function () { 
        bundledPOPage.clickOnMenuItem(1); 
    });
     it('Verify Menu Options', function () { 
        bundledPOPage.verifyMenuOptions();          
    });
//table
    it('Verify Bundled PO List Table', function () { 
       reporter.appendTest('<b>Verifying PO List Table columns</b>', '*************', "");         
        poTableColumns.forEach(column=>{
         bundledPOPage.verifyBundledPOListTable(column); 
      })       
    }); 
    
//Status Filter
    it('Select PO Status filter', function () { 
       bundledPOPage.clickOnStatusDrop();           
        reporter.appendTest('<b>Verifying status filter options</b>', '*************', "");         
         poStatusOptions.forEach(option=>{
          bundledPOPage.verifyStatusOptionFromDrop(option); 
         })
    });
//Data not accesible to this user for other status

//menu drop
    it('Verify Menu Options', function () { 
        bundledPOPage.clickOnListDropDown(1); 
    });
//table
    it('Verify Bundled PO Linked Job List Table', function () { 
       reporter.appendTest('<b>Verifying PO Linked Job list Table columns</b>', '*************', "");         
        poLinkedJobTableColumns.forEach(column=>{
         bundledPOPage.verifyBundledPOLinkedJobListTable(column); 
      })       
    });
    // it('Verify displayed Job links', function () { 
    //     bundledPOPage.selectListedJobUnderPOAndClickOntheJobLinkAndVerifyJobDetailsPage(0); 
    // });  //click operation is not working with Click()
    
//Discard PO 
    it('Click on Menu', function () {  
        bundledPOPage.storePONumberAndVendor(1)
    });
      it('Click on Menu', function () {  
        bundledPOPage.clickOnMenuItem(1); 
    });
    it('Click On Send PO Button', function () {  
      reporter.appendTest('Send PO', "******************************" , "");
       bundledPOPage.clickOnSendPOButton(); 
    });
    it('Verify Send PO Page Elements', function () {  
        bundledPOPage.verifySendPOPage(); 
        createPOPage.veifySendPOPageElements(); 
        bundledPOPage.validatePONumberInSubject(); 
    });
    it('Verify Send PO Page Elements', function () {  
        createPOPage.clickOndiscardButtton();           
    });
    it('Verify Alert and close Pop-up', function () {          
        createPOPage.verifyAlertAndclosePop('PO discarded successfully','OK','Alert');           
    });
    it('verify PO Discarded Successfully', function () {  
        bundledPOPage.verifyPODiscardedSuccessfully(); 
    });

//Close without Sending PO 
    it('Click on Menu', function () {  
        bundledPOPage.storePONumberAndVendor(1)
    });
    it('Click on Menu', function () {  
        bundledPOPage.clickOnMenuItem(1); 
    });
    it('Click On Send PO Button', function () {  
        bundledPOPage.clickOnSendPOButton(); 
    });
    it('Verify SendPO Page', function () {  
        bundledPOPage.verifySendPOPage(); 
    });
    it('Verify SendPO Page', function () {  
        createPOPage.clickOncloseWithoutSendingButtton();           
    });
    it('verify PO Discarded Successfully', function () {  
        bundledPOPage.verifyPONotRemoved(); 
    });

//Void Menu
    it('Click on Menu', function () {  
        bundledPOPage.storePONumberAndVendor(1)
    });
    it('Click on Menu', function () {  
        bundledPOPage.clickOnMenuItem(1);
    });
    it('Click on Void PO', function () {  
     reporter.appendTest('Void PO', "******************************" , "");
        bundledPOPage.clickOnVoidPOButton(); 
    });  
    it('Verify Alert', function () {          
        bundledPOPage.verifyVoidAlertAndItsBody('Are you sure you want to void PO');           
        Medium_Wait()
    });
    it('Click on Yes', function () {  
        bundledPOPage.clickOnYesImSure();
    });
    it('Verify Alert', function () { 
        bundledPOPage.verifySuccessfullAlertAndItsBody('VOID PO SUCCESSFULLY');           
        Medium_Wait()
    });
    it('Click on OK', function () {  
        bundledPOPage.clickOnOK();
    }); 
    it('Click on Show void and search Selected PO', function () { 
        bundledPOPage.searchSelectedPO();
    });
    it('search Selected PO', function () { 
        bundledPOPage.clickOnShowVoidPO();               
        Short_Wait()
    });
    it('Verify status', function () {          
        bundledPOPage.verifyStatusOfVoidedPO();           
    });
    it('Verify status', function () {          
        bundledPOPage.clickOnSelectedLineItemMenuItem(); 
    });
    it('Click on Void PO', function () {  
        bundledPOPage.clickOnVoidPOButton(); 
    });  
    it('Verify Alert', function () {          
        bundledPOPage.verifyVoidedAlertAndItsBody('This bundled PO cannot be voided.');           
    });
     it('Click on OK', function () {  
        bundledPOPage.clickOnOK();
    }); 
    it('Click on show Void PO', function () {  
        bundledPOPage.clickOnShowVoidPO();                  
    }); 

 // //keyword seacrh
 //    it('Search PO using keyword Search Field', function () { 
 //        bundledPOPage.searchUsingKeyword(poNumber);
 //        Short_Wait()           
 //    });
 //    it('Verify displayed results with searched keyword', function () { 
 //        bundledPOPage.verifyKeywordSearchResults(poNumber);           
 //    });
 
 //Show void
    it('Search PO using keyword Search Field', function () { 
        bundledPOPage.searchUsingKeyword(voidPO);           
        Short_Wait()           
    });
    it('Verify No matching data found displayed', function () { 
        bundledPOPage.verifyNoMatchingDataFound();           
    });
     it('Verify No matching data found displayed', function () { 
        bundledPOPage.clickOnShowVoidPO();           
        Short_Wait()           
    });
    it('Verify displayed results with searched keyword', function () { 
        bundledPOPage.verifyKeywordSearchResults(voidPO);           
    });

// // Verify PO link
//     it('Verify PO Link', function () { 
//         bundledPOPage.verifyPOLink();           
//     });
      
});

