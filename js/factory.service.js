;(function() {

    "use strict";

    var numCols = 10,
        numRows = 16;

    function factoryService(shapeSvc) {
        var tetrisFactory = {
            createTetromino: createTetromino,
            createGrid: createGrid
        };
        function createTetromino() {
            var tetromino = {};
            tetromino.shape = shapeSvc.getShape();
            tetromino.topLeft = {
                x: parseInt( (numCols - tetromino.shape[0].length) / 2),
                y: 0 - tetromino.shape.length
            };
            tetromino.screenPosition = {
                x: tetromino.topLeft.x * 20,
                y: tetromino.topLeft.y * 20
            };
            return tetromino;
        }
        function createGrid(rows, cols) {
            // assign values
            numCols = cols;
            numRows = rows;

            // create new grid
            var grid = [];
            for (var i = 0; i < rows; i++) {
                // create new array for every grid row
                grid[i] = Array.apply(null, new Array(cols)).map(Number.prototype.valueOf,0);
            }
            return grid;
        }
        return tetrisFactory;
    }
    angular
        .module("app")
        .factory("factorySvc", ["shapeSvc", factoryService]);
})();