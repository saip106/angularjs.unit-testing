'use strict';

angular.module('getvApp')
    .factory('OrderService', ['$http', '$modal', '$log',
        function ($http, $modal, $log) {

            var openModalDialog = function () {
                return $modal.open({
                    templateUrl : 'templates/loading-template.html',
                    backdrop: 'static',
                    keyboard: false
                });
            }

            var closeModalDialog = function (modalInstance) {
                if (modalInstance) {
                    modalInstance.close();
                }
            };

            var createNewOrder = function (order, authorizationHeader) {

                var modalInstance = openModalDialog();

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
                        closeModalDialog(modalInstance);
                    })
                    .error(function (error) {
                        $log.error(error);
                        closeModalDialog(modalInstance);
                    });
            };

            var addItem = function (selectedItem, order, authorizationHeader) {

                var modalInstance = openModalDialog();

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
                        closeModalDialog(modalInstance);
                    })
                    .error(function (error) {
                        $log.error(error);
                        closeModalDialog(modalInstance);
                    });

                order.items.push({
                    id : selectedItem.id,
                    name : selectedItem.name,
                    unitPrice : selectedItem.listPrice,
                    quantity : 1,
                    total : selectedItem.listPrice
                });
            };

            var deleteOrder = function (orderId, authorizationHeader) {

                var modalInstance = openModalDialog();

                $http({
                    method : 'DELETE',
                    url : 'https://v1-dev-retail-api.jhm.info/orders/' + orderId,
                    headers : {
                        authorization : authorizationHeader
                    }
                })
                    .success(function (result) {
                        $log.debug('order with id ' + orderId + ' is successfully deleted');
                        closeModalDialog(modalInstance);
                    })
                    .error(function (error) {
                        $log.error(error);
                        closeModalDialog(modalInstance);
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
                deleteOrder: deleteOrder
            };
        }]);