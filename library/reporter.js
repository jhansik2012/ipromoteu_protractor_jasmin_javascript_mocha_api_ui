/* global Buffer */
/* global global */
/* global browser */
var genericData = requireData('genericData');
var logger = requireUtils('logger');
var fs = require('fs');
var os = require('os');
var path = require('path');
var jsdom = require("jsdom");
var COL_BROWSER = 0;
var COL_HOST_NAME = 1;
var COL_OS = 2;
var COL_TCID = 3;
var COL_DESC = 4;
var COL_ACTION = 5;
var COL_STATUS = 6;
var COL_RESULT = 7;
var COL_TIMESTAMP = 8;
var COL_URL = 9;
var COL_SUITE_EXECUTED = 10;
var COL_DETAIL_LINK = 11;
var Host_Name;
var Environment_Name;
var Suite_Execut;
var Browser_Name;
var Date_Time;
var OS_Name;
var csvData = {};
var TimeData = [];
var timeStamp = currentTimeStamp();
var report_name = "";
var Jsum_report_name = "";
var Jsum_emailreport = "";
var line_arr;
var TestStepsCount = 0;
var tdSteps = "";
var tdCase = "";
var Curr_TCName;
var Case_Desc_Det;
var Case_Desc_Sum;
var Case_Step;
var testCaseDetailReportLink;
var Start_Time;
var End_Time;
var First_Test_Start_Time;
var Last_Test_End_Time;
var Elapsed_Time;
var Failed = 0;
var Passed = 0;
var Sr_NO = 0;
var js_content = "";
var email_content = "";
var Case_NO = 0;
var Total_Failed = 0;
var SUMM_Elapsed_Time;
var tmpBrowName = "";
var Final_Result = "";
var data1 = ["Host Name", "Environment URL", "Suite Executed", "Browser", "Date & Time", "OS", "TCID", "Desc", "Action", "Status", "Result", "Timestamp"] + '\n';
var OS = 'Platform';
var basePath = __dirname;
var reporterPath = resultsPath+'\\CignitiReport\\';

console.log("*************++++basePath+++++"+resultsPath)


