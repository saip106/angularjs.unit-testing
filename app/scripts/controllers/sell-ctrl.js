'use strict';

angular.module('getvApp')
    .controller('SellCtrl', function ($scope, $state) {
        $state.transitionTo('sell.quickkeys');
        $scope.order = {
            items : [
                {
                    quantity: 1,
                    name: 'Awesome T-shirts',
                    unitPrice: 3.74,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome Dvds',
                    unitPrice: 3.74,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome cups',
                    unitPrice: 3.74,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome pickles',
                    unitPrice: 3.74,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome stuff',
                    unitPrice: 89.5434,
                    total: 3.74
                },
                {
                    quantity: 1,
                    name: 'Awesome T-shirts',
                    unitPrice: 3.74,
                    total: 3.74
                }
            ]
        };
    });
