'use strict';

angular.module('getvApp')
    .controller('SellController', ['$scope', '$http', 'ItemsSearchService',
        function ($scope, $http, ItemsSearchService) {

            $scope.order = {
                items : []
            };

            $scope.user = {};

            this.getItems = ItemsSearchService.searchItems;

            this.onSelect = function () {

                var selectedItem = $scope.selected;
                $scope.selected = '';
                $scope.order.items.push({
                    id : selectedItem.id,
                    name : selectedItem.name,
                    unitPrice : 3.75,
                    quantity : 1,
                    total : 3.75
                });
            };

            $scope.$watchCollection('order.items', function () {
                console.log('From controller, Number of items: ' + $scope.order.items.length);
            });
        }]);
