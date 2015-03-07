;(function() {

    "use strict";

    function tetrisController($interval, actionSvc, collisionSvc, factorySvc, tetrominoSvc) {
        var vm = this,
            loop;

        vm.grid = factorySvc.createGrid(16, 10);
        vm.tetromino = undefined;

        vm.getNextTetromino = function() {
            var next = tetrominoSvc.getTetrominoQueue()[0];
            return next.shape;
        };

        vm.tetrominoScreenPosition = function() {
            var result = {};
            if (typeof vm.tetromino !== "undefined") {
                result = {
                    top: vm.tetromino.screenPosition.y + 'px',
                    left: vm.tetromino.screenPosition.x + 'px'
                };
            }
            return result;
        };

        var gameOver = function() {
            $interval.cancel(loop);
            loop = null;
            console.log("game over");
        };

        vm.restartLoop = function(interval) {
            $interval.cancel(loop);

            loop = $interval(function () {

                if (collisionSvc.isCollisionVertical(vm.grid, vm.tetromino)) {
                    if (collisionSvc.isGameOver(vm.tetromino)) {
                        gameOver();
                    }
                    else {
                        vm.grid = actionSvc.landTetromino(vm.grid, vm.tetromino);
                        vm.tetromino = undefined;
                        vm.grid = actionSvc.clearLines(vm.grid);

                        vm.tetromino = tetrominoSvc.updateQueue();
                    }
                }
                else {
                    actionSvc.moveDown(vm.tetromino);
                }

            }, 500);
        };

        // init
        vm.tetromino = undefined;
        tetrominoSvc.initQueue();
        vm.tetromino = tetrominoSvc.updateQueue();
        vm.restartLoop(500);

    }
    angular
        .module("app")
        .controller("tetrisCtrl", ["$interval", "actionSvc", "collisionSvc", "factorySvc", "tetrominoSvc", tetrisController]);

})();