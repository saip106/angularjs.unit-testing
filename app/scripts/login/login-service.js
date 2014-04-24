'use strict';

angular.module('getvApp')
    .factory('LoginService', [ '$http', '$state', 'SessionStorageService', '$modal', '$log',
        function ($http, $state, SessionStorageService, $modal, $log) {
            return {
                login : function (username, password) {

                    var modalInstance = $modal.open({
                        templateUrl : 'templates/loading-template.html',
                        backdrop: 'static',
                        keyboard: false
                    });

                    $http({
                        method : 'POST',
                        url : 'https://v1-dev-identity-api.jhm.info/token',
                        headers : {
                            authorization : 'Basic amhtLXdlYjpDUTlCSGE2NW8zd0g0aWtRbDVOSWxJekhJNDdSclFFZ2VWOXlMdVhZZ2hIRWljdEdFdQ=='
                        },
                        data : 'grant_type=password&username=' + username + '&password=' + password
                    })
                        .success(function (data) {
                            $log.info('login successful')
                            SessionStorageService.clear();
                            SessionStorageService.put('userSession', data);
                            $state.go('user.sell');
                            if(modalInstance) {
                                modalInstance.close();
                            }
                        })
                        .error(function (error) {
                            $log.error(error);
                            if(modalInstance) {
                                modalInstance.close();
                            }
                        });
                }
            };
        }]);