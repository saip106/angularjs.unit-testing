'use strict';

angular.module('getvApp')
    .factory('LoadingDialogService', [
        '$modal',
        function ($modal) {

            var modalInstance = null;

            return {
                open : function (message) {

                    var loadingMessage = message || 'Loading...';
                    modalInstance = $modal.open({
                        templateUrl : 'templates/loading-template.html',
                        backdrop: 'static',
                        keyboard: false,
                        controller: 'LoadingDialogController as loadingDialogController',
                        resolve: {
                            data: function () {
                                return {
                                    message : loadingMessage
                                };
                            }
                        }
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

angular.module('getvApp')
    .controller('LoadingDialogController', [
        '$scope', 'data',
        function ($scope, data) {
            $scope.message = data.message;
        }
    ]);