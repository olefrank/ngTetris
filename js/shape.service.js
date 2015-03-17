;(function() {

    "use strict";

    function shapeService() {
        var shapeService = {
            getShape: getShape
        };
        function getShape() {
            return getRandomShape(shapes);
        }
        function getRandomShape(obj) {
            var keys = Object.keys(obj);
            return obj[ keys[ keys.length * Math.random() << 0 ] ];
        }
        var shapes = {
            "O": {
                shape: [
                    [1, 1],
                    [1, 1]
                ],
                class:"shape-o"
            },
            "L": {
                shape: [
                    [1, 0],
                    [1, 0],
                    [1, 1]
                ],
                class:"shape-l"
            },
            "J": {
                shape: [
                    [0, 1],
                    [0, 1],
                    [1, 1]
                ],
                class:"shape-j"
            },
            "I": {
                shape: [
                    [1],
                    [1],
                    [1],
                    [1]
                ],
                class:"shape-i"
            },
            "S": {
                shape: [
                    [0, 1, 1],
                    [1, 1, 0]
                ],
                class:"shape-s"
            },
            "Z": {
                shape: [
                    [1, 1, 0],
                    [0, 1, 1]
                ],
                class:"shape-z"
            },
            "T": {
                shape: [
                    [1, 1, 1],
                    [0, 1, 0]
                ],
                class:"shape-t"
            }
        };

        return shapeService;
    }
    angular
        .module("app")
        .factory("shapeSvc", shapeService);

})();