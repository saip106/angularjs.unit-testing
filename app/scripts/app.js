'use strict';

angular.module('getvApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html'
            })
            .state('sell', {
                url: '/sell',
                templateUrl: 'views/sell.html',
                controller: 'SellCtrl'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'views/products.html'
            });
    });
