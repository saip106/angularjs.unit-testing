'use strict';

angular.module('getvApp')
    .directive('productDetails', function ($modal) {
        return {
            replace: true,
            scope: {
                item: '@'
            },
            templateUrl: 'templates/product-details.template.html',
            restrict: "E",
            link: function (scope, element, attrs) {
                scope.name = attrs.name;

                element.bind('click', function () {
                    $modal.open({
                        templateUrl: 'templates/product-details-modal.template.html'
                    });
                });
            }
        };
    });