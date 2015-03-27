;(function() {

    "use strict";

    function tetrisController(tetrominoSvc, scoreSvc, tetrisService, btnHandlerService, actionSvc, $modal, $log) {

        // variables
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

        vm.btnClickHandler = function() {
            btnHandlerService.handleClick();
        };

        vm.initGame = function() {
            actionSvc.initGame();
        };

        vm.getBtnLabel = function() {
            return btnHandlerService.getBtnLabel();
        };
    }

    angular
        .module("app")
        .controller("tetrisCtrl", tetrisController);

})();