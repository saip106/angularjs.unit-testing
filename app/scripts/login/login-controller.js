'use strict';

angular.module('getvApp')
    .controller('LoginController', [ '$scope', '$state', 'LoginService',
        function ($scope, $state, LoginService) {

            $scope.username = 'guest';
            $scope.password = 'asdfasdf';

            this.login = function (username, password) {
                LoginService.login(username, password);
            };
        }]);