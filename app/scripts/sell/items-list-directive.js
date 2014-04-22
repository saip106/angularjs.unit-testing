'use strict';

angular.module('getvApp')
    .directive('itemsList', function ($templateCache, $compile) {
        return {
            restrict : 'A',
            scope : {
                itemsListData : '='
            },
            templateUrl : 'templates/items-list-template.html',
            link : function (scope, element, attrs) {

                scope.removeItem = function (index) {
                    scope.itemsListData.splice(index, 1);
                };

	            scope.editPrice = function (itemPrice) {
		            scope.$broadcast('POPUP_VALUE', itemPrice);
	            }
            }
        };
    });