'use strict';
const { ActionSequence } = require("protractor");
const { access } = require("fs");

 

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
  random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
 financeLink=element(by.linkText('Finance')),
 financeReviewLink=element(by.xpath("//*[text()='Financial Review']")),
 salesTaxLink=element(by.xpath("//*[text()='Sales Tax']")),
 paymentsLink=element(by.xpath("//*[text()='Payments']")),
 addPaymentButton=element(by.buttonText('Add payment')),
 taxCodeField=element(by.xpath('(//*[@class="select-field__input"]/input)[1]')),
 useNewCreditCardOrDebitCard=element(by.xpath("//button[text()='Use a new credit or debit card']")),
 useNewBankAccount=element(by.xpath("//button[text()='Use a new bank account']")),
 amount=element(by.id('amount')),
 taxExcemptField=element(by.id('taxExempt')),
 CurrentCalculation=element(by.id('salesTaxCurrentMetod')),
 storedTaxData=element(by.id('salesTaxStoredMethod')),
 fullName=element(by.id('fullName')),
 email=element(by.id('email')),
 creditCardOrDebitCard=element(by.xpath("//*[text()='Credit/Debit Card']")),
 bankAccount=element(by.xpath("//*[text()='Bank Account']")),
 payButton=element(by.xpath('//button[contains(text(),"PAY")]/../preceding-sibling::div/button')),
 cancelPayment=element(by.xpath('//button[contains(text(),"CANCEL PAYMENT")]')),
 justifyContent=element(by.css('[class="d-flex justify-content-center col"]')),
 lock=element(by.xpath("//*[text()='lock']")),
 worldPayLink=element(by.xpath("//*[text()='Worldpay']")),
 worldPayImg=element(by.xpath('[alt="worldpay"]')),
 nameOnAccount=element(by.id('holderName')),
 accountNumber=element(by.id('accountNumber')),
 confirmAccountNumber=element(by.id('confirmAccountNumber')),
 routingNumber=element(by.id('routingNumber')),
 checkNumber=element(by.id('checkNumber')),
 saveTheCardForFuturePaymentsCheckBox=element(by.id('savePayment')),
 addressLine1=element(by.id('addressLine1')),
 addressLine2=element(by.id('addressLine2')),
 selectStateDropdown=element(by.xpath("//*[text()='state']/following-sibling::div/div/div")),
 city=element(by.id('city')),
 zip=element(by.id('zipCode')),
 savedCreditCardTable=element(by.css('[class="show-credit-card-table"]')),
 bankAccount=element(by.xpath("//span[text()='Bank Account']")),

 lineItemArray1=[],
 lineItemArray2=[]

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))

 module.exports = {
    /*Used to save application verification data form dynamic verification*/
    specData: {},

    clickOnFinanceLink: function(){
      actions.Click(financeLink,"Finance Link")
    },
    verifyActiveFinanceLink: function(){
      let activeFinance=element(by.xpath("//a[@class='active nav-link' and text()='Finance']")),
       activeReviewLink=element(by.xpath("//a[@class='active nav-link']//span[text()='Financial Review']"));
      actions.verifyElementDisplayed(activeFinance,true,"Active Finance Link")
      actions.verifyElementDisplayed(activeReviewLink,true,"Active Finance Review Link")
    },
    verifyFinancePageElements: function(){
      actions.verifyElementDisplayed(financeReviewLink,true,"Finance Review Link")
      actions.verifyElementDisplayed(salesTaxLink,true,"Sales tax Link Link")
      actions.verifyElementDisplayed(paymentsLink,true,"Payments Link")
    },
    validateFinancialTable: function (column) {
      let ColEle=element(by.xpath('//*[@class="row table-scrollable financial-review-table"]//span[text()="'+column+'"]'))
      actions.verifyElementDisplayed(ColEle,true,column)
    },
    clickOnSort: function () {
         let desc=element(by.xpath('//*[@class="row table-scrollable financial-review-table"]//span[text()="Description"]'))
    actions.Click(desc,"Sort")
    },
    clickOnDescLineItem: function () {
      let ele=element.all(by.xpath('//*[@class="row table-scrollable financial-review-table"]//*[@class="clickable"]')).get(0)
     actions.Click(ele,"Line Item")
    },
    verifyLineItemDetailsPage: function () {
   let ele=element(by.className('modal-content'))
         actions.verifyElementDisplayed(ele,true,"Line Item Details PopUp")
    },
    clickOnSalesTabLink: function () {
     actions.Click(salesTaxLink," Sales Tab")
    },
    clickOnPaymentLink: function () {
     actions.Click(paymentsLink," Payments Tab")
    },
    clickOnPayButton: function () {
     actions.Click(payButton," Pay Button")
    },
    clickOnuseNewBankAccount: function () {
     actions.Click(useNewBankAccount,"User New Bank Account Button")
    },
    clickOnBankAccount: function () {
     actions.Click(bankAccount,"Bank Account Button")
    },
    verifyPaymentButton:function(){
      actions.verifyElementDisplayed(addPaymentButton,true,"Add Payment button")
    },
    verifyBankAccountCardOption:function(){
      actions.verifyElementDisplayed(bankAccount,true,"bankAccount")
    },
    verifyCreditCardOrDebitCardOption:function(){
      actions.verifyElementDisplayed(creditCardOrDebitCard,true,"creditCardOrDebitCard")
    },
    clickOnCreditCardOrDebitCardOption:function(){
      actions.jsClick(creditCardOrDebitCard,"creditCardOrDebitCard")
    },

    verifySavedCreditCardsDetailsTable:function(){
      actions.verifyElementDisplayed(savedCreditCardTable,true,"savedCreditCardTable")
    },
    verifyUseNewCreditCardOrDebitCard:function(){
      actions.verifyElementDisplayed(useNewCreditCardOrDebitCard,true,"useNewCreditCardOrDebitCard")
    },
    clickOnUseNewCreditCardOrDebitCard:function(){
      actions.jsClick(useNewCreditCardOrDebitCard,"useNewCreditCardOrDebitCard")
    },
    enterCardHolder:function(cardHolderName='Stevan'){
      actions.blurText(nameOnAccount,cardHolderName,"Card holder name")
    },
    enterRoutingNumber:function(routingNumber='HDFCINBB'){
      actions.blurText(routingNumber,routingNumber,"Routing Number")
    },
    enterAccountNumber:function(accountNumber='34120000742435'){
      actions.blurText(accountNumber,accountNumber,"Account Number")
    },
    enterAddress1:function(address1='Church street'){
      actions.blurText(addressLine1,address1,"Address1")
    },
    enterAddress2:function(address2='Silver town'){
      actions.blurText(addressLine2,address2,"Address2")
    },
    enterCity:function(cityName='California'){
      actions.blurText(city,cityName,"cityName")
    },
    enterCheckNumber:function(checkNum='523456'){
      actions.blurText(checkNumber,checkNum,"Check Number")
    },
    selectState:async(state='Arizona')=>{
      actions.Click(selectStateDropdown,"State")
       var st=element(by.xpath("//div[text()='"+state+"']"))
       actions.Click(st,state)
    },
    enterZip:function(zipCode){
      actions.blurText(zip,zipCode,"zipCode")
    },
    clickOnSaveCardForFuturePaymentCheckBox:function(){
      actions.jsClick(saveTheCardForFuturePaymentsCheckBox,"saveTheCardForFuturePaymentsCheckBox")
    },
    enterAmmount:function(txt){
      actions.verifyElementDisplayed(amount,true,"Amount field")
      actions.blurText(amount,txt,"Amount")
    },
    enterACardNumber:function(txt){
      //Not yet available in the application
    },
    clickOnCancelPaymentButton:function(){
      actions.jsClick(cancelPayment,"cancelPayment button")
    },
    clickOnPaymentButton:function(){
      actions.jsClick(payment,"Payment button")
    },
    enterFullName:function(name){
      actions.blurText(fullName,name,"fullName")
    },
    enterEmailAddress:function(mailID){
      actions.blurText(email,mailID,"email")
    },
    clickOnAddPaymentButton:function(){
      actions.jsClick(addPaymentButton,"Add Payment button")
    },

    verifyCreditCardTableHeaders:function(headerName){
      var elem=element(by.xpath('//*[@class="show-credit-card-table"]//*[text()="'+headerName+'"]'))
      actions.verifyElementDisplayed(elem,true,headerName)
    },
    selectCreatedCreditCardOrDebitCard:function(cardName){
      var elem=element(by.xpath("//*[@class='show-credit-card-table']//*[text()='"+cardName+"']/../../..//*[text()='fiber_manual_record']"))
      actions.jsClick(elem,cardName+" card")
    },
    VerifyTaxCode: function () {
   //   let ele=element(by.xpath('(//*[@class="select-field__input"])/../../div'));
     let ele=element(by.xpath('//*[@class="tab-nav finance-tabs"]//*[contains(@class,"css-1uccc91")]'));
      actions.VerifyElementPresent(ele,true,"Tax Code Field")
      ele.getText().then(taxCode=>{
        if(taxCode=='Select a tax code') reporter.appendTest('Tax Code Not Present', 'Displayed: '+taxCode , "PASS");
        else reporter.appendTest('Tax Code Present', 'Tax Code:'+taxCode , "PASS");
      })
    },
    selectTaxCodeFromDrop: function (taxCode) {
      actions.blurText(taxCodeField,taxCode,"Tax Code Field")
      Medium_Wait()
      let taxC=element(by.xpath('//*[text()="'+taxCode+'"]'))
      actions.jsClick(taxC,taxCode)
      actions.PressEnter()
    },
    verifyTaxCodeChange: function () {
      Medium_Wait()
      let per=element(by.xpath("//*[text()='Tax Code']/following-sibling::p"))
      actions.verifyElementDisplayed(per,true,"Percentage")  
    },
    enterTaxExcempt: function (taxExcempt) {
       actions.blurText(taxExcemptField,taxExcempt,"Tax Excempt Field")
    },
    verifyTaxCalulationSection: function (field) {
      let display=element(by.xpath("//*[text()='"+field+"']")),
          displayValue=element(by.xpath("//*[text()='"+field+"']/following-sibling::td"))
      actions.verifyElementDisplayed(display,true,field)
      actions.verifyElementDisplayed(displayValue,true,field+" Value")
    },
   validateMethodsOption: function () {
    let curr=element(by.xpath("//*[text()='Current Calculations']")),
    store=element(by.xpath("//*[text()='Stored Tax Data']"))
        actions.jsVerifyElementDisplayed(curr,true,"Current Calculation")
        actions.jsVerifyElementDisplayed(store,true,"stored Tax Data")
   },
   verifyIsdefaultOptionSelected: function () {
     actions.verifyElementSelected(CurrentCalculation,true,"CurrentCalculation")
   },
   validateSalesTable: function (column) {
      let ColEle=element(by.xpath('//*[@class="row sales-tax-table table-scrollable"]//span[text()="'+column+'"]'))
      actions.verifyElementDisplayed(ColEle,true,column)
    },
    clickOnSortProduct: function () {
      let ele=element(by.xpath('//*[@class="row sales-tax-table table-scrollable"]//span[text()="Product"]'))
      actions.Click(ele,"Product Sort")
    },
    storeLineItemFromLineItemPage: function () {
      let LI=element.all(by.xpath('(//*[@class="details-table row"])[1]//*[contains(@id,"desc_")]'))
      LI.count().then(count=>{
          LI.each(ele=>{
           ele.getText().then(text=>{
             for(let i=0;i<count;i++)
               {
              lineItemArray1[i]=text;
               }
          })
        })
    })
    },
    storeLineItemFromfinancePage: function () {
      let LI=element.all(by.xpath('//*[@class="tab-nav finance-tabs"]//*[@class="clickable"]'))
        LI.count().then(count=>{
           LI.each(ele=>{
             ele.getText().then(text=>{
             for(let i=0;i<count;i++)
               {
              lineItemArray2[i]=text
               }
          })
        })
      })
    },
    validateLineItems: function () {
      if(lineItemArray1.length==lineItemArray2.length)
      {
        for(let i=0;i<lineItemArray1.length;i++){
          actions.expectToContain(lineItemArray1[i],lineItemArray2[i])
        }
      }
      else
      {
       reporter.appendTest('Verifying Line Items', 'Line Item count mismatch- '+'Line items displayed in line item page :'+lineItemA1.length+' Line items displayed in Finance Page :'+lineItemArray2.length, "FAIL");

      }
    }
 }