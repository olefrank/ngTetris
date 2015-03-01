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
            var keys = Object.keys(obj)
            return obj[ keys[ keys.length * Math.random() << 0 ] ];
        }
        var shapes = {
            "O": [
                [1, 1],
                [1, 1]
            ],
            "L": [
                [1, 0],
                [1, 0],
                [1, 1]
            ],
            "J": [
                [0, 1],
                [0, 1],
                [1, 1]
            ],
            "I": [
                [1],
                [1],
                [1],
                [1]
            ],
            "S": [
                [0, 1, 1],
                [1, 1, 0]
            ],
            "Z": [
                [1, 1, 0],
                [0, 1, 1]
            ],
            "T": [
                [1, 1, 1],
                [0, 1, 0]
            ]
        };

        return shapeService;
    }
    angular
        .module("app")
        .factory("shapeSvc", shapeService);

})();