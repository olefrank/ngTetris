;(function() {

    "use strict";

    var score = 0,
        pointsPerLine = 100,
        pointsPerCellLanded = 5,
        initSpeed = 1000;


    function scoreService() {

        function getScore() {
            return score;
        }

        function setScore(val) {
            score = val;
        }

        function updateScoreLanded(numCells) {
            score += numCells * pointsPerCellLanded;
        }

        function updateScoreCleared(numLinesRemoved) {
            if (numLinesRemoved > 0) {
                var exponent = numLinesRemoved - 1;
                score += Math.pow(2, exponent) * pointsPerLine;
            }
        }

        function getLoopSpeed() {
            var factor = 0.18; //0.2 - ((score / 100) * 0.005);
            var res = initSpeed - (score * factor);
            console.log("speed: " + res);
            return res;
        }

        return {
            getScore: getScore,
            setScore: setScore,
            updateScoreCleared: updateScoreCleared,
            updateScoreLanded: updateScoreLanded,
            getLoopSpeed: getLoopSpeed
        };

    }
    angular
        .module("app")
        .factory("scoreSvc", scoreService);
})();