module.exports = {
    generateHtmlReport: function () {
        console.log('***********global.BROWSER_TO_BE_EXECUTED************' + global.BROWSER_TO_BE_EXECUTED);
        if (global.BROWSER_TO_BE_EXECUTED == 'INTERNET EXPLORER') {
            tmpBrowName = 'IE';
        } else {
            tmpBrowName = global.BROWSER_TO_BE_EXECUTED;
            // tmpBrowName = 'CHROME'
        }
        var csv = 'CSV_Merge_' + tmpBrowName;
        setHeaderValues(csv);
        detailedReport(csv, true).then(function () {
            report_name = "details_result_report_" + csv + "_" + timeStamp + ".htm";
            summaryReport(csv, report_name).then(function () {
                console.log('******Summary Report ENDS******');
                emailSumReport(email_content).then(function () {
                    console.log('******emailReport ENDS******');
                });
            });
        });
    },
    reportInitialization: function () {
        if (global.BROWSER_TO_BE_EXECUTED == 'INTERNET EXPLORER') {
            tmpBrowName = 'IE';
        } else {
            tmpBrowName = global.BROWSER_TO_BE_EXECUTED;
        }
        var csv = 'CSV_Merge_' + tmpBrowName;
        cleaningCSV(csv);
    },
    generateSubReport: function (csv) {
        mergingSubFilesIntoCSV(csv);
    },
    appendTest: function (TestStep, TestStepDesc, Result) {
        //OS = global.platform.toUpperCase();
        OS = global.platform;
        if (TestStep.indexOf(',') > -1) {
            TestStep = TestStep.split(',').join('');
            TestStep = TestStep.split('\n').join('');
        }
        if (TestStepDesc.indexOf(',') > -1) {
            TestStepDesc = TestStepDesc.split(',').join('');
            TestStepDesc = TestStepDesc.split('\n').join('');
        }

        if (Result.indexOf('FAIL') > -1) {
            var dt = [global.current_TestCase.split("_")[0]] + '\n';
            fs.appendFile(reporterPath + 'report_assets/CSV_FailedTestList.csv', dt, function (err) {
                if (err) throw err;
            });
            browser.takeScreenshot().then(function (png) {
                var rand = Math.floor((Math.random() * 10000) + 1);
                var ScrShotFileName = 'Scr_' + rand + '_' + currentTimeStamp();
                var jpath = reporterPath + global.SUITENAME + '-' + global.TIMESTAMP + '/' + ScrShotFileName + '.png';
                storeScreenShot(png, jpath);
                Final_Result = Result + ':' + ScrShotFileName + '.png';
            });

            browser.getWindowHandle().then(function (val) {
                var win = val.substring(9, parseInt(val.length));
                data1 = [global.browserName.toUpperCase(), global.process.env.COMPUTERNAME, OS, global.current_TestCase.split("_")[0], global.current_TestCase.split("_")[1], TestStep, Final_Result, TestStepDesc, currentTimeStampDiff(), global.AppURL, global.suite_To_Be_Executed, 'details_result_report_TS_' + win] + '\n';
                append_data_into_csv(data1, 'TS_' + win);
                logger.Log(TestStepDesc);
            }).then(function () {
                if (global.quitOnFailure) {
                    browser.close();
                }
            });
        }
        else if (Result.indexOf('Final') > -1) {          
            browser.takeScreenshot().then(function (png) {
                var rand = Math.floor((Math.random() * 10000) + 1);
                var ScrShotFileName = 'Scr_' + rand + '_' + currentTimeStamp();
                var jpath = reporterPath + global.SUITENAME + '-' + global.TIMESTAMP + '/' + ScrShotFileName + '.png';
                storeScreenShot(png, jpath);
                Final_Result = Result + ':' + ScrShotFileName + '.png';
            });

            
        } else if (Result.indexOf('LINE') > -1) {
            browser.getWindowHandle().then(function (val) {
                var win = val.substring(9, parseInt(val.length));
                data1 = [global.browserName.toUpperCase(), global.process.env.COMPUTERNAME, OS, global.current_TestCase.split("_")[0], global.current_TestCase.split("_")[1], TestStep, Result, TestStepDesc, currentTimeStampDiff(), global.AppURL, global.suite_To_Be_Executed, 'details_result_report_TS_' + win] + '\n';
                append_data_into_csv(data1, 'TS_' + win);
                logger.Log(TestStepDesc);
            });
        } else {
            if (global.captureScreenshotsForAllSteps) {
                browser.takeScreenshot().then(function (png) {
                    var rand = Math.floor((Math.random() * 10000) + 1);
                    var ScrShotFileName = 'Scr_' + rand + '_' + currentTimeStamp();
                    var jpath = reporterPath + global.SUITENAME + '-' + global.TIMESTAMP + '/' + ScrShotFileName + '.png';
                    storeScreenShot(png, jpath);
                    Final_Result = Result + ':' + ScrShotFileName + '.png';
                });
            }
            browser.getWindowHandle().then(function (val) {
                var win = val.substring(9, parseInt(val.length));
                if (global.captureScreenshotsForAllSteps != true) Final_Result = Result;
                data1 = [global.browserName.toUpperCase(), global.process.env.COMPUTERNAME, OS, global.current_TestCase.split("_")[0], global.current_TestCase.split("_")[1], TestStep, Final_Result, TestStepDesc, currentTimeStampDiff(), global.AppURL, global.suite_To_Be_Executed, 'details_result_report_TS_' + win] + '\n';
                append_data_into_csv(data1, 'TS_' + win);
                logger.Log(TestStepDesc);
            });
        }
        Final_Result = '';
    }

};
//Common function set all header values of the both Summary Report & Details Report
function setHeaderValues(csv) {
    console.log("******************INSIDE setHeaderValues FUNCTION *************************************")
    fs.readFile(reporterPath + 'report_assets/' + csv + '.csv', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
            console.log("************************************************ THIS ERROR IS THROWN WHILE READING THE CSV_Merge_CHROME FILE**********************************************************************")
        }
        var line1 = data.split('\n')[0];
        TestStepsCount = parseInt(data.split('\n').length) - 1;
        var last_line = data.split('\n')[TestStepsCount - 1];
        var line_arr = line1.split(",");
        var last_line_arr = last_line.split(",");
        /*Start_Time = line_arr[COL_TIMESTAMP];
         End_Time = last_line_arr[COL_TIMESTAMP];*/
        /*Elapsed_Time = getTimeDiffernceInMilliSeconds(Start_Time, End_Time);*/
        Start_Time = global.STARTED_TIMESTAMP;
        End_Time = global.FINISHED_TIMESTAMP;
        Elapsed_Time = getTimeDiffernceInMilliSeconds(Start_Time, End_Time);
        Host_Name = line_arr[COL_HOST_NAME];
        //Environment_Name = line_arr[COL_URL];
        Environment_Name = genericData["appURL"];
        Suite_Execut = line_arr[COL_SUITE_EXECUTED];
        Browser_Name = line_arr[COL_BROWSER];
        Date_Time = line_arr[COL_TIMESTAMP];
        OS_Name = line_arr[COL_OS];
        Curr_TCName = line_arr[COL_TCID];
        Case_Desc_Det = line_arr[COL_DESC];
        Case_Step = line_arr[COL_TCID];
        Case_Desc_Sum = line_arr[COL_DESC];
        testCaseDetailReportLink = line_arr[COL_DETAIL_LINK];
        First_Test_Start_Time = line_arr[COL_TIMESTAMP];
        Last_Test_End_Time = line_arr[COL_TIMESTAMP];
    });
}

