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
                                if (!collisionSvc.isCollisionHorizontal($scope.grid, $scope.tetromino, -1)) {
                                    actionSvc.moveHorizontal($scope.tetromino, -1);
                                    $scope.$apply();
                                }
                                break;
                            // up
                            case 38:
                                if (!collisionSvc.isCollisionVertical($scope.grid, $scope.tetromino) && !collisionSvc.isCollisionHorizontal($scope.grid, $scope.tetromino, 0)) {
                                    actionSvc.rotate($scope.tetromino);
                                    $scope.$apply();
                                }
                                break;
                            // right
                            case 39:
                                if (!collisionSvc.isCollisionHorizontal($scope.grid, $scope.tetromino, 1)) {
                                    actionSvc.moveHorizontal($scope.tetromino, 1);
                                    $scope.$apply();
                                }
                                break;
                            // down
                            case 40:
                                if (!collisionSvc.isCollisionVertical($scope.grid, $scope.tetromino)) {
                                    actionSvc.moveDown($scope.tetromino);
                                    $scope.restartLoop(1000);
                                }
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