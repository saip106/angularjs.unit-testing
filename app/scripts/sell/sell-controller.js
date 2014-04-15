'use strict';

angular.module('getvApp')
    .controller('SellController', ['$scope', '$http', 'SessionStorageService',
        function ($scope, $http, Session) {

            $scope.order = {
                items : []
            };

            $scope.user = {};

            var userSession = Session.get('userSession'),
                authorizationHeader = 'Bearer ' + userSession.access_token;

            this.getItems = function (searchText) {
                return $http({
                    method : 'GET',
                    url : GETV.config.baseUrl + 'stockitems?$top=10&$filter=substringof(\'' + searchText + '\', Name)',
                    headers : {
                        authorization : authorizationHeader
                    }
                })
                    .then(function (result) {
                        console.log(result.data.items)
                        return result.data.items;
                    }
                );

            };

            $scope.onSelect = function () {

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
