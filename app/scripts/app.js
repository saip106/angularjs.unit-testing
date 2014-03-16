'use strict';

angular.module('getvApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                views : {
                    'header' : { templateUrl: 'views/header.html' },
                    'main': { templateUrl: 'views/dashboard.html' }
                }
            })
            .state('sell', {
                url: '/sell',
                views : {
                    'header' : { templateUrl: 'views/header.html' },
                    'main': {
                        templateUrl: 'views/sell.html',
                        controller: 'SellCtrl'
                    }
                }
            })
            .state('sell.quickkeys', {
                templateUrl: 'views/sell.quick-keys.html'
            })
            .state('products', {
                url: '/products',
                views : {
                    'header' : { templateUrl: 'views/header.html' },
                    'main': { templateUrl: 'views/products.html' }
                }
            })
            .state('customers', {
                url: '/customers',
                views : {
                    'header' : { templateUrl: 'views/header.html' },
                    'main': { templateUrl: 'views/customers.html' }
                }
            })
            .state('setup', {
                url: '/setup',
                views : {
                    'header' : { templateUrl: 'views/header.html' },
                    'main': { templateUrl: 'views/setup.html' }
                }
            })
            .state('history', {
                url: '/history',
                views : {
                    'header' : { templateUrl: 'views/header.html' },
                    'main': { templateUrl: 'views/history.html' }
                }
            });
    });
