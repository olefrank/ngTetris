;(function() {

    "use strict";

    function tetrominoService(factorySvc) {

        var tetrominoQueue = [];

        var tetrominoService = {
            initQueue: initQueue,
            updateQueue: updateQueue,
            getTetrominoQueue: getTetrominoQueue
        };

        function initQueue() {
            tetrominoQueue.push( factorySvc.createTetromino() );
            tetrominoQueue.push( factorySvc.createTetromino() );
        }

        function updateQueue() {
            tetrominoQueue.push( factorySvc.createTetromino() );
            return tetrominoQueue.shift();
        }

        function getTetrominoQueue() {
            return tetrominoQueue;
        }

        return tetrominoService;
    }
    angular
        .module("app")
        .factory("tetrominoSvc", tetrominoService);

})();