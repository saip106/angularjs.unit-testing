'use strict';

angular.module('getvApp')
    .directive('quickKeysPanel', ['$http', '$log', 'QuickKeysRetriever', 'OrderService',
        function ($http, $log, QuickKeysRetriever, OrderService) {
            return {
                replace : true,
                restrict : "A",
                templateUrl : 'templates/quick-keys-panel-template.html',
                controller : 'QuickKeysController',
                link : function (scope, element, attrs, controller) {

                    scope.itemsPerPage = 8;
                    scope.currentPage = 1;

                    QuickKeysRetriever
                        .retrieve(scope.currentPage)
                        .then(function (data) {
                            scope.items = data.items;
                            scope.totalItems = data.items.length;
                            scope.currentPageItems = data.items.slice(0, scope.itemsPerPage);
                        });

                    scope.pageChanged = function () {
                        var start = scope.itemsPerPage * (scope.currentPage - 1);
                        scope.currentPageItems = scope.items.slice(start, start + scope.itemsPerPage);
                    };

                    scope.addItem = function (item) {
                        OrderService.addItem(item, scope.order, scope.authorizationHeader);
                    };
                }
            };
        }]);

angular.module('getvApp')
    .controller('QuickKeysController', ['$scope',
        function ($scope) {


        }]);