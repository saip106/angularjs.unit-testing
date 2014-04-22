'use strict';

angular.module('getvApp')
    .controller('SellController', ['$scope', '$http', 'ItemsSearchService', 'OrderService',
        function ($scope, $http, ItemsSearchService, OrderService) {

            $scope.order = {
                items : []
            };

            $scope.user = {};
            $scope.transaction = {};

            this.getItems = ItemsSearchService.searchItems;

            this.onSelect = function () {

                var selectedItem = $scope.transaction.selectedItem;
                $scope.transaction.selectedItem = '';

                OrderService.addItem(selectedItem, $scope.order);
            };

            $scope.$watchCollection('order.items', function () {
                if ($scope.order.orderId && $scope.order.items.length === 0) {
                    console.log('deleting order with id ' + $scope.order.orderId);
                    OrderService.deleteOrder($scope.order.orderId);
                }
            });
        }]);
