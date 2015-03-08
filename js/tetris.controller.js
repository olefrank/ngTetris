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
            return tetrominoSvc.getTetrominoQueue()[0];
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

        vm.restartLoop = function() {
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
            }, getLoopSpeed());
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

        function getLoopSpeed() {
            var result = 1000;
            if (scoreSvc.getScore() >= 100 && scoreSvc.getScore() < 200) {
                result = 900;
            }
            else if (scoreSvc.getScore() >= 200 && scoreSvc.getScore() < 300) {
                result = 800;
            }
            else if (scoreSvc.getScore() >= 300 && scoreSvc.getScore() < 400) {
                result = 700;
            }
            else if (scoreSvc.getScore() >= 400 && scoreSvc.getScore() < 500) {
                result = 600;
            }
            else if (scoreSvc.getScore() >= 500 && scoreSvc.getScore() < 600) {
                result = 500;
            }
            else if (scoreSvc.getScore() >= 600 && scoreSvc.getScore() < 700) {
                result = 400;
            }
            else if (scoreSvc.getScore() >= 700 && scoreSvc.getScore() < 800) {
                result = 300;
            }
            else if (scoreSvc.getScore() >= 800 && scoreSvc.getScore() < 900) {
                result = 200;
            }
            else if (scoreSvc.getScore() >= 900 && scoreSvc.getScore() < 1000) {
                result = 100;
            }
            else if (scoreSvc.getScore() >= 1000 && scoreSvc.getScore() < 1100) {
                result = 50;
            }
            else if (scoreSvc.getScore() >= 1100 && scoreSvc.getScore() < 1200) {
                result = 25;
            }
            return result;
        }

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

        function startGame() {
            vm.restartLoop();
        }

        function stopGame() {
            gameOver();
        }

    }
    angular
        .module("app")
        .controller("tetrisCtrl", ["$interval", "actionSvc", "collisionSvc", "factorySvc", "tetrominoSvc", "scoreSvc", tetrisController]);

})();