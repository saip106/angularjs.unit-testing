'use strict';

angular.module('getvApp')
    .directive('productDetails', function ($modal) {
        return {
            replace : true,
            scope : {
                item : '='
            },
            templateUrl : 'templates/product-details-template.html',
            restrict : "E",
            link : function (scope, element, attrs) {

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