function detailedReport(csv, runTimeDisplayFlag) {
    return new Promise(function (resolve) {
        report_name = "details_result_report_" + csv + "_" + timeStamp + ".htm";
        fs.readFile(reporterPath + 'report_assets/Template_Details_Results.html', function (err, data) {
            if (err) {
                console.log(err);
                throw err;
            }
            jsdom.env({
                html: data,
                scripts: [libraryPath+'/jquery-2.2.4.min.js'],
                done: function (domErr, window) {
                    if (domErr) throw domErr;
                    var $ = window.$;
                    var lineRdr = require("readline").createInterface({
                        input: fs.createReadStream(reporterPath + 'report_assets/' + csv + '.csv')
                    });
                    Sr_NO = 0;
                    Failed = 0;
                    var line_arr;
                    lineRdr.on('line', function (line) {
                            $("#host_name").text(Host_Name);
                            $("#environment_name").text(Environment_Name);
                            $("#suite_executed").text(Suite_Execut);
                            $("#browser").text(Browser_Name);
                            $("#date_time").text(Date_Time);
                            $("#os_name").text(OS_Name);
                            line_arr = line.split(",");
                            var Image_Src = "";
                            var tr_case_class = "";
                            TimeData.push(Date_Time);
                            var Step_Name = line_arr[COL_ACTION];
                            var Step_Desc = line_arr[COL_RESULT];
                            var Step_Status = line_arr[COL_STATUS];
                            if (Step_Status.indexOf("LINE") > -1) {
                                tdSteps = tdSteps + "<tr id=" + Curr_TCName + " class='content2_pass'><td colspan='4' align='center'>**********" + Step_Name + "**********</td></tr>";
                            } else {
                                try {
                                    if (Step_Status.indexOf("FAIL") > -1) {
                                        Failed++;
                                        var screenPath = Step_Status.split(":")[1];
                                        Image_Src = '<a id="fail_image" href="' + screenPath + '"><img id="status_image" src="../report_assets/failed.ico" width="18" height="18"/></a>';
                                        tr_case_class = 'content2_fail';
                                    } else {
                                        Image_Src = '<img id="status_image" src="../report_assets/passed.ico" width="18" height="18"/>';
                                        tr_case_class = 'content2_pass';
                                        Passed++;
                                        if (global.captureScreenshotsForAllSteps) {
                                            var screenPath = Step_Status.split(":")[1];
                                            Image_Src = '<a id="status_image" href="' + screenPath + '"><img id="status_image" src="../report_assets/passed.ico" width="18" height="18"/></a>';
                                        }
                                    }
                                } catch (err) {
                                    throw err;
                                }
                                Sr_NO++;
                                if (line_arr[COL_TCID] != Curr_TCName) {
                                    if (runTimeDisplayFlag) {
                                        var Case_Elapsed_Time = elapsed_time_of_each_TC(Curr_TCName, 'results_output');
                                        tdCase = "<tr id=" + Curr_TCName + " class='section'><td id='test_case_name' colspan='2'>" + Curr_TCName + " : " + Case_Desc_Det + "</td>" +
                                            "<td id='test_case_time' align='center' colspan='2'>Run Time- " + Case_Elapsed_Time + "</td></tr>"
                                    } else {
                                        tdCase = "<tr id=" + Curr_TCName + " class='section'><td id='test_case_name' colspan='2'>" + Curr_TCName + " : " + Case_Desc_Det + "</td>" +
                                            "<td id='test_case_time' align='center' colspan='2'></td></tr>"
                                    }
                                    $("#SignIn_Form_Entry0").append(tdCase);
                                    $("#SignIn_Form_Entry0").append(tdSteps);
                                    $("#expanding").append(js_content);
                                    tdCase = "";
                                    tdSteps = "";
                                    Sr_NO = 1;
                                    Curr_TCName = line_arr[COL_TCID];
                                    Case_Desc_Det = line_arr[COL_DESC];
                                }
                                var tcname = "\"#" + Curr_TCName + "\"";
                                js_content = "$(" + tcname + ").click(function(){$(this).nextAll(" + tcname + ").slideToggle( 'fast' );});";

                                tdSteps = tdSteps + "<tr id=" + Curr_TCName + " class='" + tr_case_class + "'><td>" + Sr_NO + "</td>" +
                                    "<td class='justified' id='case_step_name'>" + Step_Name + "</td>" +
                                    "<td class='justified' id='case_step_details'>" + Step_Desc + "</td>" +
                                    "<td class='Pass' align='center'>" + Image_Src + "</td></tr>"
                            }
                        }),
                        lineRdr.on('close', function () {
                            if (runTimeDisplayFlag) {
                                var Case_Elapsed_Time = elapsed_time_of_each_TC(Curr_TCName, 'results_output');
                                tdCase = "<tr id=" + Curr_TCName + " class='section'><td id='test_case_name' colspan='2'>" + Curr_TCName + " : " + Case_Desc_Det + "</td>" +
                                    "<td id='test_case_time' align='center' colspan='2'>Run Time- " + Case_Elapsed_Time + "</td></tr>";
                                report_name = "details_result_report_" + csv + "_" + timeStamp + ".htm";
                            } else {
                                tdCase = "<tr id=" + Curr_TCName + " class='section'><td id='test_case_name' colspan='2'>" + Curr_TCName + " : " + Case_Desc_Det + "</td>" +
                                    "<td id='test_case_time' align='center' colspan='2'></td></tr>";
                                report_name = "details_result_report_" + csv + ".htm";
                            }
                            $("#SignIn_Form_Entry0").append(tdCase);
                            $("#SignIn_Form_Entry0").append(tdSteps);
                            $("#expanding").append(js_content);
                            tdCase = "";
                            tdSteps = "";
                            Sr_NO = 1;
                            Passed = TestStepsCount - Failed;
                            $("#step_passed").text(Passed);
                            $("#step_failed").text(Failed);
                            Failed = 0;
                            fs.writeFileSync(reporterPath + global.SUITENAME + '-' + global.TIMESTAMP + "/" + report_name, window.document.documentElement.outerHTML);
                            resolve();
                        })
                }
            });
        });
    });
}

