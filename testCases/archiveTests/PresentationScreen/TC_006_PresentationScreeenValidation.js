let ipromoteU_login = requirePage('LoginPage'),
jobsHomePage=requirePage('JobsHomePage'),
presentaionPage=requirePage('PresentationPage')

var testName = 'TC001',
operatorName = csvProcessor.filterData(testName, 'OperatorName'),
password = csvProcessor.filterData(testName, 'Password'),
url  = csvProcessor.filterData(testName, 'Url'),
colmnList=['presentations','created','rep','customer','NAME','type','accepted'],
TypeOptions=['Quote','Showcase'],
CreatedDateOptions=['Last 12 Months','Last 90 Days','Last 60 Days','Last 30 Days']



describe('Presentation Screeen Validation',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {
        
        global.current_TestCase = "TC006-Presentation_Presentation Screeen Validation";
      });     

    it('Navigate iPROMOTEu url', function () {
        ipromoteU_login.navigateToUrl(url);
    });
    it('Login with valid credentials and validate Jobs page', function () {        
        ipromoteU_login.fillLoginDetails(operatorName, password, "Valid Operator Name", "Valid password");        
    });
    it('Verify Presentaion link and click on presentation link', ()=> {
        presentaionPage.clickOnPresentationLink();
    });
    it('Verify Prentation Header', ()=> {
        presentaionPage.verifyPrentationHeader();
    });
    it('Verify Create Presentation Button', ()=> {
        presentaionPage.verifyCreatePresentationButton();
    });
    it('Verify Table Columns', ()=> {
        colmnList.forEach((col)=>{
        	presentaionPage.verifyTableColumns(col);
        })
    });
    it('Validate KPI', ()=> {
        presentaionPage.verifyQuotesStatusSection();
    });
    it('Verify Default Type filter value', ()=> {
        presentaionPage.verifyDefaultType('Any');
    });
    it('verify Default Creation Date value', ()=> {
        presentaionPage.verifyDefaultCreationDate('Last 12 Months');
    });
    it('veify Default SalesRep value', ()=> {
        presentaionPage.veifyDefaultSalesRep('All Sales Rep');
    });

    it('verify Type Filter', ()=> {
        presentaionPage.verifyTypeFilter();
    });
    it('Click on type filter', ()=> {
        presentaionPage.clickOntypeFilter();
    });
    it('verify Type Drop-down Options', ()=> {
      TypeOptions.forEach((option)=>{
            presentaionPage.verifyTypeDropOptions(option);
        })
    });
    it('Click on type filter', ()=> {
        presentaionPage.clickOntypeFilter();
    });
    it('Click on Created date filter', ()=> {
        presentaionPage.clikOnCreatedDateFilter();
    });
    it('verify Created Date Options', ()=> {
      CreatedDateOptions.forEach((option)=>{
            presentaionPage.verifyCreationDateOptions(option);
        })
    });
    
    it('Click on type filter', ()=> {
        presentaionPage.clickOntypeFilter();
     });
    it('verify Type Drop-down feature-\'Showcase\' ', ()=> {
        presentaionPage.verifyListAfterTypeFilter('Showcase','SHOWCASE');
    });
    it('Click on type filter', ()=> {
         presentaionPage.clickOntypeFilter();
     });
    it('verify Type Drop-down feature-\'Quote\' ', ()=> {
        presentaionPage.verifyListAfterTypeFilter('Quote','QUOTE');
    });

     it("Click on Ellipse next to any Presentation row", ()=>{
     presentaionPage.clickOnelipseDrop();
     })    
     it("Click on View Details option",()=>{
     presentaionPage.clickOnViewDetails();  //Feature not developed/ Working
     })
     //verify spec needs to be developed after above feature developed

     it("Click on Ellipse next to any Presentation row", ()=>{
     presentaionPage.clickOnelipseDrop();
     })
     it("Click on Preview Presentation option",()=>{
     presentaionPage.clickOnPreviewPresentation();   //Feature not developed/ Working
     })
     //verify spec needs to be developed after above feature developed

     it("Click on Ellipse next to any Presentation row", ()=>{
     presentaionPage.clickOnelipseDrop();
     })
     it("Click on Copy Presentation option",()=>{
     presentaionPage.clickOnCopyPresentation();   //Feature not developed/ Working
     })
     //verify spec needs to be developed after above feature developed

     it("Click on Ellipse next to any Presentation row", ()=>{
     presentaionPage.clickOnelipseDrop();
     })
     it("Click on archive option",()=>{
     presentaionPage.clickOnArchive();   //Feature not developed/ Working
     })
      //verify spec needs to be developed after above feature developed

 
    // it('verify each \'Created Date \' filter options', ()=> {
    //     //feature not stabelized or large number of list
    // });

    // it('Verify keyword Search', ()=> {
    //   //feature is not working properly
    // });

    // it("Click on Up/Down arrows  next to Created Column header", ()=>{
    //    // Feature not developed/ working
    // })
})

    