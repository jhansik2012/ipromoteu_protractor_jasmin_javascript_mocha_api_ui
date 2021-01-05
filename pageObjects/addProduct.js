
// *************************************************
/*global document, window, alert, console, require, browser,jasmine,
 requirePage, requireData, requireConfig, requireLibrary,
 describe, it, beforeEach, forEach, by, includes, expect, titlePromise, includes , element, $, then, $locatorRepeater, calenderInputData*/
/*
 */
'use strict';

const { element, by } = require("protractor");

//**************************** Required web data*************************************//
requireLibrary('Locator');
var Random = require("random-js"),
  random = new Random(Random.engines.mt19937().autoSeed()),
  genericData = requireData('genericData'),
  //***************************** Page Objects *************************************//
  //addProduct 
  addProduct = element(by.xpath("//*[@class='tab-pane active']//button[text()='Add product']")),
  addProductButton = element(by.xpath("//button[text()='Add product']")),
  addTitleButton = element(by.xpath("//button[text()='ADD TITLE']")),
  addChargesButton = element(by.xpath("//button[text()='Add charges']")),
  popupAddChargesButton = element(by.xpath("//button[text()=' ADD CHARGES']")),

  addChargesCode = element(by.id("code")),
  addChargesDesc = element(by.id("description")),
  addChargesQty = element(by.xpath("//th[1][text()='QTY']/../../following-sibling::tbody//td[1]//input")),
  addChargesCost = element(by.xpath("//th[2][text()='COST']/../../following-sibling::tbody//td[2]//input")),
  addChargesPrice = element(by.xpath("//th[3][text()='PRICE']/../../following-sibling::tbody//td[3]//input")),
  addChargesMargin = element(by.xpath("//th[4][text()='MARGIN']/../../following-sibling::tbody//td[4]//input")),

  closeSubwayPopup = element(by.css('[class="close"]')),
  acceptPopup = element(by.xpath("//button[text()='YES']")),
  rejectPopup = element(by.xpath("//button[text()='NO']")),
  clearSymbol = element(by.xpath("//i[text()='clear']/parent::button")),
  convertToQuote = element(by.xpath('//button[text()="CONVERT TO QUOTE"]')),
  previewButton = element(by.xpath('//button[text()="PREVIEW"]')),
  exitPreviewPage = element(by.css('[class="modal-title"] p')),
  defaultTemplateDropdown = element(by.xpath("//*[text()='arrow_drop_down']")),
  title = element(by.css('[placeholder="Title"]')),
  rightSymbol = element(by.xpath("//i[text()='done']")),
  deleteTitle = element(by.xpath("//button[text()='Delete Title']")),
  editTitle = element(by.xpath("//button[text()='Edit Title']")),
  quickSearchBox = element(by.id("input1")),
  chooseSupplierSearchBox = element(by.id("1")),
  itemCodeSearchBox = element(by.id("input2")),
  keywordSearchBox = element(by.id("input3")),
  chooseCategorySearchBox = element(by.id("2")),
  chooseThemeSearchBox = element(by.id("3")),
  searchButton = element(by.id("button1")),
  advancedFiltersIcon = element(by.id("button2")),
  colorSearchBox = element(by.id("input4")),
  itemNameSearchBox = element(by.id("input5")),
  spcSearchBox = element(by.id("input6")),
  priceLowSearchBox = element(by.id("input10")),
  priceHighSearchBox = element(by.id("input11")),
  productionDayseSearchBox = element(by.id("input13")),
  verifiedCheckBox = element(by.xpath("//label[contains(text(),'Verified')]")),
  envFriendlyCheckBox = element(by.xpath("//label[contains(text(),'Env Friendly')]")),
  recyclableCheckBox = element(by.xpath("//label[contains(text(),'Recyclable')]")),
  newProductCheckBox = element(by.xpath("//label[contains(text(),'New Product')]")),
  unionShopCheckBox = element(by.xpath("//label[contains(text(),'Union Shop')]")),
  allAudiencesCheckBox = element(by.xpath("//label[contains(text(),'All Audiences')]")),
  firstProduct = element(by.xpath('(//h2[@class="product-item__name clickable"])[1]')),
  firstProductPriceRange = element.all(by.xpath('//div[@class="product-item__cost product-item__title"]//span[text()="Cost"]/following-sibling::span')).get(0),
  sortDropDown = element(by.xpath("//*[text()='Sort:']/following-sibling::div/div/div")),
  saveTitle = element(by.xpath('')),
  lineItemElipse = element.all(by.xpath('//*[contains(@class,"btn-group-md dropdown")]/a')),
  productsCodeList = element.all(by.xpath("//div[contains(@class, 'table__col')]//div[3]//p")),
  closeButton= element(by.xpath('(//button[@class="close"])[2]'))

