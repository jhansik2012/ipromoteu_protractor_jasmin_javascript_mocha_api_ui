var data = require(process.cwd() + '/mochawesome-report/mochawesome.json'),
    testLib = require(process.cwd() + '/src/Api/library/Testlib'),
    statsJsonFile = process.cwd() + '/mochawesome-report/stats.json',
    fs = require('fs'),
    stats = data.stats,
    json_stats = testLib.jsonstringify(stats);

fs.writeFile(statsJsonFile, json_stats, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})

