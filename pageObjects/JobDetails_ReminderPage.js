// *************************************************
/*global document, window, alert, console, require, browser,jasmine,
 requirePage, requireData, requireConfig, requireLibrary,
 describe, it, beforeEach, forEach, by, includes, expect, titlePromise, includes , element, $, then, $locatorRepeater, calenderInputData*/
/*
 */
'use strict';
const { ActionSequence } = require("protractor");

 

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
  random = new Random(Random.engines.mt19937().autoSeed());
var genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
 RemidersLink=element(by.linkText('Reminders')),
 reminderTabActive=element(by.xpath('//*[@class="active nav-link"and text()="Reminders"]')),
 FilterByCatDrp=element(by.xpath("(//*[text()='View All'])[1]/../following-sibling::div")),
 Display_All=element(by.xpath("//span[text()='DISPLAY']/following-sibling::ul//*[@value='all']/..")),
 Display_Upcomig=element(by.xpath("//span[text()='DISPLAY']/following-sibling::ul//*[@value='upcoming']/..")),
 Display_Past=element(by.xpath("//span[text()='DISPLAY']/following-sibling::ul//*[@value='past']/..")),
 AddReminderButton=element(by.buttonText('ADD REMINDER')),
 AddReminderButton_InPage=element(by.buttonText('Add Reminder')),
 AddReminderHeader=element(by.className('modal-title')),
 AddReminderPageClose=element(by.className("close")),
 RowElements=element.all(by.xpath('//*[@class="d-flex align-items-center flex-nowrap table__row Row_left0Margein"]')),
 ReminderTitle=element(by.id('reminderName')),
 reminderDesc=element(by.id('description')),
 reminderDate=element(by.id('date')),
 ReminderTime=element(by.id('time')),
 ReminderInApp=element(by.id('inApp')),
 RemiderSMS=element(by.id('sms')),
 Remideremail=element(by.id('email')),
 ReminderUpdate=element(by.buttonText('Update Reminder')),
 rowCount=null,
 newTitle=null,
 newDesc=null,
 countBefore=null

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))
  module.exports = {
    /*Used to save application verification data form dynamic verification*/
    specData: {},

    clickOnReminder:function(){
      Medium_Wait()
    actions.jsClick(RemidersLink,"Remiders Link")
    },

    verifyReminderTab:function(){
        actions.verifyElementDisplayed(reminderTabActive,true,'reminderTabActive')
    },
    verifyFilterByDropDown:function(){
      actions.verifyElementDisplayed(FilterByCatDrp,true,"Filter By Cat Drop")
      actions.Click(FilterByCatDrp,"FilterByCatDrp")
      var InApp=element(by.xpath('//*[text()="In-App"]')),
      sms=element(by.xpath('//*[text()="SMS"]')),
      EMail=element(by.xpath('//*[text()="E-Mail"]'))
      actions.verifyElementDisplayed(InApp,true,"InApp")
      actions.verifyElementDisplayed(sms,true,"sms")
      actions.verifyElementDisplayed(EMail,true,"EMail")
    },
    VerifyDisplayOptions:function(){
      actions.jsVerifyElementDisplayed(Display_All,true,"Display_All")
      actions.jsVerifyElementDisplayed(Display_Upcomig,true,"Display_Upcomig")
      actions.jsVerifyElementDisplayed(Display_Past,true,"Display_Past")
    },
    VerifyAddReminderButton:function(){
      actions.verifyElementDisplayed(AddReminderButton,true,"AddReminderButton")
      actions.jsClick(AddReminderButton,"AddReminderButton")
    },
    clickOnAddReminderInPage:function(){
    actions.Click(AddReminderButton_InPage,"AddReminderButton")
    },
    enterReminderTitle:function(remiderName){
      actions.blurText(ReminderTitle,remiderName,"ReminderTitle")
    },
    enterReminderDate:function(daysToAdd){
        var currentDate = new Date(),
            dd = currentDate.getDate()+daysToAdd,
            mm = currentDate.getMonth() + 1, //as January is 0
            yy = currentDate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        let date = mm + '' + dd + '' + yy;
      actions.blurText(reminderDate,date,"ReminderDate")
    },
    enterReminderTime:function(time){
      actions.blurText(ReminderTime,time,"ReminderTime")
    },
    enterReminderDesc:function(Desc){
      actions.blurText(reminderDesc,Desc,"ReminderDesc")
    },
    verifyAndSelectRemindMemethod:function(){
     // actions.verifyElementSelected(ReminderInApp,true,"ReminderInApp")
     actions.jsClick(RemiderSMS,"ReminderSMS")
    // actions.jsClick(Remideremail,"Reminderemail")
    },
    verifyAddReminderPage:function(){
      actions.verifyElementDisplayed(AddReminderHeader,true,"AddReminderHeader")      
    },

    closeReminderPopup:function(){
      actions.Click(AddReminderPageClose,"AddReminderPageClose")
    },

    ClickOnAddReminder:function(){
      actions.Click(AddReminderButton,"AddReminderButton")
    },
    ClickOnUpdateReminder:function(){
      actions.Click(ReminderUpdate,"ReminderUpdate")
    },
    SelectCatFilter:function(Category){
      actions.Click(FilterByCatDrp,"FilterByCatDrp")
      Medium_Wait()
      let ele=element(by.xpath("//*[text()='"+Category+"']"))
      actions.waitUntilElementPresent_OffShore(ele,Category)
      actions.Click(ele,Category)     
    },
    getRowCount: function(){
    RowElements.count().then(count=>{
      rowCount=count;
    })
    },
    validateUpdate:function(){
      Medium_Wait()
      RowElements.count().then(count=>{
       let latestRowCount=count;
        actions.expectNotToEqual(rowCount,latestRowCount,"Row count validation")
      })
      
    },
    VerifyResultAfterCatFilter:function(Category){
     Medium_Wait()
      RowElements.each(elem=>{
         elem.all(by.tagName("div")).get(3).element(by.tagName("p")).getText(text=>{
          actions.verifyElementDisplayed(elem,"")
          actions.expectToContain(text,"Random",Category)
         })
       })
    
  },
    VerifyDisplayFilterUpcoming:function(){
      actions.jsClick(Display_Upcomig,"Upcoming")
      Medium_Wait()
      RowElements.each(ele=>{
      ele.all(by.tagName("div")).get(1).element(by.tagName("div")).getText(text=>{
     
        let currentDate = new Date();
        let dd = currentDate.getDate();
        let mm = currentDate.getMonth() + 1; //as January is 0
        // var yy = currentDate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        let date = mm + '/' + dd + '/' + '20';
        Medium_Wait()
        actions.expectNumberToBeGreaterThan(text.split(" ")[0].trim(),date,date)
        })
      })
      },
      VerifyDisplayFilterPast:function(){
      actions.jsClick(Display_Past,"Past")
      Medium_Wait()
      RowElements.each(ele=>{
      ele.all(by.tagName("div")).get(1).element(by.tagName("div")).getText(text=>{
        
        let currentDate = new Date();
        let dd = currentDate.getDate();
        let mm = currentDate.getMonth() + 1; //as January is 0
        // var yy = currentDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        let date = mm + '/' + dd + '/' + '20';
        Medium_Wait()
        actions.expectNumberToBeGreaterThan(date,text.split(" ")[0].trim(),date)
        })
      })
    },
   ClickOnElipseandEdit:function(){
    Medium_Wait()
  var toggleBtn=element.all(by.xpath('//*[@class="Reminders-table row"]//*[@class="d-inline-block pr-2 pr-md-4 btn btn-secondary"]')).get(0)
     Short_Wait()
     actions.jsClick(toggleBtn,"toggle button")
      Medium_Wait()
      let edit=element(by.xpath("//*[@class='Reminders-table row']//*[text()='Edit']")),
      del=element(by.xpath("//*[@class='Reminders-table row']//*[text()='Edit']"))
      actions.jsClick(edit,"edit")
    },
  updateReminder:function(){
    ReminderTitle.getAttribute('value').then(title=>{
        newTitle=title+""+"-Updated"
        actions.blurText(ReminderTitle,newTitle,"Reminder Title")
        })
    reminderDesc.getAttribute('value').then(desc=>{
        newDesc=desc+""+"-Updated";
        actions.blurText(reminderDesc,newDesc,"Reminder Desc")
          })
    actions.Click(ReminderUpdate,"Update Reminder")
  },
  validateUpdatedValues:function(){
    Medium_Wait()
     let   updatedTitle=element(by.xpath('//*[@class="Reminders-table row"]//*[text()="'+newTitle+'"]')),
       updatedDesc=element(by.xpath('//*[@class="Reminders-table row"]//*[text()="'+newDesc+'"]'))
     actions.verifyElementDisplayed(updatedTitle,true,"Updated Title")
     actions.verifyElementDisplayed(updatedTitle,true,"Updated Desc")
  },
  ClickOnElipseDelete:function(){
   let  toggleBtn=element.all(by.xpath('//*[@class="Reminders-table row"]//*[@class="d-inline-block pr-2 pr-md-4 btn btn-secondary"]')),
    firsttoggle=toggleBtn.get(0)
    toggleBtn.count().then(count=>{
      countBefore=count;
    })
    actions.jsClick(firsttoggle,"toggle button")
    Medium_Wait()
    let del=element(by.xpath("//*[@class='Reminders-table row']//*[text()='Delete']"))
    actions.jsClick(del,"delete button")
    },
    VerifyRowCount:function(){
      Medium_Wait()
      Medium_Wait()
    let  toggleBtn=element.all(by.xpath('//*[@class="Reminders-table row"]//*[@class="d-inline-block pr-2 pr-md-4 btn btn-secondary"]'))
    toggleBtn.count().then(countAfter=>{
          actions.expectNotToEqual(countBefore,countAfter,"Row count")
    })
    }
   }
  
