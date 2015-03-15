;(function() {

    "use strict";

    function keydownHandler($document, actionSvc, tetrisService) {
        var keydownHandler = {
            restrict: 'AE',
            scope: {
                "tetromino": "=",
                "grid": "=",
                "restartLoop": "&"
            },
            link: function($scope) {
                $document.bind('keydown', function(e) {
                    if (!actionSvc.getDisableKeys()) {
                        if (typeof $scope.tetromino !== "undefined" && typeof $scope.grid !== "undefined") {

                            var grid = tetrisService.getGrid(),
                                tetromino = tetrisService.getTetromino();

                            switch(e.which) {

                                // left
                                case 37:
                                    actionSvc.moveLeft(grid, tetromino);
                                    break;

                                // up
                                case 38:
                                    actionSvc.rotate(grid, tetromino);
                                    break;

                                // right
                                case 39:
                                    actionSvc.moveRight(grid, tetromino);
                                    break;

                                // down
                                case 40:
                                    actionSvc.moveDown(grid, tetromino);
                                    $scope.restartLoop();
                                    break;
                            }

                            $scope.$apply();
                        }
                    }
                });
            }
        };
        return keydownHandler;
    }
    angular
        .module("app")
        .directive("keydownHandler", ["$document", "actionSvc", "tetrisService", keydownHandler]);
})();