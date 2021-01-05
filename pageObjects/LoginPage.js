// *************************************************
/*global document, window, alert, console, require, browser,jasmine,
 requirePage, requireData, requireConfig, requireLibrary,
 describe, it, beforeEach, forEach, by, includes, expect, titlePromise, includes , element, $, then, $locatorRepeater, calenderInputData*/
/*
 */
'use strict';

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
  random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//

    txtUserName = element(by.id('username')),
    txtPassword = element(by.id('password')),
    operatorCodeErrorMsg = element(by.xpath("//div[@class='error mt-3 mb-3']")),
    
    passwordMsg = element(by.xpath("//div[.='Password is wrong']")),
    lblJobsTitle = element(by.xpath("//h1[.='Jobs']")),

    ddlAffiliate= element(by.name("affiliateId")),
    ddloperator = element(by.name("operatorId")),
    btnSignInAsOperator = element(by.xpath("//button[text() ='SIGN IN AS OPERATOR']")),    
    btnSignIn = element(by.xpath("//button[text() ='SIGN IN']")) 

 module.exports = {
  /*Used to save application verification data form dynamic verification*/
  specData: {},

    verifyOperatorCodeErrorMsg : function ( elementName, errMessage,) {
      operatorCodeErrorMsg.getText().then(text=>{
            actions.expectToEqualCustom(errMessage, text,"Wrong Password Error" , "Expected Message", "Displayed Message")
              },function(err){ 
         expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
      })
    },

    verifyJobsPageHeader : function (pageName, elementName) {
        Medium_Wait();
        actions.AssertText(lblJobsTitle, pageName, elementName);
    },

    navigateToUrl : function (url) {
       // browser.driver.manage().window().maximize();
        actions.Get(url,20)
      //  browser.executeScript("document.body.style.zoom='70%'");
    },
    
    enterUsername : function (username, elementName) {
        actions.SetText(txtUserName, username, elementName);
    },

    enterPassword : function (password, elementName) {
        actions.SetText(txtPassword, password, elementName);
    },

    selectAffiliate : function (affiliate) {
        actions.selectByText(ddlAffiliate, affiliate,"Affiliate");
    },

    selectOperator : function (operator) {
        actions.selectByText(ddloperator, operator,"Operator");
    },
    
    clickOnSignInButton : function () {
        actions.jsClick(btnSignIn, "Login Button");
    },

    VerifySignInIsDisplayed : function () {
        actions.verifyElementDisplayed(btnSignIn,true, "Login Button");
    },

    clickOnSignInAsOperatorButton : function () {
        actions.Click(btnSignInAsOperator, "SignInAsOperator Button");
    },

    fillLoginDetails :  (operatorName, passowrd, element1Name, element2Name)=> {
    reporter.appendTest('Login into application', '************Login into application *******************', "PASS");  
          actions.blurText(txtUserName, operatorName, "Operator");
          actions.enterPassWord(txtPassword, passowrd, "Password");
          Medium_Wait()
          actions.jsClick(btnSignIn, "Login Button");
        reporter.appendTest('Logged into application', '************Logged into application *******************', "PASS");  
        browser.sleep(40000)

    },


    fillAffliateDetails : function (affiliate,operator) {
        var winHandles=browser.getAllWindowHandles();
        winHandles.then(function(handles) 
        {
            var popUpWindow=handles[1];
            browser.switchTo().window(popUpWindow);
        })
       
        this.selectAffiliate(affiliate);
        reporter.appendTest('Select', 'Selected Affiliate as ' +affiliate , "PASS");  
        Long_Wait();
        this.selectOperator(operator);
        reporter.appendTest('Select', 'Selected Operator as  ' +operator , "PASS");  
        Long_Wait();
        this.clickOnSignInAsOperatorButton();
        reporter.appendTest('Click', 'Clicked on  SignIn As Operator Button' , "PASS");  
    },

    switchToParent : function(){
        var winHandles=browser.getAllWindowHandles();
        winHandles.then(function(handles) 
        {
            var popUpWindow=handles[0];
            browser.switchTo().window(popUpWindow);
        })

    },

    quitBrowser : function () {
        browser.quitBrowser();
    }

};
