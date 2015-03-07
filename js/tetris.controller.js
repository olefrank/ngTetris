;(function() {

    "use strict";

    function tetrisController($interval, actionSvc, collisionSvc, factorySvc, tetrominoSvc) {
        // variables
        var vm = this,
            loop,
            btnStates = [
                "Start",
                "Stop"
            ],
            currentState;

        // view models
        vm.grid;
        vm.tetromino;
        vm.btnLabel;

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

        vm.btnClickHandler = function() {
            // switch states
            switch (currentState) {
                case 0 :
                    vm.initGame();
                    startGame();
                    break;
                case 1 :
                    stopGame();
                    break;
            }
            nextBtnState();
        };

        function gameOver() {
            $interval.cancel(loop);
            loop = null;
            console.log("game over");
        }

        function nextBtnState() {
            // switch to next state
            currentState = (currentState + 1) % btnStates.length;
            // update button label
            vm.btnLabel = btnStates[currentState];
        }

        vm.initGame = function() {
            // update button label
            currentState = 0;
            vm.btnLabel = btnStates[currentState];

            // tetromino
            tetrominoSvc.initQueue();
            vm.tetromino = tetrominoSvc.updateQueue();

            // grid
            vm.grid = factorySvc.createGrid(16, 10);
        };

        function startGame() {
            vm.restartLoop(500);
        }

        function stopGame() {
            gameOver();
        }

    }
    angular
        .module("app")
        .controller("tetrisCtrl", ["$interval", "actionSvc", "collisionSvc", "factorySvc", "tetrominoSvc", tetrisController]);

})();