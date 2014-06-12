'use strict';

angular.module('getvApp')
    .directive('productDetails', function ($modal) {
        return {
            replace : false,
            scope : {
                item : '='
            },
            restrict : "A",
            link : function (scope, element) {

                element.bind('click', function () {
                    $modal.open({
                        templateUrl : 'templates/product-details-modal-template.html',
                        backdrop: 'static',
                        keyboard: false,
                        controller: 'ProductDetailsController as productDetailsController',
                        resolve: {
                            item: function () {
                                return scope.item;
                            }
                        }
                    });
                });
            }
        };
    });

angular.module('getvApp')
    .controller('ProductDetailsController', [
        '$scope', '$modalInstance', 'item',
        function ($scope, $modalInstance, item) {

            $scope.item = item;

            this.ok = function () {
                $modalInstance.close({});
            };

            this.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    ]);