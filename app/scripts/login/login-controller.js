'use strict';

angular.module('getvApp')
    .controller('LoginController', [ '$scope', '$http', '$state',
        function ($scope, $http, $state) {

            this.login = function (username, password) {

                $state.go('user.dashboard');

                /*$http({
                    method : 'POST',
                    url : 'https://v1-dev-identity-api.jhm.info/token',
                    data : 'grant_type=password&username=guest&password=asdfasdf'
                })
                    .success(function (data) {
                        console.log(data);
                        $state.go('user.dashboard');
                    })
                    .error(function (error) {
                        console.log(error);
                        $state.go('user.dashboard');
                    });*/
            };
        }
    ]);