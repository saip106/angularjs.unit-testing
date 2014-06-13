'use strict';

var getvApp = angular.module('getvApp',
    [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'underscore'
    ]);

getvApp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        // Public routes
        $stateProvider
            .state('public', {
                abstract : true,
                views: {
                    'content' : {
                        template : "<div data-ui-view></div>"
                    }
                }
            })
            .state('public.404', {
                url : '/404/',
                templateUrl : '404'
            });

        // Anonymous routes
        $stateProvider
            .state('anonymous', {
                abstract: true,
                views: {
                    'content' : {
                        template: '<div data-ui-view></div>'
                    }
                }
            })
            .state('anonymous.login', {
                url : '/login',
                templateUrl : 'views/login.html',
                controller : 'LoginController as loginController'
            })
            .state('anonymous.registration', {
                url : '/registration',
                templateUrl : 'views/registration.html',
                controller : 'RegistrationController as registrationController'
            });

        // Regular user routes
        $stateProvider
            .state('app', {
                abstract : true,
                views: {
	                'header' : {
                        templateUrl: 'views/header.html'
                    },
                    'content' : {
                        template: '<div ui-view></div>'
                    },
                    'footer' : {
                        templateUrl: 'views/footer.html'
                    }
                }
            });

	    $stateProvider
            .state('app.dashboard', {
                url : '/dashboard',
                templateUrl : 'views/dashboard.html'
            });

	    $stateProvider
            .state('app.sell', {
			    url : '/sell',
			    views : {
			        'subHeader@app' : {
				        templateUrl: 'templates/sub-headers/sell-sub-header.html'
			        },
			        '' : {
				        template: '<div ui-view></div>'
			        }
		        }
            })
	        .state('app.sell.currentSale', {
		        url : '/current-sale',
		        templateUrl : '../views/sell/current-sale.html',
		        controller : 'SellController as sellController'
	        })
	        .state('app.sell.retrieveSale', {
		        url : '/sell/retrieve-sale',
		        templateUrl : '../views/sell/retrieve-sale.html'
	        })
	        .state('app.sell.register', {
		        url : '/sell/register',
		        templateUrl : '../views/sell/register.html'
	        });

	    $stateProvider
            .state('app.products', {
                url : '/products',
                templateUrl : 'views/products.html',
                controller : 'ProductsController as productsController'
            })
            .state('app.customers', {
                url : '/customers',
                templateUrl : 'views/customers.html'
            })
            .state('app.setup', {
                url : '/setup',
                templateUrl : 'views/setup.html'
            })
            .state('app.history', {
                url : '/history',
                templateUrl : 'views/history.html'
            });
    }]);

getvApp.run(function ($rootScope, $log) {

    $rootScope
        .$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            $log.debug("State Change: transition begins!");
        });

    $rootScope
        .$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            $log.debug("State Change: State change success!");
        });

    $rootScope
        .$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams) {
            $log.debug("State Change: Error!");
        });

    $rootScope
        .$on('$stateNotFound',
        function (event, toState, toParams, fromState, fromParams) {
            $log.debug("State Change: State not found!");
        });

    $rootScope
        .$on('$viewContentLoading',
        function (event, viewConfig) {
            $log.debug("View Load: the view is loaded, and DOM rendered!");
        });

    $rootScope
        .$on('$viewcontentLoaded',
        function (event, viewConfig) {
            $log.debug("View Load: the view is loaded, and DOM rendered!");
        });

});