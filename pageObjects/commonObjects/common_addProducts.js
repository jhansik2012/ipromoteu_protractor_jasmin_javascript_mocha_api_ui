
let ipromoteU_login = requirePage('LoginPage'),
    createPOPage = requirePage('CreatePO'),
    jobsHomePage = requirePage('JobsHomePage'),
    createNewJobPage = requirePage('CreateNewJob'),
    addProductPage=requirePage('addProduct')


module.exports = {
    addProduct: async function (product, cost) {
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
    }
}