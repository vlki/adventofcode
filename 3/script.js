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
    var space = { 0: { 0: 1 }};
    var santa = { x: 0, y: 0 };
    var roboSanta = { x: 0, y: 0 };

    inputData.split('').forEach(function(inputChar, inputCharIndex) {
        var who = ((inputCharIndex % 2) === 0) ? santa : roboSanta;

        switch(inputChar) {
            case '>': who.x += 1; break;
            case '<': who.x -= 1; break;
            case '^': who.y += 1; break;
            case 'v': who.y -= 1; break;
            default:
                return;
        }

        if (!space[who.x]) space[who.x] = {};
        if (!space[who.x][who.y]) space[who.x][who.y] = 0;
        space[who.x][who.y]++;
    });

    var numHousesWithPresents = 0;
    Object.keys(space).forEach(function(spaceX) {
        Object.keys(space[spaceX]).forEach(function(spaceY) {
            console.log('House at [' + spaceX + ',' + spaceY + ']: ' + space[spaceX][spaceY]);
            numHousesWithPresents++;
        });
    });

    console.log('# houses with 1+ presents: ' + numHousesWithPresents);
}
