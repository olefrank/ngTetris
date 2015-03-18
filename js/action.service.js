;(function() {

    "use strict";

    function actionService(collisionSvc, tetrisService, scoreSvc, tetrominoSvc, $interval) {

        var service = {
            moveRight: moveRight,
            moveLeft: moveLeft,
            moveDown: moveDown,
            rotate: rotate,
            landTetromino: landTetromino,
            clearLines: clearLines,
            insertEmptyRows: insertEmptyRows,
            gameOver: gameOver
        };

        return service;

        function moveRight(grid, tetromino) {
            var moveX = 1;
            if (!collisionSvc.isCollisionHorizontal(grid, tetromino, moveX)) {
                tetromino.topLeft.x += moveX;
                tetromino.screenPosition.x = (tetromino.topLeft.x * 20) + (tetromino.topLeft.x * 2);
//                console.log("moved right");
            }
        }

        function moveLeft(grid, tetromino) {
            var moveX = -1;
            if (!collisionSvc.isCollisionHorizontal(grid, tetromino, moveX)) {
                tetromino.topLeft.x += moveX;
                tetromino.screenPosition.x = (tetromino.topLeft.x * 20) + (tetromino.topLeft.x * 2);
//                console.log("moved left");
            }
        }

        function moveDown(grid, tetromino) {
            if ( collisionSvc.isCollisionVertical(grid, tetromino) ) {

                if (collisionSvc.isGameOver(tetromino)) {
                        gameOver();
                }
                else {
                    // copy tetromino to 'landed' grid
                    grid = landTetromino(grid, tetromino);

                    // remove lines if necessary
                    var gridCleared = clearLines(grid);
                    var numLinesCleared = grid.length - gridCleared.length;

                    // update score
                    scoreSvc.updateScore(numLinesCleared);

                    // insert blank rows in top of grid
                    grid = insertEmptyRows(numLinesCleared, gridCleared);

                    // set grid
                    tetrisService.setGrid(grid);

                    // new tetromino
                    tetromino = tetrominoSvc.updateQueue();
                    tetrisService.setTetromino(tetromino);
                }
            }
            else {
                tetromino.topLeft.y++;
                tetromino.screenPosition.y = (tetromino.topLeft.y * 20) + (tetromino.topLeft.y * 2);
                tetrisService.setTetromino(tetromino);
//                console.log("moved down");
            }
        }

        function rotate(grid, tetromino) {
            var rotatedTetromino = angular.copy(tetromino);
            rotatedTetromino.shape = rotateMatrixCW(rotatedTetromino.shape);
            if ( !collisionSvc.isCollisionRotation(grid, rotatedTetromino) ) {
                tetrisService.setTetromino(rotatedTetromino);
//                console.log("rotated");
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
        function landTetromino() {
            var grid = tetrisService.getGrid(),
                tetromino = tetrisService.getTetromino();

            var gridX,
                gridY;

            for (var y = 0; y < tetromino.shape.length; y++) {
                for (var x = 0; x < tetromino.shape[y].length; x++) {
                    if (tetromino.shape[y][x] === 1) {
                        gridY = tetromino.topLeft.y + y;
                        gridX = tetromino.topLeft.x + x;
                        grid[gridY][gridX].value = 1;
                        grid[gridY][gridX].class = tetromino.class;
                    }
                }
            }
            tetrisService.setGrid(grid);
//            console.log("tetromino landed in grid");
            return grid;
        }
        function clearLines(grid) {
            var clearLine = true,
                result = angular.copy(grid);

            // loop through grid, bottom up
            for (var y = grid.length - 1; y >= 0; y--) {
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
            console.log(grid);
            // insert removed lines in top
            while (num > 0) {
                grid.unshift([
                    {class: "", value: 0},
                    {class: "", value: 0},
                    {class: "", value: 0},
                    {class: "", value: 0},
                    {class: "", value: 0},
                    {class: "", value: 0},
                    {class: "", value: 0},
                    {class: "", value: 0},
                    {class: "", value: 0},
                    {class: "", value: 0}
                ]);
                num--;
            }
            return grid;
        }

        function gameOver() {
            var loop = tetrisService.getLoop();
            $interval.cancel(loop);
            tetrisService.setLoop(null);
            console.log("game over");
        }

    }
    angular
        .module("app")
        .factory("actionSvc", actionService);
})();