function summaryReport(csv, fn) {
    return new Promise(function (resolve) {
        pushSumData(csv).then(function () {
            fs.readFile(reporterPath + 'report_assets/Template_Summary_Results.html', function (err, data) {
                if (err) {
                    throw err;
                }

                Start_Time = global.STARTED_TIMESTAMP;
                End_Time = global.FINISHED_TIMESTAMP;
                Elapsed_Time = getTimeDiffernceInMilliSeconds(Start_Time, End_Time);
                Environment_Name = genericData["appURL"];
                Date_Time = global.STARTED_TIMESTAMP;
                Suite_Execut = global.SUITENAME;
                OS_Name=global.platform;
                Host_Name=global.process.env.COMPUTERNAME;
                
                jsdom.env({
                    html: data,
                    scripts: [libraryPath+'/jquery-2.2.4.min.js'],
                    done: function (domErr, window) {
                        if (domErr) throw domErr;
                        var $ = window.jQuery;
                        Total_Failed = 0;
                        Case_NO = 0;
                        $("#host_name").text(Host_Name);
                        $("#environment_name").text(Environment_Name);
                        $("#suite_executed").text(Suite_Execut);
                        $("#browser").text(Browser_Name);
                        $("#date_time").text(Date_Time);
                        $("#os_name").text(OS_Name);
                        $("#elapsed_time").text(Elapsed_Time);
                        $("#started_time").text(Start_Time);
                        $("#ended_time").text(End_Time);
                        $.each(csvData, function (key, value) {
                            var specData = key.split("*");
                            Case_NO++;
                            if (value == "Pass") {
                                Case_Step = specData[0];
                                Case_Desc_Sum = specData[1];
                                var Image_Src = reporterPath + "report_assets/passed.ico";
                                var trCases = "";
                                trCases = trCases + "<tr class='content2'><td>" + Case_NO + "</td>" +
                                    "<td class='justified' id='case_step_name'><a onclick=window.open('" + fn + '?currTC=' + Case_Step + "') href='#'>" + Case_Step + "</a></td>" +
                                    "<td class='justified' id='case_step_details'>" + Case_Desc_Sum + "</td>" +
                                    "<td class='Pass' align='center'><img  id='status_image' src=" + Image_Src + " width='18' height='18'/></td></tr>";
                                $("#case_summary").append(trCases);
                            }
                            if (value == "Fail") {
                                Total_Failed++;
                                Case_Step = specData[0];
                                Case_Desc_Sum = specData[1];
                                var Image_Src = reporterPath + "/report_assets/failed.ico";
                                var trCases = "";
                                trCases = trCases + "<tr class='content2'><td>" + Case_NO + "</td>" +
                                    "<td class='justified' id='case_step_name'><a onclick=window.open('" + fn + '?currTC=' + Case_Step + "') href='#'>" + Case_Step + "</a></td>" +
                                    "<td class='justified' id='case_step_details'>" + Case_Desc_Sum + "</td>" +
                                    "<td class='Pass' align='center'><img  id='status_image' src=" + Image_Src + " width='18' height='18'/></td></tr>";
                                $("#case_summary").append(trCases);
                            }
                            $("#total_suites").text(Case_NO);
                            var passed = (Case_NO - Total_Failed);
                            $("#passed_suites").text(passed);
                            $("#failed_suites").text(Total_Failed);

                            $("#passed_charts").text(passed);
                            $("#failed_charts").text(Total_Failed);
                            report_name = "summary_result_report_" + timeStamp + ".html";
                            Jsum_report_name = "SummaryReport.html";
                            fs.writeFileSync(reporterPath + global.SUITENAME + '-' + global.TIMESTAMP + "/" + Jsum_report_name, window.document.documentElement.outerHTML);
                        });
                    }
                });
            });
            resolve();
            console.log("***********************Summary Results Completed***********************");
        });
    });
}

