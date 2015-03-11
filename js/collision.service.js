;(function() {

    "use strict";

    function collisionService() {
        var collisionService = {
            isCollisionLeft: isCollisionLeft,
            isCollisionRight: isCollisionRight,
            isCollisionVertical: isCollisionVertical,
            isGameOver: isGameOver
        };

        function isCollisionLeft(grid, tetromino, moveX) {
            var potentialY = (tetromino.topLeft.y > 0) ? tetromino.topLeft.y : 0,
                potentialXLeft;

            // grid left
            potentialXLeft = tetromino.topLeft.x + moveX;
            if (potentialXLeft < 0) {
                console.log("collision: GRID LEFT");
                return true;
            }

            // other tetromino
            potentialXLeft = tetromino.topLeft.x - 1;
            for (var y = 0; y < tetromino.shape.length; y++) {
                potentialY += y;

                if (grid[potentialY][potentialXLeft].value === 1 && tetromino.shape[y][0] === 1) {
                    console.log("collision: LEFT");
                    return true;
                }
            }

            return false;
        }

        function isCollisionRight(grid, tetromino, moveX) {
            var potentialY = (tetromino.topLeft.y > 0) ? tetromino.topLeft.y : 0,
                potentialXRight;

            // grid right
            potentialXRight = tetromino.topLeft.x + tetromino.shape[0].length - 1 + moveX;
            if (potentialXRight >= grid[0].length) {
                console.log("collision: GRID RIGHT");
                return true;
            }

            // other tetromino
            potentialXRight = tetromino.topLeft.x + tetromino.shape[0].length;
            for (var y = 0; y < tetromino.shape.length; y++) {
                potentialY += y;

                if (typeof grid[potentialY][potentialXRight] === "undefined") {
                    console.log("collision: RIGHT");
                    return true;
                }
                else if (grid[potentialY][potentialXRight].value === 1 &&
                    tetromino.shape[y][tetromino.shape[0].length-1] ===  1) {
                    console.log("collision: RIGHT");
                    return true;
                }
            }
            return false;
        }

        function isCollisionVertical(grid, tetromino) {
            var tetrominoPotentialY = tetromino.topLeft.y + tetromino.shape.length + 1,
                gridPotentialY = tetromino.topLeft.y + 1,
                gridPotentialX = tetromino.topLeft.x,
                gridX, gridY;

            // bottom of grid
            if (tetrominoPotentialY > grid.length) {
                console.log("collision GRID BOTTOM");
                return true;
            }

            // other tetromino
            else {
                for (var y = 0; y < tetromino.shape.length; y++) {

                    for (var x = 0; x < tetromino.shape[y].length; x++) {

                        if (tetromino.shape[y][x] === 1) {
                            gridY = gridPotentialY + y;
                            gridX = gridPotentialX + x;

                            if (gridY >= 0) {

                                if (grid[gridY][gridX].value === 1) {
                                    console.log("collision: DOWN");
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            // no collision
            return false;
        }
        function isGameOver(tetromino) {
            return tetromino.topLeft.y < 0;
        }

        return collisionService;
    }
    angular
        .module("app")
        .factory("collisionSvc", collisionService);
})();