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
                color: "yellow"
            },
            "L": {
                shape: [
                    [1, 0],
                    [1, 0],
                    [1, 1]
                ],
                color: "pink"
            },
            "J": {
                shape: [
                    [0, 1],
                    [0, 1],
                    [1, 1]
                ],
                color: "blue"
            },
            "I": {
                shape: [
                    [1],
                    [1],
                    [1],
                    [1]
                ],
                color: "lightblue"
            },
            "S": {
                shape: [
                    [0, 1, 1],
                    [1, 1, 0]
                ],
                color: "green"
            },
            "Z": {
                shape: [
                    [1, 1, 0],
                    [0, 1, 1]
                ],
                color: "red"
            },
            "T": {
                shape: [
                    [1, 1, 1],
                    [0, 1, 0]
                ],
                color: "purple"
            }
        };

        return shapeService;
    }
    angular
        .module("app")
        .factory("shapeSvc", shapeService);

})();