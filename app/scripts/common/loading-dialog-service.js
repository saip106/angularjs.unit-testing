'use strict';

angular.module('getvApp')
    .factory('LoadingDialogService', [
        '$modal',
        function ($modal) {

            var modalInstance = null;

            return {
                open : function () {
                    modalInstance = $modal.open({
                        templateUrl : 'templates/loading-template.html',
                        backdrop: 'static',
                        keyboard: false
                    });
                },
                close : function () {
                    if (modalInstance) {
                        modalInstance.close();
                    }
                }
            };
        }
    ]);