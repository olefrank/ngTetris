;(function() {

    "use strict";

    function tetrominoService(factorySvc) {

        var tetrominoQueue = [];

        function initQueue() {
            tetrominoQueue.push( factorySvc.createTetromino() );
            tetrominoQueue.push( factorySvc.createTetromino() );
        }

        function updateQueue() {
            // init queue if necessary
            if (tetrominoQueue.length < 2) {
                initQueue();
            }
            // add to queue
            tetrominoQueue.push( factorySvc.createTetromino() );
            // pop from queue;
            return tetrominoQueue.shift();
        }

        function getTetrominoQueue() {
            return tetrominoQueue;
        }

        return {
                updateQueue: updateQueue,
                getTetrominoQueue: getTetrominoQueue
        };

    }
    angular
        .module("app")
        .factory("tetrominoSvc", tetrominoService);

})();