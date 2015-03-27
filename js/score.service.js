;(function() {

    "use strict";

    var score = 0;
    var pointsPerLine = 100;

    function scoreService() {

        var scoreService = {
            getScore: getScore,
            setScore: setScore,
            updateScore: updateScore,
            getLoopSpeed: getLoopSpeed
        };

        function getScore() {
            return score;
        }

        function setScore(val) {
            score = val;
        }

        function updateScore(numLinesRemoved) {
            if (numLinesRemoved > 0) {
                var exponent = numLinesRemoved - 1;
                score += Math.pow(2, exponent) * pointsPerLine;
            }
        }


        function getLoopSpeed() {
            var result = 1000;

            if (score > 1000) {
                result = 900;
            }
            if (score > 1500) {
                result = 800;
            }
            if (score > 2000) {
                result = 800;
            }
            if (score > 2500) {
                result = 700;
            }
            if (score > 3000) {
                result = 600;
            }
            if (score > 3500) {
                result = 500;
            }

            return result;
        }

        return scoreService;
    }
    angular
        .module("app")
        .factory("scoreSvc", scoreService);
})();