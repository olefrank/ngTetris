;(function() {

    "use strict";

    var modal;
    var modals = {
        welcome: {
            title: 'Welcome to Oles Classic Tetris!',
            message: "Press SPACEBAR to start game"
        },
        paused: {
            title: 'Pause!',
            message: "Press P to resume"
        },
        game_over: {
            title: 'Game Over!',
            message: "Press SPACEBAR to start a new game"
        }
    };

    function splashService($modal, $rootScope) {

        return {
            open: open,
            close: close
        };

        function open(type, opts) {
            // Create a new scope so we can pass custom
            // variables into the splash modal
            var scope = $rootScope.$new();

            // text
            var attrs = modals[type];
            angular.extend(scope, attrs);

            // configuration
            opts = angular.extend(opts || {}, {
                backdrop: false,
                scope: scope,
                keyboard: false,
                templateUrl: 'js/modal/modal.html',
                windowTemplateUrl: 'js/modal/overlay.html'
            });
            modal = $modal.open(opts);
        }

        function close() {
            if (modal) {
                modal = modal.dismiss();
                $rootScope.$apply();
            }
        }
    }

    angular
        .module('app')
        .service('splashService', splashService);

})();
