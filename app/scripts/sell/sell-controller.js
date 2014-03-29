'use strict';

angular.module('getvApp')
    .controller('SellController', function ($scope, $http) {

        $scope.order = {
            items : []
        };

        $scope.user = {};

        $http.get('/data/products.json')
            .success(function (data) {
                $scope.order.products = data;
            })
            .error(function (error) {
                console.log(error);
            });

        /*$http.get({
            url : 'https://v1-dev-retail-api.jhm.info/products',
            headers : {
                Authorization : 'Bearer' + $scope.user.token,
                Host : 'v1-dev-retail-api.jhm.info'
            }})
            .success(function (data) {
                $scope.order.products = data;
            })
            .error(function (error) {
                console.log(error);
            });*/

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
    });
