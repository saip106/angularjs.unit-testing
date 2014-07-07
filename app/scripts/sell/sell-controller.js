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

	        $scope.authorizationHeader = authorizationHeader;

            $scope.order = {
                subTotal : 0,
                tax : 0,
                total : 0,
                balanceToPay : 0,
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
                if($scope.order.orderId && $scope.order.items.length === 0) {
                    $log.debug('deleting order with id ' + $scope.order.orderId);
                    OrderService.deleteOrder($scope.order.orderId, authorizationHeader);
                }
            });

            $scope.$watch('order.items', function () {
                if($scope.order.items.length !== 0) {
                    $scope.order.subTotal = 0;
                    _.each($scope.order.items, function (item) {
                        $scope.order.subTotal += item.quantity * item.unitPrice;
                    });
                }
            }, true);

            $scope.$watch('order.subTotal', function () {
                $scope.order.total = $scope.order.subTotal + $scope.order.tax;
                $scope.order.balanceToPay = $scope.order.total;
            });

            this.openPaymentDialog = function () {
                PaymentDialogService.open();
            };
        }]);
