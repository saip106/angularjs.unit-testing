'use strict';

angular.module('getvApp')
    .directive('quickKeysPanel', ['$log', '_', function ($log, _) {
        return {
            replace : true,
            scope : {},
            restrict : "A",
	        templateUrl : 'templates/quick-keys-panel-template.html',
            link : function (scope, element, attrs) {
				scope.currentPage = 1;
	            scope.totalItems = 100;
	            scope.pageChanged = function () {
		            $log.debug('page changed...');
	            };

	            scope.items = [];
	            _.each(_.range(10), function (index) {
		            scope.items.push({
			            name: "Product Name - " + index
		            });
	            });
            }
        };
    }]);