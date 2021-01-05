var data = require(process.cwd() + '/mochawesome-report/mochawesome.json'),
    testLib = require(process.cwd() + '/src/Api/library/Testlib'),
    statsJsonFile = process.cwd() + '/mochawesome-report/stats.json',
    fs = require('fs'),

    stats = " { \"Suites executed\": '" + data.stats.suites + ',\n    \"Tests executeds\": ' + data.stats.tests +
        ',\n    \"No of test cases passed\": ' + data.stats.passes + ',\n    \"No of test cases failed\": ' + data.stats.failures + "\n }",
    json_stats = testLib.jsonparse(stats);

console.log('json_stats-- ' + json_stats);

fs.writeFile(statsJsonFile, json_stats, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})