// var= element(by.xpath(""))
// var= element(by.css(""))
// var= element(by.id(""))
// var= element(by.linkText(""))
// var= element(by.buttonText(""))
// var= element.all(by.xpath(""))

module.exports = {
  /*Used to save application verification data form dynamic verification*/
  specData: {},
  clickOnAddProductButton: function () {
    actions.jsClick(addProduct, "addProduct")
  },

  verifyAddProductButton: function () {
    actions.verifyElementDisplayed(addProductButton, true, "addProduct button")
    actions.jsClick(addProductButton, "addProduct")
    actions.jsClick(closeSubwayPopup, "closeSubwayPopup")
    actions.jsClick(acceptPopup, "acceptPopup")
  },

  clickAddProductButton: function () {
    actions.jsClick(addProductButton, "addProduct")
  },
  clickCloseButton: function () {
    actions.jsClick(closeButton, "Close")
  },
  verifyAddChargesButton: function () {
    actions.verifyElementDisplayed(addChargesButton, true, "add Charges button")
  },

  clickOnAddChargesButton: function () {
    actions.Click(addChargesButton, "add Charges button")
  },

  clickOnPopupAddChargesButton: function () {
    actions.Click(popupAddChargesButton, "add Charges button")
  },

  enterAddChargesCode: function (code) {
    actions.blurText(addChargesCode, code, 'Add Charges Code')
  },

  enterAddChargesDesc: function (desc) {
    actions.blurText(addChargesDesc, desc, 'Add Charges Description')
  },

  enterAddChargesQty: function (qty) {
    actions.blurText(addChargesQty, qty, 'Add Charges Quantity')
  },

  enterAddChargesCost: function (cost) {
    actions.blurText(addChargesCost, cost, 'Add Charges Cost')
  },

  enterAddChargesPrice: function (price) {
    actions.blurText(addChargesPrice, price, 'Add Charges Price')
  },

  verifyAddChargesMargin: function (expMargin) {
    addChargesMargin.getAttribute('value').then(function (margin) {
      actions.expectToEqual(margin, expMargin, 'Profit Margin')
    })
  },

  verifyAddTitleButton: function () {
    actions.verifyElementDisplayed(addTitleButton, true, "addTitle button")
  },

  clickOnAddTitle: function () {
    actions.Click(addTitleButton, "add Title Button")
    Short_Wait()
    //   actions.jsClick(clearSymbol, "add Title Button")
  },

  enterTitleName: function (titleName) {
    actions.blurText(title, titleName, "add Title")
  },

  verifyTitleNamePresent: function (titleName) {
    Long_Wait()
    var title = element.all(by.xpath("(//input[@placeholder='Title'])[1]"))
    title.getAttribute('value').then(function (ttl) {
      actions.expectToEqual(ttl.toString(), titleName, 'Title Name')
      expect(ttl.toString()).toEqual(titleName)
    })
  },

  verifyTitleNameNotPresent: function (titleName) {
    var titles = element.all(by.css('[placeholder="Title"]')),
      titlesCount = element.all(by.css('[placeholder="Title"]')).count(),
      count = 0;
    for (var i = 0; i < titlesCount; i++) {
      titles.get(i).getAttribute('value').then(function (ttl) {
        if (ttl = titleName) {
          count++
          break
        }
      })
    }
    if (count == 0) {
      expect(true).toEqual(true)
      reporter.appendTest('Validate Title Name', 'Validated Title Name is not present : ' + titleName, "PASS")
    }
    else {
      expect(false).toEqual(true)
      reporter.appendTest('Validate Title Name', 'Validated Title Name is present : ' + titleName, "FAIL")
    }
  },

  verifyConvertToQuoteButton: function () {
    actions.verifyElementDisplayed(convertToQuote, true, "convertToQuote button")
    actions.jsClick(convertToQuote, "convertToQuote")
    actions.jsClick(closeSubwayPopup, "closeSubwayPopup")
    actions.jsClick(acceptPopup, "acceptPopup")
  },
  verifyPreviewButton: function () {
    actions.verifyElementDisplayed(previewButton, true, "preview button")
  },

  clickOnPreviewButton: function () {
    actions.jsClick(previewButton, "previewButton")
  },

  verifyDefaultTemplateDropdown: function () {
    actions.verifyElementDisplayed(defaultTemplateDropdown, true, "defaultTemplateDropdown")
  },
  verifyTableColumns: function (col) {
    var tableColumn = element(by.xpath('//div[text()="' + col + '"]'))
    actions.verifyElementDisplayed(tableColumn, true, col)
  },

  clickOnRightSymbol: function () {
    Short_Wait()
    actions.jsClick(rightSymbol, "right Symbol")
    Short_Wait()
  },

  clickOnElipse: function () {
    var firstElipse = lineItemElipse.get(0)
    actions.Click(firstElipse, "firstElipse")
  },

  verifyElipseIsDisplayed: function () {
    var firstElipse = lineItemElipse.get(0)
    actions.verifyElementDisplayed(firstElipse, true, "firstElipse")
  },

  verifyElipseIsNotDisplayed: function () {
    var elipseCount = lineItemElipse.count()
    if (elipseCount === 0) {
      expect(true).toEqual(true)
      reporter.appendTest('Elipse Icon', 'Elipse Icon is not displayed', 'PASS')
    }
    else {
      expect(false).toEqual(true)
      reporter.appendTest('Elipse Icon', 'Elipse Icon is displayed', 'FAIL')
    }
  },

  clickOnDeleteTitle: function () {
    actions.jsClick(deleteTitle, "deleteTitle")
  },

  clickOnRejectPopup: function () {
    actions.jsClick(rejectPopup, "rejectPopup")
  },

  clickOnAcceptPopup: function () {
    actions.jsClick(acceptPopup, "acceptPopup")
  },
  clickOnEditTitle: function () {
    Short_Wait()
    actions.jsClick(editTitle, "editTitle")
    Short_Wait()
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifySupplierSearchBox: function () {
    actions.verifyElementDisplayed(chooseSupplierSearchBox, true, "Supplier Search box")
  },

  verifyItemCodeSearchBox: function () {
    actions.verifyElementDisplayed(itemCodeSearchBox, true, "Item Code Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },

  verifyQuickSearchBox: function () {
    actions.verifyElementDisplayed(quickSearchBox, true, "Quick Search box")
  },
  searchWithColorSageProducts: function (Color) {
    Medium_Wait()
    var serachTextBox = element(by.css('[placeholder="Color"]'))
    actions.blurText(serachTextBox, Color, "Color")
    // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
    // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
    // actions.jsClick(serachProduct, "Search product");
    Medium_Wait()
  },
  searchWithItemNameSageProducts: function (Itemname) {
    Medium_Wait()
    var serachTextBox = element(by.css('[placeholder="Item Name"]'))
    actions.blurText(serachTextBox, Itemname, "Item Name")
    // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
    // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
    // actions.jsClick(serachProduct, "Search product");
    Medium_Wait()
  },
  searchWithSPCSageProducts: function (SPC) {
    Medium_Wait()
    var serachTextBox = element(by.css('[placeholder="SPC"]'))
    actions.blurText(serachTextBox, SPC, "SPC")
    // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
    // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
    // actions.jsClick(serachProduct, "Search product");
    Medium_Wait()
  },
  searchWithPriceRangeProducts: function (lowPrice, HighPrice) {
    Medium_Wait()
    var serachTextBoxLow = element(by.css('[placeholder="Price Low"]')),
      serachTextBoxHigh = element(by.css('[placeholder="Price High"]'))
    actions.blurText(serachTextBoxLow, lowPrice, lowPrice)
    actions.blurText(serachTextBoxHigh, HighPrice, HighPrice)
    // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
    // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
    // actions.jsClick(serachProduct, "Search product");
    Medium_Wait()
  },
  clickOnAdvanceSeacrhButton: function () {
    actions.jsClick(advancedFiltersIcon, "Advanced Filter");
  },
  selectFirstProduct: function () {
    Medium_Wait()
    actions.jsClick(firstProduct, "first Product");
  },
  verifyGivenKeyword: function (Where, What) {
    Medium_Wait()
    element(by.xpath("//p[text()='" + Where + "']/following-sibling::p")).getText(text => {
      console.log("Inside checkpoint")
      What = String(What).toLowerCase();
      text = String(text).toLowerCase();
      actions.expectToContain(text, What, What)
    })
  },
  verifyColor: function (color) {
    var colorTag = element(by.xpath('//*[text()="Colors"]/following-sibling::p[contains(text(),"' + color + '")]'))
    Medium_Wait()
    actions.VerifyElementPresent(colorTag, true, color)
  },
  verifyGivenSPC: async (SPC) => {
    Medium_Wait()
    var text = await element(by.xpath("//span[text()='SPC: ']/following-sibling::span")).getText()
    SPC = String(SPC).toLowerCase();
    text = String(text).toLowerCase();
    actions.expectToContain(text, SPC, "SPC: " + SPC)
  },
  selectLowPriceRange: function (lowPrice) {
    Medium_Wait()
    var serachTextBoxLow = element(by.xpath("//label[text()='Price Low']/following-sibling::div//input"))
    actions.blurText(serachTextBoxLow, lowPrice, lowPrice)
    // var serachProduct = element(by.xpath("//form[@class='search-product-form']//button[contains(text(),'SEARCH')]"))
    // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
    // actions.jsClick(serachProduct, "Search product");
    Medium_Wait()
  },
  selectHighPriceRange: function (HighPrice) {
    Medium_Wait()
    var serachTextBoxHigh = element(by.xpath("//label[text()='Price High']/following-sibling::div//input"))
    actions.blurText(serachTextBoxHigh, HighPrice, HighPrice)
    // var serachProduct = element(by.buttonText("SEARCH"))
    // actions.VerifyElementPresent(serachProduct, true, "serachTextBox")
    // actions.jsClick(serachProduct, "Search product");
    Medium_Wait()
  },
  verifyGivenPriceLowRange: async (Low) => {
   Long_Wait()
    element.all(by.xpath('//div[@class="product-item__cost product-item__title"]//span[text()="Cost"]/following-sibling::span')).then(priceArray=>{
      priceArray[0].getText().then( async price=>{
         price =await price.split('-')[0].trim();
          price =await price.split('$')[1];
          if (price >= Low) 
             reporter.appendTest("Price range", 'Verifying if "' + price + '" is greater than or equal to"' + Low + '"', "PASS");
           else {
              reporter.appendTest("Price range", 'Verifying if "' + price + '" is greater than or equal to"' + Low + '"', "FAIL");
              expect(false).toReport(true, "Expecting " + price + " is greater than or eqaul to" + Low + " failed.");
             }
        })
    })
    // var firtpricerange = await element.all(by.xpath('//div[@class="product-item__cost product-item__title"]//span[text()="Cost"]/following-sibling::span')).get(0)
    // Short_Wait();
    // var price = await firtpricerange.getText()
    // price = price.split('-')[0].trim();
    // price = price.split('$')[1]
    // Short_Wait();
    // if (price >= Low) {
    //   reporter.appendTest("Price range", 'Verifying if "' + price + '" is greater than or equal to"' + Low + '"', "PASS");
    // } else {
    //   reporter.appendTest("Price range", 'Verifying if "' + price + '" is greater than or equal to"' + Low + '"', "FAIL");
    //   expect(false).toReport(true, "Expecting " + price + " is greater than or eqaul to" + Low + " failed.");
    // }
  },
verifyGivenPriceHighRange: async (High) => {
 Long_Wait()
  element.all(by.xpath('//div[@class="product-item__cost product-item__title"]//span[text()="Cost"]/following-sibling::span')).then(priceArray=>{
    priceArray[0].getText().then(async price=>{
      price =await price.split('-')[1].trim();
        if (price <= High) 
          reporter.appendTest("Price range", 'Verifying if "' + price + '" is less than or equal to"' + High + '"', "PASS");
         else {
          reporter.appendTest("Price range", 'Verifying if "' + price + '" is less than or equal to"' + High + '"', "FAIL");
          expect(false).toReport(true, "Expecting " + price + " is less than or eqaul to " + High + " failed.");
        }
     })
   })
    // Long_Wait()
    // let elem = await element.all(by.xpath('//div[@class="product-item__cost product-item__title"]//span[text()="Cost"]/following-sibling::span')).get(0)
    // Short_Wait();
    // var price = await elem.getText()
    // price = price.split('-')[1].trim()
    // price = price.split('$')[1]
    // Short_Wait();
    // if (price <= High) {
    //   reporter.appendTest("Price range", 'Verifying if "' + price + '" is less than or equal to"' + High + '"', "PASS");
    // } else {
    //   reporter.appendTest("Price range", 'Verifying if "' + price + '" is less than or equal to"' + High + '"', "FAIL");
    //   expect(false).toReport(true, "Expecting " + price + " is less than or eqaul to " + High + " failed.");
    // }
   // 
  },
  verifyItemNameinTitle: async (ItemName) => {
    var ele = await element.all(by.css('[class="product-item__name clickable"]')).get(0)
    Short_Wait();
    let title = await ele.getText()
    Short_Wait();
    ItemName = String(ItemName).toLowerCase();
    title = String(title).toLowerCase();
    actions.expectToContain(title, ItemName, "Verifyng " + ItemName + " in " + title)

  },
  verifyAllItemNameinTitle: async (ItemName) => {
    element.all(by.css('[class="product-item__name clickable"]')).map(function(elm) {
       return elm.getText();   
    }).then(function(titles) {
       titles.forEach(title=>{
        ItemName = String(ItemName).toLowerCase();
        title = String(title).toLowerCase();
        actions.expectToContainCustom(title, ItemName, "Title", "Displayed item title", "keyword searched")
       });
    });
  },
  verifyLineItemNameinTitle: async (ItemName) => {
    element(by.xpath('(//h2[@class="product-item__name clickable"])[1]')).getText().then(title=>{
      console.log("Log:::LineItem name:1")
       console.log("Log:::LineItem name:2")
        ItemName = String(ItemName).toLowerCase();
         title = String(title).toLowerCase();
          console.log("Log:::LineItem name:3")
          actions.expectToContainCustom(title, ItemName, "Title", "Displayed item title", "keyword searched")
    });
  },
  verifyAllItemSupplier: async (expectedSupplier) => {
   expectedSupplier = expectedSupplier.toLowerCase();
   let i=0;
    element.all(by.xpath('//div[@class="col"]/strong[2]')).then(function(suppliers) {
      console.log("Log->0")
      suppliers.forEach(suppElement=>{
        console.log("Log->"+i)
        suppElement.getText().then(supplier=>{
          i++;
          supplier = supplier.toLowerCase();
          console.log("Log:::Supplier name:3"+supplier)
          actions.expectToContainCustom(supplier, expectedSupplier , "Supplier", "Displayed item supplier", "Supplier name searched")
        })
      })
    })
  },
  verifyAllItemItemCode: async (expectedItemCode) => {
    element.all(by.xpath('//div[@class="col"]/strong[1]')).map(function(elm) {
       return elm.getText();   
    }).then(function(itemCodes) {
       itemCodes.forEach(itemCode=>{
        expectedItemCode = String(expectedItemCode).toLowerCase();
        itemCode = String(itemCode).toLowerCase();
        actions.expectToContainCustom(itemCode, expectedItemCode, "ItemCode", "Displayed product item code", "Item code searched")
       });
    });
  },
  clickOnVerifiedFilter: function () {
    actions.jsClick(verifiedCheckBox, "verified checkBox");
  },
  verifyVerifiedTag: function () {
    var veifiedTag = element(by.xpath('//*[@class="select-products-wrap"]//*[contains(text(),"Verified")]'))
    actions.VerifyElementPresent(veifiedTag, true, "veified")
  },
  clickOnenvFriendlyCheckBox: function () {
    actions.jsClick(envFriendlyCheckBox, "Env Friendly checkBox");
  },
  verifyEnvFriendlyTag: async () => {
    Medium_Wait()
    var EnvFriendlyTag = element(by.xpath('//*[text()="Additional Information"]/following-sibling::p')).getText()
    actions.expectToContain(EnvFriendlyTag, "Environmentally Friendly", "Environmentally Friendly")
  },
  clickOnRecyclable: function () {
    Medium_Wait()
    actions.jsClick(recyclableCheckBox, "recyclable checkBox");
  },
  verifyRecyclableTag: async () => {
    Medium_Wait()
    var recycleTag = element(by.xpath('//p[contains(.,"recycle")]'))
    actions.VerifyElementPresent(recycleTag, true, "Recyclable")
  },
  clickOnNewProduct: function () {
    actions.jsClick(newProductCheckBox, "New Product checkBox");
  },

  clickOnSearchButton: function () {
    var serachProduct = element(by.buttonText("SEARCH"))
    actions.jsClick(serachProduct, "Search product");
    Medium_Wait()
  },
  clickOnunionShopCheckBox: function () {
    actions.jsClick(unionShopCheckBox, "Union Shop checkBox");
  },
  clickOnAllAudiencesCheckBox: function () {
    actions.jsClick(allAudiencesCheckBox, "All Audiences checkBox");
  },
  enterProductionDays: function (productionDays) {
    actions.blurText(productionDayseSearchBox, productionDays, "Production Days: " + productionDays)
  },
  verifyProductionDays: async (givenProdDays) => {
    Medium_Wait()
    var prodDays = await element(by.xpath("//*[text()='Production Time']/following-sibling::*")).getText()
    prodDays = (prodDays.trim()).split(' ')[2]
    if (prodDays <= givenProdDays) {
      reporter.appendTest("Production Days range", 'Verifying if "' + prodDays + '" is less than or eual to"' + givenProdDays + '"', "PASS");
    } else {
      reporter.appendTest("Production Days range", 'Verifying if "' + prodDays + '" is less than or eual to"' + givenProdDays + '"', "FAIL");
      expect(false).toReport(true, "Expecting " + prodDays + " is less than or eqaul to" + givenProdDays + " failed.");
    }
  },
  clickOSortDropDown: function () {
    actions.Click(sortDropDown, "Sort DropDown");
  },
  selectPriceLowToHigh: async () => {
    var option = await element(by.xpath('//*[.="Price sorting in lowest to highest order"]'))
    actions.jsClick(option, "Price sorting in lowest to highest order");
    Medium_Wait()
  },
  selectPriceHighToLow: async () => {
    var option = await element(by.xpath('//*[.="Price sorting in highest to lowest order"]'))
    actions.jsClick(option, "Price sorting in highest to lowest order");
    Medium_Wait()
  },
  selectBestMatchBasedOnCriteria: async () => {
    var option = await element(by.xpath('//*[.="Sort by the best match based on the criteria"]'))
    actions.jsClick(option, "Sort by the best match based on the criteria");
  },
  selectPopularity: async () => {
    var option = await element(by.xpath('//*[.="Sort the items in terms of popularity, with most popular first"]'))
    actions.jsClick(option, "Sort the items in terms of popularity, with most popular first");
  },
  selectPreferenceGroup: async () => {
    var option = await element(by.xpath('//*[.="Sort by preference groups"]'))
    actions.jsClick(option, "Sort by preference groups");
  },
  verifySortPriceLowtoHigh: async () => {
    browser.sleep(20000)
    let elem1 = await element.all(by.xpath('//div[@class="product-item__cost product-item__title"]//span[text()="Cost"]/following-sibling::span')).get(0),
      elem2 = await element.all(by.xpath('//div[@class="product-item__cost product-item__title"]//span[text()="Cost"]/following-sibling::span')).get(1)
    Short_Wait();
    var priceOfFirstProduct = await elem1.getText(),
      priceOfSecondProduct = await elem2.getText()
    priceOfFirstProduct = Number((priceOfFirstProduct.split('-')[0].trim()).split('$')[1])
    priceOfSecondProduct = Number((priceOfSecondProduct.split('-')[0].trim()).split('$')[1])
    if (priceOfFirstProduct <= priceOfSecondProduct) {
      reporter.appendTest("Price Order", 'Verifying if "' + priceOfFirstProduct + '" is less than or equal to"' + priceOfSecondProduct + '"', "PASS");
    } else {
      reporter.appendTest("Price Order", 'Verifying if "' + priceOfFirstProduct + '" is less than or equal to"' + priceOfSecondProduct + '"', "FAIL");
      expect(false).toReport(true, "Expecting " + priceOfFirstProduct + " is less than or eqaul to" + priceOfSecondProduct + " failed.");
    }
  },

  verifySortPriceHightoLow: async () => {
    browser.sleep(20000)
    let elem1 = await element.all(by.xpath('//div[@class="product-item__cost product-item__title"]//span[text()="Cost"]/following-sibling::span')).get(0),
      elem2 = await element.all(by.xpath('//div[@class="product-item__cost product-item__title"]//span[text()="Cost"]/following-sibling::span')).get(1)
    Short_Wait();
    var priceOfFirstProduct = await elem1.getText(),
      priceOfSecondProduct = await elem2.getText()
    priceOfFirstProduct = Number((priceOfFirstProduct.split('-')[0].trim()).split('$')[1])
    priceOfSecondProduct = Number((priceOfSecondProduct.split('-')[0].trim()).split('$')[1])
    Short_Wait()
    if (priceOfFirstProduct >= priceOfSecondProduct) {
      reporter.appendTest("Price Order", 'Verifying if "' + priceOfFirstProduct + '" is Greater than or equal to"' + priceOfSecondProduct + '"', "PASS");
    } else {
      reporter.appendTest("Price Order", 'Verifying if "' + priceOfFirstProduct + '" is Greater than or equal to"' + priceOfSecondProduct + '"', "FAIL");
      expect(false).toReport(true, "Expecting " + priceOfFirstProduct + " is Greater than or eqaul to" + priceOfSecondProduct + " failed.");
    }
  },

  getProductsCount: (logName) => {
    Long_Wait()
    global.cnt = 0
    element.all(by.xpath("//div[contains(@class, 'table__col')]//div[3]//p")).count().then(function (size) {
      cnt = size
      console.log(typeof cnt + "---------cnt------:" + cnt)
    })
  },

  validateProductsCount: function () {
    element.all(by.xpath("//div[contains(@class, 'table__col')]//div[3]//p")).count().then(function (size) {
      actions.expectToEqual(size, cnt, 'Products Count')
    })
  },

  verifyAddedCodesFromList: (code) => {
    Long_Wait()
    productsCodeList = element.all(by.xpath("//div[contains(@class, 'table__col')]//div[3]//p"))
    element.all(by.xpath("//div[contains(@class, 'table__col')]//div[3]//p")).count().then(async size => {
      if (size > 0) {
        var lastIndex = size - 1,
          actualCode = await productsCodeList.get(lastIndex).getText()
        actualCode = actualCode.toString()
        console.log("actualCode------:" + actualCode)
        console.log("code------:" + code)
        actions.expectToEqual(actualCode, code, 'Charges Code')
      } else
        reporter.appendTest('Charges Code', 'Charges Codes are not present', 'PASS')
    })
  },
  verifyAddedCodeFromList: (code) => {
   Short_Wait()
    productsCodeList = element(by.xpath("//div[contains(@class, 'table__col')]//div[3]//p")).get
     actions.GetTextAndCompareToBeEqual(productsCodeList,code,"Code", "Displayed code of the charge line item", "Entered code while adding the charge")
  }
}  