;(function() {

    "use strict";

    function tetrisService() {

        var tetromino,
            grid;

        function getTetromino() {
            return tetromino;
        }
        function setTetromino(val) {
            tetromino = val;
        }
        function getGrid() {
            return grid;
        }
        function setGrid(val) {
            grid = val;
        }

        return {
            getTetromino: getTetromino,
            setTetromino: setTetromino,
            getGrid: getGrid,
            setGrid: setGrid
        };
    }
    angular
        .module("app")
        .factory("tetrisService", tetrisService);
})();