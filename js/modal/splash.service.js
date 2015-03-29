;(function() {

    "use strict";

    var modal;
    var modals = {
        welcome: {
            templateUrl: 'js/modal/modal-welcome.html',
            title: 'Welcome to Oles Classic Tetris!',
            message: '<p>Press <img src="img/space-icon.png" alt="space icon"/> to start game</p>'
        },
        paused: {
            templateUrl: 'js/modal/modal.html',
            title: 'Pause!',
            message: "<p>Press <img src=\"img/letter-uppercase-P-icon.png\" alt=\"p key icon\"/> to resume</p>"
        },
        game_over: {
            templateUrl: 'js/modal/modal.html',
            title: 'Game Over!',
            message: "<p>Press <img src=\"img/space-icon.png\" alt=\"space icon\"/> to start a new game</p>"
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
                templateUrl: attrs.templateUrl,
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
