'use strict';

angular.module('getvApp')
    .factory('QuickKeysRetriever', ['$http', 'SessionStorageService', '$log',
        function ($http, Session, $log) {

            var userSession = Session.get('userSession'),
                authorizationHeader = 'Bearer ' + userSession.access_token;

            return {
                retrieve : function (currentPage) {

                    return $http({
                        method : 'GET',
                        url : 'data/products.json',
                        headers : {
                            authorization : authorizationHeader
                        }
                    })
                        .then(function (result) {
                            return result.data;
                        }
                    );
                }
            };
        }]);