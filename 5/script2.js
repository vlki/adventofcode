#!/usr/bin/env node

var stdin = process.stdin,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputChunks.push(chunk);
});

stdin.on('end', function () {
    var inputData = inputChunks.join();
    _compute(inputData);
});

function _compute(inputData) {
    var isNice;
    var niceWordsCount = 0;
    var naughtyWordsCount = 0;

    inputData.split('\n').forEach(function(word) {
        if (!word) return;

        isNice = true;
        console.log('');
        console.log('== ' + word + ' ==')
        isNice = isNice && _hasLettersPairTwice(word);
        console.log('_hasLettersPairTwice: ' + _hasLettersPairTwice(word));
        isNice = isNice && _hasOneLetterRepeatingWithOneLetterBetween(word);
        console.log('_hasOneLetterRepeatingWithOneLetterBetween: ' + _hasOneLetterRepeatingWithOneLetterBetween(word));

        console.log(word + ' is ' + (isNice ? 'nice' : 'naughty'));

        if (isNice) {
            niceWordsCount++;
        } else {
            naughtyWordsCount++;
        }
    });

    console.log('nice words: ' + niceWordsCount);
    console.log('naughty words: ' + naughtyWordsCount);
}


function _hasLettersPairTwice(word) {
    return word.match(/([a-z][a-z]).*\1/) !== null;
}

function _hasOneLetterRepeatingWithOneLetterBetween(word) {
    return word.match(/([a-z]).\1/) !== null;
}
