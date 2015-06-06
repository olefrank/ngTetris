;(function() {

    "use strict";

    var modal;
    var modals = {
        welcome: {
//            templateUrl: '/game/modal/modal-welcome.html',
            template: '<div class="splash-content text-center">' +
                '<div class="row">' +
                '<h1 ng-bind="title"></h1>' +
                '<p class="lead" ng-bind-html="message"></p>' +
                '</div>' +
                '</div>',
            title: 'Welcome to Oles Classic Tetris!',
            message: '<p>Press <img src="/img/space-icon.png" alt="space icon"/> to start game</p>'
        },
        paused: {
//            templateUrl: '/game/modal/modal.html',
            template: '<div class="splash-content text-center"><h1 ng-bind="title"></h1><p class="lead" ng-bind-html="message"></p></div>',
            title: 'Pause!',
            message: "<p>Press <img src=\"/img/letter-uppercase-P-icon.png\" alt=\"p key icon\"/> to resume</p>"
        },
        game_over: {
//            templateUrl: '/game/modal/modal.html',
            template: '<div class="splash-content text-center"><h1 ng-bind="title"></h1><p class="lead" ng-bind-html="message"></p></div>',
            title: 'Game Over!',
            message: "<p>Press <img src=\"/img/space-icon.png\" alt=\"space icon\"/> to start a new game</p>"
        }
    };

    function splashService($modal, $rootScope) {

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
//                templateUrl: attrs.templateUrl,
                template: attrs.template,
//                windowTemplateUrl: '/game/modal/overlay.html'
                windowTemplate: '<section class="splash" ng-class="{\'splash-open\': animate}" ng-style="{\'z-index\': 1000, display: \'block\'}"><div class="splash-inner" ng-transclude></div></section>'
            });
            modal = $modal.open(opts);
        }

        function close() {
            if (modal) {
                modal = modal.dismiss();
                $rootScope.$apply();
            }
        }

        return {
            open: open,
            close: close
        };

    }

    angular
        .module('app')
        .service('splashService', splashService);

})();
