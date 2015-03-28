;(function() {

    "use strict";

    function keydownHandler($document, actionSvc, tetrisService) {

        var states = {
            idle: {
                keysEnabled: [32]
            },
            running: {
                keysEnabled: [37,38,39,40,80]
            },
            paused: {
                keysEnabled: [80]
            },
            game_over: {
                keysEnabled: [32]
            }
        };

        function validGameState(name, keycode) {
            var state = states[name];
            return state.keysEnabled.indexOf(keycode) !== -1;
        }

        return function($scope) {

            // watch game state
            var gameState,
                keycode,
                grid,
                tetromino;

            $document.on('keydown', function(e) {
                gameState = tetrisService.getGameState();
                keycode = e.which;

//                console.log(keycode);

                if ( validGameState(gameState, keycode) ) {
                    grid = tetrisService.getGrid();
                    tetromino = tetrisService.getTetromino();

                    switch(keycode) {

                        // left
                        case 37:
                            actionSvc.moveLeft(grid, tetromino);
                            $scope.$apply();
                            break;

                        // up
                        case 38:
                            actionSvc.rotate(grid, tetromino);
                            $scope.$apply();
                            break;

                        // right
                        case 39:
                            actionSvc.moveRight(grid, tetromino);
                            $scope.$apply();
                            break;

                        // down
                        case 40:
                            actionSvc.moveDown(grid, tetromino);
                            actionSvc.restartLoop();
                            $scope.$apply();
                            break;

                        // p(ause)
                        case 80:
                            actionSvc.togglePause();
                            break;

                        // space
                        case 32:
                            actionSvc.startGame();
                            actionSvc.restartLoop();
                            break;
                    }
                }

            });

        }
    }

    angular
        .module("app")
        .directive("keydownHandler", keydownHandler);
})();