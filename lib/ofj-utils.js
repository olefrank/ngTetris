function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

// find next index in array avoiding "Index Out Of Bounds"
function nextIndex(index, length) {
    return ( (index) % length + length) % length;
}

// swap elements in array
function swapElements (arr, x, y) {
    var b = arr[x];
    arr[x] = arr[y];
    arr[y] = b;

    return arr;
}

// shuffle array
function shuffleArray(arr) {
    for (var j, x, i = newArr.length; i; j = Math.floor(Math.random() * i), x = newArr[--i], newArr[i] = newArr[j], newArr[j] = x);
    return arr;
}

// shuffle 2d array
function shuffle2dArray(arr) {
    // convert to 1d array
    var newArr = [];
    for (var a = 0; a < arr.length; a++) {
        newArr = newArr.concat(arr[a]);
    }

    // shuffle algorithm
    for (var j, x, i = newArr.length; i; j = Math.floor(Math.random() * i), x = newArr[--i], newArr[i] = newArr[j], newArr[j] = x);

    // convert back to 2d
    var result = [];
    var subArr = [];
    var rowCount = 0;

    for (var b = 0; b < newArr.length; b++) {
        if (b % arr.length === 0) {
            subArr = [];
        }

        subArr.push(newArr[b]);
        rowCount++;

        if (rowCount === arr.length) {
            result.push(subArr);
            rowCount = 0;
        }
    }

    return result;
}

function secondsToHMS(secs) {
    secs = Number(secs);
    
    var h = Math.floor(secs / 3600);
    var m = Math.floor(secs % 3600 / 60);
    var s = Math.floor(secs % 3600 % 60);
    
    return ( 
        (h > 0 ? (h >= 10 ? h : '0' + h): '00') + ':' + 
        (m > 0 ? (m >= 10 ? m : '0' + m): '00') + ':' + 
        (s > 0 ? (s >= 10 ? s : '0' + s): '00') 
    );
}

/**
 * Generate a random number between 'min' and 'max'
 * @param min: optional
 * @param max: option
 * @returns {number} random number
 */
function randomIntFromInterval(min,max) {
    if (typeof max == "undefined") {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random()*(max-min+1)+min);
}

/**
 * Generate new array prefilled with a value
 * @param length: how long the new array should be
 * @param value: value to fill new array with (0, "a"...)
 * @returns {Array} ex: [0, 0, 0, 0, 0], ["a", "a", "a"]
 */
function createFilledArray(length, value) {
    return Array.apply(null, new Array(length)).map(Number.prototype.valueOf,value);
};

/**
 * Pick random property from object
 * @param obj the object to get random property from
 * @returns {*} a property from the object
 */
function randomPropertyFromObject(obj) {
    var keys = Object.keys(obj)
    return obj[ keys[ keys.length * Math.random() << 0 ] ];
};

/**
 * Transpose matrix/2d array (reflect matrix over its main diagonal)
 * see http://en.wikipedia.org/wiki/Transpose
 * @param matrix Matrix to transpose
 * @returns {Matrix} Transposed matrix
 */
// helper
function transposeMatrix(matrix) {
    return Object.keys(matrix[0]).map(
        function (c) { return matrix.map(function (r) { return r[c]; }); }
    );
}

// helper
function reverseRowsInMatrix(matrix) {
    var result = [];
    for (var i = 0; i < matrix.length; i++) {
        var row = [];
        for (var j = matrix[i].length-1; j >= 0; j--) {
            row.push(matrix[i][j]);
        }
        result.push(row);
    }
    return result;
}
// helper
function reverseColsInMatrix(matrix) {
    var result = [];
    for (var i = matrix.length-1; i >= 0; i--) {
        var row = [];
        for (var j = 0; j < matrix[i].length; j++) {
            row.push(matrix[i][j]);
        }
        result.push(row);
    }
    return result;
}

/**
 * See http://stackoverflow.com/a/8664879/1736012
 * @param matrix
 * @returns {*}
 */
function rotateMatrixCW(matrix) {
    var temp = transposeMatrix(matrix);
    return reverseColsInMatrix(temp);
}

/**
 * See http://stackoverflow.com/a/8664879/1736012
 * @param matrix
 * @returns {*}
 */
function rotateMatrixCCW(matrix) {
    var temp = transposeMatrix(matrix);
    return reverseRowsInMatrix(temp);
}