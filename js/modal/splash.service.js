angular.module('app')
    .service('splashService', [
        '$modal',
        '$rootScope',

        function($modal, $rootScope) {
            var modal;

            return {

                // check is modal active?
                isModal: function() {
                    return modal;
                },

                // open modal
                open: function (attrs, opts) {
                    // Create a new scope so we can pass custom
                    // variables into the splash modal
                    var scope = $rootScope.$new();
                    angular.extend(scope, attrs);
                    opts = angular.extend(opts || {}, {
                        backdrop: false,
                        scope: scope,
                        keyboard: false,
                        templateUrl: 'js/modal/modal.html',
                        windowTemplateUrl: 'js/modal/overlay.html'
                    });
                    modal = $modal.open(opts);
                },

                // close modal
                close: function() {
                    modal = modal.dismiss();
                    $rootScope.$apply();
                }
            };
        }
    ]);
