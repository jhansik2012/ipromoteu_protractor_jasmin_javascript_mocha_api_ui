/*global document, window, alert, console, require, browser,jasmine,
 requirePage, requireData, requireConfig, requireLibrary,
 describe, it, beforeEach, forEach, by, jshint, expect, element, result*/
/*jshint node: true, camelcase: false*/
/*global require: true*/
'use strict';

var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  foreach = require('gulp-foreach'),
  gulpProtractorAngular = require('gulp-angular-protractor'),
  gulpStart = gulp.Gulp.prototype.start,
  currentStartTaskName;

gulp.Gulp.prototype.start = function (task) {
  currentStartTaskName = task;
  gulpStart.apply(this, arguments);
};

function executeWebTests(suiteName, appName) {
  return gulp.src([])
    .pipe(gulpProtractorAngular({
      'configFile': './conf.js',
      'debug': false,
      'autoStartStopServer': false,
      args: [
        '--suite', suiteName,
        '--capabilities.browserName', 'chrome',
        '--params.APPNAME', appName,
        '--params.SUITENAME', currentStartTaskName,
        '--capabilities.platformName', 'Windows'
      ],
      keepAlive: false
    }))
    .on('error', function (e) {
      console.log('Ended with below ERROR::', e);
      process.exit(1);
    })
    .on('end', function () {
      console.log('Test complete');
      process.exit();
    });
}

function executeIEWebTests(suiteName, appName) {
  return gulp.src([])
    .pipe(gulpProtractorAngular({
      'configFile': './conf.js',
      'debug': false,
      'autoStartStopServer': false,
      args: [
        '--suite', suiteName,
        '--capabilities.browserName', 'internet explorer',
        '--capabilities.version', '11',
        '--params.APPNAME', appName,
        '--params.SUITENAME', currentStartTaskName,
        '--capabilities.platformName', 'Windows'
      ],
      keepAlive: false
    }))
    .on('error', function (e) {
      console.log('Ended with below ERROR::', e);
      process.exit(1);
    })
    .on('end', function () {
      console.log('Test complete');
      process.exit();
    });
}

gulp.task('RegressionTests', ['JShint'], function () {
  executeIEWebTests('RegressionTests', 'iPROMOTEu');
});

gulp.task('JobsHomePageScenariosTest', ['JShint'], function () {
  executeIEWebTests('JobsHomePageTests', 'iPROMOTEu');
});

gulp.task('LoginTests', ['JShint'], function () {
  executeIEWebTests('LoginTests', 'iPROMOTEu');
});

/////
gulp.task('contactDetails', ['JShint'], function () {
  executeIEWebTests('contactDetails', 'iPROMOTEu');
});
gulp.task('ContactsList', ['JShint'], function () {
  executeIEWebTests('ContactsList', 'iPROMOTEu');
});
gulp.task('CreateJob', ['JShint'], function () {
  executeIEWebTests('CreateJob', 'iPROMOTEu');
});

gulp.task('CreateJobASI', ['JShint'], function () {
  executeIEWebTests('CreateJobASI', 'iPROMOTEu');
});
gulp.task('CreatePO', ['JShint'], function () {
  executeIEWebTests('CreatePO', 'iPROMOTEu');
});
gulp.task('DecorationDetails', ['JShint'], function () {
  executeIEWebTests('DecorationDetails', 'iPROMOTEu');
});


gulp.task('BillingCustomerDetails', ['JShint'], function () {
  executeIEWebTests('BillingCustomerDetails', 'iPROMOTEu');
});
gulp.task('customerList', ['JShint'], function () {
  executeIEWebTests('customerList', 'iPROMOTEu');
});
gulp.task('Lists', ['JShint'], function () {
  executeIEWebTests('Lists', 'iPROMOTEu');
});
gulp.task('NewCustomer', ['JShint'], function () {
  executeIEWebTests('NewCustomer', 'iPROMOTEu');
});
gulp.task('ShippingCustomerDetails', ['JShint'], function () {
  executeIEWebTests('ShippingCustomerDetails', 'iPROMOTEu');
});


gulp.task('EditJob', ['JShint'], function () {
  executeIEWebTests('EditJob', 'iPROMOTEu');
});
gulp.task('GlobalSearch', ['JShint'], function () {
  executeIEWebTests('GlobalSearch', 'iPROMOTEu');
});


gulp.task('vendors', ['JShint'], function () {
  executeIEWebTests('vendors', 'iPROMOTEu');
});

