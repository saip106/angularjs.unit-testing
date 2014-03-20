'use strict';

angular.module('getvApp')
    .directive('priceEditor', function ($templateCache) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {

                $(element).popover({
                    trigger: 'click',
                    html: true,
                    content: $templateCache.get('popover.template.html')
                });
            }
        };
    });