;(function() {

    "use strict";

    function btnHandlerService(actionSvc) {

        var currentState = 0;
        var btnStates = ["Start","Stop"];

        function btnInit() {
            currentState = 0;
        }

        function getBtnLabel() {
            return btnStates[currentState];
        }

        function handleClick() {
            // switch states
            switch (currentState) {
                case 0 :
                    actionSvc.initGame();
                    actionSvc.restartLoop();
                    break;
                case 1 :
                    actionSvc.gameOver();
                    break;
            }
            currentState = nextBtnState();
        }

        function nextBtnState() {
            // get next state
            return (currentState + 1) % btnStates.length;
        }

        return {
            btnInit: btnInit,
            getBtnLabel: getBtnLabel,
            handleClick: handleClick
        };
    }

    angular
        .module("app")
        .factory("btnHandlerService", btnHandlerService);
})();