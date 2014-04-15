'use strict';

angular.module('getvApp')
    .factory('LoginService', [ '$http', '$state', 'SessionStorageService',
        function ($http, $state, SessionStorageService) {
            return {
                login : function (username, password) {

                    $http({
                        method : 'POST',
                        url : GETV.config.baseAuthenticationUrl + 'token',
                        headers : {
                            authorization : 'Basic amhtLXdlYjpDUTlCSGE2NW8zd0g0aWtRbDVOSWxJekhJNDdSclFFZ2VWOXlMdVhZZ2hIRWljdEdFdQ=='
                        },
                        data : 'grant_type=password&username=' + username + '&password=' + password
                    })
                        .success(function (data) {
                            SessionStorageService.clear();
                            SessionStorageService.put('userSession', data);
                            $state.go('user.sell');
                        })
                        .error(function (error) {
                            console.log(error);
                        });
                }
            };
        }]);