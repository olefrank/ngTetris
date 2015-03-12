;(function() {

    "use strict";

    function tetrisService() {

        var tetromino,
            grid,
            loop;

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
        function getLoop() {
            return loop;
        }
        function setLoop(val) {
            loop = val;
        }

        return {
            getTetromino: getTetromino,
            setTetromino: setTetromino,

            getGrid: getGrid,
            setGrid: setGrid,

            getLoop: getLoop,
            setLoop: setLoop
        };
    }
    angular
        .module("app")
        .factory("tetrisService", tetrisService);
})();