//To prepare an array which will contain Pass/Fail status of each test case.
function pushSumData(csv) {
    return new Promise(function (resolve) {
        var lineRdr = require("readline").createInterface({
            input: fs.createReadStream(reporterPath + 'report_assets/' + csv + '.csv')
        });
        var line_arr;
        lineRdr.on('line', function (line) {
            line_arr = line.split(",");
            Case_Desc_Sum = line_arr[COL_DESC];
            Curr_TCName = line_arr[COL_TCID];
            if (csvData[Curr_TCName + "*" + Case_Desc_Sum] == undefined) {
                if (line_arr[COL_STATUS].includes("PASS")) {
                    csvData[Curr_TCName + "*" + Case_Desc_Sum] = "Pass";
                } else {
                    csvData[Curr_TCName + "*" + Case_Desc_Sum] = "Fail";
                }
            } else {
                if (line_arr[COL_STATUS].includes("FAIL")) {
                    csvData[Curr_TCName + "*" + Case_Desc_Sum] = "Fail";
                }
            }
        });
        lineRdr.on('close', function () {
            resolve();
        });
    });
}

function emailSumReport(email_content) {
    return new Promise(function (resolve) {
        fs.readFile(reporterPath + 'report_assets/JSumEmailResult.html', function (err, data) {
            if (err) {
                throw err;
            }
            jsdom.env({
                html: data,
                scripts: [libraryPath+'/jquery-2.2.4.min.js'],
                done: function (domErr, window) {
                    if (domErr) throw domErr;
                    var $ = window.jQuery;
                    $("#host_name").text(Host_Name);
                    $("#environment_name").text(Environment_Name);
                    $("#suite_executed").text(Suite_Execut);
                    $("#browser").text(Browser_Name);
                    $("#date_time").text(Date_Time);
                    $("#os_name").text(OS_Name);
                    $("#started_time").text(First_Test_Start_Time);
                    $("#ended_time").text(Last_Test_End_Time);
                    $("#elapsed_time").text(SUMM_Elapsed_Time);
                    $("#case_summary").append(email_content);
                    email_content = "";
                    $("#total_suites").text(Case_NO);
                    var passed = (Case_NO - Total_Failed);
                    $("#passed_suites").text(passed);
                    $("#failed_suites").text(Total_Failed);
                    Jsum_emailreport = "EmailReport.html";
                    fs.writeFileSync(reporterPath + global.SUITENAME + '-' + global.TIMESTAMP + "/" + Jsum_emailreport, window.document.documentElement.outerHTML);
                    resolve();
                }
            });
        });
        console.log("***********************Email Results Completed***********************");
    });
}

