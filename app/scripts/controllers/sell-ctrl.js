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

  /*      $http.get({
            url: 'https://v1-test-retail-api.jhm.info/products',
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaWRlbnRpdHkuamhtLm9yZyIsImF1ZCI6Imh0dHA6Ly93d3cuamhtLm9yZyIsIm5iZiI6MTM5NTA5Mzc3OCwiZXhwIjoxMzk1Njk4NTc4LCJzdWIiOiJndWVzdCIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJndWVzdEB0ZXN0LmNvbSIsImdpdmVubmFtZSI6Ikdlb3JnZSIsInN1cm5hbWUiOiJHdWVzdCIsIlNvbWVEYXRhIjoiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9yaWdodC9wb3NzZXNzcHJvcGVydHkiLCJjbGllbnRJZCI6ImpobS13ZWIiLCJzY29wZSI6WyJkYXNoYm9hcmQudXBkYXRlIiwiZGFzaGJvYXJkLmNyZWF0ZSIsImRhc2hib2FyZC5kZWxldGUiLCJkYXNoYm9hcmQuYWRtaW4iLCJ2aWRlb3MucmVhZCIsInZpZGVvcy51cGRhdGUiLCJ2aWRlb3MuY3JlYXRlIiwidmlkZW9zLmRlbGV0ZSIsInZpZGVvcy5hZG1pbiIsInByb2R1Y3RzLnJlYWQiLCJwcm9kdWN0cy51cGRhdGUiLCJwcm9kdWN0cy5jcmVhdGUiLCJwcm9kdWN0cy5kZWxldGUiLCJwcm9kdWN0cy5hZG1pbiIsInVzZXJzLnJlYWQiLCJ1c2Vycy51cGRhdGUiLCJ1c2Vycy5jcmVhdGUiLCJ1c2Vycy5kZWxldGUiLCJ1c2Vycy5hZG1pbiIsIm9yZGVycy5yZWFkIiwib3JkZXJzLnVwZGF0ZSIsIm9yZGVycy5jcmVhdGUiLCJvcmRlcnMuZGVsZXRlIiwib3JkZXJzLmFkbWluIiwiZXZlbnRzLnJlYWQiLCJldmVudHMudXBkYXRlIiwiZXZlbnRzLmNyZWF0ZSIsImV2ZW50cy5kZWxldGUiLCJldmVudHMuYWRtaW4iLCJwdWJsaWNhdGlvbnMucmVhZCIsInB1YmxpY2F0aW9ucy51cGRhdGUiLCJwdWJsaWNhdGlvbnMuY3JlYXRlIiwicHVibGljYXRpb25zLmRlbGV0ZSIsInB1YmxpY2F0aW9ucy5hZG1pbiIsIm1lc3NhZ2VzLnJlYWQiLCJtZXNzYWdlcy51cGRhdGUiLCJtZXNzYWdlcy5jcmVhdGUiLCJtZXNzYWdlcy5kZWxldGUiLCJtZXNzYWdlcy5hZG1pbiIsInBvc3RzLnJlYWQiLCJwb3N0cy51cGRhdGUiLCJwb3N0cy5jcmVhdGUiLCJwb3N0cy5kZWxldGUiLCJwb3N0cy5hZG1pbiIsImRhc2hib2FyZC5yZWFkIl19.xDZ2D6PBftGZM8wpf4c1AaOEa1re-LSzoTqJIfELv043N0cy51cGRhdGUiLCJwb3N0cy5jcmVhdGUiLCJwb3N0cy5kZWxldGUiLCJwb3N0cy5hZG1pbiJdfQ.LKFQbOd0MO8_jGMVBPAFNPAdTof7WLuVzyKsg2BTjGE',
                Host: 'v1-prod-retail-api.jhm.info'
            }})
            .success(function (data) {
                $scope.order.products = data;
            })
            .error(function(error){
                console.log(error);
        });*/

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
