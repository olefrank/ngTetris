;(function() {

    "use strict";

    function tetrisController($interval, actionSvc, collisionSvc, factorySvc, tetrominoSvc, scoreSvc) {
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

        vm.getScore = function() {
            return scoreSvc.getScore();
        };

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
                        // copy tetromino to 'landed' grid
                        vm.grid = actionSvc.landTetromino(vm.grid, vm.tetromino);

                        // remove lines if necessary
                        var gridCleared = actionSvc.clearLines(vm.grid);
                        var numLinesCleared = vm.grid.length - gridCleared.length;
                        scoreSvc.updateScore(numLinesCleared);
                        vm.grid = actionSvc.insertEmptyRows(numLinesCleared, gridCleared);

                        // new tetromino
                        vm.tetromino = tetrominoSvc.updateQueue();
                    }
                }
                else {
                    actionSvc.moveDown(vm.grid, vm.tetromino);
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

            // misc
            scoreSvc.setScore(0);

            console.log("game initialized");
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
        .controller("tetrisCtrl", ["$interval", "actionSvc", "collisionSvc", "factorySvc", "tetrominoSvc", "scoreSvc", tetrisController]);

})();