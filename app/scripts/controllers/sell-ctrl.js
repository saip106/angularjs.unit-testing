'use strict';

angular.module('getvApp')
    .controller('SellCtrl', function ($scope, $http) {

        $scope.order = {
            items: []
        };

        $http.get('/data/products.json')
            .success(function (data) {
                $scope.order.products = data;
            });

        $scope.onSelect = function(){
            var selectedItem = $scope.selected;
            $scope.order.items.push(selectedItem);
        };
    });
