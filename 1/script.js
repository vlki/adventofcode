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

function _compute(data) {
    var floor = 0;
    var lowestFloor = floor;
    var lowestFloorPosition;
    var basementFloor = -1;
    var basementFloorFirstEntryPosition = null;
    data.split('').forEach(function(inputChar, inputCharIndex) {
        if (inputChar === '(') {
            floor++;
        } else if (inputChar === ')') {
            floor--;
            if (floor < lowestFloor) {
                lowestFloor = floor;
                lowestFloorPosition = inputCharIndex + 1;
            }

            if (floor === basementFloor && basementFloorFirstEntryPosition === null) {
                basementFloorFirstEntryPosition = inputCharIndex + 1;
            }
        }
    });

    console.log('Floor at the end: ' + floor);
    console.log('Lowest floor: ' + lowestFloor);
    console.log('Lowest floor entry position: ' + lowestFloorPosition);
    console.log('Basement floor first entry position: ' + basementFloorFirstEntryPosition);
};
