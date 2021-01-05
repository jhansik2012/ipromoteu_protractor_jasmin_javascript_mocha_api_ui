/*global document, window, alert, console, require, browser,jasmine,
 describe, it, beforeEach, forEach, by, expect, driver, element, protractor, $element, $elements,
 requireUtils, elements, elementang*/
/*jshint node: true */
/* global protractor, requireLibrary, Key*/
/**
 * Action library
 */
'use strict';

const { browser } = require("protractor");

var fs = require("fs"),
    glob = require("glob"),
    Base64 = require("Base64"),
    reporter = requireLibrary('reporter'),
    SelectWrapper = function (elem) {
        this.webElement = elem;
    };

beforeEach(function () {
    jasmine.addMatchers({
        toReport: function () {
            return {
                compare: function (actual, expected, msg) {
                    var result = {
                        pass: actual == expected
                    };
                    result.message = msg;
                    return result;
                }
            };
        }
    });
});

SelectWrapper.prototype.getOptions = function () {
    return this.webElement.all(by.tagName('option'));
};
SelectWrapper.prototype.getSelectedOptions = function () {
    return this.webElement.all(by.css('option[selected="selected"]'));
};
SelectWrapper.prototype.selectByValue = function (value) {
    return this.webElement.all(by.css('option[value="' + value + '"]')).click();
};
SelectWrapper.prototype.selectByPartialText = function (text) {
    return this.webElement.all(by.cssContainingText('option', text)).click();
};
SelectWrapper.prototype.selectByText = function (text) {
    return this.webElement.all(by.xpath('option[.="' + text + '"]')).click();
};
SelectWrapper.prototype.selectBySequence = function (optionNum) {
    return this.webElement.all(by.css('option')).get(optionNum).click();
};

