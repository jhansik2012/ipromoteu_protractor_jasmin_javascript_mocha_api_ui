'use strict';
module.exports = {
  /*To get the Date*/
  getDate: function (noOfDays) {
      var d = new Date();
      d.setDate(d.getDate() + Number(noOfDays));
      var day = d.getDate();
      var month = (d.getMonth() + 1);
      var year = d.getFullYear();
      if (day < 10) {
          day = "0" + day;
      }
      if (month < 10) {
          month = "0" + month;
      }
      return month + '/' + day + '/' + year;
  },
    verifyMessage: function (value1, value2, logname) {
        var text = (logname ? logname : 'Verify Message');
        if (value1.indexOf(value2) > -1) {
            reporter.appendTest(text, 'Verifying if "' + value2 + '" is present in Banner Message', "PASS");
        }
        else {
            reporter.appendTest(text, 'Verifying if "' + value2 + '" is present in Banner Message failed, banned message is: "' + value1 + '"', "FAIL");
            expect(false).toReport(true, "Expecting " + value2 + " is present in in Banner Message :failed.");
        }
    }
};
