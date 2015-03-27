;(function() {

    "use strict";

    function keydownHandler($document, actionSvc, tetrisService) {

        var states = [
            {
                name: "idle",
                keysEnabled: []
            },
            {
                name: "running",
                keysEnabled: [37,38,39,40,80]
            },
            {
                name: "paused",
                keysEnabled: [80]
            }
        ];

        function validGameState(name, keycode) {
            var result = false;
            angular.forEach(states, function(state, key) {
                if ( state.name === name ) {
                    if ( state.keysEnabled.indexOf(keycode) !== -1 ) {
                        result = true;
                        return;
                    }
                }
            });
            return result;
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

                if ( validGameState(gameState, keycode) ) {
                    grid = tetrisService.getGrid();
                    tetromino = tetrisService.getTetromino();

                    switch(e.which) {

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

                        // p
                        case 80:
                            actionSvc.togglePause();
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