module.exports = {

    SetText: function (element, text, logname) {
        Short_Wait();
        element.clear();
        Short_Wait()
        element.sendKeys(text);
        global.reporter.appendTest('Set Value', logname, "PASS")
    },

    Get: function (url) {
        browser.get(url);
        reporter.appendTest('Open URL', 'Opened URL:' + url, "PASS");
    },

    AssertText: function (elem, expectedText, logname) {
        this.expectedText = expectedText.trim();

        elem.getText().then(function (text) {
            reporter.appendTest('actual value', '  : ' + text, 'PASS')
            if (text.trim() == expectedText.trim()) {
                reporter.appendTest('Assert Text', 'Expected Text is "' + expectedText.trim().replace(/\r/g, "").replace(/\n/g, "") + '" Displayed Text is "' + text.trim().replace(/\r/g, "").replace(/\n/g, "") + '"', "PASS");
                expect(true).toReport(true, 'Expected Text is ' + expectedText.trim() + ' Displayed Text is ' + text.trim());
            } else {
                reporter.appendTest('Assert Text', 'Expected Text is "' + expectedText.trim().replace(/\r/g, "").replace(/\n/g, "") + '" Displayed Text is "' + text.trim().replace(/\r/g, "").replace(/\n/g, "") + '"', "FAIL");
                expect(false).toReport(true, 'Expected Text is ' + expectedText.trim() + ' Displayed Text is ' + text.trim());
            }
        }, function (err) {
            reporter.appendTest('Assert Text', 'Performing Assert Text: ' + logname, "FAIL");
            expect(false).toReport(true, "Unable to perform AssertText operation because of " + err.message);
        });
    },

    AssertTextContains: function (elem, expectedText, logname) {
        this.expectedText = expectedText.trim();

        elem.getText().then(function (text) {
            reporter.appendTest('actual value', '  : ' + text, 'PASS')
            if ((text.trim()).includes(expectedText.trim())) {
                reporter.appendTest('Assert Text contains', 'Expected Text is "' + expectedText.trim().replace(/\r/g, "").replace(/\n/g, "") + '" Displayed Text is "' + text.trim().replace(/\r/g, "").replace(/\n/g, "") + '"', "PASS");
                expect(true).toReport(true, 'Expected Text is ' + expectedText.trim() + ' Displayed Text is ' + text.trim());
            } else {
                reporter.appendTest('Assert Text', 'Expected Text is "' + expectedText.trim().replace(/\r/g, "").replace(/\n/g, "") + '" Displayed Text is "' + text.trim().replace(/\r/g, "").replace(/\n/g, "") + '"', "FAIL");
                expect(false).toReport(true, 'Expected Text is ' + expectedText.trim() + ' Displayed Text is ' + text.trim());
            }
        }, function (err) {
            reporter.appendTest('Assert Text', 'Performing Assert Text: ' + logname, "FAIL");
            expect(false).toReport(true, "Unable to perform AssertText operation because of " + err.message);
        });
    },

    Click: function (elem, logname) {
        Short_Wait();
        // this.waitUntilElementPresent_OffShore(elem, logname, 10000) //timeOut Exception handled in this mfunction
        elem.click();
        reporter.appendTest('Performed Click', 'Performed click on "' + logname + '" ', "PASS");
    },
    //Use the function: waitUntilElementPresent_OffShore instead where exception handled.
    waitForElementPresent: function (elem) {
        var until = protractor.ExpectedConditions;
        if (browser.wait(until.presenceOf(elem), 6000, 'Element taking too long to appear in the DOM')) {

        } else {
            reporter.appendTest('Wait for element is display', 'Element not getting display within 6000 mill sec: ' + elem, "FAIL");
        }
    },
    //--------------------------------------------------------------------------------------------
    ScrollDown: function () {
        browser.executeScript('window.scrollTo(0,1000);').then(function () {
            reporter.appendTest('Scrolling Down in the Page', 'Scrolling Down', "PASS");
        });

    },

    ScrollUp: function () {
        browser.executeScript('window.scrollTo(0,0);').then(function () {
            reporter.appendTest('Scrolling Up in the Page', 'Scrolling Up', "PASS");
        });

    },

    ScrollIntoViewElement: function (element) {
        browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement()).then(function () {
            reporter.appendTest('Scrolling into particulat webElement in the Page', 'Scrolling to webElement', "PASS");
        });
    },

    MouseMoveAndClick: function (locator) {
        browser.actions().mouseMove(locator).click().perform().then(function () {
            return defer.promise;
        });
    },

    MouseHover: function (element, logname) {
        browser.actions().mouseMove(element).perform().then(function () {
            reporter.appendTest('Mouse Hover', 'Mouse hover on ' + logname, "PASS");
        }, function (err) {
            reporter.appendTest('Mouse Hover', 'Mouse hover on ' + logname, "FAIL");
            expect(false).toReport(true, "Unable to perform mouse hover operation on '" + logname + "' because of " + err.message);
        });
        //   return defer.promise;
    },

    PressEnter: function () {
        /*element.sendKeys(browser.Key.ENTER);
         return defer.promise;*/
        var enter = browser.actions().sendKeys(protractor.Key.ENTER);
        enter.perform();
    },

    PressDownArrow: function () {
        /*element.sendKeys(browser.Key.ENTER);
         return defer.promise;*/
        var enter = browser.actions().sendKeys(protractor.Key.ARROW_DOWN);
        enter.perform();
    },

    PressUpArrow: function () {
        var enter = browser.actions().sendKeys(protractor.Key.ARROW_UP);
        enter.perform();
    },

    waitForElement: function (element) {
        browser.manage().timeouts().implicitlyWait(0);
        browser.wait(function () {
            browser.sleep(200);
            return element.isDisplayed()
                .then(
                    function (isDisplayed) {
                        return isDisplayed;
                    },
                    function (error) {
                        return false
                    });
        }, 20 * 1000);

    },



    EnterText: function (elem, value, logname) {
        // this.Clear(elem, logname)
      Medium_Wait()
        browser.executeScript("arguments[0].scrollIntoView();", elem.getWebElement()).then(function () {
            elem.sendKeys(value).then(function () {
                reporter.appendTest('Entering Value', 'Entered "' + value + '" in the Field ' + logname, "PASS");
            }, function (err) {
                reporter.appendTest('Entering Value', 'Entered "' + value + '" in the Field ' + logname, "FAIL");
                expect(false).toReport(true, "Unable to perform SetText operation on '" + logname + "' because of " + err.message);
            });
        });
    },

    updateText: function (elem, value, logname) {
        browser.executeScript("arguments[0].scrollIntoView();", elem.getWebElement()).then(function () {
            elem.click().sendKeys(value).then(function () {
                reporter.appendTest('Appending Value', 'Appended ' + value + ' in the Input Field ' + logname, "PASS");
            }, function (err) {
                reporter.appendTest('Appending Value', 'Appended ' + value + ' in the Input Field ' + logname, "FAIL");
                expect(false).toReport(true, "Unable to perform updateText operation on '" + logname + "' because of " + err.message);
            });
        });
    },

    blurText: function (elem, valueToEnter, logname) {
        var self = this;
         browser.executeScript("return arguments[0].value", elem.getWebElement()).then(function (value) {
            var text = '';
            for (var iterator = 0; iterator < value.length; iterator++) {
                text += protractor.Key.BACK_SPACE;
            }
            text += valueToEnter;
            elem.sendKeys(text).then(function () {
                reporter.appendTest('Entering Value in ' + logname, 'Entered "' + valueToEnter + '" in "' + logname + '" Field', "PASS");
            }, function (err) {
                reporter.appendTest('Entering Value', 'Entering "' + valueToEnter + '" in "' + logname + '" Field', "FAIL");
                expect(false).toReport(true, "Unable to perform SetText operation on '" + logname + "' because of " + err.message);
            });
        });
    },

    jsSetText: function (elem, value, logname) {
        browser.executeScript("arguments[0].value = arguments[1]; ", elem, value).then(function () {
            global.reporter.appendTest('Changed Value', logname, "PASS")
        })

    },

    ClearText: function (elem, logname) {
        this.ScrollIntoViewElement(elem)
        browser.actions().sendKeys(protractor.Key.DELETE).perform();
    },

    Clear: function (elem, logname) {
        this.ScrollIntoViewElement(elem)
        elem.clear().then(function () {
            reporter.appendTest('Clearing Text', 'Cleared log' + logname, "PASS");
        }, function (err) {
            reporter.appendTest('Clearing Text', 'Cleared log' + logname + 'Error: ' + err.message, "FAIL");
            expect(false).toReport(true, "Unable to perform Clear operation on '" + logname + "' because of " + err.message);
        });
    },
    GetText: function (elem, logname, callback) {
        try {
            elem.getText().then(function (text) {
                reporter.appendTest('Get Text', logname + ' field text : ' + text, "PASS");
                if (callback)
                    callback(text);
            }, function (err) {
                reporter.appendTest('Get Text', 'Unable to perform GetText operation on : ' + logname, "FAIL");
                expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
            });
        } catch (error) {
            reporter.appendTest('Error', error, "FAIL");
        }
    },

    GetElementColor: function (elem, logname, callback) {
        elem.getCssValue("color").then(function (color) {
            reporter.appendTest('Get element color', 'Performed Get element color from "' + logname + '" color is: ' + color, "PASS");
            callback(color);
        }, function (err) {
            reporter.appendTest('Get Text', 'Performing Get Text: ' + logname, "FAIL");
            expect(false).toReport(true, "Unable to perform GetElementColor operation because of " + err.message);
        });
    },

    fetchText: function (elem, logname) {
        return elem.getText()
        /*  catch (err) {
             reporter.appendTest('Get Text', 'Performing Get Text: ' + logname, "FAIL");
             expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
         } */
    },

    GetAttribute: function (elem, attributeName, logname, callback) {
        try {
            elem.getAttribute(attributeName).then(function (value) {
                reporter.appendTest('Get Attribute', 'Performed Get Attribute from "' + logname + '" on Attribute:' + attributeName + ' and Attribute Value is: ' + value, "PASS");
                if (callback)
                    callback(value);
            }, function (err) {
                reporter.appendTest('Get Attribute', 'Performing Get Attribute: ' + logname + 'on Attribute:' + attributeName, "FAIL");
                expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
            });
        } catch (error) {
            reporter.appendTest('Error', error, "FAIL");
        }
    },

    selectByText: function (elem, value, logname) {
        var mySelect = new SelectWrapper(elem);
        mySelect.selectByText(value).then(function () {
            reporter.appendTest('Selecting DropDown Value', 'Selecting ' + value + ' from: ' + logname, "PASS");
        }, function (err) {
            reporter.appendTest('Selecting DropDown Value', 'Selecting ' + value + ' from: ' + logname, "FAIL");
            expect(false).toReport(true, "Unable to perform selectByPartialText operation on '" + logname + "' because of " + err.message);
        });
    },

    selectOption: function (elem, value) {
        var selectList, desiredOption;
        selectList = elem;
        selectList.click();
        selectList.all(by.tagName('option'))
            .then(function findMatchingOption(options) {
                options.some(function (option) {
                    option.getText().then(function doesOptionMatch(text) {
                        if (value === text) {
                            desiredOption = option;
                            return true;
                        }
                    });
                });
            })
            .then(function clickOption() {
                if (desiredOption) {
                    desiredOption.click();
                }
            });
    },


    jsClick: function (elem, logname) {
           Short_Wait()
          browser.executeScript("arguments[0].click();", elem.getWebElement()).then(function () {
            reporter.appendTest('Performed Click', 'Performed click on "' + logname + '" ', "PASS");
        }, function (err) {
            reporter.appendTest('Performed Click', 'Performed click on "' + logname + '" ', "FAIL");
            expect(false).toReport(true, "Unable to perform Click operation on '" + logname + "' because of " + err.message);
        });
    },

    pressTab: function (elem) {
        browser.executeScript("arguments[0].scrollIntoView();", elem.getWebElement()).then(function () {
            elem.sendKeys(protractor.Key.TAB).then(function () {
                reporter.appendTest('Entering TAB', 'Entered TAB in the Input Field ', "PASS");
            }, function (err) {
                reporter.appendTest('Entering TAB', 'Entered TAB in the Input Field ', "FAIL");
                expect(false).toReport(true, "Unable to perform TAB operation on because of " + err.message);
            });
        });
    },

    selectByPartialText: function (elem, value, logname) {
        var mySelect = new SelectWrapper(elem);
        mySelect.selectByPartialText(value).then(function () {
            reporter.appendTest('Selecting DropDown Value', 'Selecting option containing ' + value + ' from: ' + logname, "PASS");
        }, function (err) {
            reporter.appendTest('Selecting DropDown Value', 'Selecting option containing ' + value + ' from: ' + logname, "FAIL");
            expect(false).toReport(true, "Unable to perform selectByPartialText operation on '" + logname + "' because of " + err.message);
        });
    },

    selectByNumber: function (elem, value, logname) {
        var mySelect = new SelectWrapper(elem);
        mySelect.selectBySequence(value).then(function () {
            reporter.appendTest('Selecting DropDown Value', 'Selecting option number ' + value + ' from: ' + logname, "PASS");
        }, function (err) {
            reporter.appendTest('Selecting DropDown Value', 'Selecting option number ' + value + ' from: ' + logname, "FAIL");
            expect(false).toReport(true, "Unable to perform selectBySequence operation on '" + logname + "' because of " + err.message);
        });
    },

    // AssertText: function (elem, trimChars, actualText, logname) {
    //     elem.getText().then(function (text) {
    //         if (text.substring(trimChars).trim() == actualText.trim()) {
    //             reporter.appendTest('Assert Text', 'Expected Text is "' + actualText.trim().replace(/\r/g, "").replace(/\n/g, "") + '" Displayed Text is "' + text.substring(trimChars).trim().replace(/\r/g, "").replace(/\n/g, "") + '"', "PASS");
    //             expect(true).toReport(true, 'Expected Text is ' + actualText.trim() + ' Displayed Text is ' + text.trim());
    //         } else {
    //             reporter.appendTest('Assert Text', 'Expected Text is "' + actualText.trim().replace(/\r/g, "").replace(/\n/g, "") + '" Displayed Text is "' + text.substring(trimChars).trim().replace(/\r/g, "").replace(/\n/g, "") + '"', "FAIL");
    //             expect(false).toReport(true, 'Expected Text is ' + actualText.trim() + ' Displayed Text is ' + text.trim());
    //         }
    //     }, function (err) {
    //         reporter.appendTest('Assert Text', 'Performing Assert Text: ' + logname, "FAIL");
    //         expect(false).toReport(true, "Unable to perform AssertText operation because of " + err.message);
    //     });
    // },

    VerifyElementPresent: function (elem, ExpectedResult, logname) {
        Short_Wait()
        elem.isPresent().then(function (status) {
            if (status === ExpectedResult) {
                if (ExpectedResult) {
                    reporter.appendTest('Verifying Element', 'Verified that Element ' + logname + ' is Present', "PASS");
                } else {
                    reporter.appendTest('Verifying Element', 'Verified that Element ' + logname + ' is not Present', "PASS");
                }
            } else {
                reporter.appendTest('Verifying Element', 'Verifying that Element is Present: ' + logname + '- Failed', "FAIL");
                expect(status).toReport(ExpectedResult, "Verifying Element Present FAILED for: " + logname);
            }
        });
    },

    verifyElementDisplayed: function (elem, expectedStatus, logName) {
        Short_Wait()
        elem.isDisplayed().then(function (status) {
            if (status == expectedStatus) {
                reporter.appendTest("Verifying Element", 'Verified that "' + logName + '" is Displayed ', "PASS");
            } else {
                reporter.appendTest("Verifying Element", 'Verified that "' + logName + '" is not Displayed ', "FAIL");
                expect(expectedStatus).toReport(!expectedStatus, "Verifying Element is FAILED for: " + logName);
            }

        });
    },

     verifyElementNotDisplayed: function (elem, expectedStatus, logName) {
       try{ elem.isDisplayed().then(function (status) {
             if (status != expectedStatus) 
                reporter.appendTest("Verifying Element", 'Verified that "' + logName + '" is not Displayed ', "PASS");
               else {
                reporter.appendTest("Verifying Element", 'Verified that "' + logName + '" is Displayed ', "FAIL");
                expect(expectedStatus).toReport(!expectedStatus, "Verifying Element is FAILED for: " + logName);
              }
           });
         } catch(err){ //it throws no such element exception
            reporter.appendTest("Verifying Element", 'Verified that "' + logName + '" is not Displayed ', "PASS");            
         }
    },

    verifyElementsNotDisplayed: function (elem, expectedStatus, logName) {
        Medium_Wait()
        elem.count().then(function (count) {
            if (count < 1) {
                reporter.appendTest('Verifying Element', 'Verify Element is not Displayed: ' + logName, "PASS");
            } else {
                reporter.appendTest('Verifying Element', 'Verifying Element is not Displayed: ' + logName, "FAIL");
                expect(expectedStatus).toReport(!expectedStatus, "Verifying Element is not Displayed FAILED for: " + logName);
            }

        });
    },

    jsVerifyElementDisplayed: function (elem, expectedStatus, logName) {
        Medium_Wait()
        if (expectedStatus) {
            browser.executeScript("arguments[0].scrollIntoView();", elem.getWebElement());
        }
        elem.isDisplayed().then(function (status) {
            if (status == expectedStatus) {
                reporter.appendTest('Verifying Element', 'Verify Element Displayed: ' + logName, "PASS");
            } else {
                reporter.appendTest('Verifying Element', 'Verifying Element Displayed: ' + logName, "FAIL");
                expect(expectedStatus).toReport(!expectedStatus, "Verifying Element Displayed FAILED for: " + logName);
            }
        });
    },

    verifyElementSelected: function (elem, expectedStatus, logName) {
        elem.isSelected().then(function (status) {
            if (status == expectedStatus) {
                reporter.appendTest('Element Selected', 'Verify Element Selected: ' + logName, "PASS");
            } else {
                reporter.appendTest('Element Selected', 'Verifying Element Selected: ' + logName, "FAIL");
                expect(expectedStatus).toReport(!expectedStatus, "Verifying Element Selected FAILED for: " + logName);
            }
        });
    },

    moveMouseOnMenuItem: function (mainMenuLocator, menuName) {
        try {
            var menuItem = browser.element.all(mainMenuLocator).filter(function (items) {
                return items.getText().then(function (text) {
                    return text.indexOf(menuName) === 0;
                });
            }, function (err) {
                reporter.appendTest('Open Main Menu', 'Opening Main Menu: ' + menuName, "FAIL");
            }).first();
            this.Click(menuItem, menuName);

        } catch (err) {
            reporter.appendTest('Open Main Menu', 'Opening Main Menu: ' + menuName, "FAIL");
            expect(false).toReport(true, "Unable to open menu due to error:" + err.message);
        }
    },
    VerifyFieldEnabled: function (elem, expectedStatus, logname) {
        elem.isEnabled().then(function (enabledStatus) {
            elem.isDisplayed().then(function (displayedStatus) {
                if ((enabledStatus == displayedStatus) == expectedStatus) {
                    reporter.appendTest('Verifying is ' + logname + '  Enabled', 'Verified that ' + logname + ' field is <b>Enabled</b>', "PASS");
                } else {
                    reporter.appendTest('Verifying is ' + logname + '  Enabled', 'Verified that ' + logname + ' field is <b>Disabled</b>', "FAIL");
                    expect(expectedStatus).toReport(!expectedStatus, "Verifying if " + logname + " Enabled status is:  " + expectedStatus);
                }
            }, function (err) {
                expect(expectedStatus).toReport(false, "Verifying if " + logname + " Enabled- Failed");
            });
        });
    },

    VerifyFieldDisabled: function (elem, expectedStatus=true, logname) {
        elem.isEnabled().then(function (enabledStatus) {
            if (enabledStatus != expectedStatus) {
                reporter.appendTest('Verifying is ' + logname + '  Disabled', 'Verified that ' + logname + ' field is <b>Disabled</b>', "PASS");
            } else {
                reporter.appendTest('Verifying is ' + logname + '  Enabled', 'Verified that ' + logname + ' field is <b>Enabled</b>', "FAIL");
                expect(true).toReport(false, 'Verifying TextField Enabled-fialed- ' + logname);
            }
        }, function (err) {
            expect(true).toReport(false, "Verifying if " + logname + " is not Enabled status is failed due to  " + err);
        });
    },

    VerifyElementEnabled: function (elem, expectedStatus, logname) {
        elem.isEnabled().then(function (enabledStatus) {

            if (enabledStatus == expectedStatus) {
                reporter.appendTest('Verify Element Enabled:' + expectedStatus, 'Verifying ' + logname + ' , Enabled status is: ' + expectedStatus, "PASS");
            } else {
                reporter.appendTest('Verify Element Enabled:' + expectedStatus, 'Verifying ' + logname + ' , Enabled status is: ' + enabledStatus, "FAIL");
                expect(expectedStatus).toReport(!expectedStatus, "Verifying " + logname + " , Enabled status is:  " + enabledStatus);
            }
        });
        //expect(elem.isEnabled()).toBe(expectedStatus);
    },

    //This will give an random price in pattern of like 2.345
    getRandomPriceValue() {
        return (Math.random() * (9.999 - 1.001) + 1.001).toFixed(3)
        // console.log((Math.round(Math.random()) * 2 - 1) * ((Math.random() * (1.001 - 9.999) + 1.001).toFixed(3))) for getting either positive or negative value
    },

    //This will give an random volume in pattern of like 2.8
    getRandomVolumeValue() {
        return ((Math.random() * (9.999 - 1.001) + 1.001).toFixed(1))
    },

    getNegativeRandomPriceValue() {
        return ((Math.random() * (1.001 - 9.999) + 1.001).toFixed(3))
    },


    expectToEqual: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect to contain');
        if (value1 == value2) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is equal to "' + value2 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is equal to "' + value2 + '"', "FAIL");
            expect(false).toReport(true, 'Expecting "' + logname + '" -->"' + value1 + '" to equal to "' + value2 + '" failed.');
        }
    },
    expectNotToEqual: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect not to equal');
        if (value1 != value2) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is not equal to "' + value2 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is not equal to "' + value2 + '"', "FAIL");
            expect(false).toReport(true, 'Expecting "' + value1 + '" is not equal to "' + value2 + '" failed.');
        }
    },
    expectToContain: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect to contain');
        // if(logname){text = logname}else{text ='Expect to contain' };
        if (value1.indexOf(value2) > -1) {
            reporter.appendTest(text, 'Verifying if "' + value2 + '" is present in "' + value1 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value2 + '" is present in "' + value1 + '"', "FAIL");
            expect(false).toReport(true, "Expecting " + value2 + " is present in " + value1 + " failed.");
        }
    },

    expectNotToContain: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect not to contain');
        // if(logname){text = logname}else{text ='Expect to contain' };
        if (value1.indexOf(value2) < 0) {
            reporter.appendTest(text, 'Verifying if "' + value2 + '" is not present in "' + value1 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value2 + '" is not present in "' + value1 + '"', "FAIL");
            expect(false).toReport(true, "Expecting " + value2 + " is not present in " + value1 + " failed.");
        }
    },
    expectToBeIn: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect to contain');
        // if(logname){text = logname}else{text ='Expect to contain' };
        if (value2.indexOf(value1) > -1) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is present in "' + value2 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is present in "' + value2 + '"', "FAIL");
            expect(false).toReport(true, "Expecting " + value1 + " is present in " + value2 + " failed.");
        }
    },
    expectToBe: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect to be');
        if (value1 === value2) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is exact same to "' + value2 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is exact same to "' + value2 + '"', "FAIL");
            expect(false).toReport(true, 'Expecting "' + value1 + '" to exact same to "' + value2 + '" failed.');
        }
    },
    expectToBeGreaterThan: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect to be greater than');
        if (value1.toUpperCase() > value2.toUpperCase()) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is greater than "' + value2 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is greater than "' + value2 + '"', "FAIL");
            expect(false).toReport(true, "Expecting " + value1 + " is greater than " + value2 + " failed.");
        }
    },
    expectNumberToBeSmallerThan: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect to be greater than');
        if (value1 < value2) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is smaller than "' + value2 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is smaller than "' + value2 + '"', "FAIL");
            expect(false).toReport(true, "Expecting " + value1 + " is smaller than " + value2 + " failed.");
        }
    },



    expectNotToBeGreaterThan: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect not to be greater than');
        if (value1.toUpperCase() <= value2.toUpperCase()) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is not greater than "' + value2 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is not greater than "' + value2 + '"', "FAIL");
            expect(false).toReport(true, "Expecting " + value1 + " is not greater than " + value2 + " failed.");
        }
    },

    expectObjectNotToBePresent: function (elem, logname) {
        element.all(elem).then(function (items) {
            if (items.length == 0) {
                reporter.appendTest('Expecting not to be present', 'Verifying if ' + 'object ' + logname + ' not present', "PASS")
            } else {
                reporter.appendTest('Expecting not to be present', 'Verifying if ' + 'object ' + logname + ' not present', "FAIL");
                expect(false).toReport(true, "Expecting " + logname + " object not present ");
            }

        });
    },

    expectNumberToBeGreaterThan: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect to be greater than');
        if (value1 > value2) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is greater than "' + value2 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is greater than "' + value2 + '"', "FAIL");
            expect(false).toReport(true, "Expecting " + value1 + " is greater than " + value2 + " failed.");
        }
    },
    expectNumberNotToBeGreaterThan: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect not to be greater than');
        if (value1 <= value2) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is not greater than "' + value2 + '"', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is not greater than "' + value2 + '"', "FAIL");
            expect(false).toReport(true, "Expecting " + value1 + " is not greater than " + value2 + " failed.");
        }
    },

    expectValueToContain: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect to be greater than');
        if (value1.indexOf(value2) > -1) {
            reporter.appendTest(text, 'Verifying if "' + value2 + '" is present."', "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value2 + '" is present."', "FAIL");
            expect(false).toReport(true, "Expecting " + value2 + " to be present failed.");
        }
    },
    deleteAlreadyDownloadedFiles: function () {
        var filename = global.downloadsPath + '/error.xml';
        var fs = require('fs');
        if (fs.existsSync(filename)) {
            // delete if there is any existing file with same name
            fs.unlinkSync(filename);
        }

    },
    deleteAlreadyDownloadedExcelFiles: function (fileName) {
        var filename = global.downloadsPath + '/' + fileName;
        var fs = require('fs');
        if (fs.existsSync(filename)) {
            // delete if there is any existing file with same name
            fs.unlinkSync(filename);
        }

    },

    verifyExportToExcelDownload: function (fileName) {
        var filename = global.downloadsPath + '/' + fileName;
        browser.driver.wait(function () {
            return fs.existsSync(filename);
        }, 120000).then(function () {
            reporter.appendTest("Export To Excel", 'File successfully exported.', "TRUE");
            expect(true).toReport(true, "Data Exported to excel successfully");
        });
    },

    verifyFileDownload: function () {
        var filename = global.downloadsPath + '/error.xml';
        browser.driver.wait(function () {
            return fs.existsSync(filename);
        }, 60000).then(function () {
            reporter.appendTest("File Download", 'Getting the ERROR while downloading file and error.xml file has been generated.', "FAIL");
            expect(false).toReport(true, "Getting the ERROR while downloading file and error.xml file has been generated.");
        });
    },

    verifyConsoleErrorsFor: function (errorText) {
        browser.manage().logs().get('browser').then(function (browserLog) {
            console.log('log: ' + require('util').inspect(browserLog));
            actions.expectNotToContain(require('util').inspect(browserLog), errorText, "Verifying Console errors")
        });

    },

    verifyConsoleErrors: function () {
        browser.manage().logs().get('browser').then(function (browserLog) {
            expect(browserLog.length).toEqual(0)
            // Uncomment to actually see the log.
            console.log('log: ' + require('util').inspect(browserLog));
        });
    },

    verifyPDFFileDownload_OffShore: function () {
        browser.driver.wait(function () {
            var filesArray = glob.sync(global.downloadsPath + '/' + '*.pdf');
            if (filesArray.length > 0) {
                reporter.appendTest("Download PDF File", 'PDF File ' + filesArray[0] + ' successfully Downloaded.', "PASS");
            }
            return filesArray.length > 0
        }, 30000).then(function () {
            reporter.appendTest("Download To PDF", 'PDF File successfully Downloaded.', "TRUE");
            expect(true).toReport(true, "Data Exported to PDF successfully");
        })
    },

    verifyCSVFileDownload_OffShore: function () {
        browser.driver.wait(function () {
            var filesArray = glob.sync(global.downloadsPath + '/' + '*.csv');
            if (filesArray.length > 0) {
                reporter.appendTest("Download csv File", 'csv File ' + filesArray[0] + ' successfully Downloaded.', "PASS");
            }
            return filesArray.length > 0
        }, 30000).then(function () {
            reporter.appendTest("Download To csv", 'csv File successfully Downloaded.', "TRUE");
            expect(true).toReport(true, "Data Exported to csv successfully");
        })
    },

    verifyPDFFileDownloaded_OffShore: function (fileName) {
        browser.driver.wait(function () {
            var filesArray = glob.sync(global.downloadsPath + '/' + fileName + '.pdf'),
                flag = false
            if (filesArray.length = 1) {
                reporter.appendTest("Download PDF File", 'PDF File ' + filesArray[0] + ' successfully Downloaded.', "PASS");
                flag = true
            }
            return filesArray.length = 1
        }, 30000).then(function () {
            reporter.appendTest("Download To PDF", 'PDF File successfully Downloaded.', "TRUE");
            expect(true).toReport(true, "Data Exported to PDF successfully");
        })
    },

    verifyCSVFileDownloaded_OffShore: function (fileName) {
        browser.driver.wait(function () {
            var filesArray = glob.sync(global.downloadsPath + '/' + fileName + '.csv');
            if (filesArray.length > 0) {
                reporter.appendTest("Download csv File", 'csv File ' + filesArray[0] + ' successfully Downloaded.', "PASS");
            }
            return filesArray.length > 0
        }, 30000).then(function () {
            reporter.appendTest("Download To csv", 'csv File successfully Downloaded.', "TRUE");
            expect(true).toReport(true, "Data Exported to csv successfully");
        })
    },

    deleteAllPDFFiles_OffShore: function () {
        var fs = require('fs');
        var filesArray = glob.sync(global.downloadsPath + '/' + '*.pdf');
        for (var i = 0; i < filesArray.length; i++) {
            var filePath = filesArray[i];
            fs.unlinkSync(filePath);
        }
    },

    deleteAllXLSXFiles_OffShore: function () {
        var fs = require('fs');
        var filesArray = glob.sync(global.downloadsPath + '/' + '*.xlsx');
        for (var i = 0; i < filesArray.length; i++) {
            var filePath = filesArray[i];
            fs.unlinkSync(filePath);
        }
    },

    deleteAllXMLFiles_OffShore: function () {
        var fs = require('fs');
        var filesArray = glob.sync(global.downloadsPath + '/' + '*.xml');
        for (var i = 0; i < filesArray.length; i++) {
            var filePath = filesArray[i];
            fs.unlinkSync(filePath);
        }
    },

    verifyXMLFileDownload_OffShore: function () {
        browser.driver.wait(function () {
            var filesArray = glob.sync(global.downloadsPath + '/' + '*.xml');
            if (filesArray.length > 0) {
                reporter.appendTest("Download XML File", 'XML File ' + filesArray[0] + ' successfully Downloaded.', "PASS");
            }
            return filesArray.length > 0
        }, 30000).then(function () {
            reporter.appendTest("Download To XML", 'XML File successfully Downloaded.', "TRUE");
            expect(true).toReport(true, "Data Exported to XML successfully");
        })
    },

    verifyXLSXFileDownload_OffShore: function () {
        browser.driver.wait(function () {
            var filesArray = glob.sync(global.downloadsPath + '/' + '*.xlsx');
            if (filesArray.length > 0) {
                reporter.appendTest("Download XLSX File", 'XLSX File ' + filesArray[0] + ' successfully Downloaded.', "PASS");
            }
            return filesArray.length > 0
        }, 150000).then(function () {
            reporter.appendTest("Download To XLSX", 'XLSX File successfully Downloaded.', "TRUE");
            expect(true).toReport(true, "Data Exported to excel successfully");
        })
    },
    waitUntilElementPresent_OffShore: function (element, logname, waitTime = 30000) {
        var text = (logname ? logname : 'Element Presence');
        var until = protractor.ExpectedConditions;
        return browser.wait(until.presenceOf(element), waitTime)
            .then((found) => reporter.appendTest("Verifying Element", 'Verified that "' + logname + '" is Present ', "PASS"))
            .catch((waitError) => {
                reporter.appendTest("Verifying Element", 'Verified that Element is not Present', "FAIL");
                expect(false).toReport(true, 'Expecting "' + logname + '" --> is Present  failed.');
            });
    },
    waitUntilElementPresent_OffShore_added: function (element, logname, waitTime = 30000) {
        var text = (logname ? logname : 'Element Presence');
        var until = protractor.ExpectedConditions;
        return browser.wait(until.presenceOf(element), waitTime)
            .then((found) => { })
            .catch((waitError) => {
                reporter.appendTest(text, 'Verified that Element is not Present : ' + text, "FAIL");
                expect(false).toReport(true, 'Expecting "' + logname + '" --> is Present  failed.');
            });
    },


    waitUntilElementVisible_OffShore: function (element, logname, waitTime = 30000) {
        var text = (logname ? logname : 'Element Presence');
        var until = protractor.ExpectedConditions;
        return browser.wait(until.visibilityOf(element), waitTime)
            .then((found) => reporter.appendTest(text, 'Verified that Element is Present', "PASS"))
            .catch((waitError) => {
                reporter.appendTest(text, 'Verified that Element is not Present', "FAIL");
                expect(false).toReport(true, 'Expecting "' + logname + '" --> is Present  failed.');
            });
    },

    expectNumberNotEqual_OffShore: function (value1, value2, logname) {
        var text = (logname ? logname : 'Expect number is not equal to');
        if (value1 !== value2) {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is not equal to "' + value2, "PASS");
        } else {
            reporter.appendTest(text, 'Verifying if "' + value1 + '" is not equal to "' + value2, "FAIL");
            expect(false).toReport(true, "Expecting " + value1 + " not equal to " + value2 + " failed.");
        }
    },

    getCheckBoxStatus: function (elem, logName) {
        var status = null;
        // elem.isSelected().then(bSelected=>{
        //     status = bSelected;
        //     reporter.appendTest(logName+" status" , 'Checkbox status is '+status, "PASS");
        // })
        if (elem.isSelected()) {
            return 'true';
        } else {
            return false;
        }
    },

    getFileNameFromDownloads_Offshore: function (fileType, callback) {
        var filesArray = glob.sync(global.downloadsPath + '/' + '*.' + fileType);
        reporter.appendTest('Get File Name', 'File Title is ' + filesArray[0], "PASS");
        var total = filesArray[0].split('/').length
        callback(filesArray[0].split('/')[total - 1]);
    },

    clearFilesFromDownloadsFolder_OffShore: function (fileType) {
        var fs = require('fs');
        var filesArray = glob.sync(global.downloadsPath + '/' + '*.' + fileType);
        for (var i = 0; i < filesArray.length; i++) {
            var filePath = filesArray[i];
            fs.unlinkSync(filePath);
        }
    },

    verifyFileDownload_OffShore: function (fileType, waitTime = 150000) {
        browser.driver.wait(function () {
            var filesArray = glob.sync(global.downloadsPath + '/' + '*.' + fileType);
            if (filesArray.length > 0) {
                reporter.appendTest("Download " + fileType + " File", fileType + ' File ' + filesArray[0] + ' successfully Downloaded.', "PASS");
            }
            return filesArray.length > 0
        }, waitTime).then(function () {
            reporter.appendTest("Download To " + fileType, fileType + ' File successfully Downloaded.', "TRUE");
            expect(true).toReport(true, "Data Exported to excel successfully");
        })
    },

    ClickWithOutScrollingToElement: function (elem, logname) {
        var EC = protractor.ExpectedConditions
        browser.wait(EC.elementToBeClickable(elem), 10000).then(() => {
            elem.click().then(function () {
                reporter.appendTest('Performed Click', 'Performed click of ' + logname, "PASS");
            }, function (err) {
                reporter.appendTest('Performed Click', 'Performed click of ' + logname, "FAIL");
                expect(false).toReport(true, "Unable to perform Click operation on '" + logname + "' because of " + err.message);
            });
        }).catch(err => {
            reporter.appendTest('Unable to click Button', 'Unable to click Button: ' + logname + ' Button', "FAIL");
            expect(false).toReport(true, "Unable to click Button because of " + err.message);
        })
    },

    waitUntilElementClickable_OffShore: function (element, logname, waitTime = 10000) {
        var text = (logname ? logname : 'Wait for element clickable');
        var until = protractor.ExpectedConditions;
        return browser.wait(until.elementToBeClickable(element), waitTime)
            .then((found) => reporter.appendTest("Verifying is " + text + " clickable", 'Verified that Element is Clickable', "PASS"))
            .catch((waitError) => {
                reporter.appendTest("Verifying is " + text + " clickable", 'Verification failed due to wait error', "FAIL");
                expect(false).toReport(true, 'Expecting "' + logname + '" --> is Clickable failed.');
            });
    },
    verifyGridMonth: function (elem, months) {
        var months = ['Mouth', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        for (var i = 1; i < elem.length; i++) {
            if (elem[i] == months[i]) {

                reporter.appendTest(elem[i], 'Verifying the month' + months[i], "PASS");
            } else {
                reporter.appendTest(elem[i], 'Verifying the month', "FAIL");
            }
        }
    },
    clickWithActions: function (elem, logname) {
        var EC = protractor.ExpectedConditions
        this.waitUntilElementPresent_OffShore(elem, logname, 10000)
        this.ScrollIntoViewElement(elem.getWebElement())
        browser.wait(EC.elementToBeClickable(elem), 10000).then(() => {
            //browser.actions().

            browser.actions().mouseMove(elem).mouseMove({ x: 50, y: 20 }).doubleClick().perfrom().then(function () {
                reporter.appendTest('Performed Click', 'Performed click of ' + logname, "PASS");
            }, function (err) {
                reporter.appendTest('Performed Click', 'Performed click of ' + logname, "FAIL");
                expect(false).toReport(true, "Unable to perform Click operation on '" + logname + "' because of " + err.message);
            });
        }).catch(err => {
            reporter.appendTest('Unable to click Button', 'Unable to click Button: ' + logname + ' Button', "FAIL");
            expect(false).toReport(true, "Unable to click Button because of " + err.message);
        })
    },

    verifyNumberFormat(input, ExpectedResult, logname) {
        var flag = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(input);
        reporter.appendTest('Number format**********', 'flag : ' + flag, "PASS");
        if (flag === ExpectedResult) {
            if (ExpectedResult) {
                reporter.appendTest('Number format', 'Verify Number format: ' + logname, "PASS");
            } else {
                reporter.appendTest('Number format not as expected', 'Verify Number format not as expected: ' + logname, "FAIL");
            }
        } else {
            reporter.appendTest('Number format', 'Verify Number format:  ' + logname, "FAIL");
            expect(flag).toReport(ExpectedResult, "Verifying Number format FAILED for: " + logname);
        }
    },

    verify12DigitNumberFormat(input, ExpectedResult, logname) {
        var flag = /^\d{12}$/.test(input)
        reporter.appendTest('Number format**********', 'flag : ' + flag, "PASS");
        if (flag === ExpectedResult) {
            if (ExpectedResult) {
                reporter.appendTest('Number format', 'Verify Number format: ' + logname, "PASS");
            } else {
                reporter.appendTest('Number format not as expected', 'Verify Number format not as expected: ' + logname, "FAIL");
            }
        } else {
            reporter.appendTest('Number format', 'Verify Number format:  ' + logname, "FAIL");
            expect(flag).toReport(ExpectedResult, "Verifying Number format FAILED for: " + logname);
        }
    },

    verify2DigitNumberFormat(input, ExpectedResult, logname) {
        var flag = /^\d{2}$/.test(input)
        reporter.appendTest('Number format**********', 'flag : ' + flag, "PASS");
        if (flag === ExpectedResult) {
            if (ExpectedResult) {
                reporter.appendTest('Number format', 'Verify Number format: ' + logname, "PASS");
            } else {
                reporter.appendTest('Number format not as expected', 'Verify Number format not as expected: ' + logname, "FAIL");
            }
        } else {
            reporter.appendTest('Number format', 'Verify Number format:  ' + logname, "FAIL");
            expect(flag).toReport(ExpectedResult, "Verifying Number format FAILED for: " + logname);
        }
    },

    verifyEmailFormat(email, ExpectedResult, logname) {
        var flag = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test((String(email).toLowerCase()));
        reporter.appendTest('Number format**********', 'flag : ' + flag, "PASS");
        //    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //    var flag = reg.test(String(email).toLowerCase())
        if (flag === ExpectedResult) {
            if (ExpectedResult) {
                reporter.appendTest('Email format', 'Verify Email format: ' + logname, "PASS");
            } else {
                reporter.appendTest('Email format is not as expected', 'Verify Number format not as expected: ' + logname, "PASS");
            }
        } else {
            reporter.appendTest('Number format', 'Verify Number format:  ' + logname, "FAIL");
            expect(status).toReport(ExpectedResult, "Verifying Number format FAILED for: " + logname);
        }
    },

    // verifyElementEditable(object, expValue, logname) {
    //     this.SetText(object, expValue, logname);
    //     object.getAttribute('value').then(function (val) {
    //         this.expectToEqual(val, expValue, logname)
    //     })
    // },

    GetFieldValue: async (elem, FieldName) => {
        elem.getAttribute('value').then(function (value) {
            reporter.appendTest('Verifying ' + FieldName, 'Displayed "' + FieldName + '" is: ' + value, "PASS");
            return value;
        }, function (err) {
            reporter.appendTest('Verifying ' + FieldName, 'Failed while getting value of: "' + FieldName + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
            return '';
        })
    },

    GetElementText: function (elem, logname) {
        elem.getText().then(function (text) {
            reporter.appendTest('Verifying ' + logname, 'Displayed "' + logname + '" is: ' + text, "PASS");
            return text;
        }, function (err) {
            reporter.appendTest('Verifying ' + logname, 'Failed while getting text of: "' + logname + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform GetText operation because of " + err.message);
            return '';
        })
    },

    //example value1=Jordan ,value2= Jonathon , logname= Contact name, var1= Expected contact name, var2= Displayed contact name
    expectToEqualCustom: function (value1, value2, logname, var1, var2) {
        var text = (logname ? logname : 'Expect to Equal');
        if (value1 == value2) {
            reporter.appendTest('Verifying ' + text, 'Verified that <b>' + var2 + '</b>: "' + value2 + '" is same as <b>' + var1 + '</b>: "' + value1 +'" ', "PASS");
        } else {
            reporter.appendTest('Verifying ' + text,'Verified that <b>' + var2 + '</b>: "' + value2 + '" is not same as <b>' + var1 + '</b>: "' + value1 +'" ', "FAIL");
            expect(false).toReport(true, 'Expecting "' + logname + '" -->"' + value1 + '" to same as "' + value2 + '" failed.');
        }
    },
    expectNotToEqualCustom: function (value1, value2, logname, var1, var2) {
        var text = (logname ? logname : 'Expect Not to Equal');
        if (value1 != value2) {
            reporter.appendTest('Verifying ' + text, 'Verified that ' + var2 + ': ' + value2 + ' is not same as ' + var1 + ': ' + value1, "PASS");
        } else {
            reporter.appendTest('Verifying ' + text, 'Verified that ' + var2 + ': ' + value2 + ' is same as ' + var1 + ': ' + value1, "FAIL");
            expect(false).toReport(true, 'Expecting "' + logname + '" -->"' + value1 + '" not same as "' + value2 + '" failed.');
        }
    },
    expectToContainCustom: function (value1, value2, logname, var1, var2) {
        var text = (logname ? logname : 'Expect to contain');
        if (value1.indexOf(value2) > -1) {
            reporter.appendTest('Verifying ' + text, 'Verified that <b>' + var2 + '</b>: "' + value2 + '" is present in<b> ' + var1 + '</b>: "' + value1 +'" ', "PASS");
        } else {
            reporter.appendTest('Verifying ' + text, 'Verified that <b>' + var2 + '</b>: "' + value2 + '" is not present in<b> ' + var1 + '</b>: "' + value1 +'" ', "FAIL");
            expect(false).toReport(true, "Expecting " + value2 + " is present in " + value1 + " failed.");
        }
    },
    expectNotToContainCustom: function (value1, value2, logname, var1, var2) {
        var text = (logname ? logname : 'Expect not to contain');
        if (value1.indexOf(value2) < 0) {
            reporter.appendTest('Verifying ' + text, 'Verified that ' + var2 + ': ' + value2 + ' is not present in ' + var1 + ': ' + value1, "PASS");
        } else {
            reporter.appendTest('Verifying ' + text, 'Verified that ' + var2 + ': ' + value2 + ' is  present in ' + var1 + ': ' + value1, "FAIL");
            expect(false).toReport(true, "Expecting " + value2 + " is not present in " + value1 + " failed.");
        }
    },


    enterPassWord: function (elem, valueToEnter, logname) {
        var self = this;
        Short_Wait()
        browser.executeScript("return arguments[0].value", elem.getWebElement()).then(function (value) {
            var text = '';
            for (var iterator = 0; iterator < value.length; iterator++) {
                text += protractor.Key.BACK_SPACE;
            }
            text += valueToEnter;
            elem.sendKeys(text).then(function () {
                reporter.appendTest('Entering Value', 'Entered "******" in "' + logname + '" Field', "PASS");
            }, function (err) {
                reporter.appendTest('Entering Value', 'Entering "******" in "' + logname + '" Field', "FAIL");
                expect(false).toReport(true, "Unable to perform SetText operation on '" + logname + "' because of " + err.message);
            });
        });
    },

    uploadFile: function (elem, value, logname) {
        browser.executeScript("arguments[0].scrollIntoView();", elem.getWebElement()).then(function () {
            elem.sendKeys(value).then(function () {
                reporter.appendTest('Uploading file', 'Uploaded file in the section :' + logname, "PASS");
            }, function (err) {
                reporter.appendTest('Uploading file', 'Uploading file in the section :' + logname, "FAIL");
                expect(false).toReport(true, "Unable to perform SetText operation on '" + logname + "' because of " + err.message);
            });
        });
    },

    /**
 * Get current date mm/dd/yyyy
 */
    currentDate_mm_dd_yyyy: function () {
        var today = new Date();
        var dd = String(today.getDate());
        var mm = String(today.getMonth() + 1); //January is 0!
        var yyyy = today.getFullYear();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        // var today = yyyy + '-' + mm + '-' + dd;
        var today = (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + (ddChars[1] ? dd : "0" + ddChars[0]) + '/' + yyyy;

        return today
    },

    /**
  * Get future or previous date
  */
    futurePreviousDate_mm_dd_yyyy: function (NumberOfdays) {
        var today = new Date();
        today.setDate(today.getDate() + NumberOfdays);
        var dd = String(today.getDate());
        var mm = String(today.getMonth() + 1);
        var yyyy = today.getFullYear();
        //  var targetDate = mm + '/' + dd + '/' + yyyy;
        var mmChars = mm.split('');
        var ddChars = dd.split('');
        var targetDate = (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + (ddChars[1] ? dd : "0" + ddChars[0]) + '/' + yyyy;

        return targetDate
    },

    /**
  * Get Given date mm/dd/yyyy
  */
    dateFormat_mm_dd_yyyy: function (date) {
        var dd = String(date.getDate());
        var mm = String(date.getMonth() + 1); //January is 0!
        var yyyy = date.getFullYear();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        // var today = yyyy + '-' + mm + '-' + dd;
        var dateFormat = (mmChars[1] ? mm : "0" + mmChars[0]) + '/' + (ddChars[1] ? dd : "0" + ddChars[0]) + '/' + yyyy;

        return dateFormat
    },

    /**
     * Get random string
     */
    strRandom: function (length) {
        var result = '';
        for (var i = 0; i < length; i++) {
            result += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
        return result;
    },
 
    GetFieldValueAndCompareToBeEqual: async (elem, expectedValue, logname, actVar, expVar ) => {
      var text = (logname ? logname : 'Expect to Equal');
        elem.getAttribute('value').then(function (actualValue) {
            if (expectedValue === actualValue) {
             reporter.appendTest('Verifying ' + text, 'Verified that <b>' + actVar + '</b>: "' + actualValue + '" is same as <b>' + expVar + '</b>: "' + expectedValue +'" ', "PASS");
            } else {
            reporter.appendTest('Verifying ' + text,'Verified that <b>' + actVar + '</b>: "' + actualValue + '" is not same as <b>' + expVar + '</b>: "' + expectedValue +'" ', "FAIL");
            expect(false).toReport(true, 'Expecting "' + text + '" -->"' + actualValue + '" to same as "' + expectedValue + '" failed.');
            }
          }, function (err) {
            reporter.appendTest('Verifying ' + text, 'Failed while getting value of: "' + text + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        })
    },
    GetFieldValueAndCompareNotToBeEqual: async (elem, expectedValue, logname, actVar, expVar ) => {
      var text = (logname ? logname : 'Expect to Equal');
        elem.getAttribute('value').then(function (actualValue) {
            if (expectedValue !== actualValue) {
             reporter.appendTest('Verifying ' + text, 'Verified that <b>' + actVar + '</b>: "' + actualValue + '" is same as <b>' + expVar + '</b>: "' + expectedValue +'" ', "PASS");
            } else {
            reporter.appendTest('Verifying ' + text,'Verified that <b>' + actVar + '</b>: "' + actualValue + '" is not same as <b>' + expVar + '</b>: "' + expectedValue +'" ', "FAIL");
            expect(false).toReport(true, 'Expecting "' + text + '" -->"' + actualValue + '" to same as "' + expectedValue + '" failed.');
            }
          }, function (err) {
            reporter.appendTest('Verifying ' + text, 'Failed while getting value of: "' + text + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        })
    },
    GetFieldValueAndCompareToBeContain: async (elem, expectedValue, logname, actVar, expVar) => {
      var text = (logname ? logname : 'Expect to contain');
        elem.getAttribute('value').then(function (actualValue) {
           if (actualValue.indexOf(expectedValue) > -1) {
             reporter.appendTest('Verifying ' + text, 'Verified that <b>' + actVar + '</b>: "' + actualValue + '" contains <b>' + expVar + '</b>: "' + expectedValue +'" ', "PASS");
            } else {
            reporter.appendTest('Verifying ' + text,'Verified that <b>' + actVar + '</b>: "' + actualValue + '" does not contain <b>' + expVar + '</b>: "' + expectedValue +'" ', "FAIL");
            expect(false).toReport(true, 'Expecting "' + text + '" -->"' + actualValue + '" is present in "' + expectedValue + '" failed.');
            }
          }, function (err) {
            reporter.appendTest('Verifying ' + text, 'Failed while getting value of: "' + text + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        })
     },
    GetTextAndCompareToBeEqual: async (elem, expectedValue, logname, actVar, expVar) => {
      var text = (logname ? logname : 'Expect to Equal');
        elem.getText().then(function (actualValue) {
            if (expectedValue === actualValue) {
             reporter.appendTest('Verifying ' + text, 'Verified that <b>' + actVar + '</b>: "' + actualValue + '" is same as <b>' + expVar + '</b>: "' + expectedValue +'" ', "PASS");
            } else {
            reporter.appendTest('Verifying ' + text,'Verified that <b>' + actVar + '</b>: "' + actualValue + '" is not same as <b>' + expVar + '</b>: "' + expectedValue +'" ', "FAIL");
            expect(false).toReport(true, 'Expecting "' + text + '" -->"' + actualValue + '" to same as "' + expectedValue + '" failed.');
            }
          }, function (err) {
            reporter.appendTest('Verifying ' + text, 'Failed while getting value of: "' + text + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform getText operation because of " + err.message);
        })
    },
    GetTextAndCompareNotToBeEqual: async (elem, expectedValue, logname, actVar, expVar) => {
      var text = (logname ? logname : 'Expect to Equal');
        elem.getText().then(function (actualValue) {
            if (expectedValue !== actualValue) {
             reporter.appendTest('Verifying ' + text, 'Verified that <b>' + actVar + '</b>: "' + actualValue + '" is not same as <b>' + expVar + '</b>: "' + expectedValue +'" ', "PASS");
            } else {
            reporter.appendTest('Verifying ' + text,'Verified that <b>' + actVar + '</b>: "' + actualValue + '" is same as <b>' + expVar + '</b>: "' + expectedValue +'" ', "FAIL");
            expect(false).toReport(true, 'Expecting "' + text + '" -->"' + actualValue + '" to not same as "' + expectedValue + '" failed.');
            }
          }, function (err) {
            reporter.appendTest('Verifying ' + text, 'Failed while getting value of: "' + text + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform getText operation because of " + err.message);
        })
    },
    GetTextAndExpectToContain: async (elem, expectedValue,logname,  actVar, expVar) => {
      var text = (logname ? logname : 'Expect to contain');
        elem.getText().then(function (actualValue) {
           if (actualValue.indexOf(expectedValue) > -1) {
             reporter.appendTest('Verifying ' + text, 'Verified that <b>' + actVar + '</b>: "' + actualValue + '" contains <b>' + expVar + '</b>: "' + expectedValue +'" ', "PASS");
            } else {
            reporter.appendTest('Verifying ' + text,'Verified that <b>' + actVar + '</b>: "' + actualValue + '" does not contain <b>' + expVar + '</b>: "' + expectedValue +'" ', "FAIL");
            expect(false).toReport(true, 'Expecting "' + text + '" -->"' + actualValue + '" is present in "' + expectedValue + '" failed.');
            }
          }, function (err) {
            reporter.appendTest('Verifying ' + text, 'Failed while getting value of: "' + text + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform getText operation because of " + err.message);
        })
     },
  verifyFieldValueIsNotEditable: function (elem,logname,valueToEnter='2') {
     elem.getAttribute('value').then(function (firstValue) {
       reporter.appendTest(logname+' Field value before update: ', firstValue, "PASS");        
        browser.executeScript("arguments[0].scrollIntoView();", elem.getWebElement()).then(function () {
         if(firstValue===valueToEnter) valueToEnter=valueToEnter+'2';
           elem.sendKeys(valueToEnter).then(function () {
            reporter.appendTest('Entering Value', 'Entered "' + valueToEnter + '" in the Field ' + logname, "PASS");            
             elem.getAttribute('value').then(function (secondValue) {
               reporter.appendTest(logname+' Field value after update: ', secondValue, "PASS");        
                if (firstValue === secondValue)
                  reporter.appendTest('Verifying field: '+logname, 'Verified that '+logname+' field is not Modifiable/Editable', "PASS");
                 else {
                  reporter.appendTest('Verifying field: '+logname,'Verified that '+logname+' field is Modifiable/Editable', "FAIL");
                  expect(false).toReport(true, 'Expecting field '+logname+' to be not Modifiable- failed.');
                  }//end of else
                }, function (err) {
                 reporter.appendTest('Verifying '+logname, 'Failed while getting value of: '+logname, "FAIL");
                 expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
               }) //end of inner GetAttribute chain            
              }, function (err) {
                reporter.appendTest('Entering Value', 'Failed while Entering "' + valueToEnter + '" in the Field ' + logname, "FAIL");
                expect(false).toReport(true, "Unable to perform SetText operation on '" + logname + "' because of " + err.message);
              }); //end of Sendkeys Chain 
            });  //end of executeScript Chain
          },function (err) {
            reporter.appendTest('Verifying '+logname, 'Failed while getting value of: '+logname, "FAIL");
           expect(false).toReport(true, "Unable to perform GetAttribute operation because of " + err.message);
        }) //end of outer GetAttribute chain    
     },

 verifyTextBoxIsEditable:  (elem, valueToEnter='12345', logName) =>{
   browser.executeScript("return arguments[0].value", elem.getWebElement()).then(function (value) {
    var text = '';
      for (var iterator = 0; iterator < value.length; iterator++){
        text += protractor.Key.BACK_SPACE; }
          text += valueToEnter;
            elem.sendKeys(text).then(function () {
              reporter.appendTest('Entering Value in ' + logName, 'Entered "' + valueToEnter + '" in "' + logName + '" Field', "PASS");
                elem.getAttribute('value').then(function (fieldValue) {
                  if (fieldValue === valueToEnter)
                       reporter.appendTest('Verifying ' + logName, 'Verified that field: ' + logName + ' is <b>Editable</b>', "PASS");
                  else reporter.appendTest('Verifying ' + logName, 'Verified that field: ' + logName + ' is <b>Not Editable</b>', "FAIL");
                });
               }, function (err) {
                reporter.appendTest('Entering Value', 'Entering "' + valueToEnter + '" in "' + logName + '" Field', "FAIL");
                expect(false).toReport(true, "Unable to perform SetText operation on '" + logName + "' because of " + err.message);
            });
        });   
    },

    GetFieldValueAndPrint: async (elem, logname) => {
      var text = (logname ? logname : 'Field value');
        elem.getAttribute('value').then(function (displayedValue) {
             reporter.appendTest('Verifying '+text,'Displayed value: '+displayedValue, "PASS");
          }, function (err) {
            reporter.appendTest('Verifying ' + text, 'Failed while getting value of: "' + text + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform getText operation because of " + err.message);
        })
    },
    GetElementTextAndPrint: async (elem, logname) => {
      var text = (logname ? logname : 'Field Text');
        elem.getText().then(function (displayedValue) {
             reporter.appendTest('Verifying '+text,'Displayed value: '+displayedValue, "PASS");
          }, function (err) {
            reporter.appendTest('Verifying ' + text, 'Failed while getting value of: "' + text + '"', "FAIL");
            expect(false).toReport(true, "Unable to perform getText operation because of " + err.message);
        })
    },
};