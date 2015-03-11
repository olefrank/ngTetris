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
            link: function($scope, $elem, $attrs) {
                $document.bind('keydown', function(e) {
                    if (typeof $scope.tetromino !== "undefined" && typeof $scope.grid !== "undefined") {
                        var tetromino;
                        switch(e.which) {
                            // left
                            case 37:
                                tetromino = actionSvc.moveLeft($scope.grid, $scope.tetromino);
                                tetrisService.setTetromino(tetromino);
                                $scope.$apply();
                                break;
                            // up
                            case 38:
                                tetromino = actionSvc.rotate($scope.grid, $scope.tetromino);
                                tetrisService.setTetromino(tetromino);
                                $scope.$apply();
                                break;
                            // right
                            case 39:
                                tetromino = actionSvc.moveRight($scope.grid, $scope.tetromino);
                                tetrisService.setTetromino(tetromino);
                                $scope.$apply();
                                break;
                            // down
                            case 40:
                                tetromino = actionSvc.moveDown($scope.grid, $scope.tetromino);
                                tetrisService.setTetromino(tetromino);
                                $scope.restartLoop();
                                break;
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