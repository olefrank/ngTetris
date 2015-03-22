;(function() {

    "use strict";

    function keydownHandler($document, actionSvc, tetrisService) {
        var keydownHandler = {
            restrict: 'AE',
            scope: {
                "tetromino": "=",
                "grid": "="
            },
            link: function($scope) {

                $scope.$watch(function() {
                    return tetrisService.getKeysEnabled();
                }, function(newValue) {
                    enableKeys(newValue);
                });

                function enableKeys(enable) {
                    if (enable) {
                        $document.off('keydown');
                        $document.on('keydown', function(e) {

                            var grid = tetrisService.getGrid(),
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
//                                    $scope.restartLoop();
                                    actionSvc.restartLoop();
                                    break;

                                // p
                                case 80:
                                    actionSvc.togglePause();
                                    break;
                            }

                        });
                    }
                    else {
                        $document.off('keydown');
                        $document.on('keydown', function(e) {

                            switch (e.which) {

                                // p
                                case 80:
                                    actionSvc.togglePause();
                                    break;
                            }

                        });
                    }
                    
                }
            }
        };
        return keydownHandler;
    }
    angular
        .module("app")
        .directive("keydownHandler", ["$document", "actionSvc", "tetrisService", keydownHandler]);
})();