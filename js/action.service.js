;(function() {

    "use strict";

    function actionService(collisionSvc) {
        var actionService = {
            moveHorizontal: moveHorizontal,
            moveDown: moveDown,
            rotate: rotate,
            landTetromino: landTetromino,
            clearLines: clearLines,
            insertEmptyRows: insertEmptyRows
        };
        function moveHorizontal(grid, tetromino, moveX) {
            if (!collisionSvc.isCollisionHorizontal(grid, tetromino, moveX)) {
                tetromino.topLeft.x += moveX;
                tetromino.screenPosition.x = tetromino.topLeft.x * 20 + 1;
                console.log("moved " + (moveX > 0 ? "right" : "left"));
            }
            return tetromino;
        }
        function moveDown(grid, tetromino) {
            if (!collisionSvc.isCollisionVertical(grid, tetromino)) {
                tetromino.topLeft.y++;
                tetromino.screenPosition.y = tetromino.topLeft.y * 20 + 1;
                console.log("moved down");
            }
            return tetromino;
        }
        function rotate(grid, tetromino) {
            var rotatedTetromino = angular.copy(tetromino);
            rotatedTetromino.shape = rotateMatrixCW(rotatedTetromino.shape);
            if ( !collisionSvc.isCollisionHorizontal(grid, rotatedTetromino, 0) && !collisionSvc.isCollisionVertical(grid, rotatedTetromino) ) {
                return rotatedTetromino;
                console.log("rotated");
            }
            else {
                return tetromino;
            }
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
                        grid[gridY][gridX].value = 1;
                        grid[gridY][gridX].color = tetromino.color;
                    }
                }
            }
            console.log("tetromino landed in grid");
            return grid;
        }
        function clearLines(grid) {
            var clearLine,
                result = angular.copy(grid);

            // loop through grid, bottom up
            for (var y = grid.length-1; y >= 0; y--) {
                clearLine = true;
                for (var x = 0; x < grid[y].length; x++) {
                    if (grid[y][x].value === 0) {
                        clearLine = false;
                    }
                }
                if (clearLine) {
                    // remove line
                    result.splice(y, 1);
                }
            }
            return result;
        }
        function insertEmptyRows(num, grid) {
            // insert removed lines in top
            while (num > 0) {
                grid.unshift([0,0,0,0,0,0,0,0,0,0]);
                num--;
            }
            return grid;
        }
        return actionService;
    }
    angular
        .module("app")
        .factory("actionSvc", actionService);
})();