;(function() {

    "use strict";

    function tetrisService() {

        var tetromino,
            grid,
            loop,
            keysEnabled,
            isPaused;

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
        function getKeysEnabled() {
            return keysEnabled;
        }
        function setKeysEnabled(val) {
            keysEnabled = val;
        }
        function getIsPaused() {
            return isPaused;
        }
        function setIsPaused(val) {
            isPaused = val;
        }

        return {
            getTetromino: getTetromino,
            setTetromino: setTetromino,

            getGrid: getGrid,
            setGrid: setGrid,

            getLoop: getLoop,
            setLoop: setLoop,

            getKeysEnabled: getKeysEnabled,
            setKeysEnabled: setKeysEnabled,

            getIsPaused: getIsPaused,
            setIsPaused: setIsPaused
        };
    }
    angular
        .module("app")
        .factory("tetrisService", tetrisService);
})();