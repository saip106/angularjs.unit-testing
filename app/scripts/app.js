'use strict';

angular.module('getvretailwebApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dahsboard.html',
                controller: 'SellCtrl'
            })
            .when('/sell', {
                templateUrl: 'views/sell.html',
                controller: 'SellCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
