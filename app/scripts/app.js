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

getvApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        var access = routingConfig.accessLevels;

        $urlRouterProvider.otherwise('login');

        // Public routes
        $stateProvider
            .state('public', {
                abstract : true,
                template : "<ui-view/>",
                data : {
                    access : access.public
                }
            })
            .state('public.404', {
                url : '/404/',
                templateUrl : '404'
            });

        // Anonymous routes
        $stateProvider
            .state('anonymous', {
                abstract : true,
                template : "<ui-view/>",
                data : {
                    access : access.anon
                }
            })
            .state('anonymous.login', {
                url : '/login',
                templateUrl : 'views/login.html',
                controller : 'LoginController as loginController'
            })
            .state('anonymous.register', {
                url : '/register/',
                templateUrl : 'views/register.html',
                controller : 'RegistrationController as registrationController'
            });

        // Regular user routes
        $stateProvider
            .state('user', {
                url : '/',
                abstract : true,
                template : "<ui-view/>"
            })
            .state('user.dashboard', {
                url : 'dashboard',
                templateUrl : 'views/dashboard.html'
            })
            .state('user.sell', {
                url : 'sell',
                templateUrl : 'views/sell.html',
                controller : 'SellController'
            })
            .state('user.products', {
                url : 'products',
                templateUrl : 'views/products.html'
            })
            .state('user.customers', {
                url : 'customers',
                templateUrl : 'views/customers.html'
            })
            .state('user.setup', {
                url : 'setup',
                templateUrl : 'views/setup.html'
            })
            .state('user.history', {
                url : 'history',
                templateUrl : 'views/history.html'
            });

        // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
        $urlRouterProvider.rule(function ($injector, $location) {
            if($location.protocol() === 'file')
                return;

            var path = $location.path()
            // Note: misnomer. This returns a query object, not a search string
                , search = $location.search()
                , params
                ;

            // check to see if the path already ends in '/'
            if(path[path.length - 1] === '/') {
                return;
            }

            // If there was no search string / query params, return with a `/`
            if(Object.keys(search).length === 0) {
                return path + '/';
            }

            // Otherwise build the search string and return a `/?` prefix
            params = [];
            angular.forEach(search, function (v, k) {
                params.push(k + '=' + v);
            });
            return path + '/?' + params.join('&');
        });
    }]);

getvApp.constant('AUTH_EVENTS', {
    loginSuccess : 'auth-login-success',
    loginFailed : 'auth-login-failed',
    logoutSuccess : 'auth-logout-success',
    sessionTimeout : 'auth-session-timeout',
    notAuthenticated : 'auth-not-authenticated',
    notAuthorized : 'auth-not-authorized'
});