'use strict';

angular.module('getvApp')
	.factory('OrderService', ['$http', 'SessionStorageService',
		function ($http, Session) {

			var userSession = Session.get('userSession'),
				authorizationHeader = 'Bearer ' + userSession.access_token;

			var createNewOrder = function (order) {
				return $http({
					method: 'POST',
					url: 'https://v1-dev-retail-api.jhm.info/orders',
					headers: {
						authorization: authorizationHeader
					}
				})
					.success(function (result) {
						console.log(result.items[0].orderId);
						order.orderId = result.items[0].orderId;
					})
					.error(function (error) {
						console.log(error);
					});
			};

			var addItem = function (selectedItem, order) {

				$http({
					method: 'POST',
					url: 'https://v1-dev-retail-api.jhm.info/orders/' + order.orderId + '/items/' + selectedItem.id,
					headers: {
						authorization: authorizationHeader
					},
					data: {
						"quantity":1
					}
				})
					.success(function (result) {
						console.log(result);
					})
					.error(function (error) {
						console.log(error);
					});

				order.items.push({
					id: selectedItem.id,
					name: selectedItem.name,
					unitPrice: selectedItem.listPrice,
					quantity: 1,
					total: selectedItem.listPrice
				});
			};

			return {
				addItem: function (selectedItem, order) {

					if (order.items.length === 0) {
						createNewOrder(order)
							.then(function () {
								addItem(selectedItem, order);
							});
					}
					else {
						addItem(selectedItem, order);
					}
				}
			};
		}]);