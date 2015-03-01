;(function() {

    "use strict";

    function collisionService() {
        var collisionService = {
            isCollisionHorizontal: isCollisionHorizontal,
            isCollisionVertical: isCollisionVertical,
            isGameOver: isGameOver
        };
        function isCollisionHorizontal(grid, tetromino, moveX) {
            var potentialY = (tetromino.topLeft.y > 0) ? tetromino.topLeft.y : 0,
                potentialXLeft,
                potentialXRight;

            // left
            if (moveX < 0) {
                // grid left
                potentialXLeft = tetromino.topLeft.x + moveX;
                if (potentialXLeft < 0) {
                    return true;
                }

                // other tetromino
                potentialXLeft = tetromino.topLeft.x - 1;
                for (var y = 0; y < tetromino.shape.length; y++) {
                    potentialY += y;

                    if (grid[potentialY][potentialXLeft] === 1 && tetromino.shape[y][0] === 1) {
                        return true;
                    }
                }
            }
            // right and rotate (moveX = 0)
            else {
                // grid right
                potentialXRight = tetromino.topLeft.x + tetromino.shape[0].length - 1 + moveX;
                if (potentialXRight >= grid[0].length) {
                    return true;
                }

                // other tetromino
                potentialXRight = tetromino.topLeft.x + tetromino.shape[0].length;
                for (var y = 0; y < tetromino.shape.length; y++) {
                    potentialY += y;

                    if (grid[potentialY][potentialXRight] === 1 && tetromino.shape[y][tetromino.shape[0].length-1] ===  1) {
                        return true;
                    }
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

                                if (grid[gridY][gridX] === 1) {
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
            if (tetromino.topLeft.y < 0) {
                return true;
            }
            return false;
        }
        return collisionService;
    }
    angular
        .module("app")
        .factory("collisionSvc", collisionService);
})();