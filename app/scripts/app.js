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
                views : {
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
                abstract : true,
                views : {
                    'content' : {
                        template : '<div data-ui-view></div>'
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
                views : {
                    'header' : {
                        templateUrl : 'views/header.html'
                    },
                    'content' : {
                        template : '<div ui-view></div>'
                    },
                    'footer' : {
                        templateUrl : 'views/footer.html'
                    }
                }
            });

        $stateProvider
            .state('app.dashboard', {
                url : '/dashboard',
                abstract : true,
                views : {
                    'subHeader@app' : {
                        templateUrl : 'templates/sub-headers/dashboard-sub-header.html',
                        controller : function ($scope, $state) {
                            $scope.$state = $state;
                        }
                    },
                    '' : {
                        template : '<div ui-view></div>'
                    }
                }
            })
            .state('app.dashboard.summary', {
                url : '/summary',
                templateUrl : '../views/dashboard/summary.html'
            });

        $stateProvider
            .state('app.sell', {
                url : '/sell',
                abstract : true,
                views : {
                    'subHeader@app' : {
                        templateUrl : 'templates/sub-headers/sell-sub-header.html'
                    },
                    '' : {
                        template : '<div ui-view></div>',
                        controller : function ($scope, $state) {
                            $scope.$state = $state;
                        }
                    }
                }
            })
            .state('app.sell.currentSale', {
                url : '/current-sale',
                templateUrl : 'views/sell/current-sale.html',
                controller : 'SellController as sellController'
            })
            .state('app.sell.retrieveSale', {
                url : '/retrieve-sale',
                templateUrl : 'views/sell/retrieve-sale.html',
                controller : function ($scope, $state) {
                    $scope.$state = $state;
                }
            })
            .state('app.sell.register', {
                url : '/register',
                templateUrl : 'views/sell/register.html',
                controller : function ($scope, $state) {
                    $scope.$state = $state;
                }
            });

        $stateProvider
            .state('app.products', {
                url : '/products',
                abstract : true,
                views : {
                    'subHeader@app' : {
                        templateUrl : 'templates/sub-headers/products-sub-header.html'
                    },
                    '' : {
                        template : '<div ui-view></div>'
                    }
                }
            })
            .state('app.products.products', {
                url : '/products',
                templateUrl : '../views/products/products.html',
                controller : 'ProductsController as productsController'
            })
            .state('app.products.stockControl', {
                url : '/stock-control',
                templateUrl : '../views/products/stock-control.html'
            })
            .state('app.products.priceBooks', {
                url : '/price-books',
                templateUrl : '../views/products/price-books.html'
            })
            .state('app.products.brands', {
                url : '/brands',
                templateUrl : '../views/products/brands.html'
            })
            .state('app.products.suppliers', {
                url : '/suppliers',
                templateUrl : '../views/products/suppliers.html'
            })
            .state('app.products.types', {
                url : '/types',
                templateUrl : '../views/products/types.html'
            })
            .state('app.products.tags', {
                url : '/tags',
                templateUrl : '../views/products/tags.html'
            });

        $stateProvider
            .state('app.customers', {
                url : '/customers',
                views : {
                    'subHeader@app' : {
                        templateUrl : 'templates/sub-headers/customers-sub-header.html'
                    },
                    '' : {
                        template : '<div ui-view></div>'
                    }
                }
            })
            .state('app.customers.customers', {
                url : '/customers',
                templateUrl : 'views/customers/customers.html'
            })
            .state('app.customers.groups', {
                url : '/customers',
                templateUrl : 'views/customers/groups.html'
            });

        $stateProvider
            .state('app.setup', {
                url : '/setup',
                views : {
                    'subHeader@app' : {
                        templateUrl : 'templates/sub-headers/setup-sub-header.html'
                    },
                    '' : {
                        template : '<div ui-view></div>'
                    }
                }
            })
            .state('app.setup.general', {
                url : '/general',
                templateUrl : 'views/setup/general.html'
            })
            .state('app.setup.accounts', {
                url : '/account',
                templateUrl : 'views/setup/accounts.html'
            });

        $stateProvider
            .state('app.history', {
                url : '/history',
                templateUrl : '../views/history/history.html'
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