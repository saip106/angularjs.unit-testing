'use strict';

angular.module('getvApp')
    .factory('PaymentDialogService', ['$http', '$modal', '$log',
        function ($http, $modal, $log) {

            return {
                open: function () {
                    $modal.open({
                        templateUrl: 'templates/payment-template.html',
                        controller: 'PaymentDialogController as paymentDialogController',
                        keyboard: false,
                        backdrop: 'static',
                        resolve : {
                            data: function () {
                                return {};
                            }
                        }
                    });
                }
            };
        }]);

angular.module('getvApp')
    .controller('PaymentDialogController', [
        '$scope', 'data',
        function ($scope, data) {
            $scope.message = data.message;
        }
    ]);