function cleaningCSV(csv) {
    fs.truncateSync(reporterPath + 'report_assets/' + csv + '.csv', 0);
    fs.truncateSync(reporterPath + 'report_assets/CSV_FailedTestList.csv', 0);
}

function mergingSubFilesIntoCSV(csv) {
    var Browser_Name;
    fs.readFile(reporterPath + 'report_assets/' + csv + '.csv', 'utf8', function (error, data) {
        if (error) {
            console.log('**************error**************' + error);
        }
        var line1 = data.split('\n')[0];
        var line_arr = line1.split(",");
        Browser_Name = line_arr[0];

        if (Browser_Name == 'INTERNET EXPLORER') {
            Browser_Name = 'IE';
        }
        fs.appendFile(reporterPath + 'report_assets/CSV_Merge_' + Browser_Name + '.csv', data, function (err) {
            if (err) throw err;
        });
    });
}

function storeScreenShot(data, file) {
    var stream = fs.createWriteStream(file);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}

function append_data_into_csv(data, file_name) {
    fs.appendFile(reporterPath + 'report_assets/' + file_name + '.csv', data, function (err) {
        if (err) throw err;
    });
}

//Function to convert milliseconds to minutes and seconds.
//Returns a string in format of 14 Min : 15 Sec
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    if (parseInt(seconds) == 60) {
        minutes = minutes + 1;
        seconds = '0';
    }
    return minutes + " Mins" + " : " + (parseInt(seconds) < 10 ? '0' : '') + seconds + " Secs";
}

// Function to calculate Time difference between two dates in milliseconds.
function getTimeDiffernceInMilliSeconds(start_time, end_time) {
    var elapsde_time_msec = convertStringToDate(end_time) - convertStringToDate(start_time);
    return millisToMinutesAndSeconds(elapsde_time_msec);
}

//Function to return Date from given string
//Expected string format 06-01-2016 11:25:40:897 AM
function convertStringToDate(dateString) {
    var timeIndex = dateString.indexOf(" ");
    var year = dateString.substring((timeIndex - 4), (timeIndex));
    var day = dateString.substring((timeIndex - 10), (timeIndex - 8));
    var month = (dateString.substring((timeIndex - 7), (timeIndex - 5)) - 1);
    var hour = dateString.substring((timeIndex + 1), (timeIndex + 3));
    var minute = dateString.substring((timeIndex + 4), (timeIndex + 6));
    var second = dateString.substring((timeIndex + 7), (timeIndex + 9));
    var milliSecond = dateString.substring((timeIndex + 10), (timeIndex + 13));
    return new Date(year, month, day, hour, minute, second, milliSecond);
}

// Function to calculate elapsed time based on Test Case ID.
function elapsed_time_of_each_TC(TC_ID, JSON_FILE) {
    var data = require(resultsPath+'/CignitiReport/report_assets/' + JSON_FILE + '.json');
    var elapsedTime = 0;
    data.forEach(function (key) {
        if (key.description.indexOf(TC_ID) > -1) {
            elapsedTime = elapsedTime + parseInt(key.duration);
        }
    });
    elapsedTime = millisToMinutesAndSeconds(elapsedTime);
    return elapsedTime;
}