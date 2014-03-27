'use strict';

angular.module('getvApp')
    .directive('priceEditor', function($templateCache) {
        return {
            restrict : 'A',
            link : function(scope, element, attrs) {

                window.x = $(element);
                $(element).popover({
                    trigger : 'click',
                    html : true,
                    content : $templateCache.get('popover.template.html')
                });
            }
        };
    });