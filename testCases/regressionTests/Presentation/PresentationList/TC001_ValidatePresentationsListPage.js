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


describe('Validate PresentationsList Page',function(){
    appLogger.Log("************************ Execution Started ***************************");
    appLogger.Log("************************ " + __filename + "***************************");
    beforeEach(function () {        
        global.current_TestCase = "TC001-PresentationList_ValidatePresentationsListPage";
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
    it('Validate KPI',function(){
        presentaionPage.validateKPI("Quotes Sent")
    });
    it('Validate KPI',function(){
        presentaionPage.validateKPI("Awaiting Approval")
    });
    it('Validate KPI',function(){
        presentaionPage.validateKPI("Quotes Accepted")
    });
    it('Creation date filter',function(){
        presentaionPage.clikOnCreatedDateFilter()
    })
    it('Creation date filter',function(){
        presentaionPage.verifyCreationDateOptions("Last 30 Days")
    })
    it('Enter any text under Keyword Search',function(){
        presentaionPage.enterSearchKeyword("test")
    })
    it('Select type',function(){
        presentaionPage.selectTypeDropOptions('Any')
    })
    it('Select sales rep',function(){
        presentaionPage.enterSalesRepDropOption('All Sales Rep')
    })
    it('Validate Presentations,Created,Rep,Customer,Name,Type,Accepted Columns displayed in Presentations table',function(){
        presentaionPage.verifyTableColumns('presentations')
        presentaionPage.verifyTableColumns('created')
        presentaionPage.verifyTableColumns('rep')
        presentaionPage.verifyTableColumns('customer')
        presentaionPage.verifyTableColumns('NAME')
        presentaionPage.verifyTableColumns('type')
        presentaionPage.verifyTableColumns('accepted')
    })
   
    // it('Click on Up/Down arrows  next to Presentations Column header',function(){
    //     //sort funtionality is not working
    // })
    // it('Validate the Presentations list is sorted based on Presentation Id with ascending/Descending Order',function(){
    //     //sort funtionality is not working
    // })

    it('Click on Ellipse next to any Presentation row',function(){
        presentaionPage.clickOnElipseIcon()
    })
    it('View Details,Preview Presentation options are displayed',function(){
        presentaionPage.verifyToggleDropOption('View Details')
        presentaionPage.verifyToggleDropOption('Preview Presentation')
        /** Below options 'Copy Prsentation' and 'Archive' are not present in beta version */
        // presentaionPage.verifyToggleDropOption('Copy Presentation')
        // presentaionPage.verifyToggleDropOption('Archive')
    })
    // it('Click on View Details option',function(){
    //     presentaionPage.clickOnToggleDropOption('View Details')
    // })
    // it('Selected Prsentation details page is displayed',function(){
    // this functionality is not working
    // })

      // it('Click on Preview Presentation option',function(){
    //     presentaionPage.clickOnToggleDropOption('View Details')
    // })
    // it('Preview Presentation page is displayed',function(){
    // this functionality is not working
    // })

    
})

    