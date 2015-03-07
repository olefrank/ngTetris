;(function() {

    "use strict";

    function actionService() {
        var actionService = {
            moveHorizontal: moveHorizontal,
            moveDown: moveDown,
            rotate: rotate,
            landTetromino: landTetromino,
            clearLines: clearLines
        };
        function moveHorizontal(tetromino, moveX) {
            tetromino.topLeft.x += moveX;
            tetromino.screenPosition.x = tetromino.topLeft.x * 20 + 1;
            console.log("moved " + (moveX>0 ? "right" : "left"));
        }
        function moveDown(tetromino) {
            tetromino.topLeft.y++;
            tetromino.screenPosition.y = tetromino.topLeft.y * 20 + 1;
            console.log("moved down");
        }
        function rotate(tetromino) {
            tetromino.shape = rotateMatrixCW(tetromino.shape);
            console.log("rotated");
        }
        function rotateMatrixCW(matrix) {
            var temp = transposeMatrix(matrix);
            return reverseColsInMatrix(temp);
        }
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
        function transposeMatrix(matrix) {
            return Object.keys(matrix[0]).map(
                function (c) {
                    return matrix.map(function (r) {
                        return r[c];
                    });
                }
            );
        }
        function landTetromino(grid, tetromino) {
            var gridX,
                gridY;

            for (var y = 0; y < tetromino.shape.length; y++) {
                for (var x = 0; x < tetromino.shape[y].length; x++) {
                    if (tetromino.shape[y][x] === 1) {
                        gridY = tetromino.topLeft.y + y;
                        gridX = tetromino.topLeft.x + x;
                        grid[gridY][gridX] = 1;
                    }
                }
            }
            console.log("tetromino landed in grid");
            return grid;
        }
        function clearLines(grid) {
            var clearLine,
                numLinesRemoved = 0;

            // loop through grid, bottom up
            for (var y = grid.length-1; y >= 0; y--) {
                clearLine = true;
                for (var x = 0; x < grid[y].length; x++) {
                    if (grid[y][x] === 0) {
                        clearLine = false;
                    }
                }
                if (clearLine) {
                    // remove line
                    grid.splice(y, 1);
                    numLinesRemoved++;
                }
            }
            // insert removed lines in top
            while (numLinesRemoved > 0) {
                grid.unshift([0,0,0,0,0,0,0,0,0,0]);
                numLinesRemoved--;
            }
            return grid;
        }
        return actionService;
    }
    angular
        .module("app")
        .factory("actionSvc", actionService);
})();