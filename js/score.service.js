;(function() {

    "use strict";

    var score = 0;
    var pointsPerLine = 100;

    function scoreService() {

        var scoreService = {
            getScore: getScore,
            setScore: setScore,
            updateScore: updateScore
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

        return scoreService;
    }
    angular
        .module("app")
        .factory("scoreSvc", scoreService);
})();