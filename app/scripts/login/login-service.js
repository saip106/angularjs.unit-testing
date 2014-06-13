'use strict';

angular.module('getvApp')
    .factory('LoginService', [ '$http', '$state', 'SessionStorageService', 'LoadingDialogService', '$log',
        function ($http, $state, SessionStorageService, LoadingDialogService, $log) {
            return {
                login : function (username, password) {

                    LoadingDialogService.open('Logging in...');

                    $http({
                        method : 'POST',
                        url : 'https://v1-dev-identity-api.jhm.info/token',
                        headers : {
                            authorization : 'Basic amhtLXdlYjpDUTlCSGE2NW8zd0g0aWtRbDVOSWxJekhJNDdSclFFZ2VWOXlMdVhZZ2hIRWljdEdFdQ=='
                        },
                        data : 'grant_type=password&username=' + username + '&password=' + password
                    })
                        .success(function (data) {
                            $log.info('login successful');
                            SessionStorageService.clear();
                            SessionStorageService.put('userSession', data);
                            $state.go('app.sell.currentSale');

                            LoadingDialogService.close();
                        })
                        .error(function (error) {
                            $log.error(error);
                            LoadingDialogService.close();
                        });
                }
            };
        }]);