'use strict';

angular.module('getvApp')
    .factory('ItemsSearchService', ['$http', 'SessionStorageService',
        function ($http, Session) {

            var userSession = Session.get('userSession'),
                authorizationHeader = 'Bearer ' + userSession.access_token;

            return {
                searchItems : function (searchText) {
                    return $http({
                        method : 'GET',
                        url : 'https://v1-dev-retail-api.jhm.info/stockitems?$top=10&$filter=substringof(\'' + searchText + '\', Name)',
                        headers : {
                            authorization : authorizationHeader
                        }
                    })
                        .then(function (result) {
                            //console.log(result.data.items);
                            return result.data.items;
                        }
                    );
                }
            };
        }]);