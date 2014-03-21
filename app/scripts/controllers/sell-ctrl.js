'use strict';

angular.module('getvApp')
    .controller('SellCtrl', function ($scope, $http) {

        $scope.order = {
            items: []
        };

        $scope.user = {};

        $http.get('/data/products.json')
            .success(function (data) {
                $scope.order.products = data;
            })
            .error(function (error) {
                console.log(error);
        });

        $http({
            method: 'POST',
            url: 'https://v1-prod-identity-api.jhm.info/token',
            data: 'grant_type=password&username=guest&password=asdfasdf',
            headers: {
                authorization: 'Authorization: Basic amhtLXdlYjpDUTlCSGE2NW8zd0g0aWtRbDVOSWxJekhJNDdSclFFZ2VWOXlMdVhZZ2hIRWljdEdFdQ=='
            }
        })
        .success(function (data) {
            console.log(data);
            $scope.user.token = data.access_token;
        })
        .error(function (error){
            console.log(error);
        });

        $http.get({
            url: 'https://v1-prod-retail-api.jhm.info/products',
            headers: {
                Authorization: 'Bearer' + $scope.user.token,
                Host: 'v1-prod-retail-api.jhm.info'
            }})
            .success(function (data) {
                $scope.order.products = data;
            })
            .error(function (error){
                console.log(error);
        });

        $scope.onSelect = function(){

            var selectedItem = $scope.selected;
            $scope.selected = '';
            $scope.order.items.push({
                id: selectedItem.id,
                name: selectedItem.name,
                unitPrice: 3.75,
                quantity: 1,
                total: 3.75
            });
        };

        $scope.$watchCollection('order.items', function(){
            console.log('From controller' + $scope.order.items.length);
        });
    });