gulp.task('JobDetails_Documents', ['JShint'], function () {
  executeIEWebTests('JobDetails_Documents', 'iPROMOTEu');
});
gulp.task('JobDetails_Finance', ['JShint'], function () {
  executeIEWebTests('JobDetails_Finance', 'iPROMOTEu');
});
gulp.task('JobDetails_Reminder', ['JShint'], function () {
  executeIEWebTests('JobDetails_Reminder', 'iPROMOTEu');
});
gulp.task('JobDetails_Shipment', ['JShint'], function () {
  executeIEWebTests('JobDetails_Shipment', 'iPROMOTEu');
});
gulp.task('JobDetails_Screen', ['JShint'], function () {
  executeIEWebTests('JobDetails_Screen', 'iPROMOTEu');
});

gulp.task('JobsScreen', ['JShint'], function () {
  executeIEWebTests('JobsScreen', 'iPROMOTEu');
});


gulp.task('LineItemDetails', ['JShint'], function () {
  executeIEWebTests('LineItemDetails', 'iPROMOTEu');
});
gulp.task('AddProduct', ['JShint'], function () {
  executeIEWebTests('AddProduct', 'iPROMOTEu');
});
gulp.task('ASIProductSearch', ['JShint'], function () {
  executeIEWebTests('ASIProductSearch', 'iPROMOTEu');
});


gulp.task('ASIProductSource', ['JShint'], function () {
  executeIEWebTests('ASIProductSource', 'iPROMOTEu');
});
gulp.task('Login', ['JShint'], function () {
  executeIEWebTests('Login', 'iPROMOTEu');
});
gulp.task('E2ETests', ['JShint'], function () {
  executeIEWebTests('E2ETests', 'iPROMOTEu');
});

//
gulp.task('phase1', ['JShint'], function () {
  executeIEWebTests('phase1', 'iPROMOTEu');
});
gulp.task('phase2', ['JShint'], function () {
  executeIEWebTests('phase2', 'iPROMOTEu');
});
gulp.task('phase002', ['JShint'], function () {
  executeIEWebTests('phase002', 'iPROMOTEu');
});
gulp.task('underDev', ['JShint'], function () {
  executeIEWebTests('underDev', 'iPROMOTEu');
});
gulp.task('SageProducts', ['JShint'], function () {
  executeIEWebTests('SageProducts', 'iPROMOTEu');
});
gulp.task('tc1', ['JShint'], function () {
  executeIEWebTests('tc1', 'iPROMOTEu');
});

gulp.task('tc2', ['JShint'], function () {
  executeIEWebTests('tc2', 'iPROMOTEu');
});
gulp.task('Presentation', ['JShint'], function () {
  executeIEWebTests('Presentation', 'iPROMOTEu');
});
gulp.task('RepeatJob', ['JShint'], function () {
  executeIEWebTests('RepeatJob', 'iPROMOTEu');
});
gulp.task('PresentationList', ['JShint'], function () {
  executeIEWebTests('PresentationList', 'iPROMOTEu');
});
gulp.task('CreatePresentation', ['JShint'], function () {
  executeIEWebTests('CreatePresentation', 'iPROMOTEu');
});
gulp.task('PresentationDetails', ['JShint'], function () {
  executeIEWebTests('PresentationDetails', 'iPROMOTEu');
});
gulp.task('EditPresentation', ['JShint'], function () {
  executeIEWebTests('EditPresentation', 'iPROMOTEu');
});
gulp.task('PresentationPreview', ['JShint'], function () {
  executeIEWebTests('PresentationPreview', 'iPROMOTEu');
});
gulp.task('ConvertPresentation', ['JShint'], function () {
  executeIEWebTests('ConvertPresentation', 'iPROMOTEu');
});
gulp.task('Demo', ['JShint'], function () {
  executeIEWebTests('Demo', 'iPROMOTEu');
});
gulp.task('CustomProducts', ['JShint'], function () {
  executeIEWebTests('CustomProducts', 'iPROMOTEu');
});
gulp.task('BundledPO', ['JShint'], function () {
  executeIEWebTests('BundledPO', 'iPROMOTEu');
});
gulp.task('BlendedPO', ['JShint'], function () {
  executeIEWebTests('BlendedPO', 'iPROMOTEu');
});
gulp.task('JShint', function () {
  gulp.src(['**/*.json', '!node_modules/**/*.*', '!JasmineResult/**/*.*', 'conf.js', 'gulpfile.js', 'library/actionLibrary.js', 'utils/logger.js', 'package.json'])
    .pipe(jshint());
});
