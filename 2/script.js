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
    var presents = inputData.split("\n");
    var neededWrappingPaper = 0;
    var neededRibbon = 0;

    presents.forEach(function(present) {
        // ditch empty lines
        if (!present) return;

        var presentDimensions = present.split('x').map(function(dimension) {
            return parseInt(dimension, 10);
        });

        var presentSidesSizes = [];
        var smallestSideDimensions = [presentDimensions[0], presentDimensions[1]];
        [[0, 1], [1, 2], [0, 2]].forEach(function(sideDimensionIndexes) {
            presentSidesSizes.push(presentDimensions[sideDimensionIndexes[0]] * presentDimensions[sideDimensionIndexes[1]]);

            var sideDimensions = [presentDimensions[sideDimensionIndexes[0]], presentDimensions[sideDimensionIndexes[1]]];
            // console.log('side dimensions: ' + sideDimensions);
            if ((sideDimensions[0] + sideDimensions[1]) < (smallestSideDimensions[0] + smallestSideDimensions[1])) {
                // console.log('compare: ' + (sideDimensions[0] + sideDimensions[1]) + ' vs ' + (smallestSideDimensions[0] + smallestSideDimensions[1]));
                smallestSideDimensions = sideDimensions;
            }
        });

        // cover the whole present
        neededWrappingPaper += presentSidesSizes.reduce(function(result, sideSize) { return result + 2*sideSize; }, 0);

        // plus size of smallest side
        neededWrappingPaper += presentSidesSizes.reduce(function(result, sideSize) { return (sideSize < result) ? sideSize : result }, presentSidesSizes[0]);

        // ribbon is around the perimeter of smallest side
        // console.log('smallest side perimeter: ' + (smallestSideDimensions[0]*2 + smallestSideDimensions[1]*2));
        neededRibbon += smallestSideDimensions[0]*2 + smallestSideDimensions[1]*2;

        // and additional ribbon is the volume of present
        console.log('volume: ' + (presentDimensions[0] * presentDimensions[1] * presentDimensions[2]));
        neededRibbon += presentDimensions[0] * presentDimensions[1] * presentDimensions[2];
    });

    console.log('Needed wrapping paper: ' + neededWrappingPaper);
    console.log('Needed ribbon: ' + neededRibbon);
}
