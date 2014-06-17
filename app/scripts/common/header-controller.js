'use strict';

angular.module('getvApp')
    .controller('HeaderController',
    ['$scope', '$state', function ($scope, $state) {
		$scope.$state = $state;
    }]);
