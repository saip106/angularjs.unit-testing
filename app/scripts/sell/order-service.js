'use strict';

angular.module('getvApp')
    .factory('OrderService', ['$http', 'LoadingDialogService', '$log',
        function ($http, LoadingDialogService, $log) {

            var createNewOrder = function (order, authorizationHeader) {

                LoadingDialogService.open('Creating new order...');

                return $http({
                    method : 'POST',
                    url : 'https://v1-dev-retail-api.jhm.info/orders',
                    headers : {
                        authorization : authorizationHeader
                    }
                })
                    .success(function (result) {
                        $log.debug('created order with id ' + result.items[0].orderId);
                        order.orderId = result.items[0].orderId;
                        LoadingDialogService.close();
                    })
                    .error(function (error) {
                        $log.error(error);
                        LoadingDialogService.close();
                    });
            };

            var addItem = function (selectedItem, order, authorizationHeader) {

                LoadingDialogService.open('Adding item');

                $http({
                    method : 'POST',
                    url : 'https://v1-dev-retail-api.jhm.info/orders/' + order.orderId + '/items/' + selectedItem.id,
                    headers : {
                        authorization : authorizationHeader
                    },
                    data : {
                        "quantity" : 1
                    }
                })
                    .success(function (result) {
                        $log.debug('item with id ' + selectedItem.id + ' is successfully added to order ' + order.orderId);
                        LoadingDialogService.close();
                    })
                    .error(function (error) {
                        $log.error(error);
                        LoadingDialogService.close();
                    });

                order.items.push({
                    id : selectedItem.id,
                    name : selectedItem.name,
                    description : selectedItem.description,
                    unitPrice : selectedItem.listPrice,
                    quantity : 1,
                    total : selectedItem.listPrice,
                    format : selectedItem.format,
                    isOnSale : selectedItem.isOnSale ? "YES" : "NO",
                    product : selectedItem.product,
                    stockItemWarehouses : selectedItem.stockItemWarehouses
                });
            };

            var deleteOrder = function (orderId, authorizationHeader) {

                LoadingDialogService.open('Deleting order...');

                $http({
                    method : 'DELETE',
                    url : 'https://v1-dev-retail-api.jhm.info/orders/' + orderId,
                    headers : {
                        authorization : authorizationHeader
                    }
                })
                    .success(function (result) {
                        $log.debug('order with id ' + orderId + ' is successfully deleted');
                        LoadingDialogService.close();
                    })
                    .error(function (error) {
                        $log.error(error);
                        LoadingDialogService.close();
                    });
            };

            return {
                addItem : function (selectedItem, order, authorizationHeader) {

                    if(order.items.length === 0) {
                        createNewOrder(order, authorizationHeader)
                            .then(function () {
                                addItem(selectedItem, order, authorizationHeader);
                            });
                    }
                    else {
                        addItem(selectedItem, order, authorizationHeader);
                    }
                },
                deleteOrder : deleteOrder
            };
        }]);