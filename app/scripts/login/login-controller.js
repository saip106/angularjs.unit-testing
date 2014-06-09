'use strict';

angular.module('getvApp')
    .controller('LoginController', [ '$scope', 'LoginService',
        function ($scope, LoginService) {

            $scope.username = 'guest';
            $scope.password = 'asdfasdf';

            this.login = function (username, password) {
                LoginService.login(username, password);
            };
        }]);