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
//            if (scoreSvc.getScore() >= 100 && scoreSvc.getScore() < 200) {
//                result = 900;
//            }
//            else if (scoreSvc.getScore() >= 200 && scoreSvc.getScore() < 300) {
//                result = 800;
//            }
//            else if (scoreSvc.getScore() >= 300 && scoreSvc.getScore() < 400) {
//                result = 700;
//            }
//            else if (scoreSvc.getScore() >= 400 && scoreSvc.getScore() < 500) {
//                result = 600;
//            }
//            else if (scoreSvc.getScore() >= 500 && scoreSvc.getScore() < 600) {
//                result = 500;
//            }
//            else if (scoreSvc.getScore() >= 600 && scoreSvc.getScore() < 700) {
//                result = 400;
//            }
//            else if (scoreSvc.getScore() >= 700 && scoreSvc.getScore() < 800) {
//                result = 300;
//            }
//            else if (scoreSvc.getScore() >= 800 && scoreSvc.getScore() < 900) {
//                result = 200;
//            }
//            else if (scoreSvc.getScore() >= 900 && scoreSvc.getScore() < 1000) {
//                result = 100;
//            }
//            else if (scoreSvc.getScore() >= 1000 && scoreSvc.getScore() < 1100) {
//                result = 50;
//            }
//            else if (scoreSvc.getScore() >= 1100 && scoreSvc.getScore() < 1200) {
//                result = 25;
//            }
            return result;
        }

        return scoreService;
    }
    angular
        .module("app")
        .factory("scoreSvc", scoreService);
})();