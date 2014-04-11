'use strict';

angular.module('getvApp')
    .controller('ProductsController', [ '$scope', '$http', 'SessionStorageService',
        function ($scope, $http, Session) {
            var userSession = Session.get('userSession'),
                authorizationHeader = 'Bearer ' + userSession.access_token;

            $http({
                method : 'GET',
                url : 'https://v1-dev-retail-api.jhm.info/stockitems?$top=10&$filter=substringof(\'Portrait Of The Children\', Name)',
                headers : {
                    authorization : authorizationHeader
                }
            })
                .success(function (data) {
                    console.log(data);
                }
            )
                .error(function (error) {
                    console.log(error);
                }
            );
        }]);