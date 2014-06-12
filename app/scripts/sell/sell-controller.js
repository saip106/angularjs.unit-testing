'use strict';

angular.module('getvApp')
    .controller('SellController',
    [
        '$scope',
        '$http',
        '$log',
        'ItemsSearchService',
        'OrderService',
        'SessionStorageService',
        'PaymentDialogService',
        '_',
        function ($scope, $http, $log, ItemsSearchService, OrderService, Session, PaymentDialogService, _) {

            var userSession = Session.get('userSession'),
                authorizationHeader = 'Bearer ' + userSession.access_token;

            $scope.order = {
                subTotal : 0,
                items : []
            };

            $scope.user = {};
            $scope.transaction = {};

            this.getItems = ItemsSearchService.searchItems;

            this.onSelect = function () {

                var selectedItem = $scope.transaction.selectedItem;
                $scope.transaction.selectedItem = '';

                OrderService.addItem(selectedItem, $scope.order, authorizationHeader);
            };

            $scope.$watchCollection('order.items', function () {
                if ($scope.order.orderId && $scope.order.items.length === 0) {
                    $log.debug('deleting order with id ' + $scope.order.orderId);
                    OrderService.deleteOrder($scope.order.orderId, authorizationHeader);
                }

                if ($scope.order.items.length !== 0) {
                    _.each($scope.order.items, function (item) {
                        $scope.order.subTotal += item.quantity * item.unitPrice;
                    });
                }
            });

            this.openPaymentDialog = function () {
                PaymentDialogService.open();
            };
        }]);
