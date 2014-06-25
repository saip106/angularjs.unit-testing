'use strict';

angular.module('getvApp')
    .directive('quickKeysPanel', ['$http', '$log', 'QuickKeysRetriever',
        function ($http, $log, QuickKeysRetriever) {
            return {
                replace : true,
                scope : {},
                restrict : "A",
                templateUrl : 'templates/quick-keys-panel-template.html',
                link : function (scope, element, attrs) {

                    var itemsPerPage = 8;
                    scope.currentPage = 1;

                    QuickKeysRetriever
                        .retrieve(scope.currentPage)
                        .then(function (data) {
                            scope.items = data.items;
                            scope.totalItems = data.items.length;
                            scope.currentPageItems = data.items.slice(0, itemsPerPage);
                        });

                    scope.pageChanged = function () {
                        var start = itemsPerPage * (scope.currentPage - 1);
                        scope.currentPageItems = scope.items.slice(start, start + itemsPerPage);
                    };
                }
            };
        }]);