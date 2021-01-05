
let ipromoteU_login = requirePage('LoginPage'),
    createPOPage = requirePage('CreatePO'),
    jobsHomePage = requirePage('JobsHomePage'),
    createNewJobPage = requirePage('CreateNewJob'),
    addProductPage=requirePage('addProduct'),
    repeatJobPage = requirePage('RepeatJob')

module.exports = {
    addProduct: async function (product='ASI Products', cost='5.5') {
        addProductPage.clickOnAddProductButton();
        Long_Wait()
        
        createNewJobPage.clickOnProduct(product);
        Long_Wait()
        Long_Wait()

        createNewJobPage.clickOnOrderNowButton();
        Long_Wait()
        Long_Wait()
       
        createNewJobPage.enterProductQuantity();
        Long_Wait()
        Long_Wait()

        createNewJobPage.clickOnAddPricingButton();           
        Long_Wait()
        Long_Wait()
        
        createNewJobPage.enterRequestedShipDate()
        Long_Wait()
        Long_Wait()

        createNewJobPage.clickOnAddLineItemButton();
    },
     addProductAndCreatePO: async function (product='ASI Products', cost='5.5', vendorCode='AFP') {
        addProductPage.clickOnAddProductButton();
        Long_Wait()
        
        createNewJobPage.clickOnProduct(product);
        Long_Wait()

        createNewJobPage.clickOnOrderNowButton();
        Long_Wait()
       
        createNewJobPage.enterProductQuantity();
        Long_Wait()

        createNewJobPage.clickOnAddPricingButton();           
        Long_Wait()
        
        createNewJobPage.enterRequestedShipDate()
        Long_Wait()

        createNewJobPage.clickOnAddLineItemButton();
        Long_Wait()
        Long_Wait()
        
        createPOPage.clickOnCreatePOS();
        Long_Wait()
        
        createPOPage.selectCreatePOSOptionFromDropdown();
        Long_Wait()

        createPOPage.clickOnNextButton("Next Button");           
        Long_Wait()
        
        createPOPage.enterVendorName(vendorCode);           
        Long_Wait()

        createPOPage.clickOnNextButton("Next Button");           
        Long_Wait()

        createPOPage.clickOnNextButton("Create PO Button");           
        Long_Wait()

        createPOPage.clickOnOkButton();           
        Long_Wait()

        createPOPage.clickOncloseWithoutSendingButtton();           
        Long_Wait()    
    }
}