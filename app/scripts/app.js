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
                abstract: true,
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


//This whole thing needs to be refactored
function number_write(x)
{
    var text_box = document.getElementById("number");
    if(x>=0 && x<=9)
    {
        if(isNaN(text_box.value))
            text_box.value = 0;
        text_box.value = (text_box.value * 10)+x;
    }
}

function number_clear()
{
    document.getElementById("number").value = 0;
}

function number_c()
{
    var text_box = document.getElementById("number");
    var num = text_box.value;
    var num1 = num%10;
    num -= num1;
    num /= 10;
    text_box.value = num;
}