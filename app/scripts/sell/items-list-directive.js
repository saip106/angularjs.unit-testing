'use strict';

angular.module('getvApp')
    .directive('itemsList', function () {
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
                    scope.$broadcast('ITEM_PRICE_VALUE', itemPrice);
                };

                scope.editQuantity = function (itemQuantity) {
                    console.log('quantity button clicked')
                    scope.$broadcast('ITEM_QUANTITY_VALUE', itemQuantity);
                };
            }
        };
    });