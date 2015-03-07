;(function() {

    "use strict";

    function keydownHandler($document, actionSvc, collisionSvc) {
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
                        switch(e.which) {
                            // left
                            case 37:
                                $scope.tetromino = actionSvc.moveHorizontal($scope.grid, $scope.tetromino, -1);
                                $scope.$apply();
                                break;
                            // up
                            case 38:
                                $scope.tetromino = actionSvc.rotate($scope.grid, $scope.tetromino);
                                $scope.$apply();
                                break;
                            // right
                            case 39:
                                $scope.tetromino = actionSvc.moveHorizontal($scope.grid, $scope.tetromino, 1);
                                $scope.$apply();
                                break;
                            // down
                            case 40:
                                $scope.tetromino = actionSvc.moveDown($scope.grid, $scope.tetromino);
                                $scope.restartLoop(1000);
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
        .directive("keydownHandler", ["$document", "actionSvc", "collisionSvc", keydownHandler]);
})();