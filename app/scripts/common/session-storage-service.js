'use strict';

angular.module('getvApp')
    .factory('SessionStorageService', [
        '$window',
        function ($window) {
            return {
                put : function (key, value) {
                    $window.sessionStorage.setItem(key, JSON.stringify(value));
                },
                get : function (key) {
                    var value = $window.sessionStorage.getItem(key);
                    return JSON.parse(value);
                },
                clear : function () {
                    $window.sessionStorage.clear();
                }
            };
        }
    ]);