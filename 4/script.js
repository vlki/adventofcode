#!/usr/bin/env node

var md5 = require('md5-jkmyers');
var secretKey = 'ckczppom';
var i = 1;
var hash;
var testString;

do {
    testString = secretKey + i;
    hash = md5(testString);
} while(hash.substr(0, 5) === '00000');
