'use strict';

angular.module('getvApp')
    .directive('richPriceDisplay', function () {
        return {
            restrict: "E",
            templateUrl: 'templates/rich-price-display.html',
            link: function (scope, element) {
                element.find("#price-button").popover();
            }
        };
    });