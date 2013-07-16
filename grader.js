#!/usr/bin/env node
var fs = require('fs'); //including  various libaries
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var rest = require('restler');
var URL_DEFAULT = "myurl";



var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.",instr);
        process.exit(1);
    }
    return instr;
};

var assertUrlExists = function() {
    rest.get(program.url).on('complete',function(result) {
        return checkUrl(result);
        });
};

var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};

var cheerioUrl = function(url) { 
    return cheerio.load(fs.readFileSync(url));
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};

var checkUrl = function(url, checksfile) {
    $ = cheerioUrl(url);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};

var clone = function(fn) {
    return fn.bind({});
};

if(require.main == module) {
    program
    .option('-u, --url <url_location>', 'URL to index.html', assertUrlExists, HTMLFILE_DEFAULT)
        .option('-c, --checks <check_file>', '~/bitstarter/checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
        .option('-f, --file <html_file>', '~/bitstarter/index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
        .option('-u, --url ', 'myurl', clone(assertUrlExists), URL_DEFAULT)
    .parse(process.argv);
    var checkJson = checkUrl(program.url, program.checks);
    var outJson = JSON.stringify(checkJson, null, 4);
    console.log(outJson);
}
else {
    exports.checkUrl = checkUrl;
}
