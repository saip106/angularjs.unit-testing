'use strict';

angular.module('getvApp')
    .controller('SellCtrl', function ($scope, $http) {

        $scope.order = {};

        $http.get('/data/products.json')
            .success(function (data) {
                $scope.order.products = data;
            });

    });
