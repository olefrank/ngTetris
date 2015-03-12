;(function() {

    "use strict";

    function tetrisController($interval, actionSvc, collisionSvc, factorySvc, tetrominoSvc, scoreSvc, tetrisService) {
        // variables
        var vm = this,
            btnStates = [
                "Start",
                "Stop"
            ],
            currentState;

        // view models
        vm.grid = function() {
            return tetrisService.getGrid();
        };
        vm.tetromino = function() {
            return tetrisService.getTetromino();
        }
        vm.btnLabel;

        vm.getScore = function() {
            return scoreSvc.getScore();
        };

        vm.getNextTetromino = function() {
            return tetrominoSvc.getTetrominoQueue()[0];
        };

        vm.tetrominoScreenPosition = function() {
            var result = {},
                tetromino = tetrisService.getTetromino();

            if (tetromino) {
                result = {
                    top: tetromino.screenPosition.y + 'px',
                    left: tetromino.screenPosition.x + 'px'
                };
            }
            return result;
        };

        vm.restartLoop = function() {

            var grid,
                tetromino,
                loop = tetrisService.getLoop();

            // stop loop
            $interval.cancel(loop);

            // start new loop
            var newLoop = $interval(function () {

                grid = tetrisService.getGrid();
                tetromino = tetrisService.getTetromino();
                actionSvc.moveDown(grid, tetromino);

            }, getLoopSpeed());

            tetrisService.setLoop(newLoop);
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
            var tetromino = tetrominoSvc.updateQueue();
            tetrisService.setTetromino(tetromino);

            // grid
            var grid = factorySvc.createGrid(16, 10);
            tetrisService.setGrid(grid);

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
            actionSvc.gameOver();
        }

    }
    angular
        .module("app")
        .controller("tetrisCtrl", ["$interval", "actionSvc", "collisionSvc", "factorySvc", "tetrominoSvc", "scoreSvc", "tetrisService", tetrisController]);

})();