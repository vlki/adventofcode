#!/usr/bin/env node

var md5 = require('md5-jkmyers');
var secretKey = 'ckczppom';
var i = 1;
var hash;
var testString;

do {
    console.log('checking num: ' + i);
    testString = secretKey + i;
    hash = md5(testString);
    i++;
} while(hash.substr(0, 6) !== '000000');

console.log('md5 of "' + testString + '" is "' + hash + '"');
