'use strict';

angular.module('getvretailwebApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
//        $urlRouterProvider.otherwise(function(){
//
//        });
        $stateProvider
            .state('default', {
                url: '/',
                templateUrl: 'views/dashboard.html'
            })
            .state('dashboard', {
                url: '/',
                templateUrl: 'views/dashboard.html'
            })
            .state('sell', {
                url: '/sell',
                templateUrl: 'views/sell.html',
                controller: 'SellCtrl'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'views/products.html',
                controller: 'ProductsCtrl'
            });
    });
