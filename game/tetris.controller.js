;(function() {

    "use strict";

    function tetrisController(tetrominoSvc, scoreSvc, tetrisService, actionSvc) {

        /*jshint validthis: true */
        var vm = this;

        // view models
        vm.grid = function() {
            return tetrisService.getGrid();
        };
        vm.tetromino = function() {
            return tetrisService.getTetromino();
        };

        vm.getScore = function() {
            return scoreSvc.getScore();
        };

        vm.getNextTetromino = function() {
            return tetrominoSvc.getTetrominoQueue()[0];
        };

        vm.tetrominoScreenPosition = function() {
            var result = {},
                tetromino = tetrisService.getTetromino();

            if (tetromino) {
                result = {
                    top: tetromino.screenPosition.y + 'px',
                    left: tetromino.screenPosition.x + 'px'
                };
            }
            return result;
        };

        vm.initGame = function() {
            actionSvc.initGame();
        };

    }

    angular
        .module("app")
        .controller("tetrisCtrl", tetrisController);

})();