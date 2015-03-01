;(function() {

    "use strict";

    function tetrisController($interval, actionSvc, collisionSvc, factorySvc) {
        var vm = this,
            loop;

        vm.grid = factorySvc.createGrid(16, 10);
        vm.tetromino = undefined;
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
                // create new tetromino
                if (typeof vm.tetromino === "undefined") {
                    vm.tetromino = factorySvc.createTetromino();
                }

                if (collisionSvc.isCollisionVertical(vm.grid, vm.tetromino)) {
                    if (collisionSvc.isGameOver(vm.tetromino)) {
                        gameOver();
                    }
                    else {
                        vm.grid = actionSvc.landTetromino(vm.grid, vm.tetromino);
                        vm.grid = actionSvc.clearLines(vm.grid);
                    }
                    vm.tetromino = undefined;
                }
                else {
                    actionSvc.moveDown(vm.tetromino);
                }

            }, 1000);
        };

        vm.restartLoop(500);

    }
    angular
        .module("app")
        .controller("tetrisCtrl", ["$interval", "actionSvc", "collisionSvc", "factorySvc", tetrisController]);

})();