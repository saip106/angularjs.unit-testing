'use strict';

angular.module('getvApp',
        [
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ui.router',
            'ui.bootstrap'
        ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider
            .state('root', {
                url: '/',
                views: {
                    'header' : { templateUrl: 'views/header.html'},
                    'footer' : { templateUrl: 'views/footer.html'}
                }
            })
            .state('root.dashboard', {
                url: 'dashboard',
                views : {
                    'main@': { templateUrl: 'views/dashboard.html' }
                }
            })
            .state('root.sell', {
                url: 'sell',
                views : {
                    'main@': {
                        templateUrl: 'views/sell.html',
                        controller: 'SellCtrl'
                    }
                }
            })
            .state('root.products', {
                url: 'products',
                views : {
                    'main@': { templateUrl: 'views/products.html' }
                }
            })
            .state('root.customers', {
                url: 'customers',
                views : {
                    'main@': { templateUrl: 'views/customers.html' }
                }
            })
            .state('root.setup', {
                url: 'setup',
                views : {
                    'main@': { templateUrl: 'views/setup.html' }
                }
            })
            .state('root.history', {
                url: 'history',
                views : {
                    'main@': { templateUrl: 'views/history.html' }
                }
            });
    });
