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
        isNice = isNice && _hasAtLeastThreeVowels(word);
        console.log('_hasAtLeastThreeVowels: ' + _hasAtLeastThreeVowels(word));
        isNice = isNice && _hasLetterTwiceInRow(word);
        console.log('_hasLetterTwiceInRow: ' + _hasLetterTwiceInRow(word));
        isNice = isNice && _notHaveBadStrings(word);
        console.log('_notHaveBadStrings: ' + _notHaveBadStrings(word));

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


function _hasAtLeastThreeVowels(word) {
    // var numVowels = vowels.reduce(function(numVowels, vowel) {
    //     return (word.indexOf(vowel) !== -1) ? numVowels + 1 : numVowels;
    // }, 0);
    //
    // return numVowels >= 3;
    var vowelMatches = word.match(/[aeiou]/g);

    return vowelMatches && vowelMatches.length >= 3;
}

function _hasLetterTwiceInRow(word) {
    return word.match(/([a-z])\1/) !== null;
}

function _notHaveBadStrings(word) {
    return word.match(/(ab|cd|pq|xy)/) === null;
}
