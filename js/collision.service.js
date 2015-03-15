;(function() {

    "use strict";

    function collisionService() {

        var collisionService = {
            isCollisionRotation: isCollisionRotation,
            isCollisionVertical: isCollisionVertical,
            isCollisionHorizontal: isCollisionHorizontal,
            isGameOver: isGameOver
        };

        function isCollisionRotation(grid, tetromino) {
            if (tetromino && grid) {

                var potentialGrid = {};

                for (var y = 0; y < tetromino.shape.length; y++) {
                    potentialGrid.y = y + tetromino.topLeft.y;

                    for (var x = 0; x < tetromino.shape[y].length; x++) {
                        potentialGrid.x = x + tetromino.topLeft.x;

                        if (tetromino.shape[y][x] !== 0) {

                            if (potentialGrid.x < 0) {
                                //this block would be to the left of the playing field
                                console.log("collision: rotation left");
                                return true;
                            }
                            else if (potentialGrid.x >= grid[0].length) {
                                //this block would be to the right of the playing field
                                console.log("collision: rotation right");
                                return true;
                            }
                            else if (potentialGrid.y >= grid.length) {
                                //this block would be below the playing field
                                console.log("collision: bottom");
                                return true;
                            }
                            else if(potentialGrid.y >= 0 && potentialGrid.x >= 0) {
                                if (grid[potentialGrid.y][potentialGrid.x].value !== 0) {
                                    //the space is taken
                                    console.log("collision: rotation tetromino");
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        function isCollisionHorizontal(grid, tetromino, moveX) {
            if (tetromino && grid) {

                var potentialTopLeft = {
                    x: tetromino.topLeft.x + moveX,
                    y: tetromino.topLeft.y
                };
                var potentialGrid = {};

                for (var y = 0; y < tetromino.shape.length; y++) {
                    potentialGrid.y = y + potentialTopLeft.y;

                    for (var x = 0; x < tetromino.shape[y].length; x++) {
                        potentialGrid.x = x + potentialTopLeft.x;

                        if (tetromino.shape[y][x] !== 0) {

                            if (potentialGrid.x < 0 ) {
                                console.log("collision: grid left");
                                return true;
                            }
                            else if (potentialGrid.x >= grid[0].length) {
                                console.log("collision: grid right");
                                return true;
                            }
                            else if ( potentialGrid.y >= 0 && potentialGrid.x >= 0 ) {
                                if (moveX < 0 && grid[potentialGrid.y][potentialGrid.x].value !== 0) {
                                    console.log("collision: tetromino left");
                                    return true;
                                }
                                else if (moveX > 0 && grid[potentialGrid.y][potentialGrid.x].value !== 0) {
                                    console.log("collision: tetromino right");
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        function isCollisionVertical(grid, tetromino) {
            if (grid && tetromino) {

                var potentialTopLeft = {
                    x: tetromino.topLeft.x,
                    y: tetromino.topLeft.y + 1
                };
                var potentialGrid = {};

                for (var y = 0; y < tetromino.shape.length; y++) {
                    potentialGrid.y = y + potentialTopLeft.y;

                    for (var x = 0; x < tetromino.shape[y].length; x++) {
                        potentialGrid.x = x + potentialTopLeft.x;

                        if (tetromino.shape[y][x] !== 0) {
                            if ( potentialGrid.y >= grid.length ) {
                                console.log("collision: grid bottom");
                                return true;
                            }
                            else if ( potentialGrid.y >= 0 && potentialGrid.x >= 0 ) {
                                if ( !grid[potentialGrid.y][potentialGrid.x] ) {
                                    console.log("collision: tetromino bottom");
                                    return true;
                                }
                                else if ( grid[potentialGrid.y][potentialGrid.x].value !== 0 ) {
                                    console.log("collision: tetromino bottom");
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
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